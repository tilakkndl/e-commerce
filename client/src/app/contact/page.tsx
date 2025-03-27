import React from 'react';
import Image from 'next/image';

const ContactPage: React.FC = () => {
    return (
        <div className="p-6 max-w-6xl mx-auto flex flex-col md:flex-row">
            <div className="md:w-1/2">
                <h1 className="text-3xl font-bold mb-4">Contact Us</h1>                
                <p className="mb-4">Email: contact@mrnephemp.com</p>
                <p className="mb-4">Phone: (123) 456-7890</p>
                <p className="mb-4">Address: 123 Fashion St, Vancouver, BC, Canada</p>
                
                <h2 className="text-2xl font-semibold mt-6">Get in Touch</h2>
                <form className="mt-4 bg-gray-200 shadow-md rounded-lg p-6">
                    <label className="block mb-4">
                        <span className="text-gray-700">Name:</span>
                        <input type="text" name="name" className="border rounded p-1 w-full mt-1 focus:outline-none focus:ring focus:ring-blue-300" />
                    </label>
                    <label className="block mb-4">
                        <span className="text-gray-700">Email:</span>
                        <input type="email" name="email" className="border rounded p-1 w-full mt-1 focus:outline-none focus:ring focus:ring-blue-300" />
                    </label>
                    <label className="block mb-4">
                        <span className="text-gray-700">Message:</span>
                        <textarea name="message" className="border rounded p-2 w-full mt-1 focus:outline-none focus:ring focus:ring-blue-300" rows={2} />
                    </label>
                    <button type="submit" className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition duration-200">Submit</button>
                </form>
            </div>
            <div className="pl-5 md:w-1/2 mt-4 md:mt-0">
                <h2 className="text-2xl font-semibold mt-6 mb-3">Our Location</h2>
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d166655.41811004592!2d-123.28871046916251!3d49.25761824332818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548673f143a94fb3%3A0xbb9196ea9b81f38b!2sVancouver%2C%20BC%2C%20Canada!5e0!3m2!1sen!2snp!4v1743067268591!5m2!1sen!2snp" 
                    width="100%" 
                    height="450" 
                    style={{ border: 0 }}
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    );
};

export default ContactPage;
