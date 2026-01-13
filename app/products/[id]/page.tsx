import ProductDetail from "@/components/product-detail";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const products = [
    {
      id: 1,
      name: "product 1",
      image: "/product_1.png",
      price: 20,
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
    {
      id: 2,
      name: "product 2",
      image: "/product_2.png",
      price: 40,
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
    {
      id: 3,
      name: "product 3",
      image: "/product_3.png",
      price: 60,
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
  ];

  const details = products.filter((p) => p.id === Number(id))[0];

  // if the data came from the API nextjs will pop some error and you need to do the following
  // const plainProduct = JSON.parse(JSON.stringify(products));

  return <ProductDetail product={details} />;
}
