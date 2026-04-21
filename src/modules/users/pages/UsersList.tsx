import UserList from "../components/UserList";
import UserForm from "../components/UserForm";

const UsersListPage: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">

      <div className="flex-1 flex flex-col">

        <div className="flex flex-1">
          <UserList />
          <UserForm />
        </div>
      </div>
    </div>
  );
};

export default UsersListPage;