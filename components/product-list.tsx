"use client";

import { ProductCard } from "./product-card";
import { useState } from "react";
import Stripe from "stripe";

interface Products {
  products: Stripe.Product[];
}

export const ProductList = ({ products }: Products) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredProduct = products.filter((product) => {
    const term = searchTerm.toLowerCase();
    const nameMatch = product.name.toLowerCase().includes(term);
    const descriptionMatch = product.description
      ? product.description.toLowerCase().includes(term)
      : false;

    return nameMatch || descriptionMatch;
  });

  return (
    <div>
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search prducts..."
          className="w-full max-w-md rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mx-auto">
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 gap-18 ">
          {filteredProduct.map((product) => {
            return (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
