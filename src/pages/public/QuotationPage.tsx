import { useMemo, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Printer, 
  Download, 
  User, 
  Phone, 
  MapPin, 
  Zap, 
  Sun, 
  Battery, 
  Activity,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Shield,
  Clock,
  X,
  Workflow
} from 'lucide-react';
import { createQuotationDraft, saveQuotation } from '../../lib/quotations';

// ============================================
// PRICE MASTER DATA - Derived from Excel
// ============================================
interface PriceEntry {
  id: string;
  capacity: string;
  phase: string;
  panelBrand: string;
  inverterType: string;
  battery: string;
  price: number;
}

// Complete price data from Excel - Including Phase
const PRICE_MASTER: PriceEntry[] = [
  // ===== 1 KW Single Phase =====
  { id: '1kw_sp_tata_ongrid_nobat', capacity: '1 KW', phase: 'Single Phase', panelBrand: 'TATA', inverterType: 'Ongrid', battery: 'No Battery', price: 119000 },
  { id: '1kw_sp_adani_ongrid_nobat', capacity: '1 KW', phase: 'Single Phase', panelBrand: 'adani', inverterType: 'Ongrid', battery: 'No Battery', price: 109000 },
  { id: '1kw_sp_waaree_ongrid_nobat', capacity: '1 KW', phase: 'Single Phase', panelBrand: 'Waaree', inverterType: 'Ongrid', battery: 'No Battery', price: 109000 },
  { id: '1kw_sp_luminous_ongrid_nobat', capacity: '1 KW', phase: 'Single Phase', panelBrand: 'Luminous', inverterType: 'Ongrid', battery: 'No Battery', price: 105000 },
  { id: '1kw_sp_surya_ongrid_nobat', capacity: '1 KW', phase: 'Single Phase', panelBrand: 'Surya', inverterType: 'Ongrid', battery: 'No Battery', price: 99000 },
  { id: '1kw_sp_jackson_ongrid_nobat', capacity: '1 KW', phase: 'Single Phase', panelBrand: 'Jackson', inverterType: 'Ongrid', battery: 'No Battery', price: 99000 },
  { id: '1kw_sp_goutam_ongrid_nobat', capacity: '1 KW', phase: 'Single Phase', panelBrand: 'Goutam', inverterType: 'Ongrid', battery: 'No Battery', price: 99000 },
  { id: '1kw_sp_utl_ongrid_nobat', capacity: '1 KW', phase: 'Single Phase', panelBrand: 'UTL', inverterType: 'Ongrid', battery: 'No Battery', price: 99000 },

  // ===== 2 KW Single Phase =====
  { id: '2kw_sp_tata_ongrid_nobat', capacity: '2 KW', phase: 'Single Phase', panelBrand: 'TATA', inverterType: 'Ongrid', battery: 'No Battery', price: 159000 },
  { id: '2kw_sp_adani_ongrid_nobat', capacity: '2 KW', phase: 'Single Phase', panelBrand: 'adani', inverterType: 'Ongrid', battery: 'No Battery', price: 149000 },
  { id: '2kw_sp_waaree_ongrid_nobat', capacity: '2 KW', phase: 'Single Phase', panelBrand: 'Waaree', inverterType: 'Ongrid', battery: 'No Battery', price: 149000 },
  { id: '2kw_sp_luminous_ongrid_nobat', capacity: '2 KW', phase: 'Single Phase', panelBrand: 'Luminous', inverterType: 'Ongrid', battery: 'No Battery', price: 139000 },
  { id: '2kw_sp_surya_ongrid_nobat', capacity: '2 KW', phase: 'Single Phase', panelBrand: 'Surya', inverterType: 'Ongrid', battery: 'No Battery', price: 129000 },
  { id: '2kw_sp_jackson_ongrid_nobat', capacity: '2 KW', phase: 'Single Phase', panelBrand: 'Jackson', inverterType: 'Ongrid', battery: 'No Battery', price: 129000 },
  { id: '2kw_sp_goutam_ongrid_nobat', capacity: '2 KW', phase: 'Single Phase', panelBrand: 'Goutam', inverterType: 'Ongrid', battery: 'No Battery', price: 129000 },
  { id: '2kw_sp_utl_ongrid_nobat', capacity: '2 KW', phase: 'Single Phase', panelBrand: 'UTL', inverterType: 'Ongrid', battery: 'No Battery', price: 129000 },

  // ===== 3 KW Single Phase =====
  { id: '3kw_sp_tata_ongrid_nobat', capacity: '3 KW', phase: 'Single Phase', panelBrand: 'TATA', inverterType: 'Ongrid', battery: 'No Battery', price: 225000 },
  { id: '3kw_sp_adani_ongrid_nobat', capacity: '3 KW', phase: 'Single Phase', panelBrand: 'adani', inverterType: 'Ongrid', battery: 'No Battery', price: 219000 },
  { id: '3kw_sp_waaree_ongrid_nobat', capacity: '3 KW', phase: 'Single Phase', panelBrand: 'Waaree', inverterType: 'Ongrid', battery: 'No Battery', price: 219000 },
  { id: '3kw_sp_luminous_ongrid_nobat', capacity: '3 KW', phase: 'Single Phase', panelBrand: 'Luminous', inverterType: 'Ongrid', battery: 'No Battery', price: 209000 },
  { id: '3kw_sp_surya_ongrid_nobat', capacity: '3 KW', phase: 'Single Phase', panelBrand: 'Surya', inverterType: 'Ongrid', battery: 'No Battery', price: 199000 },
  { id: '3kw_sp_jackson_ongrid_nobat', capacity: '3 KW', phase: 'Single Phase', panelBrand: 'Jackson', inverterType: 'Ongrid', battery: 'No Battery', price: 199000 },
  { id: '3kw_sp_goutam_ongrid_nobat', capacity: '3 KW', phase: 'Single Phase', panelBrand: 'Goutam', inverterType: 'Ongrid', battery: 'No Battery', price: 199000 },
  { id: '3kw_sp_utl_ongrid_nobat', capacity: '3 KW', phase: 'Single Phase', panelBrand: 'UTL', inverterType: 'Ongrid', battery: 'No Battery', price: 199000 },
  // Hybrid Without Battery
  { id: '3kw_sp_tata_hybrid_withoutbat', capacity: '3 KW', phase: 'Single Phase', panelBrand: 'TATA', inverterType: 'Hybrid', battery: 'Without Battery', price: 269000 },
  { id: '3kw_sp_adani_hybrid_withoutbat', capacity: '3 KW', phase: 'Single Phase', panelBrand: 'adani', inverterType: 'Hybrid', battery: 'Without Battery', price: 259000 },
  { id: '3kw_sp_waaree_hybrid_withoutbat', capacity: '3 KW', phase: 'Single Phase', panelBrand: 'Waaree', inverterType: 'Hybrid', battery: 'Without Battery', price: 259000 },
  { id: '3kw_sp_luminous_hybrid_withoutbat', capacity: '3 KW', phase: 'Single Phase', panelBrand: 'Luminous', inverterType: 'Hybrid', battery: 'Without Battery', price: 249000 },
  { id: '3kw_sp_surya_hybrid_withoutbat', capacity: '3 KW', phase: 'Single Phase', panelBrand: 'Surya', inverterType: 'Hybrid', battery: 'Without Battery', price: 239000 },
  { id: '3kw_sp_jackson_hybrid_withoutbat', capacity: '3 KW', phase: 'Single Phase', panelBrand: 'Jackson', inverterType: 'Hybrid', battery: 'Without Battery', price: 239000 },
  { id: '3kw_sp_goutam_hybrid_withoutbat', capacity: '3 KW', phase: 'Single Phase', panelBrand: 'Goutam', inverterType: 'Hybrid', battery: 'Without Battery', price: 239000 },
  { id: '3kw_sp_utl_hybrid_withoutbat', capacity: '3 KW', phase: 'Single Phase', panelBrand: 'UTL', inverterType: 'Hybrid', battery: 'Without Battery', price: 239000 },
  // Hybrid 2 Nos
  { id: '3kw_sp_tata_hybrid_2nos', capacity: '3 KW', phase: 'Single Phase', panelBrand: 'TATA', inverterType: 'Hybrid', battery: '2 Nos', price: 309000 },
  { id: '3kw_sp_adani_hybrid_2nos', capacity: '3 KW', phase: 'Single Phase', panelBrand: 'adani', inverterType: 'Hybrid', battery: '2 Nos', price: 299000 },
  { id: '3kw_sp_waaree_hybrid_2nos', capacity: '3 KW', phase: 'Single Phase', panelBrand: 'Waaree', inverterType: 'Hybrid', battery: '2 Nos', price: 299000 },
  { id: '3kw_sp_luminous_hybrid_2nos', capacity: '3 KW', phase: 'Single Phase', panelBrand: 'Luminous', inverterType: 'Hybrid', battery: '2 Nos', price: 289000 },
  { id: '3kw_sp_surya_hybrid_2nos', capacity: '3 KW', phase: 'Single Phase', panelBrand: 'Surya', inverterType: 'Hybrid', battery: '2 Nos', price: 279000 },
  { id: '3kw_sp_jackson_hybrid_2nos', capacity: '3 KW', phase: 'Single Phase', panelBrand: 'Jackson', inverterType: 'Hybrid', battery: '2 Nos', price: 279000 },
  { id: '3kw_sp_goutam_hybrid_2nos', capacity: '3 KW', phase: 'Single Phase', panelBrand: 'Goutam', inverterType: 'Hybrid', battery: '2 Nos', price: 279000 },
  { id: '3kw_sp_utl_hybrid_2nos', capacity: '3 KW', phase: 'Single Phase', panelBrand: 'UTL', inverterType: 'Hybrid', battery: '2 Nos', price: 279000 },

  // ===== 5 KW Single Phase =====
  { id: '5kw_sp_tata_ongrid_nobat', capacity: '5 KW', phase: 'Single Phase', panelBrand: 'TATA', inverterType: 'Ongrid', battery: 'No Battery', price: 319000 },
  { id: '5kw_sp_adani_ongrid_nobat', capacity: '5 KW', phase: 'Single Phase', panelBrand: 'adani', inverterType: 'Ongrid', battery: 'No Battery', price: 279000 },
  { id: '5kw_sp_waaree_ongrid_nobat', capacity: '5 KW', phase: 'Single Phase', panelBrand: 'Waaree', inverterType: 'Ongrid', battery: 'No Battery', price: 279000 },
  { id: '5kw_sp_luminous_ongrid_nobat', capacity: '5 KW', phase: 'Single Phase', panelBrand: 'Luminous', inverterType: 'Ongrid', battery: 'No Battery', price: 269000 },
  { id: '5kw_sp_surya_ongrid_nobat', capacity: '5 KW', phase: 'Single Phase', panelBrand: 'Surya', inverterType: 'Ongrid', battery: 'No Battery', price: 249000 },
  { id: '5kw_sp_jackson_ongrid_nobat', capacity: '5 KW', phase: 'Single Phase', panelBrand: 'Jackson', inverterType: 'Ongrid', battery: 'No Battery', price: 249000 },
  { id: '5kw_sp_goutam_ongrid_nobat', capacity: '5 KW', phase: 'Single Phase', panelBrand: 'Goutam', inverterType: 'Ongrid', battery: 'No Battery', price: 249000 },
  { id: '5kw_sp_utl_ongrid_nobat', capacity: '5 KW', phase: 'Single Phase', panelBrand: 'UTL', inverterType: 'Ongrid', battery: 'No Battery', price: 249000 },
  // Hybrid Without Battery
  { id: '5kw_sp_tata_hybrid_withoutbat', capacity: '5 KW', phase: 'Single Phase', panelBrand: 'TATA', inverterType: 'Hybrid', battery: 'Without Battery', price: 369000 },
  { id: '5kw_sp_adani_hybrid_withoutbat', capacity: '5 KW', phase: 'Single Phase', panelBrand: 'adani', inverterType: 'Hybrid', battery: 'Without Battery', price: 329000 },
  { id: '5kw_sp_waaree_hybrid_withoutbat', capacity: '5 KW', phase: 'Single Phase', panelBrand: 'Waaree', inverterType: 'Hybrid', battery: 'Without Battery', price: 329000 },
  { id: '5kw_sp_luminous_hybrid_withoutbat', capacity: '5 KW', phase: 'Single Phase', panelBrand: 'Luminous', inverterType: 'Hybrid', battery: 'Without Battery', price: 319000 },
  { id: '5kw_sp_surya_hybrid_withoutbat', capacity: '5 KW', phase: 'Single Phase', panelBrand: 'Surya', inverterType: 'Hybrid', battery: 'Without Battery', price: 299000 },
  { id: '5kw_sp_jackson_hybrid_withoutbat', capacity: '5 KW', phase: 'Single Phase', panelBrand: 'Jackson', inverterType: 'Hybrid', battery: 'Without Battery', price: 299000 },
  { id: '5kw_sp_goutam_hybrid_withoutbat', capacity: '5 KW', phase: 'Single Phase', panelBrand: 'Goutam', inverterType: 'Hybrid', battery: 'Without Battery', price: 299000 },
  { id: '5kw_sp_utl_hybrid_withoutbat', capacity: '5 KW', phase: 'Single Phase', panelBrand: 'UTL', inverterType: 'Hybrid', battery: 'Without Battery', price: 299000 },
  // Hybrid 2 Nos
  { id: '5kw_sp_tata_hybrid_2nos', capacity: '5 KW', phase: 'Single Phase', panelBrand: 'TATA', inverterType: 'Hybrid', battery: '2 Nos', price: 409000 },
  { id: '5kw_sp_adani_hybrid_2nos', capacity: '5 KW', phase: 'Single Phase', panelBrand: 'adani', inverterType: 'Hybrid', battery: '2 Nos', price: 369000 },
  { id: '5kw_sp_waaree_hybrid_2nos', capacity: '5 KW', phase: 'Single Phase', panelBrand: 'Waaree', inverterType: 'Hybrid', battery: '2 Nos', price: 369000 },
  { id: '5kw_sp_luminous_hybrid_2nos', capacity: '5 KW', phase: 'Single Phase', panelBrand: 'Luminous', inverterType: 'Hybrid', battery: '2 Nos', price: 359000 },
  { id: '5kw_sp_surya_hybrid_2nos', capacity: '5 KW', phase: 'Single Phase', panelBrand: 'Surya', inverterType: 'Hybrid', battery: '2 Nos', price: 339000 },
  { id: '5kw_sp_jackson_hybrid_2nos', capacity: '5 KW', phase: 'Single Phase', panelBrand: 'Jackson', inverterType: 'Hybrid', battery: '2 Nos', price: 339000 },
  { id: '5kw_sp_goutam_hybrid_2nos', capacity: '5 KW', phase: 'Single Phase', panelBrand: 'Goutam', inverterType: 'Hybrid', battery: '2 Nos', price: 339000 },
  { id: '5kw_sp_utl_hybrid_2nos', capacity: '5 KW', phase: 'Single Phase', panelBrand: 'UTL', inverterType: 'Hybrid', battery: '2 Nos', price: 339000 },

  // ===== 10 KW Single Phase =====
  { id: '10kw_sp_tata_ongrid_nobat', capacity: '10 KW', phase: 'Single Phase', panelBrand: 'TATA', inverterType: 'Ongrid', battery: 'No Battery', price: 519000 },
  { id: '10kw_sp_adani_ongrid_nobat', capacity: '10 KW', phase: 'Single Phase', panelBrand: 'adani', inverterType: 'Ongrid', battery: 'No Battery', price: 479000 },
  { id: '10kw_sp_waaree_ongrid_nobat', capacity: '10 KW', phase: 'Single Phase', panelBrand: 'Waaree', inverterType: 'Ongrid', battery: 'No Battery', price: 479000 },
  { id: '10kw_sp_luminous_ongrid_nobat', capacity: '10 KW', phase: 'Single Phase', panelBrand: 'Luminous', inverterType: 'Ongrid', battery: 'No Battery', price: 469000 },
  { id: '10kw_sp_surya_ongrid_nobat', capacity: '10 KW', phase: 'Single Phase', panelBrand: 'Surya', inverterType: 'Ongrid', battery: 'No Battery', price: 449000 },
  { id: '10kw_sp_jackson_ongrid_nobat', capacity: '10 KW', phase: 'Single Phase', panelBrand: 'Jackson', inverterType: 'Ongrid', battery: 'No Battery', price: 449000 },
  { id: '10kw_sp_goutam_ongrid_nobat', capacity: '10 KW', phase: 'Single Phase', panelBrand: 'Goutam', inverterType: 'Ongrid', battery: 'No Battery', price: 449000 },
  { id: '10kw_sp_utl_ongrid_nobat', capacity: '10 KW', phase: 'Single Phase', panelBrand: 'UTL', inverterType: 'Ongrid', battery: 'No Battery', price: 449000 },
  // Hybrid Without Battery
  { id: '10kw_sp_tata_hybrid_withoutbat', capacity: '10 KW', phase: 'Single Phase', panelBrand: 'TATA', inverterType: 'Hybrid', battery: 'Without Battery', price: 669000 },
  { id: '10kw_sp_adani_hybrid_withoutbat', capacity: '10 KW', phase: 'Single Phase', panelBrand: 'adani', inverterType: 'Hybrid', battery: 'Without Battery', price: 629000 },
  { id: '10kw_sp_waaree_hybrid_withoutbat', capacity: '10 KW', phase: 'Single Phase', panelBrand: 'Waaree', inverterType: 'Hybrid', battery: 'Without Battery', price: 629000 },
  { id: '10kw_sp_luminous_hybrid_withoutbat', capacity: '10 KW', phase: 'Single Phase', panelBrand: 'Luminous', inverterType: 'Hybrid', battery: 'Without Battery', price: 619000 },
  { id: '10kw_sp_surya_hybrid_withoutbat', capacity: '10 KW', phase: 'Single Phase', panelBrand: 'Surya', inverterType: 'Hybrid', battery: 'Without Battery', price: 599000 },
  { id: '10kw_sp_jackson_hybrid_withoutbat', capacity: '10 KW', phase: 'Single Phase', panelBrand: 'Jackson', inverterType: 'Hybrid', battery: 'Without Battery', price: 599000 },
  { id: '10kw_sp_goutam_hybrid_withoutbat', capacity: '10 KW', phase: 'Single Phase', panelBrand: 'Goutam', inverterType: 'Hybrid', battery: 'Without Battery', price: 599000 },
  { id: '10kw_sp_utl_hybrid_withoutbat', capacity: '10 KW', phase: 'Single Phase', panelBrand: 'UTL', inverterType: 'Hybrid', battery: 'Without Battery', price: 599000 },
  // Hybrid 4 Nos
  { id: '10kw_sp_tata_hybrid_4nos', capacity: '10 KW', phase: 'Single Phase', panelBrand: 'TATA', inverterType: 'Hybrid', battery: '4 Nos', price: 749000 },
  { id: '10kw_sp_adani_hybrid_4nos', capacity: '10 KW', phase: 'Single Phase', panelBrand: 'adani', inverterType: 'Hybrid', battery: '4 Nos', price: 709000 },
  { id: '10kw_sp_waaree_hybrid_4nos', capacity: '10 KW', phase: 'Single Phase', panelBrand: 'Waaree', inverterType: 'Hybrid', battery: '4 Nos', price: 709000 },
  { id: '10kw_sp_luminous_hybrid_4nos', capacity: '10 KW', phase: 'Single Phase', panelBrand: 'Luminous', inverterType: 'Hybrid', battery: '4 Nos', price: 699000 },
  { id: '10kw_sp_surya_hybrid_4nos', capacity: '10 KW', phase: 'Single Phase', panelBrand: 'Surya', inverterType: 'Hybrid', battery: '4 Nos', price: 679000 },
  { id: '10kw_sp_jackson_hybrid_4nos', capacity: '10 KW', phase: 'Single Phase', panelBrand: 'Jackson', inverterType: 'Hybrid', battery: '4 Nos', price: 679000 },
  { id: '10kw_sp_goutam_hybrid_4nos', capacity: '10 KW', phase: 'Single Phase', panelBrand: 'Goutam', inverterType: 'Hybrid', battery: '4 Nos', price: 679000 },
  { id: '10kw_sp_utl_hybrid_4nos', capacity: '10 KW', phase: 'Single Phase', panelBrand: 'UTL', inverterType: 'Hybrid', battery: '4 Nos', price: 679000 },

  // ===== 3 KW Three Phase =====
  { id: '3kw_tp_tata_ongrid_nobat', capacity: '3 KW', phase: 'Three Phase', panelBrand: 'TATA', inverterType: 'Ongrid', battery: 'No Battery', price: 280000 },
  { id: '3kw_tp_adani_ongrid_nobat', capacity: '3 KW', phase: 'Three Phase', panelBrand: 'adani', inverterType: 'Ongrid', battery: 'No Battery', price: 275000 },
  { id: '3kw_tp_waaree_ongrid_nobat', capacity: '3 KW', phase: 'Three Phase', panelBrand: 'Waaree', inverterType: 'Ongrid', battery: 'No Battery', price: 275000 },
  { id: '3kw_tp_luminous_ongrid_nobat', capacity: '3 KW', phase: 'Three Phase', panelBrand: 'Luminous', inverterType: 'Ongrid', battery: 'No Battery', price: 265000 },
  { id: '3kw_tp_surya_ongrid_nobat', capacity: '3 KW', phase: 'Three Phase', panelBrand: 'Surya', inverterType: 'Ongrid', battery: 'No Battery', price: 265000 },
  { id: '3kw_tp_jackson_ongrid_nobat', capacity: '3 KW', phase: 'Three Phase', panelBrand: 'Jackson', inverterType: 'Ongrid', battery: 'No Battery', price: 265000 },
  { id: '3kw_tp_goutam_ongrid_nobat', capacity: '3 KW', phase: 'Three Phase', panelBrand: 'Goutam', inverterType: 'Ongrid', battery: 'No Battery', price: 265000 },
  { id: '3kw_tp_utl_ongrid_nobat', capacity: '3 KW', phase: 'Three Phase', panelBrand: 'UTL', inverterType: 'Ongrid', battery: 'No Battery', price: 265000 },
  // Hybrid Without Battery
  { id: '3kw_tp_tata_hybrid_withoutbat', capacity: '3 KW', phase: 'Three Phase', panelBrand: 'TATA', inverterType: 'Hybrid', battery: 'Without Battery', price: 349000 },
  { id: '3kw_tp_adani_hybrid_withoutbat', capacity: '3 KW', phase: 'Three Phase', panelBrand: 'adani', inverterType: 'Hybrid', battery: 'Without Battery', price: 329000 },
  { id: '3kw_tp_waaree_hybrid_withoutbat', capacity: '3 KW', phase: 'Three Phase', panelBrand: 'Waaree', inverterType: 'Hybrid', battery: 'Without Battery', price: 329000 },
  { id: '3kw_tp_luminous_hybrid_withoutbat', capacity: '3 KW', phase: 'Three Phase', panelBrand: 'Luminous', inverterType: 'Hybrid', battery: 'Without Battery', price: 319000 },
  { id: '3kw_tp_surya_hybrid_withoutbat', capacity: '3 KW', phase: 'Three Phase', panelBrand: 'Surya', inverterType: 'Hybrid', battery: 'Without Battery', price: 299000 },
  { id: '3kw_tp_jackson_hybrid_withoutbat', capacity: '3 KW', phase: 'Three Phase', panelBrand: 'Jackson', inverterType: 'Hybrid', battery: 'Without Battery', price: 299000 },
  { id: '3kw_tp_goutam_hybrid_withoutbat', capacity: '3 KW', phase: 'Three Phase', panelBrand: 'Goutam', inverterType: 'Hybrid', battery: 'Without Battery', price: 299000 },
  { id: '3kw_tp_utl_hybrid_withoutbat', capacity: '3 KW', phase: 'Three Phase', panelBrand: 'UTL', inverterType: 'Hybrid', battery: 'Without Battery', price: 299000 },
  // Hybrid 4 Nos
  { id: '3kw_tp_tata_hybrid_4nos', capacity: '3 KW', phase: 'Three Phase', panelBrand: 'TATA', inverterType: 'Hybrid', battery: '4 Nos', price: 429000 },
  { id: '3kw_tp_adani_hybrid_4nos', capacity: '3 KW', phase: 'Three Phase', panelBrand: 'adani', inverterType: 'Hybrid', battery: '4 Nos', price: 409000 },
  { id: '3kw_tp_waaree_hybrid_4nos', capacity: '3 KW', phase: 'Three Phase', panelBrand: 'Waaree', inverterType: 'Hybrid', battery: '4 Nos', price: 409000 },
  { id: '3kw_tp_luminous_hybrid_4nos', capacity: '3 KW', phase: 'Three Phase', panelBrand: 'Luminous', inverterType: 'Hybrid', battery: '4 Nos', price: 399000 },
  { id: '3kw_tp_surya_hybrid_4nos', capacity: '3 KW', phase: 'Three Phase', panelBrand: 'Surya', inverterType: 'Hybrid', battery: '4 Nos', price: 379000 },
  { id: '3kw_tp_jackson_hybrid_4nos', capacity: '3 KW', phase: 'Three Phase', panelBrand: 'Jackson', inverterType: 'Hybrid', battery: '4 Nos', price: 379000 },
  { id: '3kw_tp_goutam_hybrid_4nos', capacity: '3 KW', phase: 'Three Phase', panelBrand: 'Goutam', inverterType: 'Hybrid', battery: '4 Nos', price: 379000 },
  { id: '3kw_tp_utl_hybrid_4nos', capacity: '3 KW', phase: 'Three Phase', panelBrand: 'UTL', inverterType: 'Hybrid', battery: '4 Nos', price: 379000 },

  // ===== 5 KW Three Phase =====
  { id: '5kw_tp_tata_ongrid_nobat', capacity: '5 KW', phase: 'Three Phase', panelBrand: 'TATA', inverterType: 'Ongrid', battery: 'No Battery', price: 385000 },
  { id: '5kw_tp_adani_ongrid_nobat', capacity: '5 KW', phase: 'Three Phase', panelBrand: 'adani', inverterType: 'Ongrid', battery: 'No Battery', price: 345000 },
  { id: '5kw_tp_waaree_ongrid_nobat', capacity: '5 KW', phase: 'Three Phase', panelBrand: 'Waaree', inverterType: 'Ongrid', battery: 'No Battery', price: 345000 },
  { id: '5kw_tp_luminous_ongrid_nobat', capacity: '5 KW', phase: 'Three Phase', panelBrand: 'Luminous', inverterType: 'Ongrid', battery: 'No Battery', price: 335000 },
  { id: '5kw_tp_surya_ongrid_nobat', capacity: '5 KW', phase: 'Three Phase', panelBrand: 'Surya', inverterType: 'Ongrid', battery: 'No Battery', price: 315000 },
  { id: '5kw_tp_jackson_ongrid_nobat', capacity: '5 KW', phase: 'Three Phase', panelBrand: 'Jackson', inverterType: 'Ongrid', battery: 'No Battery', price: 315000 },
  { id: '5kw_tp_goutam_ongrid_nobat', capacity: '5 KW', phase: 'Three Phase', panelBrand: 'Goutam', inverterType: 'Ongrid', battery: 'No Battery', price: 315000 },
  { id: '5kw_tp_utl_ongrid_nobat', capacity: '5 KW', phase: 'Three Phase', panelBrand: 'UTL', inverterType: 'Ongrid', battery: 'No Battery', price: 315000 },
  // Hybrid Without Battery
  { id: '5kw_tp_tata_hybrid_withoutbat', capacity: '5 KW', phase: 'Three Phase', panelBrand: 'TATA', inverterType: 'Hybrid', battery: 'Without Battery', price: 479000 },
  { id: '5kw_tp_adani_hybrid_withoutbat', capacity: '5 KW', phase: 'Three Phase', panelBrand: 'adani', inverterType: 'Hybrid', battery: 'Without Battery', price: 459000 },
  { id: '5kw_tp_waaree_hybrid_withoutbat', capacity: '5 KW', phase: 'Three Phase', panelBrand: 'Waaree', inverterType: 'Hybrid', battery: 'Without Battery', price: 459000 },
  { id: '5kw_tp_luminous_hybrid_withoutbat', capacity: '5 KW', phase: 'Three Phase', panelBrand: 'Luminous', inverterType: 'Hybrid', battery: 'Without Battery', price: 439000 },
  { id: '5kw_tp_surya_hybrid_withoutbat', capacity: '5 KW', phase: 'Three Phase', panelBrand: 'Surya', inverterType: 'Hybrid', battery: 'Without Battery', price: 419000 },
  { id: '5kw_tp_jackson_hybrid_withoutbat', capacity: '5 KW', phase: 'Three Phase', panelBrand: 'Jackson', inverterType: 'Hybrid', battery: 'Without Battery', price: 419000 },
  { id: '5kw_tp_goutam_hybrid_withoutbat', capacity: '5 KW', phase: 'Three Phase', panelBrand: 'Goutam', inverterType: 'Hybrid', battery: 'Without Battery', price: 419000 },
  { id: '5kw_tp_utl_hybrid_withoutbat', capacity: '5 KW', phase: 'Three Phase', panelBrand: 'UTL', inverterType: 'Hybrid', battery: 'Without Battery', price: 419000 },
  // Hybrid 4 Nos
  { id: '5kw_tp_tata_hybrid_4nos', capacity: '5 KW', phase: 'Three Phase', panelBrand: 'TATA', inverterType: 'Hybrid', battery: '4 Nos', price: 559000 },
  { id: '5kw_tp_adani_hybrid_4nos', capacity: '5 KW', phase: 'Three Phase', panelBrand: 'adani', inverterType: 'Hybrid', battery: '4 Nos', price: 539000 },
  { id: '5kw_tp_waaree_hybrid_4nos', capacity: '5 KW', phase: 'Three Phase', panelBrand: 'Waaree', inverterType: 'Hybrid', battery: '4 Nos', price: 539000 },
  { id: '5kw_tp_luminous_hybrid_4nos', capacity: '5 KW', phase: 'Three Phase', panelBrand: 'Luminous', inverterType: 'Hybrid', battery: '4 Nos', price: 519000 },
  { id: '5kw_tp_surya_hybrid_4nos', capacity: '5 KW', phase: 'Three Phase', panelBrand: 'Surya', inverterType: 'Hybrid', battery: '4 Nos', price: 499000 },
  { id: '5kw_tp_jackson_hybrid_4nos', capacity: '5 KW', phase: 'Three Phase', panelBrand: 'Jackson', inverterType: 'Hybrid', battery: '4 Nos', price: 499000 },
  { id: '5kw_tp_goutam_hybrid_4nos', capacity: '5 KW', phase: 'Three Phase', panelBrand: 'Goutam', inverterType: 'Hybrid', battery: '4 Nos', price: 499000 },
  { id: '5kw_tp_utl_hybrid_4nos', capacity: '5 KW', phase: 'Three Phase', panelBrand: 'UTL', inverterType: 'Hybrid', battery: '4 Nos', price: 499000 },

  // ===== 10 KW Three Phase =====
  { id: '10kw_tp_tata_ongrid_nobat', capacity: '10 KW', phase: 'Three Phase', panelBrand: 'TATA', inverterType: 'Ongrid', battery: 'No Battery', price: 599000 },
  { id: '10kw_tp_adani_ongrid_nobat', capacity: '10 KW', phase: 'Three Phase', panelBrand: 'adani', inverterType: 'Ongrid', battery: 'No Battery', price: 579000 },
  { id: '10kw_tp_waaree_ongrid_nobat', capacity: '10 KW', phase: 'Three Phase', panelBrand: 'Waaree', inverterType: 'Ongrid', battery: 'No Battery', price: 579000 },
  { id: '10kw_tp_luminous_ongrid_nobat', capacity: '10 KW', phase: 'Three Phase', panelBrand: 'Luminous', inverterType: 'Ongrid', battery: 'No Battery', price: 569000 },
  { id: '10kw_tp_surya_ongrid_nobat', capacity: '10 KW', phase: 'Three Phase', panelBrand: 'Surya', inverterType: 'Ongrid', battery: 'No Battery', price: 549000 },
  { id: '10kw_tp_jackson_ongrid_nobat', capacity: '10 KW', phase: 'Three Phase', panelBrand: 'Jackson', inverterType: 'Ongrid', battery: 'No Battery', price: 549000 },
  { id: '10kw_tp_goutam_ongrid_nobat', capacity: '10 KW', phase: 'Three Phase', panelBrand: 'Goutam', inverterType: 'Ongrid', battery: 'No Battery', price: 549000 },
  { id: '10kw_tp_utl_ongrid_nobat', capacity: '10 KW', phase: 'Three Phase', panelBrand: 'UTL', inverterType: 'Ongrid', battery: 'No Battery', price: 549000 },
  // Hybrid Without Battery
  { id: '10kw_tp_tata_hybrid_withoutbat', capacity: '10 KW', phase: 'Three Phase', panelBrand: 'TATA', inverterType: 'Hybrid', battery: 'Without Battery', price: 919000 },
  { id: '10kw_tp_adani_hybrid_withoutbat', capacity: '10 KW', phase: 'Three Phase', panelBrand: 'adani', inverterType: 'Hybrid', battery: 'Without Battery', price: 879000 },
  { id: '10kw_tp_waaree_hybrid_withoutbat', capacity: '10 KW', phase: 'Three Phase', panelBrand: 'Waaree', inverterType: 'Hybrid', battery: 'Without Battery', price: 879000 },
  { id: '10kw_tp_luminous_hybrid_withoutbat', capacity: '10 KW', phase: 'Three Phase', panelBrand: 'Luminous', inverterType: 'Hybrid', battery: 'Without Battery', price: 869000 },
  { id: '10kw_tp_surya_hybrid_withoutbat', capacity: '10 KW', phase: 'Three Phase', panelBrand: 'Surya', inverterType: 'Hybrid', battery: 'Without Battery', price: 849000 },
  { id: '10kw_tp_jackson_hybrid_withoutbat', capacity: '10 KW', phase: 'Three Phase', panelBrand: 'Jackson', inverterType: 'Hybrid', battery: 'Without Battery', price: 849000 },
  { id: '10kw_tp_goutam_hybrid_withoutbat', capacity: '10 KW', phase: 'Three Phase', panelBrand: 'Goutam', inverterType: 'Hybrid', battery: 'Without Battery', price: 849000 },
  { id: '10kw_tp_utl_hybrid_withoutbat', capacity: '10 KW', phase: 'Three Phase', panelBrand: 'UTL', inverterType: 'Hybrid', battery: 'Without Battery', price: 849000 },
  // Hybrid 8 Nos
  { id: '10kw_tp_tata_hybrid_8nos', capacity: '10 KW', phase: 'Three Phase', panelBrand: 'TATA', inverterType: 'Hybrid', battery: '8 Nos', price: 1079000 },
  { id: '10kw_tp_adani_hybrid_8nos', capacity: '10 KW', phase: 'Three Phase', panelBrand: 'adani', inverterType: 'Hybrid', battery: '8 Nos', price: 1039000 },
  { id: '10kw_tp_waaree_hybrid_8nos', capacity: '10 KW', phase: 'Three Phase', panelBrand: 'Waaree', inverterType: 'Hybrid', battery: '8 Nos', price: 1039000 },
  { id: '10kw_tp_luminous_hybrid_8nos', capacity: '10 KW', phase: 'Three Phase', panelBrand: 'Luminous', inverterType: 'Hybrid', battery: '8 Nos', price: 1029000 },
  { id: '10kw_tp_surya_hybrid_8nos', capacity: '10 KW', phase: 'Three Phase', panelBrand: 'Surya', inverterType: 'Hybrid', battery: '8 Nos', price: 1009000 },
  { id: '10kw_tp_jackson_hybrid_8nos', capacity: '10 KW', phase: 'Three Phase', panelBrand: 'Jackson', inverterType: 'Hybrid', battery: '8 Nos', price: 1009000 },
  { id: '10kw_tp_goutam_hybrid_8nos', capacity: '10 KW', phase: 'Three Phase', panelBrand: 'Goutam', inverterType: 'Hybrid', battery: '8 Nos', price: 1009000 },
  { id: '10kw_tp_utl_hybrid_8nos', capacity: '10 KW', phase: 'Three Phase', panelBrand: 'UTL', inverterType: 'Hybrid', battery: '8 Nos', price: 1009000 },
];

// ============================================
// PRICE LOOKUP FUNCTION - Now includes Phase
// ============================================
function findPrice(
  capacity: string,
  phase: string,
  panelBrand: string,
  inverterType: string,
  battery: string
): { price: number | null; matchType: 'exact' | 'partial' | 'none' } {
  const cleanCapacity = capacity?.trim() || '';
  const cleanPhase = phase?.trim() || '';
  const cleanPanelBrand = panelBrand?.trim() || '';
  const cleanInverterType = inverterType?.trim() || '';
  const cleanBattery = battery?.trim() || '';

  if (!cleanCapacity || !cleanPhase || !cleanPanelBrand || !cleanInverterType) {
    return { price: null, matchType: 'none' };
  }

  // Find exact match with phase
  const exactMatch = PRICE_MASTER.find(
    (entry) =>
      entry.capacity.toLowerCase() === cleanCapacity.toLowerCase() &&
      entry.phase.toLowerCase() === cleanPhase.toLowerCase() &&
      entry.panelBrand.toLowerCase() === cleanPanelBrand.toLowerCase() &&
      entry.inverterType.toLowerCase() === cleanInverterType.toLowerCase() &&
      entry.battery.toLowerCase() === cleanBattery.toLowerCase()
  );

  if (exactMatch) {
    return { price: exactMatch.price, matchType: 'exact' };
  }

  // Try partial match (without battery)
  if (cleanBattery && cleanBattery !== 'No Battery') {
    const partialMatch = PRICE_MASTER.find(
      (entry) =>
        entry.capacity.toLowerCase() === cleanCapacity.toLowerCase() &&
        entry.phase.toLowerCase() === cleanPhase.toLowerCase() &&
        entry.panelBrand.toLowerCase() === cleanPanelBrand.toLowerCase() &&
        entry.inverterType.toLowerCase() === cleanInverterType.toLowerCase() &&
        entry.battery === 'No Battery'
    );
    if (partialMatch) {
      return { price: partialMatch.price, matchType: 'partial' };
    }
  }

  return { price: null, matchType: 'none' };
}

// ============================================
// COMPONENT
// ============================================
const capacityOptions = ['1 KW', '2 KW', '3 KW', '5 KW', '10 KW'];
const phaseOptions = ['Single Phase', 'Three Phase'];
const systemCategories = ['Domestic', 'Agriculture', 'Commercial'] as const;
const panelBrandOptions = ['TATA', 'adani', 'Waaree', 'Luminous', 'Surya', 'Jackson', 'Goutam', 'UTL'];
const inverterTypeOptions = ['Ongrid', 'Hybrid'];
const batteryOptions = ['No Battery', 'Without Battery', '2 Nos', '4 Nos', '8 Nos'];

// Optimized print styles for single page
const printStyles = `
  @page { 
    size: A4; 
    margin: 5mm; 
  }
  @media print {
    * {
      box-sizing: border-box !important;
    }
    html, body {
      margin: 0 !important;
      padding: 0 !important;
      background: white !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      width: 100% !important;
      height: 100% !important;
      overflow: hidden !important;
    }
    .no-print { display: none !important; }
    .print-container {
      display: block !important;
      width: 100% !important;
      max-width: 210mm !important;
      margin: 0 auto !important;
      padding: 0 !important;
    }
    .quotation-print-card {
      box-shadow: none !important;
      border: 1px solid #e5e7eb !important;
      page-break-inside: avoid !important;
      page-break-after: avoid !important;
      page-break-before: avoid !important;
      margin: 0 auto !important;
      padding: 6px 10px !important;
      max-width: 100% !important;
      width: 100% !important;
      overflow: hidden !important;
      max-height: 100vh !important;
    }
    .print-gradient {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    /* Compact styles for single page */
    .quotation-print-card h1 {
      font-size: 16px !important;
      margin: 0 !important;
    }
    .quotation-print-card .text-2xl {
      font-size: 14px !important;
    }
    .quotation-print-card .text-3xl {
      font-size: 18px !important;
    }
    .quotation-print-card .text-xl {
      font-size: 12px !important;
    }
    .quotation-print-card p, 
    .quotation-print-card td, 
    .quotation-print-card th,
    .quotation-print-card span,
    .quotation-print-card .text-sm {
      font-size: 8px !important;
      padding: 1px 4px !important;
      line-height: 1.2 !important;
    }
    .quotation-print-card .text-xs {
      font-size: 7px !important;
    }
    .quotation-print-card .p-4 {
      padding: 2px 4px !important;
    }
    .quotation-print-card .p-5 {
      padding: 2px 4px !important;
    }
    .quotation-print-card .p-6 {
      padding: 2px 4px !important;
    }
    .quotation-print-card .mb-1 {
      margin-bottom: 1px !important;
    }
    .quotation-print-card .mb-2 {
      margin-bottom: 2px !important;
    }
    .quotation-print-card .mb-3 {
      margin-bottom: 2px !important;
    }
    .quotation-print-card .mb-4 {
      margin-bottom: 3px !important;
    }
    .quotation-print-card .mt-1 {
      margin-top: 1px !important;
    }
    .quotation-print-card .mt-2 {
      margin-top: 2px !important;
    }
    .quotation-print-card .mt-3 {
      margin-top: 2px !important;
    }
    .quotation-print-card .mt-4 {
      margin-top: 3px !important;
    }
    .quotation-print-card .gap-1 {
      gap: 1px !important;
    }
    .quotation-print-card .gap-2 {
      gap: 2px !important;
    }
    .quotation-print-card .gap-4 {
      gap: 3px !important;
    }
    .quotation-print-card .gap-6 {
      gap: 3px !important;
    }
    .quotation-print-card .border-b-3 {
      border-bottom-width: 2px !important;
      padding-bottom: 2px !important;
      margin-bottom: 2px !important;
    }
    .quotation-print-card table {
      margin-top: 2px !important;
      margin-bottom: 2px !important;
    }
    .quotation-print-card th,
    .quotation-print-card td {
      padding: 1px 3px !important;
      font-size: 7px !important;
    }
    .quotation-print-card .grid {
      gap: 2px !important;
    }
    .quotation-print-card .rounded-xl {
      border-radius: 4px !important;
    }
    .quotation-print-card .rounded-2xl {
      border-radius: 6px !important;
    }
    /* Prevent page breaks */
    .no-break {
      page-break-inside: avoid !important;
      page-break-after: avoid !important;
      page-break-before: avoid !important;
    }
    /* Force single page */
    .quotation-print-card * {
      max-height: none !important;
    }
    .quotation-print-card {
      max-height: 100% !important;
      min-height: auto !important;
    }
    /* Hide extra pages */
    .print-container {
      max-height: 100vh !important;
      overflow: hidden !important;
    }
    body {
      overflow: hidden !important;
      height: 100vh !important;
    }
  }
`;

export function QuotationPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(createQuotationDraft());
  const [priceMessage, setPriceMessage] = useState<string>('');
  const [isPrinting, setIsPrinting] = useState<boolean>(false);

  // Auto-calculate price when selections change - Now includes Phase
  useEffect(() => {
    const capacity = form.system_capacity || '';
    const phase = form.system_phase || '';
    const panelBrand = form.panel_brand || '';
    const inverterType = form.inverter_type || '';
    const battery = form.battery_requirement || '';

    const { price } = findPrice(capacity, phase, panelBrand, inverterType, battery);

    if (price !== null) {
      const formattedPrice = `₹${price.toLocaleString('en-IN')}`;
      setForm(prev => ({
        ...prev,
        estimated_price: formattedPrice
      }));
      setPriceMessage(`✅ Price: ${formattedPrice}`);
    } else {
      if (capacity && phase && panelBrand && inverterType) {
        setForm(prev => ({
          ...prev,
          estimated_price: 'Wrong Battery Field Selection'
        }));
        setPriceMessage(`❌ Wrong Battery Field Selection. Please select a valid configuration.`);
      } else {
        setForm(prev => ({
          ...prev,
          estimated_price: 'Select configuration to get price'
        }));
        setPriceMessage('Please select capacity, phase, panel brand, and inverter type to get price.');
      }
    }
  }, [form.system_capacity, form.system_phase, form.panel_brand, form.inverter_type, form.battery_requirement]);

  const estimatedPrice = useMemo(() => {
    if (form.estimated_price && form.estimated_price.startsWith('₹')) {
      return form.estimated_price;
    }
    return form.estimated_price || 'Select configuration to get price';
  }, [form.estimated_price]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const priceToSave = form.estimated_price?.startsWith('₹') ? form.estimated_price : 'Wrong Battery Field Selection';
    const quotation = {
      ...form,
      estimated_price: priceToSave,
      status: 'submitted' as const,
      updated_at: new Date().toISOString(),
      created_at: form.created_at || new Date().toISOString(),
    };
    saveQuotation(quotation);
    navigate('/admin/quotations');
  };

  const capacityNum = Number(form.system_capacity?.replace(/[^0-9.]/g, '')) || 3;
  
  const subsidyEligible = form.system_category === 'Domestic';
  const subsidyAmount = subsidyEligible ? 15000 : 0;
  const estimatedSavings = useMemo(() => {
    return `₹${(capacityNum * 8500).toLocaleString('en-IN')}`;
  }, [capacityNum]);

  const handleFieldChange = (field: string, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setTimeout(() => {
        setIsPrinting(false);
      }, 1000);
    }, 300);
  };

  // Quotation Print Component - Compact for single page
  const QuotationPrintContent = () => {
    return (
      <div className="quotation-print-card bg-white rounded-lg p-3 max-w-4xl mx-auto border border-gray-200 no-break">
        <div className="flex justify-between items-start border-b-2 border-green-600 pb-1 mb-1">
          <div>
            <h1 className="text-lg font-extrabold text-green-700">☀️ Green Leaf Energy</h1>
            <p className="text-gray-500 text-xs">Professional Solar Quotation</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Quotation #</p>
            <p className="text-sm font-mono text-gray-700">{form.id?.slice(0, 8) || 'DRAFT'}</p>
            <p className="text-xs text-gray-500 mt-1">Date: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1 mb-1">
          <div>
            <p className="text-xs font-semibold uppercase text-gray-500 tracking-wider">Customer Details</p>
            <p className="font-semibold text-gray-800 text-sm">{form.customer_name || '---'}</p>
            <p className="text-xs text-gray-600">{form.phone || '---'}</p>
            <p className="text-xs text-gray-600">{form.address || '---'}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold uppercase text-gray-500 tracking-wider">Quotation Details</p>
            <p className="text-xs text-gray-600"><span className="font-medium">Category:</span> {form.system_category || '---'}</p>
            <p className="text-xs text-gray-600"><span className="font-medium">Electricity Bill:</span> {form.electricity_bill || '---'}</p>
          </div>
        </div>

        <table className="w-full border-collapse rounded-lg overflow-hidden mb-1 text-xs">
          <thead>
            <tr className="bg-green-50">
              <th className="border border-gray-200 px-1 py-0.5 text-left text-xs font-semibold text-green-800">Component</th>
              <th className="border border-gray-200 px-1 py-0.5 text-left text-xs font-semibold text-green-800">Specification</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-200 px-1 py-0.5 text-xs font-medium text-gray-700">System Capacity</td>
              <td className="border border-gray-200 px-1 py-0.5 text-xs text-gray-600">{form.system_capacity || '---'}</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-200 px-1 py-0.5 text-xs font-medium text-gray-700">Phase</td>
              <td className="border border-gray-200 px-1 py-0.5 text-xs text-gray-600">{form.system_phase || '---'}</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-1 py-0.5 text-xs font-medium text-gray-700">Panel Brand</td>
              <td className="border border-gray-200 px-1 py-0.5 text-xs text-gray-600">{form.panel_brand || '---'}</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-200 px-1 py-0.5 text-xs font-medium text-gray-700">Inverter Type</td>
              <td className="border border-gray-200 px-1 py-0.5 text-xs text-gray-600">{form.inverter_type || '---'}</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-1 py-0.5 text-xs font-medium text-gray-700">Battery Requirement</td>
              <td className="border border-gray-200 px-1 py-0.5 text-xs text-gray-600">{form.battery_requirement || '---'}</td>
            </tr>
          </tbody>
        </table>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-1 border border-green-200 mb-1 print-gradient">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs font-semibold text-green-800">Estimated Price</p>
              {form.notes && <p className="text-xs text-gray-500"><strong>Notes:</strong> {form.notes}</p>}
            </div>
            <p className="text-lg font-bold text-green-700">{estimatedPrice}</p>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-1 border border-blue-200 mb-1 print-gradient">
          <div className="flex justify-between items-center">
            <p className="text-xs font-semibold text-blue-800">Est. Monthly Savings</p>
            <p className="text-base font-bold text-blue-700">{estimatedSavings}</p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-1 flex justify-between text-xs text-gray-400">
          <span>Green Leaf Energy - Powering Tomorrow</span>
          <span>Generated: {new Date().toLocaleString()}</span>
        </div>

        <div className="mt-1 flex justify-center gap-3 text-xs text-gray-500">
          <span>✓ 25-Year Warranty</span>
          <span>✓ Free Consultation</span>
          <span>✓ Expert Installation</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-green-50 to-blue-50 py-12 md:py-20">
      <style>{printStyles}</style>
      
      <div className="hidden print:block print-container" id="print-content">
        <QuotationPrintContent />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10 md:mb-12 text-center no-print">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-100 to-green-100 px-4 py-2 text-sm font-semibold text-green-700 border border-yellow-200">
            <FileText className="h-4 w-4 text-yellow-600" /> Quotation Generator
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            <span className="bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500 bg-clip-text text-transparent">Get a Professional</span>
            <br className="sm:hidden" />
            <span className="text-gray-800"> Solar Quotation</span>
          </h1>
          <p className="mt-3 text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Share your details and we'll prepare a clear, ready-to-review quotation for your solar installation.
          </p>
        </div>

        {priceMessage && (
          <div className={`mb-4 max-w-4xl mx-auto p-3 rounded-xl text-sm font-medium no-print ${
            priceMessage.includes('✅') ? 'bg-green-50 text-green-700 border border-green-200' :
            priceMessage.includes('❌') ? 'bg-red-50 text-red-700 border border-red-200' :
            'bg-yellow-50 text-yellow-700 border border-yellow-200'
          }`}>
            {priceMessage}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] no-print">
          
          <form onSubmit={handleSubmit} className="rounded-3xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm p-6 md:p-8 shadow-2xl hover:shadow-3xl transition-all duration-300">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-yellow-500 to-green-500 rounded-full" />
              <h2 className="text-xl font-bold text-gray-800">Customer Details</h2>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <User className="h-4 w-4 text-green-600" /> Customer Name
                </label>
                <input 
                  value={form.customer_name} 
                  onChange={(e) => handleFieldChange('customer_name', e.target.value)} 
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none focus:border-green-400 focus:shadow-md transition-all duration-300 hover:border-green-300" 
                  placeholder="Enter full name"
                  required 
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-600" /> Phone
                </label>
                <input 
                  value={form.phone} 
                  onChange={(e) => handleFieldChange('phone', e.target.value)} 
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none focus:border-blue-400 focus:shadow-md transition-all duration-300 hover:border-blue-300" 
                  placeholder="Enter phone number"
                  required 
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Activity className="h-4 w-4 text-yellow-600" /> Monthly Electricity Bill (₹)
                </label>
                <input 
                  value={form.electricity_bill} 
                  onChange={(e) => handleFieldChange('electricity_bill', e.target.value)} 
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none focus:border-yellow-400 focus:shadow-md transition-all duration-300 hover:border-yellow-300" 
                  placeholder="Monthly bill amount"
                  required 
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-red-500" /> Address
                </label>
                <input 
                  value={form.address} 
                  onChange={(e) => handleFieldChange('address', e.target.value)} 
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none focus:border-red-400 focus:shadow-md transition-all duration-300 hover:border-red-300" 
                  placeholder="Enter complete address"
                  required 
                />
              </div>
              
              <div className="md:col-span-2 mt-2">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-yellow-500 to-green-500 rounded-full" />
                  <h2 className="text-xl font-bold text-gray-800">System Configuration</h2>
                </div>
              </div>
              
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-500" /> System Capacity
                </label>
                <select 
                  value={form.system_capacity} 
                  onChange={(e) => handleFieldChange('system_capacity', e.target.value)} 
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none focus:border-yellow-400 focus:shadow-md transition-all duration-300 hover:border-yellow-300 bg-white"
                  required
                >
                  <option value="">Select capacity</option>
                  {capacityOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              </div>
              
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Workflow className="h-4 w-4 text-blue-500" /> Phase
                </label>
                <select 
                  value={form.system_phase} 
                  onChange={(e) => handleFieldChange('system_phase', e.target.value)} 
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none focus:border-blue-400 focus:shadow-md transition-all duration-300 hover:border-blue-300 bg-white"
                  required
                >
                  <option value="">Select phase</option>
                  {phaseOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              </div>
              
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-600" /> Solar System Category
                </label>
                <select
                  value={form.system_category}
                  onChange={(e) => handleFieldChange('system_category', e.target.value as typeof systemCategories[number])}
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none focus:border-green-400 focus:shadow-md transition-all duration-300 hover:border-green-300 bg-white"
                  required
                >
                  {systemCategories.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-2">
                <div className="rounded-3xl border-2 border-dashed border-yellow-300 bg-yellow-50/80 p-4">
                  <p className="text-sm font-semibold text-yellow-700">Subsidy status</p>
                  <p className="mt-2 text-base text-gray-700">
                    {subsidyEligible ? 'Domestic systems are eligible for subsidy benefits.' : 'Agriculture and Commercial systems are not eligible for the subsidy benefit.'}
                  </p>
                  {subsidyEligible && (
                    <p className="mt-3 text-lg font-bold text-green-700">Estimated subsidy: ₹{subsidyAmount.toLocaleString('en-IN')}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Sun className="h-4 w-4 text-orange-500" /> Panel Brand
                </label>
                <select 
                  value={form.panel_brand} 
                  onChange={(e) => handleFieldChange('panel_brand', e.target.value)} 
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none focus:border-orange-400 focus:shadow-md transition-all duration-300 hover:border-orange-300 bg-white"
                  required
                >
                  <option value="">Select panel brand</option>
                  {panelBrandOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              </div>
              
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Activity className="h-4 w-4 text-purple-500" /> Inverter Type
                </label>
                <select 
                  value={form.inverter_type} 
                  onChange={(e) => handleFieldChange('inverter_type', e.target.value)} 
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none focus:border-purple-400 focus:shadow-md transition-all duration-300 hover:border-purple-300 bg-white"
                  required
                >
                  <option value="">Select inverter type</option>
                  {inverterTypeOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              </div>
              
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Battery className="h-4 w-4 text-green-600" /> Battery Requirement
                </label>
                <select 
                  value={form.battery_requirement} 
                  onChange={(e) => handleFieldChange('battery_requirement', e.target.value)} 
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none focus:border-green-400 focus:shadow-md transition-all duration-300 hover:border-green-300 bg-white"
                  required
                >
                  <option value="">Select battery</option>
                  {batteryOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="mt-8 w-full bg-gradient-to-r from-yellow-400 via-green-500 to-blue-500 text-white px-8 py-3.5 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3 group"
              disabled={form.estimated_price === 'Wrong Battery Field Selection' || form.estimated_price === 'Select configuration to get price'}
            >
              <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              Generate Quotation
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            {form.estimated_price === 'Wrong Battery Field Selection' && (
              <p className="text-xs text-red-500 mt-2 text-center">Please select a valid battery configuration</p>
            )}
          </form>

          {/* Quotation Preview */}
          <div className="rounded-3xl border-2 border-green-200 bg-gradient-to-br from-green-900 via-teal-900 to-blue-900 p-6 md:p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full -mr-32 -mt-32 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full -ml-32 -mb-32 animate-pulse delay-700" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-yellow-400" />
                  <span className="font-semibold text-yellow-200">Quotation Preview</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-green-300 font-medium">Live Preview</span>
                </div>
              </div>
              
              <div className="mt-5 rounded-2xl bg-white/10 backdrop-blur-sm p-5 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center text-sm font-bold text-gray-900">
                    {form.customer_name ? form.customer_name.charAt(0).toUpperCase() : 'G'}
                  </div>
                  <div>
                    <p className="text-xs text-green-300 font-medium">Customer</p>
                    <h2 className="text-xl md:text-2xl font-bold">{form.customer_name || 'Guest User'}</h2>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
                  <div className="bg-white/5 rounded-lg p-2.5">
                    <p className="text-green-300 text-xs font-medium">Phone</p>
                    <p className="text-white font-semibold">{form.phone || '---'}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2.5">
                    <p className="text-green-300 text-xs font-medium">Bill (₹)</p>
                    <p className="text-white font-semibold">{form.electricity_bill || '---'}</p>
                  </div>
                  <div className="col-span-2 bg-white/5 rounded-lg p-2.5">
                    <p className="text-green-300 text-xs font-medium">Address</p>
                    <p className="text-white font-semibold truncate">{form.address || '---'}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-2.5 text-sm">
                <div className="bg-white/5 rounded-lg p-2.5 border border-white/5">
                  <p className="text-green-300 text-xs font-medium">Capacity</p>
                  <p className="text-white font-bold">{form.system_capacity || '---'}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2.5 border border-white/5">
                  <p className="text-green-300 text-xs font-medium">Phase</p>
                  <p className="text-white font-bold">{form.system_phase || '---'}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2.5 border border-white/5">
                  <p className="text-green-300 text-xs font-medium">Category</p>
                  <p className="text-white font-bold truncate">{form.system_category || '---'}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2.5 border border-white/5">
                  <p className="text-green-300 text-xs font-medium">Panel</p>
                  <p className="text-white font-bold truncate">{form.panel_brand || '---'}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2.5 border border-white/5">
                  <p className="text-green-300 text-xs font-medium">Inverter</p>
                  <p className="text-white font-bold truncate">{form.inverter_type || '---'}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2.5 border border-white/5">
                  <p className="text-green-300 text-xs font-medium">Battery</p>
                  <p className="text-white font-bold truncate">{form.battery_requirement || '---'}</p>
                </div>
              </div>
              
              <div className="mt-5 rounded-2xl bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400 p-4 text-gray-900 shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
                <div className="relative z-10">
                  <p className="text-sm font-medium text-gray-700">Estimated Price</p>
                  <p className="text-3xl md:text-4xl font-bold">{estimatedPrice}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Shield className="h-4 w-4 text-green-700" />
                    <span className="text-xs font-medium text-green-800">Including all taxes & installation</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex items-center gap-4 bg-white/5 rounded-xl p-3 border border-white/10">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-yellow-400" />
                  <span className="text-sm">Est. Monthly Savings:</span>
                </div>
                <span className="text-lg font-bold text-yellow-300">{estimatedSavings}</span>
              </div>
              
              <div className="mt-5 flex flex-wrap gap-3">
                <button 
                  type="button" 
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 px-5 py-2.5 text-sm font-semibold text-white border border-white/20 hover:scale-105"
                >
                  <Printer className="h-4 w-4" /> Print
                </button>
                <button 
                  type="button" 
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 px-5 py-2.5 text-sm font-semibold text-gray-900 shadow-lg hover:scale-105"
                >
                  <Download className="h-4 w-4" /> Save PDF
                </button>
                <button 
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 px-5 py-2.5 text-sm font-semibold text-white border border-white/20"
                >
                  <CheckCircle className="h-4 w-4 text-green-400" /> Share Quote
                </button>
              </div>
              
              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-green-300/70">
                <span>✓ 25-Year Warranty</span>
                <span>✓ Free Consultation</span>
                <span>✓ Expert Installation</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .animate-pulse {
          animation: pulse 3s ease-in-out infinite;
        }
        .delay-700 {
          animation-delay: 700ms;
        }
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            height: 100vh !important;
          }
          .quotation-print-card {
            box-shadow: none !important;
            border: 1px solid #e5e7eb !important;
            page-break-inside: avoid !important;
            page-break-after: avoid !important;
            page-break-before: avoid !important;
          }
          .border-b-2 {
            border-bottom-width: 2px !important;
          }
          .print-container {
            display: block !important;
            padding: 0 !important;
            max-height: 100vh !important;
            overflow: hidden !important;
          }
        }
        .border-b-2 {
          border-bottom-width: 2px;
        }
        .print-container {
          display: none;
        }
      `}</style>

    </div>
  );
}