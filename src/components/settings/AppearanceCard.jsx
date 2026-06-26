import {
  Palette,
  Sun,
  Moon
} from "lucide-react";

export default function AppearanceCard() {

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

          <Palette
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
            Appearance
          </h2>

          <p
            className="
              text-gray-500
              mt-2
            "
          >
            Choose your preferred theme for the application.
          </p>

          <hr className="my-6"/>

          <h3
            className="
              font-semibold
              mb-4
            "
          >
            Theme
          </h3>

          <div className="grid grid-cols-2 gap-6">

            <div
              className="
                border-2
                border-[#102C26]
                rounded-xl
                p-5
                flex
                items-center
                gap-4
                cursor-pointer
              "
            >

              <input
                type="radio"
                checked
                readOnly
              />

              <Sun />

              <span className="font-medium">
                Light
              </span>

            </div>

            <div
              className="
                border
                rounded-xl
                p-5
                flex
                items-center
                gap-4
                cursor-pointer
              "
            >

              <input
                type="radio"
                readOnly
              />

              <Moon />

              <span className="font-medium">
                Dark
              </span>

            </div>

          </div>

          <p
            className="
              mt-6
              text-gray-500
            "
          >
            Theme changes will be applied immediately.
          </p>

        </div>

      </div>

    </div>

  );

}