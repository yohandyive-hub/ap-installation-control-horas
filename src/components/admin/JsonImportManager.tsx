import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { repository } from '../../data';
import {
  FileUp,
  FileCode,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  RotateCcw,
  UploadCloud,
  FileSpreadsheet,
  HelpCircle,
  Wand2,
  Sparkles,
  Trash2,
  Building2,
} from 'lucide-react';
import { Accessory, SiteScope } from '../../types';
import {
  safeParseJsonOrSpreadsheet,
  repairJsonString,
  JsonParseResult,
} from '../../utils/jsonRepair';
import { ConfirmDeleteModal } from '../common/ConfirmDeleteModal';

interface PreviewItem {
  id: string;
  action: 'create' | 'update' | 'error';
  name: string;
  code?: string;
  details: string;
  error?: string;
  raw: any;
}

export const JsonImportManager: React.FC = () => {
  const { accessories, jobSites, refreshData, showToast } = useApp();

  const [importEntity, setImportEntity] = useState<'accessories' | 'site_scope'>('accessories');
  const [targetSiteId, setTargetSiteId] = useState<string>(jobSites[0]?.id || '');
  const [importMode, setImportMode] = useState<'upsert' | 'replace'>('upsert');
  const [jsonText, setJsonText] = useState<string>('');
  const [fileName, setFileName] = useState<string>('manual_entry.json');

  // Preview state
  const [previewItems, setPreviewItems] = useState<PreviewItem[]>([]);
  const [parsedData, setParsedData] = useState<any>(null);
  const [isValidated, setIsValidated] = useState<boolean>(false);
  const [importing, setImporting] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  // Syntax and repair state
  const [syntaxError, setSyntaxError] = useState<JsonParseResult['error'] | null>(null);
  const [repairNotes, setRepairNotes] = useState<string[]>([]);

  // Sample templates
  const loadAccessoriesSample = () => {
    const sample = [
      {
        code: 'acrovyn-sheet-060',
        name: 'Láminas Acrovyn .060 4x8 ft',
        category: 'Acrovyn',
        unit: 'sheet',
        default_price: 24.5,
        aliases: ['acrovyn sheet', 'lámina protectora'],
      },
      {
        code: 'corner-guard-sm20',
        name: 'Esquineros de Aluminio SM-20 4ft',
        category: 'Esquineros',
        unit: 'each',
        default_price: 18.0,
        aliases: ['corner guard', 'esquinero 4ft'],
      },
      {
        code: 'grab-bar-peened-36',
        name: 'Barras de Seguridad Estriadas 36"',
        category: 'Grab Bars',
        unit: 'each',
        default_price: 22.0,
        aliases: ['grab bar 36', 'barra discapacitado'],
      },
      {
        code: 'mirror-stainless-1836',
        name: 'Espejo con Marco Inoxidable 18" x 36"',
        category: 'Espejos',
        unit: 'each',
        default_price: 38.0,
        aliases: ['espejo baño 18x36'],
      },
    ];
    setJsonText(JSON.stringify(sample, null, 2));
    setFileName('plantilla_accesorios.json');
    setIsValidated(false);
    setSyntaxError(null);
    setRepairNotes([]);
    setPreviewItems([]);
  };

  const loadSiteScopeSample = () => {
    const sample = [
      {
        accessory_code: 'acrovyn-sheet-060',
        accessory_name: 'Láminas Acrovyn .060 4x8 ft',
        planned_qty: 120,
        unit: 'sheet',
        area_label: 'Pisos 2 al 5',
      },
      {
        accessory_code: 'corner-guard-sm20',
        accessory_name: 'Esquineros de Aluminio SM-20 4ft',
        planned_qty: 85,
        unit: 'each',
        area_label: 'Pasillos principales',
      },
      {
        accessory_code: 'grab-bar-peened-36',
        accessory_name: 'Barras de Seguridad Estriadas 36"',
        planned_qty: 40,
        unit: 'each',
        area_label: 'Baños de habitaciones',
      },
    ];
    setJsonText(JSON.stringify(sample, null, 2));
    setFileName('plantilla_alcance_obra.json');
    setIsValidated(false);
    setSyntaxError(null);
    setRepairNotes([]);
    setPreviewItems([]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = ev => {
        setJsonText(ev.target?.result as string);
        setIsValidated(false);
        setSyntaxError(null);
        setRepairNotes([]);
        setPreviewItems([]);
      };
      reader.readAsText(file);
    }
  };

  // Helper to validate and convert parsed data to preview list
  const validateParsedData = (data: any, siteId: string = targetSiteId) => {
    const rows = Array.isArray(data) ? data : [data];
    const previews: PreviewItem[] = [];

    if (importEntity === 'accessories') {
      rows.forEach((row, i) => {
        const id = `item-${i}`;
        if (!row.name || typeof row.name !== 'string') {
          previews.push({
            id,
            action: 'error',
            name: row.code || `Ítem #${i + 1}`,
            details: 'Falta campo obligatorio "name" (texto descriptivo del accesorio)',
            error: 'Campo "name" es obligatorio.',
            raw: row,
          });
          return;
        }

        const code =
          row.code ||
          row.name
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-');

        const existing = accessories.find(
          a =>
            a.code.toLowerCase() === code.toLowerCase() ||
            a.name.toLowerCase() === row.name.toLowerCase()
        );

        previews.push({
          id,
          action: existing ? 'update' : 'create',
          name: row.name,
          code,
          details: `Categoría: ${row.category || 'General'} • Unidad: ${row.unit || 'each'} • Precio: $${row.default_price || 0}`,
          raw: {
            ...row,
            code,
            id: existing ? existing.id : undefined,
          },
        });
      });
    } else {
      // site_scope validation
      rows.forEach((row, i) => {
        const id = `item-${i}`;
        const plannedQty = parseFloat(row.planned_qty);
        if (isNaN(plannedQty) || plannedQty <= 0) {
          previews.push({
            id,
            action: 'error',
            name: row.accessory_name || `Ítem #${i + 1}`,
            details: 'planned_qty debe ser un número mayor a cero',
            error: 'planned_qty inválido',
            raw: row,
          });
          return;
        }

        // Look up accessory by code or name
        const acc = accessories.find(
          a =>
            (row.accessory_code && a.code.toLowerCase() === row.accessory_code.toLowerCase()) ||
            (row.accessory_name && a.name.toLowerCase() === row.accessory_name.toLowerCase())
        );

        if (!acc) {
          previews.push({
            id,
            action: 'error',
            name: row.accessory_name || row.accessory_code || `Ítem #${i + 1}`,
            details: 'El accesorio no existe en el catálogo.',
            error: 'Accesorio no encontrado. Crea el accesorio primero.',
            raw: row,
          });
          return;
        }

        previews.push({
          id,
          action: 'create',
          name: acc.name,
          code: acc.code,
          details: `Planificado: ${plannedQty} ${acc.unit} • Área: ${row.area_label || 'General'}`,
          raw: {
            job_site_id: siteId,
            accessory_id: acc.id,
            planned_qty: plannedQty,
            unit: acc.unit,
            area_label: row.area_label || '',
            notes: row.notes || '',
          },
        });
      });
    }

    setPreviewItems(previews);
    setIsValidated(true);
    showToast(`Validación lista: ${previews.length} ítems procesados`, 'info');
  };

  // Validation step with auto-repair capability
  const handleValidate = () => {
    if (!jsonText.trim()) {
      showToast('Por favor pega o carga un archivo JSON o tabla de Excel', 'warning');
      return;
    }

    const parseResult = safeParseJsonOrSpreadsheet(jsonText);

    if (!parseResult.success) {
      setSyntaxError(parseResult.error || null);
      setIsValidated(false);
      setPreviewItems([]);
      showToast(
        `Error de sintaxis en el JSON. Revisa el diagnóstico abajo o pulsa 'Reparar JSON'.`,
        'error'
      );
      return;
    }

    // Success!
    setSyntaxError(null);
    if (parseResult.wasRepaired && parseResult.repairedText) {
      setJsonText(parseResult.repairedText);
      setRepairNotes(parseResult.repairNotes || []);
      showToast(
        '¡Formato reparado automáticamente! Se normalizaron comillas de pulgadas y comas.',
        'success'
      );
    } else {
      setRepairNotes([]);
    }

    setParsedData(parseResult.data);
    validateParsedData(parseResult.data, targetSiteId);
  };

  // Manual auto-repair action
  const handleAutoRepair = () => {
    if (!jsonText.trim()) {
      showToast('No hay contenido en el área de texto para reparar.', 'warning');
      return;
    }

    // Try safe parse first
    const result = safeParseJsonOrSpreadsheet(jsonText);
    if (result.success && result.repairedText) {
      setJsonText(result.repairedText);
      setSyntaxError(null);
      setRepairNotes(result.repairNotes || ['Se formateó y limpió el contenido.']);
      showToast('¡JSON reparado y formateado con éxito!', 'success');
      setParsedData(result.data);
      validateParsedData(result.data, targetSiteId);
      return;
    }

    // Deep repair
    const { repaired, notes } = repairJsonString(jsonText);
    const retry = safeParseJsonOrSpreadsheet(repaired);
    if (retry.success && retry.repairedText) {
      setJsonText(retry.repairedText);
      setSyntaxError(null);
      setRepairNotes(notes.length > 0 ? notes : retry.repairNotes || []);
      showToast('¡JSON reparado con éxito!', 'success');
      setParsedData(retry.data);
      validateParsedData(retry.data, targetSiteId);
    } else {
      setJsonText(repaired);
      setSyntaxError(retry.error || result.error || null);
      setRepairNotes(notes);
      showToast(
        'Se aplicaron correcciones pero aún hay errores de sintaxis. Revisa el visor diagnóstico abajo.',
        'warning'
      );
    }
  };

  // Perform import
  const handleExecuteImport = () => {
    const errorCount = previewItems.filter(p => p.action === 'error').length;
    if (errorCount > 0 || importMode === 'replace') {
      setShowConfirmModal(true);
      return;
    }
    executeConfirmedImport();
  };

  const executeConfirmedImport = async () => {
    setShowConfirmModal(false);
    setImporting(true);
    try {
      const validItems = previewItems.filter(p => p.action !== 'error');
      const errorCount = previewItems.filter(p => p.action === 'error').length;
      let createdCount = 0;
      let updatedCount = 0;

      if (importEntity === 'accessories') {
        for (const item of validItems) {
          if (item.action === 'create') {
            await repository.saveAccessory(item.raw);
            createdCount++;
          } else {
            await repository.saveAccessory(item.raw);
            updatedCount++;
          }
        }
      } else {
        // Site scope
        if (importMode === 'replace') {
          // Purge existing scope for target site first
          const existingScopes = await repository.getSiteScopes(targetSiteId);
          for (const s of existingScopes) {
            await repository.deleteSiteScope(s.id);
          }
        }
        for (const item of validItems) {
          await repository.saveSiteScope(item.raw);
          createdCount++;
        }
      }

      await repository.logImport({
        entity: importEntity,
        file_name: fileName,
        mode: importMode,
        created_count: createdCount,
        updated_count: updatedCount,
        error_count: errorCount,
        imported_by: 'admin',
        details: `Importación finalizada con éxito.`,
      });

      await refreshData();
      showToast(
        `Importación completada: ${createdCount} creados, ${updatedCount} actualizados.`,
        'success'
      );
      setPreviewItems([]);
      setIsValidated(false);
      setJsonText('');
      setParsedData(null);
    } catch (err: any) {
      showToast('Error durante la importación: ' + err.message, 'error');
    } finally {
      setImporting(false);
    }
  };

  const createCount = previewItems.filter(p => p.action === 'create').length;
  const updateCount = previewItems.filter(p => p.action === 'update').length;
  const errorCount = previewItems.filter(p => p.action === 'error').length;

  return (
    <div className="space-y-4">
      {/* Configuration Header */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-purple-400" />
            <div>
              <h3 className="font-bold text-sm text-white">Importador JSON de Catálogos y Obras</h3>
              <p className="text-slate-400">
                Carga masiva de accesorios División 10 o planimetría de alcance por obra.
              </p>
            </div>
          </div>

          {/* Preset template loaders */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={loadAccessoriesSample}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-purple-300 font-bold"
            >
              Plantilla Accesorios
            </button>
            <button
              onClick={loadSiteScopeSample}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold"
            >
              Plantilla Alcance Obra
            </button>
          </div>
        </div>

        {/* Options Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800">
          <div>
            <label className="font-bold text-slate-400 uppercase text-[10px] block mb-1">
              Módulo a Importar:
            </label>
            <select
              value={importEntity}
              onChange={e => {
                setImportEntity(e.target.value as any);
                setIsValidated(false);
              }}
              className="w-full py-2 px-3 rounded-xl bg-slate-950 text-white font-bold border border-slate-800"
            >
              <option value="accessories">Catálogo de Accesorios</option>
              <option value="site_scope">Alcance por Obra (Site Scope)</option>
            </select>
          </div>

          {importEntity === 'site_scope' && (
            <div className="bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/30">
              <label className="font-bold text-amber-300 uppercase text-[10px] flex items-center gap-1.5 mb-1">
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                <span>¿A qué Obra se relaciona esta lista?:</span>
              </label>
              <select
                value={targetSiteId}
                onChange={e => {
                  const newSiteId = e.target.value;
                  setTargetSiteId(newSiteId);
                  if (parsedData) {
                    validateParsedData(parsedData, newSiteId);
                  }
                }}
                className="w-full py-2 px-3 rounded-lg bg-slate-950 text-white font-bold text-xs border border-amber-500/40 focus:border-amber-400"
              >
                {jobSites.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.contractor_name || 'AP'})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="font-bold text-slate-400 uppercase text-[10px] block mb-1">
              Modo de Importación:
            </label>
            <select
              value={importMode}
              onChange={e => setImportMode(e.target.value as any)}
              className="w-full py-2 px-3 rounded-xl bg-slate-950 text-white font-bold border border-slate-800"
            >
              <option value="upsert">Upsert (Crea nuevos, actualiza existentes)</option>
              <option value="replace">Reemplazar todo (Borra lo existente)</option>
            </select>
          </div>
        </div>
      </div>

      {/* JSON File Upload & Text Box */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <FileCode className="w-4 h-4 text-purple-400" />
              Contenido JSON o Tabla de Excel
            </label>
            <p className="text-[11px] text-slate-400">
              Pega tu lista de accesorios o alcance de obra en formato JSON, o copia columnas directamente desde Excel.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {jsonText.trim() && (
              <button
                type="button"
                onClick={() => {
                  setJsonText('');
                  setSyntaxError(null);
                  setRepairNotes([]);
                  setIsValidated(false);
                  setPreviewItems([]);
                }}
                className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-300 text-xs flex items-center gap-1 border border-slate-700"
                title="Limpiar contenido"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Limpiar</span>
              </button>
            )}

            <label className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs cursor-pointer flex items-center gap-1.5 border border-slate-700">
              <FileUp className="w-3.5 h-3.5 text-purple-400" />
              <span>Cargar archivo .json</span>
              <input
                type="file"
                accept=".json,application/json,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Informative Tip Box */}
        <div className="p-2.5 rounded-xl bg-purple-950/20 border border-purple-500/20 text-[11px] text-purple-300 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
            <span>
              <strong>Tip para accesorios:</strong> Si tu lista incluye comillas de pulgadas (ej: <code>36"</code> o <code>18" x 36"</code>), el botón <strong>"Reparar JSON"</strong> las escapa automáticamente a <code>36\"</code> para evitar errores de sintaxis.
            </span>
          </div>
        </div>

        <textarea
          rows={9}
          placeholder='Pega aquí tu arreglo JSON, por ejemplo: [{"name": "Láminas Acrovyn .060", "unit": "sheet", ...}]'
          value={jsonText}
          onChange={e => {
            setJsonText(e.target.value);
            setIsValidated(false);
          }}
          className={`w-full bg-slate-950 text-slate-200 font-mono text-xs p-3 rounded-xl border focus:outline-hidden ${
            syntaxError
              ? 'border-rose-500/80 focus:border-rose-400'
              : 'border-slate-800 focus:border-purple-400'
          }`}
        />

        {/* Repair Notes Alert */}
        {repairNotes.length > 0 && (
          <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-200 text-xs flex items-start gap-2.5 animate-in fade-in duration-150">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold text-emerald-300 text-xs block">
                Correcciones de formato aplicadas con éxito:
              </span>
              {repairNotes.map((note, idx) => (
                <p key={idx} className="text-[11px] text-emerald-400/90">
                  • {note}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Buttons Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
          <button
            type="button"
            onClick={handleAutoRepair}
            className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-300 hover:text-white font-bold text-xs flex items-center justify-center gap-2 border border-purple-500/30 shadow-sm active:scale-95 transition"
            title="Escapar comillas de pulgadas, eliminar comas finales y normalizar formato"
          >
            <Wand2 className="w-3.5 h-3.5 text-purple-400" />
            <span>🪄 Reparar y Formatear JSON</span>
          </button>

          <button
            onClick={handleValidate}
            className="py-2.5 px-6 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md active:scale-95 transition flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Validar y Previsualizar</span>
          </button>
        </div>
      </div>

      {/* Interactive Syntax Error Diagnostic Card */}
      {syntaxError && (
        <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/80 text-rose-200 space-y-3 animate-in fade-in duration-150">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rose-800/50 pb-3">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-black text-white text-xs sm:text-sm">
                    Error de Sintaxis JSON Detectado
                  </h4>
                  {syntaxError.line && (
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-xs font-mono font-bold border border-rose-500/30">
                      Línea {syntaxError.line}, Columna {syntaxError.column}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-rose-300/90 font-mono mt-1">
                  {syntaxError.message}
                </p>
              </div>
            </div>

            <button
              onClick={handleAutoRepair}
              className="py-2 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shrink-0 flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition"
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>Reparar Automáticamente</span>
            </button>
          </div>

          {/* Snippet box */}
          {syntaxError.snippet && (
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                Ubicación exacta del error en el código:
              </span>
              <pre className="p-3 rounded-xl bg-slate-950 border border-rose-900/60 font-mono text-[11px] text-rose-300 overflow-x-auto whitespace-pre leading-relaxed">
                {syntaxError.snippet}
                {syntaxError.pointer && `\n${syntaxError.pointer}`}
              </pre>
            </div>
          )}

          {/* Diagnostic explanation */}
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300 space-y-2">
            <div className="font-bold text-amber-300 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>¿Por qué ocurre este error al importar accesorios?</span>
            </div>
            <p className="leading-relaxed">
              En accesorios de la División 10, nombres como <strong>Barras de Seguridad 36"</strong>, <strong>Espejo 18" x 36"</strong> o <strong>Grab Bar 42"</strong> contienen el signo de pulgadas (<code>"</code>). En la sintaxis de JSON, una comilla doble sin escapar cierra la propiedad prematuramente y provoca el error:
              <br />
              <code className="text-rose-400 font-mono text-[10px] bg-slate-950 px-1 py-0.5 rounded mt-1 inline-block">
                {`"Expected ',' or '}' after property value in JSON at position ... (line ${syntaxError.line || 147})"`}
              </code>
            </p>
            <div className="pt-1 flex items-center gap-2">
              <button
                type="button"
                onClick={handleAutoRepair}
                className="text-xs font-bold text-purple-400 hover:text-purple-300 underline flex items-center gap-1.5"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Haz clic aquí para escapar automáticamente todas las comillas de pulgadas y revalidar</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Validation Preview Card */}
      {isValidated && (
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 animate-in fade-in duration-150">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm text-white">Vista Previa de Validación</h4>
                {importEntity === 'site_scope' && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    Obra: {jobSites.find(s => s.id === targetSiteId)?.name || 'Seleccionada'}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                {importEntity === 'site_scope'
                  ? `Se importarán ${previewItems.length} ítems de alcance a la obra: "${jobSites.find(s => s.id === targetSiteId)?.name || targetSiteId}"`
                  : 'Revisa los resultados antes de aplicar los cambios en el catálogo maestro.'}
              </p>
            </div>

            {/* Counters */}
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                +{createCount} Nuevos
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 font-bold">
                ~{updateCount} Actualizar
              </span>
              {errorCount > 0 && (
                <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold">
                  !{errorCount} Errores
                </span>
              )}
            </div>
          </div>

          {/* List of items with validation status */}
          <div className="max-h-60 overflow-y-auto space-y-1.5 pr-1 text-xs">
            {previewItems.map(p => (
              <div
                key={p.id}
                className={`p-2.5 rounded-xl border flex items-start justify-between gap-2 ${
                  p.action === 'error'
                    ? 'bg-rose-950/20 border-rose-800/60 text-rose-300'
                    : p.action === 'update'
                    ? 'bg-blue-950/20 border-blue-800/60 text-blue-200'
                    : 'bg-emerald-950/20 border-emerald-800/60 text-emerald-200'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{p.name}</span>
                    {p.action === 'create' && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-emerald-500/30 text-emerald-300">
                        NUEVO
                      </span>
                    )}
                    {p.action === 'update' && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-blue-500/30 text-blue-300">
                        ACTUALIZAR
                      </span>
                    )}
                    {p.action === 'error' && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-rose-500/30 text-rose-300">
                        ERROR
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] opacity-80 mt-0.5">{p.details}</p>
                  {p.error && (
                    <p className="text-[11px] font-bold text-rose-400 mt-1">{p.error}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Execute button */}
          <div className="pt-2 border-t border-slate-800 flex justify-end">
            <button
              onClick={handleExecuteImport}
              disabled={importing || previewItems.length === 0}
              className="py-3 px-6 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs shadow-lg active:scale-95 transition disabled:opacity-50"
            >
              {importing ? 'IMPORTANDO...' : 'CONFIRMAR E IMPORTAR AL SISTEMA'}
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Import (Replacing window.confirm) */}
      <ConfirmDeleteModal
        isOpen={showConfirmModal}
        title={importMode === 'replace' ? 'Reemplazar Datos Existentes' : 'Confirmar Importación con Advertencias'}
        message={
          importMode === 'replace'
            ? `El modo de importación está configurado en "Reemplazar todo". Esto eliminará los registros existentes de ${importEntity === 'site_scope' ? 'alcance de esta obra' : 'accesorios'} antes de cargar los nuevos. ¿Deseas continuar?`
            : `Hay ${errorCount} ítem(s) con error que serán omitidos durante el proceso. Los demás ${createCount + updateCount} ítems válidos se importarán. ¿Deseas continuar?`
        }
        isDeleting={importing}
        confirmButtonText="Continuar e Importar"
        onConfirm={executeConfirmedImport}
        onCancel={() => setShowConfirmModal(false)}
      />
    </div>
  );
};
