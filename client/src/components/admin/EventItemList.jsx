
import React, { useState } from 'react';

function EventItemList() {
  const [items, setItems] = useState([]);
  const [images, setImages] = useState([]);

  const addItem = () => {
    setItems(prevItems => [...prevItems, '']);
    setImages(prevImages => [...prevImages, null]);
  };

  const handleInputChange = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index] = value;
    setItems(updatedItems);
  };

  const handleImageUpload = (index, file) => {
    const updatedImages = [...images];
    updatedImages[index] = file;
    setImages(updatedImages);
  };

  return (
    <div>
      <button className='className="w-[200px] px-4 py-1 mt-2 mb-5 text-white rounded bg-base_color hover:bg-orange-600"' onClick={addItem}>Thêm danh mục con</button>
      {items.map((item, index) => (
        <div key={index}>
            <input className='text-black border border-black'
            type="number"
            placeholder='Loại danh mục'
            value={item}
            onChange={e => handleInputChange(index, e.target.value)}
          />
          <input className='text-black border border-black'
            type="text"
            placeholder='Tên danh mục'
            value={item}
            onChange={e => handleInputChange(index, e.target.value)}
          />
          <input
          className='text-black border border-black'
            type="file"
            accept="image/*"
            onChange={e => handleImageUpload(index, e.target.files[0])}
          />
          <button className="w-[200px] px-4 py-1 mt-2 mb-5 text-white rounded bg-red-500 hover:bg-orange-600" onClick={() => handleInputChange(index, '')}>Remove</button>
        </div>
      ))}
    </div>
  );
}


export default EventItemList