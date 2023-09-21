import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { SocketContext } from "../contexts/SocketContext";

function MessageInput() {
  const [message, setMessage] = useState("");
  const socket = useContext(SocketContext);
  const user = useSelector((state) => state.user);

  function handleChange(e) {
    setMessage(e.target.value);
    socket.emit("handleMessageChange", { user, message: e.target.value });
  }

  function sendMessage(e) {
    e.preventDefault();
    socket.emit("handleMessageChange", { user, message: e.target.value });
    socket.emit("message", { user, message });
    setMessage("");
  }

  return (
    <form onSubmit={sendMessage}>
      <input
        className="w-full h-24 rounded-lg bg-zinc-100 border-slate-400 p-6 "
        value={message}
        placeholder="Message"
        onChange={handleChange}
      />
    </form>
  );
}

export default MessageInput;
