import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";

const ActivityModule = () => {
  const [data, setData] = useState();
  const [action, setAction] = useState("get");
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
  console.log({ action });
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
          <div className="shadow-lg rounded p-6 px-6 h-64 cursor-pointer flex flex-col justify-between">
            <span className="font-semibold text-2xl">{val.title}</span>
            <div className="text-neutral-500 flex justify-between items-center">
              <span>5 Oktober 2023</span>
              <i class="bi bi-trash text-2xl"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityModule;
