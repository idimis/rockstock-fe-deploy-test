"use client";

import { useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(false);
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
    if (!decoded || decoded?.roles?.[0] === "Customer") {
      router.replace(decoded ? "/unauthorized" : "/login");
    }
  }, [router, accessToken, decoded]);

  useEffect(() => {
    setLoading(true);
    fetchAndSetOrders(filters, page, size, setOrders, setTotalPages)
      .finally(() => setLoading(false));
    setWarehouses([]);
  }, [filters, page, size]);
  
  useEffect(() => {
    if (decoded?.roles?.[0] === "Super Admin") {
      fetchWarehouses()
      .then(({ warehouses }) => setWarehouses(warehouses))
      .catch(() => console.error("Failed to fetch warehouses"));
    }
    if (decoded?.roles?.[0] === "Warehouse Admin") {
      fetchWHAdminWarehouses()
      .then(({ warehouses }) => setWarehouses(warehouses))
      .catch(() => console.error("Failed to fetch warehouses"));
    }
  }, [decoded?.roles?.[0]]);

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
    <main className="p-2 md:p-6 flex-1">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">📦 Order Management</h1>
        <p>View and manage orders here.</p>
      </div>

      <OrderFilter filters={filters} setFilters={setFilters} setPage={setPage} warehouses={warehouses} />
      
      {loading ? (
        <div className="flex justify-center items-center py-6">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
            <p className="mt-2 text-gray-800 font-semibold">Getting Order Data...</p>
          </div>
        </div>
      ) : !loading && orders.length > 0 ? (
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
      <div className="flex justify-center items-center mt-4">
        <button 
          disabled={page === 1} 
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className={`px-4 py-2 mx-2 rounded-lg ${page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-red-600 text-white"}`}
        >
          Previous
        </button>
        <span className="text-lg font-semibold px-4">{page} / {totalPages}</span>
        <button 
          disabled={page === totalPages} 
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          className={`px-4 py-2 mx-2 rounded-lg ${page === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-red-600 text-white"}`}
        >
          Next
        </button>
      </div>
      {showPopup && selectedOrder && (
        <OrderDetailPopup
          order={selectedOrder}
          orderItems={orderItems}
          isLoading={isLoadingOrderItems}
          onClose={handleCloseOrderDetail}
        />
      )}
    </main>
  );
};

export default OrdersPage;