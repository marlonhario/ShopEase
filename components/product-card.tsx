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

import { cn } from "@/lib/utils";
import { useState } from "react";
import { useCartStore } from "@/store/cart-store";

interface Props {
  product: {
    id: number;
    name: string;
    image: string;
    price: number;
    size: string;
    color: string;
    description: string;
  };
}

export const ProductCard = ({ product }: Props) => {
  const [liked, setLiked] = useState<boolean>(false);
  const { items, addItem, removeItem } = useCartStore();

  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

  return (
    <div className="relative max-w-md  rounded-xl bg-gradient-to-r from-neutral-600 to-violet-300 pt-0 shadow-lg">
      <div className="flex h-60 items-center justify-center">
        <Image
          alt={product.name}
          src={product.image}
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
            liked ? "fill-destructive stroke-destructive" : "stroke-white"
          )}
        />
        <span className="sr-only">Like</span>
      </Button>
      <Card className="border-none">
        <CardHeader>
          <Link
            href={`/products/${product.id}`}
            className="cursor-pointer hover:text-indigo-600"
          >
            <CardTitle>{product.name}</CardTitle>
          </Link>
          <CardDescription className="flex items-center gap-2">
            <Badge variant="outline" className="rounded-sm">
              {product.size}
            </Badge>
            <Badge variant="outline" className="rounded-sm">
              {product.color}
            </Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{product.description}</p>
        </CardContent>
        <CardFooter className="justify-between gap-3 max-sm:flex-col max-sm:items-stretch">
          <div className="flex flex-col">
            <span className="text-sm font-medium uppercase">Price</span>
            <span className="text-xl font-semibold">${product.price}</span>
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

  return (
    <Link href={`/products/${product.id}`} className="block h-full">
      <Card className="group hover:shadow-2xl transition duration-300 py-0 h-full flex flex-col border-gray-300 gap-0">
        {product.image && (
          <div className="relative h-60 w-full">
            <Image
              alt={product.name}
              src={product.image}
              layout="fill"
              objectFit="cover"
              className="group-hover:opacity-90 transition-opacity duration-300 rounded-t-lg"
            />
          </div>
        )}
        <CardHeader className="p-4">
          <CardTitle className="text-xl font-bold text-gray-800">
            {product.name}
          </CardTitle>
          <CardContent className="p-4 flex-grow flex flex-col justify-between">
            {product.description && (
              <p className="text-gray-600 text-sm mb-2">
                {product.description}
              </p>
            )}
            {product.price && (
              <p className="text-xl"> ${product.price.toFixed(2)}</p>
            )}
            <Button>View Details</Button>
          </CardContent>
        </CardHeader>
      </Card>
    </Link>
  );
};
