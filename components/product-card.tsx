import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";

import { HeartIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { cn, toastCRUD } from "@/lib/utils";
import { useState } from "react";
import { useCartStore } from "@/store/cart-store";
import Stripe from "stripe";

interface Product {
  product: Stripe.Product;
}

export const ProductCard = ({ product }: Product) => {
  const [liked, setLiked] = useState<boolean>(false);
  const { addItem } = useCartStore();
  const price = product.default_price as Stripe.Price;
  const priceAmount =
    price && price.unit_amount ? (price.unit_amount / 100).toFixed(2) : "0";
  const image = product.images && product.images[0] ? product.images[0] : "";
  const size = product.metadata && product.metadata.size ? product.metadata.size : "";
  const color = product.metadata && product.metadata.color ? product.metadata.color : "";

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
    <div className="relative max-w-md  rounded-xl bg-gradient-to-r from-neutral-600 to-violet-300 pt-0 shadow-lg">
      <div className="flex h-60 items-center justify-center">
        <Image
          alt={product.name}
          src={image}
          priority
          height={300}
          width={300}
          className="object-contain"
        />
      </div>
      <Button
        size="icon"
        onClick={() => setLiked(!liked)}
        className="bg-primary/10 hover:bg-primary/20 absolute top-4 right-4 rounded-full"
      >
        <HeartIcon
          className={cn(
            liked ? "fill-destructive stroke-destructive" : "stroke-white",
          )}
        />
        <span className="sr-only">Like</span>
      </Button>
      <Card className="border-none">
        <CardHeader>
          <Link
            href={`/products/${product.id}`}
            // href=""
            className="cursor-pointer hover:text-indigo-600"
          >
            <CardTitle>{product.name}</CardTitle>
          </Link>
          <CardDescription className="flex items-center gap-2">
            {size && <Badge variant="outline" className="rounded-sm">
              {size}
            </Badge>}
            {color && <Badge variant="outline" className="rounded-sm">
              {color}
            </Badge>}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{product.description}</p>
        </CardContent>
        <CardFooter className="justify-between gap-3 max-sm:flex-col max-sm:items-stretch">
          <div className="flex flex-col">
            <span className="text-sm font-medium uppercase">Price</span>
            <span className="text-xl font-semibold">${priceAmount}</span>
          </div>
          <Button
            onClick={onAddItem}
            variant={"default"}
            className="bg-gray-500"
            size="lg"
          >
            Add to cart
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
