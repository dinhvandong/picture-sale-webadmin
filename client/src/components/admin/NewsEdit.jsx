import React, { useEffect, useState } from 'react';
//import { EditorState, convertToRaw, convertFromRaw, ContentState } from 'draft-js';
//import { Editor } from 'react-draft-wysiwyg';
//import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';
import { createNews, findNewsById, updateNews } from '../../services/api_news';
import CategoryNewsList from './CategoryNewsList';

import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const NewsEdit = (props) => {
  const { id } = props;

  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [content, setContent] = useState(null);
  const [category, setCategory] = useState('');



  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubTitleChange = (e) => {
    setSubTitle(e.target.value);

  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);

  }

  const categories = [
    { name: 'The Cruise' },
    { name: 'Cabin' },
    { name: 'Dining' },
    { name: 'Sundeck' },
    { name: 'Spa' },

    // Add more category objects as needed
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);


  const handleCategoryClick = (category) => {
    setSelectedCategory(category.name);
    // Do something with the selected category in the parent component
    console.log('Selected category:', category);
  };

  // const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  // const handleCategoryClick = (category) => {
  //   setSelectedCategory(category);
  //   // Do something with the selected category in the parent component
  //   console.log('Selected category:', category);
  // };
  const saveContent = async () => {
    try {
  
      const news = {
        id: id,
        title: title,
        subTitle: subTitle,
        content: content,
        category: category,
      }
      console.log("JSON_NEWS:", news);
      const response = await updateNews(news);
      console.log('Content saved:', response.data);
    } catch (error) {
      console.error('Error saving content:', error);
    }
  };

  
  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Make a GET request to your REST API to fetch the content
        const responseValue = await findNewsById(id);
        console.log("JSON_RESPONSE_NEW:", responseValue);
        const contentValue = responseValue.content;
        console.log("contentValue:", contentValue);
        setContent(contentValue);
        setCategory(responseValue.category)
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    fetchContent();
  }, []);

  const handleContentChange = (content) => {
    setContent(content);
  };

  return (
    <div>
      <div className='mt-5 '>
        <label>Title</label>
        <input onChange={handleTitleChange} className='w-full p-2 py-3 border border-gray-600 ' />
      </div>
      <div className='mt-5'>
        <label>Sub Title</label>
        <input onChange={handleSubTitleChange} className='w-full p-2 py-3 border border-gray-600 ' />
      </div>
      <div className='mt-5'>
        <label>Select Category</label>

        <div className="flex  md:text-[14px] text-[12px] w-full md:w-[600px] p-2 bg-white">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`px-4 py-2 rounded cursor-pointer ${selectedCategory === category.name ? 'bg-blue-500 text-white' : 'bg-white'
                }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category.name}
            </div>
          ))}
        </div>
        {/* <CategoryNewsList categories={categories} handleCategoryClick={handleCategoryClick} /> */}
      </div>
      <h3 className="mt-4 text-lg font-bold">Content Draft</h3>
      <SunEditor
        setOptions={{
          buttonList: [
            ['undo', 'redo'],
            ['font', 'fontSize', 'formatBlock'],
            ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
            ['removeFormat'],
            ['outdent', 'indent'],
            ['align', 'horizontalRule', 'list', 'table'],
            ['link', 'image', 'video'],
            ['fullScreen', 'showBlocks', 'codeView'],
          ],
        }}
        onChange={handleContentChange}
        setContents={content}
      />
      <button
        className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        onClick={saveContent}
      >
        Save Content
      </button>
    </div>
  );
};

export default NewsEdit;