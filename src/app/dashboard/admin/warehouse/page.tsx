  "use client";

  import { useEffect, useState } from "react";
  import Header from "@/components/common/Header";
  import Navbar from "@/components/common/Navbar";
  import Footer from "@/components/common/Footer";
  import AdminSidebarPanel from "@/components/common/AdminSidebar";
  import axios from "axios";
  import dynamic from "next/dynamic";
  import "leaflet/dist/leaflet.css";

  interface Warehouse {
    id: number;
    name: string;
    address: string;
    longitude: string;
    latitude: string;
    cityId: string;
  }


  const Map = dynamic(() => import("@/components/common/Map"), { ssr: false });

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const WarehousePage = () => {
    const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [newWarehouse, setNewWarehouse] = useState<Omit<Warehouse, "id">>({
      name: "",
      address: "",
      longitude: "",
      latitude: "",
      cityId: "",
    });
    
    const [editingWarehouse, setEditingWarehouse] = useState<Warehouse | null>(null);  
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

    useEffect(() => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.error("Error fetching location:", error);
          }
        );
      }
    }, []);

    useEffect(() => {
      fetchWarehouses();
    }, []);

    const fetchWarehouses = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<Warehouse[]>(`${BACKEND_URL}/api/v1/warehouse`);
        setWarehouses(response.data);
      } catch {
        setError("Failed to fetch warehouses");
      } finally {
        setLoading(false);
      }
    };

    // useEffect(() => {
    //   const fetchUserProfile = async () => {
    //     try {
    //       const response = await axios.get(`${BACKEND_URL}/api/v1/user/profile`, { withCredentials: true });
    //       if (response.data && response.data.data) {
    //         setAdminId(response.data.data.id);
    //       } else {
    //         console.error("User data is missing:", response.data);
    //       }
    //     } catch (error) {
    //       console.error("Failed to fetch user profile", error);
    //     }
    //   };
    
    //   fetchUserProfile();
    // }, []);
    
    

    const createWarehouse = async () => {
      try {
        await axios.post(`${BACKEND_URL}/api/v1/warehouse`, newWarehouse);
        setNewWarehouse({ name: "", address: "", longitude: "", latitude: "", cityId: "" });
        fetchWarehouses();
      } catch (err) {
        console.error("Failed to create warehouse", err);
      }
    };

    const updateWarehouse = async () => {
      try {
        if (editingWarehouse) {
          console.log("Updating warehouse with data:", editingWarehouse);
          await axios.put(
            `${BACKEND_URL}/api/v1/warehouse/${editingWarehouse.id}`, 
            editingWarehouse
          );
          setEditingWarehouse(null);
        }
        fetchWarehouses();
      } catch (err) {
        console.error("Failed to update warehouse", err);
      }
    };
    
    

    const deleteWarehouse = async (id: number) => {
      try {
        await axios.delete(`${BACKEND_URL}/api/v1/warehouse/${id}`);
        fetchWarehouses();
      } catch (err) {
        console.error("Failed to delete warehouse", err);
      }
    };

  




    return (
      <div className="flex min-h-screen flex-col bg-gray-100 text-black">
        <Header />
        <Navbar />
        <div className="flex flex-grow">
          <AdminSidebarPanel />
          <div className="flex-grow p-6 bg-white shadow-lg rounded-xl">
            <h1 className="text-2xl font-bold mb-6">🏭 Warehouse Management</h1>
    
            {error && <div className="text-red-500 mb-4">{error}</div>}
    
            {/* Add/Edit Warehouse */}
            <section className="mb-6 p-6 border border-gray-200 rounded-lg shadow-md bg-white">
              <h2 className="text-xl font-semibold mb-4">
              {editingWarehouse ? "📌 Edit Warehouse" : "➕ Add Warehouse"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
    type="text"
    placeholder="Warehouse Name"
    className="border p-3 rounded-lg"
    value={editingWarehouse?.name ?? newWarehouse.name ?? ""} 
    onChange={(e) =>
      editingWarehouse
        ? setEditingWarehouse({ ...editingWarehouse, name: e.target.value })
        : setNewWarehouse({ ...newWarehouse, name: e.target.value })
    }
  />



  <input
    type="text"
    placeholder="Address"
    className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
    value={editingWarehouse?.address ?? newWarehouse.address ?? ""}
    onChange={(e) =>
      editingWarehouse
        ? setEditingWarehouse({ ...editingWarehouse, address: e.target.value })
        : setNewWarehouse({ ...newWarehouse, address: e.target.value })
    }
  />

                <input
                  type="text"
                  placeholder="City ID"
                  className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
                  value={editingWarehouse ? editingWarehouse.cityId : newWarehouse.cityId}
                  onChange={(e) =>
                    editingWarehouse
                      ? setEditingWarehouse({ ...editingWarehouse, cityId: e.target.value })
                      : setNewWarehouse({ ...newWarehouse, cityId: e.target.value })
                  }
                />
              </div>
    
              <h2 className="text-lg font-semibold mt-6">📍 Select Location</h2>
              
              <Map
    latitude={newWarehouse.latitude ? parseFloat(newWarehouse.latitude) : userLocation?.lat ?? 0}
    longitude={newWarehouse.longitude ? parseFloat(newWarehouse.longitude) : userLocation?.lng ?? 0}
    setCoordinates={(lat, lng) =>
      setNewWarehouse((prev) => ({
        ...prev,
        latitude: lat.toString(),
        longitude: lng.toString(),
      }))
    }
  />



    
              <button
                className="mt-4 px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95"
                onClick={editingWarehouse ? updateWarehouse : createWarehouse}
              >
                {editingWarehouse ? "Update Warehouse" : "Add Warehouse"}
              </button>
            </section>
    
            {/* Warehouse List */}
            <section className="p-6 border border-gray-200 rounded-lg shadow-md bg-white">
              <h2 className="text-xl font-semibold mb-4">📋 Warehouse List</h2>
              {loading ? (
                <p className="text-center text-gray-500 animate-pulse">Loading...</p>
              ) : (
                <ul>
                  {warehouses.map((warehouse) => (
                    <li
                      key={warehouse.id}
                      className="p-4 bg-white rounded-lg shadow mb-2 flex justify-between items-center"
                    >
                      <div>
                        <h3 className="font-semibold">{warehouse.name}</h3>
                        <p className="text-gray-600">{warehouse.address}</p>
                      </div>
                      <div>
                      <button
    className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95 mr-2"
    onClick={() => { 
      console.log(warehouse);
      setEditingWarehouse(warehouse); 
      setIsModalOpen(true);
    }}
  >
    Edit
  </button>

                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95"
                          onClick={() => deleteWarehouse(warehouse.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>


            {isModalOpen && editingWarehouse && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Warehouse</h2>
        <input
          type="text"
          placeholder="Warehouse Name"
          className="border p-3 w-full rounded-lg mb-2"
          value={editingWarehouse.name}
          onChange={(e) =>
            setEditingWarehouse({ ...editingWarehouse, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Address"
          className="border p-3 w-full rounded-lg mb-2"
          value={editingWarehouse.address}
          onChange={(e) =>
            setEditingWarehouse({ ...editingWarehouse, address: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="City ID"
          className="border p-3 w-full rounded-lg mb-2"
          value={editingWarehouse.cityId}
          onChange={(e) =>
            setEditingWarehouse({ ...editingWarehouse, cityId: e.target.value })
          }
        />
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded-lg mr-2"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={() => {
              updateWarehouse();
              setIsModalOpen(false);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )}

          </div>
        </div>
        <Footer />
      </div>
    );
  };

  export default WarehousePage;