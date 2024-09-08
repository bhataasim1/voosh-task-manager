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
import { useState } from "react";
import { useTask } from "@/hooks/useTask";
import { Task } from "@/types/types";

interface EditNewTaskDialogProps {
  task: Task;
}

const EditNewTaskDialog = ({ task }: EditNewTaskDialogProps) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const { updateTask } = useTask();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await updateTask(task.id, { title, description });
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error creating task", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="text-white bg-blue-500 hover:bg-blue-800">
          Edit
        </Button>
      </DialogTrigger>
      <form onSubmit={handleSubmit} className="mb-8">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
                className="w-full px-3 py-2 border rounded mb-2"
                required
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task description"
                className="w-full px-3 py-2 border rounded mb-2"
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button
                variant={"outline"}
                className="m-2"
                onClick={() => handleSubmit()}
                disabled={loading}
              >
                Save
              </Button>
              <Button variant={"destructive"} className="m-2">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default EditNewTaskDialog;
