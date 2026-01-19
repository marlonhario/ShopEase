"use client";

import * as React from "react";

import { PlusIcon, MinusIcon, Trash2Icon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart-store";
import { toastCRUD } from "@/lib/utils";
import { checkoutStripe } from "./checkout-stripe";

export default function CartCheckout() {
  const { items, decreaseItem, addItem, removeItem } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const total = items.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0,
  );

  if (total === 0 || items.length === 0) {
    return (
      <div>
        <h1>Your Cart is Empty.</h1>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center items-center  flex-col gap-6 m-auto">
      <ItemGroup className="min-w-sx  md:min-w-2xl">
        {items.map((item, index) => (
          <React.Fragment key={item.id}>
            <Item>
              <ItemMedia
                variant={"image"}
                className="h-14 w-14 flex items-center justify-center"
              >
                <Avatar className="h-14 w-14 rounded-lg">
                  <AvatarImage src={item.image ? item.image : "/image.png"} />
                  <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent className="gap-1">
                <ItemTitle>{item.name}</ItemTitle>
                <ItemDescription>${item.price}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button
                  onClick={() => decreaseItem(item.id)}
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                >
                  <MinusIcon />
                </Button>
                <Badge variant="secondary">{item.quantity}</Badge>
                <Button
                  onClick={() => {
                    addItem({ ...item, quantity: 1 });
                  }}
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                >
                  <PlusIcon />
                </Button>
                <Button
                  onClick={() => {
                    removeItem(item.id);
                    toastCRUD.delete();
                  }}
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                >
                  <Trash2Icon />
                </Button>
              </ItemActions>
            </Item>
            {index !== items.length - 1 && <ItemSeparator />}
          </React.Fragment>
        ))}
      </ItemGroup>
      <div className="flex items-center justify-end min-w-sx  md:min-w-2xl">
        <Badge className="rounded-sm border-transparent bg-gradient-to-r from-indigo-500 to-pink-500 [background-size:105%] bg-center text-white">
          {cartCount} item/s
        </Badge>
        <Badge className="mx-2 rounded-sm border-transparent bg-gradient-to-r from-indigo-500 to-pink-500 [background-size:105%] bg-center text-white">
          TOTAL: ${total.toFixed(2)}
        </Badge>
        <form action={checkoutStripe}>
          <input type="hidden" name="items" value={JSON.stringify(items)} />
          <Button
            variant="destructive"
            className="ring-offset-background hover:ring-red-600/90 transition-all duration-300 hover:ring-2 hover:ring-offset-2"
          >
            Proceed to Payment
          </Button>
        </form>
      </div>
    </div>
  );
}
