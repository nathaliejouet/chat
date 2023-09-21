import { useContext } from "react";
import { UsersContext } from "../contexts/UsersContext";

function ReceveidMessage({ item }) {
  const { users } = useContext(UsersContext);

  return (
    <div className="justify-start inline-flex">
      <li className="flex flex-col text-left text-white rounded-tl-lg rounded-br-lg rounded-tr-lg bg-sky-500 m-2 p-2 pl-5 pr-5">
        <div className="flex items-center">
          <div
            className={`h-px rounded-full p-2 mr-2   ${
              users.find((obj) => obj.id === item.user.id)
                ? "bg-emerald-300"
                : "bg-sky-100"
            } `}
          ></div>
          <span className="font-medium pr-4">{item.user.name}</span>
          <span className="font-light pr-2">{item.date}</span>
        </div>
        <span className="pt-2">{item.message}</span>
      </li>
    </div>
  );
}

export default ReceveidMessage;
