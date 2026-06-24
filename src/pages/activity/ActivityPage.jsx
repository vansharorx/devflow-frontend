import {
  useEffect,
  useState
} from "react";

import LoadingSpinner from "../../components/ui/LoadingSpinner";

import api from "../../services/api";

export default function ActivityPage() {

  const [activities,
    setActivities] =
      useState([]);

  const [loading,
    setLoading] =
      useState(true);

  useEffect(() => {

    fetchActivities();

  }, []);

  const fetchActivities = async () => {

    try {

      const res =
        await api.get(
          "/activities"
        );

      setActivities(
        res.data.data.sort(
          (a, b) =>
            new Date(b.created_at) -
            new Date(a.created_at)
        )
      );

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);
    }
  };

  if (loading) {
    return <h2><LoadingSpinner /></h2>;
  }

  return (

    <div>

      <h1
        className="
        heading-font
        text-3xl
        text-[#102C26]
        mb-6
      "
      >
        Activity Timeline
      </h1>

      <div className="space-y-4">

        {
          activities.map(
            activity => (

            <div
              key={activity.id}
              className="
              bg-white
              p-5
              rounded-xl
              shadow
            "
            >

              <p
                className="
                font-medium
              "
              >
                {
                  activity.action
                }
              </p>

              <p
                className="
                text-gray-500
                text-sm
                mt-1
              "
              >
                {new Date(activity.created_at).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short"
                })}
              </p>

            </div>

          ))
        }

      </div>

    </div>
  );
}