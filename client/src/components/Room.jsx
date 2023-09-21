import Messages from "./Messages";
import MessageInput from "./MessageInput";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Room() {
  const navigate = useNavigate();
  const name = useSelector((state) => state.user.name);

  useEffect(() => {
    if (!name) {
      navigate("/");
    }
  }, [name]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="grow flex flex-col bg-white p-8">
        <Messages />
        <MessageInput />
      </div>
    </div>
  );
}

export default Room;
