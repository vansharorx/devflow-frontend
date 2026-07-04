import {
  Activity,
  FolderKanban,
  Bug,
  CheckCircle
} from "lucide-react";

export default function RecentActivity({

  activities

}) {

  const getIcon = (action) => {

    const value = action.toLowerCase();

    if (value.includes("project"))
      return <FolderKanban size={18} className="text-blue-500" />;

    if (value.includes("issue"))
      return <Bug size={18} className="text-orange-500" />;

    if (value.includes("closed"))
      return <CheckCircle size={18} className="text-green-600" />;

    return <Activity size={18} className="text-[#102C26]" />;

  };

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
          mb-5
        "
      >
        Recent Activity
      </h2>

      <div
        className="
          space-y-4
          overflow-y-auto
          h-[330px]
          pr-2
        "
      >

        {

          activities.map((activity, index) => (

            <div

              key={index}

              className="
                flex
                gap-3
                pb-3
                border-b
                border-gray-100
              "

            >

              <div className="mt-1">

                {getIcon(activity.action)}

              </div>

              <div>

                <p
                  className="
                    font-medium
                    text-[#102C26]
                    text-sm
                  "
                >
                  {activity.action}
                </p>

                <p
                  className="
                    text-xs
                    text-gray-500
                  "
                >
                  {activity.entity_type}
                </p>

              </div>

            </div>

          ))

        }

      </div>

    </div>

  );

}