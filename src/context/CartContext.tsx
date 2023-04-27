import {
  useState,
  useEffect,
  useRef,
  useContext,
  createContext,
  useCallback,
  type ReactNode,
} from "react";

type Price = {
  id: string;
  title: string;
  description: string;
  date: Date;
  price: {
    id: string;
    unit_amount: number;
  };
  product: {
    id: string;
    name: string;
    description: string;
    images: string[];
  };
};


type Prices = Price[];

interface ICartContext {
  items: Prices;
  addItem: (price: Price) => void;
  removeItem: (id: string) => void;
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

const loadJSON = (key: string): Prices | null => {
  if (key === null) return null;
  const json = localStorage.getItem(key);
  return json ? JSON.parse(json || '{}') as Price[] : null
};
const saveJSON = (key: string, data: Prices): void =>
  localStorage.setItem(key, JSON.stringify(data));

interface CartProviderProps {
  children: ReactNode
}

const CartProvider = ({ children }: CartProviderProps) => {
  const key = `STRIPE_CART_ITEMS`;
  const firstRender = useRef(true);
  const [items, setItems] = useState<Prices>([]);

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
    (price: Price) => setItems((items) => items.concat([price])),
    []
  );
  const removeItem = useCallback(
    (id: string) =>
      setItems((items) => items.filter((price) => price.id !== id)),
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
