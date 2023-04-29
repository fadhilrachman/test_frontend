import React, { useState } from "react";
import ReactModal from "react-modal";
import Button from "./Button";
import { useParams } from "react-router-dom";
import axios from "axios";

const ModalCreateTodo = ({ show, onHide }) => {
  const { id } = useParams();
  const [data, setData] = useState({
    activity_group_id: id,
    priority: "very-high",
    title: "",
    color: "",
  });
  const [option, setOption] = useState({ is_active: false });
  const handleBlur = () => {
    console.log("haii");
    setOption({ is_active: false });
  };

  const handleCreate = async () => {
    const result = {
      activity_group_id: data.activity_group_id,
      priority: data.priority,
      title: data.title,
    };
    console.log({ result });
    await axios.post("https://todo.api.devcode.gethired.id/todo-items", result);
    onHide();
  };
  const options = [
    {
      priority: "very-high",
      color: "#ED4C5C",
      cy: "modal-add-priority-very-high",
    },
    {
      priority: "high",
      color: "#F8A541",
      cy: "modal-add-priority-high",
    },
    {
      priority: "normal",
      color: "#00A790",
      cy: "modal-add-priority-normal",
    },
    {
      priority: "low",
      color: "#428BC1",
      cy: "modal-add-priority-low",
    },
    {
      priority: "very-low",
      color: "#8942C1",
      cy: "modal-add-priority-very-low",
    },
  ];
  console.log(data);
  return (
    <ReactModal
      isOpen={show}
      onRequestClose={() => onHide()}
      className="fixed top-0 left-0 right-0 bottom-0 flex items-center font-display justify-center  "
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50"
      contentLabel="Example Modal"
    >
      <div
        className=" bg-white rounded-lg flex justify-center flex-col w-7/12"
        data-cy="modal-add"
      >
        <div className="m-5 flex justify-between">
          <span className="font-semibold" data-cy="modal-add-title">
            Tambah List Item
          </span>
          <i
            class="bi bi-x-lg hover:cursor-pointer"
            onClick={onHide}
            data-cy="modal-add-close-button"
          ></i>
        </div>
        <hr />
        <form action="" className="m-5">
          <div>
            <label
              htmlFor=""
              className="text-sm font-bold"
              data-cy="modal-add-name-title"
            >
              Nama List Item
            </label>
            <br />
            <input
              onChange={(e) => setData({ ...data, title: e.target.value })}
              type="text"
              placeholder="Tambahkan Nama Activity"
              className="focus:outline-none focus:border-sky-500 border mt-3 px-3 py-3 rounded w-full"
              data-cy="modal-add-name-input"
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor=""
              className="text-sm font-bold "
              data-cy="modal-add-priority-title"
            >
              Priority
            </label>
            <br />
            <div
              onBlur={handleBlur}
              tabIndex={1}
              className="w-max mt-3"
              data-cy="modal-add-priority-item"
            >
              <div
                className="bg-neutral-100 py-3  px-4 w-52 border rounded-t  flex justify-between  items-center hover:cursor-pointer"
                onClick={() => setOption({ is_active: !option.is_active })}
              >
                {data.priority ? (
                  <div className="flex items-center">
                    {" "}
                    <div
                      className=" rounded-full mr-3"
                      style={{
                        height: "10px",
                        width: "10px",
                        backgroundColor: data.color,
                      }}
                    ></div>
                    {data.priority}
                  </div>
                ) : (
                  " Pilih Priority"
                )}
                <i class="bi bi-caret-down-fill ml-14"></i>
              </div>

              <div className="absolute rounded-b">
                {option.is_active &&
                  options.map((item) => (
                    <div
                      className="border bg-neutral-100 hover:bg-sky-500 hover:cursor-pointer   p-3  flex items-center justify-between w-52"
                      onClick={() => {
                        setData({
                          ...data,
                          priority: item.priority,
                          color: item.color,
                        });
                        setOption({ is_active: !option.is_active });
                      }}
                    >
                      <div
                        className="flex items-center "
                        data-cy="modal-add-priority-item"
                      >
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
                  ))}
              </div>
            </div>
          </div>
        </form>
        <hr />

        <div className="flex justify-end m-7">
          <Button
            variant="todo"
            data-cy="modal-add-save-button"
            onClick={handleCreate}
            // disabled={data.title === "" || data.priority === ""}
          />
        </div>
      </div>
    </ReactModal>
  );
};

export default ModalCreateTodo;
