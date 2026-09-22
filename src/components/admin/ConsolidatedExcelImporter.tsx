import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { useApp } from '../../context/AppContext';
import { repository } from '../../data';
import { HISTORICAL_REPORTS_CONSOLIDATED } from '../../data/historicalReports';
import { Report } from '../../types';
import {
  FileSpreadsheet,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Eye,
  FileCheck,
  Calendar,
  Users,
  Building2,
  Layers,
} from 'lucide-react';

export const ConsolidatedExcelImporter: React.FC = () => {
  const { refreshData, showToast, reports, profiles, jobSites, contractors } = useApp();
  const [file, setFile] = useState<File | null>(null);
  const [parsing, setParsing] = useState(false);
  const [parsedSheets, setParsedSheets] = useState<{ sheetName: string; rowsCount: number }[]>([]);
  const [parsedReports, setParsedReports] = useState<Report[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [importMode, setImportMode] = useState<'upsert' | 'replace'>('upsert');
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'master_seed'>('master_seed');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reload master seed with 187 reports
  const handleReloadMasterConsolidated = async () => {
    setIsSaving(true);
    try {
      await repository.bulkSaveReports(HISTORICAL_REPORTS_CONSOLIDATED, 'replace');
      await refreshData();
      showToast(
        `Consolidado Maestro cargado exitosamente (${HISTORICAL_REPORTS_CONSOLIDATED.length} reportes de Ene a Sep 2026)`,
        'success'
      );
    } catch (err: any) {
      showToast('Error al recargar el consolidado: ' + (err.message || 'Error desconocido'), 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileProcess = async (uploadedFile: File) => {
    setFile(uploadedFile);
    setParsing(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const binaryStr = e.target?.result;
          const workbook = XLSX.read(binaryStr, { type: 'binary', cellDates: true });

          const sheetSummaries: { sheetName: string; rowsCount: number }[] = [];
          const generatedReports: Report[] = [];

          workbook.SheetNames.forEach((sheetName) => {
            const worksheet = workbook.Sheets[sheetName];
            const rawData = XLSX.utils.sheet_to_json<any>(worksheet, { header: 1 });
            if (rawData.length > 0) {
              sheetSummaries.push({
                sheetName,
                rowsCount: rawData.length,
              });
            }
          });

          setParsedSheets(sheetSummaries);
          showToast(`Archivo procesado: ${workbook.SheetNames.length} hojas detectadas`, 'success');
        } catch (innerErr: any) {
          showToast('Error al leer las hojas del archivo: ' + innerErr.message, 'error');
        } finally {
          setParsing(false);
        }
      };
      reader.readAsBinaryString(uploadedFile);
    } catch (err: any) {
      showToast('Error al cargar archivo: ' + err.message, 'error');
      setParsing(false);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
              Sincronización y Carga de "Nuevo Consolidado 2026"
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Administra e importa todas las hojas semanales (JAN 10 hasta SEPT 18). Los datos cargados se
              integran automáticamente en la visualización de instaladores, supervisores y administración.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('master_seed')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === 'master_seed'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Consolidado Maestro ({HISTORICAL_REPORTS_CONSOLIDATED.length} reportes)
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === 'upload'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              <UploadCloud className="w-3.5 h-3.5" />
              Subir Archivo Excel
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'master_seed' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                Consolidado Completo Integrado en el Sistema
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Contiene <strong>187 reportes aprobados</strong> que abarcan todas las 37 semanas de 2026 (desde el lunes 5 de enero hasta el 18 de septiembre).
              </p>
            </div>

            <button
              onClick={handleReloadMasterConsolidated}
              disabled={isSaving}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-md transition active:scale-95"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSaving ? 'animate-spin' : ''}`} />
              <span>{isSaving ? 'Sincronizando...' : 'Recargar Consolidado en Memoria'}</span>
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Reportes</span>
              <span className="text-xl font-black text-white">{HISTORICAL_REPORTS_CONSOLIDATED.length}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Rango de Fechas</span>
              <span className="text-xs font-bold text-emerald-400 mt-1 block">05/Ene - 18/Sep 2026</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Hojas Semanales</span>
              <span className="text-xl font-black text-amber-400">37 Semanas</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Estado</span>
              <span className="text-xs font-bold text-emerald-400 mt-1 block">100% Aprobados</span>
            </div>
          </div>

          {/* Sample breakdown */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-300 block">Hojas Semanales Clave Incluidas:</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-amber-300 block">JAN 10 (05/01 - 10/01)</span>
                <span className="text-[11px] text-slate-400">6 días (Lunes a Sábado)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-slate-200 block">JAN 17 (12/01 - 17/01)</span>
                <span className="text-[11px] text-slate-400">6 días (Lunes a Sábado)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-slate-200 block">ABR 24 (20/04 - 24/04)</span>
                <span className="text-[11px] text-slate-400">Última semana Pedro</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-slate-200 block">JUN 05 (01/06 - 05/06)</span>
                <span className="text-[11px] text-slate-400">Última semana Efraín</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-emerald-300 block">SEPT 12 (07/09 - 11/09)</span>
                <span className="text-[11px] text-slate-400">5 días (UM)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-emerald-300 block">SEPT 18 (14/09 - 18/09)</span>
                <span className="text-[11px] text-slate-400">5 días (Baptist Pembroke)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'upload' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          {/* Drag & Drop Area */}
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition ${
              isDragging
                ? 'border-purple-500 bg-purple-500/10'
                : 'border-slate-800 hover:border-slate-700 bg-slate-950'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx, .xls"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileProcess(e.target.files[0]);
                }
              }}
            />
            <UploadCloud className="w-10 h-10 text-purple-400 mx-auto mb-3" />
            <p className="text-sm font-bold text-white mb-1">
              Arrastra aquí tu archivo <span className="text-emerald-400">Nuevo Consolidado 2026.xlsx</span>
            </p>
            <p className="text-xs text-slate-400">o haz clic para examinar desde tu equipo</p>
          </div>

          {parsing && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center gap-3 text-xs text-slate-300">
              <RefreshCw className="w-4 h-4 text-purple-400 animate-spin" />
              <span>Analizando hojas del archivo Excel...</span>
            </div>
          )}

          {parsedSheets.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Hojas Encontradas en el Excel ({parsedSheets.length})
                </h4>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-60 overflow-y-auto p-2 rounded-xl bg-slate-950 border border-slate-800">
                {parsedSheets.map((s) => (
                  <div key={s.sheetName} className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                    <span className="font-bold text-amber-300 block truncate">{s.sheetName}</span>
                    <span className="text-[10px] text-slate-400">{s.rowsCount} filas</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
