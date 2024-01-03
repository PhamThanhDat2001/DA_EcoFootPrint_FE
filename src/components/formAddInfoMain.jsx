import React, { useState } from 'react';

const FormPostInfoMain = ({ isModalOpenAdd, setIsModalOpenAdd, handleAddClick }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    link_url: '',
    // Add other form fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data if needed

    // Assuming you have an API endpoint for creating new data
    fetch('http://localhost:8080/api/v1/infomationmain', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers as needed
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server if needed
        // For example, you might want to update the state in Dashboard component
        // by calling handleAddClick(data);
        console.log('Data added successfully:', data);

        // Close the form modal
        setIsModalOpenAdd(false);
      })
      .catch((error) => {
        console.error('Error adding data:', error);
        // Handle errors if needed
      });
      window.location.reload();
  };

  return (
    <div className="form-modal">
      <form onSubmit={handleSubmit}>
        <label>
          Tiêu đề:
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </label>
        {/* Add other form fields as needed */}
        <label>
          Mô tả:
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </label>
        <label>
          Đường dẫn ảnh:
          <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} required />
        </label>
        <label>
          Đường dẫn liên kết:
          <input type="text" name="link_url" value={formData.link_url} onChange={handleChange} required />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormPostInfoMain;
