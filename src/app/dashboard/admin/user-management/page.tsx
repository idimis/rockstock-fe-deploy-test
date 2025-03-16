"use client";

import { useState, useEffect } from "react";
import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import AdminSidebarPanel from "@/components/common/AdminSidebar";
import axios from "axios";
import Dialog from "@/components/ui/Dialog";
import UserList from "@/components/common/user/UserList";
   

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface Admin {
  id: number;
  fullname: string;
  email: string;
  password?: string;
}

const AdminPage = () => {
  // const { data: session, status } = useSession();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [newAdmin, setNewAdmin] = useState<Omit<Admin, "id">>({
    fullname: "",
    email: "",
    password: "",
  });
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("Unauthorized: No token found");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get<Admin[]>(`${BACKEND_URL}/api/v1/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmins(response.data);
    } catch (error) {
      console.error("Error fetching admins:", error);
      setError("Failed to fetch admins. Please check your network or token.");
    } finally {
      setLoading(false);
    }
  };
  

  const createAdmin = async () => {
    if (!newAdmin.fullname || !newAdmin.email || !newAdmin.password) {
      setError("Fullname, Email, dan Password harus diisi");
      return;
    }
  
    const adminPayload = {
      ...newAdmin,
      role: "Warehouse Admin", 
    };
  
    console.log("Sending payload:", adminPayload);
  
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("Unauthorized: No token found");
      setLoading(false);
      return;
    }
  
    try {
      await axios.post(`${BACKEND_URL}/api/v1/admin`, adminPayload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAdmins();
      setNewAdmin({ fullname: "", email: "", password: "" });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to create admin", error);
      setError("Failed to create admin. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  
  const updateAdmin = async () => {
    if (!editingAdmin) return;
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("Unauthorized: No token found");
      setLoading(false);
      return;
    }
    try {
      await axios.put(`${BACKEND_URL}/api/v1/admin/${editingAdmin.id}`, editingAdmin, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingAdmin(null);
      setIsModalOpen(false);
      fetchAdmins();
    } catch (error) {
      console.error("Failed to update admin", error);
      setError("Failed to update admin. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const deleteAdmin = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this admin?");
    if (!confirmDelete) return;
  
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("Unauthorized: No token found");
      setLoading(false);
      return;
    }
  
    const requesterId = localStorage.getItem("userId"); // Simpan userId saat login
  
    if (!requesterId) {
      setError("Unauthorized: No requesterId found");
      setLoading(false);
      return;
    }
  
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/admin/${id}?requesterId=${requesterId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== id));
    } catch (error) {
      console.error("Failed to delete admin", error);
      setError("Failed to delete admin. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
      <Header />
      <Navbar />
      <div className="flex flex-grow">
        <AdminSidebarPanel />
        <div className="flex-grow p-6 bg-white shadow-xl rounded-lg">
          <h1 className="text-3xl font-bold mb-6">👤 Manage Admin</h1>
          {error && <div className="text-red-500 mb-4">{error}</div>}

          <div className="mb-6 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">➕ Add New Admin</h2>
            <input type="text" placeholder="Fullname" className="border p-2 mb-2 w-full rounded-lg" value={newAdmin.fullname} onChange={(e) => setNewAdmin({ ...newAdmin, fullname: e.target.value })} />
            <input type="email" placeholder="Email" className="border p-2 mb-2 w-full rounded-lg" value={newAdmin.email} onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })} />
            <input type="password" placeholder="Password" className="border p-2 mb-2 w-full rounded-lg" value={newAdmin.password} onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })} />
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={createAdmin}>Create Admin</button>
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {admins.map((admin) => (
    <div key={admin.id} className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">{admin.fullname} </h3>
      <p className="text-sm text-gray-600">{admin.email}</p>
      <div className="mt-2 flex gap-2">
        <button 
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600" 
          onClick={() => { setEditingAdmin(admin); setIsModalOpen(true); }}
        >
          Edit
        </button>
        <button 
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600" 
          onClick={() => deleteAdmin(admin.id)}
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>
)}

{isModalOpen && editingAdmin && (
            <Dialog onClose={() => setIsModalOpen(false)}>
              <h2 className="text-xl font-semibold mb-4">✏️ Edit Admin</h2>
              <input type="text" placeholder="Fullname" className="input-field border rounded p-2" value={editingAdmin.fullname} onChange={(e) => setEditingAdmin({ ...editingAdmin, fullname: e.target.value })} />
              <input type="email" placeholder="Email" className="input-field border rounded p-2" value={editingAdmin.email} onChange={(e) => setEditingAdmin({ ...editingAdmin, email: e.target.value })} />
              <input type="password" placeholder="Password" className="input-field border rounded p-2" value={editingAdmin.password || ""} onChange={(e) => setEditingAdmin({ ...editingAdmin, password: e.target.value })} />
              <div className="flex justify-end gap-2 mt-4">
                <button className="px-6 py-2 rounded-lg text-gray-700 bg-gray-300 hover:bg-gray-400" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button className="btn-primary px-6 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700" onClick={updateAdmin}>Save</button>
              </div>
            </Dialog>
          )}
          

<div className="p-6">
      <h4 className="text-2xl font-bold mb-4">Manage Users</h4>
      <UserList />
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPage;
