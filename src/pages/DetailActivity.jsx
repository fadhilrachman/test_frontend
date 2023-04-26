import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import ModalCreateTodo from "../components/ModalCreateTodo";
import arrowBack from "../assets/arrowBack.svg";
const DetailActivity = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [action, setAction] = useState("get");
  const [data, setData] = useState();
  const [show, setShow] = useState({
    create: false,
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
  }, [action]);
  console.log(data);
  return (
    <div className="mt-5 px-32">
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
        <Button onClick={() => setShow({ create: true })} />
      </div>

      <div className="mt-10">
        <div className="shadow-xl rounded py-5 px-8 bg-white flex items-center justify-between">
          <div className="flex items-center">
            <input type="checkbox" name="" id="" />
            <span className="bg-red-400 h-3 w-3 rounded-full ml-7"></span>
            <span className="font-semibold ml-6">Check</span>
          </div>
          <i class="bi bi-trash text-2xl text-neutral-400 hover:cursor-pointer"></i>
        </div>
      </div>
      <ModalCreateTodo
        show={show.create}
        onHide={() => setShow({ create: false })}
      />
    </div>
  );
};

export default DetailActivity;
