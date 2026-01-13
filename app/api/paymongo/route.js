import { NextResponse } from "next/server";

const PAYMONGO_URL = "https://api.paymongo.com/v1";

function getAuthHeader() {
  return (
    "Basic " +
    Buffer.from(process.env.PAYMONGO_SECRET_KEY + ":").toString("base64")
  );
}

export async function POST(req) {
  try {
    const { amount } = await req.json();

    /* STEP 1: Create Payment Intent */
    const intentRes = await fetch(`${PAYMONGO_URL}/payment_intents`, {
      method: "POST",
      headers: {
        Authorization: getAuthHeader(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          attributes: {
            amount: amount * 100,
            currency: "PHP",
            payment_method_allowed: ["gcash"],
            capture_type: "automatic",
          },
        },
      }),
    });

    const intent = await intentRes.json();
    if (!intentRes.ok) {
      return NextResponse.json(intent, { status: intentRes.status });
    }

    /* STEP 2: Create Payment Method (GCash) */
    const methodRes = await fetch(`${PAYMONGO_URL}/payment_methods`, {
      method: "POST",
      headers: {
        Authorization: getAuthHeader(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          attributes: {
            type: "gcash",
          },
        },
      }),
    });

    const method = await methodRes.json();
    if (!methodRes.ok) {
      return NextResponse.json(method, { status: methodRes.status });
    }

    /* STEP 3: Attach Method to Intent */
    const attachRes = await fetch(
      `${PAYMONGO_URL}/payment_intents/${intent.data.id}/attach`,
      {
        method: "POST",
        headers: {
          Authorization: getAuthHeader(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            attributes: {
              payment_method: method.data.id,
              return_url: "http://localhost:3000",
            },
          },
        }),
      }
    );

    const attached = await attachRes.json();
    if (!attachRes.ok) {
      return NextResponse.json(attached, { status: attachRes.status });
    }

    return NextResponse.json(attached);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
