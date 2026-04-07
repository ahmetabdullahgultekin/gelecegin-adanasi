"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/lib/locale-context";
import { railLines, projectLocations } from "@/data/stations";

const categoryColors: Record<string, string> = {
  hub: "#ef4444",
  transport: "#f97316",
  tourism: "#8b5cf6",
  agriculture: "#22c55e",
  digital: "#3b82f6",
  urban: "#14b8a6",
};

const categoryLabels: Record<string, { tr: string; en: string }> = {
  hub: { tr: "Transfer Merkezi", en: "Transfer Hub" },
  transport: { tr: "Ulaşım", en: "Transport" },
  tourism: { tr: "Turizm", en: "Tourism" },
  agriculture: { tr: "Tarım", en: "Agriculture" },
  digital: { tr: "Dijital", en: "Digital" },
  urban: { tr: "Kentsel Yaşam", en: "Urban Living" },
};

export default function RailMap() {
  const { locale } = useLocale();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[600px] bg-gray-100 rounded-2xl animate-pulse flex items-center justify-center">
        <span className="text-gray-400">Harita yükleniyor...</span>
      </div>
    );
  }

  return <MapInner locale={locale} />;
}

function MapInner({ locale }: { locale: string }) {
  const [components, setComponents] = useState<{
    MapContainer: typeof import("react-leaflet").MapContainer;
    TileLayer: typeof import("react-leaflet").TileLayer;
    Polyline: typeof import("react-leaflet").Polyline;
    CircleMarker: typeof import("react-leaflet").CircleMarker;
    Popup: typeof import("react-leaflet").Popup;
  } | null>(null);
  const [showRail, setShowRail] = useState(true);
  const [showProjects, setShowProjects] = useState(true);
  const [activeCategories, setActiveCategories] = useState<Set<string>>(
    new Set(Object.keys(categoryColors))
  );

  useEffect(() => {
    import("react-leaflet").then((rl) => {
      setComponents({
        MapContainer: rl.MapContainer,
        TileLayer: rl.TileLayer,
        Polyline: rl.Polyline,
        CircleMarker: rl.CircleMarker,
        Popup: rl.Popup,
      });
    });
  }, []);

  const toggleCategory = (cat: string) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  if (!components) {
    return (
      <div className="w-full h-[600px] bg-gray-100 rounded-2xl animate-pulse flex items-center justify-center">
        <span className="text-gray-400">Harita yükleniyor...</span>
      </div>
    );
  }

  const { MapContainer, TileLayer, Polyline, CircleMarker, Popup } = components;

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />

      {/* Filter controls */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setShowRail(!showRail)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
            showRail
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-white text-gray-500 border-gray-300"
          }`}
        >
          {locale === "tr" ? "Raylı Hatlar" : "Rail Lines"}
        </button>
        <button
          onClick={() => setShowProjects(!showProjects)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
            showProjects
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-white text-gray-500 border-gray-300"
          }`}
        >
          {locale === "tr" ? "Projeler" : "Projects"}
        </button>
        <span className="w-px h-6 bg-gray-300 self-center mx-1" />
        {Object.entries(categoryLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => toggleCategory(key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              activeCategories.has(key)
                ? "text-white border-transparent"
                : "bg-white text-gray-400 border-gray-200"
            }`}
            style={
              activeCategories.has(key)
                ? { backgroundColor: categoryColors[key] }
                : {}
            }
          >
            {locale === "tr" ? label.tr : label.en}
          </button>
        ))}
      </div>

      <MapContainer
        center={[37.0, 35.35]}
        zoom={10}
        className="w-full h-[600px] rounded-2xl z-0"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Rail lines */}
        {showRail &&
          railLines.map((line) => (
            <div key={line.id}>
              <Polyline
                positions={line.stations.map((s) => [s.lat, s.lng])}
                color={line.color}
                weight={4}
                opacity={0.8}
              />
              {line.stations.map((station, idx) => (
                <CircleMarker
                  key={`${line.id}-${idx}`}
                  center={[station.lat, station.lng]}
                  radius={5}
                  fillColor={line.color}
                  fillOpacity={1}
                  color="#fff"
                  weight={2}
                >
                  <Popup>
                    <div className="text-sm">
                      <strong>
                        {locale === "tr" ? station.name : station.nameEn}
                      </strong>
                      <br />
                      <span className="text-gray-500">
                        {locale === "tr" ? line.name : line.nameEn}
                      </span>
                      <br />
                      <span className="text-gray-400 text-xs">
                        {locale === "tr"
                          ? station.description
                          : station.descriptionEn}
                      </span>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </div>
          ))}

        {/* Project locations */}
        {showProjects &&
          projectLocations
            .filter((loc) => activeCategories.has(loc.category))
            .map((loc, idx) => (
              <CircleMarker
                key={`proj-${idx}`}
                center={[loc.lat, loc.lng]}
                radius={loc.category === "hub" ? 10 : 8}
                fillColor={categoryColors[loc.category]}
                fillOpacity={0.85}
                color="#fff"
                weight={2}
              >
                <Popup>
                  <div className="text-sm max-w-xs">
                    <strong>
                      {locale === "tr" ? loc.name : loc.nameEn}
                    </strong>
                    <br />
                    <span
                      className="inline-block mt-1 px-1.5 py-0.5 rounded text-xs text-white"
                      style={{ backgroundColor: categoryColors[loc.category] }}
                    >
                      {locale === "tr"
                        ? categoryLabels[loc.category].tr
                        : categoryLabels[loc.category].en}
                    </span>
                    <br />
                    <span className="text-gray-500 text-xs mt-1 block">
                      {locale === "tr" ? loc.description : loc.descriptionEn}
                    </span>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
      </MapContainer>
    </>
  );
}
