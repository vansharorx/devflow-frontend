export default function AuthInput({ label, type = "text", placeholder, value, onChange, className = "" }) {
    return (
        <div className={`mb-3.5 text-left group ${className}`}>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-black mb-1.5 transition-transform duration-150 group-focus-within:translate-x-0.5">
                <span className="inline-block w-2 h-2 bg-[#FFE600] border border-black mr-1.5 transition-transform duration-200 group-focus-within:scale-125"></span>
                {label}
            </label>

            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full px-3.5 py-2.5 border-2 border-black bg-white font-mono text-sm text-black placeholder:text-gray-400 shadow-[3px_3px_0px_#000] focus:outline-none focus:bg-[#FFFDF5] focus:shadow-[5px_5px_0px_#000] focus:-translate-y-0.5 transition-all duration-150"
            />
        </div>
    );
}
