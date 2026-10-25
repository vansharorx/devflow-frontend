export default function UserSelect({ users = [], value, onChange }) {
    return (
        <select
            value={value || ""}
            onChange={onChange}
            className="border-2 border-black bg-white px-3 py-1.5 font-mono text-xs font-bold text-black shadow-[3px_3px_0px_#000] focus:outline-none focus:bg-[#FFFDF5] cursor-pointer"
        >
            <option value="">// Unassigned</option>
            {users.map((user) => (
                <option key={user.id} value={user.id}>
                    @ {user.name}
                </option>
            ))}
        </select>
    );
}
