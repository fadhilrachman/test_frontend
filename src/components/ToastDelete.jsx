import React from "react";
import ReactModal from "react-modal";
import alertActivity from "../assets/alertActivity.svg";

const ToastDelete = ({ show, onHide }) => {
  return (
    <ReactModal
      isOpen={show}
      onAfterOpen={() =>
        setTimeout(() => {
          onHide();
        }, 1000)
      }
      className="fixed top-0 left-0 right-0 bottom-0 flex items-center font-display justify-center text-gray-900 font-index"
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50"
      contentLabel="Example Modal"
    >
      <div
        className="px-8 py-6 bg-white rounded-lg flex justify-center  "
        data-cy="modal-information"
      >
        <img
          src={alertActivity}
          alt=""
          srcset=""
          data-cy="modal-information-icon"
        />
        <span className="ml-4 font-medium" data-cy="modal-information-title">
          Activity berhasil dihapus
        </span>
      </div>
    </ReactModal>
  );
};

export default ToastDelete;
