import { Lock } from "lucide-react";

export default function SecurityCard() {

  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow
        p-8
      "
    >

      <div className="flex gap-6">

        <div
          className="
            h-20
            w-20
            rounded-full
            bg-[#F7E7CE]
            flex
            items-center
            justify-center
          "
        >

          <Lock
            size={38}
            color="#102C26"
          />

        </div>

        <div className="flex-1">

          <h2
            className="
              text-3xl
              font-semibold
              text-[#102C26]
            "
          >
            Security
          </h2>

          <p
            className="
              text-gray-500
              mt-2
            "
          >
            Update your password to keep your account secure.
          </p>

          <hr className="my-6"/>

          <button
            className="
              bg-[#102C26]
              text-white
              px-8
              py-3
              rounded-xl
              flex
              items-center
              gap-3
              cursor-pointer
              hover:bg-[#17453b]
              transition
            "
          >

            <Lock size={18}/>

            Change Password

          </button>

        </div>

      </div>

    </div>

  );

}