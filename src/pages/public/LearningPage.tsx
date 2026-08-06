import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  ChevronRight, 
  Sun, 
  Battery, 
  Shield, 
  Zap, 
  Home, 
  Building2, 
  CheckCircle, 
  ArrowRight, 
  Bolt,
  Sparkles,
  Star,
  Award,
  Leaf,
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  FileText,
  Heart,
  Globe,
  Lightbulb,
  Rocket,
  Phone
} from 'lucide-react';

import monocrystallineImg from '../../images/panels/monocrystalline.png';
import polycrystallineImg from '../../images/panels/polycrystalline.webp';
import thinFilmImg from '../../images/panels/thin-film.webp';
import bifacialImg from '../../images/panels/bifacial.webp';
import stringInverterImg from '../../images/inverters/string-inverter.webp';
import microInverterImg from '../../images/inverters/micro-inverter.jpg';
import hybridInverterImg from '../../images/inverters/hybrid-inverter.jpg';
import centralInverterImg from '../../images/inverters/central-inverter.webp';
import onGridRooftopImg from '../../images/On-Grid.gif';
import offGridRooftopImg from '../../images/rooftop/off-grid.gif';
import hybridRooftopImg from '../../images/hybrid-solar-system.gif';

const learningSections = [
  {
    title: 'What is Solar Energy?',
    description: 'Solar energy is electricity generated from sunlight. It is clean, renewable, pollution-free, and helps reduce electricity bills while offering a long-term investment.',
    icon: <Sun className="w-6 h-6" />,
    accent: 'from-yellow-400 to-orange-500',
    points: ['Clean and renewable', 'Lower electricity bills', 'Long-term value'],
  },
  {
    title: 'Why Choose Solar?',
    description: 'Solar energy delivers savings, sustainability, and long-term value for homes and businesses.',
    icon: <CheckCircle className="w-6 h-6" />,
    accent: 'from-green-500 to-emerald-600',
    points: ['Save electricity bills', 'Eco friendly', 'Low maintenance'],
  },
  {
    title: 'Types of Solar Panels',
    description: 'Choose the right panel technology based on efficiency, budget, and roof space.',
    icon: <Zap className="w-6 h-6" />,
    accent: 'from-blue-500 to-cyan-600',
    points: ['Monocrystalline', 'Polycrystalline', 'Thin film', 'Bifacial'],
  },
  {
    title: 'Types of Inverters',
    description: 'Different inverter types suit different rooftops, efficiency needs, and backup requirements.',
    icon: <Battery className="w-6 h-6" />,
    accent: 'from-purple-500 to-violet-600',
    points: ['String', 'Micro', 'Hybrid', 'Central'],
  },
  {
    title: 'On-Grid vs Hybrid',
    description: 'On-grid systems are budget-friendly, while hybrid systems provide backup during power cuts.',
    icon: <Home className="w-6 h-6" />,
    accent: 'from-amber-500 to-yellow-600',
    points: ['Lowest cost', 'Battery backup', 'Works during outages'],
  },
  {
    title: 'Solar System Components',
    description: 'Panels, inverters, batteries, mounting structures, and meters work together to power your home efficiently.',
    icon: <Shield className="w-6 h-6" />,
    accent: 'from-slate-600 to-slate-800',
    points: ['Panels', 'Inverter', 'Battery', 'Net meter'],
  },
];

const panelItems = [
  { name: 'Monocrystalline', desc: 'Highest efficiency, sleek black appearance.', img: monocrystallineImg, accent: 'from-slate-900 to-slate-700', color: 'from-slate-900 to-slate-700' },
  { name: 'Polycrystalline', desc: 'Cost-effective, blue panels for home use.', img: polycrystallineImg, accent: 'from-sky-600 to-cyan-400', color: 'from-sky-600 to-cyan-400' },
  { name: 'Thin Film', desc: 'Flexible and lightweight for special applications.', img: thinFilmImg, accent: 'from-gray-500 to-slate-300', color: 'from-gray-500 to-slate-300' },
  { name: 'Bifacial', desc: 'Generates energy from both panel faces.', img: bifacialImg, accent: 'from-violet-600 to-fuchsia-400', color: 'from-violet-600 to-fuchsia-400' },
];

const inverterItems = [
  { name: 'String Inverter', desc: 'Common, reliable and cost effective.', img: stringInverterImg, accent: 'from-orange-500 to-orange-300', color: 'from-orange-500 to-orange-300' },
  { name: 'Micro Inverter', desc: 'Optimizes each panel independently.', img: microInverterImg, accent: 'from-emerald-500 to-lime-400', color: 'from-emerald-500 to-lime-400' },
  { name: 'Hybrid Inverter', desc: 'Works with batteries for backup power.', img: hybridInverterImg, accent: 'from-purple-500 to-violet-400', color: 'from-purple-500 to-violet-400' },
  { name: 'Central Inverter', desc: 'Best for large commercial installations.', img: centralInverterImg, accent: 'from-rose-500 to-pink-300', color: 'from-rose-500 to-pink-300' },
];

const rooftopModels = [
  { title: 'On-Grid System', image: onGridRooftopImg, label: 'Ideal for homes with reliable power.', color: 'from-emerald-500 to-teal-500' },
  { title: 'Off-Grid System', image: offGridRooftopImg, label: 'Perfect for remote sites and standalone use.', color: 'from-orange-500 to-red-500' },
  { title: 'Hybrid System', image: hybridRooftopImg, label: 'Battery backup plus grid connection.', color: 'from-purple-500 to-pink-500' },
];

const subsidyCards = [
  { title: 'Central Government subsidy', description: 'Support for approved solar systems from the central government.', icon: Award },
  { title: 'State Government subsidy', description: 'Additional incentives and rebates available at the state level.', icon: Building2 },
  { title: 'Loan facility', description: 'Easy financing options to make the investment affordable.', icon: DollarSign },
  { title: 'Insurance', description: 'Optional coverage for equipment and installation.', icon: Shield },
];

const documentList = [
  { name: 'Aadhaar Card', icon: FileText },
  { name: 'PAN Card', icon: FileText },
  { name: 'Electricity Bill', icon: FileText },
  { name: 'Bank Passbook', icon: FileText },
  { name: 'Mobile Number', icon: Phone },
];

const quickFacts = [
  { icon: Sun, label: 'Solar Hours', value: '5-7 hrs/day' },
  { icon: TrendingUp, label: 'Energy Savings', value: '40-60%' },
  { icon: Users, label: 'Happy Customers', value: '500+' },
  { icon: Clock, label: 'Installation Time', value: '3-5 days' },
];

export function LearningPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50/30 to-blue-50/30 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1500" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2500" />
        
        {/* Floating Particles */}
        <div className="absolute top-10 left-10 animate-float">
          <Sparkles className="w-8 h-8 text-purple-400 opacity-30" />
        </div>
        <div className="absolute bottom-10 right-10 animate-float-delayed">
          <Sparkles className="w-8 h-8 text-pink-400 opacity-30" />
        </div>
        <div className="absolute top-1/4 right-20 animate-float">
          <Star className="w-6 h-6 text-yellow-400 opacity-30" />
        </div>
        <div className="absolute bottom-1/4 left-20 animate-float-delayed">
          <Leaf className="w-6 h-6 text-emerald-400 opacity-30" />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 overflow-hidden py-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_0.9fr] items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple-500/20 animate-pulse">
                <BookOpen className="h-5 w-5" />
                <span>🌱 Solar Learning Hub</span>
                <Sparkles className="h-4 w-4" />
              </div>
              
              <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                  Learn solar energy
                </span>
                <br />
                <span className="text-gray-800">with the same rich theme and visuals from</span>
                <br />
                <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                  Green Leaf Energy
                </span>
              </h1>
              
              <p className="max-w-2xl text-lg leading-8 text-gray-600">
                This page now uses bright gradients, premium image cards, and elegant section styling while keeping the content separated from the homepage.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 px-8 py-3.5 text-white font-semibold shadow-xl shadow-purple-500/20 hover:shadow-2xl hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300 group">
                  Book a consultation
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/gallery" className="inline-flex items-center gap-2 rounded-full border-2 border-purple-200 bg-white/50 backdrop-blur-sm px-8 py-3.5 text-gray-700 font-semibold hover:bg-purple-50 hover:border-purple-300 transition-all duration-300">
                  View projects
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Quick Facts */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                {quickFacts.map((fact) => {
                  const Icon = fact.icon;
                  return (
                    <div key={fact.label} className="bg-white/60 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20">
                      <Icon className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                      <p className="text-lg font-bold text-gray-800">{fact.value}</p>
                      <p className="text-xs text-gray-500">{fact.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Rooftop Models */}
            <div className="grid gap-5 sm:grid-cols-2">
              {rooftopModels.map((item) => (
                <div key={item.title} className="group overflow-hidden rounded-3xl border border-white/20 bg-white/60 backdrop-blur-sm p-4 shadow-2xl shadow-purple-500/10 transition hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/20">
                  <div className="relative overflow-hidden rounded-2xl">
                    <img src={item.image} alt={item.title} className="h-44 w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                  </div>
                  <div className="mt-4">
                    <div className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${item.color} text-white`}>
                      {item.title}
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Learning Sections */}
      <section className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 px-4 py-1.5 text-sm text-emerald-700 border border-emerald-500/20">
              <BookOpen className="h-3.5 w-3.5" />
              Solar Education
            </div>
            <h2 className="mt-4 text-4xl font-bold">
              <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                Your solar learning path
              </span>
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
              Detailed sections that explain solar energy, system types, panels, inverters, subsidies, and the documents you need.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {learningSections.map((section) => (
              <div 
                key={section.title} 
                className="group rounded-3xl border border-gray-200 bg-white/80 backdrop-blur-sm p-8 shadow-xl shadow-gray-200/50 transition hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-200/30 hover:border-purple-200"
              >
                <div className={`inline-flex rounded-2xl bg-gradient-to-r ${section.accent} p-3 text-white shadow-md group-hover:scale-110 transition-transform`}>
                  {section.icon}
                </div>
                <h3 className="mt-6 text-2xl font-bold text-gray-800">{section.title}</h3>
                <p className="mt-4 text-base leading-8 text-gray-600">{section.description}</p>
                <ul className="mt-6 space-y-2 text-sm font-medium text-gray-700">
                  {section.points.map((point) => (
                    <li key={point} className="flex items-center gap-3">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <CheckCircle className="w-4 h-4" />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Panels Showcase */}
      <section className="relative z-10 py-16 bg-gradient-to-br from-purple-900/10 via-pink-900/10 to-blue-900/10 backdrop-blur-sm">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-4 py-1.5 text-sm text-purple-700 border border-purple-500/20">
              <Sun className="h-3.5 w-3.5" />
              Panel & Inverter Showcase
            </div>
            <h2 className="mt-4 text-4xl font-bold">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Visual guides for panels and inverters
              </span>
            </h2>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {panelItems.map((panel) => (
              <div key={panel.name} className="group overflow-hidden rounded-3xl border border-white/20 bg-white/60 backdrop-blur-sm p-6 shadow-2xl shadow-purple-500/10 transition hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/20">
                <div className={`inline-flex rounded-2xl bg-gradient-to-r ${panel.color} p-3 text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  <Sun className="h-5 w-5" />
                </div>
                <div className="relative mt-5 overflow-hidden rounded-2xl">
                  <img src={panel.img} alt={panel.name} className="h-56 w-full rounded-2xl object-cover object-center transition-transform duration-500 group-hover:scale-110" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${panel.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-gray-800">{panel.name}</h3>
                <p className="mt-3 text-gray-600">{panel.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inverters Section */}
      <section className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-4 py-1.5 text-sm text-cyan-700 border border-cyan-500/20">
              <Bolt className="h-3.5 w-3.5" />
              Inverter Types
            </div>
            <h2 className="mt-4 text-4xl font-bold">
              <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Which inverter fits your solar setup?
              </span>
            </h2>
          </div>
          
          <div className="grid gap-6 lg:grid-cols-4">
            {inverterItems.map((inverter) => (
              <div key={inverter.name} className="group rounded-3xl border border-gray-200 bg-white/80 backdrop-blur-sm p-5 shadow-xl shadow-gray-200/50 transition hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-200/30 hover:border-cyan-200">
                <div className={`inline-flex rounded-2xl bg-gradient-to-r ${inverter.color} p-3 text-white shadow-md group-hover:scale-110 transition-transform`}>
                  <Bolt className="h-5 w-5" />
                </div>
                <div className="relative mt-5 overflow-hidden rounded-2xl">
                  <img src={inverter.img} alt={inverter.name} className="h-40 w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-gray-800">{inverter.name}</h3>
                <p className="mt-3 text-gray-600">{inverter.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subsidies & Documents */}
      <section className="relative z-10 py-16 bg-gradient-to-br from-emerald-50/50 via-cyan-50/50 to-blue-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Subsidies */}
            <div className="rounded-3xl border border-emerald-200 bg-white/80 backdrop-blur-sm p-8 shadow-xl shadow-emerald-100/50 hover:shadow-2xl hover:shadow-emerald-200/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl shadow-lg shadow-emerald-200">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800">Subsidies & support</h3>
              </div>
              <p className="mt-2 text-lg text-gray-600">Government support can lower your installation cost and speed up payback.</p>
              
              <div className="mt-6 grid gap-4">
                {subsidyCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <div key={card.title} className="group rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-emerald-50/30 p-5 hover:border-emerald-300 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 rounded-xl group-hover:scale-110 transition-transform">
                          <Icon className="h-5 w-5 text-emerald-600" />
                        </div>
                        <h4 className="font-semibold text-gray-800">{card.title}</h4>
                      </div>
                      <p className="mt-2 text-gray-600 ml-11">{card.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Documents */}
            <div className="rounded-3xl border border-purple-200 bg-white/80 backdrop-blur-sm p-8 shadow-xl shadow-purple-100/50 hover:shadow-2xl hover:shadow-purple-200/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg shadow-purple-200">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800">Documents checklist</h3>
              </div>
              <p className="mt-2 text-lg text-gray-600">Get these documents ready before your site visit.</p>
              
              <div className="mt-6 space-y-3">
                {documentList.map((doc) => (
                  <div key={doc.name} className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-4 hover:border-purple-300 hover:shadow-md transition-all duration-300 group">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-50 rounded-xl group-hover:scale-110 transition-transform">
                        <FileText className="h-5 w-5 text-purple-600" />
                      </div>
                      <span className="text-gray-800 font-medium">{doc.name}</span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-100 to-cyan-100 px-3 py-1.5 text-sm font-semibold text-emerald-700 border border-emerald-200">
                      <CheckCircle className="w-4 h-4" />
                      Ready
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
                <p className="text-sm text-purple-700 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  <span>💡 Tip: Keep digital copies of all documents for quick submission</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 p-12 text-center shadow-2xl shadow-purple-500/30">
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
            </div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-1.5 text-sm text-white border border-white/30 mb-6">
                <Rocket className="h-4 w-4" />
                Ready to Go Solar?
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Start your solar journey today
              </h2>
              <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
                Join thousands of happy customers who have already made the switch to clean, renewable energy.
              </p>
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 rounded-full bg-white text-purple-600 px-8 py-3.5 font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Get Free Consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite 2s;
        }
      `}</style>
    </div>
  );
}