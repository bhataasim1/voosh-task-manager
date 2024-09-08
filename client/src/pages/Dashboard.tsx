import AddNewTaskDialog from "@/components/AddNewTaskDialog";
import { TaskBoard } from "../components/TaskBoard";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-3 m-5">
      <div>
        <AddNewTaskDialog />
      </div>
      <TaskBoard />
    </div>
  );
};

export default Dashboard;
