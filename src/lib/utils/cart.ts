import { fetchCartItems } from "@/services/cartService";
import { CartItem } from "@/types/cart";
import { useRouter } from "next/navigation";

export const getCartData = async (
  setCartItems: (cartItems: CartItem[]) => void,
  setLoading: (loading: boolean) => void,
  router: ReturnType<typeof useRouter>
) => {
  setLoading(true) 
  try {
    const data = await fetchCartItems();
    setCartItems(data.length ? data : []);
  } catch (err: unknown) {
    console.log("Get Cart Item Error");

    if ((err as Error).message === "Unauthorized") {
        router.replace("/login");
        return;
    }

    router.refresh()
  } finally {
    setLoading(false)
  }
};