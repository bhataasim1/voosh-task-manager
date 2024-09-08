import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { Task } from "@/types/types";

interface ViewDetailsTaskDialogProps {
  task: Task;
}

const ViewDetailsTaskDialog = ({ task }: ViewDetailsTaskDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="text-white bg-blue-500 hover:bg-blue-800">
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg mx-auto p-4">
        <DialogHeader>
          <DialogTitle>Task Details</DialogTitle>
          <DialogDescription>
            <h2 className="font-bold text-2xl mt-2">{task.title}</h2>
            <p className="mt-2 text-gray-500">{task.description}</p>
            <p className="mt-2 text-gray-500">{task.createdAt}</p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"destructive"} className="m-2">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewDetailsTaskDialog;
