"use client";

import React from "react";
import * as motion from "framer-motion/client";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Define the props type (none in this case, as it's a standalone component)
interface AboutProps {}

const About: React.FC<AboutProps> = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 bg-gray-50">
      {/* Title with Animation */}
      <motion.h2
        initial={{ y: "100px", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={cn([
          integralCF.className,
          "text-[32px] md:text-5xl text-gray-900 font-bold mb-8 md:mb-14 text-center",
        ])}
      >
        About Mr. Nephemp
      </motion.h2>

      {/* Main Content with Animation */}
      <motion.div
        initial={{ y: "100px", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="space-y-12"
      >
        {/* Introduction */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              At Mr. Nephemp, we believe that true fashion goes beyond
              style—it’s about making a difference. Step into a world where
              style meets sustainability with Mr. Nephemp. Unlike ordinary
              clothing, our hemp products are designed to elevate your wardrobe
              while healing the planet. Ethically handcrafted in Nepal, every
              piece blends traditional artistry with modern design, offering
              durability, breathability, and unmatched comfort for every season.
            </p>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              With hemp’s eco-friendly nature—requiring less water, no synthetic
              pesticides, and leaving no harmful traces behind—you’re not just
              wearing a product, you’re making a statement. Proudly made in
              Nepal, our products blend durability, comfort, and ethical
              responsibility, ensuring you wear your values with pride.
            </p>
          </div>
          <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
            <Image
              src="/images/hemp.jpg" // Replace with actual image path
              alt="Nepal Craftsmanship"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Name Meaning */}
        <div className="bg-white p-6 md:p-10 rounded-lg shadow-md">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
            Our Name, Mr. Nephemp
          </h3>
          <ul className="text-gray-600 space-y-2 list-disc list-inside">
            <li>
              <strong>Nep</strong> stands for Nepal, a land rich in culture,
              history, and home to some of the finest hemp on Earth.
            </li>
            <li>
              <strong>Hemp</strong> represents the miracle fabric—strong,
              sustainable, and good for the planet—harvested from the majestic
              Himalayas.
            </li>
          </ul>
          <p className="text-gray-600 mt-4">
            Together, they symbolize a vision of eco-friendly fashion steeped in
            tradition, innovation, and care for the Earth. At Mr. Nephemp, every
            product is a celebration of heritage, sustainability, and the
            promise of a greener future.
          </p>
        </div>

        {/* Who is Mr. Nephemp? */}
        <div className="text-center space-y-4">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Who is Mr. Nephemp?
          </h3>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Embrace sustainability, and you’re Mr. Nephemp. When you wear our
            products, you’re not just enhancing your wardrobe—you’re leading the
            way for the future of fashion, where quality meets conscious living.
          </p>
        </div>

        {/* Our Vision */}
        <div className="bg-gray-100 p-6 md:p-10 rounded-lg">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
            Our Vision
          </h3>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            At Mr. Nephemp, we envision a world where sustainable fashion
            doesn’t just exist—it thrives in style. Our goal is to transform the
            way the world perceives eco-friendly clothing by blending
            sustainability with chic, modern designs. We believe that
            eco-conscious choices shouldn’t come at the cost of style or
            affordability.
          </p>
          <p className="text-gray-600 mt-4 text-base md:text-lg leading-relaxed">
            Our dream is to build a global hemp culture, where choosing
            sustainable fashion is the preferred choice. We’re committed to
            making sustainability effortlessly stylish, paving the way for a
            greener, more fashionable future.
          </p>
        </div>

        {/* Why Hemp? */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-800">
              Why Hemp?
            </h3>
            <p className="text-gray-600 text-base md:text-lg">
              Hemp is more than a fabric—it’s a solution. From enriching the
              soil it grows in to reducing carbon emissions, hemp has the power
              to heal the planet.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl md:text-2xl font-semibold text-gray-700">
              Sustainability at Its Core
            </h4>
            <ul className="text-gray-600 list-disc list-inside space-y-2">
              <li>Grows with minimal water and no harmful pesticides.</li>
              <li>Absorbs more carbon dioxide than most plants.</li>
              <li>Improves soil health for future crops.</li>
            </ul>
            <h4 className="text-xl md:text-2xl font-semibold text-gray-700 mt-4">
              Durability & Strength
            </h4>
            <p className="text-gray-600">
              Hemp fibers are strong, resilient, and long-lasting. Our products
              are made to endure, reducing the need for replacements and waste.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl md:text-2xl font-semibold text-gray-700">
              Biodegradable & Planet-Friendly
            </h4>
            <p className="text-gray-600">
              Hemp naturally decomposes, leaving no harmful traces behind. It’s
              the perfect alternative to synthetic materials.
            </p>
            <h4 className="text-xl md:text-2xl font-semibold text-gray-700 mt-4">
              Eco-Chic
            </h4>
            <p className="text-gray-600">
              Hemp isn’t just sustainable—it’s stylish. Our designs combine
              timeless aesthetics with functionality.
            </p>
          </div>
        </div>

        {/* Why Choose Mr. Nephemp? */}
        <div className="bg-white p-6 md:p-10 rounded-lg shadow-md">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
            Why Choose Mr. Nephemp?
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
            <li>
              <strong>1. A Rich Legacy</strong> - We bring you the finest hemp
              from Nepal, a country with centuries-old traditions.
            </li>
            <li>
              <strong>2. Sustainability Meets Style</strong> - Each piece is
              thoughtfully designed to be trendy and versatile.
            </li>
            <li>
              <strong>3. Affordable Sustainability</strong> - Prices are kind to
              your wallet and the planet.
            </li>
            <li>
              <strong>4. Community & Culture</strong> - Join a movement of
              sustainability and creativity.
            </li>
            <li>
              <strong>5. Quality You Can Trust</strong> - Craftsmanship and
              premium materials define our products.
            </li>
          </ul>
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-6 mt-12">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Switch to Hemp - Switch to Mr. Nephemp
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            With Mr. Nephemp, you’re not just making a fashion statement—you’re
            making a difference. Together, let’s transform the fashion industry
            into a sustainable, responsible, and stylish space.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
