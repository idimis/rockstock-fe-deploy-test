"use client";

import { useEffect, useState } from "react";
import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";
import UserSidebarPanel from "@/components/common/UserSidebar";
import Footer from "@/components/common/Footer";
import { getAccessToken } from "@/lib/utils/auth";
import { useRouter } from "next/navigation";
import { Order, OrderFilterProps, OrderItem } from "@/types/order";
import { Warehouse } from "@/types/warehouse";
import { decodeToken } from "@/lib/utils/decodeToken";
import { fetchOrderItems } from "@/services/orderService";
import OrderDetailPopup from "@/components/orders/OrderDetailPopup";
import { fetchWarehouses, fetchWHAdminWarehouses } from "@/services/warehouseService";
import OrderFilter from "@/components/orders/OrderFilter";
import AdminOrderCard from "@/components/orders/AdminOrderCard";
import { fetchAndSetOrders, handleApprovePaymentProof, handleCancelOrder, handleDeliverOrder, handleOpenPaymentProof, handleRejectPaymentProof } from "@/lib/utils/order";

const OrdersPage = () => {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoadingOrderItems, setIsLoadingOrderItems] = useState(false);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [filters, setFilters] = useState<OrderFilterProps["filters"]>({ 
    status: null, 
    startDate: null, 
    endDate: null, 
    warehouseId: null,
    sortBy: "createdAt",
    sortOrder: "desc"
  });
  const [page, setPage] = useState(1);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const accessToken = getAccessToken();
  const decoded = accessToken ? decodeToken(accessToken) : null;

  useEffect(() => {
    if (!accessToken) {
      router.replace("/login");
      return;
    }
    if (!decoded || decoded?.roles === "Customer") {
      router.replace(decoded ? "/unauthorized" : "/login");
    }
  }, [router, accessToken, decoded]);

  useEffect(() => {
    fetchAndSetOrders(filters, page, size, setOrders, setTotalPages);
  }, [filters, page, size]);
  
  useEffect(() => {
    if (decoded?.roles === "Super Admin") {
      fetchWarehouses()
      .then(({ warehouses }) => setWarehouses(warehouses))
      .catch(() => console.error("Failed to fetch warehouses"));
    }
    if (decoded?.roles === "Warehouse Admin") {
      fetchWHAdminWarehouses()
      .then(({ warehouses }) => setWarehouses(warehouses))
      .catch(() => console.error("Failed to fetch warehouses"));
    }
  }, []);

  const handleOpenOrderDetail = async (order: Order) => {
    setSelectedOrder(order);
    setIsLoadingOrderItems(true);
    try {
      const items = await fetchOrderItems(order.orderId);
      setOrderItems(items);
    } catch {
      console.error("Failed to fetch order items");
    } finally {
      setIsLoadingOrderItems(false);
    }
    setShowPopup(true);
  };

  const handleCloseOrderDetail = () => {
    setOrderItems([]);
    setSelectedOrder(null);
    setShowPopup(false);
  }

  return (
    <div>
      <Header />
      <Navbar />
      <div className="flex text-black">
        <UserSidebarPanel />
        <main className="p-2 md:p-6 flex-1">
          <div className="mb-4">
            <h1 className="text-2xl font-semibold">My Orders</h1>
            <p>View and manage your past orders here.</p>
          </div>
          <OrderFilter filters={filters} setFilters={setFilters} setPage={setPage} warehouses={warehouses} />
          <div>
            {orders.length > 0 ? (
              orders.map((order) => (
                <AdminOrderCard key={order.orderId} 
                  decoded={decoded}
                  order={order} 
                  onOpenDetail={handleOpenOrderDetail} 
                  onOpenPaymentProof={handleOpenPaymentProof}
                  onRejectPaymentProof={() => handleRejectPaymentProof(order, filters, page, size, setOrders, setTotalPages)}
                  onApprovePaymentProof={() => handleApprovePaymentProof(order, filters, page, size, setOrders, setTotalPages)}
                  onDeliverOrder={() => handleDeliverOrder(order, filters, page, size, setOrders, setTotalPages)}
                  onCancel={() => handleCancelOrder(order, filters, page, size, setOrders, setTotalPages)}
                />
              ))
            ) : (
              <div className="border p-4 my-2 w-full bg-white rounded-lg shadow mx-auto">
                <p>There are no orders in this status!</p>
              </div>
            )}
          </div>
          <div className="flex justify-center mt-4">
            <button 
              disabled={page === 1} 
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className={`px-4 py-2 mx-2 ${page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
            >
              Previous
            </button>
            <span className="text-lg font-semibold px-4">{page} / {totalPages}</span>
            <button 
              disabled={page === totalPages} 
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              className={`px-4 py-2 mx-2 ${page === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
            >
              Next
            </button>
          </div>
        </main>
      </div>
      <Footer />
      {showPopup && selectedOrder && (
        <OrderDetailPopup
          order={selectedOrder}
          orderItems={orderItems}
          isLoading={isLoadingOrderItems}
          onClose={handleCloseOrderDetail}
        />
      )}
    </div>
  );
};

export default OrdersPage;