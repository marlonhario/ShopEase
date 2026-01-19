import { ProductList } from "@/components/product-list";
import { stripe } from "@/lib/stripe";

export default async function ProductPage() {
  const stripeProducts = await stripe.products.list({
    expand: ["data.default_price"],
  });

  return (
    <div>
      <ProductList products={stripeProducts.data} />
    </div>
  );
}
