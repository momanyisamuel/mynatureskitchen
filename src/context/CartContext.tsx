import {
  useState,
  useEffect,
  useRef,
  useContext,
  createContext,
  useCallback,
} from "react";

type IProduct = {
    name: string
    href: string
    description: string
    images: string[]
}

interface ICartItem {
  id: number;
  name: string;
  price: number;
  product: IProduct
  unit_amount: number;
}

interface ICartContext {
  items: ICartItem[];
  addItem: (price: ICartItem) => void;
  removeItem: (id: number) => void;
  resetCart: () => void;
}

const CartContext = createContext<ICartContext | null>(null);
export const useCart = (): ICartContext => {
  const context = useContext<ICartContext | null>(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

const loadJSON = (key: string): ICartItem[] | null => {
  if (key === null) return null;
  const json = localStorage.getItem(key);
  return json ? JSON.parse(json) : null;
};
const saveJSON = (key: string, data: ICartItem[]): void =>
  localStorage.setItem(key, JSON.stringify(data));

const CartProvider = ({ children }: any) => {
  const key = `STRIPE_CART_ITEMS`;
  const firstRender = useRef(true);
  const [items, setItems] = useState<ICartItem[]>([]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      const localItems = loadJSON(key);
      localItems && setItems(localItems);
      return;
    }
    saveJSON(key, items);
  }, [key, items]);

  const addItem = useCallback(
    (price: ICartItem) => setItems((prices) => prices.concat([price])),
    []
  );
  const removeItem = useCallback(
    (id: number) =>
      setItems((prices) => prices.filter((price) => price.id !== id)),
    []
  );
  const resetCart = useCallback(() => setItems([]), []);

  const cartContextValue: ICartContext = {
    items,
    addItem,
    removeItem,
    resetCart,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
