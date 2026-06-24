export default function WelcomeBanner({ user }) {

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (

    <div className="
      bg-[#102C26]
      text-white
      rounded-2xl
      p-6
      mb-6
    ">

      <h2 className="text-3xl heading-font">
        {greeting}, {user?.name || "Developer"} 👋
      </h2>

      <p className="mt-2 opacity-80">
        Here's an overview of your workspace today.
      </p>

    </div>

  );
}