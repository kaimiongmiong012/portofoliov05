/* =========================================================
   PORTFOLIO V0.5 — CENTRAL DATA & BILINGUAL CONTENT
   ========================================================= */

window.PORTFOLIO_DATA = {
  // Drop your portrait inside assets/ (e.g. "assets/portrait.jpg") when ready
  portraitImage: "",

  contact: {
    outlook: "fauzakaizakusetiawan@student.telkomuniversity.ac.id",
    gmail: "kaizaku.telkomuniv@gmail.com",
    whatsappUrl: "https://wa.me/6280000000000", // Replace with your active WA number
    github: "https://github.com/kaimiongmiong012",
    linkedin: "https://www.linkedin.com/in/fauza-kaizaku-439338327",
    instagram: "https://www.instagram.com/kaieaych"
  },

  /* ---------------------------------------------------------
     HERO 3D MONOLITH PILLARS (Balanced 2-Line Captions)
     --------------------------------------------------------- */
  heroPillars: [
    {
      badge: "01 // UI/UX ARCHITECTURE",
      caption: {
        en: "HCI-DRIVEN INTERFACE SYSTEMS & CLEAN PRODUCT ARCHITECTURE",
        id: "SISTEM ANTARMUKA BERBASIS HCI & ARSITEKTUR PRODUK BERSIH"
      },
      shape: "monolith"
    },
    {
      badge: "02 // FULL-STACK & WEBGL",
      caption: {
        en: "FULL-STACK LARAVEL, MARIADB, PIXEL CANVAS & THREE.JS 3D ENGINES",
        id: "FULL-STACK LARAVEL, MARIADB, PIXEL CANVAS & ENGINE THREE.JS 3D"
      },
      shape: "octa"
    },
    {
      badge: "03 // GAME DEV & HCI QOL",
      caption: {
        en: "UNITY, UNREAL ENGINE & PLAYABLE RETRO TAPE CARTRIDGES",
        id: "UNITY, UNREAL ENGINE & CARTRIDGE KASET GAME BROWSER"
      },
      shape: "torus"
    }
  ],

  /* ---------------------------------------------------------
     ABOUT INTERACTIVE FOCUS MODES (Copy + 3 Structured Cards)
     --------------------------------------------------------- */
  aboutFocus: {
    hci: {
      en: {
        lead: "I ORGANIZE CONCEPTS, DEFINE USER FLOWS, AND SHAPE CLEAN INTERFACES BEFORE HEAVY CODE BEGINS.",
        body: "Focused on Human-Computer Interaction and practical Quality of Life software design. I prefer calm, non-complicated visual hierarchies where every click, contrast ratio, and layout decision has a clear purpose.",
        highlights: [
          {
            kicker: "01 // RESEARCH",
            title: "HCI & QOL FLOWS",
            desc: "Mapping real user friction into minimal, low-cognitive-load workflows."
          },
          {
            kicker: "02 // DESIGN",
            title: "FIGMA & CANVA SYSTEMS",
            desc: "Component-driven wireframes, tactile visual hierarchies, and crisp decks."
          },
          {
            kicker: "03 // VALIDATION",
            title: "USABILITY FIRST",
            desc: "Testing layouts directly with staff and peers before locking production code."
          }
        ]
      },
      id: {
        lead: "SAYA MENYUSUN KONSEP, ALUR PENGGUNA, DAN ANTARMUKA BERSIH SEBELUM KODE BERAT DIMULAI.",
        body: "Berfokus pada Human-Computer Interaction dan desain perangkat lunak Quality of Life. Saya mengutamakan hierarki visual yang minimalis, efisien, dan berpusat pada kenyamanan pengguna.",
        highlights: [
          {
            kicker: "01 // RISET",
            title: "ALUR HCI & QOL",
            desc: "Memetakan hambatan pengguna menjadi alur kerja ringkas yang mudah dipahami."
          },
          {
            kicker: "02 // DESAIN",
            title: "SISTEM FIGMA & CANVA",
            desc: "Wireframe berbasis komponen, hierarki visual taktil, dan presentasi rapi."
          },
          {
            kicker: "03 // VALIDASI",
            title: "UTAMAKAN USABILITY",
            desc: "Menguji tata letak langsung bersama staf dan pengguna sebelum produksi."
          }
        ]
      }
    },
    web: {
      en: {
        lead: "BRIDGING FIGMA PROTOTYPES WITH REAL PRODUCTION CODE, DATABASES, AND INTERACTIVE GRAPHICS.",
        body: "Experienced in enterprise Laravel & MariaDB web apps from my PT. Telkom Indonesia Regional IV internship, custom WordPress storefronts, and procedural HTML5 Canvas / Three.js WebGL game engines.",
        highlights: [
          {
            kicker: "01 // ENTERPRISE",
            title: "LARAVEL & MARIADB",
            desc: "Role-secured CRUD dashboards, inventory logs, and Huawei openGauss SQL."
          },
          {
            kicker: "02 // FRONT-END",
            title: "MOTION & 3D WEBGL",
            desc: "Responsive HTML/CSS/JS enhanced with GSAP physics and Three.js scenes."
          },
          {
            kicker: "03 // INTERACTIVE",
            title: "GAME & CANVAS ENGINES",
            desc: "Custom 16-bit pixel engines, Unity 2D/Unreal prototypes, and Web Audio SFX."
          }
        ]
      },
      id: {
        lead: "MENGHUBUNGKAN PROTOTIPE FIGMA DENGAN KODE PRODUKSI, DATABASE, DAN GRAFIS INTERAKTIF.",
        body: "Berpengalaman membangun aplikasi web Laravel & MariaDB saat magang di PT. Telkom Indonesia Regional IV, storefront WordPress kustom, serta engine game HTML5 Canvas dan Three.js.",
        highlights: [
          {
            kicker: "01 // ENTERPRISE",
            title: "LARAVEL & MARIADB",
            desc: "Dashboard CRUD berbasis peran, log inventaris, dan SQL Huawei openGauss."
          },
          {
            kicker: "02 // FRONT-END",
            title: "GERAK & 3D WEBGL",
            desc: "HTML/CSS/JS responsif dengan fisika GSAP dan objek Three.js interaktif."
          },
          {
            kicker: "03 // INTERAKTIF",
            title: "ENGINE GAME & CANVAS",
            desc: "Engine piksel 16-bit, prototipe Unity/Unreal, dan audio Web Audio."
          }
        ]
      }
    },
    english: {
      en: {
        lead: "OFFICIAL ETS TOEIC 905 — AVAILABLE FOR PRIVATE ENGLISH TUTORING & INTERVIEW COACHING.",
        body: "Combining professional-level English proficiency (Listening 490 / Reading 415) with real tech-industry presentation habits. I help students and peers sharpen spoken fluency, TOEIC strategy, and technical interviews.",
        highlights: [
          {
            kicker: "01 // CREDENTIAL",
            title: "ETS TOEIC 905 / 990",
            desc: "Listening 490 & Reading 415 — International Professional Proficiency."
          },
          {
            kicker: "02 // COACHING",
            title: "INTERVIEW & SPEAKING",
            desc: "Practical spoken drills for tech internships, pitches, and daily fluency."
          },
          {
            kicker: "03 // GLOBAL",
            title: "CROSS-CULTURAL HOST",
            desc: "Active INTERVOL team member welcoming international guests at campus."
          }
        ]
      },
      id: {
        lead: "SKOR RESMI ETS TOEIC 905 — TERSEDIA UNTUK LES PRIVAT BAHASA INGGRIS & COACHING WAWANCARA.",
        body: "Memadukan kemahiran bahasa Inggris tingkat profesional (Listening 490 / Reading 415) dengan komunikasi presentasi teknologi untuk membantu persiapan TOEIC, percakapan, dan wawancara kerja.",
        highlights: [
          {
            kicker: "01 // SERTIFIKASI",
            title: "ETS TOEIC 905 / 990",
            desc: "Listening 490 & Reading 415 — Kemahiran Profesional Internasional."
          },
          {
            kicker: "02 // COACHING",
            title: "WAWANCARA & SPEAKING",
            desc: "Latihan berbicara praktis untuk magang teknologi, presentasi, dan harian."
          },
          {
            kicker: "03 // GLOBAL",
            title: "KOMUNIKASI GLOBAL",
            desc: "Aktif di organisasi INTERVOL dalam penyambutan tamu internasional kampus."
          }
        ]
      }
    }
  },

  /* ---------------------------------------------------------
     EDUCATION & TRACK (EXACT 5 REAL STOPS — ZERO YEARS)
     --------------------------------------------------------- */
  educationTrack: [
    {
      id: "tup",
      type: "academic",
      stage: { en: "HIGHER EDUCATION", id: "PERGURUAN TINGGI" },
      badge: { en: "5TH SEMESTER", id: "SEMESTER 5" },
      name: "TELKOM UNIVERSITY PURWOKERTO",
      role: {
        en: "B.Sc. Informatics Engineering — Human-Computer Interaction & Quality of Life Focus",
        id: "S1 Teknik Informatika — Fokus Human-Computer Interaction & Quality of Life"
      },
      city: "PURWOKERTO, CENTRAL JAVA",
      lat: -7.4352631,
      lng: 109.2490926,
      zoom: 17,
      mapQuery: "Telkom+University+Purwokerto",
      image: ""
    },
    {
      id: "telkom-reg4",
      type: "industry",
      stage: { en: "INDUSTRIAL INTERNSHIP", id: "MAGANG INDUSTRI" },
      badge: { en: "SANGAT KOMPETEN", id: "SANGAT KOMPETEN" },
      name: "PT. TELKOM INDONESIA REGIONAL IV",
      role: {
        en: "Web Developer & UI/UX Intern — Networking Division (Built ISIM Inventory Platform)",
        id: "Magang Web Developer & UI/UX — Divisi Networking (Membangun Sistem Inventaris ISIM)"
      },
      city: "SEMARANG, CENTRAL JAVA",
      lat: -6.99262,
      lng: 110.42275,
      zoom: 17,
      mapQuery: "Telkom+Regional+IV+Semarang",
      image: "assets/telkom-team.jpg",
      imageTag: "TELKOM REG IV • AKHLAK TEAM"
    },
    {
      id: "smkn1-pwt",
      type: "academic",
      stage: { en: "VOCATIONAL HIGH SCHOOL", id: "SEKOLAH MENENGAH KEJURUAN" },
      badge: { en: "ACADEMIC", id: "AKADEMIK" },
      name: "SMKN 1 PURWOKERTO",
      role: {
        en: "Vocational High School — Software, Web Fundamentals & Practical Technical Track",
        id: "Sekolah Menengah Kejuruan — Dasar Perangkat Lunak, Web & Jalur Teknis"
      },
      city: "PURWOKERTO, CENTRAL JAVA",
      lat: -7.41935,
      lng: 109.25128,
      zoom: 17,
      mapQuery: "SMK+Negeri+1+Purwokerto",
      image: ""
    },
    {
      id: "smpn24-smg",
      type: "academic",
      stage: { en: "JUNIOR HIGH SCHOOL", id: "SEKOLAH MENENGAH PERTAMA" },
      badge: { en: "ACADEMIC", id: "AKADEMIK" },
      name: "SMPN 24 SEMARANG",
      role: {
        en: "Junior High School — General Academic & Foundational STEM Studies",
        id: "Sekolah Menengah Pertama — Pendidikan Akademik Umum & Fondasi STEM"
      },
      city: "SEMARANG, CENTRAL JAVA",
      lat: -7.0583,
      lng: 110.4202,
      zoom: 17,
      mapQuery: "SMP+Negeri+24+Semarang",
      image: ""
    },
    {
      id: "sd-sapen",
      type: "academic",
      stage: { en: "ELEMENTARY SCHOOL", id: "SEKOLAH DASAR" },
      badge: { en: "ACADEMIC", id: "AKADEMIK" },
      name: "SD MUHAMMADIYAH SAPEN YOGYAKARTA",
      role: {
        en: "Elementary School — Early Academic Foundation",
        id: "Sekolah Dasar — Fondasi Pendidikan Dasar"
      },
      city: "YOGYAKARTA, SPECIAL REGION OF YOGYAKARTA",
      lat: -7.7867,
      lng: 110.3917,
      zoom: 17,
      mapQuery: "SD+Muhammadiyah+Sapen+Yogyakarta",
      image: ""
    }
  ],

  /* ---------------------------------------------------------
     PROJECTS CASE STUDIES (ISIM YOUTUBE EMBED + OFFICE GALLERY)
     --------------------------------------------------------- */
  projects: {
    isim: {
      tag: { en: "FLAGSHIP ENTERPRISE CASE STUDY", id: "STUDI KASUS ENTERPRISE UTAMA" },
      stamp: "SANGAT KOMPETEN",
      title: "ISIM — INVENTORY MANAGEMENT SYSTEM",
      body: {
        en: "Designed and engineered during my internship at PT. Telkom Indonesia Regional IV Semarang for the Networking Division. ISIM replaced scattered spreadsheet tracking with a role-secured Laravel & MariaDB dashboard featuring real-time stock analytics, incoming/outgoing transaction logs, CAPTCHA + email verification security, and exportable operational reports.",
        id: "Dirancang dan dibangun selama magang di PT. Telkom Indonesia Regional IV Semarang untuk Divisi Networking. ISIM menggantikan pencatatan spreadsheet manual dengan dashboard Laravel & MariaDB berkeamanan peran, analitik stok real-time, log barang masuk/keluar, CAPTCHA + verifikasi email, dan laporan operasional."
      },
      media: [
        {
          id: "video",
          label: { en: "▶ WALKTHROUGH DEMO", id: "▶ DEMO WALKTHROUGH" },
          type: "youtube",
          videoId: "9BANlAc9Ir8",
          caption: {
            en: "Live ISIM walkthrough video — click the preview thumbnail to play directly inside this window.",
            id: "Video walkthrough langsung ISIM — klik pratinjau thumbnail untuk memutar langsung di jendela ini."
          }
        },
        {
          id: "ui",
          label: { en: "DASHBOARD UI", id: "UI DASHBOARD" },
          type: "image",
          src: "assets/isim-ui.jpg",
          caption: {
            en: "Clean inventory dashboard interface built for daily Networking Division operations.",
            id: "Antarmuka dashboard inventaris bersih untuk operasional harian Divisi Networking."
          }
        },
        {
          id: "desk",
          label: { en: "OFFICE DEPLOYMENT", id: "LINGKUNGAN KANTOR" },
          type: "image",
          src: "assets/isim-desk.jpg",
          caption: {
            en: "On-site development and testing desk at PT. Telkom Indonesia Regional IV Semarang.",
            id: "Lingkungan pengembangan dan pengujian langsung di PT. Telkom Indonesia Regional IV Semarang."
          }
        },
        {
          id: "team",
          label: { en: "REG IV TEAM", id: "TIM REG IV" },
          type: "image",
          src: "assets/telkom-team.jpg",
          caption: {
            en: "With the PT. Telkom Indonesia Regional IV Networking Division team (AKHLAK core values).",
            id: "Bersama tim Divisi Networking PT. Telkom Indonesia Regional IV (nilai inti AKHLAK)."
          }
        }
      ],
      archSteps: [
        { step: "01", label: "USER FLOW & WIREFRAME" },
        { step: "02", label: "MARIADB SCHEMA & AUTH" },
        { step: "03", label: "LARAVEL CRUD & CHARTS" },
        { step: "04", label: "STAFF UAT & HANDOVER" }
      ],
      specs: [
        {
          label: "CORE STACK",
          text: "Laravel (PHP), Python utilities, MariaDB relational database, responsive HTML/CSS/JS."
        },
        {
          label: "SECURITY & ACCESS",
          text: "Role-based staff permissions, login CAPTCHA protection, and email verification workflow."
        },
        {
          label: "KEY MODULES",
          text: "Master item registry, category controls, incoming/outgoing logs, and live inventory charts."
        },
        {
          label: "EVALUATION",
          text: "Rated SANGAT KOMPETEN (Very Competent) by PT. Telkom Indonesia Regional IV supervisors."
        }
      ]
    },
    ecommerce: {
      tag: { en: "RETAIL WEB ARCHITECTURE", id: "ARSITEKTUR WEB RITEL" },
      stamp: "",
      title: "APPAREL E-COMMERCE PLATFORM",
      body: {
        en: "A minimalist fashion storefront inspired by high-clarity modern retail grids. Focused on frictionless mobile browsing, clean product detail hierarchy, automated Indonesian payment gateways, and transparent live shipment tracking.",
        id: "Toko ritel pakaian minimalis yang terinspirasi grid ritel modern. Berfokus pada navigasi mobile tanpa hambatan, hierarki detail produk yang jelas, integrasi pembayaran Indonesia, dan pelacakan pengiriman langsung."
      },
      media: [],
      archSteps: [
        { step: "01", label: "CATALOG IA & GRID" },
        { step: "02", label: "CUSTOM FRONT-END" },
        { step: "03", label: "MIDTRANS / XENDIT" },
        { step: "04", label: "LIVE SHIPMENT SYNC" }
      ],
      specs: [
        {
          label: "PLATFORM",
          text: "WordPress core paired with custom HTML, CSS, and JavaScript storefront components."
        },
        {
          label: "CHECKOUT FLOW",
          text: "Integrated Midtrans, Xendit, virtual accounts, e-wallets, and manual bank transfer verification."
        },
        {
          label: "UX PRIORITY",
          text: "High-contrast size selectors, distraction-free cart drawer, and fast mobile image loading."
        },
        {
          label: "FULFILLMENT",
          text: "Automated courier rate estimation and real-time order tracking status for buyers."
        }
      ]
    }
  },

  /* ---------------------------------------------------------
     CREDENTIALS DECK (EXACT 5 ASSETS + PORTRAIT/LANDSCAPE ORIENTATION)
     --------------------------------------------------------- */
  credentials: [
    {
      num: "01",
      accent: true,
      orientation: "landscape",
      issuer: "PT. TELKOM INDONESIA REGIONAL IV",
      title: "INDUSTRIAL INTERNSHIP — SANGAT KOMPETEN",
      meta: "SEMARANG, INDONESIA • NETWORKING DIVISION",
      image: "assets/cert-telkom.jpg",
      fallbackLabel: "CERT-TELKOM.JPG",
      desc: {
        en: "Completed an enterprise Web Development and UI/UX internship in the Networking Division at PT. Telkom Indonesia Regional IV Semarang. Awarded the highest competency rating (Sangat Kompeten) for building and delivering the internal ISIM inventory management platform.",
        id: "Menyelesaikan magang Web Development dan UI/UX di Divisi Networking PT. Telkom Indonesia Regional IV Semarang. Meraih predikat tertinggi (Sangat Kompeten) atas pembangunan sistem manajemen inventaris internal ISIM."
      }
    },
    {
      num: "02",
      accent: false,
      orientation: "portrait",
      issuer: "EDUCATIONAL TESTING SERVICE (ETS)",
      title: "OFFICIAL TOEIC SCORE — 905 / 990",
      meta: "LISTENING 490 • READING 415",
      image: "assets/cert-toeic.jpg",
      fallbackLabel: "CERT-TOEIC.JPG",
      desc: {
        en: "Achieved an official ETS TOEIC score of 905, reflecting International Professional Proficiency in English communication, technical documentation, cross-cultural collaboration, and executive presentation.",
        id: "Meraih skor resmi ETS TOEIC 905 yang mencerminkan kemahiran bahasa Inggris tingkat profesional internasional untuk komunikasi kerja, dokumentasi teknis, dan presentasi."
      }
    },
    {
      num: "03",
      accent: false,
      orientation: "portrait",
      issuer: "HUAWEI ICT ACADEMY",
      title: "HCIE-OPENGAUSS V1.0 COURSE",
      meta: "ISSUED 2026-04-07 • CODE ICT20260407000024",
      image: "assets/cert-huawei-opengauss.png",
      fallbackLabel: "CERT-HUAWEI-OPENGAUSS.PNG",
      desc: {
        en: "Successfully completed the Huawei ICT Academy HCIE-openGauss V1.0 course and exam, covering enterprise openGauss database architecture, high-availability cluster deployment, SQL performance tuning, backup recovery, and security governance.",
        id: "Berhasil menyelesaikan kursus dan ujian Huawei ICT Academy HCIE-openGauss V1.0 yang mencakup arsitektur database enterprise openGauss, ketersediaan tinggi, optimasi performa SQL, pemulihan cadangan, dan keamanan data."
      }
    },
    {
      num: "04",
      accent: false,
      orientation: "portrait",
      issuer: "HUAWEI ICT ACADEMY",
      title: "DATA MANAGEMENT AND ANALYTICS",
      meta: "ISSUED 2026-04-09 • CODE ICT20260409000123",
      image: "assets/cert-huawei-data.png",
      fallbackLabel: "CERT-HUAWEI-DATA.PNG",
      desc: {
        en: "Successfully completed the Huawei ICT Academy Data Management and Analytics course and assessment, validating practical skills in structured data lifecycle management, analytical querying, warehouse modeling, and insight-driven decision workflows.",
        id: "Berhasil menyelesaikan kursus dan asesmen Huawei ICT Academy Data Management and Analytics yang memvalidasi kemampuan pengelolaan siklus data terstruktur, kueri analitik, pemodelan gudang data, dan alur analisis keputusan."
      }
    },
    {
      num: "05",
      accent: false,
      orientation: "landscape",
      issuer: "INTERVOL — TELKOM UNIVERSITY PURWOKERTO",
      title: "INTERNATIONAL VOLUNTEER & EVENT LOGISTICS",
      meta: "THE INDEX • EVENT ORGANIZER DIVISION",
      image: "assets/cert-intervol.jpg",
      fallbackLabel: "CERT-INTERVOL.JPG",
      desc: {
        en: "Active Event Organizer & Logistics member for INTERVOL at Telkom University Purwokerto, coordinating international guest welcoming for The Index, equipment tracking, administration, and budget planning (RAB).",
        id: "Anggota aktif Divisi Event Organizer & Logistik INTERVOL Telkom University Purwokerto, menangani penyambutan tamu internasional The Index, pendataan barang, administrasi, dan penyusunan RAB."
      }
    }
  ],

  /* ---------------------------------------------------------
     ZZZ STUDIO LOUNGE — 4 PLAYABLE VHS CARTRIDGES
     --------------------------------------------------------- */
  cartridges: {
    runner: {
      id: "runner",
      slot: "TAPE 01",
      channel: "CH-01",
      title: "GRAVITY FLIP RUNNER",
      genre: "HIGH-FREQUENCY SYNTH PARKOUR & BLASTER",
      desc: "Flip between neon floor and ceiling rails at breakneck speed, blast drone squadrons, and stack overdrive multipliers.",
      tags: ["SPACE / W: FLIP", "F / CLICK: BLAST", "COMBO CHAINS", "DRONE SQUADRONS"],
      bgGradient: "radial-gradient(circle at 50% 42%, #0c3554 0%, #050a14 78%)",
      accent: "#38bdf8",
      motif: [261.63, 329.63, 392.0, 523.25]
    },
    grimoire: {
      id: "grimoire",
      slot: "TAPE 02",
      channel: "CH-02",
      title: "GRIMOIRE: ABYSS",
      genre: "WIZARD OF LEGEND 16-BIT PIXEL ROGUELIKE",
      desc: "Dash across torch-lit stone dungeons as a hooded battle-mage, hurling pixel fireballs, lightning arcs, frost shields, 50 spells & Duo Fusions.",
      tags: ["WASD: MOVE", "SPACE: CAPE DASH", "50 PIXEL SPELLS", "BOSS EVERY 10 LVLS"],
      bgGradient: "radial-gradient(circle at 50% 42%, #3b1361 0%, #090512 78%)",
      accent: "#c084fc",
      motif: [220.0, 261.63, 311.13, 440.0]
    },
    campus: {
      id: "campus",
      slot: "TAPE 03",
      channel: "CH-03",
      title: "CAMPUS COMBAT",
      genre: "RETRO STREET FIGHTER ARCADE BRAWLER",
      desc: "Pick from 6 illustrated pixel campus fighters with animated punches, kicks, uppercuts, energy waves, throws, and 3-bar Super Arts.",
      tags: ["A/D: MOVE & GUARD", "W/S: JUMP/CROUCH", "J/K/L: PUNCH/KICK/SPECIAL", "U: 3-BAR SUPER"],
      bgGradient: "radial-gradient(circle at 50% 42%, #5c1f0e 0%, #100706 78%)",
      accent: "#fb923c",
      motif: [196.0, 246.94, 293.66, 392.0]
    },
    monolith: {
      id: "monolith",
      slot: "TAPE 04",
      channel: "CH-04",
      title: "VEIL OF THE MONOLITH",
      genre: "PS1/PS2 3D COLOSSUS CLIMBER",
      desc: "Confront three towering 3.5x-scale 3D Monoliths with gleaming Twin Chain-Blades, Crest Shield parries, stagger breaks, and true vertical climbing.",
      tags: ["WASD: MOVE", "LMB/J: CHAIN-BLADES", "RMB/SHIFT: SHIELD PARRY", "E: CLIMB / JUMP"],
      bgGradient: "radial-gradient(circle at 50% 42%, #0a3c30 0%, #060a0d 78%)",
      accent: "#34d399",
      motif: [146.83, 220.0, 261.63, 329.63]
    }
  },

  /* ---------------------------------------------------------
     BILINGUAL UI STRINGS (EN / ID)
     --------------------------------------------------------- */
  i18n: {
    en: {
      nav_about: "ABOUT",
      nav_education: "EDUCATION",
      nav_projects: "PROJECTS",
      nav_lounge: "LOUNGE",
      nav_credentials: "CREDENTIALS",
      nav_contact: "CONTACT",
      hero_role: "UI/UX DESIGNER & PRODUCT IDEATOR",
      hero_sub:
        "INFORMATICS ENGINEERING STUDENT AT TELKOM UNIVERSITY PURWOKERTO. STRUCTURING IDEAS INTO CLEAR INTERFACES AND USABLE DIGITAL PRODUCTS.",
      hero_cta_projects: "VIEW PROJECTS",
      hero_cta_arcade: "ENTER STUDIO LOUNGE",
      hero_cta_contact: "GET IN TOUCH",
      about_title: "ABOUT",
      portrait_hint: "SET IMAGE PATH IN DATA.JS",
      edu_title: "EDUCATION & TRACK",
      legend_industry: "INDUSTRIAL INTERNSHIP",
      open_maps: "OPEN GOOGLE MAPS",
      tile_street: "SEE OUTSIDE • STREET VIEW",
      tile_map: "PINNED MAP",
      see_photos: "SEE PHOTOS ON GOOGLE",
      projects_title: "PROJECTS",
      tag_flagship: "FLAGSHIP ENTERPRISE",
      proj_isim_desc:
        "Internal inventory management web application built during my internship for the Networking Division staff at PT. Telkom Indonesia Regional IV Semarang. Handles incoming/outgoing stock tracking, master item records, category controls, and real-time summary charts.",
      isim_proof_val: "Walkthrough Video + Office Gallery",
      open_case_study: "OPEN CASE STUDY & DEMO",
      proj_ecom_desc:
        "Minimalist retail storefront inspired by clean modern apparel grids. Built with WordPress and custom front-end code, integrating real Indonesian payment gateways and live order shipment tracking.",
      read_brief: "PROJECT BRIEF",
      lounge_kicker: "INTERACTIVE GAME ROOM // RANDOM PLAY STUDIO",
      lounge_title: "KAI'S LATE-NIGHT CRT LOUNGE",
      lounge_shelf_hint: "Hover a VHS spine to preview signal • Click tape or VCR slot to insert & play.",
      cred_title: "CREDENTIALS",
      inspect_cert: "3D INSPECT CERTIFICATE",
      footer_semester: "5TH SEMESTER INFORMATICS ENGINEERING — TELKOM UNIVERSITY PURWOKERTO",
      footer_nav: "NAVIGATION",
      footer_contact: "DIRECT CONTACT",
      wa_cta: "DIRECT MESSAGE • PROJECTS & ENGLISH COACHING"
    },
    id: {
      nav_about: "TENTANG",
      nav_education: "PENDIDIKAN",
      nav_projects: "PROYEK",
      nav_lounge: "LOUNGE",
      nav_credentials: "SERTIFIKASI",
      nav_contact: "KONTAK",
      hero_role: "DESAINER UI/UX & IDEATOR PRODUK",
      hero_sub:
        "MAHASISWA TEKNIK INFORMATIKA TELKOM UNIVERSITY PURWOKERTO. MENYUSUN IDE MENJADI ANTARMUKA JELAS DAN PRODUK DIGITAL YANG NYAMAN DIGUNAKAN.",
      hero_cta_projects: "LIHAT PROYEK",
      hero_cta_arcade: "MASUK STUDIO LOUNGE",
      hero_cta_contact: "HUBUNGI SAYA",
      about_title: "TENTANG",
      portrait_hint: "ATUR PATH FOTO DI DATA.JS",
      edu_title: "PENDIDIKAN & REKAM JEJAK",
      legend_industry: "MAGANG INDUSTRI",
      open_maps: "BUKA GOOGLE MAPS",
      tile_street: "LIHAT LUAR • STREET VIEW",
      tile_map: "PETA LOKASI",
      see_photos: "LIHAT FOTO DI GOOGLE",
      projects_title: "PROYEK",
      tag_flagship: "PROYEK ENTERPRISE UTAMA",
      proj_isim_desc:
        "Aplikasi web manajemen inventaris internal yang dibangun saat magang untuk staf Divisi Networking PT. Telkom Indonesia Regional IV Semarang. Menangani pencatatan stok masuk/keluar, data master barang, kontrol kategori, dan grafik ringkasan real-time.",
      isim_proof_val: "Video Walkthrough + Galeri Kantor",
      open_case_study: "BUKA STUDI KASUS & DEMO",
      proj_ecom_desc:
        "Toko ritel pakaian minimalis yang terinspirasi grid ritel modern. Dibangun dengan WordPress dan kode front-end kustom, terintegrasi dengan payment gateway Indonesia dan pelacakan pengiriman langsung.",
      read_brief: "RINGKASAN PROYEK",
      lounge_kicker: "RUANG GAME INTERAKTIF // RANDOM PLAY STUDIO",
      lounge_title: "LOUNGE CRT MALAM KAI",
      lounge_shelf_hint: "Arahkan kursor ke kaset VHS untuk pratinjau • Klik kaset atau slot VCR untuk bermain.",
      cred_title: "SERTIFIKASI & REKOGNISI",
      inspect_cert: "INSPEKSI SERTIFIKAT 3D",
      footer_semester: "SEMESTER 5 TEKNIK INFORMATIKA — TELKOM UNIVERSITY PURWOKERTO",
      footer_nav: "NAVIGASI",
      footer_contact: "KONTAK LANGSUNG",
      wa_cta: "PESAN LANGSUNG • PROYEK & COACHING INGGRIS"
    }
  }
};