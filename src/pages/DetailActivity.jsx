import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import ModalCreateTodo from "../components/ModalCreateTodo";
import ModalDelete from "../components/ModalDelete";
import arrowBack from "../assets/arrowBack.svg";
const DetailActivity = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [action, setAction] = useState("get");
  const [data, setData] = useState();
  const [filter, setFilter] = useState("");
  const [detail, setDetail] = useState({
    title: "",
    id: "",
  });
  const [show, setShow] = useState({
    create: false,
    delete: false,
    option: false,
  });
  const getData = async () => {
    const datas = await axios.get(
      `https://todo.api.devcode.gethired.id/todo-items?activity_group_id=${id}`
    );
    setData(datas.data.data);
    setAction("get");
  };
  useEffect(() => {
    getData();
  }, [action, show.create]);

  const handleDelete = async () => {
    await axios.delete(
      `https://todo.api.devcode.gethired.id/todo-items/${detail.id}`
    );
    setAction("delete");
    setShow({ delete: false });
  };

  const filterSortAZ = () => {
    const filter = data.sort((a, b) =>
      a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
    );
    // setData(filter);
    console.log({ filter });
  };

  const filterSortZA = () => {
    const filter = data.sort((a, b) =>
      a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1
    );
    // setData(filter);
    console.log({ filter });
  };

  const filterOldData = () => {
    const filter = data?.sort((a, b) => a.id - b.id);
    // setData(filter);
    console.log(filter);
  };

  const filterNewData = () => {
    const filter = data?.sort((a, b) => a.id - b.id).reverse();
    // setData(filter);
    console.log(filter);
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
    },
    {
      name: "Terlama",
      function: filterOldData,
    },
    {
      name: "A-Z",
      function: filterSortAZ,
    },
    {
      name: "Z-A",
      function: filterSortZA,
    },
    {
      name: "Belum Selesai",
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
          />
          <h1 className="text-4xl font-semibold"> New Activity</h1>
        </div>
        <div className="flex items-center">
          <div
            className="border mr-3 rounded-full flex items-center justify-center h-14 w-14 hover:cursor-pointer text-neutral-500 bg-white "
            onClick={() => setShow({ option: !show.option })}
            // tabIndex={1}
            // onBlur={() => {
            //   setShow({ option: false });
            //   console.log("hai");
            // }}
          >
            <i class="bi bi-arrow-up  "></i>
            <i class="bi bi-arrow-down"></i>
          </div>
          <Button onClick={() => setShow({ create: true })} />
        </div>
      </div>

      <div className="mt-10 ">
        {show.option && (
          <div className="w-56 text-neutral-500 absolute top-16 rounded-t-xl bg-white right-32 rounded-b-xl border-t border-x">
            {listFilter.map((val) => (
              <div
                className=" py-4 px-5 rounded border-b hover:cursor-pointer"
                onClick={() => {
                  setFilter(val.name);
                  val?.function();
                  setShow({ option: false });
                }}
              >
                {val.name}
              </div>
            ))}
          </div>
        )}
        {data?.map((val) => (
          <div className="shadow-xl rounded mt-3 py-5 px-8 bg-white flex items-center justify-between">
            <div className="flex items-center ">
              <input type="checkbox" name="" id="" />
              {color.map(
                (item) =>
                  item.priority == val.priority && (
                    <span
                      className={` h-3 w-3 rounded-full ml-7`}
                      style={
                        item.priority == val.priority
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
              <span className="font-semibold ml-6">{val.title}</span>
            </div>
            <i
              class="bi bi-trash text-2xl text-neutral-400 hover:cursor-pointer"
              onClick={() => {
                setShow({ delete: true });
                setDetail({ title: val.title, id: val.id });
              }}
            ></i>
          </div>
        ))}
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
