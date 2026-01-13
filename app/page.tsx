import { Carousel } from "@/components/carousel";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const products = [
    {
      name: "Melissa Hello Kitty Platform Sneakers - BR39",
      image: "/shoes/shoe14.png",
      price: 20,
      description: "Daily wear, casual outings, fashion-forward looks",
    },
    {
      name: "Monarcida NEO 3",
      image: "/shoes/shoe15.png",
      price: 40,
      description: "Daily wear, lifestyle, street style",
    },
    {
      name: "Mizuno Tennis Shoes Break Shot 4 AC",
      image: "/shoes/shoe3.png",
      price: 60,
      description: "Training, matches, and recreational playy",
    },
    {
      name: "Adidas Originals SL 72 RS",
      image: "/shoes/shoe4.png",
      price: 20,
      description: "Daily wear, lifestyle, street style",
    },
    {
      name: "Converse Chuck 70 US",
      image: "/shoes/shoe5.png",
      price: 40,
      description: "Daily wear, casual and streetwear looks",
    },
    {
      name: "Adidas - x Ivy Park Ultraboost",
      image: "/shoes/shoe6.png",
      price: 60,
      description: "Training, casual wear, and street style",
    },
  ];

  return (
    <>
      <section className="mt-2 relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white h-screen">
        <div className="container px-15 mx-auto  h-full flex flex-col-reverse md:flex-row items-center md:justify-between">
          {/* Text Content */}
          <div className="w-full md:w-1/2 text-center md:text-left flex flex-col justify-center h-full">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Everything You Need, Just a Click Away
            </h1>
            <p className="text-lg sm:text-xl mb-8 text-white/90">
              Browse, shop, and enjoy your favorite products without the hassle.
              Shopping made simple and fun for everyone!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/products">
                <Button
                  variant="default"
                  className="bg-white text-indigo-600 hover:bg-gray-100"
                >
                  Explore Collections
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full md:w-1/2 h-96 sm:mb-0 sm:h-[500px] md:h-full relative mb-10 md:mb-0 flex justify-center">
            <Image
              src="/tennis-shoes.png" // Replace with your image
              alt="Shopping Hero"
              fill
              priority
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
        <Carousel products={products} />
      </section>
    </>
  );

  return (
    <div>
      <section className="rounded bg-neutral-100 py-8 sm:py-12">
        <div className="mx-auto flex items-center justify-items-center gap-8 px-8 sm:px-16">
          <div className="max-w-md space-x-4">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Everything You Need, Just a Click Away
            </h2>
            <p className="text-neutral-600">
              Browse, shop, and enjoy your favorite products without the hassle.
              Shopping made simple and fun for everyone!
            </p>
            <Button
              asChild
              variant="default"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-black text-white"
            >
              <Link
                href="/products"
                className="inline-flex justify-center items-center rounded-full px-6 py-3"
              >
                Shop Now
              </Link>
            </Button>
          </div>
          <Image
            alt="Banner Image"
            width={450}
            height={450}
            src="/product_1.png"
            className="rounded"
          />
        </div>
      </section>
      <section className="py-8">
        <Carousel products={products} />
      </section>
    </div>
  );
}
