"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { checkoutAction } from "./checkout.action";

export default function CheckoutPage() {
  const { items, removeItem, addItem, clearCart } = useCartStore();
  const router = useRouter();
  const [url, setUrl] = useState(null);

  // useEffect(() => {
  //   if (url) {
  //     window.location.href = url;
  //   }
  // }, [url]);

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (total === 0 || items.length === 0) {
    return (
      <div>
        <h1>Your Cart is Empty.</h1>
      </div>
    );
  }

  async function pay() {
    const res = await fetch("/api/paymongo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 100 }),
    });

    const data = await res.json();

    const redirectUrl = data?.data?.attributes?.next_action?.redirect?.url;
    // if (data || redirectUrl) console.log({ daww: data, redirectUrl });

    if (redirectUrl) {
      window.location.href = redirectUrl;
      // router.push(redirectUrl);
      // setUrl(redirectUrl);
    } else {
      console.error("No redirect URL", data);
    }
  }

  const payWithGCash = async () => {
    const res = await fetch("/api/paymongo/gcash", {
      method: "POST",
    });

    const data = await res.json();
    window.location.href = data.data.attributes.checkout_url;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <Card className="max-w-md mx-auto mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {items.map((item, key) => (
              <li key={key} className="flex flex-col gap-2 border-b pb-2">
                <div className="flex justify-between">
                  <span className="font-medium">{item.name} </span>
                  <span className="font-semibold">
                    ${((item.price * item.quantity) / 100).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => removeItem(item.id)}
                    variant={"outline"}
                  >
                    -
                  </Button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <Button onClick={() => addItem({ ...item, quantity: 1 })}>
                    +
                  </Button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 border-t pt-2 text-lg font-semibold">
            Total: ${(total / 100).toFixed(2)}
          </div>
        </CardContent>
      </Card>
      <form className="max-w-md mx-auto">
        {/* <form action={checkoutAction} className="max-w-md mx-auto"> */}
        <input type="hidden" name="items" value={JSON.stringify(items)} />
        <Button variant={"default"} className="w-full my-2">
          Proceed to Payment
        </Button>

        <Button
          onClick={() => clearCart()}
          variant={"default"}
          className="w-full"
        >
          Clear Cart
        </Button>
      </form>
      <button onClick={() => pay()}>Pay ₱100</button>
      <button onClick={() => payWithGCash()}>Pay with GCash ₱299</button>
    </div>
  );
}
