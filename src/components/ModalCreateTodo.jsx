import React from "react";
import ReactModal from "react-modal";
import deletse from "../assets/delete.svg";

const ModalCreateTodo = ({ show, onHide, text, handleDelete }) => {
  const options = [
    {
      priority: "very-high",
      color: "#ED4C5C",
    },
    {
      priority: "high",
      color: "#F8A541",
    },
    {
      priority: "normal",
      color: "#00A790",
    },
    {
      priority: "low",
      color: "#428BC1",
    },
    {
      priority: "very-low",
      color: "#8942C1",
    },
  ];
  return (
    <ReactModal
      isOpen={show}
      onRequestClose={() => onHide()}
      className="fixed top-0 left-0 right-0 bottom-0 flex items-center font-display justify-center  "
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50"
      contentLabel="Example Modal"
    >
      <div className=" bg-white rounded-lg flex justify-center flex-col w-7/12">
        <div className="m-5 ">
          <span className="font-semibold">Tambah List Item</span>
        </div>
        <hr />
        <form action="" className="m-5">
          <div>
            <label htmlFor="" className="text-sm">
              Nama List Item
            </label>
            <br />
            <input
              type="text"
              placeholder="Tambahkan Nama Activity"
              className="focus:outline-none border mt-3 px-3 py-3 rounded w-full"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="" className="text-sm">
              Nama List Item
            </label>
            <br />

            {/* {options.map((item) => (
              <div
                className="border   p-3 rounded-t flex items-center justify-between w-52"
                style={{ cursor: "pointer", backgroundColor: "white" }}
              >
                <div className="flex items-center">
                  <div
                    className="bg- rounded-full me-2"
                    style={{
                      height: "10px",
                      width: "10px",
                      backgroundColor: item.color,
                    }}
                  ></div>
                  <span>{item.priority}</span>
                </div>
              </div>
            ))} */}
          </div>
        </form>
        <div className="flex justify-around"></div>
      </div>
    </ReactModal>
  );
};

export default ModalCreateTodo;
