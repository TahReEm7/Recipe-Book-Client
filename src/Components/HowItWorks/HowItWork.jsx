import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: 1,
    title: "Sign Up",
    description: "Create your free account to save and share your favorite recipes.",
  },
  {
    number: 2,
    title: "Add a Recipe",
    description: "Fill in your ingredients, steps, and upload a delicious photo.",
  },
  {
    number: 3,
    title: "Browse & Cook",
    description: "Explore thousands of recipes for any taste or occasion.",
  },
  {
    number: 4,
    title: "Save & Share",
    description: "Save your favorites and share your best recipes with others.",
  },
];

const HowItWork = () => {
  return (
    <div>
      <section className="bg-white py-12 px-4 md:px-16">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#d7367c] mb-6">How It Works</h2>
          <p className="text-gray-600 mb-10">
            Just 4 simple steps to start your cooking journey with Recipe Book.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="text-white bg-[#d7367c] rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWork;
