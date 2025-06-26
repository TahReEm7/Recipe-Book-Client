import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-pink-600 via-pink-500 to-red-400 text-white pt-10 pb-6 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-white-700 pb-8">
        {/* Brand */}
        <div>
           <a className="">
          <span className="text-3xl font-bold text-[#35091c]">🍳Recipe</span>
          <span className="text-3xl font-bold text-shadow-blue-200">Book</span>
        </a>
          <p className="text-sm text-white-400 mt-5">
          Discover, Create, and Share Delicious Recipes from Around the World 


          </p>
        </div>

        {/* Navigation */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-black">Quick Links</h2>
          <ul className="space-y-2 text-white-400">
            <li><a href="/" className="hover:text-gray-800">Home</a></li>
            <li><a href="/dashboard" className="hover:text-gray-800">Dashboard</a></li>
             <li><a href="/support" className="hover:text-gray-800">Support</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-black">Contact Us</h2>
          <p className="text-white-400 text-sm">Email: tahreemhossain0@gmail.com</p>
          <p className="text-white-400 text-sm">Phone: 01319550316</p>
          <p className="text-white-400 text-sm">Location: Dhaka, Bangladesh</p>
        </div>

        {/* Social Media */}
       <div>
          <h2 className="text-xl font-semibold mb-4 text-black">Follow Me</h2>
          <div className="flex space-x-4">
            <a
              href="https://github.com/TahReEm7"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white-700 p-2 rounded-full hover:bg-white-600 transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/tahreem-hossain"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-800 p-2 rounded-full hover:bg-blue-900 transition"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="mailto:tahreemhossain0@gmail.com"
              className="bg-red-600 p-2 rounded-full hover:bg-red-700 transition"
            >
              <FaInstagram className="transform rotate-45" />
            </a>
          </div>
        </div>
      </div>


      <p className="text-center text-white-500 text-sm mt-6">
        &copy; {new Date().getFullYear()} Tahreem Hossain. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
