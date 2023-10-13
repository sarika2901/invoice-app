import React from "react";
import "./modal.css";
function Modal({ closeModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="modal-header">
          <button className="crossBtn" onClick={() => closeModal(false)}>
            X
          </button>
          <div className="title">
            <h3>Added!</h3>
          </div>
        </div>
        <div className="footer">
          <button onClick={() => closeModal(false)}>OK</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
