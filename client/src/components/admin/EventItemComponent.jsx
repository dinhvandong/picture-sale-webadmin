import { API_URL_IMAGE } from "../../services/api";

function EventItemComponent({ item, index, handleInputChange, handleImageUpload, handleItemRemove  }) {
    const { type, title, icon, active } = item;

    const handleTypeChange = event => {
        handleInputChange(index, 'type', event.target.value);
    };

    const handleTitleChange = event => {
        handleInputChange(index, 'title', event.target.value);
    };

    const handleImageChange = event => {
        handleImageUpload(index, event.target.files[0]);
    };

    const handleRemoveClick = () => {
        handleItemRemove(index);
      };

    return (
        <div className='flex items-center justify-center'>
            <input className='w-[100px] text-black border border-black' type="text" value={type} onChange={handleTypeChange} />
            <input className='w-1/3 ml-2 text-black border border-black' type="text" value={title} onChange={handleTitleChange} />
            <input
                className='w-1/5 ml-2 text-black border border-black'
                type="file"
                accept="image/*"
                onChange={handleImageChange}
            />
            <img src={API_URL_IMAGE + icon} className='ml-2 w-[20px] h-[20px]' />

            <button className="w-1/5 px-2 py-1 mt-2 mb-5 ml-2 text-white bg-red-500 rounded hover:bg-orange-600" onClick={handleRemoveClick}>Remove</button>

            {/* ... render other fields */}
        </div>
    );
}
export default EventItemComponent