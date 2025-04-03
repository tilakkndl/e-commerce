import React from 'react';
import * as motion from "framer-motion/client";

const FAQPage: React.FC = () => {
    return (
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
                    <h1 className="text-3xl font-bold mb-4">
                        Frequently Asked Questions
                    </h1>
                </motion.div>

                <div className="space-y-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="text-xl font-semibold mb-2">Why is hemp sustainable?</h3>
                        <p className="text-gray-600">
                            Hemp requires minimal water, pesticides, and fertilizers, making it an eco-friendly alternative to other fabrics.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="text-xl font-semibold mb-2">Where are your products made?</h3>
                        <p className="text-gray-600">
                            All our products are carefully crafted in Nepal, ensuring ethical practices and supporting local artisans.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="text-xl font-semibold mb-2">How should I care for my hemp products?</h3>
                        <p className="text-gray-600">
                            To keep your hemp items in the best condition, hand wash with cold water and air dry.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="text-xl font-semibold mb-2">Are the products unisex or designed for specific genders?</h3>
                        <p className="text-gray-600">
                            Most of the products are Unisex whereas some are designed for specific genders which is mentioned in each product page.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default FAQPage; 