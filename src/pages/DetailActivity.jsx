import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import ModalCreateTodo from "../components/ModalCreateTodo";
import ModalDelete from "../components/ModalDelete";
import arrowBack from "../assets/arrowBack.svg";
import pensil from "../assets/pensil.svg";
import emptyTodo from "../assets/emptyTodo.svg";

const DetailActivity = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [action, setAction] = useState("get");
  const [data, setData] = useState();
  const [filter, setFilter] = useState("Terbaru");
  const [dataAct, setDataAct] = useState();
  const [detail, setDetail] = useState({
    title: "",
    id: "",
  });
  const [show, setShow] = useState({
    create: false,
    delete: false,
    option: false,
    input: false,
  });

  useEffect(() => {
    axios
      .get(`https://todo.api.devcode.gethired.id/activity-groups/${id}`)
      .then((val) => {
        setData(val?.data?.todo_items);
        setDataAct(val?.data?.title);
      });
    setAction("get");
  }, [action, show.create, id]);

  console.log({ data });
  const handleDelete = async () => {
    await axios.delete(
      `https://todo.api.devcode.gethired.id/todo-items/${detail.id}`
    );
    setAction("delete");
    setShow({ delete: false });
  };

  const handleList = (val, status) => {
    status
      ? axios.patch(`https://todo.api.devcode.gethired.id/todo-items/${val}`, {
          is_active: false,
        })
      : axios.patch(`https://todo.api.devcode.gethired.id/todo-items/${val}`, {
          is_active: true,
        });
    setAction("update");
  };

  const filterSortAZ = () => {
    data.sort((a, b) =>
      a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
    );
  };

  const filterSortZA = () => {
    data.sort((a, b) =>
      a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1
    );
  };

  const filterOldData = () => {
    data?.sort((a, b) => a.id - b.id);
  };

  const filterNewData = () => {
    data?.sort((a, b) => a.id - b.id).reverse();
  };
  const filterStatus = () => {
    data.sort((a, b) => {
      if (a.is_active === b.is_active) {
        return 0; // kembalikan nilai 0 jika is_active sama
      } else if (a.is_active === 1) {
        return -1; // kembalikan nilai negatif jika is_active a = 0
      } else {
        return 1; // kembalikan nilai positif jika is_active a = 1
      }
    });
  };

  const color = [
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

  const listFilter = [
    {
      name: "Terbaru",
      function: filterNewData,
      cy: "sort-latest",
    },
    {
      name: "Terlama",
      function: filterOldData,
      cy: "sort-oldest",
    },
    {
      name: "A-Z",
      function: filterSortAZ,
      cy: "sort-az",
    },
    {
      name: "Z-A",
      function: filterSortZA,
      cy: "sort-za",
    },
    {
      name: "Belum Selesai",
      function: filterStatus,
      cy: "sort-unfinished",
    },
  ];
  return (
    <div className="mt-5 px-32 relative">
      <div className="flex justify-between">
        <div className="flex items-center">
          <img
            src={arrowBack}
            alt=""
            className="hover:cursor-pointer"
            onClick={() => navigate("/")}
            srcset=""
            data-cy="todo-back-button"
          />
          {show.input ? (
            <input
              type="text"
              value={dataAct}
              onChange={(e) => setDataAct(e.target.value)}
              onBlur={(e) => {
                axios.patch(
                  `https://todo.api.devcode.gethired.id/activity-groups/${id}`,
                  { title: e.target.value }
                );
                setAction("patch");
                setTimeout(() => {
                  setShow({ input: false });
                }, 300);
              }}
              autoFocus
              className="text-4xl font-semibold focus:outline-none bg-neutral-100 border-b-black border-b pb-2 w-max"
            />
          ) : (
            <h1
              className="text-4xl font-[900] hover:cursor-pointer flex "
              onClick={() => setShow({ input: true })}
              data-cy="todo-title"
            >
              {" "}
              {dataAct}
            </h1>
          )}
          <img
            src={pensil}
            alt=""
            data-cy="todo-title-edit-button"
            className="ml-3 hover:cursor-pointer"
            onClick={() => setShow({ input: !show.input })}
          />
        </div>
        <div className="flex items-center">
          <div
            data-cy="todo-sort-button"
            className="border mr-3 rounded-full flex items-center justify-center h-14 w-14 hover:cursor-pointer text-neutral-500 bg-white "
            onClick={() => setShow({ option: !show.option })}
          >
            <i class="bi bi-arrow-up  "></i>
            <i class="bi bi-arrow-down"></i>
          </div>
          <Button
            onClick={() => setShow({ create: true })}
            data-cy="todo-add-button"
          />
        </div>
      </div>

      <div className="mt-10 ">
        {show.option && (
          <div
            className="w-56 text-[#4A4A4A] font-medium absolute top-16 rounded-t-xl bg-white right-32 rounded-b-xl border-t border-x"
            data-cy="sort-parent"
          >
            {listFilter.map((val) => (
              <div
                className=" py-4 px-5 rounded border-b hover:cursor-pointer flex items-center justify-between"
                onClick={() => {
                  setFilter(val.name);
                  val?.function();
                  setShow({ option: false });
                }}
                data-cy={val?.cy}
              >
                {val.name}
                {filter === val.name && <i class="bi bi-check2"></i>}
              </div>
            ))}
          </div>
        )}
        {data?.length === 0 ? (
          <div className=" flex justify-center z-[100]">
            <img
              src={emptyTodo}
              alt=""
              className="hover:cursor-pointer"
              data-cy="todo-empty-state"
              srcset=""
              onClick={() => setShow({ create: true })}
            />
          </div>
        ) : (
          data?.map((val, key) => (
            <div
              className="shadow-xl rounded mt-3 py-5 px-8 bg-white flex items-center justify-between z-[100]"
              data-cy={`todo-item-${key}`}
            >
              <div className="flex items-center ">
                <input
                  type="checkbox"
                  name="list"
                  checked={val.is_active === 0 && true}
                  data-cy="todo-item-checkbox"
                  onChange={(e) => handleList(val.id, e.target.checked)}
                />
                {color.map(
                  (item) =>
                    item.priority === val.priority && (
                      <span
                        className={` h-3 w-3 rounded-full ml-7`}
                        style={
                          item.priority === val.priority
                            ? {
                                height: "10px",
                                width: "10px",
                                backgroundColor: item.color,
                              }
                            : {
                                display: "none",
                              }
                        }
                      ></span>
                    )
                )}
                <span
                  className={`font-semibold ml-6 ${
                    val.is_active === 0 && "line-through"
                  }`}
                  data-cy="todo-item-title"
                >
                  {val.title}
                </span>
                <img
                  src={pensil}
                  alt=""
                  data-cy="todo-item-edit-button"
                  className="ml-4 hover:cursor-pointer"
                  onClick={() => setShow({ create: !show.create })}
                />
              </div>
              <i
                class="bi bi-trash text-2xl text-neutral-400 hover:cursor-pointer"
                onClick={() => {
                  setShow({ delete: true });
                  setDetail({ title: val.title, id: val.id });
                }}
                data-cy="todo-item-delete-button"
              ></i>
            </div>
          ))
        )}
      </div>
      <ModalCreateTodo
        show={show.create}
        onHide={() => setShow({ create: false })}
      />
      <ModalDelete
        show={show.delete}
        onHide={() => setShow({ delete: false })}
        handleDelete={handleDelete}
        text={
          <p className="mb-6 text-1xl text-center">
            Apakah anda yakin menghapus item
            <span className="font-semibold"> "{detail.title}"?</span>
          </p>
        }
      />
    </div>
  );
};

export default DetailActivity;
