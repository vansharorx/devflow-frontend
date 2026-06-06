export default function UserSelect({
  users,
  value,
  onChange
}) {

  return (
    <select
      value={value || ""}
      onChange={onChange}
      className="
      border
      p-2
      rounded
    "
    >

      <option value="">
        Unassigned
      </option>

      {
        users.map(user => (

          <option
            key={user.id}
            value={user.id}
          >
            {user.name}
          </option>

        ))
      }

    </select>
  );
}