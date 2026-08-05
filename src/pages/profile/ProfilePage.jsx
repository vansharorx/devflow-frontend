import {
  useContext,
  useEffect,
  useRef,
  useState
} from "react";

import api, {
  uploadProfileImage
} from "../../services/api";

import { AuthContext } from "../../context/AuthContext";

export default function ProfilePage() {

  const {
    user,
    loadUser
  } = useContext(AuthContext);

  const fileInputRef =
    useRef(null);

  const [stats, setStats] = useState({
    projects: 0,
    issues: 0,
    notifications: 0
  });

  useEffect(() => {

    loadStats();

  }, []);

  const handleProfileImage = async (event) => {

    const file =
      event.target.files[0];

    if (!file) return;

    try {

      await uploadProfileImage(file);

      await loadUser();

    } catch (err) {

      console.log(err);

    }

  };

  const loadStats = async () => {

    try {

      const [
        projects,
        issues,
        notifications
      ] = await Promise.all([
        api.get("/projects"),
        api.get("/issues"),
        api.get("/notifications")
      ]);

      const unread =
        notifications.data.data.filter(
          notification => Number(notification.is_read) === 0
        );

      setStats({
        projects: projects.data.data.length,
        issues: issues.data.data.length,
        notifications: unread.length
      });

    } catch (err) {

      console.log(err);

    }

  };

  if (!user) {

    return <h2>User not found</h2>;

  }
  
  return (

    <div>

      <h1
        className="
          heading-font
          text-3xl
          text-[#102C26]
          mb-8
        "
      >
        Profile
      </h1>

      <div
        className="
          bg-white
          rounded-xl
          shadow
          p-8
        "
      >

        <div className="flex items-center gap-6">

          <div className="relative">

            <div
              className="
                w-24
                h-24
                rounded-full
                overflow-hidden
                bg-[#102C26]
                flex
                items-center
                justify-center
              "
            >

              {user.profile_image ? (

                <img
                  src={`${import.meta.env.VITE_API_URL.replace("/api/v1", "")}/${user.profile_image}`}
                  alt="Profile"
                  className="
                    w-full
                    h-full
                    object-cover
                  "
                />

              ) : (

                <span
                  className="
                    text-white
                    text-4xl
                    font-bold
                  "
                >
                  {user.name.charAt(0).toUpperCase()}
                </span>

              )}

            </div>

            <button
              onClick={() =>
                fileInputRef.current.click()
              }
              className="
                absolute
                bottom-0
                right-0
                w-8
                h-8
                rounded-full
                bg-[#102C26]
                text-white
                shadow
                hover:bg-[#1b473f]
              "
            >
              📷
            </button>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleProfileImage}
            />

          </div>

          <div>

            <h2
              className="
                text-2xl
                font-bold
                text-[#102C26]
              "
            >
              {user.name}
            </h2>

            <p className="text-gray-500">
              {user.role}
            </p>

          </div>

        </div>

        <hr className="my-8" />

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <p className="mb-4">
              <strong>User ID:</strong> {user.id}
            </p>

            <p className="mb-4">
              <strong>Email:</strong> {user.email}
            </p>

            <p>
              <strong>Role:</strong> {user.role}
            </p>

          </div>

          <div>

            <p className="mb-4">
              <strong>Status:</strong>

              <span className="text-green-600 font-semibold">
                {" "}Active
              </span>

            </p>

            <p>
              <strong>Access:</strong>

              <span className="text-[#102C26]">
                {" "}Authenticated
              </span>

            </p>

          </div>

        </div>

      </div>

      <div
        className="
          grid
          md:grid-cols-3
          gap-6
          mt-8
        "
      >

        <div
          className="
            bg-white
            rounded-xl
            shadow
            p-6
            text-center
          "
        >
          <h3 className="text-gray-500">
            Projects
          </h3>

          <p
            className="
              text-4xl
              font-bold
              text-[#102C26]
              mt-2
            "
          >
            {stats.projects}
          </p>

        </div>

        <div
          className="
            bg-white
            rounded-xl
            shadow
            p-6
            text-center
          "
        >
          <h3 className="text-gray-500">
            Issues
          </h3>

          <p
            className="
              text-4xl
              font-bold
              text-[#102C26]
              mt-2
            "
          >
            {stats.issues}
          </p>

        </div>

        <div
          className="
            bg-white
            rounded-xl
            shadow
            p-6
            text-center
          "
        >
          <h3 className="text-gray-500">
            Unread Notifications
          </h3>

          <p
            className="
              text-4xl
              font-bold
              text-[#102C26]
              mt-2
            "
          >
            {stats.notifications}
          </p>

        </div>

      </div>

    </div>

  );

}
