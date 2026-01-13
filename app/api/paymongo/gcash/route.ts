import axios from "axios";

export async function POST() {
  const response = await axios.post(
    "https://api.paymongo.com/v1/checkout_sessions",
    {
      data: {
        attributes: {
          description: "GCash Payment Example",
          send_email_receipt: false,

          line_items: [
            {
              name: "Mobile Load",
              quantity: 1,
              amount: 29900, // ₱299.00
              currency: "PHP",
            },
          ],

          payment_method_types: ["gcash"],

          success_url: `${process.env.NEXT_LOCAL}/success`,
          cancel_url: `${process.env.NEXT_LOCAL}/cancel`,
        },
      },
    },
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(process.env.PAYMONGO_SECRET_KEY + ":").toString("base64"),
        "Content-Type": "application/json",
      },
    }
  );

  return Response.json(response.data);
}
