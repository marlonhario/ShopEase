// import paymongo from "@/lib/payMongo";
// import { CartItem } from "@/store/cart-store";
// import { NextResponse } from "next/server";

// export const checkoutAction = async (FormData: FormData): Promise<any> => {
//   const itemsJson = FormData.get("items") as string;
//   const items = JSON.parse(itemsJson);
//   console.log({ daw: items });

//   //   const line_items = items.map((item: CartItem) => ({
//   //     price_data: {
//   //       currency: "cad",
//   //       product_data: { name: item.name },
//   //       unit_amount: item.price,
//   //     },
//   //     quantity: item.quantity,
//   //   }));

//   //   const session = await stripe.checkout.sessions.create({
//   //     payment_method_types: ["card"],
//   //     line_items,
//   //     mode: "payment",
//   //     success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
//   //     cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
//   //   });

//   //   redirect(session.url!);

//   const auth = Buffer.from(process.env.PAYMONGO_SECRET_KEY + ":").toString(
//     "base64"
//   );

//   const headers = {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//     Authorization: `Basic ${auth}`,
//   };

//   try {
//     // 1️⃣ Create Payment Intent
//     const intentRes = await fetch(
//       "https://api.paymongo.com/v1/payment_intents",
//       {
//         method: "POST",
//         headers,
//         body: JSON.stringify({
//           data: {
//             attributes: {
//               amount: 10000, // PHP 100.00
//               currency: "PHP",
//               payment_method_allowed: ["gcash"],
//               description: "One-file Next.js PayMongo",
//             },
//           },
//         }),
//       }
//     );

//     const intent = await intentRes.json();

//     // 2️⃣ Create Payment Method (GCash)
//     const methodRes = await fetch(
//       "https://api.paymongo.com/v1/payment_methods",
//       {
//         method: "POST",
//         headers,
//         body: JSON.stringify({
//           data: {
//             attributes: {
//               type: "gcash",
//               billing: {
//                 name: "Juan Dela Cruz",
//                 email: "juan@test.com",
//               },
//             },
//           },
//         }),
//       }
//     );

//     const method = await methodRes.json();

//     // 3️⃣ Attach Method to Intent
//     const attachRes = await fetch(
//       `https://api.paymongo.com/v1/payment_intents/${intent.data.id}/attach`,
//       {
//         method: "POST",
//         headers,
//         body: JSON.stringify({
//           data: {
//             attributes: {
//               payment_method: method.data.id,
//               return_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
//             },
//           },
//         }),
//       }
//     );

//     const attached = await attachRes.json();

//     // 4️⃣ Return redirect URL
//     return NextResponse.json({
//       redirectUrl: attached.data.attributes.next_action.redirect.url,
//     });
//   } catch (err) {
//     return NextResponse.json({ error: err }, { status: 500 });
//   }
// };
