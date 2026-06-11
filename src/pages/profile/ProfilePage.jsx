import {
  useEffect,
  useState
} from "react";

import api from "../../services/api";

export default function ProfilePage() {

  const [user,
    setUser] =
      useState(null);

  useEffect(() => {

    fetchProfile();

  }, []);

  const fetchProfile =
    async () => {

    try {

      const res =
        await api.get(
          "/users"
        );

      setUser(
        res.data.data[0]
      );

    } catch (err) {

      console.log(err);
    }
  };

  if (!user) {

    return (
      <h2>
        Loading...
      </h2>
    );
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
        Profile
      </h1>

      <div
        className="
        bg-white
        rounded-xl
        shadow
        p-6
      "
      >

        <p>
          <strong>Name:</strong>
          {" "}
          {user.name}
        </p>

        <p className="mt-3">
          <strong>Email:</strong>
          {" "}
          {user.email}
        </p>

      </div>

    </div>
  );
}