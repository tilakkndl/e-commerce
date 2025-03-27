import React from 'react';
import about from '../../../public/images/about.jpg';
import Image from 'next/image';
import * as motion from "framer-motion/client";

const AboutPage: React.FC = () => {
    return (
        <>
            <div className="p-6 max-w-6xl mx-auto flex flex-col md:flex-row">
                <div className="md:w-1/2">
                    <h1 className="text-3xl font-bold mb-4">About Us</h1>
                    <h2 className="text-2xl font-semibold mt-6">Who We Are</h2>
                    <p className="mb-4">
                        Mr. Nephemp was founded with a simple mission: to create fashion that heals the planet.
                        Each of our products is made with love and care in Nepal, ensuring traditional craftsmanship
                        meets modern design. From our humble beginnings to becoming a part of Vancouver's fashion
                        landscape, we're committed to supporting artisans and sustainable practices.
                    </p>
                    <h2 className="text-2xl font-semibold mt-6">Our Philosophy</h2>
                    <p className="mb-4">
                        We're not just about fashion; we're about a movement. We believe in the power of conscious
                        choices and want to inspire you to make better decisions for yourself and the planet.
                        Every purchase supports sustainable agriculture, ethical production, and a better future.
                    </p>
                </div>
                <div className="md:w-1/2 mt-4 md:mt-0">
                    <Image src={about} alt="Fashion Image" className="max-w-full h-auto rounded-lg ml-5" />
                </div>
            </div>
            <div className="p-6 max-w-6xl mx-auto">
                <h2 className="text-2xl font-semibold mb-4">Our Name</h2>
                <p className="mb-4">
                    Our name, <span className="font-bold text-blue-600">Mr. Nephemp</span>, reflects our deep roots and purpose:
                </p>
                <ul className="list-disc list-inside mb-4">
                    <li><span className="font-bold text-blue-600">Nep</span> stands for <span className="font-bold text-blue-600">Nepal</span>, a land rich in culture, history, and home to some of the finest <span className="font-bold text-blue-600">hemp</span> on Earth.</li>
                    <li><span className="font-bold text-blue-600">Hemp</span> represents the miracle fabric—strong, sustainable, and good for the planet—harvested from the majestic <span className="font-bold text-blue-600">Himalayas</span>.</li>
                </ul>
                <p className="mb-4">
                    Together, they symbolize a vision of eco-friendly fashion steeped in <span className="font-bold text-blue-600">tradition</span>, <span className="font-bold text-blue-600">innovation</span>, and care for the Earth.
                </p>
            </div>
            <div className="p-6 max-w-6xl mx-auto">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="bg-gray-100 rounded-3xl p-8 md:p-12 lg:p-16 mb-32"
                >
                    <motion.div
                        className="text-center max-w-3xl mx-auto mb-12"
                    >
                        <h1 className="text-3xl">
                            Why Hemp?
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Hemp is more than a fabric—it's a solution for a sustainable future.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div className="space-y-6">
                            <h4 className="text-xl font-semibold">Hemp Heals</h4>
                            <p className="text-gray-600">
                                Hemp, a non-psychoactive member of the Cannabis sativa family, contains less than 0.3% THC, making it safe and sustainable. It's the heart of our eco-friendly mission and a natural choice for a better future. Hemp is more than a fabric—it's a solution. From enriching the soil it grows in to reducing carbon emissions, hemp has the power to heal the planet.
                            </p>
                            <h4 className="text-xl font-semibold">Sustainability at Its Core</h4>
                            <ul className="space-y-3 text-gray-600">
                                <li>Grows with minimal water and no harmful pesticides.</li>
                                <li>Absorbs more carbon dioxide than most plants, combating climate change.</li>
                                <li>Improves soil health for future crops.</li>
                            </ul>
                        </motion.div>

                        <motion.div className="space-y-6">
                            <h4 className="text-xl font-semibold">Durability & Strength</h4>
                            <p className="text-gray-600">
                                Hemp fibers are strong, resilient, and long-lasting. Our products are made to endure, reducing the need for replacements and waste.
                            </p>
                            <h4 className="text-xl font-semibold">Biodegradable & Planet-Friendly</h4>
                            <p className="text-gray-600">
                                Hemp naturally decomposes, leaving no harmful traces behind. It's the perfect alternative to synthetic materials.
                            </p>
                            <h4 className="text-xl font-semibold">Eco-Chic</h4>
                            <p className="text-gray-600">
                                Hemp isn't just sustainable—it's stylish. Our designs combine timeless aesthetics with functionality, making hemp fashionable for all occasions.
                            </p>
                        </motion.div>
                    </div>
                    <p className="text-gray-600 text-lg text-center mt-6">
                        Hemp is hope. Hemp is the future.
                    </p>
                </motion.div>
            </div>
        </>
    );
};

export default AboutPage;
