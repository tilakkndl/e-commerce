import React from 'react';

const DeliveryPaymentPage: React.FC = () => {
    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Delivery &amp; Payment</h1>
            <p className="mb-4">We aim to provide seamless and cost-effective delivery options for all our customers.</p>
            
            <h2 className="text-2xl font-semibold mt-6">Greater Vancouver Area</h2>
            <ul className="list-disc list-inside mb-4">
                <li>Free Standard Delivery: Orders over $55 qualify for free delivery within the Greater Vancouver area (delivered within 5 business days).</li>
                <li>Standard Delivery Fee: Orders below $55 are subject to a $5 delivery fee within the Greater Vancouver area (delivered within 5 business days).</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6">Other Cities in Canada</h2>
            <ul className="list-disc list-inside mb-4">
                <li>Courier Delivery: Shipping rates vary based on location and will be calculated at checkout.</li>
                <li>Free Shipping: Enjoy free shipping for orders over $250 anywhere in Canada.</li>
            </ul>

            <p className="mb-4">If you have any questions or special delivery instructions, feel free to contact us at <a href="mailto:sangampoudelb@gmail.com" className="text-blue-600">sangampoudelb@gmail.com</a> or <span className="text-blue-600">672-866-1378</span>.</p>

            <h2 className="text-2xl font-semibold mt-6">Available for Wholesale Pre-orders</h2>
            <p className="mb-4">Contact <a href="mailto:sangampoudelb@gmail.com" className="text-blue-600">sangampoudelb@gmail.com</a>.</p>

            <h2 className="text-2xl font-semibold mt-6">Payment Options</h2>
            <ul className="list-disc list-inside mb-4">
                <li>Accepts  e-Transfers.</li>
            </ul>
        </div>
    );
};

export default DeliveryPaymentPage;