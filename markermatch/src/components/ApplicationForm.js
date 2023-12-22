import React, { useState } from 'react';

function ApplicationForm() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        selectedClasses: [],
        //add more fields 
      });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
      const handleOptionChange = (e) => {
        const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
        setFormData({
          ...formData,
          selectedOptions: selectedValues,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
      };

    return (
        <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div>
        <label htmlFor="contact">Contact:</label>
        <input
          type="text"
          id="contact"
          name="contact"
          value={formData.contact}
          onChange={handleInputChange}
        />
        </div>

        {/* Add more fields as needed */}
        <div>
        <label htmlFor="selectOptions">Select Multiple Options:</label>
        <select
          id="selectOptions"
          name="selectedOptions"
          multiple
          value={formData.selectedClasses}
          onChange={handleOptionChange}
        >
          <option value="101">Option 1</option>
          <option value="110">Option 2</option>
          <option value="120">Option 3</option>
          {/* Add more options as needed */}
        </select>
        </div>

        <p>Selected Options: {formData.selectedClasses.join(', ')}</p>

        <button type="submit">Submit</button>

        </form>
    );
  }
  
  export default ApplicationForm;
  