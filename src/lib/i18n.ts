export type Locale = "tr" | "en";

export const translations = {
  tr: {
    // Navigation
    nav: {
      home: "Ana Sayfa",
      projects: "Projeler",
      map: "Harita",
      about: "Hakkında",
      language: "English",
    },
    // Hero
    hero: {
      title: "Geleceğin Adana'sı",
      subtitle:
        "Bağımsız, veri odaklı şehir planlama ve vizyon platformu",
      description:
        "Siyasetten bağımsız, toplum yararına, Adana'nın altyapı, ulaşım, turizm ve dijital dönüşüm ihtiyaçlarına gerçekçi çözüm önerileri.",
      exploreMap: "Haritayı Keşfet",
      viewProjects: "Projeleri İncele",
    },
    // Sections
    sections: {
      transport: "Ulaşım ve Altyapı",
      tourism: "Turizm ve Tarım",
      digital: "Dijital Dönüşüm",
      urban: "Kentsel Yaşam",
      timeline: "Zaman Çizelgesi",
      railSystem: "Raylı Sistem Ağı",
    },
    // Timeline phases
    phases: {
      phase1: {
        title: "Faz 1: İlk 100 Gün",
        period: "0-1 Yıl",
        items: [
          "M1 metro uzatması fizibilite çalışması",
          "Adakart pilot uygulaması",
          "ABB AI platformu MVP",
          "Bisiklet şeridi pilot bölge",
        ],
      },
      phase2: {
        title: "Faz 2: Temel Atma",
        period: "1-3 Yıl",
        items: [
          "Ring tramvay inşaat başlangıcı",
          "Yeni otogar projesi",
          "Karataş sahil düzenlemesi",
          "Agropark fizibilite",
        ],
      },
      phase3: {
        title: "Faz 3: Büyüme",
        period: "3-5 Yıl",
        items: [
          "ÇukurovaRay banliyö (TCDD ile)",
          "Teknopark açılışı",
          "Turizm altyapısı tamamlanması",
          "Akıllı tarım merkezi",
        ],
      },
      phase4: {
        title: "Faz 4: Olgunlaşma",
        period: "5-10 Yıl",
        items: [
          "Mavi Hat sahil ekspresi",
          "Tüm hatların entegrasyonu",
          "Uluslararası turizm markası",
          "Tam dijital belediye",
        ],
      },
    },
    // Projects
    projects: {
      m1Extension: {
        title: "M1 Metro Uzatması",
        description:
          "Akıncılar'dan ABTÜ'ye uzanan kuzey-güney metro koridoru. Eğitim ve sağlık merkezlerini birbirine bağlar.",
        type: "Yeraltı Metro",
        cost: "~1 milyar USD",
        authority: "Belediye + Bakanlık",
      },
      ringTram: {
        title: "Şehir İçi Ring Tramvay",
        description:
          "Merkez Gar'dan başlayıp şehrin kalbinde dairesel rota çizen hafif raylı sistem. AVM, devlet kurumları ve turistik noktaları bağlar.",
        type: "Hafif Raylı",
        cost: "~300 milyon USD",
        authority: "Belediye",
      },
      cukurovaRay: {
        title: "ÇukurovaRay Banliyö",
        description:
          "Mevcut TCDD hatlarının rehabilitasyonu ile Mersin-Adana-Ceyhan doğu-batı ve Adana-Kozan kuzey banliyö hattı.",
        type: "Banliyö Treni",
        cost: "~500 milyon USD",
        authority: "TCDD + Bakanlık",
      },
      blueLineExpress: {
        title: "Mavi Hat Sahil Ekspresi",
        description:
          "Adana merkezden Karataş ve Yumurtalık sahillerine kesintisiz ulaşım. Başlangıçta ekspres otobüs, talebe göre raylıya dönüşüm.",
        type: "Ekspres / Hafif Raylı",
        cost: "~150 milyon USD",
        authority: "Belediye",
      },
      smartTerminal: {
        title: "Yeni Akıllı Otogar",
        description:
          "Raylı sistem entegrasyonlu, güneş enerjili, akıllı trafik yönetimli modern transfer merkezi.",
        type: "Lojistik Hub",
        cost: "~200 milyon USD",
        authority: "Belediye",
      },
      tourism: {
        title: "Karataş & Yumurtalık Turizm",
        description:
          "Karataş: Su sporları, ekoturizm, resort. Yumurtalık: Ayas Antik Kenti, butik otel, gastronomi turizmi. Akyatan Lagünü ekoturizm.",
        type: "Turizm Geliştirme",
        cost: "Kamu-özel ortaklığı",
        authority: "Belediye + Kültür Bakanlığı",
      },
      agropark: {
        title: "Tarım İhtisas OSB (Agroparklar)",
        description:
          "Ceyhan-Yüreğir düzlüklerinde katma değerli tarım ürünleri işleme tesisleri. Narenciye, pamuk, gıda paketleme.",
        type: "Organize Sanayi",
        cost: "~400 milyon USD",
        authority: "Sanayi Bakanlığı + Belediye",
      },
      abbAI: {
        title: "ABB AI Dijital Çözüm Masası",
        description:
          "Yapay zeka destekli vatandaş şikayet, dilekçe ve talep platformu. RAG mimarisi ile otomatik sınıflandırma ve yönlendirme.",
        type: "Dijital Platform",
        cost: "~5 milyon USD",
        authority: "Belediye",
      },
      adakart: {
        title: "Adakart Akıllı Kent Kartı",
        description:
          "NFC ve QR destekli tek bilet sistemi. Toplu taşıma, otopark, belediye hizmetleri tek kartta.",
        type: "Dijital Altyapı",
        cost: "~20 milyon USD",
        authority: "Belediye",
      },
      technopark: {
        title: "Yenilik ve İnovasyon Teknopark",
        description:
          "Genç istihdam, startup ekosistemi, üniversite-sanayi iş birliği. Yazılım, tarım teknolojisi, yapay zeka odaklı.",
        type: "Teknoloji Merkezi",
        cost: "~100 milyon USD",
        authority: "Belediye + YÖK + Sanayi Bakanlığı",
      },
      waterInfra: {
        title: "Su ve Drenaj Altyapısı",
        description:
          "Yağmur suyu drenaj sistemi yenileme, su kaçak oranını düşürme, kanalizasyon modernizasyonu.",
        type: "Altyapı",
        cost: "~300 milyon USD",
        authority: "ASKİ + Belediye",
      },
      greenSpaces: {
        title: "Yeşil Alan ve Park Sistemi",
        description:
          "Seyhan Nehri kıyısı peyzaj dönüşümü, gölge koridorları, kişi başı yeşil alan artışı.",
        type: "Kentsel Dönüşüm",
        cost: "~50 milyon USD",
        authority: "Belediye",
      },
      bikeNetwork: {
        title: "Bisiklet ve Yaya Ağları",
        description:
          "Şehir geneli bisiklet şeridi, yaya öncelikli bölgeler, paylaşımlı bisiklet sistemi.",
        type: "Ulaşım Altyapısı",
        cost: "~30 milyon USD",
        authority: "Belediye",
      },
      disasterPrep: {
        title: "Afet Hazırlığı",
        description:
          "Deprem master planı, kentsel dönüşüm, erken uyarı sistemleri, toplanma alanları.",
        type: "Güvenlik",
        cost: "Çok yıllı bütçe",
        authority: "AFAD + Belediye",
      },
    },
    // About
    about: {
      title: "Hakkında",
      description:
        "Bu platform, Adana'nın geleceğine dair bağımsız, veri odaklı ve toplum yararına bir vizyon sunmayı amaçlar. Herhangi bir siyasi parti veya hareketle bağlantısı yoktur.",
      mission: "Misyon",
      missionText:
        "Adana'nın kronik sorunlarına mühendislik disiplini ve veri odaklı yaklaşımla gerçekçi çözümler üretmek.",
      values: "Değerler",
      valuesList: [
        "Bağımsızlık — Siyasi bağ yok",
        "Gerçekçilik — Uygulanabilir projeler",
        "Şeffaflık — Açık veri ve bütçeler",
        "Katılımcılık — Vatandaş geri bildirimi",
      ],
    },
    // Footer
    footer: {
      description: "Toplum yararına, bağımsız şehir planlama platformu.",
      rights: "Tüm hakları saklıdır.",
      openSource: "Açık kaynak proje",
    },
    // Common
    common: {
      learnMore: "Detaylı İncele",
      cost: "Tahmini Maliyet",
      authority: "Yetki",
      type: "Tür",
      phase: "Faz",
      back: "Geri",
    },
  },
  en: {
    nav: {
      home: "Home",
      projects: "Projects",
      map: "Map",
      about: "About",
      language: "Türkçe",
    },
    hero: {
      title: "Adana's Future",
      subtitle: "Independent, data-driven urban planning and vision platform",
      description:
        "Non-political, public-benefit platform offering realistic solutions for Adana's infrastructure, transportation, tourism, and digital transformation needs.",
      exploreMap: "Explore Map",
      viewProjects: "View Projects",
    },
    sections: {
      transport: "Transportation & Infrastructure",
      tourism: "Tourism & Agriculture",
      digital: "Digital Transformation",
      urban: "Urban Living",
      timeline: "Timeline",
      railSystem: "Rail System Network",
    },
    phases: {
      phase1: {
        title: "Phase 1: First 100 Days",
        period: "0-1 Year",
        items: [
          "M1 metro extension feasibility study",
          "Adakart pilot program",
          "ABB AI platform MVP",
          "Bike lane pilot zone",
        ],
      },
      phase2: {
        title: "Phase 2: Foundation",
        period: "1-3 Years",
        items: [
          "Ring tram construction start",
          "New terminal project",
          "Karatas coastal development",
          "Agropark feasibility",
        ],
      },
      phase3: {
        title: "Phase 3: Growth",
        period: "3-5 Years",
        items: [
          "CukurovaRay commuter (with TCDD)",
          "Technopark opening",
          "Tourism infrastructure completion",
          "Smart agriculture center",
        ],
      },
      phase4: {
        title: "Phase 4: Maturity",
        period: "5-10 Years",
        items: [
          "Blue Line coastal express",
          "Full network integration",
          "International tourism brand",
          "Fully digital municipality",
        ],
      },
    },
    projects: {
      m1Extension: {
        title: "M1 Metro Extension",
        description:
          "North-south metro corridor from Akincilar to ABTU. Connects education and healthcare centers.",
        type: "Underground Metro",
        cost: "~$1 billion",
        authority: "Municipality + Ministry",
      },
      ringTram: {
        title: "City Center Ring Tram",
        description:
          "Light rail system circling the city center from Central Station. Connects malls, government offices, and tourist spots.",
        type: "Light Rail",
        cost: "~$300 million",
        authority: "Municipality",
      },
      cukurovaRay: {
        title: "CukurovaRay Commuter Rail",
        description:
          "Rehabilitation of existing TCDD lines for east-west (Mersin-Adana-Ceyhan) and north (Adana-Kozan) commuter rail.",
        type: "Commuter Train",
        cost: "~$500 million",
        authority: "TCDD + Ministry",
      },
      blueLineExpress: {
        title: "Blue Line Coastal Express",
        description:
          "Non-stop service from Adana center to Karatas and Yumurtalik beaches. Starting as express bus, converting to rail on demand.",
        type: "Express / Light Rail",
        cost: "~$150 million",
        authority: "Municipality",
      },
      smartTerminal: {
        title: "New Smart Bus Terminal",
        description:
          "Modern transfer hub with rail system integration, solar power, and smart traffic management.",
        type: "Logistics Hub",
        cost: "~$200 million",
        authority: "Municipality",
      },
      tourism: {
        title: "Karatas & Yumurtalik Tourism",
        description:
          "Karatas: Water sports, eco-tourism, resorts. Yumurtalik: Ayas Ancient City, boutique hotels, gastronomy tourism. Akyatan Lagoon eco-tourism.",
        type: "Tourism Development",
        cost: "Public-private partnership",
        authority: "Municipality + Ministry of Culture",
      },
      agropark: {
        title: "Agricultural Specialized Industrial Zone",
        description:
          "Value-added agricultural processing facilities in Ceyhan-Yuregir plains. Citrus, cotton, food packaging.",
        type: "Industrial Zone",
        cost: "~$400 million",
        authority: "Ministry of Industry + Municipality",
      },
      abbAI: {
        title: "ABB AI Digital Service Desk",
        description:
          "AI-powered citizen complaint, petition, and request platform. Automatic classification and routing with RAG architecture.",
        type: "Digital Platform",
        cost: "~$5 million",
        authority: "Municipality",
      },
      adakart: {
        title: "Adakart Smart City Card",
        description:
          "NFC and QR-enabled single ticket system. Public transport, parking, and municipal services on one card.",
        type: "Digital Infrastructure",
        cost: "~$20 million",
        authority: "Municipality",
      },
      technopark: {
        title: "Innovation Technopark",
        description:
          "Youth employment, startup ecosystem, university-industry collaboration. Focus on software, agtech, and AI.",
        type: "Technology Center",
        cost: "~$100 million",
        authority: "Municipality + YOK + Ministry of Industry",
      },
      waterInfra: {
        title: "Water & Drainage Infrastructure",
        description:
          "Stormwater drainage renewal, reducing water leakage rate, sewage modernization.",
        type: "Infrastructure",
        cost: "~$300 million",
        authority: "ASKI + Municipality",
      },
      greenSpaces: {
        title: "Green Spaces & Parks",
        description:
          "Seyhan River waterfront landscape transformation, shade corridors, increasing per-capita green space.",
        type: "Urban Transformation",
        cost: "~$50 million",
        authority: "Municipality",
      },
      bikeNetwork: {
        title: "Bicycle & Pedestrian Networks",
        description:
          "City-wide bike lanes, pedestrian-priority zones, bike-sharing system.",
        type: "Transport Infrastructure",
        cost: "~$30 million",
        authority: "Municipality",
      },
      disasterPrep: {
        title: "Disaster Preparedness",
        description:
          "Earthquake master plan, urban renewal, early warning systems, assembly areas.",
        type: "Safety",
        cost: "Multi-year budget",
        authority: "AFAD + Municipality",
      },
    },
    about: {
      title: "About",
      description:
        "This platform aims to present an independent, data-driven, public-benefit vision for Adana's future. It has no affiliation with any political party or movement.",
      mission: "Mission",
      missionText:
        "To produce realistic solutions for Adana's chronic problems through engineering discipline and data-driven approaches.",
      values: "Values",
      valuesList: [
        "Independence — No political ties",
        "Realism — Feasible projects",
        "Transparency — Open data and budgets",
        "Participation — Citizen feedback",
      ],
    },
    footer: {
      description: "Public-benefit, independent urban planning platform.",
      rights: "All rights reserved.",
      openSource: "Open source project",
    },
    common: {
      learnMore: "Learn More",
      cost: "Estimated Cost",
      authority: "Authority",
      type: "Type",
      phase: "Phase",
      back: "Back",
    },
  },
};

export type Translations = typeof translations.tr;
