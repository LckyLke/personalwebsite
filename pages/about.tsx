import React from "react";
import NavLink from "../components/NavLink";

const About: React.FC = () => {
  return (
    <div className="max-w-md px-4 pt-8 pb-1 mx-auto bg-white rounded-lg shadow-2xl">
      <h1 className="mb-4 text-2xl font-bold text-gray-900">About</h1>
      <p className="mb-4 leading-relaxed text-gray-700">
        Hi, my name is Luke Friedrichs and I am a 20-year-old computer science
        student at the University of Paderborn in Germany. I am currently in my
        third year of study and am focused on learning as much as I can about
        software development and computer systems.
      </p>
      <p className="mb-4 leading-relaxed text-gray-700">
        In my free time, I enjoy playing video games and building websites. I
        have always been interested in technology and have been programming for
        several years. I am particularly interested in web development and have
        experience building websites and web applications using a variety of
        technologies, including HTML, CSS, JavaScript, and React.
      </p>
      <p className="mb-4 leading-relaxed text-gray-700">
        In addition to my studies, I also work for Westnetz, a utility company
        based in Germany. I have been with the company for over a year and have
        gained valuable experience in customer service and technical support. I
        have worked with a wide range of customers, helping them troubleshoot
        technical issues and providing assistance with various services and
        products.
      </p>
      <p className="leading-relaxed text-gray-700 ">
        I am constantly looking for ways to improve my skills and knowledge, and
        I am always open to new opportunities and challenges. Thank you for
        visiting my website. I hope you find the information here useful and
        interesting.
      </p>
      <NavLink
        href="/"
        label="Back to Home"
        className="block w-full text-center"
      />
    </div>
  );
};

export default About;
