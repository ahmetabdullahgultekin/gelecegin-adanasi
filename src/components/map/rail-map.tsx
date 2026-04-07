"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/lib/locale-context";
import { railLines, keyLocations } from "@/data/stations";

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
  const [L, setL] = useState<typeof import("leaflet") | null>(null);
  const [components, setComponents] = useState<{
    MapContainer: typeof import("react-leaflet").MapContainer;
    TileLayer: typeof import("react-leaflet").TileLayer;
    Polyline: typeof import("react-leaflet").Polyline;
    CircleMarker: typeof import("react-leaflet").CircleMarker;
    Popup: typeof import("react-leaflet").Popup;
    Marker: typeof import("react-leaflet").Marker;
  } | null>(null);

  useEffect(() => {
    Promise.all([import("leaflet"), import("react-leaflet")]).then(
      ([leaflet, rl]) => {
        setL(leaflet.default);
        setComponents({
          MapContainer: rl.MapContainer,
          TileLayer: rl.TileLayer,
          Polyline: rl.Polyline,
          CircleMarker: rl.CircleMarker,
          Popup: rl.Popup,
          Marker: rl.Marker,
        });
      }
    );
  }, []);

  if (!L || !components) {
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
      <MapContainer
        center={[37.0, 35.33]}
        zoom={11}
        className="w-full h-[600px] rounded-2xl z-0"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {railLines.map((line) => (
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
                radius={6}
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

        {keyLocations.map((loc, idx) => (
          <CircleMarker
            key={`key-${idx}`}
            center={[loc.lat, loc.lng]}
            radius={10}
            fillColor="#f59e0b"
            fillOpacity={0.9}
            color="#fff"
            weight={3}
          >
            <Popup>
              <div className="text-sm">
                <strong>{locale === "tr" ? loc.name : loc.nameEn}</strong>
                <br />
                <span className="text-gray-500">
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
