import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

export const useCart = () => {
  const queryClient = useQueryClient();

  // Get cart from localStorage
  const { data: cart = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: () => {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    },
  });

  const handleAddToCart = (product) => {
    cart.push(product)// add item
    localStorage.setItem("cart", JSON.stringify(cart));
    queryClient.invalidateQueries({ queryKey: ["cart"] });
    toast({ title: "Added to cart" });
  };

  const handleRemove = (id: string) => {
    const newCart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(newCart));
    queryClient.invalidateQueries({ queryKey: ["cart"] });
	    toast({ title: "Removed from cart" });
  };

  const handleClear = () => {
    localStorage.setItem("cart", JSON.stringify([]));
    queryClient.invalidateQueries({ queryKey: ["cart"] });
  };

  return {
    cart,
    handleAddToCart,
    handleRemove,
    handleClear,
  };
};
