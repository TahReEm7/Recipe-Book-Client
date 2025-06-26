import React from "react";
import { motion } from "framer-motion";

const Newsletter = () => {
  return (
    <section className="w-11/12 mx-auto rounded-lg bg-gradient-to-br from-pink-600 via-pink-500 to-red-400 text-white my-10 py-16 px-6">
      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Stay Updated with Our Events
        </h2>
        <p className="text-gray-200 mb-8">
          Subscribe to our newsletter and never miss out on the latest events, updates, and opportunities to connect with the community.
        </p>

        <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full sm:w-[300px] bg-base-100 text-gray-500"
          />
          <button
            type="button"
            className="px-6 py-2 bg-red-400 text-white rounded hover:bg-red-600 transition"
          >
            Subscribe
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default Newsletter;
