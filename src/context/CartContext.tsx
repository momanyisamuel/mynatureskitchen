import {
  useState,
  useEffect,
  useRef,
  useContext,
  createContext,
  useCallback,
} from "react";

type Price = {
  id: string;
  object: string;
  active: boolean;
  billing_scheme: string;
  created: number;
  currency: string;
  custom_unit_amount: null | number;
  livemode: boolean;
  lookup_key: null | string;
  metadata: Record<string, unknown>;
  nickname: null | string;
  product: {
    id: string;
    object: string;
    active: boolean;
    attributes: string[];
    created: number;
    default_price: string;
    description: string;
    images: string[];
    livemode: boolean;
    metadata: Record<string, unknown>;
    name: string;
    package_dimensions: null;
    shippable: null;
    statement_descriptor: null;
    tax_code: null;
    type: string;
    unit_label: null;
    updated: number;
    url: null;
  };
  recurring: {
    aggregate_usage: null;
    interval: string;
    interval_count: number;
    trial_period_days: null;
    usage_type: string;
  };
  tax_behavior: string;
  tiers_mode: null;
  transform_quantity: null;
  type: string;
  unit_amount: number;
  unit_amount_decimal: string;
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
  return json ? JSON.parse(json) : null;
};
const saveJSON = (key: string, data: Prices): void =>
  localStorage.setItem(key, JSON.stringify(data));

const CartProvider = ({ children }: any) => {
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
      setItems((items) => items.filter((price) => price.id !== id.toString())),
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
