/**
 * Robust JSON repair and normalization utility for AP Installation.
 * Designed specifically to handle:
 * 1. Unescaped quotes inside string values (especially Division 10 dimensions like 36", 18" x 36", 1-1/2")
 * 2. Trailing commas in arrays and objects
 * 3. Smart/curly quotes (“ ” ‘ ’) from Word/Excel/WhatsApp
 * 4. Single-quoted keys and values
 * 5. Unquoted object keys ({ name: "value" } -> { "name": "value" })
 * 6. Missing outer array brackets when pasting multiple objects
 * 7. Tab-separated values (TSV) copied directly from Excel
 */

export interface JsonParseResult<T = any> {
  success: boolean;
  data?: T;
  repairedText?: string;
  wasRepaired?: boolean;
  repairNotes?: string[];
  error?: {
    message: string;
    line?: number;
    column?: number;
    snippet?: string;
    pointer?: string;
  };
}

/**
 * Converts TSV/CSV (e.g. copied from Excel/Sheets) into an array of accessory/scope objects
 */
export function parseSpreadsheetText(text: string): any[] | null {
  const lines = text
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(Boolean);

  if (lines.length < 2) return null;

  // Check if first line has tab delimiters or commas/semicolons
  const firstLine = lines[0];
  const hasTabs = firstLine.includes('\t');
  const hasPipes = firstLine.includes('|');
  const hasCommas = firstLine.includes(',') && !firstLine.startsWith('{');

  if (!hasTabs && !hasPipes && !hasCommas) return null;

  const delimiter = hasTabs ? '\t' : hasPipes ? '|' : ',';

  // Check if header row exists
  const rawHeaders = firstLine
    .split(delimiter)
    .map(h => h.trim().toLowerCase().replace(/^["']|["']$/g, ''));

  // Standardize header names
  const headerMap: { [key: string]: string } = {};
  rawHeaders.forEach((h, idx) => {
    if (h.includes('código') || h.includes('codigo') || h === 'code') {
      headerMap[idx] = 'code';
    } else if (h.includes('nombre') || h.includes('accesorio') || h.includes('descripción') || h.includes('descripcion') || h === 'name') {
      headerMap[idx] = 'name';
    } else if (h.includes('categor') || h === 'category') {
      headerMap[idx] = 'category';
    } else if (h.includes('unidad') || h === 'unit') {
      headerMap[idx] = 'unit';
    } else if (h.includes('precio') || h.includes('tarifa') || h.includes('price') || h === 'default_price') {
      headerMap[idx] = 'default_price';
    } else if (h.includes('planif') || h.includes('cant') || h.includes('qty') || h === 'planned_qty') {
      headerMap[idx] = 'planned_qty';
    } else if (h.includes('área') || h.includes('area') || h === 'area_label') {
      headerMap[idx] = 'area_label';
    }
  });

  const hasNameHeader = Object.values(headerMap).includes('name');
  const startRow = hasNameHeader ? 1 : 0;

  const results: any[] = [];

  for (let i = startRow; i < lines.length; i++) {
    const parts = lines[i].split(delimiter).map(p => p.trim().replace(/^["']|["']$/g, ''));
    if (parts.length === 0 || parts.every(p => !p)) continue;

    const row: any = {};
    if (hasNameHeader) {
      parts.forEach((val, idx) => {
        const field = headerMap[idx];
        if (field) {
          if (field === 'default_price' || field === 'planned_qty') {
            const num = parseFloat(val.replace(/[^0-9.-]/g, ''));
            row[field] = isNaN(num) ? 0 : num;
          } else {
            row[field] = val;
          }
        }
      });
    } else {
      // Default order: Name, Code (or Category), Unit, Price
      if (parts[0]) row.name = parts[0];
      if (parts[1]) row.category = parts[1];
      if (parts[2]) row.unit = parts[2];
      if (parts[3]) {
        const num = parseFloat(parts[3].replace(/[^0-9.-]/g, ''));
        row.default_price = isNaN(num) ? 0 : num;
      }
    }

    if (row.name) {
      results.push(row);
    }
  }

  return results.length > 0 ? results : null;
}

/**
 * Repairs raw JSON text to fix common syntax errors
 */
export function repairJsonString(input: string): { repaired: string; notes: string[] } {
  let text = input.trim();
  const notes: string[] = [];

  // 1. Replace smart / curly quotes
  const smartQuoteMatches = text.match(/[\u201C\u201D\u201E\u00AB\u00BB\u2018\u2019\u201A]/g);
  if (smartQuoteMatches) {
    text = text
      .replace(/[\u201C\u201D\u201E\u00AB\u00BB]/g, '"')
      .replace(/[\u2018\u2019\u201A]/g, "'");
    notes.push('Se normalizaron comillas tipográficas (“ ”) a comillas estándar.');
  }

  // 2. Remove JavaScript comments (// ... and /* ... */)
  if (text.includes('//') || text.includes('/*')) {
    text = text.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '$1');
    notes.push('Se eliminaron comentarios de código.');
  }

  // 3. Auto-wrap multiple objects in an array if missing outer [ ]
  if (!text.startsWith('[') && text.includes('{') && text.includes('}')) {
    // If it looks like a list of objects without brackets: { ... }, { ... }
    if (text.trim().startsWith('{')) {
      text = `[\n${text}\n]`;
      notes.push('Se añadieron corchetes exteriores [...] para convertirlo en arreglo.');
    }
  }

  // 4. Line by line repair for unescaped dimension quotes:
  // e.g.: "name": "Barras de Seguridad Estriadas 36"",
  // or:   "name": "Espejo con repisa 18" x 36"",
  const lines = text.split('\n');
  let repairedQuotesCount = 0;

  const repairedLines = lines.map(line => {
    // Check if line contains a key-value pair with string value
    // Pattern: [spaces] "key": "value...",
    const kvMatch = line.match(/^(\s*"?[a-zA-Z0-9_-]+"?"?\s*:\s*")(.*?)("?\s*,?\s*)$/);
    if (!kvMatch) return line;

    const prefix = kvMatch[1];
    let valPart = kvMatch[2];
    const suffix = kvMatch[3];

    // If valPart contains unescaped quotes (e.g. 36" or 18" x 36")
    if (valPart.includes('"')) {
      // Escape any quote that is not already escaped
      const repairedVal = valPart.replace(/(?<!\\)"/g, '\\"');
      if (repairedVal !== valPart) {
        repairedQuotesCount++;
        // Ensure suffix ends with closing quote and comma if appropriate
        const endsWithQuote = suffix.trim().startsWith('"');
        const hasComma = suffix.includes(',');
        return `${prefix}${repairedVal}"${hasComma ? ',' : ''}`;
      }
    }

    return line;
  });

  if (repairedQuotesCount > 0) {
    text = repairedLines.join('\n');
    notes.push(`Se escaparon comillas de dimensiones (${repairedQuotesCount} casos como 36\\").`);
  }

  // 5. Remove trailing commas before } and ]
  const trailingCommaRegex = /,\s*([}\]])/g;
  if (trailingCommaRegex.test(text)) {
    text = text.replace(trailingCommaRegex, '$1');
    notes.push('Se eliminaron comas finales (trailing commas) antes de llaves y corchetes.');
  }

  // 6. Handle single-quoted keys and values: {'key': 'val'} -> {"key": "val"}
  if (text.includes("'")) {
    // Replace single quotes around keys: 'key': -> "key":
    text = text.replace(/'([a-zA-Z0-9_-]+)'\s*:/g, '"$1":');
    // Replace single quotes around values: : 'val' -> : "val"
    text = text.replace(/:\s*'([^']*)'/g, ': "$1"');
    notes.push('Se convirtieron comillas simples a comillas dobles en claves y valores.');
  }

  // 7. Unquoted keys: { key: "val" } -> { "key": "val" }
  const unquotedKeysRegex = /([{,]\s*)([a-zA-Z_][a-zA-Z0-9_-]*)\s*:/g;
  if (unquotedKeysRegex.test(text)) {
    text = text.replace(unquotedKeysRegex, '$1"$2":');
    notes.push('Se agregaron comillas a claves de objeto sin comillas.');
  }

  return { repaired: text, notes };
}

/**
 * Extracts line, column and snippet from a JSON syntax error
 */
function extractErrorInfo(rawText: string, error: SyntaxError): {
  message: string;
  line?: number;
  column?: number;
  snippet?: string;
  pointer?: string;
} {
  const msg = error.message;
  let line = 1;
  let column = 1;

  // Try to parse "line X column Y" from error message
  const lineColMatch = msg.match(/line (\d+) column (\d+)/i);
  if (lineColMatch) {
    line = parseInt(lineColMatch[1], 10);
    column = parseInt(lineColMatch[2], 10);
  } else {
    // Try to parse "position X"
    const posMatch = msg.match(/position (\d+)/i);
    if (posMatch) {
      const pos = parseInt(posMatch[1], 10);
      const sub = rawText.slice(0, pos);
      const lines = sub.split('\n');
      line = lines.length;
      column = lines[lines.length - 1].length + 1;
    }
  }

  const allLines = rawText.split('\n');
  const targetLineIdx = line - 1;
  const targetLine = allLines[targetLineIdx] || '';

  // Generate 3-line snippet
  const snippetLines: string[] = [];
  if (targetLineIdx > 0) {
    snippetLines.push(`${line - 1}: ${allLines[targetLineIdx - 1]}`);
  }
  snippetLines.push(`${line}: ${targetLine}`);
  const pointerIndent = Math.max(0, column - 1 + String(line).length + 2);
  const pointer = ' '.repeat(pointerIndent) + '^';
  if (targetLineIdx < allLines.length - 1) {
    snippetLines.push(`${line + 1}: ${allLines[targetLineIdx + 1]}`);
  }

  return {
    message: msg,
    line,
    column,
    snippet: snippetLines.join('\n'),
    pointer,
  };
}

/**
 * Intelligent JSON and spreadsheet parser with auto-repair
 */
export function safeParseJsonOrSpreadsheet<T = any>(input: string): JsonParseResult<T> {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      success: false,
      error: { message: 'El contenido está vacío.' },
    };
  }

  // First: check if input is spreadsheet / TSV format from Excel
  if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) {
    const spreadsheetData = parseSpreadsheetText(trimmed);
    if (spreadsheetData && spreadsheetData.length > 0) {
      const repairedJson = JSON.stringify(spreadsheetData, null, 2);
      return {
        success: true,
        data: spreadsheetData as T,
        repairedText: repairedJson,
        wasRepaired: true,
        repairNotes: [
          `Se detectó formato de tabla / Excel. Se convirtieron ${spreadsheetData.length} filas a formato JSON automáticamente.`,
        ],
      };
    }
  }

  // Second: try direct JSON.parse
  try {
    const data = JSON.parse(trimmed);
    return {
      success: true,
      data,
      repairedText: trimmed,
      wasRepaired: false,
    };
  } catch (initialError: any) {
    // Third: attempt auto-repair
    const { repaired, notes } = repairJsonString(trimmed);

    try {
      const data = JSON.parse(repaired);
      return {
        success: true,
        data,
        repairedText: repaired,
        wasRepaired: true,
        repairNotes: notes.length > 0 ? notes : ['Se corrigieron comillas y delimitadores automáticamente.'],
      };
    } catch (secondError: any) {
      // Fourth: extract precise line & column information from the second or first error
      const errorInfo = extractErrorInfo(trimmed, initialError);
      return {
        success: false,
        error: errorInfo,
      };
    }
  }
}
