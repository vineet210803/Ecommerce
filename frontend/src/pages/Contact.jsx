import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetter from "../components/NewsLetter";

const Contact = () => {
  return (
    <div className="px-4 sm:px-10 lg:px-20">
      {/* Page Title */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      {/* Content Section */}
      <div className="my-10 flex flex-col md:flex-row gap-16">
        {/* Left Side: Image */}
        <img
          className="w-full md:max-w-[450px] rounded-lg shadow-md"
          src={assets.contact_img}
          alt="Contact Us"
        />

        {/* Right Side: Contact Form */}
        <div className="flex flex-col justify-center gap-6 md:w-2/4">
          <p className="text-lg text-gray-700">
            Have any questions, feedback, or need support? We’d love to hear
            from you. Fill out the form below and our team will get back to you
            shortly.
          </p>

          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            ></textarea>
            <button
              type="submit"
              className="bg-gray-900 text-white py-2 px-6 rounded-md shadow-md hover:bg-gray-800 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      <div className="pt-12">
        <NewsLetter />
      </div>
    </div>
  );
};

export default Contact;
