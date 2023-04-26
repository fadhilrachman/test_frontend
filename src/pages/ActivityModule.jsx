import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import ModalDelete from "../components/ModalDelete";
import { useNavigate } from "react-router-dom";

const ActivityModule = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [action, setAction] = useState("get");
  const [show, setShow] = useState(false);

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
    setShow(false);
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

      <div className="mt-24 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-10">
        {data?.map((val) => (
          <div
            className="shadow-lg bg-white rounded p-6 px-6 h-64 hover:cursor-pointer flex flex-col justify-between"
            onClick={() => navigate(`/detail/${val.id}`)}
          >
            <span className="font-semibold text-2xl">{val.title}</span>
            <div className="text-neutral-400 flex justify-between items-center">
              <span>5 Oktober 2023</span>
              <i
                class="bi bi-trash text-2xl"
                onClick={() => {
                  setShow(true);
                  setDetailName({ name: val.title, id: val.id });
                  console.log({ show });
                }}
              ></i>
            </div>
          </div>
        ))}
      </div>
      <ModalDelete
        show={show}
        onHide={() => setShow(false)}
        handleDelete={handleDelete}
        text={
          <p className="mb-6 text-1xl text-center">
            Apakah anda yakin menghapus activity{" "}
            <span className="font-semibold">"{detailName.name}"?</span>
          </p>
        }
      />
    </div>
  );
};

export default ActivityModule;
