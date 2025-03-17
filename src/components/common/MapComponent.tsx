import { useEffect, useState } from "react";
import L from "leaflet";

interface MapComponentProps {
  setFieldValue: (field: string, value: string | number) => void;
}

const MapComponent = ({ setFieldValue }: MapComponentProps) => {
  const [address, setAddress] = useState("Fetching address...");

  useEffect(() => {
    const mapContainer = document.getElementById("map");

    if (mapContainer?.hasAttribute("data-initialized")) return;
    mapContainer?.setAttribute("data-initialized", "true");

    const map = L.map("map", {
      center: [-6.200000, 106.816666],
      zoom: 13,
      zoomControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const markerIcon = new L.Icon({
      iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const marker = L.marker([-6.200000, 106.816666], {
      draggable: true,
      icon: markerIcon,
    }).addTo(map);

    const fetchAddress = async (lat: number, lng: number) => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await response.json();
        if (data.display_name) {
          setAddress(data.display_name);
          setFieldValue("address", data.display_name);
        } else {
          setAddress("Address not found");
        }
      } catch (error) {
        console.log("Error fetching address", error);
        setAddress("Error fetching address");
      }
    };

    fetchAddress(-6.200000, 106.816666);

    marker.on("dragend", function () {
      const { lat, lng } = marker.getLatLng();
      setFieldValue("latitude", lat);
      setFieldValue("longitude", lng);
      fetchAddress(lat, lng);
    });

    map.on("click", function (e) {
      marker.setLatLng(e.latlng);
      setFieldValue("latitude", e.latlng.lat);
      setFieldValue("longitude", e.latlng.lng);
      fetchAddress(e.latlng.lat, e.latlng.lng);
    });

    L.control.zoom({ position: "topright" }).addTo(map);

    return () => {
      map.remove();
      mapContainer?.removeAttribute("data-initialized");
    };
  }, [setFieldValue]);

  return (
    <div className="relative">
      <div id="map" className="h-[300px] w-full rounded-lg shadow-md border border-gray-300" />
      <div className="text-center mt-2 text-sm text-gray-600">
        Click or drag the marker to select your location.
      </div>
      <div className="flex flex-col gap-2 mt-2">
          <div className="flex gap-1">
            <>📍</>
            <p className="text-black">{address}</p>
          </div>
          <p className="text-yellow-600 text-sm">
          * Address details might not be accurate. Please fill in the address details below to provide more precise information about your location!.
          </p>
        </div>
    </div>
  );
};

export default MapComponent;
