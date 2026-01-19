import { Carousel } from "@/components/carousel";
import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {

  const stripeProducts = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  });

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
        <Carousel products={stripeProducts.data} />
      </section>
    </>
  );
}
