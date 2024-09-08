import AddNewTaskDialog from "@/components/AddNewTaskDialog";
import { TaskBoard } from "../components/TaskBoard";
import { DndContext } from "@dnd-kit/core";
import SortFilter from "@/components/common/SortFilter";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4 m-6">
      <div className="mb-4">
        <AddNewTaskDialog />
      </div>

      <div className="border rounded-lg p-4 bg-white shadow-md flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label htmlFor="search" className="font-semibold text-gray-700">
            Search:
          </label>
          <input
            placeholder="Search tasks"
            id="search"
            className="border border-blue-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="font-semibold text-gray-700">
            Sort By:
          </label>
          <SortFilter />
        </div>
      </div>

      <DndContext>
        <TaskBoard />
      </DndContext>
    </div>
  );
};

export default Dashboard;
