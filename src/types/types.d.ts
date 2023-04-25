export type Price = {
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
  
  export type Prices = Price[];