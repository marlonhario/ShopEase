// "use client";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useCartStore } from "@/store/cart-store";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// // import { checkoutAction } from "./checkout.action";

// export default function CheckoutPage() {
//   const { items, removeItem, addItem, clearCart } = useCartStore();
//   const router = useRouter();
//   const [url, setUrl] = useState(null);

//   // useEffect(() => {
//   //   if (url) {
//   //     window.location.href = url;
//   //   }
//   // }, [url]);

//   const total = items.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   if (total === 0 || items.length === 0) {
//     return (
//       <div>
//         <h1>Your Cart is Empty.</h1>
//       </div>
//     );
//   }

//   async function pay() {
//     const res = await fetch("/api/paymongo", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ amount: 100 }),
//     });

//     const data = await res.json();

//     const redirectUrl = data?.data?.attributes?.next_action?.redirect?.url;
//     // if (data || redirectUrl) console.log({ daww: data, redirectUrl });

//     if (redirectUrl) {
//       window.location.href = redirectUrl;
//       // router.push(redirectUrl);
//       // setUrl(redirectUrl);
//     } else {
//       console.error("No redirect URL", data);
//     }
//   }

//   const payWithGCash = async () => {
//     const res = await fetch("/api/paymongo/gcash", {
//       method: "POST",
//     });

//     const data = await res.json();
//     window.location.href = data.data.attributes.checkout_url;
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
//       <Card className="max-w-md mx-auto mb-8">
//         <CardHeader>
//           <CardTitle className="text-xl font-bold">Order Summary</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ul className="space-y-4">
//             {items.map((item, key) => (
//               <li key={key} className="flex flex-col gap-2 border-b pb-2">
//                 <div className="flex justify-between">
//                   <span className="font-medium">{item.name} </span>
//                   <span className="font-semibold">
//                     ${((item.price * item.quantity) / 100).toFixed(2)}
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Button
//                     onClick={() => removeItem(item.id)}
//                     variant={"outline"}
//                   >
//                     -
//                   </Button>
//                   <span className="text-lg font-semibold">{item.quantity}</span>
//                   <Button onClick={() => addItem({ ...item, quantity: 1 })}>
//                     +
//                   </Button>
//                 </div>
//               </li>
//             ))}
//           </ul>

//           <div className="mt-4 border-t pt-2 text-lg font-semibold">
//             Total: ${(total / 100).toFixed(2)}
//           </div>
//         </CardContent>
//       </Card>
//       <form className="max-w-md mx-auto">
//         {/* <form action={checkoutAction} className="max-w-md mx-auto"> */}
//         <input type="hidden" name="items" value={JSON.stringify(items)} />
//         <Button variant={"default"} className="w-full my-2">
//           Proceed to Payment
//         </Button>

//         <Button
//           onClick={() => clearCart()}
//           variant={"default"}
//           className="w-full"
//         >
//           Clear Cart
//         </Button>
//       </form>
//       <button onClick={() => pay()}>Pay ₱100</button>
//       <button onClick={() => payWithGCash()}>Pay with GCash ₱299</button>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Image from "next/image";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus } from "lucide-react";

// Stripe client
const stripePromise: Promise<Stripe | null> = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface CartItem {
  id: string;
  name: string;
  price: number; // cents
  image: string;
  quantity: number;
  selected: boolean;
}

export default function CartCheckout() {
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: "1",
      name: "Product One",
      price: 2500,
      image: "/product1.png",
      quantity: 1,
      selected: true,
    },
    {
      id: "2",
      name: "Product Two",
      price: 4000,
      image: "/product2.png",
      quantity: 2,
      selected: false,
    },
  ]);

  const updateQuantity = (id: string, type: "inc" | "dec") => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === "inc"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  const toggleSelect = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const totalQuantity = cart
    .filter((i) => i.selected)
    .reduce((sum, item) => sum + item.quantity, 0);

  const totalAmount = cart
    .filter((i) => i.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const checkout = async () => {
    const stripe = await stripePromise;

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cart.filter((i) => i.selected),
      }),
    });

    const session = await res.json();
    await stripe?.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Shopping Cart</h1>

      {cart.map((item) => (
        <Card key={item.id} className="flex items-center gap-4 p-4">
          <Checkbox
            checked={item.selected}
            onCheckedChange={() => toggleSelect(item.id)}
          />

          <Image
            src={item.image}
            alt={item.name}
            width={80}
            height={80}
            className="rounded-md"
          />

          <CardContent className="flex-1 p-0">
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-muted-foreground">
              ${(item.price / 100).toFixed(2)}
            </p>
          </CardContent>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => updateQuantity(item.id, "dec")}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-6 text-center">{item.quantity}</span>
            <Button
              size="icon"
              variant="outline"
              onClick={() => updateQuantity(item.id, "inc")}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}

      <Card className="p-4">
        <div className="flex justify-between mb-2">
          <span>Total Quantity</span>
          <span>{totalQuantity}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total Amount</span>
          <span>${(totalAmount / 100).toFixed(2)}</span>
        </div>
        <Button
          className="w-full mt-4"
          disabled={totalAmount === 0}
          onClick={checkout}
        >
          Checkout with Stripe
        </Button>
      </Card>
    </div>
  );
}
