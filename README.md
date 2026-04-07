# Geleceğin Adana'sı

Adana için bağımsız, veri odaklı şehir planlama ve vizyon platformu.

## Vizyon

Bu platform, Adana'nın altyapı, ulaşım, turizm, tarım ve dijital dönüşüm alanlarındaki ihtiyaçlarını analiz ederek, gerçekçi ve uygulanabilir çözüm önerileri sunar. Herhangi bir siyasi parti veya hareketle bağlantısı yoktur.

## Projeler

### Ulaşım ve Altyapı
| # | Proje | Tür | Tahmini Maliyet | Yetki |
|---|-------|-----|-----------------|-------|
| 1 | M1 Metro Uzatması (Akıncılar → ABTÜ) | Yeraltı Metro | ~1 milyar USD | Belediye + Bakanlık |
| 2 | Şehir İçi Ring Tramvay | Hafif Raylı | ~300 milyon USD | Belediye |
| 3 | ÇukurovaRay Banliyö | TCDD Rehabilitasyon | ~500 milyon USD | TCDD + Bakanlık |
| 4 | Mavi Hat Sahil Ekspresi | Ekspres Otobüs → Raylı | ~150 milyon USD | Belediye |
| 5 | Yeni Akıllı Otogar | Lojistik Hub | ~200 milyon USD | Belediye |

### Turizm ve Tarım
| # | Proje | Açıklama |
|---|-------|----------|
| 6 | Karataş & Yumurtalık Turizm | Sahil turizmi, ekoturizm, butik otelleşme |
| 7 | Tarım İhtisas OSB (Agroparklar) | Katma değerli tarım ürünleri işleme tesisleri |
| 8 | Akıllı Tarım Merkezi | Drone ilaçlama, AI toprak analizi, damla sulama |

### Dijital Dönüşüm
| # | Proje | Açıklama |
|---|-------|----------|
| 9 | ABB AI Dijital Çözüm Masası | RAG tabanlı vatandaş şikayet/talep platformu |
| 10 | Adakart | NFC/QR akıllı kent kartı, tek bilet sistemi |
| 11 | Yenilik ve İnovasyon Teknoparkı | Genç istihdam, startup ekosistemi |

### Kentsel Yaşam
| # | Proje | Açıklama |
|---|-------|----------|
| 12 | Su ve Drenaj Altyapısı | Yağmur suyu, kanalizasyon modernizasyonu |
| 13 | Yeşil Alan ve Park Sistemi | Seyhan Nehri kıyısı, gölge koridorları |
| 14 | Bisiklet ve Yaya Ağları | Şehir geneli bisiklet şeridi altyapısı |
| 15 | Afet Hazırlığı | Deprem master planı, kentsel dönüşüm |

## Raylı Sistem Haritası

### Hat 1: M1 Uzatması (Kuzey-Güney)
Akıncılar → Yüreğir Otogar → Optimum AVM → Yüreğir Devlet Hastanesi → Şehir Hastanesi & Stadyum → Çukurova Üni (Balcalı) → ABTÜ

### Hat 2: Ring Tramvay (Dairesel)
Merkez Gar → Ziyapaşa → Valilik & Adliye → M1 AVM → Turgut Özal Blv → Barajyolu → Merkez Park → Taşköprü/Büyüksaat → Optimum → Merkez Gar

### Hat 3: ÇukurovaRay Banliyö
- **Doğu-Batı**: Mersin → Tarsus → Yenice → Şakirpaşa → Merkez Gar → Yüreğir → İncirlik OSB → Ceyhan
- **Kuzey**: Merkez Gar → Sarıçam OSB → İmamoğlu → Kozan

### Hat 4: Mavi Hat (Sahil)
Merkez Gar → Karataş Yolu → Doğankent → Karataş → Yumurtalık

## Teknoloji

- **Frontend**: Next.js 16, TypeScript, Tailwind CSS 4
- **Harita**: Leaflet.js + React-Leaflet (OpenStreetMap)
- **i18n**: Türkçe (ana) + İngilizce
- **Deploy**: Docker (standalone) + Traefik

## Geliştirme

```bash
git clone https://github.com/ahmetabdullahgultekin/gelecegin-adanasi.git
cd gelecegin-adanasi
npm install
npm run dev
```

## Lisans

MIT

## İletişim

Bu proje toplum yararına, bağımsız bir girişimdir. Katkıda bulunmak için PR açabilirsiniz.
