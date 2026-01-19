import ProductDetail from "@/components/product-detail";
import { stripe } from "@/lib/stripe";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await stripe.products.retrieve(id, {
    expand: ["default_price"],
  });

  // if the data came from the API nextjs will pop some error and you need to do the following
  const plainProduct = JSON.parse(JSON.stringify(product));

  return <ProductDetail product={plainProduct} />;
}
