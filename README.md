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
| 7 | Tarım İhtisas OSB (Agroparklar) | Katma değerli tarım ürünleri işleme tesisleri; akıllı tarım (drone ilaçlama, AI toprak analizi, damla sulama) entegrasyonu |

### Dijital Dönüşüm
| # | Proje | Açıklama |
|---|-------|----------|
| 8 | ABB AI Dijital Çözüm Masası | RAG tabanlı vatandaş şikayet/talep platformu |
| 9 | Adakart | NFC/QR akıllı kent kartı, tek bilet sistemi |
| 10 | Yenilik ve İnovasyon Teknoparkı | Genç istihdam, startup ekosistemi |

### Kentsel Yaşam
| # | Proje | Açıklama |
|---|-------|----------|
| 11 | Su ve Drenaj Altyapısı | Yağmur suyu, kanalizasyon modernizasyonu |
| 12 | Yeşil Alan ve Park Sistemi | Seyhan Nehri kıyısı, gölge koridorları |
| 13 | Bisiklet ve Yaya Ağları | Şehir geneli bisiklet şeridi altyapısı |
| 14 | Afet Hazırlığı | Deprem master planı, kentsel dönüşüm |

## Raylı Sistem Haritası

### Hat 1: M1 Uzatması (Kuzey-Güney)
Akıncılar → Yüreğir Otogar → Optimum AVM → Yüreğir Devlet Hastanesi → Şehir Hastanesi & Stadyum → Çukurova Üni (Balcalı) → ABTÜ

### Hat 2: Ring Tramvay (Dairesel)
Merkez Gar → Valilik → Ziyapaşa → İnönü → Taşköprü/Büyüksaat → Galleria → Merkez Park → Optimum → Barajyolu → Adliye → Merkez Gar

### Hat 3: ÇukurovaRay Banliyö
- **Doğu-Batı (3a)**: Tarsus → Yenice → Şakirpaşa → Merkez Gar → Yüreğir → İncirlik → Yakapınar → Misis → Ceyhan
- **Kuzey (3b)**: Merkez Gar → Buruk/TOKİ → Kürkçüler → Sarıçam OSB → Ceyhan Ovası → İmamoğlu → Kadirli Ayrımı → Kozan

### Hat 4: Mavi Hat (Sahil)
Merkez Gar → Küçükdikili → Havutlu → Tuzla → Doğankent → Bahçe → Akyatan Lagünü → Karataş

### Hat 5: Yumurtalık Çatalı (Sahil)
Ceyhan → Erzin Ayrımı → Yumurtalık

> Güzergâhların kaynağı `src/data/stations.ts`'tir (6 hat / 49 durak). Sayılar
> ve durak listeleri her zaman bu veriden türetilir.

## Özellikler

- **Bilingual (TR/EN)** — `?lang=` ile bağlanabilir/paylaşılabilir, seçim
  `localStorage` ile kalıcı, `<html lang>` aktif dile senkron.
- **Proje detay sayfaları** — her projenin `/projeler/[slug]` rotasında
  fizibilite notu, yetki dağılımı, aşamalandırma, öne çıkanlar ve harita
  bağlantıları (14 sayfa, statik üretim).
- **SEO** — canonical + hreflang (her rota ve detay sayfası), iki dilli site
  haritası, `Organization` / `WebSite` / `CreativeWork` JSON-LD, OG görseli.
- **Veri görselleştirme** — kategoriye göre tahmini bütçe grafiği, tümü
  `src/data/projects.ts`'teki sayısal alanlardan türetilir.
- **Katılım** — GitHub hesabı gerektirmeyen "Görüş Bildir" bağlantıları.

## Teknoloji

- **Frontend**: Next.js 16 (App Router) + React 19, TypeScript, Tailwind CSS 4
- **Harita**: Leaflet.js + React-Leaflet (OpenStreetMap), Leaflet CSS self-hosted
- **i18n**: Türkçe (ana) + İngilizce, URL + localStorage kalıcılığı
- **CI**: GitHub Actions (lint + build) her PR'da
- **Deploy**: Docker (standalone) + Traefik (Hetzner)

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
