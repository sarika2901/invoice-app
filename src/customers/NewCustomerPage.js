import React, { useState } from "react";
import "../App.css";
import Modal from "../modal/modal.js";
import "../modal/modal.css";

const NewCustomerPage = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
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
    const newCustomer = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      createdOn: new Date().toLocaleDateString(),
    };
    onAdd(newCustomer);
    setFormData({ name: "", phone: "", email: "" });
  };

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="container-new-customer">
      <div className="header-container">
        <h3>New Customer</h3>
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
              Phone
              <input
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </label>
            <label className="formChar">
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
            <button
              className="formChar-submit"
              type="submit"
              onClick={() => {
                if (
                  (formData.name !== "",
                  formData.email !== "" && formData.phone !== "")
                )
                  setOpenModal(true);
              }}
            >
              Submit
            </button>
          </div>
        </form>
        {openModal && <Modal closeModal={setOpenModal} />}
      </div>
    </div>
  );
};

export default NewCustomerPage;
