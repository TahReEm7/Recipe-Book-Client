import React from "react";

const offers = [
  {
    title: "🌟 20% Off Premium Membership",
    description: "Unlock advanced features, exclusive recipes, and more!",
    bg: "bg-yellow-100",
  },
  {
    title: "🎉 Add 5 Recipes, Get 1 Featured",
    description: "Share your creations and get recognized on the homepage.",
    bg: "bg-blue-100",
  },
  {
    title: "🍳 Chef of the Month Contest",
    description: "Win prizes by submitting your best recipe!",
    bg: "bg-green-100",
  },
];

const OfferSection = () => {
  return (
    <div className="my-10 w-11/12 mx-auto">
      <h2 className="text-4xl font-bold text-[#d7367c] mb-6 text-center">🎁 Current Offers</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer, index) => (
          <div
            key={index}
            className={`p-5 rounded-xl shadow-md ${offer.bg} hover:shadow-lg transition`}
          >
            <h3 className="text-lg font-bold mb-2">{offer.title}</h3>
            <p className="text-gray-700">{offer.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferSection;
