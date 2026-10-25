export default function AuthInput({ label, type = "text", placeholder, value, onChange }) {
    return (
        <div className="mb-4 text-left">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-black mb-1.5">
                <span className="inline-block w-2 h-2 bg-[#FFE600] border border-black mr-1.5"></span>
                {label}
            </label>

            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full px-3.5 py-2.5 border-2 border-black bg-white font-mono text-sm text-black placeholder:text-gray-400 shadow-[3px_3px_0px_#000] focus:outline-none focus:bg-[#FFFDF5] focus:shadow-[4px_4px_0px_#000] transition-all"
            />
        </div>
    );
}
