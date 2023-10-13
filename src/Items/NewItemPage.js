import React, { useState } from "react";
import "../App.css";
import Modal from "../modal/modal.js";
import "../modal/modal.css";

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

  const [openModal, setOpenModal] = useState(false);

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
            <button
              className="formChar-submit"
              type="submit"
              onClick={() => {
                if (
                  (formData.name !== "",
                  formData.price !== "" && formData.description !== "")
                )
                  setOpenModal(true);
              }}
            >
              Add Item
            </button>
          </div>
        </form>
        {openModal && <Modal closeModal={setOpenModal} />}
      </div>
    </div>
  );
};

export default NewItemPage;
