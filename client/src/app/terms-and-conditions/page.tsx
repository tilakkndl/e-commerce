import React from 'react';
import * as motion from "framer-motion/client";

const TermsAndConditionsPage: React.FC = () => {
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
                        Terms and Conditions
                    </h1>
                    <p className="text-gray-600">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </motion.div>

                <div className="space-y-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="text-xl font-semibold mb-4">1. Introduction</h3>
                        <p className="text-gray-600 mb-4">
                            Welcome to Mr. Nephemp. These Terms and Conditions govern your use of our website and the purchase of our products. By accessing or using our website, you agree to be bound by these Terms and Conditions.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="text-xl font-semibold mb-4">2. Products and Orders</h3>
                        <p className="text-gray-600 mb-4">
                            All products are subject to availability. We reserve the right to limit the quantity of items purchased and to discontinue any products at any time. We may refuse or cancel any order for any reason, including but not limited to product availability, errors in product or pricing information, or problems identified by our fraud detection systems.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="text-xl font-semibold mb-4">3. Pricing and Payment</h3>
                        <p className="text-gray-600 mb-4">
                            All prices are in Canadian Dollars (CAD) and are subject to change without notice. We accept various forms of payment as indicated on our website. You agree to provide current, complete, and accurate purchase and account information for all purchases made on our website.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="text-xl font-semibold mb-4">4. Shipping and Returns</h3>
                        <p className="text-gray-600 mb-4">
                            Shipping times may vary depending on your location. We are not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customer. Please refer to our Returns Policy for detailed information about returns and refunds.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="text-xl font-semibold mb-4">5. Intellectual Property</h3>
                        <p className="text-gray-600 mb-4">
                            All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Mr. Nephemp and is protected by Canadian and international copyright laws.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="text-xl font-semibold mb-4">6. Privacy</h3>
                        <p className="text-gray-600 mb-4">
                            Your use of our website is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices regarding your personal information.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="text-xl font-semibold mb-4">7. Limitation of Liability</h3>
                        <p className="text-gray-600 mb-4">
                            Mr. Nephemp shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the website or products.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="text-xl font-semibold mb-4">8. Changes to Terms</h3>
                        <p className="text-gray-600 mb-4">
                            We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website following the posting of changes constitutes your acceptance of such changes.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="text-xl font-semibold mb-4">9. Contact Information</h3>
                        <p className="text-gray-600 mb-4">
                            If you have any questions about these Terms and Conditions, please contact us at:
                            <br />
                            Email: info@mr.nephemp.com
                            <br />
                            Phone: (123) 456-7890
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default TermsAndConditionsPage; 