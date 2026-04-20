import UserListItem from "./UserListItem";

const UserList = () => {
    const users = [
    { name: "NewTest User", email: "abc@test.de" },
    { name: "John Doe", email: "user1045349719845361309@example.com" },
    { name: "John Doe", email: "user1065247109813233401@example.com" },
    { name: "John Doe", email: "user106974850521749571@example.com" },
  ];

  return (
    <div className="w-1/3 bg-white border-r p-4">
      <input
        placeholder="Search..."
        className="w-full mb-4 p-2 border rounded"
      />

      <div className="space-y-3">
        {users.map((user, i) => (
          <UserListItem key={i} user={user} />
        ))}
      </div>
    </div>
  ); 
}
 
export default UserList;