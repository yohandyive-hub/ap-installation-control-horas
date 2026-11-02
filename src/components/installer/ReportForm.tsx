import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Profile,
  JobSite,
  Accessory,
  Report,
  ReportCrewMember,
  ReportItem,
  IncidentType,
} from '../../types';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Package,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Plus,
  Minus,
  Trash2,
  Save,
  Send,
  Sparkles,
  Calculator,
  Search,
  Camera,
  Image as ImageIcon,
  Copy,
} from 'lucide-react';
import {
  getShiftTimestamps,
  calculateShiftHours,
  isWeekendDay,
  formatDateFriendly,
  getTodayIso,
  extractTimeFromIso,
} from '../../utils/dateUtils';
import { repository } from '../../data';

interface ReportFormProps {
  initialReport?: Report | null;
  onFinished: (createdReport?: Report) => void;
  onCancel: () => void;
  prefillNextSite?: {
    date: string;
    crew: Array<{ userId: string; userName: string; startAtTime: string }>;
  } | null;
}

const COMMON_ACTIVITIES = [
  'Caulking / Sellado',
  'Limpieza de área',
  'Punch list',
  'Entrega / Movilización de material',
  'Preparar paredes',
  'Abrir paredes para backing',
  'Instalación de Mockup',
  'Revisar condiciones de obra',
  'Camioneta (chofer / recogida)',
];

const QUICK_TIME_PRESETS = [
  { label: '07:00 - 15:30 (8.5h)', start: '07:00', end: '15:30' },
  { label: '06:30 - 15:00 (8.5h)', start: '06:30', end: '15:00' },
  { label: '07:00 - 15:00 (8.0h)', start: '07:00', end: '15:00' },
  { label: '07:00 - 17:00 (10.0h)', start: '07:00', end: '17:00' },
];

export const ReportForm: React.FC<ReportFormProps> = ({
  initialReport,
  onFinished,
  onCancel,
  prefillNextSite,
}) => {
  const {
    currentUser,
    profiles,
    jobSites,
    contractors,
    accessories,
    refreshData,
    showToast,
  } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 5;

  // Form State
  const [workDate, setWorkDate] = useState<string>(initialReport?.work_date || prefillNextSite?.date || getTodayIso());
  const [selectedSiteId, setSelectedSiteId] = useState<string>(initialReport?.job_site_id || '');
  const [siteSearch, setSiteSearch] = useState<string>('');

  // Crew & Times
  interface CrewInput {
    userId: string;
    userName: string;
    startTime: string; // "07:00"
    endTime: string;   // "15:30"
    isNextDay: boolean;
    isSupervisorNoHours: boolean;
    hourlyRateSnapshot: number;
    hours: number;
  }

  const [crewInputs, setCrewInputs] = useState<CrewInput[]>([]);

  // Items
  const [reportItems, setReportItems] = useState<
    Array<{
      accessoryId: string;
      accessoryName: string;
      unit: string;
      quantity: number;
      measureNotes?: string;
    }>
  >([]);

  // Item search & inch converter helper
  const [accessorySearch, setAccessorySearch] = useState<string>('');
  const [converterInches, setConverterInches] = useState<string>('');
  const [showConverter, setShowConverter] = useState<boolean>(false);

  // Activities & Incidents
  const [selectedActivities, setSelectedActivities] = useState<string[]>(
    initialReport?.activities_performed || []
  );
  const [customActivity, setCustomActivity] = useState<string>('');
  const [incidentType, setIncidentType] = useState<IncidentType>(
    initialReport?.incident_type || 'ninguna'
  );
  const [observations, setObservations] = useState<string>(
    initialReport?.observations || ''
  );
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Status & Validation
  const [saving, setSaving] = useState<boolean>(false);
  const [draftRestored, setDraftRestored] = useState<boolean>(false);
  const [duplicateWarning, setDuplicateWarning] = useState<string | null>(null);

  // Initialize Crew
  useEffect(() => {
    if (initialReport && initialReport.crew.length > 0) {
      setCrewInputs(
        initialReport.crew.map(c => {
          const startTime = extractTimeFromIso(c.start_at);
          const endTime = extractTimeFromIso(c.end_at);
          const startDay = c.start_at.substring(0, 10);
          const endDay = c.end_at.substring(0, 10);
          return {
            userId: c.user_id,
            userName: c.user_name || 'Instalador',
            startTime,
            endTime,
            isNextDay: startDay !== endDay,
            isSupervisorNoHours: !!c.is_supervisor_no_hours,
            hourlyRateSnapshot: c.hourly_rate_snapshot || 20,
            hours: c.hours,
          };
        })
      );
      if (initialReport.items) {
        setReportItems(
          initialReport.items.map(it => ({
            accessoryId: it.accessory_id,
            accessoryName: it.accessory_name || '',
            unit: it.unit,
            quantity: it.quantity,
            measureNotes: it.measure_notes,
          }))
        );
      }
    } else if (prefillNextSite && prefillNextSite.crew.length > 0) {
      setCrewInputs(
        prefillNextSite.crew.map(c => ({
          userId: c.userId,
          userName: c.userName,
          startTime: c.startAtTime || '11:30',
          endTime: '15:30',
          isNextDay: false,
          isSupervisorNoHours: false,
          hourlyRateSnapshot: 20,
          hours: calculateShiftHours(c.startAtTime || '11:30', '15:30', false),
        }))
      );
    } else if (currentUser) {
      // Default: current user checked with default 07:00 - 15:30
      const initialHours = calculateShiftHours('07:00', '15:30', false);
      setCrewInputs([
        {
          userId: currentUser.id,
          userName: currentUser.full_name,
          startTime: '07:00',
          endTime: '15:30',
          isNextDay: false,
          isSupervisorNoHours: currentUser.role === 'supervisor',
          hourlyRateSnapshot: currentUser.default_hourly_rate || 20,
          hours: currentUser.role === 'supervisor' ? 0 : initialHours,
        },
      ]);
    }
  }, [initialReport, prefillNextSite, currentUser]);

  // Check draft on mount
  useEffect(() => {
    if (!initialReport && currentUser) {
      repository.getDraft(currentUser.id).then(draft => {
        if (draft && draft.workDate && !draftRestored) {
          if (
            window.confirm(
              `Tienes un borrador guardado en ${draft.jobSiteName || 'sitio'} del ${draft.workDate}. ¿Deseas recuperarlo?`
            )
          ) {
            setWorkDate(draft.workDate || getTodayIso());
            if (draft.jobSiteId) setSelectedSiteId(draft.jobSiteId);
            if (draft.crewInputs) setCrewInputs(draft.crewInputs);
            if (draft.reportItems) setReportItems(draft.reportItems);
            if (draft.selectedActivities) setSelectedActivities(draft.selectedActivities);
            if (draft.incidentType) setIncidentType(draft.incidentType);
            if (draft.observations) setObservations(draft.observations);
            setDraftRestored(true);
            showToast('Borrador recuperado', 'info');
          } else {
            repository.clearDraft(currentUser.id);
          }
        }
      });
    }
  }, [currentUser, initialReport, draftRestored, showToast]);

  // Auto-save draft whenever meaningful state changes
  useEffect(() => {
    if (!initialReport && currentUser && selectedSiteId) {
      const site = jobSites.find(s => s.id === selectedSiteId);
      const timer = setTimeout(() => {
        repository.saveDraft(currentUser.id, {
          workDate,
          jobSiteId: selectedSiteId,
          jobSiteName: site?.name || '',
          crewInputs,
          reportItems,
          selectedActivities,
          incidentType,
          observations,
          updatedAt: Date.now(),
        });
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [workDate, selectedSiteId, crewInputs, reportItems, selectedActivities, incidentType, observations, currentUser, initialReport, jobSites]);

  // Check duplicate site reports for same date & user
  useEffect(() => {
    if (currentUser && selectedSiteId && workDate) {
      repository
        .checkDuplicateUserSiteReport(currentUser.id, workDate, selectedSiteId, initialReport?.id)
        .then(isDuplicate => {
          if (isDuplicate) {
            const site = jobSites.find(s => s.id === selectedSiteId);
            setDuplicateWarning(
              `Ya registraste un reporte en "${site?.name || 'este sitio'}" para el ${workDate}. Si se trata de un segundo turno en el mismo sitio, puedes continuar.`
            );
          } else {
            setDuplicateWarning(null);
          }
        });
    }
  }, [currentUser, selectedSiteId, workDate, initialReport, jobSites]);

  // Crew helpers
  const handleToggleCrewMember = (profile: Profile) => {
    const exists = crewInputs.find(c => c.userId === profile.id);
    if (exists) {
      if (crewInputs.length === 1) {
        showToast('El reporte debe tener al menos un instalador', 'warning');
        return;
      }
      setCrewInputs(prev => prev.filter(c => c.userId !== profile.id));
    } else {
      // Default to time of first member or standard 07:00 - 15:30
      const reference = crewInputs[0] || {
        startTime: '07:00',
        endTime: '15:30',
        isNextDay: false,
      };
      const hours = calculateShiftHours(
        reference.startTime,
        reference.endTime,
        reference.isNextDay
      );
      setCrewInputs(prev => [
        ...prev,
        {
          userId: profile.id,
          userName: profile.full_name,
          startTime: reference.startTime,
          endTime: reference.endTime,
          isNextDay: reference.isNextDay,
          isSupervisorNoHours: profile.role === 'supervisor',
          hourlyRateSnapshot: profile.default_hourly_rate || 20,
          hours: profile.role === 'supervisor' ? 0 : hours,
        },
      ]);
    }
  };

  const handleUpdateCrewMember = (
    index: number,
    fields: Partial<CrewInput>
  ) => {
    setCrewInputs(prev => {
      const updated = [...prev];
      const current = { ...updated[index], ...fields };

      // Auto-detect next day if endTime <= startTime
      if (fields.startTime !== undefined || fields.endTime !== undefined) {
        if (current.endTime <= current.startTime && !fields.isNextDay) {
          current.isNextDay = true;
        }
      }

      current.hours = current.isSupervisorNoHours
        ? 0
        : calculateShiftHours(current.startTime, current.endTime, current.isNextDay);

      updated[index] = current;
      return updated;
    });
  };

  const handleApplyPresetToAll = (start: string, end: string) => {
    const nextDay = end <= start;
    const hours = calculateShiftHours(start, end, nextDay);
    setCrewInputs(prev =>
      prev.map(c => ({
        ...c,
        startTime: start,
        endTime: end,
        isNextDay: nextDay,
        hours: c.isSupervisorNoHours ? 0 : hours,
      }))
    );
    showToast(`Horario ${start} - ${end} aplicado a todo el equipo`, 'info');
  };

  const handleCopyFirstTimeToAll = () => {
    if (crewInputs.length <= 1) return;
    const first = crewInputs[0];
    setCrewInputs(prev =>
      prev.map(c => ({
        ...c,
        startTime: first.startTime,
        endTime: first.endTime,
        isNextDay: first.isNextDay,
        hours: c.isSupervisorNoHours ? 0 : first.hours,
      }))
    );
    showToast('Horario del primer instalador copiado a todos', 'info');
  };

  // Items helpers
  const handleAddOrIncrementItem = (acc: Accessory) => {
    const existingIdx = reportItems.findIndex(it => it.accessoryId === acc.id);
    if (existingIdx >= 0) {
      setReportItems(prev => {
        const next = [...prev];
        next[existingIdx].quantity += 1;
        return next;
      });
    } else {
      setReportItems(prev => [
        ...prev,
        {
          accessoryId: acc.id,
          accessoryName: acc.name,
          unit: acc.unit,
          quantity: 1,
        },
      ]);
    }
  };

  const handleUpdateItemQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      setReportItems(prev => prev.filter((_, i) => i !== index));
    } else {
      setReportItems(prev => {
        const next = [...prev];
        next[index].quantity = Math.round(newQty * 100) / 100;
        return next;
      });
    }
  };

  const handleUpdateItemNotes = (index: number, notes: string) => {
    setReportItems(prev => {
      const next = [...prev];
      next[index].measureNotes = notes;
      return next;
    });
  };

  // Inches to feet converter for crash rail / hand rail
  const handleApplyConvertedInches = (targetIndex: number) => {
    const inches = parseFloat(converterInches);
    if (!isNaN(inches) && inches > 0) {
      const feet = Math.round((inches / 12) * 10) / 10;
      setReportItems(prev => {
        const next = [...prev];
        next[targetIndex].quantity = feet;
        next[targetIndex].measureNotes = `${inches} pulgadas convertidas a ${feet} ft`;
        return next;
      });
      setShowConverter(false);
      setConverterInches('');
      showToast(`Convertido: ${inches}" = ${feet} pies`, 'success');
    }
  };

  // Activity toggles
  const handleToggleActivity = (act: string) => {
    if (selectedActivities.includes(act)) {
      setSelectedActivities(prev => prev.filter(a => a !== act));
    } else {
      setSelectedActivities(prev => [...prev, act]);
    }
  };

  const handleAddCustomActivity = () => {
    if (customActivity.trim()) {
      if (!selectedActivities.includes(customActivity.trim())) {
        setSelectedActivities(prev => [...prev, customActivity.trim()]);
      }
      setCustomActivity('');
    }
  };

  // Simulated photo upload
  const handleSimulatePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => {
        setPhotoPreview(ev.target?.result as string);
        showToast('Foto agregada al reporte', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  // Validation before submission
  const validateForm = async (): Promise<boolean> => {
    if (!workDate) {
      showToast('Selecciona la fecha de trabajo', 'error');
      setCurrentStep(1);
      return false;
    }
    if (!selectedSiteId) {
      showToast('Selecciona el sitio de trabajo (Job Site)', 'error');
      setCurrentStep(1);
      return false;
    }
    if (crewInputs.length === 0) {
      showToast('Debe haber al menos un instalador en el equipo', 'error');
      setCurrentStep(2);
      return false;
    }
    if (reportItems.length === 0 && selectedActivities.length === 0) {
      showToast('Debes agregar al menos una instalación o actividad realizada', 'warning');
      setCurrentStep(3);
      return false;
    }

    // Overlap checks for each crew member
    for (const member of crewInputs) {
      if (!member.isSupervisorNoHours) {
        const { startIso, endIso } = getShiftTimestamps(
          workDate,
          member.startTime,
          member.endTime,
          member.isNextDay
        );
        const overlap = await repository.checkUserReportOverlap(
          member.userId,
          workDate,
          startIso,
          endIso,
          initialReport?.id
        );
        if (overlap.hasOverlap) {
          const proceed = window.confirm(
            `Aviso de horario: ${overlap.message}\n¿Deseas guardar el reporte de todas formas?`
          );
          if (!proceed) {
            setCurrentStep(2);
            return false;
          }
        }
      }
    }

    return true;
  };

  // Submit Handler
  const handleSubmitReport = async (asDraft: boolean = false) => {
    const valid = await validateForm();
    if (!valid) return;

    setSaving(true);
    try {
      const isWeekend = isWeekendDay(workDate);

      // Build crew entities
      const crew: ReportCrewMember[] = crewInputs.map(c => {
        const { startIso, endIso } = getShiftTimestamps(
          workDate,
          c.startTime,
          c.endTime,
          c.isNextDay
        );
        return {
          id: `cr-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          report_id: initialReport?.id || '',
          user_id: c.userId,
          user_name: c.userName,
          start_at: startIso,
          end_at: endIso,
          hours: c.hours,
          hourly_rate_snapshot: c.hourlyRateSnapshot,
          is_weekend: isWeekend,
          is_supervisor_no_hours: c.isSupervisorNoHours,
        };
      });

      // Build item entities
      const items: ReportItem[] = reportItems.map(it => {
        const acc = accessories.find(a => a.id === it.accessoryId);
        return {
          id: `it-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          report_id: initialReport?.id || '',
          accessory_id: it.accessoryId,
          accessory_name: it.accessoryName,
          quantity: it.quantity,
          unit: it.unit as any,
          measure_notes: it.measureNotes,
          unit_price_override: acc?.default_price || undefined,
          line_total: (it.quantity || 0) * (acc?.default_price || 0),
        };
      });

      const reportPayload: Partial<Report> = {
        id: initialReport?.id,
        work_date: workDate,
        job_site_id: selectedSiteId,
        created_by: currentUser?.id || 'usr-antony',
        status: asDraft ? 'draft' : 'submitted',
        observations,
        incident_type: incidentType,
        activities_performed: selectedActivities,
        crew,
        items,
      };

      const saved = await repository.saveReport(reportPayload);

      // Clear draft storage
      if (currentUser) {
        await repository.clearDraft(currentUser.id);
      }

      await refreshData();
      showToast(
        asDraft ? 'Reporte guardado como borrador' : '¡Reporte enviado exitosamente!',
        'success'
      );

      onFinished(saved);
    } catch (err: any) {
      console.error('Error saving report:', err);
      showToast('Error guardando el reporte: ' + (err.message || 'Error desconocido'), 'error');
    } finally {
      setSaving(false);
    }
  };

  // Quick chips: top 5 popular accessories
  const popularAccessories = accessories.slice(0, 6);

  // Filtered accessories for picker
  const filteredAccessories = accessories.filter(a => {
    if (!accessorySearch) return true;
    const q = accessorySearch.toLowerCase();
    return (
      a.name.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.aliases.some(al => al.toLowerCase().includes(q))
    );
  });

  // Filtered job sites: Only show active sites to installers unless already selected in report
  const filteredSites = jobSites.filter(s => {
    if (s.active === false && s.id !== selectedSiteId) return false;
    if (!siteSearch) return true;
    const q = siteSearch.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      (s.contractor_name && s.contractor_name.toLowerCase().includes(q))
    );
  });

  const selectedSite = jobSites.find(s => s.id === selectedSiteId);

  return (
    <div className="max-w-2xl mx-auto pb-24">
      {/* Mobile-first Header / Progress Bar */}
      <div className="sticky top-16 z-30 bg-slate-950/95 backdrop-blur-md pt-3 pb-2 px-1 border-b border-slate-800/80 mb-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <button
              onClick={onCancel}
              className="text-xs font-bold text-slate-400 hover:text-slate-200 px-2 py-1 rounded-lg bg-slate-900 border border-slate-800"
            >
              Cancelar
            </button>
            <span className="text-xs font-bold text-slate-200 truncate">
              {initialReport ? 'Editar Reporte' : 'Nuevo Reporte Diario'}
            </span>
          </div>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
            Paso {currentStep} de {totalSteps}
          </span>
        </div>

        {/* Step indicator pills */}
        <div className="grid grid-cols-5 gap-1.5">
          {['Sitio', 'Horarios', 'Instalado', 'Actividad', 'Enviar'].map((label, idx) => {
            const stepNum = idx + 1;
            const isDone = stepNum < currentStep;
            const isCurrent = stepNum === currentStep;
            return (
              <button
                key={label}
                onClick={() => setCurrentStep(stepNum)}
                className={`h-2 rounded-full transition-all ${
                  isCurrent
                    ? 'bg-amber-500 ring-2 ring-amber-400/40'
                    : isDone
                    ? 'bg-emerald-500'
                    : 'bg-slate-800'
                }`}
                title={`Paso ${stepNum}: ${label}`}
              />
            );
          })}
        </div>
      </div>

      {/* Duplicate warning notification */}
      {duplicateWarning && (
        <div className="mb-4 p-3 rounded-2xl bg-amber-950/40 border border-amber-800/70 text-amber-200 flex items-start gap-2.5 text-xs">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p>{duplicateWarning}</p>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 1: FECHA Y SITIO DE TRABAJO */}
      {/* ========================================================================= */}
      {currentStep === 1 && (
        <div className="space-y-5 animate-in fade-in duration-150">
          {/* Card: Fecha */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-400" />
                Fecha de Trabajo
              </label>
              {isWeekendDay(workDate) && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 flex items-center gap-1">
                  Fin de Semana
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="date"
                value={workDate}
                onChange={e => setWorkDate(e.target.value)}
                className="flex-1 bg-slate-950 text-white font-bold text-base px-3.5 py-3 rounded-xl border border-slate-700 focus:outline-hidden focus:border-amber-400 touch-target"
              />
              <button
                type="button"
                onClick={() => setWorkDate(getTodayIso())}
                className="px-3.5 py-3 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs border border-slate-700 hover:bg-slate-700 shrink-0 touch-target"
              >
                Hoy
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              {formatDateFriendly(workDate)} • Los reportes con retraso son totalmente permitidos.
            </p>
          </div>

          {/* Card: Sitio de Trabajo (Job Site) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-400" />
                Sitio de Trabajo (Job Site)
              </label>
              {selectedSite && (
                <span className="text-xs font-bold text-emerald-400">Seleccionado</span>
              )}
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                placeholder="Buscar sitio (Jackson, Memorial, Lee...)"
                value={siteSearch}
                onChange={e => setSiteSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 text-slate-200 text-sm border border-slate-800 focus:outline-hidden focus:border-amber-400"
              />
            </div>

            {/* Site Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1">
              {filteredSites.length === 0 ? (
                <div className="col-span-full py-6 px-4 text-center rounded-xl bg-slate-950/40 border border-slate-800 text-slate-400">
                  <p className="text-xs font-semibold">No se encontraron obras activas.</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Un administrador o supervisor puede activar obras en Catálogos.
                  </p>
                </div>
              ) : (
                filteredSites.map(site => {
                  const isSelected = selectedSiteId === site.id;
                  const isInactive = site.active === false;
                  return (
                    <button
                      key={site.id}
                      type="button"
                      onClick={() => setSelectedSiteId(site.id)}
                      className={`p-3 rounded-xl text-left transition-all border touch-target flex flex-col justify-between ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500 text-white ring-1 ring-amber-400/50'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1">
                        <span className="font-bold text-sm leading-tight">{site.name}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />}
                      </div>
                      <div className="flex items-center justify-between gap-1 mt-1">
                        <span className="text-[11px] text-slate-400 font-medium">
                          Contratista: {site.contractor_name || 'AP'}
                        </span>
                        {isInactive && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                            Inactiva
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={() => {
              if (!selectedSiteId) {
                showToast('Por favor selecciona un sitio de trabajo', 'warning');
                return;
              }
              setCurrentStep(2);
            }}
            className="w-full py-3.5 rounded-2xl bg-amber-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-98 transition touch-target"
          >
            <span>Siguiente: Equipo y Horas</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 2: EQUIPO DE TRABAJO Y HORARIOS */}
      {/* ========================================================================= */}
      {currentStep === 2 && (
        <div className="space-y-5 animate-in fade-in duration-150">
          {/* Card: Selector de Trabajadores */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-4 h-4 text-amber-400" />
                Instaladores en el Sitio ({crewInputs.length})
              </label>
              <span className="text-[11px] text-slate-400">Toca para agregar/quitar</span>
            </div>

            {/* Crew Member Chips */}
            <div className="flex flex-wrap gap-2">
              {profiles
                .filter(p => p.active && p.role !== 'admin')
                .map(p => {
                  const isSelected = crewInputs.some(c => c.userId === p.id);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleToggleCrewMember(p)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 touch-target ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-xs'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <span>{p.full_name}</span>
                      {isSelected ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-950" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 text-slate-500" />
                      )}
                    </button>
                  );
                })}
            </div>

            {/* Fast Presets Toolbar */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <p className="text-[11px] font-bold text-slate-400">Horarios rápidos para todos:</p>
              <div className="grid grid-cols-2 gap-1.5">
                {QUICK_TIME_PRESETS.map(preset => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => handleApplyPresetToAll(preset.start, preset.end)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[11px] font-semibold text-slate-300 text-left truncate transition"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              {crewInputs.length > 1 && (
                <button
                  type="button"
                  onClick={handleCopyFirstTimeToAll}
                  className="w-full py-1.5 px-3 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-amber-400 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar horario del 1° instalador a todos</span>
                </button>
              )}
            </div>
          </div>

          {/* Individual Crew Members Time Adjustments */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
              Detalle de Horas por Persona
            </p>

            {crewInputs.map((crew, idx) => (
              <div
                key={crew.userId}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-white">{crew.userName}</h4>
                    <span className="text-[11px] text-amber-400 font-bold">
                      {crew.isSupervisorNoHours ? 'Supervisión (sin horas)' : `${crew.hours.toFixed(2)} horas calculadas`}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    {/* Supervisor toggle */}
                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateCrewMember(idx, {
                          isSupervisorNoHours: !crew.isSupervisorNoHours,
                        })
                      }
                      className={`text-[10px] font-bold px-2 py-1 rounded-md border ${
                        crew.isSupervisorNoHours
                          ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                      title="Supervisión sin cómputo de horas de instalación"
                    >
                      Supervisión
                    </button>

                    {crewInputs.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          setCrewInputs(prev => prev.filter((_, i) => i !== idx))
                        }
                        className="p-1 rounded-md text-slate-500 hover:text-rose-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {!crew.isSupervisorNoHours && (
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase">
                        Hora Entrada
                      </label>
                      <input
                        type="time"
                        value={crew.startTime}
                        onChange={e =>
                          handleUpdateCrewMember(idx, { startTime: e.target.value })
                        }
                        className="w-full bg-slate-950 text-white font-bold text-sm px-3 py-2.5 rounded-xl border border-slate-700 focus:outline-hidden focus:border-amber-400 touch-target"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase">
                        Hora Salida
                      </label>
                      <input
                        type="time"
                        value={crew.endTime}
                        onChange={e =>
                          handleUpdateCrewMember(idx, { endTime: e.target.value })
                        }
                        className="w-full bg-slate-950 text-white font-bold text-sm px-3 py-2.5 rounded-xl border border-slate-700 focus:outline-hidden focus:border-amber-400 touch-target"
                      />
                    </div>

                    {/* Overnight shift toggle */}
                    <div className="col-span-2 flex items-center justify-between pt-1">
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                        <input
                          type="checkbox"
                          checked={crew.isNextDay}
                          onChange={e =>
                            handleUpdateCrewMember(idx, { isNextDay: e.target.checked })
                          }
                          className="w-4 h-4 accent-amber-500 rounded"
                        />
                        <span>Terminó al día siguiente (+1 día, noche / madrugada)</span>
                      </label>
                      {crew.isNextDay && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
                          Turno nocturno
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="py-3.5 px-4 rounded-2xl bg-slate-800 text-slate-200 font-bold text-xs flex items-center gap-1 border border-slate-700 touch-target"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Atrás</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="flex-1 py-3.5 rounded-2xl bg-amber-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-98 transition touch-target"
            >
              <span>Siguiente: Producción</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 3: INSTALACIONES Y PRODUCCIÓN */}
      {/* ========================================================================= */}
      {currentStep === 3 && (
        <div className="space-y-5 animate-in fade-in duration-150">
          {/* Card: Popular items & Search */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Package className="w-4 h-4 text-amber-400" />
                Accesorios Más Usados
              </label>
              <button
                type="button"
                onClick={() => setShowConverter(!showConverter)}
                className="text-[11px] font-bold text-amber-400 hover:underline flex items-center gap-1"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Convertir pulgadas a ft</span>
              </button>
            </div>

            {/* Quick chips */}
            <div className="flex flex-wrap gap-1.5">
              {popularAccessories.map(acc => (
                <button
                  key={acc.id}
                  type="button"
                  onClick={() => handleAddOrIncrementItem(acc)}
                  className="px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-200 active:scale-95 transition flex items-center gap-1 touch-target"
                >
                  <Plus className="w-3.5 h-3.5 text-amber-400" />
                  <span>{acc.name}</span>
                </button>
              ))}
            </div>

            {/* Search catalog */}
            <div className="pt-2 border-t border-slate-800">
              <div className="relative mb-2">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Buscar en catálogo completo (ej. Crash rail, espejo...)"
                  value={accessorySearch}
                  onChange={e => setAccessorySearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 text-slate-200 text-xs border border-slate-800 focus:outline-hidden focus:border-amber-400"
                />
              </div>

              {accessorySearch && (
                <div className="max-h-48 overflow-y-auto space-y-1 pr-1">
                  {filteredAccessories.slice(0, 10).map(acc => (
                    <button
                      key={acc.id}
                      type="button"
                      onClick={() => {
                        handleAddOrIncrementItem(acc);
                        setAccessorySearch('');
                      }}
                      className="w-full p-2 rounded-xl bg-slate-950/70 hover:bg-slate-800 border border-slate-800/80 text-left text-xs flex items-center justify-between"
                    >
                      <span className="font-semibold text-slate-200">{acc.name}</span>
                      <span className="text-[10px] text-amber-400 font-bold">{acc.unit}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Inch to Feet Converter Drawer */}
          {showConverter && (
            <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-700/50 space-y-2 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <Calculator className="w-4 h-4" />
                  Conversor Crash Rail / Hand Rail (Pulgadas a Pies)
                </h4>
                <button
                  type="button"
                  onClick={() => setShowConverter(false)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <p className="text-[11px] text-slate-300">
                Ejemplo real: 1085 pulgadas de crash rail equivalen a 90.4 ft.
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Pulgadas (ej. 1085)"
                  value={converterInches}
                  onChange={e => setConverterInches(e.target.value)}
                  className="flex-1 bg-slate-950 text-white font-bold text-sm px-3 py-2 rounded-xl border border-slate-700"
                />
                <button
                  type="button"
                  onClick={() => {
                    // Find crash rail or first item
                    let idx = reportItems.findIndex(it =>
                      it.accessoryName.toLowerCase().includes('crash') ||
                      it.accessoryName.toLowerCase().includes('hand')
                    );
                    if (idx < 0) {
                      // Add crash rail to items first
                      const crashAcc = accessories.find(a => a.name.toLowerCase().includes('crash')) || accessories[0];
                      if (crashAcc) {
                        handleAddOrIncrementItem(crashAcc);
                        idx = reportItems.length;
                      }
                    }
                    if (idx >= 0) {
                      handleApplyConvertedInches(idx);
                    }
                  }}
                  className="px-3 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                >
                  Convertir y Asignar
                </button>
              </div>
            </div>
          )}

          {/* Current Added Items List with Big +/- Steppers */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Instalaciones Registradas ({reportItems.length})
              </p>
              {reportItems.length > 0 && (
                <button
                  type="button"
                  onClick={() => setReportItems([])}
                  className="text-[11px] text-rose-400 hover:underline"
                >
                  Borrar todas
                </button>
              )}
            </div>

            {reportItems.length === 0 ? (
              <div className="p-6 rounded-2xl bg-slate-900/50 border border-dashed border-slate-800 text-center space-y-1">
                <p className="text-xs text-slate-400">
                  No has agregado piezas o láminas todavía.
                </p>
                <p className="text-[11px] text-slate-500">
                  (Si hoy solo realizaron tareas preparatorias como limpieza o punch list, puedes continuar al paso siguiente).
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {reportItems.map((item, idx) => (
                  <div
                    key={item.accessoryId}
                    className="p-3.5 sm:p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h4 className="font-bold text-sm text-white leading-tight">
                          {item.accessoryName}
                        </h4>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">
                          Unidad: {item.unit}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleUpdateItemQuantity(idx, 0)}
                        className="p-1 rounded-md text-slate-500 hover:text-rose-400"
                        title="Eliminar ítem"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Stepper with Large Buttons */}
                    <div className="flex items-center justify-between gap-3 pt-1">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleUpdateItemQuantity(idx, item.quantity - 1)}
                          className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 font-black text-lg flex items-center justify-center border border-slate-700 touch-target"
                        >
                          <Minus className="w-5 h-5" />
                        </button>
                        <input
                          type="number"
                          step="any"
                          value={item.quantity}
                          onChange={e =>
                            handleUpdateItemQuantity(idx, parseFloat(e.target.value) || 0)
                          }
                          className="w-20 sm:w-24 text-center bg-slate-950 text-white font-mono font-black text-base px-2 py-2.5 rounded-xl border border-slate-700 focus:outline-hidden focus:border-amber-400"
                        />
                        <button
                          type="button"
                          onClick={() => handleUpdateItemQuantity(idx, item.quantity + 1)}
                          className="w-11 h-11 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-black text-lg flex items-center justify-center border border-amber-400 shadow-sm touch-target"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>

                      <span className="font-bold text-xs text-slate-300">
                        {item.quantity} {item.unit}
                      </span>
                    </div>

                    {/* Measurement / Area Notes */}
                    <input
                      type="text"
                      placeholder="Nota de medida o ubicación (ej. '1085 in' o 'Habitaciones 401-410')"
                      value={item.measureNotes || ''}
                      onChange={e => handleUpdateItemNotes(idx, e.target.value)}
                      className="w-full text-xs px-3 py-1.5 rounded-lg bg-slate-950 text-slate-300 border border-slate-800 focus:border-amber-400"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="py-3.5 px-4 rounded-2xl bg-slate-800 text-slate-200 font-bold text-xs flex items-center gap-1 border border-slate-700 touch-target"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Atrás</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className="flex-1 py-3.5 rounded-2xl bg-amber-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-98 transition touch-target"
            >
              <span>Siguiente: Actividades</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 4: ACTIVIDADES SIN PRODUCTO Y NOVEDADES */}
      {/* ========================================================================= */}
      {currentStep === 4 && (
        <div className="space-y-5 animate-in fade-in duration-150">
          {/* Card: Actividades sin producto */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Actividades Realizadas (Tareas preparatorias o sin producto)
            </label>
            <p className="text-[11px] text-slate-400">
              Selecciona las tareas que correspondan al día de hoy:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {COMMON_ACTIVITIES.map(act => {
                const isSelected = selectedActivities.includes(act);
                return (
                  <button
                    key={act}
                    type="button"
                    onClick={() => handleToggleActivity(act)}
                    className={`p-3 rounded-xl text-left text-xs font-semibold border transition-all flex items-center justify-between touch-target ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span>{act}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Custom activity input */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
              <input
                type="text"
                placeholder="Otra actividad específica..."
                value={customActivity}
                onChange={e => setCustomActivity(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCustomActivity();
                  }
                }}
                className="flex-1 bg-slate-950 text-slate-200 text-xs px-3 py-2.5 rounded-xl border border-slate-800 focus:outline-hidden focus:border-amber-400"
              />
              <button
                type="button"
                onClick={handleAddCustomActivity}
                className="px-3.5 py-2.5 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs border border-slate-700 hover:bg-slate-700"
              >
                Agregar
              </button>
            </div>
          </div>

          {/* Card: Incidencias y Observaciones */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Incidencias y Novedades de la Obra
            </label>

            {/* Incident selector */}
            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">
                Tipo de Incidencia:
              </label>
              <select
                value={incidentType}
                onChange={e => setIncidentType(e.target.value as IncidentType)}
                className="w-full bg-slate-950 text-white font-bold text-xs px-3 py-2.5 rounded-xl border border-slate-700 focus:outline-hidden focus:border-amber-400"
              >
                <option value="ninguna">Ninguna (Todo normal)</option>
                <option value="material faltante">Material faltante</option>
                <option value="área no lista">Área no lista / sin acceso</option>
                <option value="esperando otro gremio">Esperando a otro gremio</option>
                <option value="clima">Clima / lluvia</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            {/* Observations text area */}
            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">
                Observaciones o notas adicionales:
              </label>
              <textarea
                rows={3}
                placeholder="Escribe detalles del día, pendientes o condiciones..."
                value={observations}
                onChange={e => setObservations(e.target.value)}
                className="w-full bg-slate-950 text-slate-200 text-xs p-3 rounded-xl border border-slate-800 focus:outline-hidden focus:border-amber-400"
              />
            </div>

            {/* Photo Attachment (Simulated) */}
            <div className="pt-2 border-t border-slate-800">
              <label className="text-[11px] font-bold text-slate-400 block mb-1">
                Fotos de la obra (opcional):
              </label>
              <label className="flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed border-slate-800 bg-slate-950 hover:border-slate-700 cursor-pointer text-slate-400 hover:text-slate-200 text-xs font-semibold">
                <Camera className="w-4 h-4 text-amber-400" />
                <span>Tomar foto o subir desde galería</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSimulatePhoto}
                  className="hidden"
                />
              </label>

              {photoPreview && (
                <div className="relative mt-2 w-28 h-28 rounded-xl overflow-hidden border border-slate-700">
                  <img
                    src={photoPreview}
                    alt="Foto de obra"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setPhotoPreview(null)}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center text-xs"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="py-3.5 px-4 rounded-2xl bg-slate-800 text-slate-200 font-bold text-xs flex items-center gap-1 border border-slate-700 touch-target"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Atrás</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(5)}
              className="flex-1 py-3.5 rounded-2xl bg-amber-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-98 transition touch-target"
            >
              <span>Revisar y Enviar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 5: RESUMEN Y ENVÍO */}
      {/* ========================================================================= */}
      {currentStep === 5 && (
        <div className="space-y-5 animate-in fade-in duration-150">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                  Confirmación de Reporte Diario
                </span>
                <h3 className="text-base sm:text-lg font-black text-white">
                  {selectedSite?.name || 'Sitio'}
                </h3>
                <p className="text-xs text-slate-400">
                  {workDate} • Contratista: {selectedSite?.contractor_name || 'AP'}
                </p>
              </div>
              {isWeekendDay(workDate) && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-slate-950">
                  Fin de Semana
                </span>
              )}
            </div>

            {/* Crew summary */}
            <div className="space-y-1.5 text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                Equipo y Horas:
              </span>
              <div className="space-y-1">
                {crewInputs.map(c => (
                  <div
                    key={c.userId}
                    className="flex items-center justify-between py-1 px-2.5 rounded-lg bg-slate-950"
                  >
                    <span className="font-semibold text-slate-200">{c.userName}</span>
                    <span className="font-mono font-bold text-amber-400">
                      {c.isSupervisorNoHours
                        ? 'Supervisión'
                        : `${c.startTime} a ${c.endTime} (${c.hours.toFixed(2)}h)`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Items summary */}
            {reportItems.length > 0 && (
              <div className="space-y-1.5 text-xs">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                  Producción ({reportItems.length} ítems):
                </span>
                <div className="space-y-1">
                  {reportItems.map(it => (
                    <div
                      key={it.accessoryId}
                      className="flex items-center justify-between py-1 px-2.5 rounded-lg bg-slate-950"
                    >
                      <div className="min-w-0 pr-2">
                        <span className="font-semibold text-slate-200 truncate block">
                          {it.accessoryName}
                        </span>
                        {it.measureNotes && (
                          <span className="text-[10px] text-amber-400/90">{it.measureNotes}</span>
                        )}
                      </div>
                      <span className="font-bold text-white shrink-0">
                        {it.quantity} {it.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Activities summary */}
            {selectedActivities.length > 0 && (
              <div className="space-y-1.5 text-xs">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                  Actividades:
                </span>
                <div className="flex flex-wrap gap-1">
                  {selectedActivities.map(a => (
                    <span
                      key={a}
                      className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[11px]"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Incident / Notes */}
            {(incidentType !== 'ninguna' || observations) && (
              <div className="p-3 rounded-xl bg-slate-950 text-xs space-y-1">
                {incidentType !== 'ninguna' && (
                  <p className="font-bold text-amber-400">Incidencia: {incidentType}</p>
                )}
                {observations && <p className="text-slate-300">{observations}</p>}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              type="button"
              disabled={saving}
              onClick={() => handleSubmitReport(false)}
              className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-base flex items-center justify-center gap-2 shadow-xl shadow-amber-500/25 active:scale-98 transition disabled:opacity-50 touch-target"
            >
              <Send className="w-5 h-5" />
              <span>{saving ? 'ENVIANDO...' : 'ENVIAR REPORTE'}</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                disabled={saving}
                onClick={() => handleSubmitReport(true)}
                className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 touch-target"
              >
                <Save className="w-4 h-4" />
                <span>Guardar Borrador</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="py-3 rounded-xl bg-slate-900 text-slate-400 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-800"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Modificar datos</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
