"use client";

import { useCartStore } from "@/store/cart-store";
import Image from "next/image";
import { Button } from "./ui/button";
import Stripe from "stripe";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { toastCRUD } from "@/lib/utils";

interface Product {
  product: Stripe.Product;
}

export default function ProductDetail({ product }: Product) {
  const { addItem } = useCartStore();
  const price = product.default_price as Stripe.Price;
  const priceAmount =
    price && price.unit_amount ? (price.unit_amount / 100).toFixed(2) : "0";
  const image = product.images && product.images[0] ? product.images[0] : "";

  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: priceAmount,
      image: image,
      quantity: 1,
    });

    toastCRUD.create();
  };

  return (
    <Card className="container px-10 py-0 sm:flex-row h-[500PX] sm:gap-0">
      <CardContent className="grow-1 px-0 relative">
        <Image
          alt={product.name}
          src={image}
          layout="fill"
          objectFit="contain"
          className="h-14 w-14 size-full rounded-l-xl"
        />
      </CardContent>
      <div className="sm:min-w-100 justify-center flex flex-col">
        <CardHeader className="pt-6">
          <CardTitle>Dreamy Colorwave Gradient</CardTitle>
          <CardDescription>
            A smooth blend of vibrant pinks, purples, and blues for a magical
            touch.
          </CardDescription>
        </CardHeader>
        <CardFooter className="gap-3 py-6">
          <Button
            onClick={onAddItem}
            className="bg-transparent bg-gradient-to-br from-purple-500 to-pink-500 text-white focus-visible:ring-pink-600/20"
          >
            Add to cart
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
