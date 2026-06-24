import { useContext } from "react";
import { SocketContext } from "../../context/SocketContext";

export default function ConnectionStatus() {

  const { connected } = useContext(SocketContext);

  return (
    <span
      className={
        connected
          ? "text-green-600 font-medium"
          : "text-red-500 font-medium"
      }
    >
      {connected ? "● Live" : "● Offline"}
    </span>
  );
}