import React, { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Droplet, Phone, Mail, Check, AlertCircle, Wrench, Shield, Zap, Menu, X } from "lucide-react";

export default function App() {
  // Navigation State for mobile burger menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Smooth scroll handler with offset for sticky header
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      
      // Update browser URL hash
      window.history.pushState(null, "", `#${targetId}`);
    }
    
    // Close mobile menu immediately to prevent click interaction lag
    setIsMobileMenuOpen(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    
    // Simple verification
    if (!formData.name.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (!formData.message.trim()) {
      setErrorMsg("Please write a short message.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate swift server response
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    }, 1000);
  };

  return (
    <div id="main-wrapper" className="min-h-screen bg-[#F8F9FA] text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900 antialiased">
      
      {/* Sticky Header Navigation (Deep Navy #0B2B4A) */}
      <header id="site-header" className="sticky top-0 z-50 bg-[#0B2B4A] border-b border-[#0B2B4A]/60 shadow-md">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a 
            id="brand-link"
            href="#home" 
            onClick={(e) => handleScroll(e, "home")}
            className="flex items-center gap-2 group focus:outline-none"
          >
            <Droplet className="w-5 h-5 text-sky-400 transition-transform duration-300 group-hover:scale-110" />
            <span className="font-bold text-lg tracking-tight text-white select-none whitespace-nowrap">Rahman Plumbing Co.</span>
          </a>
          
          {/* Desktop Navigation */}
          <nav id="main-nav" aria-label="Main Navigation" className="hidden md:block">
            <ul className="flex items-center gap-6 sm:gap-7 text-sm font-semibold">
              <li>
                <a 
                  id="nav-home"
                  href="#home" 
                  onClick={(e) => handleScroll(e, "home")}
                  className="text-slate-100 hover:text-sky-300 transition-colors duration-200 focus:outline-none focus:text-sky-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  id="nav-about"
                  href="#about" 
                  onClick={(e) => handleScroll(e, "about")}
                  className="text-slate-100 hover:text-sky-300 transition-colors duration-200 focus:outline-none focus:text-sky-300"
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  id="nav-services"
                  href="#services" 
                  onClick={(e) => handleScroll(e, "services")}
                  className="text-slate-100 hover:text-sky-300 transition-colors duration-200 focus:outline-none focus:text-sky-300"
                >
                  Services
                </a>
              </li>
              <li>
                <a 
                  id="nav-pricing"
                  href="#pricing" 
                  onClick={(e) => handleScroll(e, "pricing")}
                  className="text-slate-100 hover:text-sky-300 transition-colors duration-200 focus:outline-none focus:text-sky-300"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a 
                  id="nav-contact"
                  href="#contact" 
                  onClick={(e) => handleScroll(e, "contact")}
                  className="text-slate-100 hover:text-sky-300 transition-colors duration-200 focus:outline-none focus:text-sky-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center p-2 rounded-lg text-white hover:bg-white/10 active:scale-95 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all cursor-pointer relative z-50 select-none"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-sky-400" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu with Slide/Fade animation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              id="mobile-dropdown-menu"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-16 left-0 right-0 md:hidden bg-[#0A233B] border-t border-[#0B2B4A]/85 shadow-2xl z-50 pointer-events-auto block"
            >
              <nav aria-label="Mobile Navigation" className="px-6 py-4">
                <ul className="flex flex-col gap-3.5 text-sm font-semibold">
                  <li>
                    <a 
                      id="mobile-nav-home"
                      href="#home" 
                      onClick={(e) => handleScroll(e, "home")}
                      className="block py-2 text-slate-100 hover:text-sky-300 transition-colors focus:outline-none focus:text-sky-300"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a 
                      id="mobile-nav-about"
                      href="#about" 
                      onClick={(e) => handleScroll(e, "about")}
                      className="block py-2 text-slate-100 hover:text-sky-300 transition-colors focus:outline-none focus:text-sky-300"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a 
                      id="mobile-nav-services"
                      href="#services" 
                      onClick={(e) => handleScroll(e, "services")}
                      className="block py-2 text-slate-100 hover:text-sky-300 transition-colors focus:outline-none focus:text-sky-300"
                    >
                      Services
                    </a>
                  </li>
                  <li>
                    <a 
                      id="mobile-nav-pricing"
                      href="#pricing" 
                      onClick={(e) => handleScroll(e, "pricing")}
                      className="block py-2 text-slate-100 hover:text-sky-300 transition-colors focus:outline-none focus:text-sky-300"
                    >
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a 
                      id="mobile-nav-contact"
                      href="#contact" 
                      onClick={(e) => handleScroll(e, "contact")}
                      className="block py-2 text-slate-100 hover:text-sky-300 transition-colors focus:outline-none focus:text-sky-300"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* SECTION 1: HERO (With high-quality overlaid background image) */}
      <section 
        id="home" 
        className="relative min-h-[80vh] flex items-center justify-center bg-[#0B2B4A] text-white overflow-hidden py-24 px-6"
      >
        {/* Background Image with elegant dark/blue tint overlay */}
        <div 
          id="hero-bg-image"
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-45 scale-102"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80')` 
          }}
        />
        {/* Transparent Deep Navy Color Tint Overlay: rgba(11, 43, 74, 0.55) */}
        <div className="absolute inset-0 bg-[#0B2B4A]/55" />

        {/* Content Container with a smooth subtle fade-in */}
        <motion.div 
          id="hero-content"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-3xl mx-auto text-center"
        >
          <div id="service-badge" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sky-200 text-xs font-semibold tracking-wider uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
            Professional & Trusted
          </div>

          <h1 id="hero-title" className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Rahman <span className="text-sky-300">Plumbing</span> Co.
          </h1>
          
          <p id="hero-tagline" className="text-lg sm:text-xl text-white font-medium mb-10 max-w-xl mx-auto leading-relaxed">
            Reliable plumbing for your home.
          </p>

          <div id="hero-actions" className="flex justify-center">
            <a 
              id="hero-cta-btn"
              href="#contact" 
              onClick={(e) => handleScroll(e, "contact")}
              className="inline-flex items-center justify-center bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-black/25 active:translate-y-[1px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </section>

      {/* Main Single Page Layout Container with full-width sections support */}
      <main className="w-full">
        
        {/* SECTION 2: ABOUT (Off-White #F9FAFB) */}
        <section 
          id="about" 
          className="py-24 sm:py-32 bg-[#F9FAFB] border-b border-slate-200/60"
        >
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 id="about-heading" className="text-xs font-bold tracking-widest text-[#0A66C2] uppercase mb-4">About Our Business</h2>
            <h3 id="about-subheading" className="text-3xl font-extrabold tracking-tight text-[#0B2B4A] mb-6">Honest, reliable service</h3>
            <p id="about-text" className="text-lg sm:text-xl text-[#1F2937] font-normal leading-relaxed max-w-3xl mx-auto">
              Rahman Plumbing Co. is a family-owned business dedicated to providing reliable and high-quality plumbing services for your home. With over a decade of experience, we pride ourselves on our honest work and commitment to customer satisfaction.
            </p>
          </div>
        </section>

        {/* SECTION 3: SERVICES (White #FFFFFF background, cards inside with light gray border #E5E7EB) */}
        <section 
          id="services" 
          className="py-24 sm:py-32 bg-white border-b border-slate-200/60"
        >
          <div className="max-w-5xl mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 id="services-heading" className="text-xs font-bold tracking-widest text-[#0A66C2] uppercase mb-4">What We Do</h2>
              <h3 id="services-subheading" className="text-3xl font-extrabold tracking-tight text-[#0B2B4A]">Our Core Specialty Services</h3>
            </div>

            <div id="services-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Card 1: Residential Plumbing */}
              <div id="service-card-1" className="group bg-white border border-[#E5E7EB] rounded-2xl hover:border-sky-500/30 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col overflow-hidden">
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img 
                    src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                    alt="Residential Plumbing" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 p-2.5 bg-[#0A66C2] text-white rounded-xl shadow-md">
                    <Wrench className="w-5 h-5" />
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold text-[#0B2B4A] mb-2">Residential Plumbing</h4>
                  <p className="text-sm text-[#6B7280] leading-relaxed">
                    Complete kitchen and bathroom fixtures setups, leak diagnosis, and dependable repairs.
                  </p>
                </div>
              </div>

              {/* Card 2: Drain Cleaning */}
              <div id="service-card-2" className="group bg-white border border-[#E5E7EB] rounded-2xl hover:border-sky-500/30 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col overflow-hidden">
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img 
                    src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                    alt="Drain Cleaning" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 p-2.5 bg-[#0A66C2] text-white rounded-xl shadow-md">
                    <Shield className="w-5 h-5" />
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold text-[#0B2B4A] mb-2">Drain Cleaning</h4>
                  <p className="text-sm text-[#6B7280] leading-relaxed">
                    Safe and effective clearing of clogs to keep your pipe networks clean and flowing.
                  </p>
                </div>
              </div>

              {/* Card 3: Emergency Repairs */}
              <div id="service-card-3" className="group bg-white border border-[#E5E7EB] rounded-2xl hover:border-sky-500/30 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col overflow-hidden">
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img 
                    src="https://images.unsplash.com/photo-1581244277943-fe4a9c777189?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                    alt="Emergency Repairs" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 p-2.5 bg-[#0A66C2] text-white rounded-xl shadow-md">
                    <Zap className="w-5 h-5" />
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold text-[#0B2B4A] mb-2">Emergency Repairs</h4>
                  <p className="text-sm text-[#6B7280] leading-relaxed">
                    Rapid expert troubleshooting to manage bursts, blockages, or urgent plumbing leaks.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION: PRICING */}
        <section 
          id="pricing" 
          className="py-24 sm:py-32 bg-[#F9FAFB] border-b border-slate-200/60"
        >
          <div className="max-w-5xl mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 id="pricing-heading" className="text-xs font-bold tracking-widest text-[#0A66C2] uppercase mb-4">Transparent Pricing</h2>
              <h3 id="pricing-subheading" className="text-3xl font-extrabold tracking-tight text-[#0B2B4A]">Affordable, Simple Plans</h3>
            </div>

          <div id="pricing-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Plan 1: Diagnostic Service */}
            <div id="pricing-card-1" className="bg-white border border-[#E5E7EB] rounded-2xl p-8 hover:border-[#0A66C2]/40 transition-all duration-300 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="text-md font-bold text-[#0B2B4A] mb-1">Diagnostic Visit</h4>
                <p className="text-xs text-slate-500 mb-6">Initial review & quick fix</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-slate-950">$89</span>
                  <span className="text-slate-500 text-sm">/ flat fee</span>
                </div>
                <ul className="space-y-3.5 text-sm text-[#1F2937] mb-8">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Thorough visual inspection</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Up to 30 mins simple repair</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>No surprise hidden costs</span>
                  </li>
                </ul>
              </div>
              <a 
                href="#contact" 
                onClick={(e) => handleScroll(e, "contact")}
                className="w-full text-center bg-slate-100 hover:bg-slate-200 text-[#1F2937] font-semibold py-3 px-4 rounded-xl transition-colors duration-200 text-sm focus:outline-none"
              >
                Inquire Diagnostic
              </a>
            </div>

            {/* Plan 2: Preferred Standard (Highlighted with Trust Blue #0A66C2) */}
            <div id="pricing-card-2" className="bg-white border-2 border-[#0A66C2] rounded-2xl p-8 transition-all duration-300 shadow-md shadow-blue-500/5 relative flex flex-col justify-between">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#0A66C2] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                Most Popular
              </div>
              <div>
                <h4 className="text-md font-bold text-[#0B2B4A] mb-1">Standard Repair</h4>
                <p className="text-xs text-[#0A66C2] mb-6 font-semibold">Our absolute best value plan</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-slate-950">$189</span>
                  <span className="text-slate-500 text-sm">/ service</span>
                </div>
                <ul className="space-y-3.5 text-sm text-[#1F2937] mb-8">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Comprehensive leak inspection</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Up to 2 hours expert labor</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Standard clogs & drain cleaning</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Parts guarantee included</span>
                  </li>
                </ul>
              </div>
              <a 
                href="#contact" 
                onClick={(e) => handleScroll(e, "contact")}
                className="w-full text-center bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-all duration-200 text-sm focus:outline-none"
              >
                Book Routine Service
              </a>
            </div>

            {/* Plan 3: Urgent emergency relief inspection */}
            <div id="pricing-card-3" className="bg-white border border-[#E5E7EB] rounded-2xl p-8 hover:border-[#0A66C2]/40 transition-all duration-300 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="text-md font-bold text-[#0B2B4A] mb-1">Emergency Dispatch</h4>
                <p className="text-xs text-slate-500 mb-6 font-medium">Immediate relief plumbing</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-slate-950">$299</span>
                  <span className="text-slate-500 text-sm">/ dispatch</span>
                </div>
                <ul className="space-y-3.5 text-sm text-[#1F2937] mb-8">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Priority instant response</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Burst pipe & major leak isolation</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Emergency hazard clearance</span>
                  </li>
                </ul>
              </div>
              <a 
                href="#contact" 
                onClick={(e) => handleScroll(e, "contact")}
                className="w-full text-center bg-[#0B2B4A] hover:bg-[#0B2B4A]/90 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 text-sm focus:outline-none"
              >
                Dispatch Fast
              </a>
            </div>

          </div>
          </div>
        </section>

        {/* SECTION 4: CONTACT (Off-White #F9FAFB background) */}
        <section 
          id="contact" 
          className="py-24 sm:py-32 bg-[#F9FAFB]"
        >
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
              
              {/* Contact Info text details (Dark Gray #1F2937 body text) */}
              <div className="lg:col-span-5 flex flex-col justify-start">
                <h2 id="contact-heading" className="text-xs font-bold tracking-widest text-[#0A66C2] uppercase mb-4">Contact</h2>
                <h3 id="contact-subheading" className="text-3xl font-extrabold tracking-tight text-[#0B2B4A] mb-6">Get in Touch</h3>
                <p id="contact-description" className="text-[#1F2937] mb-10 leading-relaxed opacity-95">
                  Have a leak, a clogged drain, or just need general plumbing maintenance? Fill out our simple form, or reach out to us directly through the details below. We look forward to working with you!
                </p>

                {/* Direct Quick Details */}
                <div id="contact-details" className="space-y-6">
                  <div id="phone-detail-row" className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center text-[#0A66C2] shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Phone Number</span>
                      <a href="tel:5551234567" className="text-md font-bold text-[#1F2937] hover:text-[#0A66C2] transition-colors">
                        (555) 123-4567
                      </a>
                    </div>
                  </div>

                  <div id="email-detail-row" className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center text-[#0A66C2] shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Email Address</span>
                      <a href="mailto:info@rahmanplumbing.com" className="text-md font-bold text-[#1F2937] hover:text-[#0A66C2] transition-colors">
                        info@rahmanplumbing.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            {/* Simple Contact Form */}
            <div className="lg:col-span-7">
              <div id="contact-form-card" className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-sm">
                
                {isSubmitted ? (
                  <div id="form-success-state" className="py-12 text-center flex flex-col items-center justify-center">
                    <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mb-4 text-emerald-600">
                      <Check className="w-6 h-6 stroke-[3]" />
                    </div>
                    <h4 className="text-xl font-bold text-[#0B2B4A] mb-2">Message Sent!</h4>
                    <p className="text-slate-600 max-w-sm mb-6 leading-relaxed text-sm">
                      Thank you for contacting Rahman Plumbing Co. We will review your message and get back to you shortly.
                    </p>
                    <button 
                      id="reset-form-btn"
                      onClick={() => setIsSubmitted(false)}
                      className="text-sm font-semibold text-[#0A66C2] hover:text-[#0A66C2]/90 transition-colors focus:outline-none"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form id="contact-form" onSubmit={handleSubmit} className="space-y-5">
                    {errorMsg && (
                      <div id="error-alert" className="flex items-center gap-2 p-4 bg-red-50 text-red-700 rounded-xl text-sm font-medium border border-red-100">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}
                    
                    <div>
                      <label htmlFor="name-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                        Your Name
                      </label>
                      <input 
                        type="text" 
                        id="name-input"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] focus:bg-white focus:border-[#0A66C2] focus:ring-1 focus:ring-[#0A66C2] text-sm focus:outline-none transition-all duration-200"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label htmlFor="email-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                        Email Address
                      </label>
                      <input 
                        type="email" 
                        id="email-input"
                        name="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="johndoe@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] focus:bg-white focus:border-[#0A66C2] focus:ring-1 focus:ring-[#0A66C2] text-sm focus:outline-none transition-all duration-200"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label htmlFor="message-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                        Message
                      </label>
                      <textarea 
                        id="message-input"
                        name="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Briefly describe what service you need..."
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] focus:bg-white focus:border-[#0A66C2] focus:ring-1 focus:ring-[#0A66C2] text-sm focus:outline-none transition-all duration-200 resize-none animate-none"
                        disabled={isSubmitting}
                      />
                    </div>

                    <button 
                      type="submit" 
                      id="submit-form-btn"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 disabled:bg-[#0A66C2]/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A66C2] text-sm active:translate-y-[1px]"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        "Submit Request"
                      )}
                    </button>
                  </form>
                )}

              </div>
            </div>

          </div>
          </div>
        </section>

      </main>

      {/* FOOTER (Deep Navy bg, Light Gray text) */}
      <footer id="site-footer" className="bg-[#0B2B4A] py-12 border-t border-[#0B2B4A]/40">
        <div className="max-w-5xl mx-auto px-6 h-full flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-300">
          <p id="footer-text">
            &copy; {new Date().getFullYear()} Rahman Plumbing Co. All rights reserved.
          </p>
          <div id="footer-tier-badge" className="text-[10px] font-bold text-slate-200 tracking-widest uppercase bg-white/10 px-2.5 py-1 rounded">
            Portfolio Tier Package
          </div>
        </div>
      </footer>
    </div>
  );
}
