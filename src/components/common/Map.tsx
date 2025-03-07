import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapComponentProps {
  latitude?: number;
  longitude?: number;
  setCoordinates?: (lat: number, lng: number) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ latitude = -7.5596, longitude = 110.8253, setCoordinates }) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return; // Cegah inisialisasi ulang jika map sudah ada

    mapRef.current = L.map(mapContainerRef.current, {
      center: [latitude, longitude],
      zoom: 13,
      scrollWheelZoom: true, // Bisa zoom in dan zoom out
      maxBounds: L.latLngBounds(
        L.latLng(-10, 107), // Batas barat daya (contoh: Indonesia)
        L.latLng(-5, 115) // Batas timur laut
      ),
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapRef.current);

    // Tambahkan event listener untuk menangkap klik di peta
    mapRef.current.on("click", (e: L.LeafletMouseEvent) => {
      if (setCoordinates) {
        setCoordinates(e.latlng.lat, e.latlng.lng);
      }

      // Jika sudah ada marker sebelumnya, hapus dulu
      if (markerRef.current) {
        markerRef.current.remove();
      }

      // Tambahkan marker baru di lokasi klik
      markerRef.current = L.marker(e.latlng, {
        icon: L.icon({
          iconUrl: "/pinned.svg", // Ganti dengan path ikon pinned peniti
          iconSize: [32, 32],
          iconAnchor: [16, 32],
        }),
      }).addTo(mapRef.current!);

      // Tampilkan notifikasi (opsional: bisa ganti dengan toast atau popup lainnya)
      alert(`Lokasi berhasil dipinned di koordinat: ${e.latlng.lat}, ${e.latlng.lng}`);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [latitude, longitude, setCoordinates]);

  return <div ref={mapContainerRef} style={{ width: "100%", height: "400px", cursor: "pointer" }} />;
};

export default MapComponent;
