// import Stripe from "stripe";
// import { NextResponse } from "next/server";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2024-06-20",
// });

// export async function POST(req: Request) {
//   const { items } = await req.json();

//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     mode: "payment",
//     line_items: items.map((item: any) => ({
//       price_data: {
//         currency: "usd",
//         product_data: {
//           name: item.name,
//           images: [item.image],
//         },
//         unit_amount: item.price,
//       },
//       quantity: item.quantity,
//     })),
//     success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
//     cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
//   });

//   return NextResponse.json({ id: session.id });
// }
