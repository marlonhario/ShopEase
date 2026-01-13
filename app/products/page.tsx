import { ProductList } from "@/components/product-list";

export default function ProductPage() {
  // const products = [
  //   {
  //     id: 1,
  //     name: "product 1",
  //     image: "/product_1.png",
  //     price: 20,
  //     size: "",
  //     color: "",
  //     description:
  //       "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  //   },
  //   {
  //     id: 2,
  //     name: "product 2",
  //     image: "/product_2.png",
  //     price: 40,
  //     description:
  //       "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  //   },
  //   {
  //     id: 3,
  //     name: "product 3",
  //     image: "/product_3.png",
  //     price: 60,
  //     description:
  //       "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  //   },
  // ];

  const products = [
    {
      id: 1,
      name: "Melissa Hello Kitty Platform Sneakers - BR39",
      image: "/shoes/shoe14.png",
      price: 20.99,
      size: "EU38",
      color: "Black and White",
      description: "Daily wear, casual outings, fashion-forward looks",
    },
    {
      id: 2,
      name: "Monarcida NEO 3",
      image: "/shoes/shoe15.png",
      price: 40.85,
      size: "EU38",
      color: "Black and White",
      description: "Daily wear, lifestyle, street style",
    },
    {
      id: 3,
      name: "Mizuno Tennis Shoes Break Shot 4 AC",
      image: "/shoes/shoe3.png",
      price: 60.99,
      size: "EU38",
      color: "Black and White",
      description: "Training, matches, and recreational playy",
    },
    {
      id: 4,
      name: "Adidas Originals SL 72 RS",
      image: "/shoes/shoe4.png",
      price: 20.85,
      size: "EU38",
      color: "Black and White",
      description: "Daily wear, lifestyle, street style",
    },
    {
      id: 5,
      name: "Converse Chuck 70 US",
      image: "/shoes/shoe5.png",
      price: 59.99,
      size: "EU38",
      color: "Black and White",
      description: "Daily wear, casual and streetwear looks",
    },
    {
      id: 6,
      name: "Adidas - x Ivy Park Ultraboost",
      image: "/shoes/shoe6.png",
      price: 85.99,
      size: "EU38",
      color: "Black and White",
      description: "Training, casual wear, and street style",
    },
  ];

  return (
    <div>
      <ProductList products={products} />
    </div>
  );
}
