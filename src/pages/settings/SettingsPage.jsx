import SecurityCard from "../../components/settings/SecurityCard";
import AppearanceCard from "../../components/settings/AppearanceCard";

export default function SettingsPage() {

  return (

    <div>

      <h1
        className="
          heading-font
          text-4xl
          text-[#102C26]
          mb-2
        "
      >
        Settings
      </h1>

      <p
        className="
          text-gray-500
          mb-8
        "
      >
        Manage your application preferences.
      </p>

      <div className="space-y-8">

        <SecurityCard />

        <AppearanceCard />

      </div>

    </div>

  );

}