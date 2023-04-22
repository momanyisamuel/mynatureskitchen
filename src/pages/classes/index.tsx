import Card from "@/components/Card";
import { api } from "@/utils/api";
import { FC, useState } from "react";
import Stripe from "stripe";

interface indexProps {}

const index: FC<indexProps> = ({}) => {
  const { data: availableClasses, refetch } = api.checkout.getAvailableClasses.useQuery();

  return (
    <div className="border">
      <div className="mt-8 border">
        {availableClasses?.map((availableClass) => (
          <>
            <Card key={ availableClass.product ? availableClass.product.id : "" } price={availableClass.price} />
          </>
        ))}
      </div>
    </div>
  );
};

export default index;
