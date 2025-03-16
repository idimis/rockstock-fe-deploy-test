"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Combobox } from "@headlessui/react";

interface Warehouse {
  id: number;
  name: string;
}

interface AdminUser {
  id: number;
  fullName: string;
  email: string;
}

interface AssignedAdmin {
  id: number;
  userId: number;
  fullname: string;
  email: string;
  warehouseId: number;
  warehouseName: string;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const AssignAdminPage = () => {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [assignedAdmins, setAssignedAdmins] = useState<AssignedAdmin[]>([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWarehouses();
    fetchAdmins();
    fetchAssignedAdmins();
  }, []);

  const fetchWarehouses = async () => {
    try {
      const response = await axios.get<Warehouse[]>(`${BACKEND_URL}/api/v1/warehouses`);
      setWarehouses(response.data);
    } catch {
      setError("Failed to fetch warehouses");
    }
  };

  const fetchAdmins = async () => {
    try {
      const response = await axios.get<AdminUser[]>(`${BACKEND_URL}/api/v1/admin`);
      setAdmins(response.data);
    } catch {
      setError("Failed to fetch admin users");
    }
  };

  const fetchAssignedAdmins = async () => {
    try {
      const response = await axios.get<AssignedAdmin[]>(`${BACKEND_URL}/api/v1/warehouse-admins`);
      setAssignedAdmins(response.data);
    } catch {
      setError("Failed to fetch assigned admins");
    }
  };

  const assignAdmin = async () => {
    if (!selectedWarehouse || !selectedAdmin) return;
    try {
      await axios.post(`${BACKEND_URL}/api/v1/warehouse-admins/assign`, {
        warehouseId: selectedWarehouse.id,
        userId: selectedAdmin.id,
      });
      alert(`✅ ${selectedAdmin.fullName} assigned to ${selectedWarehouse.name} successfully!`);
      fetchAssignedAdmins();
    } catch {
      setError("Failed to assign warehouse admin");
    }
  };

  const revokeAdmin = async (id: number) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/warehouse-admins/remove/${id}`);
      alert("✅ Admin revoked successfully!");
      fetchAssignedAdmins();
    } catch {
      setError("Failed to revoke admin");
    }
  };
  

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 text-black">
      
      <div className="flex flex-grow">
        <div className="flex-grow p-6 bg-white shadow-lg rounded-xl">
          <h1 className="text-2xl font-bold mb-6">🏭 Warehouse Management</h1>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <section className="mb-6 p-6 border rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-semibold mb-4">👤 Assign Warehouse Admin</h2>
            
            {/* Warehouse Selection */}
            <Combobox value={selectedWarehouse} onChange={setSelectedWarehouse}>
              <Combobox.Input
                className="border p-3 rounded-lg w-full"
                placeholder="Search Warehouse"
                value={selectedWarehouse ? selectedWarehouse.name : ""}
                onChange={() => {}}
              />
              <Combobox.Options className="bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {warehouses.map((warehouse) => (
                  <Combobox.Option key={warehouse.id} value={warehouse} className="p-2 cursor-pointer hover:bg-gray-200">
                    {warehouse.name}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Combobox>

            {/* Admin Selection */}
            <Combobox value={selectedAdmin} onChange={setSelectedAdmin}>
              <Combobox.Input
                className="border p-3 rounded-lg w-full mt-4"
                placeholder="Search Admin by Email"
                value={selectedAdmin ? `${selectedAdmin.fullName} (${selectedAdmin.email})` : ""}
                onChange={() => {}}
              />
              <Combobox.Options className="bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {admins.map((admin) => (
                  <Combobox.Option key={admin.id} value={admin} className="p-2 cursor-pointer hover:bg-gray-200">
                    {admin.fullName} ({admin.email})
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Combobox>

            <button className="mt-4 px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={assignAdmin}>
              Assign Warehouse Admin
            </button>
          </section>

          <section className="p-6 border rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-semibold mb-4">📋 Assigned Admins</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Admin</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Warehouse</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {assignedAdmins.map((entry) => (
                  <tr key={entry.id}>
                    <td className="border p-2">{entry.fullname}</td>
                    <td className="border p-2">{entry.email}</td>
                    <td className="border p-2">{entry.warehouseName}</td>
                    <td className="border p-2">
                      <button className="bg-red-500 text-white px-3 py-1 rounded-lg" onClick={() => revokeAdmin(entry.id)}>
                        Revoke
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
   
    </div>
  );
};

export default AssignAdminPage;
