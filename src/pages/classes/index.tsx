import Card from "@/components/Card";
import { api } from "@/utils/api";
import { FC, useState } from "react";
import Stripe from "stripe";

interface indexProps {}

const index: FC<indexProps> = ({}) => {
  const { data: products, refetch } = api.checkout.getProducts.useQuery();

  return (
    <div className="border">
      <div className="mt-8 border">
        {products?.map((product) => (
          <>
            <Card key={product.id} price={product} />
          </>
        ))}
      </div>
    </div>
  );
};

export default index;
