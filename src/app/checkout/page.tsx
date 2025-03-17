"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/common/Footer";
import OrderSummary from "@/components/checkout/OrderSummary";
import DetailPayment from "@/components/checkout/DetailPayment";
import AddressComponent from "@/components/checkout/AddressComponent";
import SimpleNavbar from "@/components/common/SimpleNavbar";
import { getAccessToken } from "@/lib/utils/auth";
import DeliveryServiceComponent from "@/components/checkout/DeliveryServiceComponent";
import { getCartData } from "@/lib/utils/cart";
import { CartItem } from "@/types/cart";
import { Warehouse } from "@/types/warehouse";
import { placeOrder, updateOrderStatus } from "@/services/orderService";
import { toast } from "react-toastify";
import { MidtransPaymentResult, OrderResponse, PaymentMethod } from "@/types/payment";

declare global {
  interface Window {
    snap: {
      pay: (
        token: string,
        options: {
          onSuccess?: (result: MidtransPaymentResult) => void;
          onPending?: (result: MidtransPaymentResult) => void;
          onError?: (result: MidtransPaymentResult) => void;
          onClose?: () => void;
        }
      ) => void;
    };
  }
}

const CheckoutPage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<number | null>(null);
  const [addressId, setAddressId] = useState<number | null>(null);
  const [addressPostalCode, setAddressPostalCode] = useState<string | null>(null);
  const [nearestWarehouse, setNearestWarehouse] = useState<Warehouse | null>(null);
  const [snapToken, setSnapToken] = useState<string | null>(null);
  const [shippingFee, setShippingFee] = useState(0);
  const accessToken = getAccessToken();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!);
    script.onload = () => console.log("Midtrans Snap script loaded.");
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    getCartData(setCartItems, setLoading, router);
  }, [accessToken, router]);

  useEffect(() => {
    if (snapToken && window.snap) {
      window.snap.pay(snapToken, {
        onSuccess: async (result) => {
          console.log("Payment success:", result);
          try {
            await updateOrderStatus("PROCESSING", {}, undefined, result.order_id);
            toast.success("Payment successful! Redirecting...");
            router.push("/checkout/success");
          } catch (error) {
            console.error("Error updating order status:", error);
            toast.error("Payment successful, but failed to update order status.");
          }
        },
        onPending: (result) => {
          console.log("Waiting for payment:", result);
          toast.info("Waiting for payment! You can check your order in the order list.");
        },
        onError: (result) => {
          console.log("Payment failed:", result);
          toast.error("Payment failed! Please try again.");
        },
        onClose: () => {
          console.log("Payment popup closed.");
          toast.warning("You closed the payment popup. If you have paid, please check your order status.");
        },
      });
    }
  }, [snapToken, router]);  

  const subtotal = cartItems.reduce((total, item) => total + item.productPrice * item.quantity, 0);
  const totalPrice = subtotal + shippingFee;
  const totalWeight = cartItems.reduce((total, item) => total + item.productWeight, 0);

  const handleConfirmPayment = async () => {
    if (!addressId) {
      toast.error("Please select an address before proceeding with payment.");
      return;
    }

    setLoadingPayment(true);
    try {
      const orderData: OrderResponse = await placeOrder(shippingFee, addressId, selectedMethod, accessToken);
      const orderId = orderData.id;
      const transactionToken = orderData.transactionToken;
      const selectedPayment = paymentMethods.find((method) => method.id === selectedMethod);
      if (!selectedPayment) return;

      if (selectedPayment.name === "Manual Bank Transfer") {
        router.replace(`/checkout/payment/manual/${orderId}`);
      } else {
        setSnapToken(transactionToken);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoadingPayment(false);
      setShowPopup(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <SimpleNavbar />
      <main className="flex-1 container mx-auto p-6 mt-8 mb-8">
        <h1 className="text-3xl font-bold mb-4 text-red-600">Checkout</h1>
        {loading && 
          <div className="flex justify-center items-center py-6">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
              <p className="mt-2 text-gray-800 font-semibold">Getting Cart Items...</p>
            </div>
          </div>
        }
        {!loading && cartItems.length === 0 && <p>Your cart is empty.</p>}
        {!loading && cartItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col md:col-span-2">
              <AddressComponent 
                addressId={addressId} setAddressId={setAddressId} 
                addressPostalCode={addressPostalCode} setAddressPostalCode={setAddressPostalCode}
                nearestWarehouse={nearestWarehouse} setNearestWarehouse={setNearestWarehouse} 
              />
              {addressPostalCode !== null && (
                  <DeliveryServiceComponent
                    origin={nearestWarehouse?.subDistrictPostalCode ?? null}
                    destination={addressPostalCode ?? null}
                    weight={totalWeight || 0}
                    setShippingFee={setShippingFee}
                  />
              )}
              <OrderSummary cartItems={cartItems} />
            </div>
            <DetailPayment
              subtotal={subtotal}
              shippingFee={shippingFee}
              totalPrice={totalPrice}
              onShowPopup={() => setShowPopup(true)}
              paymentMethods={paymentMethods}
              setPaymentMethods={setPaymentMethods}
              selectedMethod={selectedMethod}
              setSelectedMethod={setSelectedMethod}
            />
          </div>
        )}
      </main>
      <Footer />

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            {loadingPayment ? (
              <div className="flex justify-center items-center py-6">
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                  <p className="mt-2 text-gray-800 font-semibold">Please Wait...</p>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-semibold text-black mb-4">Confirm Payment</h2>
                <p className="text-gray-700 mb-4">
                  Once you proceed, you <b>cannot change</b>, add, or remove items, and you also
                  <b> cannot change the address</b> or payment method. Are you sure you want to continue?
                </p>
                <div className="flex justify-end gap-4">
                  <button
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-400"
                    onClick={() => setShowPopup(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className={`px-4 py-2 text-white font-bold rounded-lg w-full transition ${
                      loadingPayment ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-500"
                    }`}
                    onClick={handleConfirmPayment}
                    disabled={loadingPayment}
                  >
                    {loadingPayment ? "Processing..." : "Confirm & Pay"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;