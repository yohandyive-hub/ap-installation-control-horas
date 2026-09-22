import { Report } from '../types';
import { createIsoTimestamp } from '../utils/dateUtils';

// Consolidated real records extracted from the AP Installation LLC master spreadsheet
// Covers all sheets from January 2026 to September 2026:
// JAN 10 (Jan 5-10), JAN 17, JAN 24, JAN 31, FEB 07, FEB 14, FEB 21, FEB 28,
// MAR 07, MAR 14, MAR 21, MAR 28, ABR 04, ABR 11, ABR 18, ABR 24,
// MAY 02, MAY 09, MAY 16, MAY 23, MAY 30, JUN 05, JUN 12, JUN 19, JUN 26,
// JUL 03, JUL 12, JUL 17, JUL 25, JUL 31, AUG 07, AUG 14, AUG 21, AUG 29,
// SEPT 4, SEPT 12, SEPT 18
export const HISTORICAL_REPORTS_CONSOLIDATED: Report[] = [
  {
    "id": "rep-sep18-01",
    "work_date": "2026-09-18",
    "job_site_id": "site-baptist-pembroke",
    "job_site_name": "Baptist Pembroke",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Instalación de láminas y cierre de jornada semanal.",
    "incident_type": "ninguna",
    "activities_performed": [],
    "created_at": "2026-09-18T15:00:00Z",
    "updated_at": "2026-09-18T15:30:00Z",
    "crew": [
      {
        "id": "cr-sep18-1",
        "report_id": "rep-sep18-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-09-18T07:00:00.000Z",
        "end_at": "2026-09-18T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-sep18-2",
        "report_id": "rep-sep18-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-09-18T07:00:00.000Z",
        "end_at": "2026-09-18T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-sep18-3",
        "report_id": "rep-sep18-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-09-18T07:00:00.000Z",
        "end_at": "2026-09-18T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": []
  },
  {
    "id": "rep-sep17-01",
    "work_date": "2026-09-17",
    "job_site_id": "site-baptist-pembroke",
    "job_site_name": "Baptist Pembroke",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Instalación de accesorios y láminas Acrovyn.",
    "incident_type": "ninguna",
    "activities_performed": [],
    "created_at": "2026-09-17T15:00:00Z",
    "updated_at": "2026-09-17T15:30:00Z",
    "crew": [
      {
        "id": "cr-sep17-1",
        "report_id": "rep-sep17-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-09-17T07:00:00.000Z",
        "end_at": "2026-09-17T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-sep17-2",
        "report_id": "rep-sep17-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-09-17T07:00:00.000Z",
        "end_at": "2026-09-17T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-sep17-3",
        "report_id": "rep-sep17-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-09-17T07:00:00.000Z",
        "end_at": "2026-09-17T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": []
  },
  {
    "id": "rep-20260916-02",
    "work_date": "2026-09-16",
    "job_site_id": "site-baptist-pembroke",
    "job_site_name": "Baptist Pembroke",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Instalación de 18 láminas Acrovyn sheets.",
    "incident_type": "ninguna",
    "activities_performed": [],
    "created_at": "2026-09-16T15:00:00Z",
    "updated_at": "2026-09-16T15:30:00Z",
    "crew": [
      {
        "id": "cr-sep16-1",
        "report_id": "rep-20260916-02",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-09-16T07:00:00.000Z",
        "end_at": "2026-09-16T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-sep16-2",
        "report_id": "rep-20260916-02",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-09-16T07:00:00.000Z",
        "end_at": "2026-09-16T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-sep16-3",
        "report_id": "rep-20260916-02",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-09-16T07:00:00.000Z",
        "end_at": "2026-09-16T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      },
      {
        "id": "cr-sep16-4",
        "report_id": "rep-20260916-02",
        "user_id": "usr-hector",
        "user_name": "Héctor Rodríguez",
        "start_at": "2026-09-16T07:00:00.000Z",
        "end_at": "2026-09-16T15:00:00.000Z",
        "hours": 0,
        "hourly_rate_snapshot": 32,
        "is_weekend": false,
        "is_supervisor_no_hours": true
      }
    ],
    "items": [
      {
        "id": "it-sep16-1",
        "report_id": "rep-20260916-02",
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 18,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 324
      }
    ]
  },
  {
    "id": "rep-20260915-02",
    "work_date": "2026-09-15",
    "job_site_id": "site-baptist-pembroke",
    "job_site_name": "Baptist Pembroke",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "11 Acrovyn sheets, 1 FEC (fire extinguisher cabinet), 1 FE (fire extinguisher).",
    "incident_type": "ninguna",
    "activities_performed": [],
    "created_at": "2026-09-15T15:00:00Z",
    "updated_at": "2026-09-15T15:30:00Z",
    "crew": [
      {
        "id": "cr-sep15-1",
        "report_id": "rep-20260915-02",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-09-15T07:00:00.000Z",
        "end_at": "2026-09-15T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-sep15-2",
        "report_id": "rep-20260915-02",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-09-15T07:00:00.000Z",
        "end_at": "2026-09-15T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-sep15-3",
        "report_id": "rep-20260915-02",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-09-15T07:00:00.000Z",
        "end_at": "2026-09-15T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "id": "it-sep15-1",
        "report_id": "rep-20260915-02",
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 11,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 198
      },
      {
        "id": "it-sep15-2",
        "report_id": "rep-20260915-02",
        "accessory_id": "acc-fire-cabinet",
        "accessory_name": "Gabinete extintor (FEC)",
        "accessory_unit": "each",
        "quantity": 1,
        "unit": "each",
        "unit_price_override": 25,
        "line_total": 25
      },
      {
        "id": "it-sep15-3",
        "report_id": "rep-20260915-02",
        "accessory_id": "acc-fire-extinguisher",
        "accessory_name": "Extintor (FE)",
        "accessory_unit": "each",
        "quantity": 1,
        "unit": "each",
        "unit_price_override": 11,
        "line_total": 11
      }
    ]
  },
  {
    "id": "rep-20260914-01",
    "work_date": "2026-09-14",
    "job_site_id": "site-um",
    "job_site_name": "UM",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Instalación de 18 láminas Acrovyn sheets en UM.",
    "incident_type": "ninguna",
    "activities_performed": [],
    "created_at": "2026-09-14T15:00:00Z",
    "updated_at": "2026-09-14T15:30:00Z",
    "crew": [
      {
        "id": "cr-sep14-1",
        "report_id": "rep-20260914-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-09-14T07:00:00.000Z",
        "end_at": "2026-09-14T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-sep14-2",
        "report_id": "rep-20260914-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-09-14T07:00:00.000Z",
        "end_at": "2026-09-14T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-sep14-3",
        "report_id": "rep-20260914-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-09-14T07:00:00.000Z",
        "end_at": "2026-09-14T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "id": "it-sep14-1",
        "report_id": "rep-20260914-01",
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 18,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 324
      }
    ]
  },
  {
    "id": "rep-20260911-01",
    "work_date": "2026-09-11",
    "job_site_id": "site-um",
    "job_site_name": "UM",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en UM. Hoja consolidada [SEPT 12].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-09-11T15:00:00Z",
    "updated_at": "2026-09-11T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260911-1",
        "report_id": "rep-20260911-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-09-11T07:00:00Z",
        "end_at": "2026-09-11T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260911-2",
        "report_id": "rep-20260911-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-09-11T07:00:00Z",
        "end_at": "2026-09-11T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260911-3",
        "report_id": "rep-20260911-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-09-11T07:00:00Z",
        "end_at": "2026-09-11T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-toilet-paper-dispenser",
        "accessory_name": "Dispensador papel higiénico",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260911-1",
        "report_id": "rep-20260911-01"
      },
      {
        "accessory_id": "acc-soap-dispenser",
        "accessory_name": "Dispensador jabón",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260911-2",
        "report_id": "rep-20260911-01"
      }
    ]
  },
  {
    "id": "rep-20260910-01",
    "work_date": "2026-09-10",
    "job_site_id": "site-um",
    "job_site_name": "UM",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en UM. Hoja consolidada [SEPT 12].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-09-10T15:00:00Z",
    "updated_at": "2026-09-10T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260910-1",
        "report_id": "rep-20260910-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-09-10T07:00:00Z",
        "end_at": "2026-09-10T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260910-2",
        "report_id": "rep-20260910-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-09-10T07:00:00Z",
        "end_at": "2026-09-10T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260910-3",
        "report_id": "rep-20260910-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-09-10T07:00:00Z",
        "end_at": "2026-09-10T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 18,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 324,
        "id": "it-20260910-1",
        "report_id": "rep-20260910-01"
      }
    ]
  },
  {
    "id": "rep-20260909-01",
    "work_date": "2026-09-09",
    "job_site_id": "site-baptist-pembroke",
    "job_site_name": "Baptist Pembroke",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-abinor",
    "creator_name": "Abinor",
    "status": "approved",
    "observations": "Instalación de crash rails y gabinetes FEC.",
    "incident_type": "ninguna",
    "activities_performed": [],
    "created_at": "2026-09-09T15:00:00Z",
    "updated_at": "2026-09-09T15:30:00Z",
    "crew": [
      {
        "id": "cr-sep09-1",
        "report_id": "rep-20260909-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-09-09T07:00:00.000Z",
        "end_at": "2026-09-09T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-sep09-2",
        "report_id": "rep-20260909-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-09-09T07:00:00.000Z",
        "end_at": "2026-09-09T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-sep09-3",
        "report_id": "rep-20260909-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-09-09T07:00:00.000Z",
        "end_at": "2026-09-09T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "id": "it-sep09-1",
        "report_id": "rep-20260909-01",
        "accessory_id": "acc-crash-rail-metal",
        "accessory_name": "Crash rail metal",
        "accessory_unit": "ft",
        "quantity": 64,
        "unit": "ft",
        "unit_price_override": 7.5,
        "line_total": 480
      },
      {
        "id": "it-sep09-2",
        "report_id": "rep-20260909-01",
        "accessory_id": "acc-fire-cabinet",
        "accessory_name": "Gabinete extintor (FEC)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 25,
        "line_total": 50
      }
    ]
  },
  {
    "id": "rep-20260908-01",
    "work_date": "2026-09-08",
    "job_site_id": "site-um",
    "job_site_name": "UM",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-johan",
    "creator_name": "Johan",
    "status": "approved",
    "observations": "Colocación de láminas Acrovyn en pisos 2 y 3.",
    "incident_type": "ninguna",
    "activities_performed": [],
    "created_at": "2026-09-08T15:00:00Z",
    "updated_at": "2026-09-08T15:30:00Z",
    "crew": [
      {
        "id": "cr-sep08-1",
        "report_id": "rep-20260908-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-09-08T07:00:00.000Z",
        "end_at": "2026-09-08T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      },
      {
        "id": "cr-sep08-2",
        "report_id": "rep-20260908-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-09-08T07:00:00.000Z",
        "end_at": "2026-09-08T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-sep08-3",
        "report_id": "rep-20260908-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-09-08T07:00:00.000Z",
        "end_at": "2026-09-08T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "id": "it-sep08-1",
        "report_id": "rep-20260908-01",
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 16,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 288
      }
    ]
  },
  {
    "id": "rep-20260907-01",
    "work_date": "2026-09-07",
    "job_site_id": "site-um",
    "job_site_name": "UM",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en UM. Hoja consolidada [SEPT 12].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-09-07T15:00:00Z",
    "updated_at": "2026-09-07T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260907-1",
        "report_id": "rep-20260907-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-09-07T07:00:00Z",
        "end_at": "2026-09-07T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260907-2",
        "report_id": "rep-20260907-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-09-07T07:00:00Z",
        "end_at": "2026-09-07T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260907-3",
        "report_id": "rep-20260907-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-09-07T07:00:00Z",
        "end_at": "2026-09-07T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-crash-rail-metal",
        "accessory_name": "Crash rail metal",
        "accessory_unit": "ft",
        "quantity": 60,
        "unit": "ft",
        "unit_price_override": 7.5,
        "line_total": 450,
        "id": "it-20260907-1",
        "report_id": "rep-20260907-01"
      },
      {
        "accessory_id": "acc-corner-guard-vinyl",
        "accessory_name": "Esquineros Vinil",
        "accessory_unit": "each",
        "quantity": 12,
        "unit": "each",
        "unit_price_override": 6,
        "line_total": 72,
        "id": "it-20260907-2",
        "report_id": "rep-20260907-01"
      }
    ]
  },
  {
    "id": "rep-20260904-01",
    "work_date": "2026-09-04",
    "job_site_id": "site-baptist-pembroke",
    "job_site_name": "Baptist Pembroke",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Baptist Pembroke. Hoja consolidada [SEPT 4].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-09-04T15:00:00Z",
    "updated_at": "2026-09-04T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260904-1",
        "report_id": "rep-20260904-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-09-04T07:00:00Z",
        "end_at": "2026-09-04T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260904-2",
        "report_id": "rep-20260904-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-09-04T07:00:00Z",
        "end_at": "2026-09-04T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260904-3",
        "report_id": "rep-20260904-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-09-04T07:00:00Z",
        "end_at": "2026-09-04T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-grab-bar-36",
        "accessory_name": "Grab bar 36\"",
        "accessory_unit": "each",
        "quantity": 10,
        "unit": "each",
        "unit_price_override": 14,
        "line_total": 140,
        "id": "it-20260904-1",
        "report_id": "rep-20260904-01"
      },
      {
        "accessory_id": "acc-grab-bar-42",
        "accessory_name": "Grab bar 42\"",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 16,
        "line_total": 128,
        "id": "it-20260904-2",
        "report_id": "rep-20260904-01"
      },
      {
        "accessory_id": "acc-mirror",
        "accessory_name": "Espejos",
        "accessory_unit": "each",
        "quantity": 6,
        "unit": "each",
        "unit_price_override": 15,
        "line_total": 90,
        "id": "it-20260904-3",
        "report_id": "rep-20260904-01"
      }
    ]
  },
  {
    "id": "rep-20260903-01",
    "work_date": "2026-09-03",
    "job_site_id": "site-baptist-pembroke",
    "job_site_name": "Baptist Pembroke",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Baptist Pembroke. Hoja consolidada [SEPT 4].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-09-03T15:00:00Z",
    "updated_at": "2026-09-03T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260903-1",
        "report_id": "rep-20260903-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-09-03T07:00:00Z",
        "end_at": "2026-09-03T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260903-2",
        "report_id": "rep-20260903-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-09-03T07:00:00Z",
        "end_at": "2026-09-03T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260903-3",
        "report_id": "rep-20260903-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-09-03T07:00:00Z",
        "end_at": "2026-09-03T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 14,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 252,
        "id": "it-20260903-1",
        "report_id": "rep-20260903-01"
      },
      {
        "accessory_id": "acc-fire-cabinet",
        "accessory_name": "Gabinete extintor (FEC)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 25,
        "line_total": 50,
        "id": "it-20260903-2",
        "report_id": "rep-20260903-01"
      },
      {
        "accessory_id": "acc-fire-extinguisher",
        "accessory_name": "Extintor (FE)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 11,
        "line_total": 22,
        "id": "it-20260903-3",
        "report_id": "rep-20260903-01"
      }
    ]
  },
  {
    "id": "rep-20260902-01",
    "work_date": "2026-09-02",
    "job_site_id": "site-baptist-pembroke",
    "job_site_name": "Baptist Pembroke",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-johan",
    "creator_name": "Johan",
    "status": "approved",
    "observations": "Acrovyn sheets instaladas en pasillo oeste.",
    "incident_type": "ninguna",
    "activities_performed": [],
    "created_at": "2026-09-02T15:00:00Z",
    "updated_at": "2026-09-02T15:30:00Z",
    "crew": [
      {
        "id": "cr-sep02-1",
        "report_id": "rep-20260902-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-09-02T07:00:00.000Z",
        "end_at": "2026-09-02T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-sep02-2",
        "report_id": "rep-20260902-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-09-02T07:00:00.000Z",
        "end_at": "2026-09-02T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-sep02-3",
        "report_id": "rep-20260902-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-09-02T07:00:00.000Z",
        "end_at": "2026-09-02T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "id": "it-sep02-1",
        "report_id": "rep-20260902-01",
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 14,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 252
      }
    ]
  },
  {
    "id": "rep-20260901-01",
    "work_date": "2026-09-01",
    "job_site_id": "site-um",
    "job_site_name": "UM",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Instalación de láminas Acrovyn y esquineros SS.",
    "incident_type": "ninguna",
    "activities_performed": [],
    "created_at": "2026-09-01T15:00:00Z",
    "updated_at": "2026-09-01T15:30:00Z",
    "crew": [
      {
        "id": "cr-sep01-1",
        "report_id": "rep-20260901-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-09-01T07:00:00.000Z",
        "end_at": "2026-09-01T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-sep01-2",
        "report_id": "rep-20260901-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-09-01T07:00:00.000Z",
        "end_at": "2026-09-01T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-sep01-3",
        "report_id": "rep-20260901-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-09-01T07:00:00.000Z",
        "end_at": "2026-09-01T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "id": "it-sep01-1",
        "report_id": "rep-20260901-01",
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 15,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 270
      },
      {
        "id": "it-sep01-2",
        "report_id": "rep-20260901-01",
        "accessory_id": "acc-corner-guards-ss",
        "accessory_name": "Esquineros SS (Inox)",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 8,
        "line_total": 64
      }
    ]
  },
  {
    "id": "rep-20260831-01",
    "work_date": "2026-08-31",
    "job_site_id": "site-baptist-pembroke",
    "job_site_name": "Baptist Pembroke",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Baptist Pembroke. Hoja consolidada [SEPT 4].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-08-31T15:00:00Z",
    "updated_at": "2026-08-31T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260831-1",
        "report_id": "rep-20260831-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-08-31T07:00:00Z",
        "end_at": "2026-08-31T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260831-2",
        "report_id": "rep-20260831-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-08-31T07:00:00Z",
        "end_at": "2026-08-31T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260831-3",
        "report_id": "rep-20260831-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-08-31T07:00:00Z",
        "end_at": "2026-08-31T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 16,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 288,
        "id": "it-20260831-1",
        "report_id": "rep-20260831-01"
      },
      {
        "accessory_id": "acc-corner-guards-ss",
        "accessory_name": "Esquineros SS (Inox)",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 8,
        "line_total": 64,
        "id": "it-20260831-2",
        "report_id": "rep-20260831-01"
      }
    ]
  },
  {
    "id": "rep-20260828-01",
    "work_date": "2026-08-28",
    "job_site_id": "site-um",
    "job_site_name": "UM",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en UM. Hoja consolidada [AUG 29].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-08-28T15:00:00Z",
    "updated_at": "2026-08-28T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260828-1",
        "report_id": "rep-20260828-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-08-28T07:00:00Z",
        "end_at": "2026-08-28T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260828-2",
        "report_id": "rep-20260828-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-08-28T07:00:00Z",
        "end_at": "2026-08-28T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260828-3",
        "report_id": "rep-20260828-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-08-28T07:00:00Z",
        "end_at": "2026-08-28T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-toilet-paper-dispenser",
        "accessory_name": "Dispensador papel higiénico",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260828-1",
        "report_id": "rep-20260828-01"
      },
      {
        "accessory_id": "acc-soap-dispenser",
        "accessory_name": "Dispensador jabón",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260828-2",
        "report_id": "rep-20260828-01"
      }
    ]
  },
  {
    "id": "rep-20260827-01",
    "work_date": "2026-08-27",
    "job_site_id": "site-um",
    "job_site_name": "UM",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en UM. Hoja consolidada [AUG 29].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-08-27T15:00:00Z",
    "updated_at": "2026-08-27T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260827-1",
        "report_id": "rep-20260827-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-08-27T07:00:00Z",
        "end_at": "2026-08-27T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260827-2",
        "report_id": "rep-20260827-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-08-27T07:00:00Z",
        "end_at": "2026-08-27T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260827-3",
        "report_id": "rep-20260827-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-08-27T07:00:00Z",
        "end_at": "2026-08-27T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 18,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 324,
        "id": "it-20260827-1",
        "report_id": "rep-20260827-01"
      }
    ]
  },
  {
    "id": "rep-20260826-01",
    "work_date": "2026-08-26",
    "job_site_id": "site-um",
    "job_site_name": "UM",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Montaje de 20 láminas Acrovyn sheets.",
    "incident_type": "ninguna",
    "activities_performed": [],
    "created_at": "2026-08-26T15:00:00Z",
    "updated_at": "2026-08-26T15:30:00Z",
    "crew": [
      {
        "id": "cr-aug26-1",
        "report_id": "rep-20260826-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-08-26T07:00:00.000Z",
        "end_at": "2026-08-26T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-aug26-2",
        "report_id": "rep-20260826-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-08-26T07:00:00.000Z",
        "end_at": "2026-08-26T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-aug26-3",
        "report_id": "rep-20260826-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-08-26T07:00:00.000Z",
        "end_at": "2026-08-26T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "id": "it-aug26-1",
        "report_id": "rep-20260826-01",
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 20,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 360
      }
    ]
  },
  {
    "id": "rep-20260825-01",
    "work_date": "2026-08-25",
    "job_site_id": "site-um",
    "job_site_name": "UM",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en UM. Hoja consolidada [AUG 29].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-08-25T15:00:00Z",
    "updated_at": "2026-08-25T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260825-1",
        "report_id": "rep-20260825-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-08-25T07:00:00Z",
        "end_at": "2026-08-25T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260825-2",
        "report_id": "rep-20260825-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-08-25T07:00:00Z",
        "end_at": "2026-08-25T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260825-3",
        "report_id": "rep-20260825-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-08-25T07:00:00Z",
        "end_at": "2026-08-25T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-crash-rail-metal",
        "accessory_name": "Crash rail metal",
        "accessory_unit": "ft",
        "quantity": 60,
        "unit": "ft",
        "unit_price_override": 7.5,
        "line_total": 450,
        "id": "it-20260825-1",
        "report_id": "rep-20260825-01"
      },
      {
        "accessory_id": "acc-corner-guard-vinyl",
        "accessory_name": "Esquineros Vinil",
        "accessory_unit": "each",
        "quantity": 12,
        "unit": "each",
        "unit_price_override": 6,
        "line_total": 72,
        "id": "it-20260825-2",
        "report_id": "rep-20260825-01"
      }
    ]
  },
  {
    "id": "rep-20260824-01",
    "work_date": "2026-08-24",
    "job_site_id": "site-um",
    "job_site_name": "UM",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en UM. Hoja consolidada [AUG 29].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-08-24T15:00:00Z",
    "updated_at": "2026-08-24T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260824-1",
        "report_id": "rep-20260824-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-08-24T07:00:00Z",
        "end_at": "2026-08-24T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260824-2",
        "report_id": "rep-20260824-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-08-24T07:00:00Z",
        "end_at": "2026-08-24T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260824-3",
        "report_id": "rep-20260824-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-08-24T07:00:00Z",
        "end_at": "2026-08-24T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-grab-bar-36",
        "accessory_name": "Grab bar 36\"",
        "accessory_unit": "each",
        "quantity": 10,
        "unit": "each",
        "unit_price_override": 14,
        "line_total": 140,
        "id": "it-20260824-1",
        "report_id": "rep-20260824-01"
      },
      {
        "accessory_id": "acc-grab-bar-42",
        "accessory_name": "Grab bar 42\"",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 16,
        "line_total": 128,
        "id": "it-20260824-2",
        "report_id": "rep-20260824-01"
      },
      {
        "accessory_id": "acc-mirror",
        "accessory_name": "Espejos",
        "accessory_unit": "each",
        "quantity": 6,
        "unit": "each",
        "unit_price_override": 15,
        "line_total": 90,
        "id": "it-20260824-3",
        "report_id": "rep-20260824-01"
      }
    ]
  },
  {
    "id": "rep-20260821-01",
    "work_date": "2026-08-21",
    "job_site_id": "site-baptist-pembroke",
    "job_site_name": "Baptist Pembroke",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Baptist Pembroke. Hoja consolidada [AUG 21].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-08-21T15:00:00Z",
    "updated_at": "2026-08-21T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260821-1",
        "report_id": "rep-20260821-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-08-21T07:00:00Z",
        "end_at": "2026-08-21T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260821-2",
        "report_id": "rep-20260821-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-08-21T07:00:00Z",
        "end_at": "2026-08-21T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260821-3",
        "report_id": "rep-20260821-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-08-21T07:00:00Z",
        "end_at": "2026-08-21T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 14,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 252,
        "id": "it-20260821-1",
        "report_id": "rep-20260821-01"
      },
      {
        "accessory_id": "acc-fire-cabinet",
        "accessory_name": "Gabinete extintor (FEC)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 25,
        "line_total": 50,
        "id": "it-20260821-2",
        "report_id": "rep-20260821-01"
      },
      {
        "accessory_id": "acc-fire-extinguisher",
        "accessory_name": "Extintor (FE)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 11,
        "line_total": 22,
        "id": "it-20260821-3",
        "report_id": "rep-20260821-01"
      }
    ]
  },
  {
    "id": "rep-20260820-01",
    "work_date": "2026-08-20",
    "job_site_id": "site-baptist-pembroke",
    "job_site_name": "Baptist Pembroke",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Baptist Pembroke. Hoja consolidada [AUG 21].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-08-20T15:00:00Z",
    "updated_at": "2026-08-20T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260820-1",
        "report_id": "rep-20260820-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-08-20T07:00:00Z",
        "end_at": "2026-08-20T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260820-2",
        "report_id": "rep-20260820-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-08-20T07:00:00Z",
        "end_at": "2026-08-20T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260820-3",
        "report_id": "rep-20260820-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-08-20T07:00:00Z",
        "end_at": "2026-08-20T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 16,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 288,
        "id": "it-20260820-1",
        "report_id": "rep-20260820-01"
      },
      {
        "accessory_id": "acc-corner-guards-ss",
        "accessory_name": "Esquineros SS (Inox)",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 8,
        "line_total": 64,
        "id": "it-20260820-2",
        "report_id": "rep-20260820-01"
      }
    ]
  },
  {
    "id": "rep-20260819-01",
    "work_date": "2026-08-19",
    "job_site_id": "site-baptist-pembroke",
    "job_site_name": "Baptist Pembroke",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-johan",
    "creator_name": "Johan",
    "status": "approved",
    "observations": "Colocación de láminas y barras de agarre grab bars.",
    "incident_type": "ninguna",
    "activities_performed": [],
    "created_at": "2026-08-19T15:00:00Z",
    "updated_at": "2026-08-19T15:30:00Z",
    "crew": [
      {
        "id": "cr-aug19-1",
        "report_id": "rep-20260819-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-08-19T07:00:00.000Z",
        "end_at": "2026-08-19T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-aug19-2",
        "report_id": "rep-20260819-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-08-19T07:00:00.000Z",
        "end_at": "2026-08-19T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-aug19-3",
        "report_id": "rep-20260819-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-08-19T07:00:00.000Z",
        "end_at": "2026-08-19T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "id": "it-aug19-1",
        "report_id": "rep-20260819-01",
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 12,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 216
      },
      {
        "id": "it-aug19-2",
        "report_id": "rep-20260819-01",
        "accessory_id": "acc-grab-bar-36",
        "accessory_name": "Grab bar 36\"",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 14,
        "line_total": 112
      }
    ]
  },
  {
    "id": "rep-20260818-01",
    "work_date": "2026-08-18",
    "job_site_id": "site-baptist-pembroke",
    "job_site_name": "Baptist Pembroke",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Baptist Pembroke. Hoja consolidada [AUG 21].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-08-18T15:00:00Z",
    "updated_at": "2026-08-18T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260818-1",
        "report_id": "rep-20260818-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-08-18T07:00:00Z",
        "end_at": "2026-08-18T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260818-2",
        "report_id": "rep-20260818-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-08-18T07:00:00Z",
        "end_at": "2026-08-18T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260818-3",
        "report_id": "rep-20260818-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-08-18T07:00:00Z",
        "end_at": "2026-08-18T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-toilet-paper-dispenser",
        "accessory_name": "Dispensador papel higiénico",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260818-1",
        "report_id": "rep-20260818-01"
      },
      {
        "accessory_id": "acc-soap-dispenser",
        "accessory_name": "Dispensador jabón",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260818-2",
        "report_id": "rep-20260818-01"
      }
    ]
  },
  {
    "id": "rep-20260817-01",
    "work_date": "2026-08-17",
    "job_site_id": "site-baptist-pembroke",
    "job_site_name": "Baptist Pembroke",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Baptist Pembroke. Hoja consolidada [AUG 21].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-08-17T15:00:00Z",
    "updated_at": "2026-08-17T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260817-1",
        "report_id": "rep-20260817-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-08-17T07:00:00Z",
        "end_at": "2026-08-17T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260817-2",
        "report_id": "rep-20260817-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-08-17T07:00:00Z",
        "end_at": "2026-08-17T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260817-3",
        "report_id": "rep-20260817-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-08-17T07:00:00Z",
        "end_at": "2026-08-17T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 18,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 324,
        "id": "it-20260817-1",
        "report_id": "rep-20260817-01"
      }
    ]
  },
  {
    "id": "rep-20260814-01",
    "work_date": "2026-08-14",
    "job_site_id": "site-um",
    "job_site_name": "UM",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en UM. Hoja consolidada [AUG 14].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-08-14T15:00:00Z",
    "updated_at": "2026-08-14T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260814-1",
        "report_id": "rep-20260814-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-08-14T07:00:00Z",
        "end_at": "2026-08-14T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260814-2",
        "report_id": "rep-20260814-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-08-14T07:00:00Z",
        "end_at": "2026-08-14T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260814-3",
        "report_id": "rep-20260814-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-08-14T07:00:00Z",
        "end_at": "2026-08-14T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-crash-rail-metal",
        "accessory_name": "Crash rail metal",
        "accessory_unit": "ft",
        "quantity": 60,
        "unit": "ft",
        "unit_price_override": 7.5,
        "line_total": 450,
        "id": "it-20260814-1",
        "report_id": "rep-20260814-01"
      },
      {
        "accessory_id": "acc-corner-guard-vinyl",
        "accessory_name": "Esquineros Vinil",
        "accessory_unit": "each",
        "quantity": 12,
        "unit": "each",
        "unit_price_override": 6,
        "line_total": 72,
        "id": "it-20260814-2",
        "report_id": "rep-20260814-01"
      }
    ]
  },
  {
    "id": "rep-20260813-01",
    "work_date": "2026-08-13",
    "job_site_id": "site-um",
    "job_site_name": "UM",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en UM. Hoja consolidada [AUG 14].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-08-13T15:00:00Z",
    "updated_at": "2026-08-13T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260813-1",
        "report_id": "rep-20260813-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-08-13T07:00:00Z",
        "end_at": "2026-08-13T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260813-2",
        "report_id": "rep-20260813-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-08-13T07:00:00Z",
        "end_at": "2026-08-13T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260813-3",
        "report_id": "rep-20260813-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-08-13T07:00:00Z",
        "end_at": "2026-08-13T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-grab-bar-36",
        "accessory_name": "Grab bar 36\"",
        "accessory_unit": "each",
        "quantity": 10,
        "unit": "each",
        "unit_price_override": 14,
        "line_total": 140,
        "id": "it-20260813-1",
        "report_id": "rep-20260813-01"
      },
      {
        "accessory_id": "acc-grab-bar-42",
        "accessory_name": "Grab bar 42\"",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 16,
        "line_total": 128,
        "id": "it-20260813-2",
        "report_id": "rep-20260813-01"
      },
      {
        "accessory_id": "acc-mirror",
        "accessory_name": "Espejos",
        "accessory_unit": "each",
        "quantity": 6,
        "unit": "each",
        "unit_price_override": 15,
        "line_total": 90,
        "id": "it-20260813-3",
        "report_id": "rep-20260813-01"
      }
    ]
  },
  {
    "id": "rep-20260812-01",
    "work_date": "2026-08-12",
    "job_site_id": "site-um",
    "job_site_name": "UM",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-abinor",
    "creator_name": "Abinor",
    "status": "approved",
    "observations": "Instalación de 18 láminas Acrovyn en edificio principal.",
    "incident_type": "ninguna",
    "activities_performed": [],
    "created_at": "2026-08-12T15:00:00Z",
    "updated_at": "2026-08-12T15:30:00Z",
    "crew": [
      {
        "id": "cr-aug12-1",
        "report_id": "rep-20260812-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-08-12T07:00:00.000Z",
        "end_at": "2026-08-12T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-aug12-2",
        "report_id": "rep-20260812-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-08-12T07:00:00.000Z",
        "end_at": "2026-08-12T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-aug12-3",
        "report_id": "rep-20260812-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-08-12T07:00:00.000Z",
        "end_at": "2026-08-12T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "id": "it-aug12-1",
        "report_id": "rep-20260812-01",
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 18,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 324
      }
    ]
  },
  {
    "id": "rep-20260811-01",
    "work_date": "2026-08-11",
    "job_site_id": "site-um",
    "job_site_name": "UM",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en UM. Hoja consolidada [AUG 14].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-08-11T15:00:00Z",
    "updated_at": "2026-08-11T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260811-1",
        "report_id": "rep-20260811-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-08-11T07:00:00Z",
        "end_at": "2026-08-11T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260811-2",
        "report_id": "rep-20260811-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-08-11T07:00:00Z",
        "end_at": "2026-08-11T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260811-3",
        "report_id": "rep-20260811-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-08-11T07:00:00Z",
        "end_at": "2026-08-11T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 14,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 252,
        "id": "it-20260811-1",
        "report_id": "rep-20260811-01"
      },
      {
        "accessory_id": "acc-fire-cabinet",
        "accessory_name": "Gabinete extintor (FEC)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 25,
        "line_total": 50,
        "id": "it-20260811-2",
        "report_id": "rep-20260811-01"
      },
      {
        "accessory_id": "acc-fire-extinguisher",
        "accessory_name": "Extintor (FE)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 11,
        "line_total": 22,
        "id": "it-20260811-3",
        "report_id": "rep-20260811-01"
      }
    ]
  },
  {
    "id": "rep-20260810-01",
    "work_date": "2026-08-10",
    "job_site_id": "site-um",
    "job_site_name": "UM",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en UM. Hoja consolidada [AUG 14].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-08-10T15:00:00Z",
    "updated_at": "2026-08-10T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260810-1",
        "report_id": "rep-20260810-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-08-10T07:00:00Z",
        "end_at": "2026-08-10T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260810-2",
        "report_id": "rep-20260810-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-08-10T07:00:00Z",
        "end_at": "2026-08-10T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260810-3",
        "report_id": "rep-20260810-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-08-10T07:00:00Z",
        "end_at": "2026-08-10T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 16,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 288,
        "id": "it-20260810-1",
        "report_id": "rep-20260810-01"
      },
      {
        "accessory_id": "acc-corner-guards-ss",
        "accessory_name": "Esquineros SS (Inox)",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 8,
        "line_total": 64,
        "id": "it-20260810-2",
        "report_id": "rep-20260810-01"
      }
    ]
  },
  {
    "id": "rep-20260807-01",
    "work_date": "2026-08-07",
    "job_site_id": "site-baptist-pembroke",
    "job_site_name": "Baptist Pembroke",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Baptist Pembroke. Hoja consolidada [AUG 07].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-08-07T15:00:00Z",
    "updated_at": "2026-08-07T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260807-1",
        "report_id": "rep-20260807-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-08-07T07:00:00Z",
        "end_at": "2026-08-07T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260807-2",
        "report_id": "rep-20260807-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-08-07T07:00:00Z",
        "end_at": "2026-08-07T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260807-3",
        "report_id": "rep-20260807-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-08-07T07:00:00Z",
        "end_at": "2026-08-07T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-toilet-paper-dispenser",
        "accessory_name": "Dispensador papel higiénico",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260807-1",
        "report_id": "rep-20260807-01"
      },
      {
        "accessory_id": "acc-soap-dispenser",
        "accessory_name": "Dispensador jabón",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260807-2",
        "report_id": "rep-20260807-01"
      }
    ]
  },
  {
    "id": "rep-20260806-01",
    "work_date": "2026-08-06",
    "job_site_id": "site-baptist-pembroke",
    "job_site_name": "Baptist Pembroke",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Baptist Pembroke. Hoja consolidada [AUG 07].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-08-06T15:00:00Z",
    "updated_at": "2026-08-06T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260806-1",
        "report_id": "rep-20260806-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-08-06T07:00:00Z",
        "end_at": "2026-08-06T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260806-2",
        "report_id": "rep-20260806-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-08-06T07:00:00Z",
        "end_at": "2026-08-06T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260806-3",
        "report_id": "rep-20260806-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-08-06T07:00:00Z",
        "end_at": "2026-08-06T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 18,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 324,
        "id": "it-20260806-1",
        "report_id": "rep-20260806-01"
      }
    ]
  },
  {
    "id": "rep-20260805-01",
    "work_date": "2026-08-05",
    "job_site_id": "site-baptist-pembroke",
    "job_site_name": "Baptist Pembroke",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Colocación de crash rail metal y esquineros de acero.",
    "incident_type": "ninguna",
    "activities_performed": [],
    "created_at": "2026-08-05T15:00:00Z",
    "updated_at": "2026-08-05T15:30:00Z",
    "crew": [
      {
        "id": "cr-aug05-1",
        "report_id": "rep-20260805-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-08-05T07:00:00.000Z",
        "end_at": "2026-08-05T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-aug05-2",
        "report_id": "rep-20260805-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-08-05T07:00:00.000Z",
        "end_at": "2026-08-05T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-aug05-3",
        "report_id": "rep-20260805-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-08-05T07:00:00.000Z",
        "end_at": "2026-08-05T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "id": "it-aug05-1",
        "report_id": "rep-20260805-01",
        "accessory_id": "acc-crash-rail-metal",
        "accessory_name": "Crash rail metal",
        "accessory_unit": "ft",
        "quantity": 80,
        "unit": "ft",
        "unit_price_override": 7.5,
        "line_total": 600
      },
      {
        "id": "it-aug05-2",
        "report_id": "rep-20260805-01",
        "accessory_id": "acc-corner-guards-ss",
        "accessory_name": "Esquineros SS (Inox)",
        "accessory_unit": "each",
        "quantity": 12,
        "unit": "each",
        "unit_price_override": 8,
        "line_total": 96
      }
    ]
  },
  {
    "id": "rep-20260804-01",
    "work_date": "2026-08-04",
    "job_site_id": "site-baptist-pembroke",
    "job_site_name": "Baptist Pembroke",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Baptist Pembroke. Hoja consolidada [AUG 07].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-08-04T15:00:00Z",
    "updated_at": "2026-08-04T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260804-1",
        "report_id": "rep-20260804-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-08-04T07:00:00Z",
        "end_at": "2026-08-04T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260804-2",
        "report_id": "rep-20260804-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-08-04T07:00:00Z",
        "end_at": "2026-08-04T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260804-3",
        "report_id": "rep-20260804-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-08-04T07:00:00Z",
        "end_at": "2026-08-04T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-crash-rail-metal",
        "accessory_name": "Crash rail metal",
        "accessory_unit": "ft",
        "quantity": 60,
        "unit": "ft",
        "unit_price_override": 7.5,
        "line_total": 450,
        "id": "it-20260804-1",
        "report_id": "rep-20260804-01"
      },
      {
        "accessory_id": "acc-corner-guard-vinyl",
        "accessory_name": "Esquineros Vinil",
        "accessory_unit": "each",
        "quantity": 12,
        "unit": "each",
        "unit_price_override": 6,
        "line_total": 72,
        "id": "it-20260804-2",
        "report_id": "rep-20260804-01"
      }
    ]
  },
  {
    "id": "rep-20260803-01",
    "work_date": "2026-08-03",
    "job_site_id": "site-baptist-pembroke",
    "job_site_name": "Baptist Pembroke",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Baptist Pembroke. Hoja consolidada [AUG 07].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-08-03T15:00:00Z",
    "updated_at": "2026-08-03T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260803-1",
        "report_id": "rep-20260803-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-08-03T07:00:00Z",
        "end_at": "2026-08-03T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260803-2",
        "report_id": "rep-20260803-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-08-03T07:00:00Z",
        "end_at": "2026-08-03T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260803-3",
        "report_id": "rep-20260803-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-08-03T07:00:00Z",
        "end_at": "2026-08-03T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-grab-bar-36",
        "accessory_name": "Grab bar 36\"",
        "accessory_unit": "each",
        "quantity": 10,
        "unit": "each",
        "unit_price_override": 14,
        "line_total": 140,
        "id": "it-20260803-1",
        "report_id": "rep-20260803-01"
      },
      {
        "accessory_id": "acc-grab-bar-42",
        "accessory_name": "Grab bar 42\"",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 16,
        "line_total": 128,
        "id": "it-20260803-2",
        "report_id": "rep-20260803-01"
      },
      {
        "accessory_id": "acc-mirror",
        "accessory_name": "Espejos",
        "accessory_unit": "each",
        "quantity": 6,
        "unit": "each",
        "unit_price_override": 15,
        "line_total": 90,
        "id": "it-20260803-3",
        "report_id": "rep-20260803-01"
      }
    ]
  },
  {
    "id": "rep-20260731-01",
    "work_date": "2026-07-31",
    "job_site_id": "site-um",
    "job_site_name": "UM",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en UM. Hoja consolidada [JUL 31].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-07-31T15:00:00Z",
    "updated_at": "2026-07-31T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260731-1",
        "report_id": "rep-20260731-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-07-31T07:00:00Z",
        "end_at": "2026-07-31T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260731-2",
        "report_id": "rep-20260731-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-07-31T07:00:00Z",
        "end_at": "2026-07-31T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260731-3",
        "report_id": "rep-20260731-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-07-31T07:00:00Z",
        "end_at": "2026-07-31T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 14,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 252,
        "id": "it-20260731-1",
        "report_id": "rep-20260731-01"
      },
      {
        "accessory_id": "acc-fire-cabinet",
        "accessory_name": "Gabinete extintor (FEC)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 25,
        "line_total": 50,
        "id": "it-20260731-2",
        "report_id": "rep-20260731-01"
      },
      {
        "accessory_id": "acc-fire-extinguisher",
        "accessory_name": "Extintor (FE)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 11,
        "line_total": 22,
        "id": "it-20260731-3",
        "report_id": "rep-20260731-01"
      }
    ]
  },
  {
    "id": "rep-20260730-01",
    "work_date": "2026-07-30",
    "job_site_id": "site-um",
    "job_site_name": "UM",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en UM. Hoja consolidada [JUL 31].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-07-30T15:00:00Z",
    "updated_at": "2026-07-30T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260730-1",
        "report_id": "rep-20260730-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-07-30T07:00:00Z",
        "end_at": "2026-07-30T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260730-2",
        "report_id": "rep-20260730-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-07-30T07:00:00Z",
        "end_at": "2026-07-30T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260730-3",
        "report_id": "rep-20260730-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-07-30T07:00:00Z",
        "end_at": "2026-07-30T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 16,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 288,
        "id": "it-20260730-1",
        "report_id": "rep-20260730-01"
      },
      {
        "accessory_id": "acc-corner-guards-ss",
        "accessory_name": "Esquineros SS (Inox)",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 8,
        "line_total": 64,
        "id": "it-20260730-2",
        "report_id": "rep-20260730-01"
      }
    ]
  },
  {
    "id": "rep-20260729-01",
    "work_date": "2026-07-29",
    "job_site_id": "site-um",
    "job_site_name": "UM",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-johan",
    "creator_name": "Johan",
    "status": "approved",
    "observations": "Instalación de 19 láminas Acrovyn sheets.",
    "incident_type": "ninguna",
    "activities_performed": [],
    "created_at": "2026-07-29T15:00:00Z",
    "updated_at": "2026-07-29T15:30:00Z",
    "crew": [
      {
        "id": "cr-jul29-1",
        "report_id": "rep-20260729-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-07-29T07:00:00.000Z",
        "end_at": "2026-07-29T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-jul29-2",
        "report_id": "rep-20260729-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-07-29T07:00:00.000Z",
        "end_at": "2026-07-29T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-jul29-3",
        "report_id": "rep-20260729-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-07-29T07:00:00.000Z",
        "end_at": "2026-07-29T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "id": "it-jul29-1",
        "report_id": "rep-20260729-01",
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 19,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 342
      }
    ]
  },
  {
    "id": "rep-20260728-01",
    "work_date": "2026-07-28",
    "job_site_id": "site-um",
    "job_site_name": "UM",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en UM. Hoja consolidada [JUL 31].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-07-28T15:00:00Z",
    "updated_at": "2026-07-28T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260728-1",
        "report_id": "rep-20260728-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-07-28T07:00:00Z",
        "end_at": "2026-07-28T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260728-2",
        "report_id": "rep-20260728-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-07-28T07:00:00Z",
        "end_at": "2026-07-28T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260728-3",
        "report_id": "rep-20260728-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-07-28T07:00:00Z",
        "end_at": "2026-07-28T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-toilet-paper-dispenser",
        "accessory_name": "Dispensador papel higiénico",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260728-1",
        "report_id": "rep-20260728-01"
      },
      {
        "accessory_id": "acc-soap-dispenser",
        "accessory_name": "Dispensador jabón",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260728-2",
        "report_id": "rep-20260728-01"
      }
    ]
  },
  {
    "id": "rep-20260727-01",
    "work_date": "2026-07-27",
    "job_site_id": "site-um",
    "job_site_name": "UM",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en UM. Hoja consolidada [JUL 31].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-07-27T15:00:00Z",
    "updated_at": "2026-07-27T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260727-1",
        "report_id": "rep-20260727-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-07-27T07:00:00Z",
        "end_at": "2026-07-27T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260727-2",
        "report_id": "rep-20260727-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-07-27T07:00:00Z",
        "end_at": "2026-07-27T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260727-3",
        "report_id": "rep-20260727-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-07-27T07:00:00Z",
        "end_at": "2026-07-27T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 18,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 324,
        "id": "it-20260727-1",
        "report_id": "rep-20260727-01"
      }
    ]
  },
  {
    "id": "rep-20260724-01",
    "work_date": "2026-07-24",
    "job_site_id": "site-baptist-pembroke",
    "job_site_name": "Baptist Pembroke",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Baptist Pembroke. Hoja consolidada [JUL 25].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-07-24T15:00:00Z",
    "updated_at": "2026-07-24T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260724-1",
        "report_id": "rep-20260724-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-07-24T07:00:00Z",
        "end_at": "2026-07-24T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260724-2",
        "report_id": "rep-20260724-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-07-24T07:00:00Z",
        "end_at": "2026-07-24T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260724-3",
        "report_id": "rep-20260724-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-07-24T07:00:00Z",
        "end_at": "2026-07-24T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-crash-rail-metal",
        "accessory_name": "Crash rail metal",
        "accessory_unit": "ft",
        "quantity": 60,
        "unit": "ft",
        "unit_price_override": 7.5,
        "line_total": 450,
        "id": "it-20260724-1",
        "report_id": "rep-20260724-01"
      },
      {
        "accessory_id": "acc-corner-guard-vinyl",
        "accessory_name": "Esquineros Vinil",
        "accessory_unit": "each",
        "quantity": 12,
        "unit": "each",
        "unit_price_override": 6,
        "line_total": 72,
        "id": "it-20260724-2",
        "report_id": "rep-20260724-01"
      }
    ]
  },
  {
    "id": "rep-20260723-01",
    "work_date": "2026-07-23",
    "job_site_id": "site-baptist-pembroke",
    "job_site_name": "Baptist Pembroke",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-abinor",
    "creator_name": "Abinor",
    "status": "approved",
    "observations": "Colocación de barras de agarre grab bars y espejos.",
    "incident_type": "ninguna",
    "activities_performed": [],
    "created_at": "2026-07-23T15:00:00Z",
    "updated_at": "2026-07-23T15:30:00Z",
    "crew": [
      {
        "id": "cr-jul23-1",
        "report_id": "rep-20260723-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-07-23T07:00:00.000Z",
        "end_at": "2026-07-23T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-jul23-2",
        "report_id": "rep-20260723-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-07-23T07:00:00.000Z",
        "end_at": "2026-07-23T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-jul23-3",
        "report_id": "rep-20260723-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-07-23T07:00:00.000Z",
        "end_at": "2026-07-23T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "id": "it-jul23-1",
        "report_id": "rep-20260723-01",
        "accessory_id": "acc-grab-bar-36",
        "accessory_name": "Grab bar 36\"",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 14,
        "line_total": 196
      },
      {
        "id": "it-jul23-2",
        "report_id": "rep-20260723-01",
        "accessory_id": "acc-grab-bar-42",
        "accessory_name": "Grab bar 42\"",
        "accessory_unit": "each",
        "quantity": 10,
        "unit": "each",
        "unit_price_override": 16,
        "line_total": 160
      },
      {
        "id": "it-jul23-3",
        "report_id": "rep-20260723-01",
        "accessory_id": "acc-mirror",
        "accessory_name": "Espejos",
        "accessory_unit": "each",
        "quantity": 10,
        "unit": "each",
        "unit_price_override": 15,
        "line_total": 150
      }
    ]
  },
  {
    "id": "rep-20260722-01",
    "work_date": "2026-07-22",
    "job_site_id": "site-baptist-pembroke",
    "job_site_name": "Baptist Pembroke",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Baptist Pembroke. Hoja consolidada [JUL 25].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-07-22T15:00:00Z",
    "updated_at": "2026-07-22T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260722-1",
        "report_id": "rep-20260722-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-07-22T07:00:00Z",
        "end_at": "2026-07-22T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260722-2",
        "report_id": "rep-20260722-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-07-22T07:00:00Z",
        "end_at": "2026-07-22T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260722-3",
        "report_id": "rep-20260722-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-07-22T07:00:00Z",
        "end_at": "2026-07-22T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-grab-bar-36",
        "accessory_name": "Grab bar 36\"",
        "accessory_unit": "each",
        "quantity": 10,
        "unit": "each",
        "unit_price_override": 14,
        "line_total": 140,
        "id": "it-20260722-1",
        "report_id": "rep-20260722-01"
      },
      {
        "accessory_id": "acc-grab-bar-42",
        "accessory_name": "Grab bar 42\"",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 16,
        "line_total": 128,
        "id": "it-20260722-2",
        "report_id": "rep-20260722-01"
      },
      {
        "accessory_id": "acc-mirror",
        "accessory_name": "Espejos",
        "accessory_unit": "each",
        "quantity": 6,
        "unit": "each",
        "unit_price_override": 15,
        "line_total": 90,
        "id": "it-20260722-3",
        "report_id": "rep-20260722-01"
      }
    ]
  },
  {
    "id": "rep-20260721-01",
    "work_date": "2026-07-21",
    "job_site_id": "site-baptist-pembroke",
    "job_site_name": "Baptist Pembroke",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Baptist Pembroke. Hoja consolidada [JUL 25].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-07-21T15:00:00Z",
    "updated_at": "2026-07-21T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260721-1",
        "report_id": "rep-20260721-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-07-21T07:00:00Z",
        "end_at": "2026-07-21T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260721-2",
        "report_id": "rep-20260721-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-07-21T07:00:00Z",
        "end_at": "2026-07-21T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260721-3",
        "report_id": "rep-20260721-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-07-21T07:00:00Z",
        "end_at": "2026-07-21T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 14,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 252,
        "id": "it-20260721-1",
        "report_id": "rep-20260721-01"
      },
      {
        "accessory_id": "acc-fire-cabinet",
        "accessory_name": "Gabinete extintor (FEC)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 25,
        "line_total": 50,
        "id": "it-20260721-2",
        "report_id": "rep-20260721-01"
      },
      {
        "accessory_id": "acc-fire-extinguisher",
        "accessory_name": "Extintor (FE)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 11,
        "line_total": 22,
        "id": "it-20260721-3",
        "report_id": "rep-20260721-01"
      }
    ]
  },
  {
    "id": "rep-20260720-01",
    "work_date": "2026-07-20",
    "job_site_id": "site-baptist-pembroke",
    "job_site_name": "Baptist Pembroke",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Baptist Pembroke. Hoja consolidada [JUL 25].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-07-20T15:00:00Z",
    "updated_at": "2026-07-20T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260720-1",
        "report_id": "rep-20260720-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-07-20T07:00:00Z",
        "end_at": "2026-07-20T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260720-2",
        "report_id": "rep-20260720-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-07-20T07:00:00Z",
        "end_at": "2026-07-20T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260720-3",
        "report_id": "rep-20260720-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-07-20T07:00:00Z",
        "end_at": "2026-07-20T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 16,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 288,
        "id": "it-20260720-1",
        "report_id": "rep-20260720-01"
      },
      {
        "accessory_id": "acc-corner-guards-ss",
        "accessory_name": "Esquineros SS (Inox)",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 8,
        "line_total": 64,
        "id": "it-20260720-2",
        "report_id": "rep-20260720-01"
      }
    ]
  },
  {
    "id": "rep-20260717-01",
    "work_date": "2026-07-17",
    "job_site_id": "site-um",
    "job_site_name": "UM",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en UM. Hoja consolidada [JUL 17].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-07-17T15:00:00Z",
    "updated_at": "2026-07-17T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260717-1",
        "report_id": "rep-20260717-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-07-17T07:00:00Z",
        "end_at": "2026-07-17T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260717-2",
        "report_id": "rep-20260717-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-07-17T07:00:00Z",
        "end_at": "2026-07-17T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260717-3",
        "report_id": "rep-20260717-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-07-17T07:00:00Z",
        "end_at": "2026-07-17T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-toilet-paper-dispenser",
        "accessory_name": "Dispensador papel higiénico",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260717-1",
        "report_id": "rep-20260717-01"
      },
      {
        "accessory_id": "acc-soap-dispenser",
        "accessory_name": "Dispensador jabón",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260717-2",
        "report_id": "rep-20260717-01"
      }
    ]
  },
  {
    "id": "rep-20260716-01",
    "work_date": "2026-07-16",
    "job_site_id": "site-um",
    "job_site_name": "UM",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en UM. Hoja consolidada [JUL 17].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-07-16T15:00:00Z",
    "updated_at": "2026-07-16T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260716-1",
        "report_id": "rep-20260716-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-07-16T07:00:00Z",
        "end_at": "2026-07-16T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260716-2",
        "report_id": "rep-20260716-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-07-16T07:00:00Z",
        "end_at": "2026-07-16T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260716-3",
        "report_id": "rep-20260716-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-07-16T07:00:00Z",
        "end_at": "2026-07-16T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 18,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 324,
        "id": "it-20260716-1",
        "report_id": "rep-20260716-01"
      }
    ]
  },
  {
    "id": "rep-20260715-01",
    "work_date": "2026-07-15",
    "job_site_id": "site-um",
    "job_site_name": "UM",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Instalación de 18 láminas Acrovyn.",
    "incident_type": "ninguna",
    "activities_performed": [],
    "created_at": "2026-07-15T15:00:00Z",
    "updated_at": "2026-07-15T15:30:00Z",
    "crew": [
      {
        "id": "cr-jul15-1",
        "report_id": "rep-20260715-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-07-15T07:00:00.000Z",
        "end_at": "2026-07-15T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-jul15-2",
        "report_id": "rep-20260715-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-07-15T07:00:00.000Z",
        "end_at": "2026-07-15T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-jul15-3",
        "report_id": "rep-20260715-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-07-15T07:00:00.000Z",
        "end_at": "2026-07-15T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "id": "it-jul15-1",
        "report_id": "rep-20260715-01",
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 18,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 324
      }
    ]
  },
  {
    "id": "rep-20260714-01",
    "work_date": "2026-07-14",
    "job_site_id": "site-um",
    "job_site_name": "UM",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en UM. Hoja consolidada [JUL 17].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-07-14T15:00:00Z",
    "updated_at": "2026-07-14T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260714-1",
        "report_id": "rep-20260714-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-07-14T07:00:00Z",
        "end_at": "2026-07-14T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260714-2",
        "report_id": "rep-20260714-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-07-14T07:00:00Z",
        "end_at": "2026-07-14T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260714-3",
        "report_id": "rep-20260714-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-07-14T07:00:00Z",
        "end_at": "2026-07-14T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-crash-rail-metal",
        "accessory_name": "Crash rail metal",
        "accessory_unit": "ft",
        "quantity": 60,
        "unit": "ft",
        "unit_price_override": 7.5,
        "line_total": 450,
        "id": "it-20260714-1",
        "report_id": "rep-20260714-01"
      },
      {
        "accessory_id": "acc-corner-guard-vinyl",
        "accessory_name": "Esquineros Vinil",
        "accessory_unit": "each",
        "quantity": 12,
        "unit": "each",
        "unit_price_override": 6,
        "line_total": 72,
        "id": "it-20260714-2",
        "report_id": "rep-20260714-01"
      }
    ]
  },
  {
    "id": "rep-20260713-01",
    "work_date": "2026-07-13",
    "job_site_id": "site-um",
    "job_site_name": "UM",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en UM. Hoja consolidada [JUL 17].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-07-13T15:00:00Z",
    "updated_at": "2026-07-13T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260713-1",
        "report_id": "rep-20260713-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-07-13T07:00:00Z",
        "end_at": "2026-07-13T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260713-2",
        "report_id": "rep-20260713-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-07-13T07:00:00Z",
        "end_at": "2026-07-13T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260713-3",
        "report_id": "rep-20260713-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-07-13T07:00:00Z",
        "end_at": "2026-07-13T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-grab-bar-36",
        "accessory_name": "Grab bar 36\"",
        "accessory_unit": "each",
        "quantity": 10,
        "unit": "each",
        "unit_price_override": 14,
        "line_total": 140,
        "id": "it-20260713-1",
        "report_id": "rep-20260713-01"
      },
      {
        "accessory_id": "acc-grab-bar-42",
        "accessory_name": "Grab bar 42\"",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 16,
        "line_total": 128,
        "id": "it-20260713-2",
        "report_id": "rep-20260713-01"
      },
      {
        "accessory_id": "acc-mirror",
        "accessory_name": "Espejos",
        "accessory_unit": "each",
        "quantity": 6,
        "unit": "each",
        "unit_price_override": 15,
        "line_total": 90,
        "id": "it-20260713-3",
        "report_id": "rep-20260713-01"
      }
    ]
  },
  {
    "id": "rep-20260710-01",
    "work_date": "2026-07-10",
    "job_site_id": "site-baptist-pembroke",
    "job_site_name": "Baptist Pembroke",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-johan",
    "creator_name": "Johan",
    "status": "approved",
    "observations": "Colocación de gabinetes FEC y señales FE.",
    "incident_type": "ninguna",
    "activities_performed": [],
    "created_at": "2026-07-10T15:00:00Z",
    "updated_at": "2026-07-10T15:30:00Z",
    "crew": [
      {
        "id": "cr-jul10-1",
        "report_id": "rep-20260710-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-07-10T07:00:00.000Z",
        "end_at": "2026-07-10T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-jul10-2",
        "report_id": "rep-20260710-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-07-10T07:00:00.000Z",
        "end_at": "2026-07-10T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-jul10-3",
        "report_id": "rep-20260710-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-07-10T07:00:00.000Z",
        "end_at": "2026-07-10T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "id": "it-jul10-1",
        "report_id": "rep-20260710-01",
        "accessory_id": "acc-fire-cabinet",
        "accessory_name": "Gabinete extintor (FEC)",
        "accessory_unit": "each",
        "quantity": 3,
        "unit": "each",
        "unit_price_override": 25,
        "line_total": 75
      },
      {
        "id": "it-jul10-2",
        "report_id": "rep-20260710-01",
        "accessory_id": "acc-fire-extinguisher",
        "accessory_name": "Extintor (FE)",
        "accessory_unit": "each",
        "quantity": 3,
        "unit": "each",
        "unit_price_override": 11,
        "line_total": 33
      }
    ]
  },
  {
    "id": "rep-20260709-01",
    "work_date": "2026-07-09",
    "job_site_id": "site-baptist-pembroke",
    "job_site_name": "Baptist Pembroke",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Baptist Pembroke. Hoja consolidada [JUL 12].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-07-09T15:00:00Z",
    "updated_at": "2026-07-09T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260709-1",
        "report_id": "rep-20260709-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-07-09T07:00:00Z",
        "end_at": "2026-07-09T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260709-2",
        "report_id": "rep-20260709-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-07-09T07:00:00Z",
        "end_at": "2026-07-09T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260709-3",
        "report_id": "rep-20260709-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-07-09T07:00:00Z",
        "end_at": "2026-07-09T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 14,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 252,
        "id": "it-20260709-1",
        "report_id": "rep-20260709-01"
      },
      {
        "accessory_id": "acc-fire-cabinet",
        "accessory_name": "Gabinete extintor (FEC)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 25,
        "line_total": 50,
        "id": "it-20260709-2",
        "report_id": "rep-20260709-01"
      },
      {
        "accessory_id": "acc-fire-extinguisher",
        "accessory_name": "Extintor (FE)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 11,
        "line_total": 22,
        "id": "it-20260709-3",
        "report_id": "rep-20260709-01"
      }
    ]
  },
  {
    "id": "rep-20260708-01",
    "work_date": "2026-07-08",
    "job_site_id": "site-baptist-pembroke",
    "job_site_name": "Baptist Pembroke",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Baptist Pembroke. Hoja consolidada [JUL 12].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-07-08T15:00:00Z",
    "updated_at": "2026-07-08T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260708-1",
        "report_id": "rep-20260708-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-07-08T07:00:00Z",
        "end_at": "2026-07-08T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260708-2",
        "report_id": "rep-20260708-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-07-08T07:00:00Z",
        "end_at": "2026-07-08T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260708-3",
        "report_id": "rep-20260708-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-07-08T07:00:00Z",
        "end_at": "2026-07-08T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 16,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 288,
        "id": "it-20260708-1",
        "report_id": "rep-20260708-01"
      },
      {
        "accessory_id": "acc-corner-guards-ss",
        "accessory_name": "Esquineros SS (Inox)",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 8,
        "line_total": 64,
        "id": "it-20260708-2",
        "report_id": "rep-20260708-01"
      }
    ]
  },
  {
    "id": "rep-20260707-01",
    "work_date": "2026-07-07",
    "job_site_id": "site-baptist-pembroke",
    "job_site_name": "Baptist Pembroke",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Baptist Pembroke. Hoja consolidada [JUL 12].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-07-07T15:00:00Z",
    "updated_at": "2026-07-07T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260707-1",
        "report_id": "rep-20260707-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-07-07T07:00:00Z",
        "end_at": "2026-07-07T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260707-2",
        "report_id": "rep-20260707-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-07-07T07:00:00Z",
        "end_at": "2026-07-07T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260707-3",
        "report_id": "rep-20260707-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-07-07T07:00:00Z",
        "end_at": "2026-07-07T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-toilet-paper-dispenser",
        "accessory_name": "Dispensador papel higiénico",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260707-1",
        "report_id": "rep-20260707-01"
      },
      {
        "accessory_id": "acc-soap-dispenser",
        "accessory_name": "Dispensador jabón",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260707-2",
        "report_id": "rep-20260707-01"
      }
    ]
  },
  {
    "id": "rep-20260706-01",
    "work_date": "2026-07-06",
    "job_site_id": "site-baptist-pembroke",
    "job_site_name": "Baptist Pembroke",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Baptist Pembroke. Hoja consolidada [JUL 12].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-07-06T15:00:00Z",
    "updated_at": "2026-07-06T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260706-1",
        "report_id": "rep-20260706-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-07-06T07:00:00Z",
        "end_at": "2026-07-06T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260706-2",
        "report_id": "rep-20260706-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-07-06T07:00:00Z",
        "end_at": "2026-07-06T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260706-3",
        "report_id": "rep-20260706-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-07-06T07:00:00Z",
        "end_at": "2026-07-06T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 18,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 324,
        "id": "it-20260706-1",
        "report_id": "rep-20260706-01"
      }
    ]
  },
  {
    "id": "rep-20260703-01",
    "work_date": "2026-07-03",
    "job_site_id": "site-um",
    "job_site_name": "UM",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en UM. Hoja consolidada [JUL 03].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-07-03T15:00:00Z",
    "updated_at": "2026-07-03T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260703-1",
        "report_id": "rep-20260703-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-07-03T07:00:00Z",
        "end_at": "2026-07-03T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260703-2",
        "report_id": "rep-20260703-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-07-03T07:00:00Z",
        "end_at": "2026-07-03T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260703-3",
        "report_id": "rep-20260703-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-07-03T07:00:00Z",
        "end_at": "2026-07-03T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-crash-rail-metal",
        "accessory_name": "Crash rail metal",
        "accessory_unit": "ft",
        "quantity": 60,
        "unit": "ft",
        "unit_price_override": 7.5,
        "line_total": 450,
        "id": "it-20260703-1",
        "report_id": "rep-20260703-01"
      },
      {
        "accessory_id": "acc-corner-guard-vinyl",
        "accessory_name": "Esquineros Vinil",
        "accessory_unit": "each",
        "quantity": 12,
        "unit": "each",
        "unit_price_override": 6,
        "line_total": 72,
        "id": "it-20260703-2",
        "report_id": "rep-20260703-01"
      }
    ]
  },
  {
    "id": "rep-20260702-01",
    "work_date": "2026-07-02",
    "job_site_id": "site-um",
    "job_site_name": "UM",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-abinor",
    "creator_name": "Abinor",
    "status": "approved",
    "observations": "Instalación de 17 láminas Acrovyn.",
    "incident_type": "ninguna",
    "activities_performed": [],
    "created_at": "2026-07-02T15:00:00Z",
    "updated_at": "2026-07-02T15:30:00Z",
    "crew": [
      {
        "id": "cr-jul02-1",
        "report_id": "rep-20260702-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-07-02T07:00:00.000Z",
        "end_at": "2026-07-02T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-jul02-2",
        "report_id": "rep-20260702-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-07-02T07:00:00.000Z",
        "end_at": "2026-07-02T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-jul02-3",
        "report_id": "rep-20260702-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-07-02T07:00:00.000Z",
        "end_at": "2026-07-02T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "id": "it-jul02-1",
        "report_id": "rep-20260702-01",
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 17,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 306
      }
    ]
  },
  {
    "id": "rep-20260701-01",
    "work_date": "2026-07-01",
    "job_site_id": "site-um",
    "job_site_name": "UM",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en UM. Hoja consolidada [JUL 03].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-07-01T15:00:00Z",
    "updated_at": "2026-07-01T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260701-1",
        "report_id": "rep-20260701-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-07-01T07:00:00Z",
        "end_at": "2026-07-01T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260701-2",
        "report_id": "rep-20260701-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-07-01T07:00:00Z",
        "end_at": "2026-07-01T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260701-3",
        "report_id": "rep-20260701-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-07-01T07:00:00Z",
        "end_at": "2026-07-01T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-grab-bar-36",
        "accessory_name": "Grab bar 36\"",
        "accessory_unit": "each",
        "quantity": 10,
        "unit": "each",
        "unit_price_override": 14,
        "line_total": 140,
        "id": "it-20260701-1",
        "report_id": "rep-20260701-01"
      },
      {
        "accessory_id": "acc-grab-bar-42",
        "accessory_name": "Grab bar 42\"",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 16,
        "line_total": 128,
        "id": "it-20260701-2",
        "report_id": "rep-20260701-01"
      },
      {
        "accessory_id": "acc-mirror",
        "accessory_name": "Espejos",
        "accessory_unit": "each",
        "quantity": 6,
        "unit": "each",
        "unit_price_override": 15,
        "line_total": 90,
        "id": "it-20260701-3",
        "report_id": "rep-20260701-01"
      }
    ]
  },
  {
    "id": "rep-20260630-01",
    "work_date": "2026-06-30",
    "job_site_id": "site-um",
    "job_site_name": "UM",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en UM. Hoja consolidada [JUL 03].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-06-30T15:00:00Z",
    "updated_at": "2026-06-30T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260630-1",
        "report_id": "rep-20260630-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-06-30T07:00:00Z",
        "end_at": "2026-06-30T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260630-2",
        "report_id": "rep-20260630-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-06-30T07:00:00Z",
        "end_at": "2026-06-30T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260630-3",
        "report_id": "rep-20260630-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-06-30T07:00:00Z",
        "end_at": "2026-06-30T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 14,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 252,
        "id": "it-20260630-1",
        "report_id": "rep-20260630-01"
      },
      {
        "accessory_id": "acc-fire-cabinet",
        "accessory_name": "Gabinete extintor (FEC)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 25,
        "line_total": 50,
        "id": "it-20260630-2",
        "report_id": "rep-20260630-01"
      },
      {
        "accessory_id": "acc-fire-extinguisher",
        "accessory_name": "Extintor (FE)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 11,
        "line_total": 22,
        "id": "it-20260630-3",
        "report_id": "rep-20260630-01"
      }
    ]
  },
  {
    "id": "rep-20260629-01",
    "work_date": "2026-06-29",
    "job_site_id": "site-um",
    "job_site_name": "UM",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en UM. Hoja consolidada [JUL 03].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-06-29T15:00:00Z",
    "updated_at": "2026-06-29T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260629-1",
        "report_id": "rep-20260629-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-06-29T07:00:00Z",
        "end_at": "2026-06-29T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260629-2",
        "report_id": "rep-20260629-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-06-29T07:00:00Z",
        "end_at": "2026-06-29T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260629-3",
        "report_id": "rep-20260629-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-06-29T07:00:00Z",
        "end_at": "2026-06-29T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 16,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 288,
        "id": "it-20260629-1",
        "report_id": "rep-20260629-01"
      },
      {
        "accessory_id": "acc-corner-guards-ss",
        "accessory_name": "Esquineros SS (Inox)",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 8,
        "line_total": 64,
        "id": "it-20260629-2",
        "report_id": "rep-20260629-01"
      }
    ]
  },
  {
    "id": "rep-20260626-01",
    "work_date": "2026-06-26",
    "job_site_id": "site-um",
    "job_site_name": "UM",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en UM. Hoja consolidada [JUN 26].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-06-26T15:00:00Z",
    "updated_at": "2026-06-26T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260626-1",
        "report_id": "rep-20260626-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-06-26T07:00:00Z",
        "end_at": "2026-06-26T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260626-2",
        "report_id": "rep-20260626-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-06-26T07:00:00Z",
        "end_at": "2026-06-26T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260626-3",
        "report_id": "rep-20260626-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-06-26T07:00:00Z",
        "end_at": "2026-06-26T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-toilet-paper-dispenser",
        "accessory_name": "Dispensador papel higiénico",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260626-1",
        "report_id": "rep-20260626-01"
      },
      {
        "accessory_id": "acc-soap-dispenser",
        "accessory_name": "Dispensador jabón",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260626-2",
        "report_id": "rep-20260626-01"
      }
    ]
  },
  {
    "id": "rep-20260625-01",
    "work_date": "2026-06-25",
    "job_site_id": "site-um",
    "job_site_name": "UM",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Instalación de 16 láminas Acrovyn sheets.",
    "incident_type": "ninguna",
    "activities_performed": [],
    "created_at": "2026-06-25T15:00:00Z",
    "updated_at": "2026-06-25T15:30:00Z",
    "crew": [
      {
        "id": "cr-jun25-1",
        "report_id": "rep-20260625-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-06-25T07:00:00.000Z",
        "end_at": "2026-06-25T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-jun25-2",
        "report_id": "rep-20260625-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-06-25T07:00:00.000Z",
        "end_at": "2026-06-25T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-jun25-3",
        "report_id": "rep-20260625-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-06-25T07:00:00.000Z",
        "end_at": "2026-06-25T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "id": "it-jun25-1",
        "report_id": "rep-20260625-01",
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 16,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 288
      }
    ]
  },
  {
    "id": "rep-20260624-01",
    "work_date": "2026-06-24",
    "job_site_id": "site-baptist-pembroke",
    "job_site_name": "Baptist Pembroke",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-johan",
    "creator_name": "Johan",
    "status": "approved",
    "observations": "Colocación de crash rails y esquineros inox.",
    "incident_type": "ninguna",
    "activities_performed": [],
    "created_at": "2026-06-24T15:00:00Z",
    "updated_at": "2026-06-24T15:30:00Z",
    "crew": [
      {
        "id": "cr-jun24-1",
        "report_id": "rep-20260624-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-06-24T07:00:00.000Z",
        "end_at": "2026-06-24T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-jun24-2",
        "report_id": "rep-20260624-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-06-24T07:00:00.000Z",
        "end_at": "2026-06-24T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-jun24-3",
        "report_id": "rep-20260624-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-06-24T07:00:00.000Z",
        "end_at": "2026-06-24T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "id": "it-jun24-1",
        "report_id": "rep-20260624-01",
        "accessory_id": "acc-crash-rail-metal",
        "accessory_name": "Crash rail metal",
        "accessory_unit": "ft",
        "quantity": 72,
        "unit": "ft",
        "unit_price_override": 7.5,
        "line_total": 540
      },
      {
        "id": "it-jun24-2",
        "report_id": "rep-20260624-01",
        "accessory_id": "acc-corner-guards-ss",
        "accessory_name": "Esquineros SS (Inox)",
        "accessory_unit": "each",
        "quantity": 10,
        "unit": "each",
        "unit_price_override": 8,
        "line_total": 80
      }
    ]
  },
  {
    "id": "rep-20260623-01",
    "work_date": "2026-06-23",
    "job_site_id": "site-um",
    "job_site_name": "UM",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en UM. Hoja consolidada [JUN 26].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-06-23T15:00:00Z",
    "updated_at": "2026-06-23T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260623-1",
        "report_id": "rep-20260623-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-06-23T07:00:00Z",
        "end_at": "2026-06-23T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260623-2",
        "report_id": "rep-20260623-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-06-23T07:00:00Z",
        "end_at": "2026-06-23T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260623-3",
        "report_id": "rep-20260623-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-06-23T07:00:00Z",
        "end_at": "2026-06-23T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 18,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 324,
        "id": "it-20260623-1",
        "report_id": "rep-20260623-01"
      }
    ]
  },
  {
    "id": "rep-20260622-01",
    "work_date": "2026-06-22",
    "job_site_id": "site-um",
    "job_site_name": "UM",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en UM. Hoja consolidada [JUN 26].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-06-22T15:00:00Z",
    "updated_at": "2026-06-22T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260622-1",
        "report_id": "rep-20260622-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-06-22T07:00:00Z",
        "end_at": "2026-06-22T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260622-2",
        "report_id": "rep-20260622-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-06-22T07:00:00Z",
        "end_at": "2026-06-22T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260622-3",
        "report_id": "rep-20260622-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-06-22T07:00:00Z",
        "end_at": "2026-06-22T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-crash-rail-metal",
        "accessory_name": "Crash rail metal",
        "accessory_unit": "ft",
        "quantity": 60,
        "unit": "ft",
        "unit_price_override": 7.5,
        "line_total": 450,
        "id": "it-20260622-1",
        "report_id": "rep-20260622-01"
      },
      {
        "accessory_id": "acc-corner-guard-vinyl",
        "accessory_name": "Esquineros Vinil",
        "accessory_unit": "each",
        "quantity": 12,
        "unit": "each",
        "unit_price_override": 6,
        "line_total": 72,
        "id": "it-20260622-2",
        "report_id": "rep-20260622-01"
      }
    ]
  },
  {
    "id": "rep-20260619-01",
    "work_date": "2026-06-19",
    "job_site_id": "site-baptist-pembroke",
    "job_site_name": "Baptist Pembroke",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Baptist Pembroke. Hoja consolidada [JUN 19].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-06-19T15:00:00Z",
    "updated_at": "2026-06-19T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260619-1",
        "report_id": "rep-20260619-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-06-19T07:00:00Z",
        "end_at": "2026-06-19T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260619-2",
        "report_id": "rep-20260619-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-06-19T07:00:00Z",
        "end_at": "2026-06-19T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260619-3",
        "report_id": "rep-20260619-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-06-19T07:00:00Z",
        "end_at": "2026-06-19T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-grab-bar-36",
        "accessory_name": "Grab bar 36\"",
        "accessory_unit": "each",
        "quantity": 10,
        "unit": "each",
        "unit_price_override": 14,
        "line_total": 140,
        "id": "it-20260619-1",
        "report_id": "rep-20260619-01"
      },
      {
        "accessory_id": "acc-grab-bar-42",
        "accessory_name": "Grab bar 42\"",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 16,
        "line_total": 128,
        "id": "it-20260619-2",
        "report_id": "rep-20260619-01"
      },
      {
        "accessory_id": "acc-mirror",
        "accessory_name": "Espejos",
        "accessory_unit": "each",
        "quantity": 6,
        "unit": "each",
        "unit_price_override": 15,
        "line_total": 90,
        "id": "it-20260619-3",
        "report_id": "rep-20260619-01"
      }
    ]
  },
  {
    "id": "rep-20260618-01",
    "work_date": "2026-06-18",
    "job_site_id": "site-baptist-pembroke",
    "job_site_name": "Baptist Pembroke",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Baptist Pembroke. Hoja consolidada [JUN 19].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-06-18T15:00:00Z",
    "updated_at": "2026-06-18T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260618-1",
        "report_id": "rep-20260618-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-06-18T07:00:00Z",
        "end_at": "2026-06-18T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260618-2",
        "report_id": "rep-20260618-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-06-18T07:00:00Z",
        "end_at": "2026-06-18T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260618-3",
        "report_id": "rep-20260618-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-06-18T07:00:00Z",
        "end_at": "2026-06-18T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 14,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 252,
        "id": "it-20260618-1",
        "report_id": "rep-20260618-01"
      },
      {
        "accessory_id": "acc-fire-cabinet",
        "accessory_name": "Gabinete extintor (FEC)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 25,
        "line_total": 50,
        "id": "it-20260618-2",
        "report_id": "rep-20260618-01"
      },
      {
        "accessory_id": "acc-fire-extinguisher",
        "accessory_name": "Extintor (FE)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 11,
        "line_total": 22,
        "id": "it-20260618-3",
        "report_id": "rep-20260618-01"
      }
    ]
  },
  {
    "id": "rep-20260617-01",
    "work_date": "2026-06-17",
    "job_site_id": "site-baptist-pembroke",
    "job_site_name": "Baptist Pembroke",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Baptist Pembroke. Hoja consolidada [JUN 19].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-06-17T15:00:00Z",
    "updated_at": "2026-06-17T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260617-1",
        "report_id": "rep-20260617-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-06-17T07:00:00Z",
        "end_at": "2026-06-17T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260617-2",
        "report_id": "rep-20260617-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-06-17T07:00:00Z",
        "end_at": "2026-06-17T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260617-3",
        "report_id": "rep-20260617-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-06-17T07:00:00Z",
        "end_at": "2026-06-17T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 16,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 288,
        "id": "it-20260617-1",
        "report_id": "rep-20260617-01"
      },
      {
        "accessory_id": "acc-corner-guards-ss",
        "accessory_name": "Esquineros SS (Inox)",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 8,
        "line_total": 64,
        "id": "it-20260617-2",
        "report_id": "rep-20260617-01"
      }
    ]
  },
  {
    "id": "rep-20260616-01",
    "work_date": "2026-06-16",
    "job_site_id": "site-baptist-pembroke",
    "job_site_name": "Baptist Pembroke",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Baptist Pembroke. Hoja consolidada [JUN 19].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-06-16T15:00:00Z",
    "updated_at": "2026-06-16T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260616-1",
        "report_id": "rep-20260616-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-06-16T07:00:00Z",
        "end_at": "2026-06-16T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260616-2",
        "report_id": "rep-20260616-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-06-16T07:00:00Z",
        "end_at": "2026-06-16T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260616-3",
        "report_id": "rep-20260616-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-06-16T07:00:00Z",
        "end_at": "2026-06-16T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-toilet-paper-dispenser",
        "accessory_name": "Dispensador papel higiénico",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260616-1",
        "report_id": "rep-20260616-01"
      },
      {
        "accessory_id": "acc-soap-dispenser",
        "accessory_name": "Dispensador jabón",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260616-2",
        "report_id": "rep-20260616-01"
      }
    ]
  },
  {
    "id": "rep-20260615-01",
    "work_date": "2026-06-15",
    "job_site_id": "site-baptist-pembroke",
    "job_site_name": "Baptist Pembroke",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Baptist Pembroke. Hoja consolidada [JUN 19].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-06-15T15:00:00Z",
    "updated_at": "2026-06-15T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260615-1",
        "report_id": "rep-20260615-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-06-15T07:00:00Z",
        "end_at": "2026-06-15T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260615-2",
        "report_id": "rep-20260615-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-06-15T07:00:00Z",
        "end_at": "2026-06-15T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260615-3",
        "report_id": "rep-20260615-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-06-15T07:00:00Z",
        "end_at": "2026-06-15T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 18,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 324,
        "id": "it-20260615-1",
        "report_id": "rep-20260615-01"
      }
    ]
  },
  {
    "id": "rep-20260612-01",
    "work_date": "2026-06-12",
    "job_site_id": "site-um",
    "job_site_name": "UM",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en UM. Hoja consolidada [JUN 12].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-06-12T15:00:00Z",
    "updated_at": "2026-06-12T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260612-1",
        "report_id": "rep-20260612-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-06-12T07:00:00Z",
        "end_at": "2026-06-12T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260612-2",
        "report_id": "rep-20260612-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-06-12T07:00:00Z",
        "end_at": "2026-06-12T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260612-3",
        "report_id": "rep-20260612-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-06-12T07:00:00Z",
        "end_at": "2026-06-12T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-crash-rail-metal",
        "accessory_name": "Crash rail metal",
        "accessory_unit": "ft",
        "quantity": 60,
        "unit": "ft",
        "unit_price_override": 7.5,
        "line_total": 450,
        "id": "it-20260612-1",
        "report_id": "rep-20260612-01"
      },
      {
        "accessory_id": "acc-corner-guard-vinyl",
        "accessory_name": "Esquineros Vinil",
        "accessory_unit": "each",
        "quantity": 12,
        "unit": "each",
        "unit_price_override": 6,
        "line_total": 72,
        "id": "it-20260612-2",
        "report_id": "rep-20260612-01"
      }
    ]
  },
  {
    "id": "rep-20260611-01",
    "work_date": "2026-06-11",
    "job_site_id": "site-um",
    "job_site_name": "UM",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en UM. Hoja consolidada [JUN 12].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-06-11T15:00:00Z",
    "updated_at": "2026-06-11T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260611-1",
        "report_id": "rep-20260611-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-06-11T07:00:00Z",
        "end_at": "2026-06-11T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260611-2",
        "report_id": "rep-20260611-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-06-11T07:00:00Z",
        "end_at": "2026-06-11T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260611-3",
        "report_id": "rep-20260611-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-06-11T07:00:00Z",
        "end_at": "2026-06-11T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-grab-bar-36",
        "accessory_name": "Grab bar 36\"",
        "accessory_unit": "each",
        "quantity": 10,
        "unit": "each",
        "unit_price_override": 14,
        "line_total": 140,
        "id": "it-20260611-1",
        "report_id": "rep-20260611-01"
      },
      {
        "accessory_id": "acc-grab-bar-42",
        "accessory_name": "Grab bar 42\"",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 16,
        "line_total": 128,
        "id": "it-20260611-2",
        "report_id": "rep-20260611-01"
      },
      {
        "accessory_id": "acc-mirror",
        "accessory_name": "Espejos",
        "accessory_unit": "each",
        "quantity": 6,
        "unit": "each",
        "unit_price_override": 15,
        "line_total": 90,
        "id": "it-20260611-3",
        "report_id": "rep-20260611-01"
      }
    ]
  },
  {
    "id": "rep-20260610-01",
    "work_date": "2026-06-10",
    "job_site_id": "site-um",
    "job_site_name": "UM",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en UM. Hoja consolidada [JUN 12].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-06-10T15:00:00Z",
    "updated_at": "2026-06-10T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260610-1",
        "report_id": "rep-20260610-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-06-10T07:00:00Z",
        "end_at": "2026-06-10T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260610-2",
        "report_id": "rep-20260610-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-06-10T07:00:00Z",
        "end_at": "2026-06-10T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260610-3",
        "report_id": "rep-20260610-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-06-10T07:00:00Z",
        "end_at": "2026-06-10T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 14,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 252,
        "id": "it-20260610-1",
        "report_id": "rep-20260610-01"
      },
      {
        "accessory_id": "acc-fire-cabinet",
        "accessory_name": "Gabinete extintor (FEC)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 25,
        "line_total": 50,
        "id": "it-20260610-2",
        "report_id": "rep-20260610-01"
      },
      {
        "accessory_id": "acc-fire-extinguisher",
        "accessory_name": "Extintor (FE)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 11,
        "line_total": 22,
        "id": "it-20260610-3",
        "report_id": "rep-20260610-01"
      }
    ]
  },
  {
    "id": "rep-20260609-01",
    "work_date": "2026-06-09",
    "job_site_id": "site-um",
    "job_site_name": "UM",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en UM. Hoja consolidada [JUN 12].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-06-09T15:00:00Z",
    "updated_at": "2026-06-09T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260609-1",
        "report_id": "rep-20260609-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-06-09T07:00:00Z",
        "end_at": "2026-06-09T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260609-2",
        "report_id": "rep-20260609-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-06-09T07:00:00Z",
        "end_at": "2026-06-09T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260609-3",
        "report_id": "rep-20260609-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-06-09T07:00:00Z",
        "end_at": "2026-06-09T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 16,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 288,
        "id": "it-20260609-1",
        "report_id": "rep-20260609-01"
      },
      {
        "accessory_id": "acc-corner-guards-ss",
        "accessory_name": "Esquineros SS (Inox)",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 8,
        "line_total": 64,
        "id": "it-20260609-2",
        "report_id": "rep-20260609-01"
      }
    ]
  },
  {
    "id": "rep-20260608-01",
    "work_date": "2026-06-08",
    "job_site_id": "site-um",
    "job_site_name": "UM",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en UM. Hoja consolidada [JUN 12].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-06-08T15:00:00Z",
    "updated_at": "2026-06-08T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260608-1",
        "report_id": "rep-20260608-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-06-08T07:00:00Z",
        "end_at": "2026-06-08T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260608-2",
        "report_id": "rep-20260608-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-06-08T07:00:00Z",
        "end_at": "2026-06-08T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260608-3",
        "report_id": "rep-20260608-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-06-08T07:00:00Z",
        "end_at": "2026-06-08T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-toilet-paper-dispenser",
        "accessory_name": "Dispensador papel higiénico",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260608-1",
        "report_id": "rep-20260608-01"
      },
      {
        "accessory_id": "acc-soap-dispenser",
        "accessory_name": "Dispensador jabón",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260608-2",
        "report_id": "rep-20260608-01"
      }
    ]
  },
  {
    "id": "rep-20260605-01",
    "work_date": "2026-06-05",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-johan",
    "creator_name": "Johan",
    "status": "approved",
    "observations": "Instalación de espejos y barras de agarre en piso 2. Última jornada laborada de Efraín según archivo consolidado.",
    "incident_type": "ninguna",
    "activities_performed": [],
    "created_at": "2026-06-05T15:00:00Z",
    "updated_at": "2026-06-05T15:30:00Z",
    "crew": [
      {
        "id": "cr-jun05-1",
        "report_id": "rep-20260605-01",
        "user_id": "usr-efrain",
        "user_name": "Efraín",
        "start_at": "2026-06-05T06:30:00.000Z",
        "end_at": "2026-06-05T15:00:00.000Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 20,
        "is_weekend": false
      },
      {
        "id": "cr-jun05-2",
        "report_id": "rep-20260605-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-06-05T06:30:00.000Z",
        "end_at": "2026-06-05T15:00:00.000Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "id": "it-jun05-1",
        "report_id": "rep-20260605-01",
        "accessory_id": "acc-mirror",
        "accessory_name": "Espejos",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 15,
        "line_total": 210
      },
      {
        "id": "it-jun05-2",
        "report_id": "rep-20260605-01",
        "accessory_id": "acc-grab-bar-36",
        "accessory_name": "Grab bar 36\"",
        "accessory_unit": "each",
        "quantity": 10,
        "unit": "each",
        "unit_price_override": 14,
        "line_total": 140
      }
    ]
  },
  {
    "id": "rep-20260604-01",
    "work_date": "2026-06-04",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-johan",
    "creator_name": "Johan",
    "status": "approved",
    "observations": "Colocación de láminas Acrovyn y barras de agarre.",
    "incident_type": "ninguna",
    "activities_performed": [],
    "created_at": "2026-06-04T15:00:00Z",
    "updated_at": "2026-06-04T15:30:00Z",
    "crew": [
      {
        "id": "cr-jun04-1",
        "report_id": "rep-20260604-01",
        "user_id": "usr-efrain",
        "user_name": "Efraín",
        "start_at": "2026-06-04T06:30:00.000Z",
        "end_at": "2026-06-04T15:00:00.000Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 20,
        "is_weekend": false
      },
      {
        "id": "cr-jun04-2",
        "report_id": "rep-20260604-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-06-04T06:30:00.000Z",
        "end_at": "2026-06-04T15:00:00.000Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "id": "it-jun04-1",
        "report_id": "rep-20260604-01",
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 12,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 216
      }
    ]
  },
  {
    "id": "rep-20260603-01",
    "work_date": "2026-06-03",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-johan",
    "creator_name": "Johan",
    "status": "approved",
    "observations": "Instalación de crash rails y dispensadores.",
    "incident_type": "ninguna",
    "activities_performed": [],
    "created_at": "2026-06-03T15:00:00Z",
    "updated_at": "2026-06-03T15:30:00Z",
    "crew": [
      {
        "id": "cr-jun03-1",
        "report_id": "rep-20260603-01",
        "user_id": "usr-efrain",
        "user_name": "Efraín",
        "start_at": "2026-06-03T06:30:00.000Z",
        "end_at": "2026-06-03T15:00:00.000Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 20,
        "is_weekend": false
      },
      {
        "id": "cr-jun03-2",
        "report_id": "rep-20260603-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-06-03T06:30:00.000Z",
        "end_at": "2026-06-03T15:00:00.000Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "id": "it-jun03-1",
        "report_id": "rep-20260603-01",
        "accessory_id": "acc-crash-rail-metal",
        "accessory_name": "Crash rail metal",
        "accessory_unit": "ft",
        "quantity": 60,
        "unit": "ft",
        "unit_price_override": 7.5,
        "line_total": 450
      }
    ]
  },
  {
    "id": "rep-20260602-01",
    "work_date": "2026-06-02",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-johan",
    "creator_name": "Johan",
    "status": "approved",
    "observations": "Colocación de barras de agarre en baños.",
    "incident_type": "ninguna",
    "activities_performed": [],
    "created_at": "2026-06-02T15:00:00Z",
    "updated_at": "2026-06-02T15:30:00Z",
    "crew": [
      {
        "id": "cr-jun02-1",
        "report_id": "rep-20260602-01",
        "user_id": "usr-efrain",
        "user_name": "Efraín",
        "start_at": "2026-06-02T06:30:00.000Z",
        "end_at": "2026-06-02T15:00:00.000Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 20,
        "is_weekend": false
      },
      {
        "id": "cr-jun02-2",
        "report_id": "rep-20260602-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-06-02T06:30:00.000Z",
        "end_at": "2026-06-02T15:00:00.000Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "id": "it-jun02-1",
        "report_id": "rep-20260602-01",
        "accessory_id": "acc-grab-bar-18",
        "accessory_name": "Grab bar 18\"",
        "accessory_unit": "each",
        "quantity": 12,
        "unit": "each",
        "unit_price_override": 12,
        "line_total": 144
      }
    ]
  },
  {
    "id": "rep-20260601-01",
    "work_date": "2026-06-01",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-johan",
    "creator_name": "Johan",
    "status": "approved",
    "observations": "Movilización de material y preparación de áreas piso 2.",
    "incident_type": "ninguna",
    "activities_performed": [
      "entrega/movilización de material"
    ],
    "created_at": "2026-06-01T15:00:00Z",
    "updated_at": "2026-06-01T15:30:00Z",
    "crew": [
      {
        "id": "cr-jun01-1",
        "report_id": "rep-20260601-01",
        "user_id": "usr-efrain",
        "user_name": "Efraín",
        "start_at": "2026-06-01T06:30:00.000Z",
        "end_at": "2026-06-01T15:00:00.000Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 20,
        "is_weekend": false
      },
      {
        "id": "cr-jun01-2",
        "report_id": "rep-20260601-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-06-01T06:30:00.000Z",
        "end_at": "2026-06-01T15:00:00.000Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      }
    ],
    "items": []
  },
  {
    "id": "rep-20260529-01",
    "work_date": "2026-05-29",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-efrain",
    "creator_name": "Efraín",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [MAY 30].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-05-29T15:00:00Z",
    "updated_at": "2026-05-29T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260529-1",
        "report_id": "rep-20260529-01",
        "user_id": "usr-efrain",
        "user_name": "Efraín",
        "start_at": "2026-05-29T07:00:00Z",
        "end_at": "2026-05-29T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 20,
        "is_weekend": false
      },
      {
        "id": "cr-20260529-2",
        "report_id": "rep-20260529-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-05-29T07:00:00Z",
        "end_at": "2026-05-29T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 18,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 324,
        "id": "it-20260529-1",
        "report_id": "rep-20260529-01"
      }
    ]
  },
  {
    "id": "rep-20260528-01",
    "work_date": "2026-05-28",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-efrain",
    "creator_name": "Efraín",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [MAY 30].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-05-28T15:00:00Z",
    "updated_at": "2026-05-28T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260528-1",
        "report_id": "rep-20260528-01",
        "user_id": "usr-efrain",
        "user_name": "Efraín",
        "start_at": "2026-05-28T07:00:00Z",
        "end_at": "2026-05-28T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 20,
        "is_weekend": false
      },
      {
        "id": "cr-20260528-2",
        "report_id": "rep-20260528-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-05-28T07:00:00Z",
        "end_at": "2026-05-28T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-crash-rail-metal",
        "accessory_name": "Crash rail metal",
        "accessory_unit": "ft",
        "quantity": 60,
        "unit": "ft",
        "unit_price_override": 7.5,
        "line_total": 450,
        "id": "it-20260528-1",
        "report_id": "rep-20260528-01"
      },
      {
        "accessory_id": "acc-corner-guard-vinyl",
        "accessory_name": "Esquineros Vinil",
        "accessory_unit": "each",
        "quantity": 12,
        "unit": "each",
        "unit_price_override": 6,
        "line_total": 72,
        "id": "it-20260528-2",
        "report_id": "rep-20260528-01"
      }
    ]
  },
  {
    "id": "rep-20260527-01",
    "work_date": "2026-05-27",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-efrain",
    "creator_name": "Efraín",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [MAY 30].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-05-27T15:00:00Z",
    "updated_at": "2026-05-27T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260527-1",
        "report_id": "rep-20260527-01",
        "user_id": "usr-efrain",
        "user_name": "Efraín",
        "start_at": "2026-05-27T07:00:00Z",
        "end_at": "2026-05-27T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 20,
        "is_weekend": false
      },
      {
        "id": "cr-20260527-2",
        "report_id": "rep-20260527-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-05-27T07:00:00Z",
        "end_at": "2026-05-27T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-grab-bar-36",
        "accessory_name": "Grab bar 36\"",
        "accessory_unit": "each",
        "quantity": 10,
        "unit": "each",
        "unit_price_override": 14,
        "line_total": 140,
        "id": "it-20260527-1",
        "report_id": "rep-20260527-01"
      },
      {
        "accessory_id": "acc-grab-bar-42",
        "accessory_name": "Grab bar 42\"",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 16,
        "line_total": 128,
        "id": "it-20260527-2",
        "report_id": "rep-20260527-01"
      },
      {
        "accessory_id": "acc-mirror",
        "accessory_name": "Espejos",
        "accessory_unit": "each",
        "quantity": 6,
        "unit": "each",
        "unit_price_override": 15,
        "line_total": 90,
        "id": "it-20260527-3",
        "report_id": "rep-20260527-01"
      }
    ]
  },
  {
    "id": "rep-20260526-01",
    "work_date": "2026-05-26",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-efrain",
    "creator_name": "Efraín",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [MAY 30].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-05-26T15:00:00Z",
    "updated_at": "2026-05-26T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260526-1",
        "report_id": "rep-20260526-01",
        "user_id": "usr-efrain",
        "user_name": "Efraín",
        "start_at": "2026-05-26T07:00:00Z",
        "end_at": "2026-05-26T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 20,
        "is_weekend": false
      },
      {
        "id": "cr-20260526-2",
        "report_id": "rep-20260526-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-05-26T07:00:00Z",
        "end_at": "2026-05-26T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 14,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 252,
        "id": "it-20260526-1",
        "report_id": "rep-20260526-01"
      },
      {
        "accessory_id": "acc-fire-cabinet",
        "accessory_name": "Gabinete extintor (FEC)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 25,
        "line_total": 50,
        "id": "it-20260526-2",
        "report_id": "rep-20260526-01"
      },
      {
        "accessory_id": "acc-fire-extinguisher",
        "accessory_name": "Extintor (FE)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 11,
        "line_total": 22,
        "id": "it-20260526-3",
        "report_id": "rep-20260526-01"
      }
    ]
  },
  {
    "id": "rep-20260525-01",
    "work_date": "2026-05-25",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-efrain",
    "creator_name": "Efraín",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [MAY 30].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-05-25T15:00:00Z",
    "updated_at": "2026-05-25T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260525-1",
        "report_id": "rep-20260525-01",
        "user_id": "usr-efrain",
        "user_name": "Efraín",
        "start_at": "2026-05-25T07:00:00Z",
        "end_at": "2026-05-25T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 20,
        "is_weekend": false
      },
      {
        "id": "cr-20260525-2",
        "report_id": "rep-20260525-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-05-25T07:00:00Z",
        "end_at": "2026-05-25T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 16,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 288,
        "id": "it-20260525-1",
        "report_id": "rep-20260525-01"
      },
      {
        "accessory_id": "acc-corner-guards-ss",
        "accessory_name": "Esquineros SS (Inox)",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 8,
        "line_total": 64,
        "id": "it-20260525-2",
        "report_id": "rep-20260525-01"
      }
    ]
  },
  {
    "id": "rep-20260522-01",
    "work_date": "2026-05-22",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-efrain",
    "creator_name": "Efraín",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [MAY 23].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-05-22T15:00:00Z",
    "updated_at": "2026-05-22T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260522-1",
        "report_id": "rep-20260522-01",
        "user_id": "usr-efrain",
        "user_name": "Efraín",
        "start_at": "2026-05-22T07:00:00Z",
        "end_at": "2026-05-22T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 20,
        "is_weekend": false
      },
      {
        "id": "cr-20260522-2",
        "report_id": "rep-20260522-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-05-22T07:00:00Z",
        "end_at": "2026-05-22T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-toilet-paper-dispenser",
        "accessory_name": "Dispensador papel higiénico",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260522-1",
        "report_id": "rep-20260522-01"
      },
      {
        "accessory_id": "acc-soap-dispenser",
        "accessory_name": "Dispensador jabón",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260522-2",
        "report_id": "rep-20260522-01"
      }
    ]
  },
  {
    "id": "rep-20260521-01",
    "work_date": "2026-05-21",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-efrain",
    "creator_name": "Efraín",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [MAY 23].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-05-21T15:00:00Z",
    "updated_at": "2026-05-21T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260521-1",
        "report_id": "rep-20260521-01",
        "user_id": "usr-efrain",
        "user_name": "Efraín",
        "start_at": "2026-05-21T07:00:00Z",
        "end_at": "2026-05-21T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 20,
        "is_weekend": false
      },
      {
        "id": "cr-20260521-2",
        "report_id": "rep-20260521-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-05-21T07:00:00Z",
        "end_at": "2026-05-21T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 18,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 324,
        "id": "it-20260521-1",
        "report_id": "rep-20260521-01"
      }
    ]
  },
  {
    "id": "rep-20260520-01",
    "work_date": "2026-05-20",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-johan",
    "creator_name": "Johan",
    "status": "approved",
    "observations": "Colocación de láminas y espejos.",
    "incident_type": "ninguna",
    "activities_performed": [],
    "created_at": "2026-05-20T15:00:00Z",
    "updated_at": "2026-05-20T15:30:00Z",
    "crew": [
      {
        "id": "cr-may20-1",
        "report_id": "rep-20260520-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-05-20T07:00:00.000Z",
        "end_at": "2026-05-20T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      },
      {
        "id": "cr-may20-2",
        "report_id": "rep-20260520-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-05-20T07:00:00.000Z",
        "end_at": "2026-05-20T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-may20-3",
        "report_id": "rep-20260520-01",
        "user_id": "usr-efrain",
        "user_name": "Efraín",
        "start_at": "2026-05-20T07:00:00.000Z",
        "end_at": "2026-05-20T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 20,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "id": "it-may20-1",
        "report_id": "rep-20260520-01",
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 15,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 270
      },
      {
        "id": "it-may20-2",
        "report_id": "rep-20260520-01",
        "accessory_id": "acc-mirror",
        "accessory_name": "Espejos",
        "accessory_unit": "each",
        "quantity": 12,
        "unit": "each",
        "unit_price_override": 15,
        "line_total": 180
      }
    ]
  },
  {
    "id": "rep-20260519-01",
    "work_date": "2026-05-19",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-efrain",
    "creator_name": "Efraín",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [MAY 23].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-05-19T15:00:00Z",
    "updated_at": "2026-05-19T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260519-1",
        "report_id": "rep-20260519-01",
        "user_id": "usr-efrain",
        "user_name": "Efraín",
        "start_at": "2026-05-19T07:00:00Z",
        "end_at": "2026-05-19T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 20,
        "is_weekend": false
      },
      {
        "id": "cr-20260519-2",
        "report_id": "rep-20260519-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-05-19T07:00:00Z",
        "end_at": "2026-05-19T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-crash-rail-metal",
        "accessory_name": "Crash rail metal",
        "accessory_unit": "ft",
        "quantity": 60,
        "unit": "ft",
        "unit_price_override": 7.5,
        "line_total": 450,
        "id": "it-20260519-1",
        "report_id": "rep-20260519-01"
      },
      {
        "accessory_id": "acc-corner-guard-vinyl",
        "accessory_name": "Esquineros Vinil",
        "accessory_unit": "each",
        "quantity": 12,
        "unit": "each",
        "unit_price_override": 6,
        "line_total": 72,
        "id": "it-20260519-2",
        "report_id": "rep-20260519-01"
      }
    ]
  },
  {
    "id": "rep-20260518-01",
    "work_date": "2026-05-18",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-efrain",
    "creator_name": "Efraín",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [MAY 23].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-05-18T15:00:00Z",
    "updated_at": "2026-05-18T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260518-1",
        "report_id": "rep-20260518-01",
        "user_id": "usr-efrain",
        "user_name": "Efraín",
        "start_at": "2026-05-18T07:00:00Z",
        "end_at": "2026-05-18T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 20,
        "is_weekend": false
      },
      {
        "id": "cr-20260518-2",
        "report_id": "rep-20260518-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-05-18T07:00:00Z",
        "end_at": "2026-05-18T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-grab-bar-36",
        "accessory_name": "Grab bar 36\"",
        "accessory_unit": "each",
        "quantity": 10,
        "unit": "each",
        "unit_price_override": 14,
        "line_total": 140,
        "id": "it-20260518-1",
        "report_id": "rep-20260518-01"
      },
      {
        "accessory_id": "acc-grab-bar-42",
        "accessory_name": "Grab bar 42\"",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 16,
        "line_total": 128,
        "id": "it-20260518-2",
        "report_id": "rep-20260518-01"
      },
      {
        "accessory_id": "acc-mirror",
        "accessory_name": "Espejos",
        "accessory_unit": "each",
        "quantity": 6,
        "unit": "each",
        "unit_price_override": 15,
        "line_total": 90,
        "id": "it-20260518-3",
        "report_id": "rep-20260518-01"
      }
    ]
  },
  {
    "id": "rep-20260515-01",
    "work_date": "2026-05-15",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-efrain",
    "creator_name": "Efraín",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [MAY 16].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-05-15T15:00:00Z",
    "updated_at": "2026-05-15T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260515-1",
        "report_id": "rep-20260515-01",
        "user_id": "usr-efrain",
        "user_name": "Efraín",
        "start_at": "2026-05-15T07:00:00Z",
        "end_at": "2026-05-15T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 20,
        "is_weekend": false
      },
      {
        "id": "cr-20260515-2",
        "report_id": "rep-20260515-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-05-15T07:00:00Z",
        "end_at": "2026-05-15T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 14,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 252,
        "id": "it-20260515-1",
        "report_id": "rep-20260515-01"
      },
      {
        "accessory_id": "acc-fire-cabinet",
        "accessory_name": "Gabinete extintor (FEC)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 25,
        "line_total": 50,
        "id": "it-20260515-2",
        "report_id": "rep-20260515-01"
      },
      {
        "accessory_id": "acc-fire-extinguisher",
        "accessory_name": "Extintor (FE)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 11,
        "line_total": 22,
        "id": "it-20260515-3",
        "report_id": "rep-20260515-01"
      }
    ]
  },
  {
    "id": "rep-20260514-01",
    "work_date": "2026-05-14",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-efrain",
    "creator_name": "Efraín",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [MAY 16].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-05-14T15:00:00Z",
    "updated_at": "2026-05-14T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260514-1",
        "report_id": "rep-20260514-01",
        "user_id": "usr-efrain",
        "user_name": "Efraín",
        "start_at": "2026-05-14T07:00:00Z",
        "end_at": "2026-05-14T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 20,
        "is_weekend": false
      },
      {
        "id": "cr-20260514-2",
        "report_id": "rep-20260514-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-05-14T07:00:00Z",
        "end_at": "2026-05-14T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 16,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 288,
        "id": "it-20260514-1",
        "report_id": "rep-20260514-01"
      },
      {
        "accessory_id": "acc-corner-guards-ss",
        "accessory_name": "Esquineros SS (Inox)",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 8,
        "line_total": 64,
        "id": "it-20260514-2",
        "report_id": "rep-20260514-01"
      }
    ]
  },
  {
    "id": "rep-20260513-01",
    "work_date": "2026-05-13",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-efrain",
    "creator_name": "Efraín",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [MAY 16].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-05-13T15:00:00Z",
    "updated_at": "2026-05-13T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260513-1",
        "report_id": "rep-20260513-01",
        "user_id": "usr-efrain",
        "user_name": "Efraín",
        "start_at": "2026-05-13T07:00:00Z",
        "end_at": "2026-05-13T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 20,
        "is_weekend": false
      },
      {
        "id": "cr-20260513-2",
        "report_id": "rep-20260513-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-05-13T07:00:00Z",
        "end_at": "2026-05-13T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-toilet-paper-dispenser",
        "accessory_name": "Dispensador papel higiénico",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260513-1",
        "report_id": "rep-20260513-01"
      },
      {
        "accessory_id": "acc-soap-dispenser",
        "accessory_name": "Dispensador jabón",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260513-2",
        "report_id": "rep-20260513-01"
      }
    ]
  },
  {
    "id": "rep-20260512-01",
    "work_date": "2026-05-12",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-efrain",
    "creator_name": "Efraín",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [MAY 16].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-05-12T15:00:00Z",
    "updated_at": "2026-05-12T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260512-1",
        "report_id": "rep-20260512-01",
        "user_id": "usr-efrain",
        "user_name": "Efraín",
        "start_at": "2026-05-12T07:00:00Z",
        "end_at": "2026-05-12T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 20,
        "is_weekend": false
      },
      {
        "id": "cr-20260512-2",
        "report_id": "rep-20260512-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-05-12T07:00:00Z",
        "end_at": "2026-05-12T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 18,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 324,
        "id": "it-20260512-1",
        "report_id": "rep-20260512-01"
      }
    ]
  },
  {
    "id": "rep-20260511-01",
    "work_date": "2026-05-11",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-efrain",
    "creator_name": "Efraín",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [MAY 16].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-05-11T15:00:00Z",
    "updated_at": "2026-05-11T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260511-1",
        "report_id": "rep-20260511-01",
        "user_id": "usr-efrain",
        "user_name": "Efraín",
        "start_at": "2026-05-11T07:00:00Z",
        "end_at": "2026-05-11T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 20,
        "is_weekend": false
      },
      {
        "id": "cr-20260511-2",
        "report_id": "rep-20260511-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-05-11T07:00:00Z",
        "end_at": "2026-05-11T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-crash-rail-metal",
        "accessory_name": "Crash rail metal",
        "accessory_unit": "ft",
        "quantity": 60,
        "unit": "ft",
        "unit_price_override": 7.5,
        "line_total": 450,
        "id": "it-20260511-1",
        "report_id": "rep-20260511-01"
      },
      {
        "accessory_id": "acc-corner-guard-vinyl",
        "accessory_name": "Esquineros Vinil",
        "accessory_unit": "each",
        "quantity": 12,
        "unit": "each",
        "unit_price_override": 6,
        "line_total": 72,
        "id": "it-20260511-2",
        "report_id": "rep-20260511-01"
      }
    ]
  },
  {
    "id": "rep-20260508-01",
    "work_date": "2026-05-08",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-efrain",
    "creator_name": "Efraín",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [MAY 09].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-05-08T15:00:00Z",
    "updated_at": "2026-05-08T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260508-1",
        "report_id": "rep-20260508-01",
        "user_id": "usr-efrain",
        "user_name": "Efraín",
        "start_at": "2026-05-08T07:00:00Z",
        "end_at": "2026-05-08T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 20,
        "is_weekend": false
      },
      {
        "id": "cr-20260508-2",
        "report_id": "rep-20260508-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-05-08T07:00:00Z",
        "end_at": "2026-05-08T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-grab-bar-36",
        "accessory_name": "Grab bar 36\"",
        "accessory_unit": "each",
        "quantity": 10,
        "unit": "each",
        "unit_price_override": 14,
        "line_total": 140,
        "id": "it-20260508-1",
        "report_id": "rep-20260508-01"
      },
      {
        "accessory_id": "acc-grab-bar-42",
        "accessory_name": "Grab bar 42\"",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 16,
        "line_total": 128,
        "id": "it-20260508-2",
        "report_id": "rep-20260508-01"
      },
      {
        "accessory_id": "acc-mirror",
        "accessory_name": "Espejos",
        "accessory_unit": "each",
        "quantity": 6,
        "unit": "each",
        "unit_price_override": 15,
        "line_total": 90,
        "id": "it-20260508-3",
        "report_id": "rep-20260508-01"
      }
    ]
  },
  {
    "id": "rep-20260507-01",
    "work_date": "2026-05-07",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-efrain",
    "creator_name": "Efraín",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [MAY 09].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-05-07T15:00:00Z",
    "updated_at": "2026-05-07T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260507-1",
        "report_id": "rep-20260507-01",
        "user_id": "usr-efrain",
        "user_name": "Efraín",
        "start_at": "2026-05-07T07:00:00Z",
        "end_at": "2026-05-07T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 20,
        "is_weekend": false
      },
      {
        "id": "cr-20260507-2",
        "report_id": "rep-20260507-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-05-07T07:00:00Z",
        "end_at": "2026-05-07T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 14,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 252,
        "id": "it-20260507-1",
        "report_id": "rep-20260507-01"
      },
      {
        "accessory_id": "acc-fire-cabinet",
        "accessory_name": "Gabinete extintor (FEC)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 25,
        "line_total": 50,
        "id": "it-20260507-2",
        "report_id": "rep-20260507-01"
      },
      {
        "accessory_id": "acc-fire-extinguisher",
        "accessory_name": "Extintor (FE)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 11,
        "line_total": 22,
        "id": "it-20260507-3",
        "report_id": "rep-20260507-01"
      }
    ]
  },
  {
    "id": "rep-20260506-01",
    "work_date": "2026-05-06",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-efrain",
    "creator_name": "Efraín",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [MAY 09].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-05-06T15:00:00Z",
    "updated_at": "2026-05-06T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260506-1",
        "report_id": "rep-20260506-01",
        "user_id": "usr-efrain",
        "user_name": "Efraín",
        "start_at": "2026-05-06T07:00:00Z",
        "end_at": "2026-05-06T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 20,
        "is_weekend": false
      },
      {
        "id": "cr-20260506-2",
        "report_id": "rep-20260506-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-05-06T07:00:00Z",
        "end_at": "2026-05-06T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 16,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 288,
        "id": "it-20260506-1",
        "report_id": "rep-20260506-01"
      },
      {
        "accessory_id": "acc-corner-guards-ss",
        "accessory_name": "Esquineros SS (Inox)",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 8,
        "line_total": 64,
        "id": "it-20260506-2",
        "report_id": "rep-20260506-01"
      }
    ]
  },
  {
    "id": "rep-20260505-01",
    "work_date": "2026-05-05",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-efrain",
    "creator_name": "Efraín",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [MAY 09].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-05-05T15:00:00Z",
    "updated_at": "2026-05-05T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260505-1",
        "report_id": "rep-20260505-01",
        "user_id": "usr-efrain",
        "user_name": "Efraín",
        "start_at": "2026-05-05T07:00:00Z",
        "end_at": "2026-05-05T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 20,
        "is_weekend": false
      },
      {
        "id": "cr-20260505-2",
        "report_id": "rep-20260505-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-05-05T07:00:00Z",
        "end_at": "2026-05-05T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-toilet-paper-dispenser",
        "accessory_name": "Dispensador papel higiénico",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260505-1",
        "report_id": "rep-20260505-01"
      },
      {
        "accessory_id": "acc-soap-dispenser",
        "accessory_name": "Dispensador jabón",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260505-2",
        "report_id": "rep-20260505-01"
      }
    ]
  },
  {
    "id": "rep-20260504-01",
    "work_date": "2026-05-04",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-efrain",
    "creator_name": "Efraín",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [MAY 09].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-05-04T15:00:00Z",
    "updated_at": "2026-05-04T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260504-1",
        "report_id": "rep-20260504-01",
        "user_id": "usr-efrain",
        "user_name": "Efraín",
        "start_at": "2026-05-04T07:00:00Z",
        "end_at": "2026-05-04T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 20,
        "is_weekend": false
      },
      {
        "id": "cr-20260504-2",
        "report_id": "rep-20260504-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-05-04T07:00:00Z",
        "end_at": "2026-05-04T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 18,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 324,
        "id": "it-20260504-1",
        "report_id": "rep-20260504-01"
      }
    ]
  },
  {
    "id": "rep-20260501-01",
    "work_date": "2026-05-01",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-efrain",
    "creator_name": "Efraín",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [MAY 02].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-05-01T15:00:00Z",
    "updated_at": "2026-05-01T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260501-1",
        "report_id": "rep-20260501-01",
        "user_id": "usr-efrain",
        "user_name": "Efraín",
        "start_at": "2026-05-01T07:00:00Z",
        "end_at": "2026-05-01T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 20,
        "is_weekend": false
      },
      {
        "id": "cr-20260501-2",
        "report_id": "rep-20260501-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-05-01T07:00:00Z",
        "end_at": "2026-05-01T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-crash-rail-metal",
        "accessory_name": "Crash rail metal",
        "accessory_unit": "ft",
        "quantity": 60,
        "unit": "ft",
        "unit_price_override": 7.5,
        "line_total": 450,
        "id": "it-20260501-1",
        "report_id": "rep-20260501-01"
      },
      {
        "accessory_id": "acc-corner-guard-vinyl",
        "accessory_name": "Esquineros Vinil",
        "accessory_unit": "each",
        "quantity": 12,
        "unit": "each",
        "unit_price_override": 6,
        "line_total": 72,
        "id": "it-20260501-2",
        "report_id": "rep-20260501-01"
      }
    ]
  },
  {
    "id": "rep-20260430-01",
    "work_date": "2026-04-30",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-efrain",
    "creator_name": "Efraín",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [MAY 02].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-04-30T15:00:00Z",
    "updated_at": "2026-04-30T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260430-1",
        "report_id": "rep-20260430-01",
        "user_id": "usr-efrain",
        "user_name": "Efraín",
        "start_at": "2026-04-30T07:00:00Z",
        "end_at": "2026-04-30T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 20,
        "is_weekend": false
      },
      {
        "id": "cr-20260430-2",
        "report_id": "rep-20260430-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-04-30T07:00:00Z",
        "end_at": "2026-04-30T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-grab-bar-36",
        "accessory_name": "Grab bar 36\"",
        "accessory_unit": "each",
        "quantity": 10,
        "unit": "each",
        "unit_price_override": 14,
        "line_total": 140,
        "id": "it-20260430-1",
        "report_id": "rep-20260430-01"
      },
      {
        "accessory_id": "acc-grab-bar-42",
        "accessory_name": "Grab bar 42\"",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 16,
        "line_total": 128,
        "id": "it-20260430-2",
        "report_id": "rep-20260430-01"
      },
      {
        "accessory_id": "acc-mirror",
        "accessory_name": "Espejos",
        "accessory_unit": "each",
        "quantity": 6,
        "unit": "each",
        "unit_price_override": 15,
        "line_total": 90,
        "id": "it-20260430-3",
        "report_id": "rep-20260430-01"
      }
    ]
  },
  {
    "id": "rep-20260429-01",
    "work_date": "2026-04-29",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-efrain",
    "creator_name": "Efraín",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [MAY 02].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-04-29T15:00:00Z",
    "updated_at": "2026-04-29T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260429-1",
        "report_id": "rep-20260429-01",
        "user_id": "usr-efrain",
        "user_name": "Efraín",
        "start_at": "2026-04-29T07:00:00Z",
        "end_at": "2026-04-29T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 20,
        "is_weekend": false
      },
      {
        "id": "cr-20260429-2",
        "report_id": "rep-20260429-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-04-29T07:00:00Z",
        "end_at": "2026-04-29T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 14,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 252,
        "id": "it-20260429-1",
        "report_id": "rep-20260429-01"
      },
      {
        "accessory_id": "acc-fire-cabinet",
        "accessory_name": "Gabinete extintor (FEC)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 25,
        "line_total": 50,
        "id": "it-20260429-2",
        "report_id": "rep-20260429-01"
      },
      {
        "accessory_id": "acc-fire-extinguisher",
        "accessory_name": "Extintor (FE)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 11,
        "line_total": 22,
        "id": "it-20260429-3",
        "report_id": "rep-20260429-01"
      }
    ]
  },
  {
    "id": "rep-20260428-01",
    "work_date": "2026-04-28",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-efrain",
    "creator_name": "Efraín",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [MAY 02].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-04-28T15:00:00Z",
    "updated_at": "2026-04-28T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260428-1",
        "report_id": "rep-20260428-01",
        "user_id": "usr-efrain",
        "user_name": "Efraín",
        "start_at": "2026-04-28T07:00:00Z",
        "end_at": "2026-04-28T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 20,
        "is_weekend": false
      },
      {
        "id": "cr-20260428-2",
        "report_id": "rep-20260428-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-04-28T07:00:00Z",
        "end_at": "2026-04-28T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 16,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 288,
        "id": "it-20260428-1",
        "report_id": "rep-20260428-01"
      },
      {
        "accessory_id": "acc-corner-guards-ss",
        "accessory_name": "Esquineros SS (Inox)",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 8,
        "line_total": 64,
        "id": "it-20260428-2",
        "report_id": "rep-20260428-01"
      }
    ]
  },
  {
    "id": "rep-20260427-01",
    "work_date": "2026-04-27",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-efrain",
    "creator_name": "Efraín",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [MAY 02].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-04-27T15:00:00Z",
    "updated_at": "2026-04-27T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260427-1",
        "report_id": "rep-20260427-01",
        "user_id": "usr-efrain",
        "user_name": "Efraín",
        "start_at": "2026-04-27T07:00:00Z",
        "end_at": "2026-04-27T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 20,
        "is_weekend": false
      },
      {
        "id": "cr-20260427-2",
        "report_id": "rep-20260427-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-04-27T07:00:00Z",
        "end_at": "2026-04-27T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-toilet-paper-dispenser",
        "accessory_name": "Dispensador papel higiénico",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260427-1",
        "report_id": "rep-20260427-01"
      },
      {
        "accessory_id": "acc-soap-dispenser",
        "accessory_name": "Dispensador jabón",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260427-2",
        "report_id": "rep-20260427-01"
      }
    ]
  },
  {
    "id": "rep-20260424-01",
    "work_date": "2026-04-24",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-pedro",
    "creator_name": "Pedro",
    "status": "approved",
    "observations": "Instalación de espejos y barras de agarre en baños. Última jornada laborada de Pedro según consolidado oficial.",
    "incident_type": "ninguna",
    "activities_performed": [],
    "created_at": "2026-04-24T15:00:00Z",
    "updated_at": "2026-04-24T15:30:00Z",
    "crew": [
      {
        "id": "cr-apr24-1",
        "report_id": "rep-20260424-01",
        "user_id": "usr-pedro",
        "user_name": "Pedro",
        "start_at": "2026-04-24T06:30:00.000Z",
        "end_at": "2026-04-24T15:00:00.000Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-apr24-2",
        "report_id": "rep-20260424-01",
        "user_id": "usr-efrain",
        "user_name": "Efraín",
        "start_at": "2026-04-24T06:30:00.000Z",
        "end_at": "2026-04-24T15:00:00.000Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 20,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "id": "it-apr24-1",
        "report_id": "rep-20260424-01",
        "accessory_id": "acc-mirror",
        "accessory_name": "Espejos",
        "accessory_unit": "each",
        "quantity": 12,
        "unit": "each",
        "unit_price_override": 15,
        "line_total": 180
      },
      {
        "id": "it-apr24-2",
        "report_id": "rep-20260424-01",
        "accessory_id": "acc-grab-bar-36",
        "accessory_name": "Grab bar 36\"",
        "accessory_unit": "each",
        "quantity": 10,
        "unit": "each",
        "unit_price_override": 14,
        "line_total": 140
      }
    ]
  },
  {
    "id": "rep-20260423-01",
    "work_date": "2026-04-23",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-pedro",
    "creator_name": "Pedro",
    "status": "approved",
    "observations": "Colocación de láminas Acrovyn en pasillos.",
    "incident_type": "ninguna",
    "activities_performed": [],
    "created_at": "2026-04-23T15:00:00Z",
    "updated_at": "2026-04-23T15:30:00Z",
    "crew": [
      {
        "id": "cr-apr23-1",
        "report_id": "rep-20260423-01",
        "user_id": "usr-pedro",
        "user_name": "Pedro",
        "start_at": "2026-04-23T06:30:00.000Z",
        "end_at": "2026-04-23T15:00:00.000Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-apr23-2",
        "report_id": "rep-20260423-01",
        "user_id": "usr-efrain",
        "user_name": "Efraín",
        "start_at": "2026-04-23T06:30:00.000Z",
        "end_at": "2026-04-23T15:00:00.000Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 20,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "id": "it-apr23-1",
        "report_id": "rep-20260423-01",
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 10,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 180
      }
    ]
  },
  {
    "id": "rep-20260422-01",
    "work_date": "2026-04-22",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-pedro",
    "creator_name": "Pedro",
    "status": "approved",
    "observations": "Crash rail metal y esquineros de protección.",
    "incident_type": "ninguna",
    "activities_performed": [],
    "created_at": "2026-04-22T15:00:00Z",
    "updated_at": "2026-04-22T15:30:00Z",
    "crew": [
      {
        "id": "cr-apr22-1",
        "report_id": "rep-20260422-01",
        "user_id": "usr-pedro",
        "user_name": "Pedro",
        "start_at": "2026-04-22T06:30:00.000Z",
        "end_at": "2026-04-22T15:00:00.000Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-apr22-2",
        "report_id": "rep-20260422-01",
        "user_id": "usr-efrain",
        "user_name": "Efraín",
        "start_at": "2026-04-22T06:30:00.000Z",
        "end_at": "2026-04-22T15:00:00.000Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 20,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "id": "it-apr22-1",
        "report_id": "rep-20260422-01",
        "accessory_id": "acc-crash-rail-metal",
        "accessory_name": "Crash rail metal",
        "accessory_unit": "ft",
        "quantity": 55,
        "unit": "ft",
        "unit_price_override": 7.5,
        "line_total": 412.5
      }
    ]
  },
  {
    "id": "rep-20260421-01",
    "work_date": "2026-04-21",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-pedro",
    "creator_name": "Pedro",
    "status": "approved",
    "observations": "Barras de agarre 18\" y 36\" en baños.",
    "incident_type": "ninguna",
    "activities_performed": [],
    "created_at": "2026-04-21T15:00:00Z",
    "updated_at": "2026-04-21T15:30:00Z",
    "crew": [
      {
        "id": "cr-apr21-1",
        "report_id": "rep-20260421-01",
        "user_id": "usr-pedro",
        "user_name": "Pedro",
        "start_at": "2026-04-21T06:30:00.000Z",
        "end_at": "2026-04-21T15:00:00.000Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-apr21-2",
        "report_id": "rep-20260421-01",
        "user_id": "usr-efrain",
        "user_name": "Efraín",
        "start_at": "2026-04-21T06:30:00.000Z",
        "end_at": "2026-04-21T15:00:00.000Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 20,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "id": "it-apr21-1",
        "report_id": "rep-20260421-01",
        "accessory_id": "acc-grab-bar-18",
        "accessory_name": "Grab bar 18\"",
        "accessory_unit": "each",
        "quantity": 10,
        "unit": "each",
        "unit_price_override": 12,
        "line_total": 120
      },
      {
        "id": "it-apr21-2",
        "report_id": "rep-20260421-01",
        "accessory_id": "acc-grab-bar-36",
        "accessory_name": "Grab bar 36\"",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 14,
        "line_total": 112
      }
    ]
  },
  {
    "id": "rep-20260420-01",
    "work_date": "2026-04-20",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-pedro",
    "creator_name": "Pedro",
    "status": "approved",
    "observations": "Movilización de material, replanteo y preparación de áreas.",
    "incident_type": "ninguna",
    "activities_performed": [
      "entrega/movilización de material",
      "preparar paredes"
    ],
    "created_at": "2026-04-20T15:00:00Z",
    "updated_at": "2026-04-20T15:30:00Z",
    "crew": [
      {
        "id": "cr-apr20-1",
        "report_id": "rep-20260420-01",
        "user_id": "usr-pedro",
        "user_name": "Pedro",
        "start_at": "2026-04-20T06:30:00.000Z",
        "end_at": "2026-04-20T15:00:00.000Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-apr20-2",
        "report_id": "rep-20260420-01",
        "user_id": "usr-efrain",
        "user_name": "Efraín",
        "start_at": "2026-04-20T06:30:00.000Z",
        "end_at": "2026-04-20T15:00:00.000Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 20,
        "is_weekend": false
      }
    ],
    "items": []
  },
  {
    "id": "rep-20260417-01",
    "work_date": "2026-04-17",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [ABR 18].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-04-17T15:00:00Z",
    "updated_at": "2026-04-17T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260417-1",
        "report_id": "rep-20260417-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-04-17T07:00:00Z",
        "end_at": "2026-04-17T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260417-2",
        "report_id": "rep-20260417-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-04-17T07:00:00Z",
        "end_at": "2026-04-17T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260417-3",
        "report_id": "rep-20260417-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-04-17T07:00:00Z",
        "end_at": "2026-04-17T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 18,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 324,
        "id": "it-20260417-1",
        "report_id": "rep-20260417-01"
      }
    ]
  },
  {
    "id": "rep-20260416-01",
    "work_date": "2026-04-16",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [ABR 18].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-04-16T15:00:00Z",
    "updated_at": "2026-04-16T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260416-1",
        "report_id": "rep-20260416-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-04-16T07:00:00Z",
        "end_at": "2026-04-16T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260416-2",
        "report_id": "rep-20260416-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-04-16T07:00:00Z",
        "end_at": "2026-04-16T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260416-3",
        "report_id": "rep-20260416-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-04-16T07:00:00Z",
        "end_at": "2026-04-16T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-crash-rail-metal",
        "accessory_name": "Crash rail metal",
        "accessory_unit": "ft",
        "quantity": 60,
        "unit": "ft",
        "unit_price_override": 7.5,
        "line_total": 450,
        "id": "it-20260416-1",
        "report_id": "rep-20260416-01"
      },
      {
        "accessory_id": "acc-corner-guard-vinyl",
        "accessory_name": "Esquineros Vinil",
        "accessory_unit": "each",
        "quantity": 12,
        "unit": "each",
        "unit_price_override": 6,
        "line_total": 72,
        "id": "it-20260416-2",
        "report_id": "rep-20260416-01"
      }
    ]
  },
  {
    "id": "rep-20260415-01",
    "work_date": "2026-04-15",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Instalación de pasamanos y esquineros.",
    "incident_type": "ninguna",
    "activities_performed": [],
    "created_at": "2026-04-15T15:00:00Z",
    "updated_at": "2026-04-15T15:30:00Z",
    "crew": [
      {
        "id": "cr-apr15-1",
        "report_id": "rep-20260415-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-04-15T07:00:00.000Z",
        "end_at": "2026-04-15T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-apr15-2",
        "report_id": "rep-20260415-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-04-15T07:00:00.000Z",
        "end_at": "2026-04-15T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-apr15-3",
        "report_id": "rep-20260415-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-04-15T07:00:00.000Z",
        "end_at": "2026-04-15T15:00:00.000Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "id": "it-apr15-1",
        "report_id": "rep-20260415-01",
        "accessory_id": "acc-hand-rail",
        "accessory_name": "Hand rail (Pasamanos)",
        "accessory_unit": "ft",
        "quantity": 85,
        "unit": "ft",
        "unit_price_override": 8.5,
        "line_total": 722.5
      },
      {
        "id": "it-apr15-2",
        "report_id": "rep-20260415-01",
        "accessory_id": "acc-corner-guards-ss",
        "accessory_name": "Esquineros SS (Inox)",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 8,
        "line_total": 112
      }
    ]
  },
  {
    "id": "rep-20260414-01",
    "work_date": "2026-04-14",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [ABR 18].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-04-14T15:00:00Z",
    "updated_at": "2026-04-14T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260414-1",
        "report_id": "rep-20260414-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-04-14T07:00:00Z",
        "end_at": "2026-04-14T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260414-2",
        "report_id": "rep-20260414-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-04-14T07:00:00Z",
        "end_at": "2026-04-14T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260414-3",
        "report_id": "rep-20260414-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-04-14T07:00:00Z",
        "end_at": "2026-04-14T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-grab-bar-36",
        "accessory_name": "Grab bar 36\"",
        "accessory_unit": "each",
        "quantity": 10,
        "unit": "each",
        "unit_price_override": 14,
        "line_total": 140,
        "id": "it-20260414-1",
        "report_id": "rep-20260414-01"
      },
      {
        "accessory_id": "acc-grab-bar-42",
        "accessory_name": "Grab bar 42\"",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 16,
        "line_total": 128,
        "id": "it-20260414-2",
        "report_id": "rep-20260414-01"
      },
      {
        "accessory_id": "acc-mirror",
        "accessory_name": "Espejos",
        "accessory_unit": "each",
        "quantity": 6,
        "unit": "each",
        "unit_price_override": 15,
        "line_total": 90,
        "id": "it-20260414-3",
        "report_id": "rep-20260414-01"
      }
    ]
  },
  {
    "id": "rep-20260413-01",
    "work_date": "2026-04-13",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [ABR 18].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-04-13T15:00:00Z",
    "updated_at": "2026-04-13T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260413-1",
        "report_id": "rep-20260413-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-04-13T07:00:00Z",
        "end_at": "2026-04-13T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260413-2",
        "report_id": "rep-20260413-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-04-13T07:00:00Z",
        "end_at": "2026-04-13T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260413-3",
        "report_id": "rep-20260413-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-04-13T07:00:00Z",
        "end_at": "2026-04-13T15:00:00Z",
        "hours": 8,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 14,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 252,
        "id": "it-20260413-1",
        "report_id": "rep-20260413-01"
      },
      {
        "accessory_id": "acc-fire-cabinet",
        "accessory_name": "Gabinete extintor (FEC)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 25,
        "line_total": 50,
        "id": "it-20260413-2",
        "report_id": "rep-20260413-01"
      },
      {
        "accessory_id": "acc-fire-extinguisher",
        "accessory_name": "Extintor (FE)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 11,
        "line_total": 22,
        "id": "it-20260413-3",
        "report_id": "rep-20260413-01"
      }
    ]
  },
  {
    "id": "rep-20260410-01",
    "work_date": "2026-04-10",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [ABR 11].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-04-10T15:00:00Z",
    "updated_at": "2026-04-10T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260410-1",
        "report_id": "rep-20260410-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-04-10T06:30:00Z",
        "end_at": "2026-04-10T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260410-2",
        "report_id": "rep-20260410-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-04-10T06:30:00Z",
        "end_at": "2026-04-10T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260410-3",
        "report_id": "rep-20260410-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-04-10T06:30:00Z",
        "end_at": "2026-04-10T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 16,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 288,
        "id": "it-20260410-1",
        "report_id": "rep-20260410-01"
      },
      {
        "accessory_id": "acc-corner-guards-ss",
        "accessory_name": "Esquineros SS (Inox)",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 8,
        "line_total": 64,
        "id": "it-20260410-2",
        "report_id": "rep-20260410-01"
      }
    ]
  },
  {
    "id": "rep-20260409-01",
    "work_date": "2026-04-09",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [ABR 11].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-04-09T15:00:00Z",
    "updated_at": "2026-04-09T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260409-1",
        "report_id": "rep-20260409-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-04-09T06:30:00Z",
        "end_at": "2026-04-09T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260409-2",
        "report_id": "rep-20260409-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-04-09T06:30:00Z",
        "end_at": "2026-04-09T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260409-3",
        "report_id": "rep-20260409-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-04-09T06:30:00Z",
        "end_at": "2026-04-09T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-toilet-paper-dispenser",
        "accessory_name": "Dispensador papel higiénico",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260409-1",
        "report_id": "rep-20260409-01"
      },
      {
        "accessory_id": "acc-soap-dispenser",
        "accessory_name": "Dispensador jabón",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260409-2",
        "report_id": "rep-20260409-01"
      }
    ]
  },
  {
    "id": "rep-20260408-01",
    "work_date": "2026-04-08",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [ABR 11].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-04-08T15:00:00Z",
    "updated_at": "2026-04-08T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260408-1",
        "report_id": "rep-20260408-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-04-08T06:30:00Z",
        "end_at": "2026-04-08T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260408-2",
        "report_id": "rep-20260408-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-04-08T06:30:00Z",
        "end_at": "2026-04-08T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260408-3",
        "report_id": "rep-20260408-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-04-08T06:30:00Z",
        "end_at": "2026-04-08T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 18,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 324,
        "id": "it-20260408-1",
        "report_id": "rep-20260408-01"
      }
    ]
  },
  {
    "id": "rep-20260407-01",
    "work_date": "2026-04-07",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [ABR 11].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-04-07T15:00:00Z",
    "updated_at": "2026-04-07T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260407-1",
        "report_id": "rep-20260407-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-04-07T06:30:00Z",
        "end_at": "2026-04-07T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260407-2",
        "report_id": "rep-20260407-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-04-07T06:30:00Z",
        "end_at": "2026-04-07T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260407-3",
        "report_id": "rep-20260407-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-04-07T06:30:00Z",
        "end_at": "2026-04-07T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-crash-rail-metal",
        "accessory_name": "Crash rail metal",
        "accessory_unit": "ft",
        "quantity": 60,
        "unit": "ft",
        "unit_price_override": 7.5,
        "line_total": 450,
        "id": "it-20260407-1",
        "report_id": "rep-20260407-01"
      },
      {
        "accessory_id": "acc-corner-guard-vinyl",
        "accessory_name": "Esquineros Vinil",
        "accessory_unit": "each",
        "quantity": 12,
        "unit": "each",
        "unit_price_override": 6,
        "line_total": 72,
        "id": "it-20260407-2",
        "report_id": "rep-20260407-01"
      }
    ]
  },
  {
    "id": "rep-20260406-01",
    "work_date": "2026-04-06",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [ABR 11].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-04-06T15:00:00Z",
    "updated_at": "2026-04-06T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260406-1",
        "report_id": "rep-20260406-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-04-06T06:30:00Z",
        "end_at": "2026-04-06T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260406-2",
        "report_id": "rep-20260406-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-04-06T06:30:00Z",
        "end_at": "2026-04-06T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260406-3",
        "report_id": "rep-20260406-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-04-06T06:30:00Z",
        "end_at": "2026-04-06T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-grab-bar-36",
        "accessory_name": "Grab bar 36\"",
        "accessory_unit": "each",
        "quantity": 10,
        "unit": "each",
        "unit_price_override": 14,
        "line_total": 140,
        "id": "it-20260406-1",
        "report_id": "rep-20260406-01"
      },
      {
        "accessory_id": "acc-grab-bar-42",
        "accessory_name": "Grab bar 42\"",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 16,
        "line_total": 128,
        "id": "it-20260406-2",
        "report_id": "rep-20260406-01"
      },
      {
        "accessory_id": "acc-mirror",
        "accessory_name": "Espejos",
        "accessory_unit": "each",
        "quantity": 6,
        "unit": "each",
        "unit_price_override": 15,
        "line_total": 90,
        "id": "it-20260406-3",
        "report_id": "rep-20260406-01"
      }
    ]
  },
  {
    "id": "rep-20260403-01",
    "work_date": "2026-04-03",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [ABR 04].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-04-03T15:00:00Z",
    "updated_at": "2026-04-03T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260403-1",
        "report_id": "rep-20260403-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-04-03T06:30:00Z",
        "end_at": "2026-04-03T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260403-2",
        "report_id": "rep-20260403-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-04-03T06:30:00Z",
        "end_at": "2026-04-03T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260403-3",
        "report_id": "rep-20260403-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-04-03T06:30:00Z",
        "end_at": "2026-04-03T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 14,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 252,
        "id": "it-20260403-1",
        "report_id": "rep-20260403-01"
      },
      {
        "accessory_id": "acc-fire-cabinet",
        "accessory_name": "Gabinete extintor (FEC)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 25,
        "line_total": 50,
        "id": "it-20260403-2",
        "report_id": "rep-20260403-01"
      },
      {
        "accessory_id": "acc-fire-extinguisher",
        "accessory_name": "Extintor (FE)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 11,
        "line_total": 22,
        "id": "it-20260403-3",
        "report_id": "rep-20260403-01"
      }
    ]
  },
  {
    "id": "rep-20260402-01",
    "work_date": "2026-04-02",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [ABR 04].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-04-02T15:00:00Z",
    "updated_at": "2026-04-02T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260402-1",
        "report_id": "rep-20260402-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-04-02T06:30:00Z",
        "end_at": "2026-04-02T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260402-2",
        "report_id": "rep-20260402-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-04-02T06:30:00Z",
        "end_at": "2026-04-02T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260402-3",
        "report_id": "rep-20260402-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-04-02T06:30:00Z",
        "end_at": "2026-04-02T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 16,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 288,
        "id": "it-20260402-1",
        "report_id": "rep-20260402-01"
      },
      {
        "accessory_id": "acc-corner-guards-ss",
        "accessory_name": "Esquineros SS (Inox)",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 8,
        "line_total": 64,
        "id": "it-20260402-2",
        "report_id": "rep-20260402-01"
      }
    ]
  },
  {
    "id": "rep-20260401-01",
    "work_date": "2026-04-01",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [ABR 04].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-04-01T15:00:00Z",
    "updated_at": "2026-04-01T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260401-1",
        "report_id": "rep-20260401-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-04-01T06:30:00Z",
        "end_at": "2026-04-01T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260401-2",
        "report_id": "rep-20260401-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-04-01T06:30:00Z",
        "end_at": "2026-04-01T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260401-3",
        "report_id": "rep-20260401-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-04-01T06:30:00Z",
        "end_at": "2026-04-01T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-toilet-paper-dispenser",
        "accessory_name": "Dispensador papel higiénico",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260401-1",
        "report_id": "rep-20260401-01"
      },
      {
        "accessory_id": "acc-soap-dispenser",
        "accessory_name": "Dispensador jabón",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260401-2",
        "report_id": "rep-20260401-01"
      }
    ]
  },
  {
    "id": "rep-20260331-01",
    "work_date": "2026-03-31",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [ABR 04].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-03-31T15:00:00Z",
    "updated_at": "2026-03-31T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260331-1",
        "report_id": "rep-20260331-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-03-31T06:30:00Z",
        "end_at": "2026-03-31T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260331-2",
        "report_id": "rep-20260331-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-03-31T06:30:00Z",
        "end_at": "2026-03-31T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260331-3",
        "report_id": "rep-20260331-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-03-31T06:30:00Z",
        "end_at": "2026-03-31T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 18,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 324,
        "id": "it-20260331-1",
        "report_id": "rep-20260331-01"
      }
    ]
  },
  {
    "id": "rep-20260330-01",
    "work_date": "2026-03-30",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [ABR 04].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-03-30T15:00:00Z",
    "updated_at": "2026-03-30T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260330-1",
        "report_id": "rep-20260330-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-03-30T06:30:00Z",
        "end_at": "2026-03-30T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260330-2",
        "report_id": "rep-20260330-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-03-30T06:30:00Z",
        "end_at": "2026-03-30T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260330-3",
        "report_id": "rep-20260330-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-03-30T06:30:00Z",
        "end_at": "2026-03-30T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-crash-rail-metal",
        "accessory_name": "Crash rail metal",
        "accessory_unit": "ft",
        "quantity": 60,
        "unit": "ft",
        "unit_price_override": 7.5,
        "line_total": 450,
        "id": "it-20260330-1",
        "report_id": "rep-20260330-01"
      },
      {
        "accessory_id": "acc-corner-guard-vinyl",
        "accessory_name": "Esquineros Vinil",
        "accessory_unit": "each",
        "quantity": 12,
        "unit": "each",
        "unit_price_override": 6,
        "line_total": 72,
        "id": "it-20260330-2",
        "report_id": "rep-20260330-01"
      }
    ]
  },
  {
    "id": "rep-20260327-01",
    "work_date": "2026-03-27",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [MAR 28].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-03-27T15:00:00Z",
    "updated_at": "2026-03-27T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260327-1",
        "report_id": "rep-20260327-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-03-27T06:30:00Z",
        "end_at": "2026-03-27T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260327-2",
        "report_id": "rep-20260327-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-03-27T06:30:00Z",
        "end_at": "2026-03-27T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260327-3",
        "report_id": "rep-20260327-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-03-27T06:30:00Z",
        "end_at": "2026-03-27T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-grab-bar-36",
        "accessory_name": "Grab bar 36\"",
        "accessory_unit": "each",
        "quantity": 10,
        "unit": "each",
        "unit_price_override": 14,
        "line_total": 140,
        "id": "it-20260327-1",
        "report_id": "rep-20260327-01"
      },
      {
        "accessory_id": "acc-grab-bar-42",
        "accessory_name": "Grab bar 42\"",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 16,
        "line_total": 128,
        "id": "it-20260327-2",
        "report_id": "rep-20260327-01"
      },
      {
        "accessory_id": "acc-mirror",
        "accessory_name": "Espejos",
        "accessory_unit": "each",
        "quantity": 6,
        "unit": "each",
        "unit_price_override": 15,
        "line_total": 90,
        "id": "it-20260327-3",
        "report_id": "rep-20260327-01"
      }
    ]
  },
  {
    "id": "rep-20260326-01",
    "work_date": "2026-03-26",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [MAR 28].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-03-26T15:00:00Z",
    "updated_at": "2026-03-26T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260326-1",
        "report_id": "rep-20260326-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-03-26T06:30:00Z",
        "end_at": "2026-03-26T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260326-2",
        "report_id": "rep-20260326-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-03-26T06:30:00Z",
        "end_at": "2026-03-26T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260326-3",
        "report_id": "rep-20260326-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-03-26T06:30:00Z",
        "end_at": "2026-03-26T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 14,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 252,
        "id": "it-20260326-1",
        "report_id": "rep-20260326-01"
      },
      {
        "accessory_id": "acc-fire-cabinet",
        "accessory_name": "Gabinete extintor (FEC)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 25,
        "line_total": 50,
        "id": "it-20260326-2",
        "report_id": "rep-20260326-01"
      },
      {
        "accessory_id": "acc-fire-extinguisher",
        "accessory_name": "Extintor (FE)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 11,
        "line_total": 22,
        "id": "it-20260326-3",
        "report_id": "rep-20260326-01"
      }
    ]
  },
  {
    "id": "rep-20260325-01",
    "work_date": "2026-03-25",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [MAR 28].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-03-25T15:00:00Z",
    "updated_at": "2026-03-25T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260325-1",
        "report_id": "rep-20260325-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-03-25T06:30:00Z",
        "end_at": "2026-03-25T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260325-2",
        "report_id": "rep-20260325-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-03-25T06:30:00Z",
        "end_at": "2026-03-25T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260325-3",
        "report_id": "rep-20260325-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-03-25T06:30:00Z",
        "end_at": "2026-03-25T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 16,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 288,
        "id": "it-20260325-1",
        "report_id": "rep-20260325-01"
      },
      {
        "accessory_id": "acc-corner-guards-ss",
        "accessory_name": "Esquineros SS (Inox)",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 8,
        "line_total": 64,
        "id": "it-20260325-2",
        "report_id": "rep-20260325-01"
      }
    ]
  },
  {
    "id": "rep-20260324-01",
    "work_date": "2026-03-24",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [MAR 28].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-03-24T15:00:00Z",
    "updated_at": "2026-03-24T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260324-1",
        "report_id": "rep-20260324-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-03-24T06:30:00Z",
        "end_at": "2026-03-24T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260324-2",
        "report_id": "rep-20260324-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-03-24T06:30:00Z",
        "end_at": "2026-03-24T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260324-3",
        "report_id": "rep-20260324-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-03-24T06:30:00Z",
        "end_at": "2026-03-24T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-toilet-paper-dispenser",
        "accessory_name": "Dispensador papel higiénico",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260324-1",
        "report_id": "rep-20260324-01"
      },
      {
        "accessory_id": "acc-soap-dispenser",
        "accessory_name": "Dispensador jabón",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260324-2",
        "report_id": "rep-20260324-01"
      }
    ]
  },
  {
    "id": "rep-20260323-01",
    "work_date": "2026-03-23",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [MAR 28].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-03-23T15:00:00Z",
    "updated_at": "2026-03-23T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260323-1",
        "report_id": "rep-20260323-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-03-23T06:30:00Z",
        "end_at": "2026-03-23T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260323-2",
        "report_id": "rep-20260323-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-03-23T06:30:00Z",
        "end_at": "2026-03-23T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260323-3",
        "report_id": "rep-20260323-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-03-23T06:30:00Z",
        "end_at": "2026-03-23T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 18,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 324,
        "id": "it-20260323-1",
        "report_id": "rep-20260323-01"
      }
    ]
  },
  {
    "id": "rep-20260320-01",
    "work_date": "2026-03-20",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [MAR 21].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-03-20T15:00:00Z",
    "updated_at": "2026-03-20T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260320-1",
        "report_id": "rep-20260320-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-03-20T06:30:00Z",
        "end_at": "2026-03-20T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260320-2",
        "report_id": "rep-20260320-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-03-20T06:30:00Z",
        "end_at": "2026-03-20T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260320-3",
        "report_id": "rep-20260320-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-03-20T06:30:00Z",
        "end_at": "2026-03-20T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-crash-rail-metal",
        "accessory_name": "Crash rail metal",
        "accessory_unit": "ft",
        "quantity": 60,
        "unit": "ft",
        "unit_price_override": 7.5,
        "line_total": 450,
        "id": "it-20260320-1",
        "report_id": "rep-20260320-01"
      },
      {
        "accessory_id": "acc-corner-guard-vinyl",
        "accessory_name": "Esquineros Vinil",
        "accessory_unit": "each",
        "quantity": 12,
        "unit": "each",
        "unit_price_override": 6,
        "line_total": 72,
        "id": "it-20260320-2",
        "report_id": "rep-20260320-01"
      }
    ]
  },
  {
    "id": "rep-20260319-01",
    "work_date": "2026-03-19",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [MAR 21].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-03-19T15:00:00Z",
    "updated_at": "2026-03-19T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260319-1",
        "report_id": "rep-20260319-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-03-19T06:30:00Z",
        "end_at": "2026-03-19T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260319-2",
        "report_id": "rep-20260319-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-03-19T06:30:00Z",
        "end_at": "2026-03-19T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260319-3",
        "report_id": "rep-20260319-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-03-19T06:30:00Z",
        "end_at": "2026-03-19T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-grab-bar-36",
        "accessory_name": "Grab bar 36\"",
        "accessory_unit": "each",
        "quantity": 10,
        "unit": "each",
        "unit_price_override": 14,
        "line_total": 140,
        "id": "it-20260319-1",
        "report_id": "rep-20260319-01"
      },
      {
        "accessory_id": "acc-grab-bar-42",
        "accessory_name": "Grab bar 42\"",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 16,
        "line_total": 128,
        "id": "it-20260319-2",
        "report_id": "rep-20260319-01"
      },
      {
        "accessory_id": "acc-mirror",
        "accessory_name": "Espejos",
        "accessory_unit": "each",
        "quantity": 6,
        "unit": "each",
        "unit_price_override": 15,
        "line_total": 90,
        "id": "it-20260319-3",
        "report_id": "rep-20260319-01"
      }
    ]
  },
  {
    "id": "rep-20260318-01",
    "work_date": "2026-03-18",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [MAR 21].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-03-18T15:00:00Z",
    "updated_at": "2026-03-18T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260318-1",
        "report_id": "rep-20260318-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-03-18T06:30:00Z",
        "end_at": "2026-03-18T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260318-2",
        "report_id": "rep-20260318-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-03-18T06:30:00Z",
        "end_at": "2026-03-18T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260318-3",
        "report_id": "rep-20260318-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-03-18T06:30:00Z",
        "end_at": "2026-03-18T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 14,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 252,
        "id": "it-20260318-1",
        "report_id": "rep-20260318-01"
      },
      {
        "accessory_id": "acc-fire-cabinet",
        "accessory_name": "Gabinete extintor (FEC)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 25,
        "line_total": 50,
        "id": "it-20260318-2",
        "report_id": "rep-20260318-01"
      },
      {
        "accessory_id": "acc-fire-extinguisher",
        "accessory_name": "Extintor (FE)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 11,
        "line_total": 22,
        "id": "it-20260318-3",
        "report_id": "rep-20260318-01"
      }
    ]
  },
  {
    "id": "rep-20260317-01",
    "work_date": "2026-03-17",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [MAR 21].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-03-17T15:00:00Z",
    "updated_at": "2026-03-17T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260317-1",
        "report_id": "rep-20260317-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-03-17T06:30:00Z",
        "end_at": "2026-03-17T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260317-2",
        "report_id": "rep-20260317-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-03-17T06:30:00Z",
        "end_at": "2026-03-17T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260317-3",
        "report_id": "rep-20260317-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-03-17T06:30:00Z",
        "end_at": "2026-03-17T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 16,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 288,
        "id": "it-20260317-1",
        "report_id": "rep-20260317-01"
      },
      {
        "accessory_id": "acc-corner-guards-ss",
        "accessory_name": "Esquineros SS (Inox)",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 8,
        "line_total": 64,
        "id": "it-20260317-2",
        "report_id": "rep-20260317-01"
      }
    ]
  },
  {
    "id": "rep-20260316-01",
    "work_date": "2026-03-16",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [MAR 21].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-03-16T15:00:00Z",
    "updated_at": "2026-03-16T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260316-1",
        "report_id": "rep-20260316-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-03-16T06:30:00Z",
        "end_at": "2026-03-16T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260316-2",
        "report_id": "rep-20260316-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-03-16T06:30:00Z",
        "end_at": "2026-03-16T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260316-3",
        "report_id": "rep-20260316-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-03-16T06:30:00Z",
        "end_at": "2026-03-16T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-toilet-paper-dispenser",
        "accessory_name": "Dispensador papel higiénico",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260316-1",
        "report_id": "rep-20260316-01"
      },
      {
        "accessory_id": "acc-soap-dispenser",
        "accessory_name": "Dispensador jabón",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260316-2",
        "report_id": "rep-20260316-01"
      }
    ]
  },
  {
    "id": "rep-20260313-01",
    "work_date": "2026-03-13",
    "job_site_id": "site-jackson-4th",
    "job_site_name": "Jackson 4th Floor",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson 4th Floor. Hoja consolidada [MAR 14].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-03-13T15:00:00Z",
    "updated_at": "2026-03-13T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260313-1",
        "report_id": "rep-20260313-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-03-13T06:30:00Z",
        "end_at": "2026-03-13T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260313-2",
        "report_id": "rep-20260313-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-03-13T06:30:00Z",
        "end_at": "2026-03-13T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260313-3",
        "report_id": "rep-20260313-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-03-13T06:30:00Z",
        "end_at": "2026-03-13T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 18,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 324,
        "id": "it-20260313-1",
        "report_id": "rep-20260313-01"
      }
    ]
  },
  {
    "id": "rep-20260312-01",
    "work_date": "2026-03-12",
    "job_site_id": "site-jackson-4th",
    "job_site_name": "Jackson 4th Floor",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-johan",
    "creator_name": "Johan",
    "status": "approved",
    "observations": "Colocación de 14 láminas Acrovyn con juntas selladas.",
    "incident_type": "ninguna",
    "activities_performed": [
      "caulking"
    ],
    "created_at": "2026-03-12T15:00:00Z",
    "updated_at": "2026-03-12T16:00:00Z",
    "crew": [
      {
        "id": "cr-mar-2a",
        "report_id": "rep-20260312-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-03-12T06:30:00.000Z",
        "end_at": "2026-03-12T15:00:00.000Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      },
      {
        "id": "cr-mar-2b",
        "report_id": "rep-20260312-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-03-12T06:30:00.000Z",
        "end_at": "2026-03-12T15:00:00.000Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "id": "it-mar-2a",
        "report_id": "rep-20260312-01",
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 14,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 252
      }
    ]
  },
  {
    "id": "rep-20260311-01",
    "work_date": "2026-03-11",
    "job_site_id": "site-jackson-4th",
    "job_site_name": "Jackson 4th Floor",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson 4th Floor. Hoja consolidada [MAR 14].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-03-11T15:00:00Z",
    "updated_at": "2026-03-11T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260311-1",
        "report_id": "rep-20260311-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-03-11T06:30:00Z",
        "end_at": "2026-03-11T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260311-2",
        "report_id": "rep-20260311-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-03-11T06:30:00Z",
        "end_at": "2026-03-11T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260311-3",
        "report_id": "rep-20260311-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-03-11T06:30:00Z",
        "end_at": "2026-03-11T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-crash-rail-metal",
        "accessory_name": "Crash rail metal",
        "accessory_unit": "ft",
        "quantity": 60,
        "unit": "ft",
        "unit_price_override": 7.5,
        "line_total": 450,
        "id": "it-20260311-1",
        "report_id": "rep-20260311-01"
      },
      {
        "accessory_id": "acc-corner-guard-vinyl",
        "accessory_name": "Esquineros Vinil",
        "accessory_unit": "each",
        "quantity": 12,
        "unit": "each",
        "unit_price_override": 6,
        "line_total": 72,
        "id": "it-20260311-2",
        "report_id": "rep-20260311-01"
      }
    ]
  },
  {
    "id": "rep-20260310-01",
    "work_date": "2026-03-10",
    "job_site_id": "site-jackson-4th",
    "job_site_name": "Jackson 4th Floor",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson 4th Floor. Hoja consolidada [MAR 14].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-03-10T15:00:00Z",
    "updated_at": "2026-03-10T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260310-1",
        "report_id": "rep-20260310-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-03-10T06:30:00Z",
        "end_at": "2026-03-10T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260310-2",
        "report_id": "rep-20260310-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-03-10T06:30:00Z",
        "end_at": "2026-03-10T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260310-3",
        "report_id": "rep-20260310-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-03-10T06:30:00Z",
        "end_at": "2026-03-10T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-grab-bar-36",
        "accessory_name": "Grab bar 36\"",
        "accessory_unit": "each",
        "quantity": 10,
        "unit": "each",
        "unit_price_override": 14,
        "line_total": 140,
        "id": "it-20260310-1",
        "report_id": "rep-20260310-01"
      },
      {
        "accessory_id": "acc-grab-bar-42",
        "accessory_name": "Grab bar 42\"",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 16,
        "line_total": 128,
        "id": "it-20260310-2",
        "report_id": "rep-20260310-01"
      },
      {
        "accessory_id": "acc-mirror",
        "accessory_name": "Espejos",
        "accessory_unit": "each",
        "quantity": 6,
        "unit": "each",
        "unit_price_override": 15,
        "line_total": 90,
        "id": "it-20260310-3",
        "report_id": "rep-20260310-01"
      }
    ]
  },
  {
    "id": "rep-20260309-01",
    "work_date": "2026-03-09",
    "job_site_id": "site-jackson-4th",
    "job_site_name": "Jackson 4th Floor",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson 4th Floor. Hoja consolidada [MAR 14].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-03-09T15:00:00Z",
    "updated_at": "2026-03-09T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260309-1",
        "report_id": "rep-20260309-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-03-09T06:30:00Z",
        "end_at": "2026-03-09T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260309-2",
        "report_id": "rep-20260309-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-03-09T06:30:00Z",
        "end_at": "2026-03-09T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260309-3",
        "report_id": "rep-20260309-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-03-09T06:30:00Z",
        "end_at": "2026-03-09T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 14,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 252,
        "id": "it-20260309-1",
        "report_id": "rep-20260309-01"
      },
      {
        "accessory_id": "acc-fire-cabinet",
        "accessory_name": "Gabinete extintor (FEC)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 25,
        "line_total": 50,
        "id": "it-20260309-2",
        "report_id": "rep-20260309-01"
      },
      {
        "accessory_id": "acc-fire-extinguisher",
        "accessory_name": "Extintor (FE)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 11,
        "line_total": 22,
        "id": "it-20260309-3",
        "report_id": "rep-20260309-01"
      }
    ]
  },
  {
    "id": "rep-20260306-01",
    "work_date": "2026-03-06",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [MAR 07].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-03-06T15:00:00Z",
    "updated_at": "2026-03-06T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260306-1",
        "report_id": "rep-20260306-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-03-06T06:30:00Z",
        "end_at": "2026-03-06T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260306-2",
        "report_id": "rep-20260306-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-03-06T06:30:00Z",
        "end_at": "2026-03-06T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260306-3",
        "report_id": "rep-20260306-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-03-06T06:30:00Z",
        "end_at": "2026-03-06T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 16,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 288,
        "id": "it-20260306-1",
        "report_id": "rep-20260306-01"
      },
      {
        "accessory_id": "acc-corner-guards-ss",
        "accessory_name": "Esquineros SS (Inox)",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 8,
        "line_total": 64,
        "id": "it-20260306-2",
        "report_id": "rep-20260306-01"
      }
    ]
  },
  {
    "id": "rep-20260305-01",
    "work_date": "2026-03-05",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [MAR 07].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-03-05T15:00:00Z",
    "updated_at": "2026-03-05T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260305-1",
        "report_id": "rep-20260305-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-03-05T06:30:00Z",
        "end_at": "2026-03-05T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260305-2",
        "report_id": "rep-20260305-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-03-05T06:30:00Z",
        "end_at": "2026-03-05T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260305-3",
        "report_id": "rep-20260305-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-03-05T06:30:00Z",
        "end_at": "2026-03-05T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-toilet-paper-dispenser",
        "accessory_name": "Dispensador papel higiénico",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260305-1",
        "report_id": "rep-20260305-01"
      },
      {
        "accessory_id": "acc-soap-dispenser",
        "accessory_name": "Dispensador jabón",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260305-2",
        "report_id": "rep-20260305-01"
      }
    ]
  },
  {
    "id": "rep-20260304-01",
    "work_date": "2026-03-04",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [MAR 07].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-03-04T15:00:00Z",
    "updated_at": "2026-03-04T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260304-1",
        "report_id": "rep-20260304-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-03-04T06:30:00Z",
        "end_at": "2026-03-04T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260304-2",
        "report_id": "rep-20260304-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-03-04T06:30:00Z",
        "end_at": "2026-03-04T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260304-3",
        "report_id": "rep-20260304-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-03-04T06:30:00Z",
        "end_at": "2026-03-04T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 18,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 324,
        "id": "it-20260304-1",
        "report_id": "rep-20260304-01"
      }
    ]
  },
  {
    "id": "rep-20260303-01",
    "work_date": "2026-03-03",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Dispensadores de papel y accesorios de baño en pasillo médico.",
    "incident_type": "ninguna",
    "activities_performed": [
      "limpieza"
    ],
    "created_at": "2026-03-03T15:15:00Z",
    "updated_at": "2026-03-03T16:00:00Z",
    "crew": [
      {
        "id": "cr-mar-1a",
        "report_id": "rep-20260303-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-03-03T06:30:00.000Z",
        "end_at": "2026-03-03T15:00:00.000Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-mar-1b",
        "report_id": "rep-20260303-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-03-03T06:30:00.000Z",
        "end_at": "2026-03-03T15:00:00.000Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-mar-1c",
        "report_id": "rep-20260303-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-03-03T06:30:00.000Z",
        "end_at": "2026-03-03T15:00:00.000Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "id": "it-mar-1a",
        "report_id": "rep-20260303-01",
        "accessory_id": "acc-toilet-paper-dispenser",
        "accessory_name": "Dispensador papel higiénico",
        "accessory_unit": "each",
        "quantity": 15,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 135
      },
      {
        "id": "it-mar-1b",
        "report_id": "rep-20260303-01",
        "accessory_id": "acc-grab-bar-18",
        "accessory_name": "Grab bar 18\"",
        "accessory_unit": "each",
        "quantity": 10,
        "unit": "each",
        "unit_price_override": 12,
        "line_total": 120
      }
    ]
  },
  {
    "id": "rep-20260302-01",
    "work_date": "2026-03-02",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [MAR 07].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-03-02T15:00:00Z",
    "updated_at": "2026-03-02T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260302-1",
        "report_id": "rep-20260302-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-03-02T06:30:00Z",
        "end_at": "2026-03-02T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260302-2",
        "report_id": "rep-20260302-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-03-02T06:30:00Z",
        "end_at": "2026-03-02T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260302-3",
        "report_id": "rep-20260302-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-03-02T06:30:00Z",
        "end_at": "2026-03-02T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-crash-rail-metal",
        "accessory_name": "Crash rail metal",
        "accessory_unit": "ft",
        "quantity": 60,
        "unit": "ft",
        "unit_price_override": 7.5,
        "line_total": 450,
        "id": "it-20260302-1",
        "report_id": "rep-20260302-01"
      },
      {
        "accessory_id": "acc-corner-guard-vinyl",
        "accessory_name": "Esquineros Vinil",
        "accessory_unit": "each",
        "quantity": 12,
        "unit": "each",
        "unit_price_override": 6,
        "line_total": 72,
        "id": "it-20260302-2",
        "report_id": "rep-20260302-01"
      }
    ]
  },
  {
    "id": "rep-20260227-01",
    "work_date": "2026-02-27",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [FEB 28].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-02-27T15:00:00Z",
    "updated_at": "2026-02-27T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260227-1",
        "report_id": "rep-20260227-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-02-27T06:30:00Z",
        "end_at": "2026-02-27T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260227-2",
        "report_id": "rep-20260227-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-02-27T06:30:00Z",
        "end_at": "2026-02-27T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260227-3",
        "report_id": "rep-20260227-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-02-27T06:30:00Z",
        "end_at": "2026-02-27T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-grab-bar-36",
        "accessory_name": "Grab bar 36\"",
        "accessory_unit": "each",
        "quantity": 10,
        "unit": "each",
        "unit_price_override": 14,
        "line_total": 140,
        "id": "it-20260227-1",
        "report_id": "rep-20260227-01"
      },
      {
        "accessory_id": "acc-grab-bar-42",
        "accessory_name": "Grab bar 42\"",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 16,
        "line_total": 128,
        "id": "it-20260227-2",
        "report_id": "rep-20260227-01"
      },
      {
        "accessory_id": "acc-mirror",
        "accessory_name": "Espejos",
        "accessory_unit": "each",
        "quantity": 6,
        "unit": "each",
        "unit_price_override": 15,
        "line_total": 90,
        "id": "it-20260227-3",
        "report_id": "rep-20260227-01"
      }
    ]
  },
  {
    "id": "rep-20260226-01",
    "work_date": "2026-02-26",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [FEB 28].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-02-26T15:00:00Z",
    "updated_at": "2026-02-26T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260226-1",
        "report_id": "rep-20260226-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-02-26T06:30:00Z",
        "end_at": "2026-02-26T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260226-2",
        "report_id": "rep-20260226-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-02-26T06:30:00Z",
        "end_at": "2026-02-26T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260226-3",
        "report_id": "rep-20260226-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-02-26T06:30:00Z",
        "end_at": "2026-02-26T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 14,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 252,
        "id": "it-20260226-1",
        "report_id": "rep-20260226-01"
      },
      {
        "accessory_id": "acc-fire-cabinet",
        "accessory_name": "Gabinete extintor (FEC)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 25,
        "line_total": 50,
        "id": "it-20260226-2",
        "report_id": "rep-20260226-01"
      },
      {
        "accessory_id": "acc-fire-extinguisher",
        "accessory_name": "Extintor (FE)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 11,
        "line_total": 22,
        "id": "it-20260226-3",
        "report_id": "rep-20260226-01"
      }
    ]
  },
  {
    "id": "rep-20260225-01",
    "work_date": "2026-02-25",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [FEB 28].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-02-25T15:00:00Z",
    "updated_at": "2026-02-25T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260225-1",
        "report_id": "rep-20260225-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-02-25T06:30:00Z",
        "end_at": "2026-02-25T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260225-2",
        "report_id": "rep-20260225-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-02-25T06:30:00Z",
        "end_at": "2026-02-25T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260225-3",
        "report_id": "rep-20260225-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-02-25T06:30:00Z",
        "end_at": "2026-02-25T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 16,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 288,
        "id": "it-20260225-1",
        "report_id": "rep-20260225-01"
      },
      {
        "accessory_id": "acc-corner-guards-ss",
        "accessory_name": "Esquineros SS (Inox)",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 8,
        "line_total": 64,
        "id": "it-20260225-2",
        "report_id": "rep-20260225-01"
      }
    ]
  },
  {
    "id": "rep-20260224-01",
    "work_date": "2026-02-24",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [FEB 28].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-02-24T15:00:00Z",
    "updated_at": "2026-02-24T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260224-1",
        "report_id": "rep-20260224-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-02-24T06:30:00Z",
        "end_at": "2026-02-24T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260224-2",
        "report_id": "rep-20260224-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-02-24T06:30:00Z",
        "end_at": "2026-02-24T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260224-3",
        "report_id": "rep-20260224-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-02-24T06:30:00Z",
        "end_at": "2026-02-24T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-toilet-paper-dispenser",
        "accessory_name": "Dispensador papel higiénico",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260224-1",
        "report_id": "rep-20260224-01"
      },
      {
        "accessory_id": "acc-soap-dispenser",
        "accessory_name": "Dispensador jabón",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260224-2",
        "report_id": "rep-20260224-01"
      }
    ]
  },
  {
    "id": "rep-20260223-01",
    "work_date": "2026-02-23",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [FEB 28].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-02-23T15:00:00Z",
    "updated_at": "2026-02-23T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260223-1",
        "report_id": "rep-20260223-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-02-23T06:30:00Z",
        "end_at": "2026-02-23T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260223-2",
        "report_id": "rep-20260223-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-02-23T06:30:00Z",
        "end_at": "2026-02-23T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260223-3",
        "report_id": "rep-20260223-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-02-23T06:30:00Z",
        "end_at": "2026-02-23T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 18,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 324,
        "id": "it-20260223-1",
        "report_id": "rep-20260223-01"
      }
    ]
  },
  {
    "id": "rep-20260220-01",
    "work_date": "2026-02-20",
    "job_site_id": "site-jackson-4th",
    "job_site_name": "Jackson 4th Floor",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson 4th Floor. Hoja consolidada [FEB 21].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-02-20T15:00:00Z",
    "updated_at": "2026-02-20T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260220-1",
        "report_id": "rep-20260220-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-02-20T06:30:00Z",
        "end_at": "2026-02-20T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260220-2",
        "report_id": "rep-20260220-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-02-20T06:30:00Z",
        "end_at": "2026-02-20T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260220-3",
        "report_id": "rep-20260220-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-02-20T06:30:00Z",
        "end_at": "2026-02-20T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-crash-rail-metal",
        "accessory_name": "Crash rail metal",
        "accessory_unit": "ft",
        "quantity": 60,
        "unit": "ft",
        "unit_price_override": 7.5,
        "line_total": 450,
        "id": "it-20260220-1",
        "report_id": "rep-20260220-01"
      },
      {
        "accessory_id": "acc-corner-guard-vinyl",
        "accessory_name": "Esquineros Vinil",
        "accessory_unit": "each",
        "quantity": 12,
        "unit": "each",
        "unit_price_override": 6,
        "line_total": 72,
        "id": "it-20260220-2",
        "report_id": "rep-20260220-01"
      }
    ]
  },
  {
    "id": "rep-20260219-01",
    "work_date": "2026-02-19",
    "job_site_id": "site-jackson-4th",
    "job_site_name": "Jackson 4th Floor",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson 4th Floor. Hoja consolidada [FEB 21].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-02-19T15:00:00Z",
    "updated_at": "2026-02-19T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260219-1",
        "report_id": "rep-20260219-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-02-19T06:30:00Z",
        "end_at": "2026-02-19T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260219-2",
        "report_id": "rep-20260219-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-02-19T06:30:00Z",
        "end_at": "2026-02-19T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260219-3",
        "report_id": "rep-20260219-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-02-19T06:30:00Z",
        "end_at": "2026-02-19T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-grab-bar-36",
        "accessory_name": "Grab bar 36\"",
        "accessory_unit": "each",
        "quantity": 10,
        "unit": "each",
        "unit_price_override": 14,
        "line_total": 140,
        "id": "it-20260219-1",
        "report_id": "rep-20260219-01"
      },
      {
        "accessory_id": "acc-grab-bar-42",
        "accessory_name": "Grab bar 42\"",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 16,
        "line_total": 128,
        "id": "it-20260219-2",
        "report_id": "rep-20260219-01"
      },
      {
        "accessory_id": "acc-mirror",
        "accessory_name": "Espejos",
        "accessory_unit": "each",
        "quantity": 6,
        "unit": "each",
        "unit_price_override": 15,
        "line_total": 90,
        "id": "it-20260219-3",
        "report_id": "rep-20260219-01"
      }
    ]
  },
  {
    "id": "rep-20260218-01",
    "work_date": "2026-02-18",
    "job_site_id": "site-jackson-4th",
    "job_site_name": "Jackson 4th Floor",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Instalación de crash rail metal en pasillo principal del piso 4.",
    "incident_type": "ninguna",
    "activities_performed": [],
    "created_at": "2026-02-18T15:00:00Z",
    "updated_at": "2026-02-18T16:00:00Z",
    "crew": [
      {
        "id": "cr-feb-2a",
        "report_id": "rep-20260218-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-02-18T06:30:00.000Z",
        "end_at": "2026-02-18T15:00:00.000Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-feb-2b",
        "report_id": "rep-20260218-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-02-18T06:30:00.000Z",
        "end_at": "2026-02-18T15:00:00.000Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-feb-2c",
        "report_id": "rep-20260218-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-02-18T06:30:00.000Z",
        "end_at": "2026-02-18T15:00:00.000Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "id": "it-feb-2a",
        "report_id": "rep-20260218-01",
        "accessory_id": "acc-crash-rail-metal",
        "accessory_name": "Crash rail metal",
        "accessory_unit": "ft",
        "quantity": 95,
        "unit": "ft",
        "unit_price_override": 7.5,
        "line_total": 712.5
      }
    ]
  },
  {
    "id": "rep-20260217-01",
    "work_date": "2026-02-17",
    "job_site_id": "site-jackson-4th",
    "job_site_name": "Jackson 4th Floor",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson 4th Floor. Hoja consolidada [FEB 21].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-02-17T15:00:00Z",
    "updated_at": "2026-02-17T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260217-1",
        "report_id": "rep-20260217-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-02-17T06:30:00Z",
        "end_at": "2026-02-17T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260217-2",
        "report_id": "rep-20260217-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-02-17T06:30:00Z",
        "end_at": "2026-02-17T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260217-3",
        "report_id": "rep-20260217-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-02-17T06:30:00Z",
        "end_at": "2026-02-17T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 14,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 252,
        "id": "it-20260217-1",
        "report_id": "rep-20260217-01"
      },
      {
        "accessory_id": "acc-fire-cabinet",
        "accessory_name": "Gabinete extintor (FEC)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 25,
        "line_total": 50,
        "id": "it-20260217-2",
        "report_id": "rep-20260217-01"
      },
      {
        "accessory_id": "acc-fire-extinguisher",
        "accessory_name": "Extintor (FE)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 11,
        "line_total": 22,
        "id": "it-20260217-3",
        "report_id": "rep-20260217-01"
      }
    ]
  },
  {
    "id": "rep-20260216-01",
    "work_date": "2026-02-16",
    "job_site_id": "site-jackson-4th",
    "job_site_name": "Jackson 4th Floor",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson 4th Floor. Hoja consolidada [FEB 21].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-02-16T15:00:00Z",
    "updated_at": "2026-02-16T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260216-1",
        "report_id": "rep-20260216-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-02-16T06:30:00Z",
        "end_at": "2026-02-16T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260216-2",
        "report_id": "rep-20260216-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-02-16T06:30:00Z",
        "end_at": "2026-02-16T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260216-3",
        "report_id": "rep-20260216-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-02-16T06:30:00Z",
        "end_at": "2026-02-16T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 16,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 288,
        "id": "it-20260216-1",
        "report_id": "rep-20260216-01"
      },
      {
        "accessory_id": "acc-corner-guards-ss",
        "accessory_name": "Esquineros SS (Inox)",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 8,
        "line_total": 64,
        "id": "it-20260216-2",
        "report_id": "rep-20260216-01"
      }
    ]
  },
  {
    "id": "rep-20260213-01",
    "work_date": "2026-02-13",
    "job_site_id": "site-jackson-4th",
    "job_site_name": "Jackson 4th Floor",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson 4th Floor. Hoja consolidada [FEB 14].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-02-13T15:00:00Z",
    "updated_at": "2026-02-13T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260213-1",
        "report_id": "rep-20260213-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-02-13T06:30:00Z",
        "end_at": "2026-02-13T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260213-2",
        "report_id": "rep-20260213-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-02-13T06:30:00Z",
        "end_at": "2026-02-13T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260213-3",
        "report_id": "rep-20260213-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-02-13T06:30:00Z",
        "end_at": "2026-02-13T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-toilet-paper-dispenser",
        "accessory_name": "Dispensador papel higiénico",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260213-1",
        "report_id": "rep-20260213-01"
      },
      {
        "accessory_id": "acc-soap-dispenser",
        "accessory_name": "Dispensador jabón",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260213-2",
        "report_id": "rep-20260213-01"
      }
    ]
  },
  {
    "id": "rep-20260212-01",
    "work_date": "2026-02-12",
    "job_site_id": "site-jackson-4th",
    "job_site_name": "Jackson 4th Floor",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson 4th Floor. Hoja consolidada [FEB 14].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-02-12T15:00:00Z",
    "updated_at": "2026-02-12T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260212-1",
        "report_id": "rep-20260212-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-02-12T06:30:00Z",
        "end_at": "2026-02-12T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260212-2",
        "report_id": "rep-20260212-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-02-12T06:30:00Z",
        "end_at": "2026-02-12T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260212-3",
        "report_id": "rep-20260212-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-02-12T06:30:00Z",
        "end_at": "2026-02-12T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 18,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 324,
        "id": "it-20260212-1",
        "report_id": "rep-20260212-01"
      }
    ]
  },
  {
    "id": "rep-20260211-01",
    "work_date": "2026-02-11",
    "job_site_id": "site-jackson-4th",
    "job_site_name": "Jackson 4th Floor",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson 4th Floor. Hoja consolidada [FEB 14].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-02-11T15:00:00Z",
    "updated_at": "2026-02-11T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260211-1",
        "report_id": "rep-20260211-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-02-11T06:30:00Z",
        "end_at": "2026-02-11T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260211-2",
        "report_id": "rep-20260211-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-02-11T06:30:00Z",
        "end_at": "2026-02-11T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260211-3",
        "report_id": "rep-20260211-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-02-11T06:30:00Z",
        "end_at": "2026-02-11T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-crash-rail-metal",
        "accessory_name": "Crash rail metal",
        "accessory_unit": "ft",
        "quantity": 60,
        "unit": "ft",
        "unit_price_override": 7.5,
        "line_total": 450,
        "id": "it-20260211-1",
        "report_id": "rep-20260211-01"
      },
      {
        "accessory_id": "acc-corner-guard-vinyl",
        "accessory_name": "Esquineros Vinil",
        "accessory_unit": "each",
        "quantity": 12,
        "unit": "each",
        "unit_price_override": 6,
        "line_total": 72,
        "id": "it-20260211-2",
        "report_id": "rep-20260211-01"
      }
    ]
  },
  {
    "id": "rep-20260210-01",
    "work_date": "2026-02-10",
    "job_site_id": "site-jackson-4th",
    "job_site_name": "Jackson 4th Floor",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson 4th Floor. Hoja consolidada [FEB 14].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-02-10T15:00:00Z",
    "updated_at": "2026-02-10T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260210-1",
        "report_id": "rep-20260210-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-02-10T06:30:00Z",
        "end_at": "2026-02-10T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260210-2",
        "report_id": "rep-20260210-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-02-10T06:30:00Z",
        "end_at": "2026-02-10T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260210-3",
        "report_id": "rep-20260210-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-02-10T06:30:00Z",
        "end_at": "2026-02-10T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-grab-bar-36",
        "accessory_name": "Grab bar 36\"",
        "accessory_unit": "each",
        "quantity": 10,
        "unit": "each",
        "unit_price_override": 14,
        "line_total": 140,
        "id": "it-20260210-1",
        "report_id": "rep-20260210-01"
      },
      {
        "accessory_id": "acc-grab-bar-42",
        "accessory_name": "Grab bar 42\"",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 16,
        "line_total": 128,
        "id": "it-20260210-2",
        "report_id": "rep-20260210-01"
      },
      {
        "accessory_id": "acc-mirror",
        "accessory_name": "Espejos",
        "accessory_unit": "each",
        "quantity": 6,
        "unit": "each",
        "unit_price_override": 15,
        "line_total": 90,
        "id": "it-20260210-3",
        "report_id": "rep-20260210-01"
      }
    ]
  },
  {
    "id": "rep-20260209-01",
    "work_date": "2026-02-09",
    "job_site_id": "site-jackson-4th",
    "job_site_name": "Jackson 4th Floor",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson 4th Floor. Hoja consolidada [FEB 14].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-02-09T15:00:00Z",
    "updated_at": "2026-02-09T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260209-1",
        "report_id": "rep-20260209-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-02-09T06:30:00Z",
        "end_at": "2026-02-09T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260209-2",
        "report_id": "rep-20260209-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-02-09T06:30:00Z",
        "end_at": "2026-02-09T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260209-3",
        "report_id": "rep-20260209-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-02-09T06:30:00Z",
        "end_at": "2026-02-09T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 14,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 252,
        "id": "it-20260209-1",
        "report_id": "rep-20260209-01"
      },
      {
        "accessory_id": "acc-fire-cabinet",
        "accessory_name": "Gabinete extintor (FEC)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 25,
        "line_total": 50,
        "id": "it-20260209-2",
        "report_id": "rep-20260209-01"
      },
      {
        "accessory_id": "acc-fire-extinguisher",
        "accessory_name": "Extintor (FE)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 11,
        "line_total": 22,
        "id": "it-20260209-3",
        "report_id": "rep-20260209-01"
      }
    ]
  },
  {
    "id": "rep-20260206-01",
    "work_date": "2026-02-06",
    "job_site_id": "site-jackson-4th",
    "job_site_name": "Jackson 4th Floor",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson 4th Floor. Hoja consolidada [FEB 07].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-02-06T15:00:00Z",
    "updated_at": "2026-02-06T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260206-1",
        "report_id": "rep-20260206-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-02-06T06:30:00Z",
        "end_at": "2026-02-06T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260206-2",
        "report_id": "rep-20260206-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-02-06T06:30:00Z",
        "end_at": "2026-02-06T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260206-3",
        "report_id": "rep-20260206-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-02-06T06:30:00Z",
        "end_at": "2026-02-06T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 16,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 288,
        "id": "it-20260206-1",
        "report_id": "rep-20260206-01"
      },
      {
        "accessory_id": "acc-corner-guards-ss",
        "accessory_name": "Esquineros SS (Inox)",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 8,
        "line_total": 64,
        "id": "it-20260206-2",
        "report_id": "rep-20260206-01"
      }
    ]
  },
  {
    "id": "rep-20260205-01",
    "work_date": "2026-02-05",
    "job_site_id": "site-jackson-4th",
    "job_site_name": "Jackson 4th Floor",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson 4th Floor. Hoja consolidada [FEB 07].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-02-05T15:00:00Z",
    "updated_at": "2026-02-05T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260205-1",
        "report_id": "rep-20260205-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-02-05T06:30:00Z",
        "end_at": "2026-02-05T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260205-2",
        "report_id": "rep-20260205-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-02-05T06:30:00Z",
        "end_at": "2026-02-05T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260205-3",
        "report_id": "rep-20260205-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-02-05T06:30:00Z",
        "end_at": "2026-02-05T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-toilet-paper-dispenser",
        "accessory_name": "Dispensador papel higiénico",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260205-1",
        "report_id": "rep-20260205-01"
      },
      {
        "accessory_id": "acc-soap-dispenser",
        "accessory_name": "Dispensador jabón",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260205-2",
        "report_id": "rep-20260205-01"
      }
    ]
  },
  {
    "id": "rep-20260204-01",
    "work_date": "2026-02-04",
    "job_site_id": "site-jackson-4th",
    "job_site_name": "Jackson 4th Floor",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson 4th Floor. Hoja consolidada [FEB 07].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-02-04T15:00:00Z",
    "updated_at": "2026-02-04T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260204-1",
        "report_id": "rep-20260204-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-02-04T06:30:00Z",
        "end_at": "2026-02-04T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260204-2",
        "report_id": "rep-20260204-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-02-04T06:30:00Z",
        "end_at": "2026-02-04T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260204-3",
        "report_id": "rep-20260204-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-02-04T06:30:00Z",
        "end_at": "2026-02-04T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 18,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 324,
        "id": "it-20260204-1",
        "report_id": "rep-20260204-01"
      }
    ]
  },
  {
    "id": "rep-20260203-01",
    "work_date": "2026-02-03",
    "job_site_id": "site-jackson-4th",
    "job_site_name": "Jackson 4th Floor",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson 4th Floor. Hoja consolidada [FEB 07].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-02-03T15:00:00Z",
    "updated_at": "2026-02-03T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260203-1",
        "report_id": "rep-20260203-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-02-03T06:30:00Z",
        "end_at": "2026-02-03T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260203-2",
        "report_id": "rep-20260203-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-02-03T06:30:00Z",
        "end_at": "2026-02-03T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260203-3",
        "report_id": "rep-20260203-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-02-03T06:30:00Z",
        "end_at": "2026-02-03T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-crash-rail-metal",
        "accessory_name": "Crash rail metal",
        "accessory_unit": "ft",
        "quantity": 60,
        "unit": "ft",
        "unit_price_override": 7.5,
        "line_total": 450,
        "id": "it-20260203-1",
        "report_id": "rep-20260203-01"
      },
      {
        "accessory_id": "acc-corner-guard-vinyl",
        "accessory_name": "Esquineros Vinil",
        "accessory_unit": "each",
        "quantity": 12,
        "unit": "each",
        "unit_price_override": 6,
        "line_total": 72,
        "id": "it-20260203-2",
        "report_id": "rep-20260203-01"
      }
    ]
  },
  {
    "id": "rep-20260202-01",
    "work_date": "2026-02-02",
    "job_site_id": "site-jackson-4th",
    "job_site_name": "Jackson 4th Floor",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson 4th Floor. Hoja consolidada [FEB 07].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-02-02T15:00:00Z",
    "updated_at": "2026-02-02T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260202-1",
        "report_id": "rep-20260202-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-02-02T06:30:00Z",
        "end_at": "2026-02-02T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260202-2",
        "report_id": "rep-20260202-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-02-02T06:30:00Z",
        "end_at": "2026-02-02T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260202-3",
        "report_id": "rep-20260202-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-02-02T06:30:00Z",
        "end_at": "2026-02-02T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-grab-bar-36",
        "accessory_name": "Grab bar 36\"",
        "accessory_unit": "each",
        "quantity": 10,
        "unit": "each",
        "unit_price_override": 14,
        "line_total": 140,
        "id": "it-20260202-1",
        "report_id": "rep-20260202-01"
      },
      {
        "accessory_id": "acc-grab-bar-42",
        "accessory_name": "Grab bar 42\"",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 16,
        "line_total": 128,
        "id": "it-20260202-2",
        "report_id": "rep-20260202-01"
      },
      {
        "accessory_id": "acc-mirror",
        "accessory_name": "Espejos",
        "accessory_unit": "each",
        "quantity": 6,
        "unit": "each",
        "unit_price_override": 15,
        "line_total": 90,
        "id": "it-20260202-3",
        "report_id": "rep-20260202-01"
      }
    ]
  },
  {
    "id": "rep-20260130-01",
    "work_date": "2026-01-30",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [JAN 31].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-01-30T15:00:00Z",
    "updated_at": "2026-01-30T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260130-1",
        "report_id": "rep-20260130-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-01-30T06:30:00Z",
        "end_at": "2026-01-30T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260130-2",
        "report_id": "rep-20260130-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-01-30T06:30:00Z",
        "end_at": "2026-01-30T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260130-3",
        "report_id": "rep-20260130-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-01-30T06:30:00Z",
        "end_at": "2026-01-30T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 14,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 252,
        "id": "it-20260130-1",
        "report_id": "rep-20260130-01"
      },
      {
        "accessory_id": "acc-fire-cabinet",
        "accessory_name": "Gabinete extintor (FEC)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 25,
        "line_total": 50,
        "id": "it-20260130-2",
        "report_id": "rep-20260130-01"
      },
      {
        "accessory_id": "acc-fire-extinguisher",
        "accessory_name": "Extintor (FE)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 11,
        "line_total": 22,
        "id": "it-20260130-3",
        "report_id": "rep-20260130-01"
      }
    ]
  },
  {
    "id": "rep-20260129-01",
    "work_date": "2026-01-29",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [JAN 31].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-01-29T15:00:00Z",
    "updated_at": "2026-01-29T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260129-1",
        "report_id": "rep-20260129-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-01-29T06:30:00Z",
        "end_at": "2026-01-29T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260129-2",
        "report_id": "rep-20260129-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-01-29T06:30:00Z",
        "end_at": "2026-01-29T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260129-3",
        "report_id": "rep-20260129-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-01-29T06:30:00Z",
        "end_at": "2026-01-29T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 16,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 288,
        "id": "it-20260129-1",
        "report_id": "rep-20260129-01"
      },
      {
        "accessory_id": "acc-corner-guards-ss",
        "accessory_name": "Esquineros SS (Inox)",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 8,
        "line_total": 64,
        "id": "it-20260129-2",
        "report_id": "rep-20260129-01"
      }
    ]
  },
  {
    "id": "rep-20260128-01",
    "work_date": "2026-01-28",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [JAN 31].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-01-28T15:00:00Z",
    "updated_at": "2026-01-28T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260128-1",
        "report_id": "rep-20260128-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-01-28T06:30:00Z",
        "end_at": "2026-01-28T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260128-2",
        "report_id": "rep-20260128-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-01-28T06:30:00Z",
        "end_at": "2026-01-28T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260128-3",
        "report_id": "rep-20260128-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-01-28T06:30:00Z",
        "end_at": "2026-01-28T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-toilet-paper-dispenser",
        "accessory_name": "Dispensador papel higiénico",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260128-1",
        "report_id": "rep-20260128-01"
      },
      {
        "accessory_id": "acc-soap-dispenser",
        "accessory_name": "Dispensador jabón",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260128-2",
        "report_id": "rep-20260128-01"
      }
    ]
  },
  {
    "id": "rep-20260127-01",
    "work_date": "2026-01-27",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [JAN 31].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-01-27T15:00:00Z",
    "updated_at": "2026-01-27T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260127-1",
        "report_id": "rep-20260127-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-01-27T06:30:00Z",
        "end_at": "2026-01-27T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260127-2",
        "report_id": "rep-20260127-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-01-27T06:30:00Z",
        "end_at": "2026-01-27T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260127-3",
        "report_id": "rep-20260127-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-01-27T06:30:00Z",
        "end_at": "2026-01-27T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 18,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 324,
        "id": "it-20260127-1",
        "report_id": "rep-20260127-01"
      }
    ]
  },
  {
    "id": "rep-20260126-01",
    "work_date": "2026-01-26",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [JAN 31].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-01-26T15:00:00Z",
    "updated_at": "2026-01-26T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260126-1",
        "report_id": "rep-20260126-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-01-26T06:30:00Z",
        "end_at": "2026-01-26T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260126-2",
        "report_id": "rep-20260126-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-01-26T06:30:00Z",
        "end_at": "2026-01-26T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260126-3",
        "report_id": "rep-20260126-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-01-26T06:30:00Z",
        "end_at": "2026-01-26T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-crash-rail-metal",
        "accessory_name": "Crash rail metal",
        "accessory_unit": "ft",
        "quantity": 60,
        "unit": "ft",
        "unit_price_override": 7.5,
        "line_total": 450,
        "id": "it-20260126-1",
        "report_id": "rep-20260126-01"
      },
      {
        "accessory_id": "acc-corner-guard-vinyl",
        "accessory_name": "Esquineros Vinil",
        "accessory_unit": "each",
        "quantity": 12,
        "unit": "each",
        "unit_price_override": 6,
        "line_total": 72,
        "id": "it-20260126-2",
        "report_id": "rep-20260126-01"
      }
    ]
  },
  {
    "id": "rep-20260123-01",
    "work_date": "2026-01-23",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [JAN 24].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-01-23T15:00:00Z",
    "updated_at": "2026-01-23T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260123-1",
        "report_id": "rep-20260123-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-01-23T06:30:00Z",
        "end_at": "2026-01-23T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260123-2",
        "report_id": "rep-20260123-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-01-23T06:30:00Z",
        "end_at": "2026-01-23T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260123-3",
        "report_id": "rep-20260123-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-01-23T06:30:00Z",
        "end_at": "2026-01-23T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-grab-bar-36",
        "accessory_name": "Grab bar 36\"",
        "accessory_unit": "each",
        "quantity": 10,
        "unit": "each",
        "unit_price_override": 14,
        "line_total": 140,
        "id": "it-20260123-1",
        "report_id": "rep-20260123-01"
      },
      {
        "accessory_id": "acc-grab-bar-42",
        "accessory_name": "Grab bar 42\"",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 16,
        "line_total": 128,
        "id": "it-20260123-2",
        "report_id": "rep-20260123-01"
      },
      {
        "accessory_id": "acc-mirror",
        "accessory_name": "Espejos",
        "accessory_unit": "each",
        "quantity": 6,
        "unit": "each",
        "unit_price_override": 15,
        "line_total": 90,
        "id": "it-20260123-3",
        "report_id": "rep-20260123-01"
      }
    ]
  },
  {
    "id": "rep-20260122-01",
    "work_date": "2026-01-22",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [JAN 24].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-01-22T15:00:00Z",
    "updated_at": "2026-01-22T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260122-1",
        "report_id": "rep-20260122-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-01-22T06:30:00Z",
        "end_at": "2026-01-22T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260122-2",
        "report_id": "rep-20260122-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-01-22T06:30:00Z",
        "end_at": "2026-01-22T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260122-3",
        "report_id": "rep-20260122-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-01-22T06:30:00Z",
        "end_at": "2026-01-22T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 14,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 252,
        "id": "it-20260122-1",
        "report_id": "rep-20260122-01"
      },
      {
        "accessory_id": "acc-fire-cabinet",
        "accessory_name": "Gabinete extintor (FEC)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 25,
        "line_total": 50,
        "id": "it-20260122-2",
        "report_id": "rep-20260122-01"
      },
      {
        "accessory_id": "acc-fire-extinguisher",
        "accessory_name": "Extintor (FE)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 11,
        "line_total": 22,
        "id": "it-20260122-3",
        "report_id": "rep-20260122-01"
      }
    ]
  },
  {
    "id": "rep-20260121-01",
    "work_date": "2026-01-21",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [JAN 24].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-01-21T15:00:00Z",
    "updated_at": "2026-01-21T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260121-1",
        "report_id": "rep-20260121-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-01-21T06:30:00Z",
        "end_at": "2026-01-21T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260121-2",
        "report_id": "rep-20260121-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-01-21T06:30:00Z",
        "end_at": "2026-01-21T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260121-3",
        "report_id": "rep-20260121-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-01-21T06:30:00Z",
        "end_at": "2026-01-21T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 16,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 288,
        "id": "it-20260121-1",
        "report_id": "rep-20260121-01"
      },
      {
        "accessory_id": "acc-corner-guards-ss",
        "accessory_name": "Esquineros SS (Inox)",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 8,
        "line_total": 64,
        "id": "it-20260121-2",
        "report_id": "rep-20260121-01"
      }
    ]
  },
  {
    "id": "rep-20260120-01",
    "work_date": "2026-01-20",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [JAN 24].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-01-20T15:00:00Z",
    "updated_at": "2026-01-20T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260120-1",
        "report_id": "rep-20260120-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-01-20T06:30:00Z",
        "end_at": "2026-01-20T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260120-2",
        "report_id": "rep-20260120-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-01-20T06:30:00Z",
        "end_at": "2026-01-20T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260120-3",
        "report_id": "rep-20260120-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-01-20T06:30:00Z",
        "end_at": "2026-01-20T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-toilet-paper-dispenser",
        "accessory_name": "Dispensador papel higiénico",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260120-1",
        "report_id": "rep-20260120-01"
      },
      {
        "accessory_id": "acc-soap-dispenser",
        "accessory_name": "Dispensador jabón",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260120-2",
        "report_id": "rep-20260120-01"
      }
    ]
  },
  {
    "id": "rep-20260119-01",
    "work_date": "2026-01-19",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [JAN 24].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-01-19T15:00:00Z",
    "updated_at": "2026-01-19T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260119-1",
        "report_id": "rep-20260119-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-01-19T06:30:00Z",
        "end_at": "2026-01-19T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260119-2",
        "report_id": "rep-20260119-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-01-19T06:30:00Z",
        "end_at": "2026-01-19T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260119-3",
        "report_id": "rep-20260119-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-01-19T06:30:00Z",
        "end_at": "2026-01-19T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 18,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 324,
        "id": "it-20260119-1",
        "report_id": "rep-20260119-01"
      }
    ]
  },
  {
    "id": "rep-20260117-01",
    "work_date": "2026-01-17",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [JAN 17].",
    "incident_type": "ninguna",
    "activities_performed": [
      "limpieza",
      "organizar material"
    ],
    "created_at": "2026-01-17T15:00:00Z",
    "updated_at": "2026-01-17T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260117-1",
        "report_id": "rep-20260117-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-01-17T06:30:00Z",
        "end_at": "2026-01-17T15:00:00Z",
        "hours": 7,
        "hourly_rate_snapshot": 25,
        "is_weekend": true
      },
      {
        "id": "cr-20260117-2",
        "report_id": "rep-20260117-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-01-17T06:30:00Z",
        "end_at": "2026-01-17T15:00:00Z",
        "hours": 7,
        "hourly_rate_snapshot": 22,
        "is_weekend": true
      },
      {
        "id": "cr-20260117-3",
        "report_id": "rep-20260117-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-01-17T06:30:00Z",
        "end_at": "2026-01-17T15:00:00Z",
        "hours": 7,
        "hourly_rate_snapshot": 30,
        "is_weekend": true
      }
    ],
    "items": [
      {
        "accessory_id": "acc-crash-rail-metal",
        "accessory_name": "Crash rail metal",
        "accessory_unit": "ft",
        "quantity": 60,
        "unit": "ft",
        "unit_price_override": 7.5,
        "line_total": 450,
        "id": "it-20260117-1",
        "report_id": "rep-20260117-01"
      },
      {
        "accessory_id": "acc-corner-guard-vinyl",
        "accessory_name": "Esquineros Vinil",
        "accessory_unit": "each",
        "quantity": 12,
        "unit": "each",
        "unit_price_override": 6,
        "line_total": 72,
        "id": "it-20260117-2",
        "report_id": "rep-20260117-01"
      }
    ]
  },
  {
    "id": "rep-20260116-01",
    "work_date": "2026-01-16",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [JAN 17].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-01-16T15:00:00Z",
    "updated_at": "2026-01-16T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260116-1",
        "report_id": "rep-20260116-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-01-16T06:30:00Z",
        "end_at": "2026-01-16T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260116-2",
        "report_id": "rep-20260116-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-01-16T06:30:00Z",
        "end_at": "2026-01-16T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260116-3",
        "report_id": "rep-20260116-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-01-16T06:30:00Z",
        "end_at": "2026-01-16T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-grab-bar-36",
        "accessory_name": "Grab bar 36\"",
        "accessory_unit": "each",
        "quantity": 10,
        "unit": "each",
        "unit_price_override": 14,
        "line_total": 140,
        "id": "it-20260116-1",
        "report_id": "rep-20260116-01"
      },
      {
        "accessory_id": "acc-grab-bar-42",
        "accessory_name": "Grab bar 42\"",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 16,
        "line_total": 128,
        "id": "it-20260116-2",
        "report_id": "rep-20260116-01"
      },
      {
        "accessory_id": "acc-mirror",
        "accessory_name": "Espejos",
        "accessory_unit": "each",
        "quantity": 6,
        "unit": "each",
        "unit_price_override": 15,
        "line_total": 90,
        "id": "it-20260116-3",
        "report_id": "rep-20260116-01"
      }
    ]
  },
  {
    "id": "rep-20260115-01",
    "work_date": "2026-01-15",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-johan",
    "creator_name": "Johan",
    "status": "approved",
    "observations": "Montaje de barras de apoyo grab bars 36\" y 42\" en habitaciones.",
    "incident_type": "ninguna",
    "activities_performed": [
      "caulking"
    ],
    "created_at": "2026-01-15T15:00:00Z",
    "updated_at": "2026-01-15T15:45:00Z",
    "crew": [
      {
        "id": "cr-jan-2a",
        "report_id": "rep-20260115-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-01-15T06:30:00.000Z",
        "end_at": "2026-01-15T15:00:00.000Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      },
      {
        "id": "cr-jan-2b",
        "report_id": "rep-20260115-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-01-15T06:30:00.000Z",
        "end_at": "2026-01-15T15:00:00.000Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-jan-2c",
        "report_id": "rep-20260115-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-01-15T06:30:00.000Z",
        "end_at": "2026-01-15T15:00:00.000Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "id": "it-jan-2a",
        "report_id": "rep-20260115-01",
        "accessory_id": "acc-grab-bar-36",
        "accessory_name": "Grab bar 36\"",
        "accessory_unit": "each",
        "quantity": 12,
        "unit": "each",
        "unit_price_override": 14,
        "line_total": 168
      },
      {
        "id": "it-jan-2b",
        "report_id": "rep-20260115-01",
        "accessory_id": "acc-grab-bar-42",
        "accessory_name": "Grab bar 42\"",
        "accessory_unit": "each",
        "quantity": 12,
        "unit": "each",
        "unit_price_override": 16,
        "line_total": 192
      }
    ]
  },
  {
    "id": "rep-20260114-01",
    "work_date": "2026-01-14",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [JAN 17].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-01-14T15:00:00Z",
    "updated_at": "2026-01-14T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260114-1",
        "report_id": "rep-20260114-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-01-14T06:30:00Z",
        "end_at": "2026-01-14T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260114-2",
        "report_id": "rep-20260114-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-01-14T06:30:00Z",
        "end_at": "2026-01-14T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260114-3",
        "report_id": "rep-20260114-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-01-14T06:30:00Z",
        "end_at": "2026-01-14T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 14,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 252,
        "id": "it-20260114-1",
        "report_id": "rep-20260114-01"
      },
      {
        "accessory_id": "acc-fire-cabinet",
        "accessory_name": "Gabinete extintor (FEC)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 25,
        "line_total": 50,
        "id": "it-20260114-2",
        "report_id": "rep-20260114-01"
      },
      {
        "accessory_id": "acc-fire-extinguisher",
        "accessory_name": "Extintor (FE)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 11,
        "line_total": 22,
        "id": "it-20260114-3",
        "report_id": "rep-20260114-01"
      }
    ]
  },
  {
    "id": "rep-20260113-01",
    "work_date": "2026-01-13",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [JAN 17].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-01-13T15:00:00Z",
    "updated_at": "2026-01-13T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260113-1",
        "report_id": "rep-20260113-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-01-13T06:30:00Z",
        "end_at": "2026-01-13T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260113-2",
        "report_id": "rep-20260113-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-01-13T06:30:00Z",
        "end_at": "2026-01-13T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260113-3",
        "report_id": "rep-20260113-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-01-13T06:30:00Z",
        "end_at": "2026-01-13T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 16,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 288,
        "id": "it-20260113-1",
        "report_id": "rep-20260113-01"
      },
      {
        "accessory_id": "acc-corner-guards-ss",
        "accessory_name": "Esquineros SS (Inox)",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 8,
        "line_total": 64,
        "id": "it-20260113-2",
        "report_id": "rep-20260113-01"
      }
    ]
  },
  {
    "id": "rep-20260112-01",
    "work_date": "2026-01-12",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [JAN 17].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-01-12T15:00:00Z",
    "updated_at": "2026-01-12T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260112-1",
        "report_id": "rep-20260112-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-01-12T06:30:00Z",
        "end_at": "2026-01-12T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260112-2",
        "report_id": "rep-20260112-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-01-12T06:30:00Z",
        "end_at": "2026-01-12T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260112-3",
        "report_id": "rep-20260112-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-01-12T06:30:00Z",
        "end_at": "2026-01-12T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-toilet-paper-dispenser",
        "accessory_name": "Dispensador papel higiénico",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260112-1",
        "report_id": "rep-20260112-01"
      },
      {
        "accessory_id": "acc-soap-dispenser",
        "accessory_name": "Dispensador jabón",
        "accessory_unit": "each",
        "quantity": 14,
        "unit": "each",
        "unit_price_override": 9,
        "line_total": 126,
        "id": "it-20260112-2",
        "report_id": "rep-20260112-01"
      }
    ]
  },
  {
    "id": "rep-20260110-01",
    "work_date": "2026-01-10",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [JAN 10].",
    "incident_type": "ninguna",
    "activities_performed": [
      "limpieza",
      "organizar material"
    ],
    "created_at": "2026-01-10T15:00:00Z",
    "updated_at": "2026-01-10T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260110-1",
        "report_id": "rep-20260110-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-01-10T06:30:00Z",
        "end_at": "2026-01-10T15:00:00Z",
        "hours": 7,
        "hourly_rate_snapshot": 25,
        "is_weekend": true
      },
      {
        "id": "cr-20260110-2",
        "report_id": "rep-20260110-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-01-10T06:30:00Z",
        "end_at": "2026-01-10T15:00:00Z",
        "hours": 7,
        "hourly_rate_snapshot": 22,
        "is_weekend": true
      },
      {
        "id": "cr-20260110-3",
        "report_id": "rep-20260110-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-01-10T06:30:00Z",
        "end_at": "2026-01-10T15:00:00Z",
        "hours": 7,
        "hourly_rate_snapshot": 30,
        "is_weekend": true
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 18,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 324,
        "id": "it-20260110-1",
        "report_id": "rep-20260110-01"
      }
    ]
  },
  {
    "id": "rep-20260109-01",
    "work_date": "2026-01-09",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [JAN 10].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-01-09T15:00:00Z",
    "updated_at": "2026-01-09T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260109-1",
        "report_id": "rep-20260109-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-01-09T06:30:00Z",
        "end_at": "2026-01-09T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260109-2",
        "report_id": "rep-20260109-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-01-09T06:30:00Z",
        "end_at": "2026-01-09T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260109-3",
        "report_id": "rep-20260109-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-01-09T06:30:00Z",
        "end_at": "2026-01-09T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-crash-rail-metal",
        "accessory_name": "Crash rail metal",
        "accessory_unit": "ft",
        "quantity": 60,
        "unit": "ft",
        "unit_price_override": 7.5,
        "line_total": 450,
        "id": "it-20260109-1",
        "report_id": "rep-20260109-01"
      },
      {
        "accessory_id": "acc-corner-guard-vinyl",
        "accessory_name": "Esquineros Vinil",
        "accessory_unit": "each",
        "quantity": 12,
        "unit": "each",
        "unit_price_override": 6,
        "line_total": 72,
        "id": "it-20260109-2",
        "report_id": "rep-20260109-01"
      }
    ]
  },
  {
    "id": "rep-20260108-01",
    "work_date": "2026-01-08",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Instalación inicial de láminas Acrovyn y entrega de material.",
    "incident_type": "ninguna",
    "activities_performed": [
      "entrega/movilización de material",
      "preparar paredes"
    ],
    "created_at": "2026-01-08T15:10:00Z",
    "updated_at": "2026-01-08T16:00:00Z",
    "crew": [
      {
        "id": "cr-jan-1a",
        "report_id": "rep-20260108-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-01-08T06:30:00.000Z",
        "end_at": "2026-01-08T15:00:00.000Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-jan-1b",
        "report_id": "rep-20260108-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-01-08T06:30:00.000Z",
        "end_at": "2026-01-08T15:00:00.000Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-jan-1c",
        "report_id": "rep-20260108-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-01-08T06:30:00.000Z",
        "end_at": "2026-01-08T15:00:00.000Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "id": "it-jan-1a",
        "report_id": "rep-20260108-01",
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 6,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 108
      }
    ]
  },
  {
    "id": "rep-20260107-01",
    "work_date": "2026-01-07",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [JAN 10].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-01-07T15:00:00Z",
    "updated_at": "2026-01-07T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260107-1",
        "report_id": "rep-20260107-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-01-07T06:30:00Z",
        "end_at": "2026-01-07T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260107-2",
        "report_id": "rep-20260107-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-01-07T06:30:00Z",
        "end_at": "2026-01-07T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260107-3",
        "report_id": "rep-20260107-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-01-07T06:30:00Z",
        "end_at": "2026-01-07T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-grab-bar-36",
        "accessory_name": "Grab bar 36\"",
        "accessory_unit": "each",
        "quantity": 10,
        "unit": "each",
        "unit_price_override": 14,
        "line_total": 140,
        "id": "it-20260107-1",
        "report_id": "rep-20260107-01"
      },
      {
        "accessory_id": "acc-grab-bar-42",
        "accessory_name": "Grab bar 42\"",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 16,
        "line_total": 128,
        "id": "it-20260107-2",
        "report_id": "rep-20260107-01"
      },
      {
        "accessory_id": "acc-mirror",
        "accessory_name": "Espejos",
        "accessory_unit": "each",
        "quantity": 6,
        "unit": "each",
        "unit_price_override": 15,
        "line_total": 90,
        "id": "it-20260107-3",
        "report_id": "rep-20260107-01"
      }
    ]
  },
  {
    "id": "rep-20260106-01",
    "work_date": "2026-01-06",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [JAN 10].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-01-06T15:00:00Z",
    "updated_at": "2026-01-06T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260106-1",
        "report_id": "rep-20260106-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-01-06T06:30:00Z",
        "end_at": "2026-01-06T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260106-2",
        "report_id": "rep-20260106-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-01-06T06:30:00Z",
        "end_at": "2026-01-06T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260106-3",
        "report_id": "rep-20260106-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-01-06T06:30:00Z",
        "end_at": "2026-01-06T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 14,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 252,
        "id": "it-20260106-1",
        "report_id": "rep-20260106-01"
      },
      {
        "accessory_id": "acc-fire-cabinet",
        "accessory_name": "Gabinete extintor (FEC)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 25,
        "line_total": 50,
        "id": "it-20260106-2",
        "report_id": "rep-20260106-01"
      },
      {
        "accessory_id": "acc-fire-extinguisher",
        "accessory_name": "Extintor (FE)",
        "accessory_unit": "each",
        "quantity": 2,
        "unit": "each",
        "unit_price_override": 11,
        "line_total": 22,
        "id": "it-20260106-3",
        "report_id": "rep-20260106-01"
      }
    ]
  },
  {
    "id": "rep-20260105-01",
    "work_date": "2026-01-05",
    "job_site_id": "site-jackson",
    "job_site_name": "Jackson",
    "contractor_id": "cont-lotspeich",
    "contractor_name": "Lotspeich",
    "created_by": "usr-antony",
    "creator_name": "Antony",
    "status": "approved",
    "observations": "Jornada regular de instalación en Jackson. Hoja consolidada [JAN 10].",
    "incident_type": "ninguna",
    "activities_performed": [
      "instalación directa"
    ],
    "created_at": "2026-01-05T15:00:00Z",
    "updated_at": "2026-01-05T15:30:00Z",
    "crew": [
      {
        "id": "cr-20260105-1",
        "report_id": "rep-20260105-01",
        "user_id": "usr-antony",
        "user_name": "Antony",
        "start_at": "2026-01-05T06:30:00Z",
        "end_at": "2026-01-05T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 25,
        "is_weekend": false
      },
      {
        "id": "cr-20260105-2",
        "report_id": "rep-20260105-01",
        "user_id": "usr-abinor",
        "user_name": "Abinor",
        "start_at": "2026-01-05T06:30:00Z",
        "end_at": "2026-01-05T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 22,
        "is_weekend": false
      },
      {
        "id": "cr-20260105-3",
        "report_id": "rep-20260105-01",
        "user_id": "usr-johan",
        "user_name": "Johan",
        "start_at": "2026-01-05T06:30:00Z",
        "end_at": "2026-01-05T15:00:00Z",
        "hours": 8.5,
        "hourly_rate_snapshot": 30,
        "is_weekend": false
      }
    ],
    "items": [
      {
        "accessory_id": "acc-acrovyn-sheet",
        "accessory_name": "Láminas Acrovyn",
        "accessory_unit": "sheet",
        "quantity": 16,
        "unit": "sheet",
        "unit_price_override": 18,
        "line_total": 288,
        "id": "it-20260105-1",
        "report_id": "rep-20260105-01"
      },
      {
        "accessory_id": "acc-corner-guards-ss",
        "accessory_name": "Esquineros SS (Inox)",
        "accessory_unit": "each",
        "quantity": 8,
        "unit": "each",
        "unit_price_override": 8,
        "line_total": 64,
        "id": "it-20260105-2",
        "report_id": "rep-20260105-01"
      }
    ]
  }
];
