"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
// import Navigation from "swiper/modules/navigation";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "./ui/card";
import Link from "next/link";

interface Props {
  products: {
    name: string;
    image: string;
    price: number;
    description: string;
  }[];
}

export const Carousel = ({ products }: Props) => {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [products.length]);

  const currentProduct = products[current];
  const price = currentProduct.price;
  const image = currentProduct.image;

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop
          spaceBetween={20}
          slidesPerView={1} // ✅ Show 1 slide at a time
        >
          {products.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="rounded-xl shadow-lg overflow-hidden flex flex-col items-center p-4">
                <div className="relative w-full h-64 sm:h-80 mb-4">
                  <Image
                    src={slide.image}
                    alt={slide.name}
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
                <h3 className="flex flex-col items-center text-xl font-bold text-gray-600 mb-2">
                  <span>{slide.name}</span>
                  <span className="text-[16px] text-gray-800/50">
                    {slide.description}
                  </span>
                </h3>
                <Link href="/products">
                  <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
                    Shop Now
                  </Button>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );

  return (
    <Card className="relative overflow-hidden rounded-lg shadow-md border-gray-300">
      {currentProduct.image && (
        <div className="relative h-80 w-full">
          <Image
            alt={currentProduct.name}
            src={image}
            layout="fill"
            objectFit="cover"
            className="transition-opacity duration-500 ease-in-out"
          />
        </div>
      )}
      <CardContent className="absolute inset-0 flex flex-col items-center justify-center">
        <CardTitle className="text-3xl font-bold text-white mb-2">
          {currentProduct.name}
        </CardTitle>
        {price && <p className="text-xl text-white"> {price.toFixed(2)}</p>}
      </CardContent>
    </Card>
  );
};
