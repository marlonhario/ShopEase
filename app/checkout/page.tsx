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
const people = [
  {
    username: "shadcn",
    avatar: "https://github.com/shadcn.png",
    email: "shadcn@vercel.com",
  },
  {
    username: "maxleiter",
    avatar: "https://github.com/maxleiter.png",
    email: "maxleiter@vercel.com",
  },
  {
    username: "evilrabbit",
    avatar: "https://github.com/evilrabbit.png",
    email: "evilrabbit@vercel.com",
  },
];

export default function CartCheckout() {
  return (
    <div className="flex w-full justify-center items-center  flex-col gap-6 m-auto">
      <ItemGroup className="min-w-sx  md:min-w-2xl">
        {people.map((person, index) => (
          <React.Fragment key={person.username}>
            <Item>
              <ItemMedia
                variant={"image"}
                className="h-14 w-14 flex items-center justify-center"
              >
                <Avatar className="h-14 w-14 rounded-lg">
                  <AvatarImage src={person.avatar} className="grayscale" />
                  <AvatarFallback>{person.username.charAt(0)}</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent className="gap-1">
                <ItemTitle>{person.username}</ItemTitle>
                <ItemDescription>{person.email}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MinusIcon />
                </Button>
                <Badge variant="secondary">20</Badge>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <PlusIcon />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Trash2Icon />
                </Button>
              </ItemActions>
            </Item>
            {index !== people.length - 1 && <ItemSeparator />}
          </React.Fragment>
        ))}
      </ItemGroup>
      <div className="flex items-center justify-end min-w-sx  md:min-w-2xl">
        <Badge className="rounded-sm border-transparent bg-gradient-to-r from-indigo-500 to-pink-500 [background-size:105%] bg-center text-white">
          26 item/s
        </Badge>
        <Badge className="mx-2 rounded-sm border-transparent bg-gradient-to-r from-indigo-500 to-pink-500 [background-size:105%] bg-center text-white">
          TOTAL: $59.67
        </Badge>
        <Button
          variant="destructive"
          className="h-7 px-2 py-1 text-xs ring-offset-background hover:ring-red-600/90 transition-all duration-300 hover:ring-2 hover:ring-offset-2"
        >
          Place Order
        </Button>
      </div>
    </div>
  );
}
