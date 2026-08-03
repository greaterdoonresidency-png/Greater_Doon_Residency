import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone, MessageCircle, ShieldCheck, MapPin, Trees, Zap, Droplets,
  Lightbulb, Waves, Landmark, Building2, Baby, TrendingUp, FileCheck2,
  Download, ChevronDown, Home, Lock, Route, Menu, X,
  Camera, FileText, ClipboardCheck, KeyRound, AlertTriangle,
  Upload, CheckCircle2, CalendarDays, Landmark as BankIcon, Fingerprint, CreditCard
} from "lucide-react";

const WHATSAPP_NUMBER = "917464889033";
const waLink = (msg) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

const fonts = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');

:root{
  --navy:#0B3B60; --green:#146C2E; --gold:#B8873A; --gold-light:#D9B268;
  --paper:#F5F4F0; --slate:#33383D; --amber-bg:#FBF0DD; --amber-fg:#92400E; --maroon:#8C1F28;
}
.font-display{ font-family:'Fraunces', 'Noto Sans Devanagari', serif; }
.font-body{ font-family:'Inter', 'Noto Sans Devanagari', sans-serif; }
.font-mono{ font-family:'IBM Plex Mono', monospace; }

.bg-navy{ background-color:var(--navy); } .text-navy{ color:var(--navy); }
.bg-green{ background-color:var(--green); } .text-green{ color:var(--green); }
.bg-gold{ background-color:var(--gold); } .text-gold{ color:var(--gold); }
.bg-paper{ background-color:var(--paper); }
.text-slate{ color:var(--slate); }
.border-gold{ border-color:var(--gold); }

.plot-card{ position:relative; border-radius:4px; }
.plot-card::before, .plot-card::after,
.plot-card .tick-br, .plot-card .tick-bl{ content:""; position:absolute; width:14px; height:14px; }
.plot-card::before{ top:-1px; left:-1px; border-top:2px solid var(--gold); border-left:2px solid var(--gold); }
.plot-card::after{ top:-1px; right:-1px; border-top:2px solid var(--gold); border-right:2px solid var(--gold); }
.plot-card .tick-bl{ bottom:-1px; left:-1px; border-bottom:2px solid var(--gold); border-left:2px solid var(--gold); }
.plot-card .tick-br{ bottom:-1px; right:-1px; border-bottom:2px solid var(--gold); border-right:2px solid var(--gold); }

.boundary{
  height:1px; width:100%;
  background-image: repeating-linear-gradient(90deg, var(--green) 0 10px, transparent 10px 18px);
  opacity:0.4;
}

.contour{ position:absolute; inset:0; opacity:0.12; }

.stamp{
  border:1.5px solid var(--gold-light); border-radius:4px;
  display:inline-flex; align-items:center; gap:6px;
}

.tiranga{ height:5px; width:100%; background:linear-gradient(90deg, #E07A1F 0 33.3%, #FFFFFF 33.3% 66.6%, #146C2E 66.6% 100%); }
`;

const highlights = [
  { icon: ShieldCheck, label: "स्वीकृत परियोजना" },
  { icon: Lock, label: "गेटेड सोसाइटी" },
  { icon: Home, label: "किफायती आवास" },
  { icon: Building2, label: "प्लॉट + निर्माण" },
  { icon: FileCheck2, label: "सब्सिडी सहायता" },
  { icon: Route, label: "30+ फीट चौड़ी सड़कें" },
  { icon: Zap, label: "बिजली सुविधा" },
  { icon: Droplets, label: "पानी की सुविधा" },
  { icon: Lightbulb, label: "स्ट्रीट लाइट" },
  { icon: Waves, label: "निकासी व्यवस्था" },
  { icon: Trees, label: "हरियाली भरे पार्क" },
  { icon: Baby, label: "बच्चों का खेल मैदान" },
  { icon: Landmark, label: "कमर्शियल एरिया" },
  { icon: MapPin, label: "बेहतरीन कनेक्टिविटी" },
  { icon: TrendingUp, label: "निवेश का अवसर" },
];

const nearby = [
  { name: "भगवानपुर औद्योगिक क्षेत्र", note: "परियोजना के बिल्कुल पास" },
  { name: "हरिद्वार", note: "प्रमुख शहर एवं तीर्थ स्थल" },
  { name: "रुड़की", note: "शिक्षा एवं औद्योगिक नगर" },
  { name: "हाईवे कनेक्टिविटी", note: "सीधी क्षेत्रीय कनेक्टिविटी" },
  { name: "स्कूल", note: "आस-पास के क्षेत्र में" },
  { name: "अस्पताल", note: "आस-पास के क्षेत्र में" },
];

const faqs = [
  {
    q: "क्या निर्माण ऋण सब्सिडी हर खरीदार के लिए गारंटीड है?",
    a: "नहीं। यह सब्सिडी केवल लागू प्रधानमंत्री आवास योजना के तहत पात्र आवेदकों के लिए है, जो सरकारी दिशानिर्देशों, ऋणदाता की मंजूरी और सफल दस्तावेज़ सत्यापन के अधीन है। हर आवेदक इसके लिए योग्य नहीं होगा।",
  },
  {
    q: "क्या यह सब्सिडी प्लॉट की कीमत पर लागू होती है?",
    a: "जहां लागू हो, यह सब्सिडी निर्माण ऋण घटक पर लागू होती है — प्लॉट की कीमत पर स्वतः नहीं।",
  },
  {
    q: "डेवलपर की भूमिका क्या है?",
    a: "डेवलपर आपकी ओर से आवेदन प्रक्रिया और दस्तावेज़ीकरण में सहायता करता है। डेवलपर स्वयं सब्सिडी को मंज़ूर, स्वीकृत या गारंटी नहीं करता — यह निर्णय सरकारी योजना और ऋणदाता संस्था का होता है।",
  },
  {
    q: "रजिस्ट्रेशन शुल्क भरने के बाद मुझे क्या मिलेगा?",
    a: "एक विशिष्ट रजिस्ट्रेशन ID और आपके कस्टमर डैशबोर्ड का OTP-आधारित एक्सेस, जहां परियोजना अनुमोदन, लेआउट प्लान, मूल्य सूची और अन्य सत्यापित दस्तावेज़ देखने के लिए उपलब्ध हैं।",
  },
];

const plotSizes = ["350–400 वर्ग फुट", "400–500 वर्ग फुट", "500–600 वर्ग फुट", "अभी तय नहीं है"];

const vaultDocs = [
  "प्रोजेक्ट डॉक्यूमेंट्स",
  "लेआउट प्लान",
  "कानूनी दस्तावेज़",
  "ऑनलाइन वीडियो प्रेजेंटेशन",
  "सब्सिडी की जानकारी",
  "अन्य आवश्यक दस्तावेज़",
];

function YesNoToggle({ value, onChange }) {
  return (
    <div className="flex gap-2">
      {["हाँ", "नहीं"].map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`px-4 py-2 text-sm border transition-colors ${
            value === opt ? "bg-navy text-white border-navy" : "bg-white text-navy border-green/25"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function StepDots({ step }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {[1, 2, 3].map((n) => (
        <React.Fragment key={n}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-semibold shrink-0 ${
              step >= n ? "bg-gold text-navy" : "bg-white/10 text-white/50 border border-white/20"
            }`}
          >
            {n}
          </div>
          {n < 3 && <div className={`h-px flex-1 ${step > n ? "bg-gold" : "bg-white/15"}`} />}
        </React.Fragment>
      ))}
    </div>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function GDRMark({ light = false }) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center font-mono text-[10px] font-semibold tracking-wide"
        style={{ border: `1.5px solid ${light ? "#D9B268" : "#B8873A"}`, color: light ? "#D9B268" : "#B8873A" }}
      >
        GDR
      </div>
      <div className={`font-display leading-tight ${light ? "text-white" : "text-navy"}`}>
        <div className="text-sm font-semibold tracking-wide">GREATER DOON</div>
        <div className="text-[10px] tracking-[0.25em] font-body" style={{ color: light ? "#D9B268" : "#B8873A" }}>RESIDENCY</div>
      </div>
    </div>
  );
}

export default function GreaterDoonResidency() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "", mobile: "", whatsapp: "", email: "", aadhaar: "", pan: "",
    plotSize: "", firstHome: "", wantsSubsidy: "",
  });
  const [regCode, setRegCode] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const updateForm = (key, val) => setForm((f) => ({ ...f, [key]: val }));
  const canSubmitStep1 = form.name && form.mobile && form.plotSize && form.firstHome && form.wantsSubsidy;
  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (!canSubmitStep1) return;
    const msg = [
      "नई Enquiry — Greater Doon Residency",
      `नाम: ${form.name}`,
      `मोबाइल: ${form.mobile}`,
      form.whatsapp ? `WhatsApp: ${form.whatsapp}` : "",
      form.email ? `Email: ${form.email}` : "",
      `प्लॉट साइज़: ${form.plotSize}`,
      `पहला घर: ${form.firstHome}`,
      `PMAY/सब्सिडी चाहिए: ${form.wantsSubsidy}`,
    ].filter(Boolean).join("\n");
    window.open(waLink(msg), "_blank");
    setStep(2);
  };
  const handlePayRegistration = () => {
    setRegCode("GDR-" + Math.floor(100000 + Math.random() * 899999));
  };

  const navLinks = [
    { label: "विशेषताएं", id: "highlights" },
    { label: "प्लॉट विवरण", id: "plots" },
    { label: "सब्सिडी पात्रता", id: "subsidy" },
    { label: "स्थान", id: "location" },
    { label: "भविष्य", id: "prospects" },
    { label: "प्रक्रिया", id: "process" },
    { label: "सामान्य प्रश्न", id: "faqs" },
  ];

  return (
    <div className="font-body text-slate" style={{ backgroundColor: "#FFFFFF" }}>
      <style>{fonts}</style>

      <div className="tiranga" />
      <div className="bg-navy text-white/80 text-[11px] font-mono text-center py-1.5 px-4">
        यह एक निजी रियल एस्टेट डेवलपर की वेबसाइट है — यह भारत सरकार या किसी राज्य सरकार की आधिकारिक वेबसाइट नहीं है।
      </div>

      <header className="sticky top-0 z-50 bg-navy/95 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          <GDRMark light />
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((l) => (
              <a key={l.id} href={`#${l.id}`} className="text-sm text-white/75 hover:text-gold transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+918395000606" className="flex items-center gap-2 text-sm text-white/85 hover:text-white">
              <Phone size={15} /> अभी कॉल करें
            </a>
            <a href="#register" className="bg-gold hover:brightness-110 text-navy text-sm font-semibold px-4 py-2 rounded transition-all">
              रजिस्ट्रेशन करें
            </a>
          </div>
          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-navy border-t border-white/10 px-5 py-4 flex flex-col gap-3">
            {navLinks.map((l) => (
              <a key={l.id} href={`#${l.id}`} className="text-white/80 text-sm" onClick={() => setMenuOpen(false)}>
                {l.label}
              </a>
            ))}
            <a href="#register" className="bg-gold text-navy text-sm font-semibold px-4 py-2 rounded text-center mt-1">
              रजिस्ट्रेशन करें
            </a>
          </div>
        )}
      </header>

      <section className="relative bg-navy text-white overflow-hidden">
        <svg className="contour" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          {[80, 140, 200, 260, 320, 380].map((r, i) => (
            <ellipse key={i} cx="620" cy="120" rx={r * 1.6} ry={r} fill="none" stroke="#D9B268" strokeWidth="1" />
          ))}
          {[60, 110, 160, 210].map((r, i) => (
            <ellipse key={`b-${i}`} cx="120" cy="520" rx={r * 1.4} ry={r} fill="none" stroke="#146C2E" strokeWidth="1" />
          ))}
        </svg>

        <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-14 pb-20 md:pt-20 md:pb-28">
          <Reveal>
            <span className="stamp px-3 py-1 text-[11px] font-mono tracking-wider" style={{ color: "#D9B268" }}>
              <ShieldCheck size={13} /> स्वीकृत आवासीय परियोजना (Approved Project)
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="font-display font-semibold mt-6 text-5xl md:text-7xl leading-[0.98] tracking-tight">
              Greater Doon<br />
              <span style={{ color: "#D9B268" }}>Residency</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="font-display text-xl md:text-2xl mt-4" style={{ color: "#D9B268" }}>
              हर परिवार बेहतर जीवन का हकदार है
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="flex flex-wrap gap-2 mt-4">
              {["किफायती आवास", "HRDA स्वीकृत", "भगवानपुर", "RERA आवेदित (Applied)"].map((tag) => (
                <span key={tag} className="stamp px-3 py-1 text-xs font-medium text-white/85">{tag}</span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.13}>
            <a href="#subsidy" className="inline-block mt-4">
              <span className="stamp px-3 py-1.5 text-sm font-semibold" style={{ color: "#0B3B60", backgroundColor: "#D9B268", borderColor: "#D9B268" }}>
                पात्र प्रथम गृह खरीदारों के लिए प्रधानमंत्री आवास योजना के तहत निर्माण पर सब्सिडी उपलब्ध*
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-5 text-white/75 text-lg max-w-xl font-body">
              भगवानपुर औद्योगिक क्षेत्र के पास एक स्वीकृत किफायती आवासीय सोसाइटी — हरिद्वार, उत्तराखंड में।
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-7 max-w-2xl border border-gold/40 bg-white/5 rounded px-4 py-3 text-sm text-white/85 flex items-start gap-2">
              <FileCheck2 size={16} className="mt-0.5 shrink-0" style={{ color: "#D9B268" }} />
              <span>
                पात्र प्रथम गृह खरीदारों के लिए, लागू प्रधानमंत्री आवास योजना के तहत निर्माण ऋण सब्सिडी उपलब्ध है।
                <a href="#subsidy" className="underline decoration-gold/60 ml-1" style={{ color: "#D9B268" }}>पात्रता की शर्तें पढ़ें*</a>
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="mt-9 flex flex-wrap gap-8">
              <div>
                <div className="text-[11px] tracking-widest text-white/50 font-mono">रजिस्ट्रेशन शुल्क</div>
                <div className="font-display text-2xl font-semibold" style={{ color: "#D9B268" }}>₹5,100</div>
              </div>
              <div className="w-px bg-white/15" />
              <div>
                <div className="text-[11px] tracking-widest text-white/50 font-mono">ऑनलाइन प्लॉट बुकिंग</div>
                <div className="font-display text-2xl font-semibold" style={{ color: "#D9B268" }}>₹51,000</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#register" className="bg-gold hover:brightness-110 text-navy font-semibold px-6 py-3 rounded text-sm transition-all">
                अभी आवेदन करें
              </a>
              <a href="#register" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded text-sm border border-white/20 transition-colors">
                प्लॉट बुक करें
              </a>
              <a href="#" className="flex items-center gap-2 text-white/85 hover:text-white px-5 py-3 text-sm">
                <Download size={16} /> ब्रोशर डाउनलोड करें
              </a>
              <a href="tel:+918395000606" className="flex items-center gap-2 text-white/85 hover:text-white px-5 py-3 text-sm">
                <Phone size={16} /> अभी कॉल करें
              </a>
              <a href={waLink("नमस्ते, मुझे Greater Doon Residency के बारे में जानकारी चाहिए।")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/85 hover:text-white px-5 py-3 text-sm">
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="highlights" className="bg-paper py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="flex items-center gap-3 mb-10">
              <span className="font-mono text-xs text-gold tracking-widest">01 — परियोजना की विशेषताएं</span>
              <div className="boundary flex-1" />
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {highlights.map((h, i) => (
              <Reveal key={h.label} delay={(i % 5) * 0.05}>
                <div className="plot-card bg-white px-4 py-6 h-full flex flex-col items-center text-center gap-3 shadow-sm">
                  <span className="tick-bl" /><span className="tick-br" />
                  <h.icon size={22} className="text-green" />
                  <span className="text-sm font-medium text-navy">{h.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="plots" className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="flex items-center gap-3 mb-10">
              <span className="font-mono text-xs text-gold tracking-widest">02 — प्लॉट विवरण</span>
              <div className="boundary flex-1" />
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-5">
            <Reveal>
              <div className="plot-card bg-paper p-7 h-full">
                <span className="tick-bl" /><span className="tick-br" />
                <div className="text-xs font-mono tracking-widest text-green mb-2">प्लॉट साइज़ (विस्तार)</div>
                <div className="font-display text-3xl text-navy font-semibold">350 – 600</div>
                <div className="text-sm text-slate mt-1">वर्ग फुट (लगभग)</div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="plot-card bg-paper p-7 h-full">
                <span className="tick-bl" /><span className="tick-br" />
                <div className="text-xs font-mono tracking-widest text-green mb-2">प्री-लॉन्च कीमत</div>
                <div className="font-display text-3xl text-navy font-semibold">₹3,255</div>
                <div className="text-sm text-slate mt-1">प्रति वर्ग फुट — अभी</div>
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="plot-card bg-navy p-7 h-full text-white relative">
                <span className="tick-bl" /><span className="tick-br" />
                <span className="stamp px-2.5 py-1 text-[10px] font-mono tracking-wider mb-3" style={{ color: "#D9B268" }}>
                  सीमित अवधि का ऑफर
                </span>
                <div className="text-xs font-mono tracking-widest text-white/60 mb-2 mt-3">भविष्य की कीमत</div>
                <div className="font-display text-3xl font-semibold" style={{ color: "#D9B268" }}>₹3,500</div>
                <div className="text-sm text-white/70 mt-1">प्रति वर्ग फुट — ऑफर के बाद</div>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="text-xs text-slate/70 mt-5 max-w-2xl">
              प्लॉट साइज़ और कीमत प्री-लॉन्च चरण के लिए अनुमानित हैं, और अंतिम लेआउट अनुमोदन, मापन तथा लागू सांविधिक
              शुल्कों के अधीन हैं। पुष्ट आंकड़ों के लिए अपने कस्टमर डैशबोर्ड में आधिकारिक मूल्य सूची देखें।
            </p>
          </Reveal>
        </div>
      </section>

      <section id="launch-offer" className="bg-navy py-16 md:py-20 text-white relative overflow-hidden">
        <svg className="contour" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          {[80, 140, 200, 260].map((r, i) => (
            <ellipse key={i} cx="700" cy="500" rx={r * 1.5} ry={r} fill="none" stroke="#D9B268" strokeWidth="1" />
          ))}
        </svg>
        <div className="relative max-w-7xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3 mb-2">
    
