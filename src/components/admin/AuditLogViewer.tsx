import React, { useEffect, useState } from 'react';
import { repository } from '../../data';
import { ImportLog } from '../../types';
import { History, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

export const AuditLogViewer: React.FC = () => {
  const [logs, setLogs] = useState<ImportLog[]>([]);
  const [loading, setLoading] = useState(true);

  const loadLogs = async () => {
    setLoading(true);
    try {
      const data = await repository.getImportLogs();
      setLogs(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-purple-400" />
          <div>
            <h3 className="font-bold text-sm text-white">Registro de Auditoría e Importaciones</h3>
            <p className="text-xs text-slate-400">
              Historial de cargas de datos por archivo JSON y modificaciones estructurales.
            </p>
          </div>
        </div>

        <button
          onClick={loadLogs}
          className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold text-xs"
        >
          Actualizar
        </button>
      </div>

      <div className="space-y-2">
        {loading ? (
          <p className="text-center text-slate-400 text-xs py-8">Cargando bitácora...</p>
        ) : logs.length === 0 ? (
          <p className="text-center text-slate-500 text-xs py-8 bg-slate-900 rounded-2xl border border-slate-800">
            Aún no se han registrado importaciones en el sistema.
          </p>
        ) : (
          logs.map(log => (
            <div
              key={log.id}
              className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-white">
                  <FileText className="w-4 h-4 text-purple-400" />
                  <span>{log.file_name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 uppercase">
                    {log.entity} • {log.mode}
                  </span>
                </div>
                <span className="text-slate-400 text-[11px] font-mono">
                  {new Date(log.created_at).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center gap-4 text-[11px] pt-1">
                <span className="text-emerald-400 font-semibold">
                  +{log.created_count} creados
                </span>
                <span className="text-blue-400 font-semibold">
                  ~{log.updated_count} actualizados
                </span>
                {log.error_count > 0 && (
                  <span className="text-rose-400 font-semibold">
                    !{log.error_count} errores
                  </span>
                )}
              </div>

              {log.details && (
                <p className="text-slate-400 text-[11px] italic">{log.details}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
