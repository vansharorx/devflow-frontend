import { useContext } from "react";
import { SocketContext } from "../../context/SocketContext";

export default function ConnectionStatus() {
    const { connected } = useContext(SocketContext);

    return (
        <span
            className={`border-2 border-black font-mono text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 shadow-[2px_2px_0px_#000] flex items-center gap-1.5 ${
                connected ? "bg-[#00E676] text-black" : "bg-[#FF5E7E] text-black"
            }`}
        >
            <span
                className={`w-2 h-2 border border-black inline-block ${
                    connected ? "bg-black animate-pulse" : "bg-black"
                }`}
            />
            {connected ? "LIVE" : "OFFLINE"}
        </span>
    );
}
