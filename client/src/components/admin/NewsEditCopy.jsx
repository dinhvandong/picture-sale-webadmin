import React, { useEffect, useState } from 'react';
import { findNewsById } from '../../services/api_news';
import DisplayContent from './DisplayContent';
import SunEditor from 'suneditor-react';
const NewsEditCopy = (props) => {
  const [content, setContent] = useState(null);
  const { id } = props;

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Make a GET request to your REST API to fetch the content
        const responseValue = await findNewsById(id);
        console.log("JSON_RESPONSE_NEW:", responseValue);
        const contentValue = responseValue.content;
        console.log("contentValue:", contentValue);
        setContent(contentValue);
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
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold">Content View</h2>
      <div>
        {
          content != null ?

          <SunEditor onChange={handleContentChange} setContents={content} />
          // <DisplayContent htmlContent={content} />
            : <div></div>
        }
      </div>
    </div>
  );
};


export default NewsEditCopy