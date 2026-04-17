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
    
    // 👇 1. METS TON LIEN GITHUB ENTRE LES GUILLEMETS ICI
    github: "",
    
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
    github: "",
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
  github: "",
  link: "",
  image: "/azure.png", // Tu peux ajouter une image de diagramme d'architecture cloud ou de pipelines de données
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
  github: "https://github.com/Ebenezer-nguessan/pipeline_mlops",
  link: "",
  image: "/mlops.png", // Tu peux ajouter une image de diagramme de pipeline MLOps ou d'interface MLflow
},

];


const content = {
  fr: {
    greeting: "Salut, je suis",
    tagline:
      "Data Scientist · Data Analyst · Économiste quantitatif - je transforme les données en modèles, insights et recommandations.",
    cv: "Télécharger mon CV (FR)",
    github: "Mon GitHub",
    linkedin: "LinkedIn",
    available: "Disponible pour projets data · économétrie · dashboards",
    projects: "Mes Projets",
    
  },
  en: {
    greeting: "Hi, I'm",
    tagline:
      "Data Scientist · Data Analyst · Quantitative Economist — I turn data into models, insights, and decisions.",
    cv: "Download my resume (EN)",
    github: "My GitHub",
    linkedin: "LinkedIn",
    available: "Available for data · econometrics · dashboards projects",
    projects: "My Projects",
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

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 py-16">
        {/* LANGUAGE TOGGLE (sans enlever le reste) */}
        <div className="absolute right-6 top-6 flex gap-2">
          <button
            onClick={() => setLang("fr")}
            className={`rounded-full px-3 py-1 text-xs transition ${
              lang === "fr"
                ? "bg-blue-500 text-black"
                : "border border-white/20 text-white/70 hover:bg-white/10"
            }`}
          >
            FR
          </button>
          <button
            onClick={() => setLang("en")}
            className={`rounded-full px-3 py-1 text-xs transition ${
              lang === "en"
                ? "bg-blue-500 text-black"
                : "border border-white/20 text-white/70 hover:bg-white/10"
            }`}
          >
            EN
          </button>
        </div>

        {/* HERO */}
        <section className="flex flex-col items-center text-center">
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
              href="EbenEzer_s_resume.pdf"  // <--- C'est ici qu'on met le lien du fichier (dans le dossier public)
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
        <section className="mt-20">
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

        <footer className="mt-20 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Ebene
        </footer>
      </div>
    </div>
  );
}