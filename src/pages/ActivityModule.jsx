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
          <h1 className="text-4xl font-semibold" data-cy="activity-title">
            Activity
          </h1>
          <Button onClick={handleCreate} data-cy="activity-add-button" />
        </div>
      </div>

      {data?.length === 0 && (
        <div className="flex justify-center  ">
          <img
            src={emptyActivity}
            alt=""
            data-cy="activity-empty-state"
            className="h-[400px] hover:cursor-pointer "
            onClick={() => handleCreate()}
          />
        </div>
      )}
      <div className="mt-24 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-10">
        {data?.map((val) => (
          <div className="shadow-lg bg-white rounded p-6 px-6 h-64 hover:cursor-pointer grid grid-rows-4 grid-flow-row gap-5 ">
            <div
              className={`row-span-3 ${
                !show.modal && !show.toast && "z-[100]"
              }`}
              onClick={() => navigate(`/detail/${val.id}`)}
              data-cy="activity-item"
            >
              <p className="font-bold text-2xl" data-cy="activity-item-title">
                {val.title}
              </p>
            </div>
            <div className="text-[#888888] font-semibold flex justify-between items-center">
              <p data-cy="activity-item-date">
                {dayjs(val.created_at).locale("id").format("D MMMM YYYY")}
              </p>
              <i
                class="bi bi-trash text-2xl z-[100]"
                data-cy="activity-item-delete-button"
                onClick={(e) => {
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
