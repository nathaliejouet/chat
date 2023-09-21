import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { UsersContext } from "../contexts/UsersContext";
import { SocketContext } from "../contexts/SocketContext";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { setUsers } = useContext(UsersContext);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("users", (users) => {
      setUsers(users);
    });
  }, []);

  function handleChange(e) {
    setError("");
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    socket.emit("newUser", { name }, ({ error, user }) => {
      setError(error);
      if (!error) {
        setError("");
        dispatch(setUser({ id: user.id, name }));
        navigate("/room");
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center h-screen w-auto bg-slate-100"
    >
      <input
        value={name}
        placeholder="Username"
        onChange={handleChange}
        className="w-1/4 m-5 p-2"
      />
      <p className="text-rose-700">{error}</p>
      <button
        type="submit"
        className="w-1/4 m-5 p-2 text-white bg-sky-400 font-semibold rounded-lg"
      >
        OK
      </button>
    </form>
  );
}

export default App;
