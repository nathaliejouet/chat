import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SentMessage from "./SentMessage";
import ReceveidMessage from "./ReceveidMessage";
import { SocketContext } from "../contexts/SocketContext";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [usersTyping, setUsersTyping] = useState([]);
  const [usersAreTypingSentence, setUsersAreTypingSentence] = useState("");
  const socket = useContext(SocketContext);
  const name = useSelector((state) => state.user.name);
  const id = useSelector((state) => state.user.id);

  useEffect(() => {
    socket.on("messages", (msg) => {
      setMessages((msgs) => [...msgs, msg]);
    });
    socket.on("usersTyping", (users) => {
      let usersAreTypingFiltered = users.filter((obj) => obj.user.id !== id);
      setUsersTyping([...usersAreTypingFiltered]);
    });
  }, []);

  useEffect(() => {
    const newUserAreTypingSentence = usersTyping
      .map((obj) => obj.user.name)
      .join(", ");

    setUsersAreTypingSentence(newUserAreTypingSentence);
  }, [usersTyping]);

  useEffect(() => {
    document
      .getElementById("scrollTarget")
      .scrollIntoView({ behavior: "smooth" });
  });

  return (
    <>
      <ul
        id="messagesList"
        className="grow flex flex-col list-none overflow-auto m-2"
      >
        {messages.map((item, i) => {
          return name === item.user.name ? (
            <SentMessage key={i} item={item}></SentMessage>
          ) : (
            <ReceveidMessage key={i} item={item}></ReceveidMessage>
          );
        })}
        <div id="scrollTarget"></div>
      </ul>
      {usersAreTypingSentence && (
        <span className="italic text-neutral-500 mb-3">
          {usersAreTypingSentence}
          {usersTyping.length > 1 ? " are " : " is "} typing
        </span>
      )}
    </>
  );
}

export default Messages;
