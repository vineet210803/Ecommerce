import React from "react";
import Trending from "../components/swiper";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetter from "../components/NewsLetter";

const About = () => {
  return (
    <div>
      {/* Title */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      {/* Content Section */}
      <div className="my-10 flex flex-col md:flex-row gap-16 justify-center">
        {/* Image */}
        <img
          className="w-full md:max-w-[450px] rounded-lg shadow-md"
          src={assets.about_img}
          alt="About Us"
        />

        {/* Text */}
        <div className="flex flex-col justify-center gap-6 md:w-2/4">
          <p>
            Forever was born out of a passion for innovation and a desire to
            revolutionize the fashion industry. We blend creativity with quality
            to bring you timeless pieces.
          </p>
          <p>
            Since our inception, we've worked tirelessly to curate a diverse
            selection of products that inspire confidence and style in our
            customers.
          </p>
          <b className="text-gray-800 text-lg">Our Mission</b>
          <p>
            To empower individuals through fashion, offering clothing that not
            only looks good but feels good, while staying committed to
            sustainability and innovation.
          </p>
        </div>
      </div>

      <div>
        {/* Title */}
        <div className="text-xl py-4 text-center">
          <Title text1={"WHY"} text2={"CHOOSE US"} />
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row text-sm mb-20 gap-6">
          {/* Quality Assurance */}
          <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 rounded-lg shadow-sm">
            <b>Quality Assurance:</b>
            <p>
              We meticulously select and vet each product to ensure it meets our
              stringent quality standards.
            </p>
          </div>

          {/* Convenience */}
          <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 rounded-lg shadow-sm">
            <b>Convenience:</b>
            <p>
              With our user-friendly interface and hassle-free ordering process,
              shopping has never been easier.
            </p>
          </div>

          {/* Support */}
          <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 rounded-lg shadow-sm">
            <b>Support:</b>
            <p>
              Our dedicated customer service team is always ready to help you
              before, during, and after your purchase.
            </p>
          </div>
        </div>
      </div>
      <NewsLetter/>
    </div>
  );
};

export default About;
