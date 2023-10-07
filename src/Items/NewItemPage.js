import React, { useState } from "react";
import "../App.css";

const NewItemPage = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });

  const handleChange = (x) => {
    const { name, value } = x.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (x) => {
    x.preventDefault();
    const newItem = {
      name: formData.name,
      price: formData.price,
      description: formData.description,
      addedOn: new Date().toLocaleDateString(),
    };
    onAdd(newItem);
    setFormData({ name: "", price: "", description: "" });
  };

  return (
    <div className="container-new-customer">
      <div className="header-container">
        <h3>New Item</h3>
      </div>
      <div className="form-box">
        <form onSubmit={handleSubmit}>
          <div className="formControls">
            <label className="formChar">
              Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
            <label className="formChar">
              Price
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </label>
            <label className="formChar">
              Description
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="large-input"
              ></textarea>
            </label>
            <button className="formChar-submit" type="submit">
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewItemPage;
