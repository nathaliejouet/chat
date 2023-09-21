function SentMessage({ item }) {
  return (
    <div className="justify-end inline-flex ">
      <li className="flex flex-col text-right rounded-tl-lg rounded-bl-lg rounded-tr-lg bg-zinc-100 m-2 p-2 pl-5 pr-5 ">
        <span className="font-light text-gray-400 pb-2">{item.date}</span>
        <span>{item.message}</span>
      </li>
    </div>
  );
}

export default SentMessage;
