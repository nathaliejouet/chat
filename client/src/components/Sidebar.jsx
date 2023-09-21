import { useContext } from "react";
import { UsersContext } from "../contexts/UsersContext";

function Sidebar() {
  const { users } = useContext(UsersContext);

  return (
    <div className="w-1/4 flex flex-col bg-zinc-50">
      <p className="text-xl text-center font-bold p-5 m-3">Online Users</p>
      <ul className="grow flex flex-col font-semibold list-none m-7 p-5">
        {users.map((user) => {
          return (
            <li key={user.id} className="text-lg text-blue p-2">
              {user.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
