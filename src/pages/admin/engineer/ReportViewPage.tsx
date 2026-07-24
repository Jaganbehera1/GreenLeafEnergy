import { useParams, useNavigate, Link } from 'react-router-dom';
import { getReport, SiteVisitReport, saveReport } from '../../../lib/engineerReports';
import { getSiteVisitByIdFromFirestore } from '../../../lib/siteVisits';
import { useEffect, useState, useRef } from 'react';
import {
  ArrowLeft,
  Edit,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  User,
  Phone,
  MapPin,
  Sun,
  Zap,
  Battery,
  FileText,
  PenTool,
  Send,
  Shield,
  Calendar,
  Building,
  Gauge,
  Navigation,
  HardHat,
  Home,
  Activity,
  Download,
  Loader2,
  Printer,
  Share2,
  Copy,
  Check,
  Award,
  TrendingUp,
  Globe
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function renderStatusBadge(status: SiteVisitReport['status']) {
  const base = 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300';
  switch (status) {
    case 'approved':
      return (
        <span className={`${base} bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200 shadow-sm shadow-green-200/50`}>
          <CheckCircle className="h-3.5 w-3.5" />
          Approved
        </span>
      );
    case 'rejected':
      return (
        <span className={`${base} bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border border-red-200 shadow-sm shadow-red-200/50`}>
          <XCircle className="h-3.5 w-3.5" />
          Rejected
        </span>
      );
    case 'submitted':
      return (
        <span className={`${base} bg-gradient-to-r from-yellow-50 to-amber-50 text-yellow-700 border border-yellow-200 shadow-sm shadow-yellow-200/50`}>
          <Clock className="h-3.5 w-3.5" />
          Submitted
        </span>
      );
    default:
      return (
        <span className={`${base} bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 border border-gray-200`}>
          <AlertCircle className="h-3.5 w-3.5" />
          Draft
        </span>
      );
  }
}

export function ReportViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState<SiteVisitReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      try {
        const remote = await getSiteVisitByIdFromFirestore(id);
        if (remote) {
          setReport(remote);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Could not load remote report:', err);
      }
      const r = getReport(id);
      if (!r) {
        navigate('/admin/engineer-portal/reports');
        return;
      }
      setReport(r);
      setLoading(false);
    })();
  }, [id, navigate]);

  const handleSubmit = () => {
    if (!report) return;
    const confirmSubmit = window.confirm('Are you sure you want to submit this report?');
    if (!confirmSubmit) return;
    
    const updated: SiteVisitReport = {
      ...report,
      status: 'submitted',
      updated_at: new Date().toISOString(),
    };
    saveReport(updated);
    alert('Report submitted successfully!');
    navigate('/admin/engineer-portal/reports');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;
    
    setDownloading(true);
    try {
      const element = contentRef.current;
      
      // Capture the full content with proper scale
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
        allowTaint: true,
        useCORS: true,
        logging: false,
        height: element.scrollHeight,
        width: element.scrollWidth,
        windowHeight: element.scrollHeight,
        windowWidth: element.scrollWidth,
        onclone: (clonedDoc) => {
          // Ensure all content is visible in the clone
          const clonedElement = clonedDoc.getElementById('report-content');
          if (clonedElement) {
            clonedElement.style.overflow = 'visible';
            clonedElement.style.height = 'auto';
            clonedElement.style.maxHeight = 'none';
          }
        }
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      // Determine how many pages we need
      const pageHeight = pdf.internal.pageSize.getHeight();
      let remainingHeight = pdfHeight;
      let currentPosition = 0;
      
      // Add header to first page
      pdf.setFontSize(22);
      pdf.setTextColor(34, 197, 94);
      pdf.text('Site Visit Report', pdfWidth / 2, 20, { align: 'center' });
      
      pdf.setFontSize(11);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Report ID: ${id}`, pdfWidth / 2, 28, { align: 'center' });
      pdf.text(`Customer: ${report?.customer_name || 'N/A'}`, pdfWidth / 2, 34, { align: 'center' });
      pdf.text(`Generated: ${new Date().toLocaleString()}`, pdfWidth / 2, 40, { align: 'center' });
      
      // Add the captured content starting from position 0
      const contentStartY = 45;
      let page = 1;
      
      while (remainingHeight > 0) {
        const currentPageHeight = Math.min(remainingHeight, pageHeight - contentStartY - 20);
        const imgWidth = pdfWidth;
        const imgHeight = (imgWidth * currentPageHeight) / canvas.width;
        
        // Calculate the source position
        const sourceY = (currentPosition / canvas.height) * canvas.height;
        const sourceHeight = (currentPageHeight / pdfHeight) * canvas.height;
        
        // Add image for this page
        pdf.addImage(
          imgData, 
          'PNG', 
          0, 
          contentStartY, 
          imgWidth, 
          imgHeight,
          undefined,
          'FAST'
        );
        
        // Add footer
        pdf.setFontSize(8);
        pdf.setTextColor(150, 150, 150);
        pdf.text(`Page ${page} of ${Math.ceil(pdfHeight / (pageHeight - contentStartY - 20))}`, pdfWidth / 2, pageHeight - 10, { align: 'center' });
        pdf.text('Generated from GreenLeaf Energy Reports System', pdfWidth / 2, pageHeight - 5, { align: 'center' });
        
        remainingHeight -= currentPageHeight;
        currentPosition += currentPageHeight;
        page++;
        
        if (remainingHeight > 0) {
          pdf.addPage();
        }
      }
      
      pdf.save(`report_${id}_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setShowShareMenu(false);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Site Visit Report - ${report?.customer_name || 'Untitled'}`,
        url: window.location.href,
      });
    }
    setShowShareMenu(false);
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const getStatusConfig = (status: string) => {
    const configs = {
      approved: {
        icon: CheckCircle,
        label: 'Approved',
        color: 'text-green-600',
        bg: 'bg-green-50',
        border: 'border-green-200',
        gradient: 'from-green-400 to-emerald-500',
        badgeGradient: 'from-green-50 to-emerald-50'
      },
      rejected: {
        icon: XCircle,
        label: 'Rejected',
        color: 'text-red-600',
        bg: 'bg-red-50',
        border: 'border-red-200',
        gradient: 'from-red-400 to-rose-500',
        badgeGradient: 'from-red-50 to-rose-50'
      },
      submitted: {
        icon: Clock,
        label: 'Submitted',
        color: 'text-yellow-600',
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        gradient: 'from-yellow-400 to-amber-500',
        badgeGradient: 'from-yellow-50 to-amber-50'
      },
      draft: {
        icon: AlertCircle,
        label: 'Draft',
        color: 'text-gray-600',
        bg: 'bg-gray-50',
        border: 'border-gray-200',
        gradient: 'from-gray-400 to-gray-500',
        badgeGradient: 'from-gray-50 to-gray-100'
      }
    };
    return configs[status as keyof typeof configs] || configs.draft;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50/80 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-green-200 rounded-full animate-spin border-t-green-600"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-gray-500 mt-4 font-medium text-lg">Loading report...</p>
          <p className="text-gray-400 text-sm">Please wait a moment</p>
        </div>
      </div>
    );
  }

  if (!report) return null;

  const statusConfig = getStatusConfig(report.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50/80 py-6 md:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Navigation Bar - Excluded from PDF */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 no-print">
          <Link
            to="/admin/engineer-portal/reports"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 font-medium transition-all duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Reports</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Download as PDF"
            >
              {downloading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download PDF</span>
                  <span className="sm:hidden">PDF</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="p-2.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-300"
              title="Print Report"
            >
              <Printer className="w-5 h-5" />
            </button>

            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="p-2.5 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300"
                title="Share Report"
              >
                <Share2 className="w-5 h-5" />
              </button>

              {showShareMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-10 animate-in slide-in-from-top-2 duration-200">
                  <button
                    onClick={handleCopyLink}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-green-500" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleShare}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share via...</span>
                  </button>
                </div>
              )}
            </div>

            {report.status === 'draft' && (
              <>
                <Link
                  to={`../create`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-semibold hover:from-blue-100 hover:to-indigo-100 hover:shadow-md transition-all duration-300"
                >
                  <Edit className="w-4 h-4" />
                  <span className="hidden sm:inline">Edit</span>
                </Link>
                <button
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md shadow-green-600/20"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Submit</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Main Report Card - This is what gets captured for PDF */}
        <div 
          id="report-content"
          ref={contentRef}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
        >
          {/* Status Bar */}
          <div className={`h-1.5 bg-gradient-to-r ${statusConfig.gradient}`} />

          <div className="p-6 md:p-8 lg:p-10">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 pb-6 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-2xl ${statusConfig.bg} border ${statusConfig.border}`}>
                  <StatusIcon className={`w-6 h-6 ${statusConfig.color}`} />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
                    {report.customer_name || 'Untitled Report'}
                    <span className="text-sm font-normal text-gray-400">#{id?.slice(0, 8) || 'N/A'}</span>
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 mt-1.5">
                    {renderStatusBadge(report.status)}
                    <span className="text-sm text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(report.updated_at)}
                    </span>
                  </div>
                </div>
              </div>

              <div className={`px-4 py-2.5 rounded-xl ${statusConfig.bg} border ${statusConfig.border} flex items-center gap-2`}>
                <StatusIcon className={`w-5 h-5 ${statusConfig.color}`} />
                <span className={`font-semibold ${statusConfig.color}`}>
                  {statusConfig.label}
                </span>
              </div>
            </div>

            {/* Admin Comment */}
            {report.admin_comment && (
              <div className="mt-4 p-4 bg-gradient-to-r from-red-50 to-rose-50 rounded-xl border border-red-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-red-700">Admin Note</p>
                    <p className="text-sm text-red-600">{report.admin_comment}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Details Grid */}
            <div className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Customer Name */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-green-600 uppercase tracking-wider">Customer Name</p>
                      <p className="text-gray-700 font-medium mt-0.5">{report.customer_name || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Phone Number</p>
                      <p className="text-gray-700 font-medium mt-0.5">{report.phone_number || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="md:col-span-2 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider">Address</p>
                      <p className="text-gray-700 font-medium mt-0.5">{report.address || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* GPS Location */}
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-100">
                  <div className="flex items-start gap-3">
                    <Navigation className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">GPS Location</p>
                      <p className="text-gray-700 font-medium mt-0.5 font-mono text-sm">{report.gps_location || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Installation Type */}
                <div className="bg-gradient-to-br from-cyan-50 to-sky-50 rounded-xl p-4 border border-cyan-100">
                  <div className="flex items-start gap-3">
                    <HardHat className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-cyan-600 uppercase tracking-wider">Installation Type</p>
                      <p className="text-gray-700 font-medium mt-0.5">{report.installation_type || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Roof Details */}
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100">
                  <div className="flex items-start gap-3">
                    <Home className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-orange-600 uppercase tracking-wider">Roof Details</p>
                      <p className="text-gray-700 font-medium mt-0.5">{report.roof_type || 'N/A'} / {report.roof_material || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* System Capacity */}
                <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-4 border border-teal-100">
                  <div className="flex items-start gap-3">
                    <Gauge className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider">System Capacity</p>
                      <p className="text-gray-700 font-medium mt-0.5">{report.system_capacity || 'N/A'} kW</p>
                    </div>
                  </div>
                </div>

                {/* Panel Details */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                  <div className="flex items-start gap-3">
                    <Battery className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Panel</p>
                      <p className="text-gray-700 font-medium mt-0.5">{report.panel_brand || 'N/A'} / {report.panel_type || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Inverter Details */}
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-100">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-yellow-600 uppercase tracking-wider">Inverter</p>
                      <p className="text-gray-700 font-medium mt-0.5">{report.inverter_type || 'N/A'} / {report.inverter_brand || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Battery Details */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                  <div className="flex items-start gap-3">
                    <Battery className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider">Battery</p>
                      <p className="text-gray-700 font-medium mt-0.5">{report.battery_type || 'N/A'} / {report.battery_power || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Structure Heights */}
                <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl p-4 border border-slate-200">
                  <div className="flex items-start gap-3">
                    <Building className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Structure Heights</p>
                      <p className="text-gray-700 font-medium mt-0.5">Low: {report.structure_height_low || 'N/A'} | High: {report.structure_height_high || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Distances */}
                <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl p-4 border border-slate-200">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Distances</p>
                      <p className="text-gray-700 font-medium mt-0.5">N/S: {report.north_south_distance || 'N/A'} | E/W: {report.east_west_distance || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Shadow Analysis */}
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-100">
                  <div className="flex items-start gap-3">
                    <Sun className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-yellow-600 uppercase tracking-wider">Shadow Analysis</p>
                      <p className="text-gray-700 font-medium mt-0.5">{report.shadow_analysis || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Electricity Bill */}
                <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-4 border border-red-100">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-red-600 uppercase tracking-wider">Electricity Bill</p>
                      <p className="text-gray-700 font-medium mt-0.5">{report.electricity_bill || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Recommended Capacity */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Recommended Capacity</p>
                      <p className="text-gray-700 font-bold mt-0.5 text-lg">{report.recommended_capacity || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Inverter Recommendation */}
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-100">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Inverter Recommendation</p>
                      <p className="text-gray-700 font-medium mt-0.5">{report.inverter_recommendation || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Panel Recommendation */}
                <div className="bg-gradient-to-br from-cyan-50 to-sky-50 rounded-xl p-4 border border-cyan-100">
                  <div className="flex items-start gap-3">
                    <Battery className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-cyan-600 uppercase tracking-wider">Panel Recommendation</p>
                      <p className="text-gray-700 font-medium mt-0.5">{report.panel_recommendation || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Remarks - Full Width */}
                <div className="md:col-span-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <PenTool className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Remarks</p>
                      <p className="text-gray-700 font-medium mt-0.5">{report.remarks || 'No remarks provided'}</p>
                    </div>
                  </div>
                </div>

                {/* Created At - Full Width */}
                <div className="md:col-span-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Report Details</p>
                      <div className="flex flex-wrap gap-4 mt-0.5">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Created:</span> {formatDate(report.created_at || report.updated_at)}
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Last Updated:</span> {formatDate(report.updated_at)}
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Report ID:</span> <span className="font-mono">{id}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Footer Actions - Excluded from PDF */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4 no-print">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Report #{id?.slice(0, 8) || 'N/A'}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span>Version 1.0</span>
              </div>
              <div className="flex gap-3">
                {report.status === 'draft' && (
                  <>
                    <Link
                      to={`../create`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-gray-300 text-gray-700 hover:border-green-500 hover:text-green-600 hover:bg-green-50 transition-all duration-300 font-medium"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Link>
                    <button
                      onClick={handleSubmit}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-md shadow-green-600/20"
                    >
                      <Send className="w-4 h-4" />
                      Submit Report
                    </button>
                  </>
                )}
                {report.status === 'approved' && (
                  <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 font-semibold border-2 border-green-200">
                    <Award className="w-4 h-4" />
                    Approved
                  </div>
                )}
                {report.status === 'rejected' && (
                  <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-50 to-rose-50 text-red-700 font-semibold border-2 border-red-200">
                    <XCircle className="w-4 h-4" />
                    Rejected
                  </div>
                )}
                {report.status === 'submitted' && (
                  <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-yellow-50 to-amber-50 text-yellow-700 font-semibold border-2 border-yellow-200">
                    <Clock className="w-4 h-4" />
                    Pending Review
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Status Legend - Excluded from PDF */}
        <div className="mt-6 p-4 bg-white rounded-xl shadow-sm border border-gray-100 no-print">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
            <span className="inline-flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-green-400 to-emerald-500"></div>
              Approved
            </span>
            <span className="inline-flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-red-400 to-rose-500"></div>
              Rejected
            </span>
            <span className="inline-flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500"></div>
              Submitted
            </span>
            <span className="inline-flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-gray-400 to-gray-500"></div>
              Draft
            </span>
          </div>
        </div>

      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          #report-content {
            background: white !important;
            box-shadow: none !important;
            border: none !important;
          }
          #report-content .shadow-2xl {
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
}