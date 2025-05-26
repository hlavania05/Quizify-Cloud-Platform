import { QuizDetails } from "../components/QuizDetails";
import { Sidebar } from "../components/SideBar";

export const Manage_Quizzes = () => {
  return (
    <div className="admin-portal">
      <Sidebar />
      <QuizDetails />
    </div>
  );
};
