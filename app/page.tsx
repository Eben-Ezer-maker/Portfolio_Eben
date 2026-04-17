"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type Tab = "Data Science" | "Data Analysis" | "Econometrics" | "Data Engineering";
type Lang = "fr" | "en";

// --- TYPES ---
type Project = {
  category: Tab;
  title: { fr: string; en: string };
  desc: { fr: string; en: string };
  tech: string[];
  github: string;
  link: string;
  image: string;
};

// --- DONNÉES DES PROJETS ---
const PROJECTS_DATA: Project[] = [
  {
    category: "Data Science",
    title: { fr: "Scoring Crédit — Détection du risque de défaut", en: "Credit Scoring — Default Risk Detection" },
    desc: { 
      fr: "Modélisation du risque de défaut bancaire avec plusieurs algorithmes ML. Feature engineering avancé, gestion du déséquilibre de classes via SMOTE, optimisation du seuil de décision.", 
      en: "Modeling bank default risk using multiple machine learning algorithms. Advanced feature engineering, handling class imbalance with SMOTE, and decision threshold optimization." 
    },
    tech: ["Python", " LightGBM", "SMOTE", "ROC-AUC", "Precision-Recall"],
    
    github: "https://github.com/Eben-Ezer-maker/Credit-Scoring",
    
    // 👇 2. METS TON LIEN DE DEMO (OU LAISSE VIDE "")
    link: "", 
    
    image: "/risque.png",
  },
  {
    category: "Data Science",
    title: { fr: "Analyse marché immobilier — Web Scraping", en: "Real Estate Market Analysis — Web Scraping" },
    desc: { 
      fr: "Pipeline complet de collecte et d'analyse du marché immobilier français. Scraping automatisé, nettoyage, enrichissement géographique, analyse des déterminants de prix et dashboard interactif Streamlit", 
      en: "End-to-end pipeline for collecting and analyzing the French real estate market. Automated scraping, data cleaning, geospatial enrichment, price determinant analysis, and an interactive Streamlit dashboard." 
    },
    tech: ["Python", "BeatifulSoup", "Streamlit", "Web Scraping", "Data Cleaning"],

    // 👇 METS LES LIENS POUR CE 2ème PROJET ICI
    github: "https://github.com/Eben-Ezer-maker/Webscraping",
    link: "", // Pas de démo pour celui-là ? Laisse vide !
    
    image: "/immobilier.jpg", // Tu peux ajouter une image de maisons ou de graphiques liés à l'immobilier
  },
  {
    category: "Data Analysis",
    title: { fr: "Dashboard santé", en: "Health Dashboard" },
    desc: { 
      fr: "Analyse des établissements de santé et des personnels non-médicaux.", 
      en: "Analysis of health establishments and non-medical staff." 
    },
    tech: ["Python", "Streamlit", "Data management", "Data mining", "Data visualisation"],

    // 👇 ET AINSI DE SUITE...
    github: "https://github.com/Eben-Ezer-maker/Sante", 
    link: "", 
    
    image: "/sante.jpg", // Tu peux ajouter une image de dashboard ou de graphiques liés à la santé
  },




   {
    category: "Data Analysis",
    title: { fr: "SQL — Modélisation & Analyse de données", en: "SQL — Data Modeling & Analysis" },
    desc: { 
      fr: "Exploration et modélisation de bases de données relationnelles. Requêtes avancées, vues analytiques clients VIP, analyse de performance produits et conception de schémas normalisés.", 
      en: "Exploration and modeling of relational databases. Advanced queries, analytical views for VIP customers, product performance analysis, and normalized schema design." 
    },
    tech: ["SQL", "JOIN"],

    // 👇 ET AINSI DE SUITE...
    github: "https://github.com/Eben-Ezer-maker/SQL", 
    link: "", 
    
    image: "/sql.jpg", // Tu peux ajouter une image de dashboard ou de graphiques liés à la santé
  },


    {
    category: "Data Analysis",
    title: { fr: "Dashboard Performance Bancaire — Power BI", en: "Banking Performance Dashboard — Power BI" },
    desc: {
      fr: "Tableau de bord complet d'analyse de performance bancaire. Modélisation en étoile, mesures DAX avancées, KPIs clés (PNB, NPS, rentabilité, sinistralité) et visuels interactifs pour comité de direction.",
      en: "Full banking performance analysis dashboard. Star schema modeling, advanced DAX measures, key KPIs (NBI, NPS, profitability, loss ratio) and interactive visuals for executive committee.",
    },
    tech: ["Power BI", "DAX", "Modélisation en étoile", "KPI"],
    github: "https://github.com/Eben-Ezer-maker/PowerBI-Dashboard-Bancaire",
    link: "",
    image: "/banque.jpg",
  },


  {
  category: "Econometrics",
  title: { 
    fr: "Modélisation macroéconomique : France 2023", 
    en: "Macroeconomic Modelling : France 2023" 
  },
  desc: { 
    fr: "Analyse macroéconomique de l'économie française à partir d'une Matrice de Comptabilité Sociale (MCS) 2023 et d'un modèle keynésien de court terme. Simulations de politiques budgétaires et commerciales : hausse des dépenses publiques (+15%) → PIB +3,47% ; politique de compétitivité → PIB +3,93% et déficit public réduit de 42%.", 
    en: "Macroeconomic analysis of the French economy using a 2023 Social Accounting Matrix (SAM) and a short-run Keynesian model. Policy simulations: public spending increase (+15%) → GDP +3.47%; competitiveness policy → GDP +3.93% and public deficit reduced by 42%." 
  },
  tech: ["Excel", "MCS", "Modèle keynésien", "Simulation", "Macroéconomie"],
  github: "https://github.com/Eben-Ezer-maker/Modelisation-macro",
  link: "",
  image: "/modelisation.jpg", // Tu peux ajouter une image de graphiques macroéconomiques ou de modèles économiques
},


  {
    category: "Econometrics",
    title: { 
      fr: "Analyse de la pauvreté monétaire au Sénégal vs Guinée-Bissau (2018-2022)", 
      en: "Monetary Poverty Analysis: Senegal vs Guinea-Bissau (2018-2022)" 
    },
    desc: { 
      fr: "Analyse comparative approfondie de la pauvreté monétaire et des inégalités au Sénégal et en Guinée-Bissau.", 
      en: "In-depth comparative analysis of monetary poverty and inequality in Senegal and Guinea-Bissau." 
    },
    tech: ["R", "sf", "dplyr", "ggplot2", "stringi"],
    github: "https://github.com/Eben-Ezer-maker/Analyse-de-la-pauvret-",
    link: "", 
    image: "/pauvre.jpg", // Tu peux ajouter une image de graphique de tendances parallèles
  },
   {
    category: "Econometrics",
    title: {
      fr: "Concentration des exportations et croissance économique",
      en: "Export Concentration and Economic Growth",
    },
    desc: {
      fr: "Étude économétrique sur 147 pays (1995–2023) analysant l'impact de la structure des exportations (indice HHI) sur la croissance du PIB par habitant. Modèles MCO et 2SLS, tests RESET, endogénéité (Nakamura) et suridentification (Sargan). Résultat : effet dual selon le niveau de développement (PMA vs pays développés).",
      en: "Econometric study on 147 countries (1995–2023) analyzing the impact of export structure (HHI index) on GDP per capita growth. OLS and 2SLS models, RESET, endogeneity (Nakamura) and Sargan tests. Finding: dual effect depending on development level (LDCs vs developed countries).",
    },
    tech: ["EViews", "MCO", "2SLS", "Indice HHI", "WDI", "WITS", "Endogénéité"],
    github: "https://github.com/Eben-Ezer-maker/Croissance---commerce-international",
    link: "",
    image: "",
  },

  {
    category: "Econometrics",
    title: { 
      fr: "Déterminants du Rendement de l'Éducation", 
      en: "Returns to Education Analysis" 
    },
    desc: { 
      fr: "Estimation du rendement de l'éducation en utilisant des Variables Instrumentales (IV) pour corriger le biais d'endogénéité.", 
      en: "Estimating returns to schooling using Instrumental Variables (IV) to correct endogeneity bias." 
    },
    tech: ["R", "Ivreg", "Microeconometrics"],
    github: "", 
    link: "", 
    image: "",
  },

{
  category: "Data Engineering",
  title: { 
    fr: "Architecture Azure", 
    en: " Azure Architecture" 
  },
  desc: { 
    fr: "Conception et implémentation d'une architecture data complète sur Azure. Ingestion, transformation et stockage des données via Azure Data Factory, Data Lake et Synapse Analytics.", 
    en: "Design and implementation of a complete data architecture on Azure. Data ingestion, transformation and storage using Azure Data Factory, Data Lake and Synapse Analytics." 
  },
  tech: ["Azure Data Factory", "Azure Data Lake", "Synapse Analytics", "ETL", "Cloud"],
  github: "https://github.com/Eben-Ezer-maker/Azure-Architecture",
  link: "",
  image: "/azure.png",
},

{
  category: "Data Engineering",
  title: { 
    fr: "MLOps Pipeline : Déploiement de modèles ML", 
    en: "MLOps Pipeline : ML Model Deployment" 
  },
  desc: { 
    fr: "Implémentation d'un pipeline MLOps complet : entraînement reproductible, versioning des modèles avec MLflow, tests automatisés et déploiement continu via GitHub Actions.", 
    en: "Implementation of a complete MLOps pipeline: reproducible training, model versioning with MLflow, automated testing and continuous deployment via GitHub Actions." 
  },
  tech: ["MLflow", "CI/CD", "AWS", "GitHub Actions", "Python"],
  github: "https://github.com/Eben-Ezer-maker/pipeline_mlops",
  link: "",
  image: "/mlops.png",
},

  {
    category: "Data Engineering",
    title: {
      fr: "Trade Policy App",
      en: "Trade Policy App",
    },
    desc: {
      fr: "Application d'analyse et de simulation de politiques commerciales internationales. Exploration des impacts tarifaires et des flux d'échanges entre pays.",
      en: "Application for analyzing and simulating international trade policies. Exploration of tariff impacts and trade flows between countries.",
    },
    tech: ["Python", "Trade Policy", "Data Analysis"],
    github: "https://github.com/Eben-Ezer-maker/TradeAPP",
    link: "",
    image: "",
  },

  {
    category: "Data Analysis",
    title: {
      fr: "Projet Data Management",
      en: "Data Management Project",
    },
    desc: {
      fr: "Projet complet de gestion et de traitement de données : modélisation, nettoyage, transformation et analyse exploratoire de jeux de données complexes.",
      en: "Complete data management and processing project: modeling, cleaning, transformation and exploratory analysis of complex datasets.",
    },
    tech: ["Python", "Jupyter Notebook", "Data Management", "EDA"],
    github: "https://github.com/Eben-Ezer-maker/Projet-Data-management",
    link: "",
    image: "",
  },

];


// --- RESUME DATA ---
type ResumeTab = "formation" | "experience" | "competences";

const FORMATION = [
  {
    degree: { fr: "Master Sorbonne Data Analytics ", en: "Master Sorbonne Data Analytics " },
    school: "Université Paris 1 Panthéon-Sorbonne",
    period: "Oct. 2025 – présent",
    details: { fr: "Python, SQL, Machine Learning, Deep Learning, Power BI, Azure BI, Dataiku, GEN-AI, MLOps, Data Management", en: "Python, SQL, Machine Learning, Deep Learning, Power BI, Azure BI, Dataiku, GEN-AI, MLOps, Data Management" },
  },
  {
    degree: { fr: "Magistère 2 — Économie du développement (CERDI)", en: "Magistère 2 — Development Economics (CERDI)" },
    school: "Université Clermont-Auvergne",
    period: "Sept. 2025 – présent",
    details: { fr: "Économétrie appliquée, ACP, traitement de données d'enquêtes, risque de crédit et climatique", en: "Applied econometrics, PCA, survey data processing, credit and climate risk" },
  },
  {
    degree: { fr: "Magistère 1 — Économie (CERDI)", en: "Magistère 1 — Economics (CERDI)" },
    school: "Université Clermont-Auvergne",
    period: "2024 – 2025",
    details: { fr: "Économie appliquée, économétrie, macroéconomie quantitative", en: "Applied economics, econometrics, quantitative macroeconomics" },
  },
];

const EXPERIENCE = [
  {
    role: { fr: "Assistant de Recherche", en: "Research Assistant" },
    company: "Université de Sherbrooke — Canada",
    period: "Mai – Août 2026",
    bullets: {
      fr: ["Collecte, traitement de données et modélisation économétrique pour publications académiques", "Revue de littérature quantitative, rédaction de notes de recherche et présentation des résultats"],
      en: ["Data collection, processing and econometric modeling for academic publications", "Quantitative literature review, research notes writing and results presentation"],
    },
  },
  {
    role: { fr: "Enquêteur Mobilité & Trafic", en: "Mobility & Traffic Surveyor" },
    company: "Cqualite-T2C — Clermont-Ferrand",
    period: "Mars – Avr. 2025",
    bullets: {
      fr: ["Collecte terrain de données de fréquentation (bus et trams), structuration et nettoyage", "Analyse des données pour identifier les dysfonctionnements et produire des recommandations"],
      en: ["Field data collection on ridership (buses & trams), structuring and cleaning", "Data analysis to identify issues and produce service improvement recommendations"],
    },
  },
  {
    role: { fr: "Agent d'Enquêtes — Recensement national", en: "Survey Agent — National Census" },
    company: "Institut National de Statistique (INS) — Abidjan, Côte d'Ivoire",
    period: "Nov. – Déc. 2021",
    bullets: {
      fr: ["Collecte auprès de plusieurs centaines de ménages, contrôle qualité et rapports journaliers"],
      en: ["Data collection from hundreds of households, quality control and daily reporting"],
    },
  },
];

const SKILLS = [
  { category: { fr: "Langages", en: "Languages" }, items: ["Python", "SQL", "R", "VBA", "Excel"] },
  { category: { fr: "Data & BI", en: "Data & BI" }, items: ["Power BI", "DAX", "Modélisation étoile", "Web Scraping", "APIs", "Dataiku"] },
  { category: { fr: "Librairies ML", en: "ML Libraries" }, items: ["Scikit-learn", "XGBoost", "LightGBM", "Statsmodels", "Pandas", "NumPy"] },
  { category: { fr: "Visualisation", en: "Visualization" }, items: ["Streamlit", "Plotly", "Matplotlib", "Seaborn", "BeautifulSoup"] },
  { category: { fr: "Cloud & DevOps", en: "Cloud & DevOps" }, items: ["Azure", "AWS", "MLflow", "Git / GitHub", "CI/CD", "GitHub Actions"] },
  { category: { fr: "Économétrie", en: "Econometrics" }, items: ["Séries temporelles", "Variables instrumentales", "Modèles de panel", "ARMA/GARCH", "VAR"] },
];

const CERTIFICATIONS = [
  { name: "Dataiku Core Designer", issuer: "Dataiku" },
  { name: "Suivi & évaluation de projet", issuer: "AFD" },
];

const content = {
  fr: {
    greeting: "Salut, je suis",
    tagline: "Data Scientist · Data Analyst · Économiste quantitatif - je transforme les données en modèles, insights et recommandations.",
    cv: "Télécharger mon CV (FR)",
    github: "Mon GitHub",
    linkedin: "LinkedIn",
    available: "Disponible pour projets data · économétrie · dashboards",
    projects: "Mes Projets",
    resume: "Mon Parcours",
    contact: "Contact",
    resumeTabs: { formation: "Formation", experience: "Expériences", competences: "Compétences" },
    certif: "Certifications",
  },
  en: {
    greeting: "Hi, I'm",
    tagline: "Data Scientist · Data Analyst · Quantitative Economist — I turn data into models, insights, and decisions.",
    cv: "Download my resume (EN)",
    github: "My GitHub",
    linkedin: "LinkedIn",
    available: "Available for data · econometrics · dashboards projects",
    projects: "My Projects",
    resume: "My Journey",
    contact: "Contact",
    resumeTabs: { formation: "Education", experience: "Experience", competences: "Skills" },
    certif: "Certifications",
  },
};

const TABS: Tab[] = ["Data Science", "Data Analysis", "Econometrics", "Data Engineering"];

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

export default function Home() {
  const [tab, setTab] = useState<Tab>("Data Science");
  const [lang, setLang] = useState<Lang>("fr");
  const [resumeTab, setResumeTab] = useState<ResumeTab>("formation");
  const [formState, setFormState] = useState<"idle"|"sending"|"sent"|"error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const t = content[lang];

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const subtitle = useMemo(() => {
    switch (tab) {
      case "Data Science":
        return lang === "fr"
          ? "Modèles prédictifs, NLP, ML, évaluation & déploiement."
          : "Predictive models, NLP, ML, evaluation & deployment.";
      case "Data Analysis":
        return lang === "fr"
          ? "Dashboards, KPI, storytelling, insights actionnables."
          : "Dashboards, KPI, storytelling, actionable insights.";
      case "Econometrics":
        return lang === "fr"
          ? "Causalité, panel, séries temporelles, identification."
          : "Causality, panel data, time series, identification.";
      case "Data Engineering":
        return lang === "fr"
          ? "Modélisation de données, ETL, pipelines, architecture."
          : "Data modeling, ETL, pipelines, architecture.";
      default:
        return "";
    }
  }, [tab, lang]);

  // === BACKGROUND CANVAS (neural / particles) ===
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0,
      h = 0,
      raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const particles: Particle[] = [];
    const N = 75;
    const maxDist = 150;
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < N; i++) {
        particles.push({
          x: rand(0, w),
          y: rand(0, h),
          vx: rand(-0.35, 0.35),
          vy: rand(-0.35, 0.35),
          r: rand(1.1, 2.1),
        });
      }
    };

    const step = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(7, 10, 18, 0.20)";
      ctx.fillRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = 1 - dist / maxDist;
            ctx.lineWidth = 1;

            // BLUE palette
            ctx.strokeStyle = `rgba(59,130,246,${0.18 * alpha})`; // blue-500
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();

            ctx.strokeStyle = `rgba(56,189,248,${0.10 * alpha})`; // sky-400
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 18);
        g.addColorStop(0, "rgba(59,130,246,0.10)"); // blue halo
        g.addColorStop(1, "rgba(59,130,246,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 18, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "rgba(226,232,240,0.55)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(step);
    };

    const onResize = () => {
      resize();
      init();
    };
    resize();
    init();
    raf = requestAnimationFrame(step);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#070A12] text-white selection:bg-blue-500/30">
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0 opacity-90" />

      {/* GLOW */}
      <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-48 right-[-120px] h-[520px] w-[520px] rounded-full bg-sky-400/20 blur-3xl animate-pulse" />
      </div>

      {/* ===== NAVBAR ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 backdrop-blur-md bg-[#070A12]/80 border-b border-white/5">
        <span className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-sky-300 bg-clip-text text-transparent tracking-wide">
          Eben-Ezer N&apos;guessan
        </span>
        <div className="flex items-center gap-1">
          {([
            { label: lang === "fr" ? "Accueil" : "Home", href: "#accueil" },
            { label: lang === "fr" ? "Projets" : "Projects", href: "#projets" },
            { label: lang === "fr" ? "Parcours" : "Journey", href: "#parcours" },
            { label: "Contact", href: "#contact" },
          ] as {label:string;href:string}[]).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 text-xs font-medium text-white/60 hover:text-white rounded-lg hover:bg-white/8 transition-all"
            >
              {item.label}
            </a>
          ))}
          <div className="ml-3 flex gap-1 border-l border-white/10 pl-3">
            <button onClick={() => setLang("fr")} className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${lang === "fr" ? "bg-blue-500 text-white" : "text-white/40 hover:text-white"}`}>FR</button>
            <button onClick={() => setLang("en")} className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${lang === "en" ? "bg-blue-500 text-white" : "text-white/40 hover:text-white"}`}>EN</button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pt-28 pb-16">

        {/* HERO */}
        <section id="accueil" className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-500/50 via-sky-400/40 to-cyan-400/40 blur-md opacity-70 animate-pulse" />
            <div className="relative h-60 w-60 overflow-hidden rounded-full ring-1 ring-white/15">
              <Image src="/eben1.png" alt="Photo de profil" fill className="object-cover" priority />
            </div>
          </div>

          <h1 className="mt-8 text-4xl font-extrabold sm:text-5xl">
            {t.greeting}{" "}
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-cyan-300 bg-clip-text text-transparent">
              Eben-Ezer N&apos;guessan
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-white/75">{t.tagline}</p>

          {/* BUTTONS */}
          
          <div className="mt-10 grid w-full max-w-xl grid-cols-1 gap-4 sm:grid-cols-3">
            
            {/* 1. Bouton CV */}
            <a 
              href="NGUESSAN_YAO_EBEN_EZER_CV_.pdf"  // <--- C'est ici qu'on met le lien du fichier (dans le dossier public)
              target="_blank"     // Ouvre dans un nouvel onglet
              className="relative overflow-hidden rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:-translate-y-0.5 transition flex items-center justify-center"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-sky-500" />
              <span className="relative">{t.cv}</span>
            </a>

            {/* 2. Bouton GitHub */}
            <a 
              href="https://github.com/Eben-Ezer-maker" // <--- Remplace par ton lien GitHub
              target="_blank"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm hover:bg-white/10 flex items-center justify-center transition"
            >
              {t.github}
            </a>

            {/* 3. Bouton LinkedIn */}
            <a 
              href="https://www.linkedin.com/feed/" // <--- Remplace par ton lien LinkedIn
              target="_blank"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm hover:bg-white/10 flex items-center justify-center transition"
            >
              {t.linkedin}
            </a>
          </div>

          <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70">
            <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            {t.available}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projets" className="mt-20">
          <h2 className="text-center text-3xl font-bold">{t.projects}</h2>
          
          {/* ONGLETS */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {TABS.map((tt) => (
              <button
                key={tt}
                onClick={() => setTab(tt)}
                className={`rounded-xl border px-4 py-3 text-sm transition-all ${
                  tt === tab ? "ring-2 ring-blue-400/60 bg-white/10 border-transparent" : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                {tt}
              </button>
            ))}
          </div>

          <p className="mt-8 text-center text-white/70 italic">{subtitle}</p>

          {/* GRILLE DES PROJETS */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS_DATA.filter((project) => project.category === tab).map((project, index) => (
              <div
                key={index}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111827] shadow-xl transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10"
              >
                {/* 1. IMAGE DU PROJET */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-800">
                  <div className={`absolute inset-0 bg-gradient-to-br from-blue-900 to-slate-900 ${project.image ? 'hidden' : 'block'}`} />
                  
                  {project.image && (
                    <Image 
                      src={project.image} 
                      alt={project.title[lang]} 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  )}
                  
                  <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                {/* 2. CONTENU DE LA CARTE */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <h3 className="text-xl font-bold text-blue-100 group-hover:text-blue-400 transition-colors">
                      {project.title[lang]}
                    </h3>
                    
                    {/* LIENS */}
                    <div className="flex gap-2">
                      {project.github && (
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noreferrer"
                          title="Code Source"
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-blue-600 transition-all"
                        >
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        </a>
                      )}
                      {project.link && project.link !== "#" && (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noreferrer"
                          title="Demo Live"
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-blue-600 transition-all"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 mb-6 line-clamp-3">{project.desc[lang]}</p>

                  <div className="mt-auto flex flex-wrap gap-2 pt-4 border-t border-white/5">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech} 
                        className="rounded px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-blue-300 bg-blue-900/20 border border-blue-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message si aucun projet */}
          {PROJECTS_DATA.filter((p) => p.category === tab).length === 0 && (
            <div className="mt-20 flex flex-col items-center justify-center text-white/30">
              <div className="text-4xl mb-4">🚧</div>
              <p>Section en construction...</p>
            </div>
          )}
        </section>

        {/* ===== SECTION PARCOURS ===== */}
        <section id="parcours" className="mt-28">
          <h2 className="text-center text-3xl font-bold">{t.resume}</h2>

          {/* Onglets */}
          <div className="mt-10 flex justify-center gap-3 flex-wrap">
            {(["formation", "experience", "competences"] as ResumeTab[]).map((rt) => (
              <button
                key={rt}
                onClick={() => setResumeTab(rt)}
                className={`rounded-xl px-6 py-2.5 text-sm font-medium transition-all border ${
                  resumeTab === rt
                    ? "bg-gradient-to-r from-blue-600 to-sky-500 border-transparent text-white shadow-lg shadow-blue-500/20"
                    : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                {t.resumeTabs[rt]}
              </button>
            ))}
          </div>

          <div className="mt-10">
            {/* FORMATION */}
            {resumeTab === "formation" && (
              <div className="relative pl-6 border-l border-blue-500/30 space-y-10 max-w-3xl mx-auto">
                {FORMATION.map((f, i) => (
                  <div key={i} className="relative">
                    <span className="absolute -left-[25px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 ring-4 ring-[#070A12]">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-6 hover:border-blue-500/30 transition-all hover:bg-white/[0.05]">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                        <h3 className="text-base font-semibold text-white">{f.degree[lang]}</h3>
                        <span className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 shrink-0">{f.period}</span>
                      </div>
                      <p className="text-sm text-sky-400 font-medium mb-3">{f.school}</p>
                      <p className="text-sm text-white/50 leading-relaxed">{f.details[lang]}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* EXPERIENCE */}
            {resumeTab === "experience" && (
              <div className="relative pl-6 border-l border-blue-500/30 space-y-10 max-w-3xl mx-auto">
                {EXPERIENCE.map((e, i) => (
                  <div key={i} className="relative">
                    <span className="absolute -left-[25px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-sky-500 ring-4 ring-[#070A12]">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-6 hover:border-sky-500/30 transition-all hover:bg-white/[0.05]">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                        <h3 className="text-base font-semibold text-white">{e.role[lang]}</h3>
                        <span className="text-xs px-3 py-1 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/20 shrink-0">{e.period}</span>
                      </div>
                      <p className="text-sm text-sky-400 font-medium mb-4">{e.company}</p>
                      <ul className="space-y-2">
                        {e.bullets[lang].map((b, j) => (
                          <li key={j} className="flex gap-3 text-sm text-white/55 leading-relaxed">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* COMPETENCES */}
            {resumeTab === "competences" && (
              <div className="max-w-4xl mx-auto">
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {SKILLS.map((s, i) => (
                    <div key={i} className="rounded-2xl border border-white/8 bg-white/[0.03] p-5 hover:border-blue-500/30 hover:bg-white/[0.05] transition-all">
                      <h3 className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">{s.category[lang]}</h3>
                      <div className="flex flex-wrap gap-2">
                        {s.items.map((item) => (
                          <span key={item} className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:border-blue-500/40 hover:text-white transition-all">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Certifications */}
                <div className="mt-8 rounded-2xl border border-amber-500/20 bg-amber-500/[0.03] p-6">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4">{t.certif}</h3>
                  <div className="flex flex-wrap gap-3">
                    {CERTIFICATIONS.map((c, i) => (
                      <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-amber-500/20">
                        <svg className="h-3.5 w-3.5 text-amber-400 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                        <span className="text-sm text-white/80 font-medium">{c.name}</span>
                        <span className="text-xs text-white/40">— {c.issuer}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ===== SECTION CONTACT ===== */}
        <section id="contact" className="mt-28 mb-10">
          <h2 className="text-center text-3xl font-bold">{t.contact}</h2>
          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.6fr] max-w-5xl mx-auto">

            {/* COLONNE GAUCHE — infos */}
            <div className="flex flex-col gap-5">
              {/* Carte info */}
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-6 space-y-5">
                <p className="text-sm text-white/50 leading-relaxed">
                  {lang === "fr"
                    ? "N'hésitez pas à me contacter pour toute opportunité, collaboration ou question."
                    : "Feel free to reach out for any opportunity, collaboration or question."}
                </p>
                <div className="space-y-3">
                  {[
                    { icon: <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>, label: "ebenezeressan@gmail.com" },
                    { icon: <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>, label: "+33 7 45 52 72 55" },
                    { icon: <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>, label: "Paris, France" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-white/60">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 shrink-0">{item.icon}</span>
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Liens sociaux */}
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">Retrouvons-nous</p>
                <div className="flex gap-3">
                  <a href="https://github.com/Eben-Ezer-maker" target="_blank" rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-blue-500/20 hover:text-blue-400 hover:border-blue-500/40 transition-all">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </a>
                  <a href="https://www.linkedin.com/in/eben-ezer-n-guessan" target="_blank" rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-sky-500/20 hover:text-sky-400 hover:border-sky-500/40 transition-all">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                  <a href="mailto:ebenezeressan@gmail.com"
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-blue-500/20 hover:text-blue-400 hover:border-blue-500/40 transition-all">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
                  </a>
                </div>
              </div>
            </div>

            {/* COLONNE DROITE — formulaire Formspree */}
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-7 space-y-5">
              {formState === "sent" ? (
                <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 border border-green-500/30">
                    <svg className="h-8 w-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <p className="text-white font-semibold text-lg">{lang === "fr" ? "Message envoyé !" : "Message sent!"}</p>
                  <p className="text-white/50 text-sm">{lang === "fr" ? "Je vous répondrai dans les plus brefs délais." : "I will get back to you as soon as possible."}</p>
                  <button onClick={() => { setFormState("idle"); setFormData({ name: "", email: "", subject: "", message: "" }); }} className="mt-2 text-xs text-blue-400 hover:text-blue-300 transition-all">
                    {lang === "fr" ? "Envoyer un autre message" : "Send another message"}
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-white/40 uppercase tracking-wider">{lang === "fr" ? "Votre nom" : "Your name"}</label>
                      <input type="text" value={formData.name} onChange={e => setFormData(p => ({...p, name: e.target.value}))} placeholder={lang === "fr" ? "Jean Dupont" : "John Doe"} className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500/60 transition-all" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-white/40 uppercase tracking-wider">Email</label>
                      <input type="email" value={formData.email} onChange={e => setFormData(p => ({...p, email: e.target.value}))} placeholder="votre@email.com" className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500/60 transition-all" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-white/40 uppercase tracking-wider">{lang === "fr" ? "Objet" : "Subject"}</label>
                    <input type="text" value={formData.subject} onChange={e => setFormData(p => ({...p, subject: e.target.value}))} placeholder={lang === "fr" ? "Sujet de votre message" : "Your subject"} className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500/60 transition-all" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-white/40 uppercase tracking-wider">Message</label>
                    <textarea rows={6} value={formData.message} onChange={e => setFormData(p => ({...p, message: e.target.value}))} placeholder={lang === "fr" ? "Votre message..." : "Your message..."} className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500/60 transition-all resize-none" />
                  </div>
                  {formState === "error" && (
                    <p className="text-red-400 text-xs">{lang === "fr" ? "Une erreur est survenue. Réessayez." : "An error occurred. Please try again."}</p>
                  )}
                  <button
                    onClick={async () => {
                      if (!formData.name || !formData.email || !formData.message) return;
                      setFormState("sending");
                      try {
                        const res = await fetch("https://formspree.io/f/mlgajayn", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ name: formData.name, email: formData.email, subject: formData.subject, message: formData.message }),
                        });
                        if (res.ok) setFormState("sent");
                        else setFormState("error");
                      } catch { setFormState("error"); }
                    }}
                    disabled={formState === "sending"}
                    className="w-full relative overflow-hidden rounded-xl py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-sky-500" />
                    <span className="relative">
                      {formState === "sending"
                        ? (lang === "fr" ? "Envoi en cours..." : "Sending...")
                        : (lang === "fr" ? "Envoyer le message" : "Send message")}
                    </span>
                    {formState !== "sending" && <svg className="relative h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>}
                  </button>
                </>
              )}
            </div>
          </div>
        </section>

        <footer className="mt-10 text-center text-xs text-white/25 pb-8">
          © {new Date().getFullYear()} Eben-Ezer N'guessan
        </footer>
      </div>
    </div>
  );
}