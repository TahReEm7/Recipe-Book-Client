import { useState } from 'react';
import { Plus, Minus, MinusCircle, PlusCircle } from 'lucide-react';

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
  {
      "question": "What is Recipe Book?",
      "answer": "Recipe Book is a digital platform where users can discover, save, and manage their favorite cooking recipes. It also allows users to share their own recipes with others."
    },
    {
      "question": "How do I add a new recipe in Recipe Book?",
      "answer": "You can add a new recipe by clicking on the 'Add Recipe' button, then filling out the recipe name, ingredients, instructions, and optionally uploading an image."
    },
    {
      "question": "How can I find recipes in Recipe Book?",
      "answer": "Use the search bar or filter by categories like cuisine, cooking time, or dietary preferences to find recipes easily."
    },
    {
      "question": "Can I edit or delete a recipe I created?",
      "answer": "Yes, go to 'My Recipes', select the one you want to edit or delete, and use the options provided."
    },
    {
      "question": "Is there a way to save my favorite recipes?",
      "answer": "Absolutely! Just click the heart icon or 'Save' button on any recipe to add it to your favorites list."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index); 
  };
return (

      <div className="w-11/12 py-16 bg-gradient-to-br from-pink-600 via-pink-500 to-red-400 mx-auto px-4 mt-20 mb-20 rounded-xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Any Questions?</h2>
          <p className="text-gray-800 max-w-2xl mx-auto">
            Find answers to some common questions about our services.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index}>
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-4 bg-white  rounded-lg flex items-center justify-between transition-all duration-300 hover:bg-gray-100 "
              >
                <span className="text-xl font-sm text-gray-500">{faq.question}</span>
                {openIndex === index ? (
                  <MinusCircle className="h-5 w-5 text-red-500 cursor-pointer" />
                ) : (
                  <PlusCircle className="h-5 w-5 text-red-500 cursor-pointer" />
                )}
              </button>
              {openIndex === index && (
                <div className="p-4  text-gray-700 rounded-b-lg">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

  );
};

export default Faq;