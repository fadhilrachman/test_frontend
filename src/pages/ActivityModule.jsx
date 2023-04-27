import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import ModalDelete from "../components/ModalDelete";
import { useNavigate } from "react-router-dom";
import ToastDelete from "../components/ToastDelete";
import emptyActivity from "../assets/emptyActivity.svg";
import dayjs from "dayjs";
import "dayjs/locale/id";

const ActivityModule = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [action, setAction] = useState("get");
  const [show, setShow] = useState({ modal: false, toast: false });

  const [detailName, setDetailName] = useState({
    id: "",
    name: "",
  });
  useEffect(() => {
    axios
      .get(
        "https://todo.api.devcode.gethired.id/activity-groups?email=muhfadhilrachman@gmail.com"
      )
      .then((val) => setData(val.data.data));
    setAction("get");
  }, [action]);

  const handleCreate = () => {
    axios.post("https://todo.api.devcode.gethired.id/activity-groups", {
      email: "muhfadhilrachman@gmail.com",
      title: "New Activity",
    });
    setAction("post");
  };
  const handleDelete = async (item) => {
    await axios.delete(
      `https://todo.api.devcode.gethired.id/activity-groups/${detailName.id}`
    );
    setAction("delete");
    setShow({ modal: false, toast: true });
  };
  console.log(detailName);

  return (
    <div className="px-32">
      <div className="mt-5 ">
        <div className="flex items-center justify-between ">
          <h1 className="text-4xl font-semibold">Activity</h1>
          <Button onClick={handleCreate} />
        </div>
      </div>

      {data?.length === 0 && (
        <div className="flex justify-center  ">
          <img
            src={emptyActivity}
            alt=""
            className="h-[400px] hover:cursor-pointer"
            onClick={() => handleCreate()}
          />
        </div>
      )}
      <div className="mt-24 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-10">
        {data?.map((val) => (
          <div
            className="shadow-lg bg-white rounded p-6 px-6 h-64 hover:cursor-pointer flex flex-col justify-between"
            onClick={() => navigate(`/detail/${val.id}`)}
          >
            <span className="font-bold text-2xl">{val.title}</span>
            <div className="text-[#888888] font-semibold flex justify-between items-center">
              <span>
                {dayjs(val.created_at).locale("id").format("D MMMM YYYY")}
              </span>
              <i
                class="bi bi-trash text-2xl"
                onClick={(e) => {
                  e.stopPropagation();
                  setShow({ modal: true });
                  setDetailName({ name: val.title, id: val.id });
                  console.log({ show });
                }}
              ></i>
            </div>
          </div>
        ))}
      </div>
      <ModalDelete
        show={show.modal}
        onHide={() => setShow({ modal: false })}
        handleDelete={handleDelete}
        text={
          <p className="mb-6 text-1xl text-center">
            Apakah anda yakin menghapus activity{" "}
            <span className="font-semibold">"{detailName.name}"?</span>
          </p>
        }
      />
      <ToastDelete show={show.toast} onHide={() => setShow({ toast: false })} />
    </div>
  );
};

export default ActivityModule;
