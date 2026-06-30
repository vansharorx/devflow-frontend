export default function AuthInput({

  label,
  type = "text",
  placeholder,
  value,
  onChange

}) {

  return (

    <div className="mb-5">

      <label
        className="
          block
          text-sm
          font-medium
          text-[#102C26]
          mb-2
        "
      >
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          w-full
          px-4
          py-3
          rounded-lg
          border
          border-gray-300
          bg-white
          text-[#102C26]
          placeholder:text-gray-400
          transition
          focus:outline-none
          focus:border-[#102C26]
          focus:ring-2
          focus:ring-[#102C26]/20
        "
      />

    </div>

  );

}