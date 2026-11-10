import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Shield, 
  ArrowRight, 
  Sun, 
  Zap, 
  Award, 
  Users, 
  TrendingUp,
  CheckCircle,
  Star,
  Rocket,
  Leaf,
  Building,
  Globe,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  BarChart3,
  Target,
  Lightbulb,
  ThumbsUp,
  Calendar,
  MessageCircle
} from 'lucide-react';

export function FranchisePage() {
  const benefits = [
    {
      icon: Shield,
      title: 'Exclusive Territory',
      description: 'Protected geographic area with no internal competition'
    },
    {
      icon: Users,
      title: 'Training & Support',
      description: 'Comprehensive training for sales and technical teams'
    },
    {
      icon: Sun,
      title: 'Premium Products',
      description: 'Access to top-tier panel and inverter brands'
    },
    {
      icon: TrendingUp,
      title: 'Marketing Support',
      description: 'Regional campaigns and lead generation assistance'
    }
  ];

  const features = [
    {
      icon: Rocket,
      title: 'Quick Onboarding',
      description: 'Get started in 30 days with our streamlined process'
    },
    {
      icon: Award,
      title: 'Trusted Brand',
      description: 'Leverage our strong reputation in the solar market'
    },
    {
      icon: Building,
      title: 'Infrastructure Support',
      description: 'Access to our warehouse and logistics network'
    },
    {
      icon: Globe,
      title: 'Pan-India Network',
      description: 'Connect with partners across the country'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Apply Online',
      description: 'Fill out our simple application form to get started',
      icon: MessageCircle
    },
    {
      number: '02',
      title: 'Discussion & Evaluation',
      description: 'Our team will review your application and schedule a call',
      icon: Calendar
    },
    {
      number: '03',
      title: 'Site Visit & Training',
      description: 'We\'ll visit your location and provide comprehensive training',
      icon: ThumbsUp
    },
    {
      number: '04',
      title: 'Launch & Grow',
      description: 'Start your franchise and grow with our ongoing support',
      icon: Rocket
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1500" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-rose-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2500" />
        
        {/* Floating Particles */}
        <div className="absolute top-10 left-10 animate-float">
          <Sun className="w-10 h-10 text-yellow-300 opacity-30" />
        </div>
        <div className="absolute bottom-10 right-10 animate-float-delayed">
          <Zap className="w-10 h-10 text-cyan-300 opacity-30" />
        </div>
        <div className="absolute top-1/4 right-20 animate-float">
          <Star className="w-8 h-8 text-pink-300 opacity-30" />
        </div>
        <div className="absolute bottom-1/4 left-20 animate-float-delayed">
          <Leaf className="w-8 h-8 text-emerald-300 opacity-30" />
        </div>
        <div className="absolute top-1/3 left-1/4 animate-float">
          <Sparkles className="w-6 h-6 text-yellow-300 opacity-30" />
        </div>
        <div className="absolute bottom-1/3 right-1/4 animate-float-delayed">
          <Sparkles className="w-6 h-6 text-purple-300 opacity-30" />
        </div>
      </div>

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Hero Section */}
        <div className="rounded-[40px] bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-12 shadow-2xl shadow-black/20">
          <div className="grid gap-12 lg:grid-cols-2 items-start">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-500/30 animate-pulse">
                <Sparkles className="h-4 w-4" />
                <span>🌟 Franchise Opportunity</span>
                <Sparkles className="h-4 w-4" />
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                <span className="text-white">Partner with</span>
                <br />
                <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500 bg-clip-text text-transparent">
                  Green Leaf Energy
                </span>
                <br />
                <span className="text-white">and grow in the</span>
                <br />
                <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500 bg-clip-text text-transparent">
                  solar market
                </span>
              </h1>
              
              <p className="text-lg text-white/90 leading-relaxed max-w-2xl">
                Our franchise model offers premium support, strong branding, and easy 
                onboarding for entrepreneurs who want to sell solar systems and services 
                under the Green Leaf Energy banner.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/contact" 
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 px-8 py-3.5 text-white font-semibold shadow-xl shadow-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300 group"
                >
                  <Rocket className="h-5 w-5" />
                  Start Your Franchise Journey
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 px-8 py-3.5 text-white font-medium hover:bg-white/20 hover:border-white/50 transition-all duration-300"
                >
                  <Phone className="h-5 w-5" />
                  Talk to Us
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-8 pt-4">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-xs font-bold text-white border-2 border-white/20">S</div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-rose-500 flex items-center justify-center text-xs font-bold text-white border-2 border-white/20">R</div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-indigo-500 flex items-center justify-center text-xs font-bold text-white border-2 border-white/20">K</div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-xs font-bold text-white border-2 border-white/20">A</div>
                  </div>
                  <span className="text-sm text-white/80">Join 500+ partners</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                  <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                  <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                  <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                  <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                  <span className="text-sm text-white/80">4.9/5 Rating</span>
                </div>
              </div>
            </div>

            {/* Right Column - Benefits Grid */}
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit) => {
                  const Icon = benefit.icon;
                  return (
                    <div 
                      key={benefit.title}
                      className="group rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-5 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg shadow-orange-500/30">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-white text-sm mb-1">{benefit.title}</h3>
                      <p className="text-xs text-white/70">{benefit.description}</p>
                    </div>
                  );
                })}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3 mt-2">
                <div className="text-center p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <p className="text-xl font-bold text-white">50+</p>
                  <p className="text-xs text-white/70">Franchises</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <p className="text-xl font-bold text-white">15+</p>
                  <p className="text-xs text-white/70">States</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <p className="text-xl font-bold text-white">500+</p>
                  <p className="text-xs text-white/70">Customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Section */}
        <div className="mt-12">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-1.5 text-sm text-white border border-white/20">
              <Star className="h-3.5 w-3.5 text-yellow-300" />
              Why Choose Us
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
              <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">Why</span> choose our franchise?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={feature.title}
                  className="group rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-black/20"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-orange-500/30">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* How to Join Section */}
        <div className="mt-12">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-1.5 text-sm text-white border border-white/20">
              <Target className="h-3.5 w-3.5 text-orange-300" />
              How to Join
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
              Your <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">Journey</span> to Success
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-yellow-400/30 via-orange-400/30 to-pink-400/30" />
            
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div 
                  key={step.number}
                  className="relative group"
                >
                  <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-black/20 text-center">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform">
                      {step.number}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-5 h-5 text-yellow-400" />
                    </div>
                    <h3 className="font-semibold text-white text-sm mb-1.5">{step.title}</h3>
                    <p className="text-xs text-white/70 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12">
          <div className="relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-12 text-center">
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
            </div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-400/30 to-orange-400/30 px-4 py-1.5 text-sm text-white border border-yellow-400/30 mb-4">
                <Rocket className="h-3.5 w-3.5" />
                Ready to Start?
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Take the <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">First Step</span> Today
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg">
                Join the Green Leaf Energy family and become part of India's growing solar revolution.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link 
                  to="/contact" 
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 px-8 py-3.5 text-white font-semibold shadow-xl shadow-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300"
                >
                  Apply Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 px-8 py-3.5 text-white font-medium hover:bg-white/20 hover:border-white/50 transition-all duration-300"
                >
                  <Phone className="h-4 w-4" />
                  Call Us
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
            <p className="text-2xl font-bold bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">50+</p>
            <p className="text-xs text-white/70">Franchise Partners</p>
          </div>
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
            <p className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">15+</p>
            <p className="text-xs text-white/70">States Covered</p>
          </div>
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
            <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">500+</p>
            <p className="text-xs text-white/70">Happy Customers</p>
          </div>
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
            <p className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">4.9★</p>
            <p className="text-xs text-white/70">Average Rating</p>
          </div>
        </div>
      </div>

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