"use client";

import { ProductList } from "@/components/product-list";
import { useCartStore } from "@/store/cart-store";
import Image from "next/image";
import { Button } from "./ui/button";

interface Props {
  product: {
    id: number;
    name: string;
    image: string;
    price: number;
    description: string;
  };
}

export default function ProductDetail({ product }: Props) {
  const { items, addItem, decreaseItem } = useCartStore();
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

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
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 items-center">
      {product.image && (
        <div className="relative h-60 w-full">
          <Image
            alt={product.name}
            src={product.image}
            layout="fill"
            objectFit="cover"
            className="transition duration-300 hover:opacity-90"
          />
        </div>
      )}
      <div>
        <h1>{product.name}</h1>
        {product.description && (
          <p className="text-gray-600 text-sm mb-2">{product.description}</p>
        )}
        <p className="text-xl font-semibold text-gray-900">
          ${product.price.toFixed(2)}
        </p>

        <div className="flex items-center space-x-4">
          <Button onClick={() => decreaseItem(product.id)} variant={"outline"}>-</Button>
          <span className="text-lg font-semibold">{quantity}</span>
          <Button onClick={onAddItem}>+</Button>
        </div>
      </div>
    </div>
  );
}
