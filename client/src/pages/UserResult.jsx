import { Sidebar } from "../components/SideBar";
import { UserResultDetails } from "../components/UserResultDetails";
import "./UserResult.css";

export const UserResult = () => {
  return (
    <>
      <div className="admin-portal">
        <Sidebar />
        <UserResultDetails />
      </div>
    </>
  );
};
