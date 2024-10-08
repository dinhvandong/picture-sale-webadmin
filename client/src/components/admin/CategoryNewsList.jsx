import React, { useState } from 'react';

const CategoryNewsList = ({ categories , handleCategoryClick   }) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//     handleCategoryClick(category); // Call the prop function with the selected category

//   };

const handleClick = (category) => {
    setSelectedCategory(category);
    handleCategoryClick(category); // Call the prop function with the selected category
  };

  return (
    <div className="flex  md:text-[14px] text-[12px] w-full md:w-[600px] p-2 bg-white">
      {categories.map((category, index) => (
        <div
          key={index}
          className={`px-4 py-2 rounded cursor-pointer ${
            selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-white'
          }`}
          onClick={() => handleClick(category)}
        >
          {category.name}
        </div>
      ))}
    </div>
  );
};


export default CategoryNewsList