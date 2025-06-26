import { useState } from "react";
import { PlusCircle, MinusCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

const Support = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  const faqs = [
    {
      question: "What is Recipe Book?",
      answer:
        "Recipe Book is a digital platform where users can discover, save, and manage their favorite cooking recipes. It also allows users to share their own recipes with others.",
    },
    {
      question: "How do I add a new recipe in Recipe Book?",
      answer:
        "You can add a new recipe by clicking on the 'Add Recipe' button, then filling out the recipe name, ingredients, instructions, and optionally uploading an image.",
    },
    {
      question: "How can I find recipes in Recipe Book?",
      answer:
        "Use the search bar or filter by categories like cuisine, cooking time, or dietary preferences to find recipes easily.",
    },
    {
      question: "Can I edit or delete a recipe I created?",
      answer:
        "Yes, go to 'My Recipes', select the one you want to edit or delete, and use the options provided.",
    },
    {
      question: "Is there a way to save my favorite recipes?",
      answer:
        "Absolutely! Just click the heart icon or 'Save' button on any recipe to add it to your favorites list.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-11/12 py-16 bg-gradient-to-br from-pink-600 via-pink-500 to-red-400 mx-auto px-4 mt-20 mb-20 rounded-xl max-w-4xl relative">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center gap-2 text-white font-semibold hover:text-red-200 transition"
        aria-label="Go back"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      {/* Support Contact Info */}
      <div className="text-center mb-12 text-white">
        <h2 className="text-4xl font-bold mb-4">Need Help? Contact Support</h2>
        <p className="max-w-lg mx-auto mb-6">
          If you have any questions or need assistance, please reach out to us.
        </p>
        <p>
          📧 Email:{" "}
          <a
            href="mailto:tahreemhossain0@gmail.com"
            className="underline hover:text-red-200"
          >
            tahreemhossain0@gmail.com
          </a>
        </p>
        <p>📞 Phone: 01319550316</p>
      </div>

      {/* FAQ Section */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index}>
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left p-4 bg-white rounded-lg flex items-center justify-between transition-all duration-300 hover:bg-gray-100"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="text-xl font-sm text-gray-700">{faq.question}</span>
              {openIndex === index ? (
                <MinusCircle className="h-5 w-5 text-red-500 cursor-pointer" />
              ) : (
                <PlusCircle className="h-5 w-5 text-red-500 cursor-pointer" />
              )}
            </button>
            {openIndex === index && (
              <div
                id={`faq-answer-${index}`}
                className="p-4 text-gray-700 rounded-b-lg bg-white"
              >
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Support;
