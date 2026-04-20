import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import UserList from "../components/UserList";
import UserForm from "../components/UserForm";

const UserManagementPage: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <div className="flex flex-1">
          <UserList />
          <UserForm />
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;