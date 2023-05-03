"use client"
import { useCart } from "@/context/CartContext";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { api } from "@/utils/api";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import Image from "next/image";
import router from "next/router";
import { type FC, Fragment, useState } from "react";

interface CartProps {
  open: boolean;
  setCartSliderIsOpen: (value: boolean) => void;
}

const Cart: FC<CartProps> = ({ open, setCartSliderIsOpen }: CartProps) => {
  const { items, removeItem } = useCart();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const subTotal = items.reduce(
    (acc, item) => (acc += item.price?.unit_amount),
    0
  );

  const checkout = api.checkout.checkoutSession.useMutation({
    onError() {
      setError(true);
      return setTimeout(() => {
        setError(false);
      }, 1500);
    },
    onSuccess({ url }) {
      void router.push(url || "/");
    },
    onMutate({ products }) {
      localStorage.setItem("products", JSON.stringify(products));
    },
    onSettled() {
      setLoading(false);
    },
  });

 

  const handleCheckout = async () => {
    try {
      const result = await checkout.mutateAsync({
        products: items.map((item) => {
          return {
            id: item.id,
            title: item.title,
            description: item.description,
            date: new Date(item.date),
            price: {
              id: item.price.id,
              unit_amount: item.price.unit_amount,
            },
            product: {
              id: item.product.id,
              name: item.product.name,
              description: item.product.description,
              images: item.product.images,
            },
          };
        }),
      });
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setCartSliderIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div
                    className={cn(
                      "flex h-full flex-col overflow-y-scroll  bg-background bg-atlantis-50 font-sans antialiased shadow-xl",
                      fontSans.variable
                    )}
                  >
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setCartSliderIsOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <X className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {items.map((price) => (
                              <li key={price.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <Image
                                    src={
                                      price.product?.images[0] ??
                                      "/public/default-image.png"
                                    }
                                    width={96}
                                    height={96}
                                    alt={price.product?.description}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href="">{price.product?.name}</a>
                                      </h3>
                                      <p className="ml-4">
                                        {(
                                          price.price?.unit_amount / 100
                                        ).toLocaleString("en-CA", {
                                          style: "currency",
                                          currency: "CAD",
                                        })}
                                      </p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                      {price.product?.description}
                                    </p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">Qty 1</p>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        onClick={() => removeItem(price.id)}
                                        className="font-medium text-rose-400 hover:text-rose-300"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>
                          {(subTotal / 100).toLocaleString("en-CA", {
                            style: "currency",
                            currency: "CAD",
                          })}
                        </p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <button
                          type="button"
                          // eslint-disable-next-line @typescript-eslint/no-misused-promises
                          onClick={handleCheckout}
                          className="w-full flex items-center justify-center rounded-md border border-transparent bg-atlantis-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-atlantis-700"
                        >
                          Checkout
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <button
                            type="button"
                            className="pl-2 font-medium text-atlantis-600 hover:text-atlantis-500"
                            onClick={() => setCartSliderIsOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Cart;
