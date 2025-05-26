import { Sidebar } from "../components/SideBar";
import { UserDetails } from "../components/UserDetails";
import "./Admin.css";

export const AdminPortal = () => {
  return (
    <>
      <div className="admin-portal">
        <Sidebar />
        <UserDetails />
      </div>
    </>
  );
};
