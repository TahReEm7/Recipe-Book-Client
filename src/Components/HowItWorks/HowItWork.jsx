import React from 'react';

const HowItWork = () => {
    return (
        <div>
            <section class="bg-white py-12 px-4 md:px-16">
  <div class="max-w-5xl mx-auto text-center">
    <h2 class="text-4xl font-bold text-[#d7367c] mb-6">How It Works</h2>
    <p class="text-gray-600 mb-10">Just 4 simple steps to start your cooking journey with Recipe Book.</p>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
   
      <div class="flex flex-col items-center text-center">
        <div class="text-white bg-[#d7367c]  rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold mb-4">1</div>
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Sign Up</h3>
        <p class="text-gray-600 text-sm">Create your free account to save and share your favorite recipes.</p>
      </div>


      <div class="flex flex-col items-center text-center">
        <div class="text-white bg-[#d7367c] rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold mb-4">2</div>
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Add a Recipe</h3>
        <p class="text-gray-600 text-sm">Fill in your ingredients, steps, and upload a delicious photo.</p>
      </div>

    
      <div class="flex flex-col items-center text-center">
        <div class="text-white bg-[#d7367c] rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold mb-4">3</div>
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Browse & Cook</h3>
        <p class="text-gray-600 text-sm">Explore thousands of recipes for any taste or occasion.</p>
      </div>

  
      <div class="flex flex-col items-center text-center">
        <div class="text-white bg-[#d7367c]  rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold mb-4">4</div>
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Save & Share</h3>
        <p class="text-gray-600 text-sm">Save your favorites and share your best recipes with others.</p>
      </div>
    </div>
  </div>
</section>

        </div>
    );
};

export default HowItWork;