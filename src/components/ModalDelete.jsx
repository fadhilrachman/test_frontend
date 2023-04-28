import React from "react";
import ReactModal from "react-modal";
import deletse from "../assets/delete.svg";
const ModalDelete = ({ show, onHide, text, handleDelete }) => {
  return (
    <ReactModal
      isOpen={show}
      onRequestClose={() => onHide()}
      className="fixed top-0 left-0 right-0 bottom-0 flex items-center font-display justify-center text-gray-900 font-index"
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50"
      contentLabel="Example Modal"
    >
      <div
        className="p-8 bg-white rounded-lg flex justify-center flex-col "
        data-cy="modal-delete"
      >
        <img
          src={deletse}
          alt=""
          className="h-20"
          srcset=""
          data-cy="modal-delete-icon"
        />
        <span data-cy="modal-delete-title">{text}</span>
        <div className="flex justify-around">
          <button
            className="bg-neutral-200 rounded-full  px-10 flex justify-between font-medium py-3"
            onClick={onHide}
            data-cy="modal-delete-cancel-button"
          >
            Batal
          </button>{" "}
          <button
            className="bg-red-500 rounded-full text-white px-10 flex justify-between font-medium py-3"
            onClick={handleDelete}
            data-cy="modal-delete-confirm-button"
          >
            Hapus
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default ModalDelete;
