import { useContext } from "react";
import { SocketContext } from "../../context/SocketContext";

export default function ConnectionStatus() {
    const { connected, connecting, toggleConnection } = useContext(SocketContext);

    return (
        <button
            type="button"
            onClick={toggleConnection}
            title={connected ? "Connected to real-time server (click to toggle)" : "Disconnected (click to reconnect)"}
            className={`border-2 border-black font-mono text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 shadow-[2px_2px_0px_#000] hover:shadow-[1px_1px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer flex items-center gap-1.5 ${
                connected
                    ? "bg-[#00E676] text-black"
                    : connecting
                    ? "bg-[#FFE600] text-black"
                    : "bg-[#FF5E7E] text-black"
            }`}
        >
            <span
                className={`w-2 h-2 border border-black inline-block ${
                    connected
                        ? "bg-black animate-pulse"
                        : connecting
                        ? "bg-black animate-ping"
                        : "bg-black"
                }`}
            />
            {connected ? "LIVE" : connecting ? "CONNECTING..." : "OFFLINE"}
        </button>
    );
}
