"use client";

import React from "react";
import * as motion from "framer-motion/client";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Image from "next/image";
import { ArrowRight, Leaf, Recycle, Heart, Shield, CheckCircle } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <Leaf className="w-6 h-6" />,
    title: "Sustainable Materials",
    description:
      "Premium hemp sourced from the Himalayas, grown without harmful pesticides",
  },
  {
    icon: <Recycle className="w-6 h-6" />,
    title: "Eco-Friendly Process",
    description: "Minimal water usage and natural processing methods",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Handcrafted Care",
    description: "Ethically made by skilled artisans in Nepal",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Quality Assured",
    description: "Durable, comfortable, and built to last",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const About: React.FC = () => {
  return (
    <section className="py-20 md:py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-20"
        >
          <motion.h2
            variants={itemVariants}
            className={cn([
              integralCF.className,
              "text-4xl md:text-6xl lg:text-7xl mb-6 text-blue-600",
            ])}
          >
            About Mr. Nephemp
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto"
          >
            Where Himalayan heritage meets modern sustainability
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/3] rounded-3xl overflow-hidden"
          >
            <Image
              src="/images/hemp.jpg"
              alt="Nepal Craftsmanship"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3
              className={cn([
                integralCF.className,
                "text-3xl md:text-4xl mb-6 text-red-600",
              ])}
            >
              Our Vision
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              At Mr. Nephemp, we envision a world where sustainable fashion doesn't just exist—it
              thrives in style. Our goal is to transform the way the world perceives eco-friendly
              clothing by blending sustainability with chic, modern designs. We believe that eco-
              conscious choices shouldn't come at the cost of style or affordability. By offering high-
              quality hemp products that are both affordable and fashionable, we're creating a new
              wave in the fashion industry—one that prioritizes the planet without sacrificing personal
              expression.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              At Mr. Nephemp, we're not just making clothes; we're making a
              statement that fashion can be kind to both the earth and the people who wear it. We're
              committed to making sustainability not only necessary but also effortlessly stylish,
              paving the way for a greener, more fashionable future.
            </p>
            <div className="pt-4">
              <Link
                href="/shop?status=active"
                className="inline-flex items-center gap-2 text-[#ad0502] font-medium hover:gap-4 transition-all duration-300"
              >
                Explore Our Collection <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-[#023893] mb-4">
                {feature.icon}
              </div>
              <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Why Choose Mr. Nephemp Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="bg-emerald-50 rounded-3xl p-8 md:p-12 lg:p-16 mb-32"
        >
          <motion.div
            variants={itemVariants}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h3
              className={cn([
                integralCF.className,
                "text-3xl md:text-4xl mb-4 text-red-600",
              ])}
            >
              Why Choose Mr. Nephemp?
            </h3>
            <p className="text-gray-600 text-lg">
              Discover the reasons behind our commitment to quality and sustainability.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={itemVariants} className="space-y-6">
              <h4 className="text-xl font-semibold">1. A Rich Legacy</h4>
              <p className="text-gray-600">
                We bring you the finest hemp from Nepal, a country with centuries-old traditions of hemp cultivation. Every product carries a piece of Nepalese history and culture.
              </p>
              <h4 className="text-xl font-semibold">2. Sustainability Meets Style</h4>
              <p className="text-gray-600">
                Our mission is to make hemp fashionable and accessible. Each piece is thoughtfully designed to ensure it's not just eco-friendly but also trendy and versatile.
              </p>
              <h4 className="text-xl font-semibold">3. Affordable Sustainability</h4>
              <p className="text-gray-600">
                We believe sustainable fashion should be for everyone. That's why we make sure our prices are as kind to your wallet as our products are to the planet.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <h4 className="text-xl font-semibold">4. Community & Culture</h4>
              <p className="text-gray-600">
                By choosing Mr. Nephemp, you're joining a movement. Together, we're building a culture of sustainability, creativity, and responsibility.
              </p>
              <h4 className="text-xl font-semibold">5. Quality You Can Trust</h4>
              <p className="text-gray-600">
                Our slogan says it all: "For Those Who Admire Quality." Every product we create is a testament to craftsmanship, attention to detail, and premium materials.
              </p>
            </motion.div>
          </div>
        </motion.div>

       
      </div>
    </section>
  );
};

export default About;
