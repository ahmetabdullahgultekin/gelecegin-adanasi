import type { Locale } from "./i18n";

/**
 * Long-form, bilingual detail content for each project's `/projeler/[slug]`
 * page. Kept separate from `i18n.ts` (which holds the short card copy) so the
 * card data stays compact. Keyed by the same `i18nKey` as `data/projects.ts`.
 *
 * Every field is a localized record so a single source feeds both languages.
 * `phases` are 1-indexed and reference the 4-phase timeline in `i18n.phases`.
 */
export interface ProjectDetailContent {
  /** 2–3 sentence feasibility / context note. */
  feasibility: Record<Locale, string>;
  /** Bullet highlights (benefits, scope, dependencies). */
  highlights: Record<Locale, string[]>;
  /** Authority breakdown lines (who does what). */
  authoritySplit: Record<Locale, string[]>;
  /** Which timeline phase(s) this project lands in (1–4). */
  phases: number[];
}

export const projectDetailContent: Record<string, ProjectDetailContent> = {
  m1Extension: {
    feasibility: {
      tr: "Mevcut M1 metrosunun kuzey aksında uzatılması, hem güzergâhın büyük bölümünün yüzey/viyadük olarak inşa edilebilmesi hem de Çukurova Üniversitesi ve Şehir Hastanesi gibi yüksek talepli noktaları bağlaması nedeniyle önceliklidir. Tünel oranı maliyeti belirleyen ana değişkendir; bu nedenle fizibilitede hat profili kritik öneme sahiptir.",
      en: "Extending the existing M1 metro along the north axis is a priority: much of the alignment can be built at grade or on viaduct, and it links high-demand anchors such as Çukurova University and the City Hospital. The tunnel ratio is the main cost driver, so the alignment profile is the critical feasibility variable.",
    },
    highlights: {
      tr: [
        "47.000+ öğrencilik üniversite kampüsünü merkeze bağlar",
        "Şehir Hastanesi ve Devlet Hastanesi'ne raylı erişim",
        "Mevcut M1 ile kesintisiz, aktarmasız hat",
        "Yeni stadyum ve etkinlik alanlarına kapasite",
      ],
      en: [
        "Connects a 47,000+ student campus to the centre",
        "Rail access to the City and State hospitals",
        "Seamless, transfer-free extension of the existing M1",
        "Capacity for the new stadium and event venues",
      ],
    },
    authoritySplit: {
      tr: [
        "Belediye: hat planlaması, istasyon entegrasyonu, işletme",
        "Ulaştırma Bakanlığı: finansman onayı ve teknik standartlar",
      ],
      en: [
        "Municipality: route planning, station integration, operations",
        "Ministry of Transport: funding approval and technical standards",
      ],
    },
    phases: [1, 3],
  },
  ringTram: {
    feasibility: {
      tr: "Şehir merkezinde dairesel bir tramvay hattı, dar tarihi sokaklar yerine bulvar aksları üzerinden geçecek şekilde tasarlanmalıdır. Hafif raylı sistem, metroya kıyasla çok daha düşük birim maliyetle merkez yoğunluğunu emebilir ve M1 ile Optimum kavşağında entegre olur.",
      en: "A circular tram in the city centre should follow boulevard axes rather than narrow historic streets. Light rail absorbs central density at a far lower unit cost than metro and integrates with M1 at the Optimum junction.",
    },
    highlights: {
      tr: [
        "Merkez yoğunluğunu metro yükünden ayırır",
        "Tarihi merkez ve çarşıya nostaljik hat potansiyeli",
        "M1 metrosu ile aktarma noktası",
        "Düşük emisyonlu, sokak seviyesi erişim",
      ],
      en: [
        "Separates central density from the metro load",
        "Potential nostalgic line through the historic bazaar",
        "Transfer point with the M1 metro",
        "Low-emission, street-level access",
      ],
    },
    authoritySplit: {
      tr: ["Belediye: tam yetki (planlama, inşaat, işletme)"],
      en: ["Municipality: full authority (planning, construction, operations)"],
    },
    phases: [2],
  },
  cukurovaRay: {
    feasibility: {
      tr: "ÇukurovaRay, sıfırdan inşaat yerine mevcut TCDD hatlarının rehabilitasyonuna dayanır; bu da onu bölgesel banliyö için en hızlı ve en uygun maliyetli seçenek yapar. Doğu-batı (Tarsus–Ceyhan) ve kuzey (Merkez–Kozan) kollarıyla sanayi ve tarım havzalarını merkeze bağlar. TCDD ile koordinasyon ana uygulama riskidir.",
      en: "CukurovaRay relies on rehabilitating existing TCDD lines rather than new construction, making it the fastest, most cost-effective option for regional commuter rail. Its east-west (Tarsus–Ceyhan) and north (Centre–Kozan) arms link industrial and agricultural basins to the core. Coordination with TCDD is the main delivery risk.",
    },
    highlights: {
      tr: [
        "Mevcut demiryolu altyapısını yeniden kullanır",
        "Sanayi işçileri için Sarıçam OSB bağlantısı",
        "Tarım havzalarını (Kozan, İmamoğlu, Ceyhan) bağlar",
        "Park Et & Devam Et otoparklarıyla entegre",
      ],
      en: [
        "Reuses existing railway infrastructure",
        "Sarıçam industrial-zone link for factory workers",
        "Connects agricultural basins (Kozan, İmamoğlu, Ceyhan)",
        "Integrated with Park & Ride lots",
      ],
    },
    authoritySplit: {
      tr: [
        "TCDD: hat sahipliği ve rehabilitasyon",
        "Ulaştırma Bakanlığı: finansman",
        "Belediye: istasyon entegrasyonu ve besleme hatları",
      ],
      en: [
        "TCDD: line ownership and rehabilitation",
        "Ministry of Transport: funding",
        "Municipality: station integration and feeder lines",
      ],
    },
    phases: [3],
  },
  blueLineExpress: {
    feasibility: {
      tr: "Mavi Hat, başlangıçta düşük sermayeli bir ekspres otobüs hattı olarak işletilip talep doğrulandıkça raylıya dönüştürülmek üzere tasarlanmıştır. Bu aşamalı yaklaşım, sahil turizmi talebinin mevsimsel olması riskini yönetir. Akyatan Lagünü gibi korunan alanlarda güzergâh hassasiyeti gerektirir.",
      en: "The Blue Line is designed to run first as a low-capital express bus and convert to rail as demand is validated. This staged approach manages the risk of seasonal coastal-tourism demand. Alignment near protected areas such as Akyatan Lagoon requires environmental sensitivity.",
    },
    highlights: {
      tr: [
        "Merkezden Karataş ve Yumurtalık sahillerine doğrudan erişim",
        "Aşamalı: ekspres otobüs → talebe göre raylı",
        "Akyatan ekoturizmiyle entegre, çevreye duyarlı",
        "Mevsimsel turizm yükünü merkezden dışarı taşır",
      ],
      en: [
        "Direct access from centre to Karataş & Yumurtalık coasts",
        "Staged: express bus → rail on demand",
        "Eco-sensitive, integrated with Akyatan eco-tourism",
        "Moves seasonal tourism load out of the centre",
      ],
    },
    authoritySplit: {
      tr: [
        "Belediye: hat işletmesi ve planlama",
        "Kültür ve Turizm Bakanlığı: sahil/koruma alanı izinleri",
      ],
      en: [
        "Municipality: line operations and planning",
        "Ministry of Culture & Tourism: coastal/protected-area permits",
      ],
    },
    phases: [2, 4],
  },
  smartTerminal: {
    feasibility: {
      tr: "Yeni akıllı otogar, şehirlerarası otobüs, dolmuş ve raylı sistemi tek bir güneş enerjili transfer noktasında birleştirir. M1 metrosunun Yüreğir Otogarı durağıyla doğrudan entegrasyonu, otoparkı ve modlar arası aktarmayı kilit tasarım kriteri yapar.",
      en: "The new smart terminal unifies intercity buses, minibuses, and rail at a single solar-powered transfer point. Direct integration with the M1 metro's Yüreğir Terminal stop makes parking and inter-modal transfer the key design criteria.",
    },
    highlights: {
      tr: [
        "Şehirlerarası + raylı + dolmuş tek noktada",
        "Güneş enerjili, akıllı trafik yönetimli",
        "M1 metrosu durağıyla doğrudan entegre",
        "Park Et & Devam Et kapasitesi",
      ],
      en: [
        "Intercity + rail + minibus in one place",
        "Solar-powered, smart traffic management",
        "Directly integrated with an M1 metro stop",
        "Park & Ride capacity",
      ],
    },
    authoritySplit: {
      tr: ["Belediye: tam yetki (yapım ve işletme)"],
      en: ["Municipality: full authority (construction and operations)"],
    },
    phases: [2],
  },
  tourism: {
    feasibility: {
      tr: "Karataş ve Yumurtalık, İstanbul/Antalya ölçeğinde değil; kontrollü, ekolojik ve butik bir turizm modeliyle geliştirilmelidir. Akyatan ve Tuzla lagünleri uluslararası öneme sahip kuş alanlarıdır ve taşıma kapasitesi planlaması şarttır. Kamu-özel ortaklığı sermaye riskini paylaşır.",
      en: "Karataş and Yumurtalık should be developed on a controlled, ecological, boutique model — not at İstanbul/Antalya scale. The Akyatan and Tuzla lagoons are internationally important bird areas requiring carrying-capacity planning. A public-private partnership shares the capital risk.",
    },
    highlights: {
      tr: [
        "Su sporları ve rüzgâr sörfü için elverişli sahil",
        "Yumurtalık Ayas Antik Kenti — kültür turizmi",
        "Akyatan kuş cenneti — ekoturizm ve gözlem terasları",
        "Butik otelcilik ve gastronomi odağı",
      ],
      en: [
        "Coastline suited to water sports and windsurfing",
        "Yumurtalık's Ayas Ancient City — cultural tourism",
        "Akyatan bird sanctuary — eco-tourism and observation decks",
        "Boutique hospitality and gastronomy focus",
      ],
    },
    authoritySplit: {
      tr: [
        "Belediye: altyapı ve planlama",
        "Kültür ve Turizm Bakanlığı: tescil ve teşvik",
        "Özel sektor: tesis yatırımı (KÖO)",
      ],
      en: [
        "Municipality: infrastructure and planning",
        "Ministry of Culture & Tourism: designation and incentives",
        "Private sector: facility investment (PPP)",
      ],
    },
    phases: [2, 4],
  },
  agropark: {
    feasibility: {
      tr: "Çukurova ovasının tarımsal hammaddesini katma değerli ürüne çevirmek, işlenmemiş ürün ihracatından çok daha yüksek ekonomik getiri sağlar. Agroparklar narenciye, pamuk ve gıda paketlemeyi tek bir ihtisas OSB'sinde toplar; ÇukurovaRay yük entegrasyonu lojistik maliyetini düşürür.",
      en: "Turning the Çukurova plain's raw output into value-added products yields far higher economic return than exporting unprocessed goods. Agroparks consolidate citrus, cotton, and food packaging in a single specialised industrial zone; CukurovaRay freight integration lowers logistics costs.",
    },
    highlights: {
      tr: [
        "Katma değerli tarım: paketleme, meyve suyu, soğuk zincir",
        "Akıllı tarım: drone ilaçlama, AI toprak analizi, damla sulama",
        "ÇukurovaRay yük entegrasyonuyla düşük lojistik maliyeti",
        "Bölgesel istihdam ve kooperatifleşme",
      ],
      en: [
        "Value-added agriculture: packaging, juice, cold chain",
        "Smart farming: drone spraying, AI soil analysis, drip irrigation",
        "Low logistics cost via CukurovaRay freight integration",
        "Regional employment and cooperatives",
      ],
    },
    authoritySplit: {
      tr: [
        "Sanayi ve Teknoloji Bakanlığı: OSB statüsü",
        "Belediye: arazi tahsisi ve altyapı",
        "Tarım Bakanlığı: akıllı tarım programları",
      ],
      en: [
        "Ministry of Industry & Technology: industrial-zone status",
        "Municipality: land allocation and infrastructure",
        "Ministry of Agriculture: smart-farming programmes",
      ],
    },
    phases: [2, 3],
  },
  abbAI: {
    feasibility: {
      tr: "Yapay zekâ destekli bir vatandaş talep platformu, düşük sermayeli ve yüksek etkili bir 'hızlı kazanım' projesidir. RAG mimarisi, gelen şikâyet ve dilekçeleri otomatik sınıflandırıp doğru birime yönlendirerek çözüm süresini kısaltır. Veri gizliliği ve KVKK uyumu tasarımın merkezindedir.",
      en: "An AI-assisted citizen-request platform is a low-capital, high-impact 'quick win.' A RAG architecture auto-classifies incoming complaints and petitions and routes them to the right unit, shortening resolution time. Data privacy and KVKK (GDPR) compliance are central to the design.",
    },
    highlights: {
      tr: [
        "Düşük maliyetli, ilk 100 günde MVP",
        "Otomatik sınıflandırma ve yönlendirme (RAG)",
        "Çözüm süresi ve şeffaflık ölçümü",
        "KVKK uyumlu veri işleme",
      ],
      en: [
        "Low cost, MVP within the first 100 days",
        "Automatic classification and routing (RAG)",
        "Resolution-time and transparency metrics",
        "KVKK (GDPR)-compliant data handling",
      ],
    },
    authoritySplit: {
      tr: ["Belediye: tam yetki (geliştirme ve işletme)"],
      en: ["Municipality: full authority (development and operations)"],
    },
    phases: [1],
  },
  adakart: {
    feasibility: {
      tr: "Tek bir NFC/QR kart ile toplu taşıma, otopark ve belediye hizmetlerini birleştirmek, hem vatandaş deneyimini iyileştirir hem de belediyeye anonim hareketlilik verisi sağlar. Mevcut kart sistemleriyle geriye dönük uyumluluk ve açık veri yaklaşımı kilit tasarım ilkeleridir.",
      en: "Unifying public transport, parking, and municipal services on a single NFC/QR card improves the citizen experience and gives the municipality anonymised mobility data. Backward compatibility with existing card systems and an open-data approach are key design principles.",
    },
    highlights: {
      tr: [
        "Tek kart: ulaşım + otopark + belediye hizmetleri",
        "NFC ve QR desteği",
        "Anonim hareketlilik verisiyle hat planlaması",
        "Mevcut sistemlerle geriye dönük uyum",
      ],
      en: [
        "One card: transport + parking + municipal services",
        "NFC and QR support",
        "Route planning from anonymised mobility data",
        "Backward compatible with existing systems",
      ],
    },
    authoritySplit: {
      tr: ["Belediye: tam yetki"],
      en: ["Municipality: full authority"],
    },
    phases: [1],
  },
  technopark: {
    feasibility: {
      tr: "Çukurova Üniversitesi'nin yanına konumlanan bir teknopark, üniversite-sanayi iş birliğini ve genç istihdamı destekler. Adana'nın güçlü olduğu tarım teknolojisi (agtech) ve yapay zekâ alanlarına odaklanmak, mevcut ekonomik tabanla doğal bir uyum sağlar.",
      en: "A technopark next to Çukurova University supports university-industry collaboration and youth employment. Focusing on agtech and AI — areas where Adana already has strengths — aligns naturally with the existing economic base.",
    },
    highlights: {
      tr: [
        "Üniversite-sanayi iş birliği",
        "Genç istihdam ve girişimcilik ekosistemi",
        "Agtech ve yapay zekâ odağı",
        "M1 metrosu kampüs durağıyla erişim",
      ],
      en: [
        "University-industry collaboration",
        "Youth employment and startup ecosystem",
        "Agtech and AI focus",
        "Access via the M1 metro campus stop",
      ],
    },
    authoritySplit: {
      tr: [
        "Belediye: arazi ve altyapı",
        "YÖK / Üniversite: akademik bağ",
        "Sanayi ve Teknoloji Bakanlığı: teknopark statüsü",
      ],
      en: [
        "Municipality: land and infrastructure",
        "YÖK / University: academic linkage",
        "Ministry of Industry & Technology: technopark status",
      ],
    },
    phases: [3],
  },
  waterInfra: {
    feasibility: {
      tr: "2023 sonrası dönemde sel ve drenaj, Adana'nın en kritik altyapı önceliklerindendir. Yağmur suyu drenajının yenilenmesi ve su kaçak oranının düşürülmesi, görünür olmayan ama yüksek getirili yatırımlardır. Çok yıllı, etaplı bir program olarak planlanmalıdır.",
      en: "Flooding and drainage are among Adana's most critical infrastructure priorities. Renewing stormwater drainage and cutting water-loss rates are low-visibility but high-return investments. It should be planned as a multi-year, phased programme.",
    },
    highlights: {
      tr: [
        "Yüreğir gibi yüksek sel riskli bölgelere öncelik",
        "Su kaçak oranını düşürerek kaynak tasarrufu",
        "Kanalizasyon modernizasyonu",
        "Çok yıllı, etaplı uygulama",
      ],
      en: [
        "Priority to high-flood-risk areas such as Yüreğir",
        "Resource savings by cutting water-loss rates",
        "Sewage modernisation",
        "Multi-year, phased delivery",
      ],
    },
    authoritySplit: {
      tr: [
        "ASKİ: su ve kanalizasyon işletmesi",
        "Belediye: drenaj ve yol entegrasyonu",
      ],
      en: [
        "ASKİ: water and sewage operations",
        "Municipality: drainage and road integration",
      ],
    },
    phases: [1, 3],
  },
  greenSpaces: {
    feasibility: {
      tr: "Seyhan Nehri kıyısı, Adana için tanımlayıcı bir kamusal alan fırsatıdır. Gölge koridorları ve yürüyüş/bisiklet aksları, sıcak iklimde yaşanabilirliği doğrudan artırır. Görece düşük maliyetli ve hızlı görünür sonuç veren bir projedir.",
      en: "The Seyhan riverfront is a defining public-space opportunity for Adana. Shade corridors and walking/cycling axes directly improve liveability in a hot climate. It is relatively low-cost and delivers fast, visible results.",
    },
    highlights: {
      tr: [
        "Seyhan Nehri kıyısı peyzaj dönüşümü",
        "Sıcak iklime karşı gölge koridorları",
        "Kişi başı yeşil alan artışı",
        "Yürüyüş ve bisiklet aksıyla entegre",
      ],
      en: [
        "Seyhan riverfront landscape transformation",
        "Shade corridors against the hot climate",
        "Increase in per-capita green space",
        "Integrated with walking and cycling axes",
      ],
    },
    authoritySplit: {
      tr: ["Belediye: tam yetki"],
      en: ["Municipality: full authority"],
    },
    phases: [1, 2],
  },
  bikeNetwork: {
    feasibility: {
      tr: "Şehir geneli bisiklet ağı, bir pilot bölge (Barajyolu) ile başlayıp veriye dayalı olarak genişletilmelidir. Düz topoğrafya Adana'yı bisiklete uygun kılar; ana engel güvenli, ayrılmış şerit eksikliğidir. Paylaşımlı bisiklet, Adakart ile entegre edilebilir.",
      en: "A city-wide bike network should start with a pilot zone (Barajyolu) and expand on the basis of data. Flat topography makes Adana bike-friendly; the main barrier is the lack of safe, segregated lanes. Bike-sharing can integrate with Adakart.",
    },
    highlights: {
      tr: [
        "Barajyolu pilot bölgesiyle veri odaklı başlangıç",
        "Düz topoğrafya — yüksek bisiklet potansiyeli",
        "Güvenli, ayrılmış şeritler",
        "Adakart entegreli paylaşımlı bisiklet",
      ],
      en: [
        "Data-driven start with the Barajyolu pilot",
        "Flat topography — high cycling potential",
        "Safe, segregated lanes",
        "Adakart-integrated bike-sharing",
      ],
    },
    authoritySplit: {
      tr: ["Belediye: tam yetki"],
      en: ["Municipality: full authority"],
    },
    phases: [1],
  },
  disasterPrep: {
    feasibility: {
      tr: "Deprem bölgesinde yer alan Adana için afet hazırlığı bir tercih değil, zorunluluktur. Toplanma alanlarının netleştirilmesi, kentsel dönüşümün risk haritasına göre önceliklendirilmesi ve erken uyarı sistemleri, çok yıllı bir bütçeyle sürekli yürütülmelidir.",
      en: "For Adana, in an earthquake zone, disaster preparedness is a necessity, not a choice. Clarifying assembly areas, prioritising urban renewal by risk map, and deploying early-warning systems must run continuously on a multi-year budget.",
    },
    highlights: {
      tr: [
        "Risk haritasına dayalı kentsel dönüşüm",
        "Net ve erişilebilir toplanma alanları",
        "Erken uyarı sistemleri pilotu",
        "Çok yıllı sürekli program",
      ],
      en: [
        "Risk-map-driven urban renewal",
        "Clear, accessible assembly areas",
        "Early-warning-system pilot",
        "Continuous multi-year programme",
      ],
    },
    authoritySplit: {
      tr: [
        "AFAD: afet koordinasyonu ve standartlar",
        "Belediye: kentsel dönüşüm ve toplanma alanları",
      ],
      en: [
        "AFAD: disaster coordination and standards",
        "Municipality: urban renewal and assembly areas",
      ],
    },
    phases: [1, 4],
  },
};
