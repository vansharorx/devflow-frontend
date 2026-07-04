export default function ProjectProgressChart({

  data

}) {

  return (

    <div
      className="
        bg-white
        rounded-2xl
        border
        border-gray-100
        shadow-md
        p-6
        h-[420px]
      "
    >

      <h2
        className="
          heading-font
          text-xl
          text-[#102C26]
          mb-6
        "
      >
        Project Progress
      </h2>

      <div
        className="
          space-y-6
          overflow-y-auto
          h-[320px]
          pr-2
        "
      >

        {

          data.map(project => (

            <div
              key={project.id}
            >

              <div
                className="
                  flex
                  justify-between
                  mb-2
                "
              >

                <span
                  className="
                    font-medium
                    text-[#102C26]
                  "
                >
                  {project.name}
                </span>

                <span
                  className="
                    text-sm
                    font-semibold
                    text-[#102C26]
                  "
                >
                  {project.progress}%
                </span>

              </div>

              <div
                className="
                  w-full
                  h-3
                  rounded-full
                  bg-gray-200
                "
              >

                <div
                  className="
                    h-3
                    rounded-full
                    bg-[#102C26]
                    transition-all
                    duration-700
                  "
                  style={{
                    width: `${project.progress}%`
                  }}
                />

              </div>

            </div>

          ))

        }

      </div>

    </div>

  );

}