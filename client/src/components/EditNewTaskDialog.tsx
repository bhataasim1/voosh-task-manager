import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useTask } from "@/hooks/useTask";
import { Task } from "@/types/types";

interface EditNewTaskDialogProps {
  task: Task;
}

const EditNewTaskDialog: React.FC<EditNewTaskDialogProps> = ({ task }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const { updateTask } = useTask();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateTask(task.id, { title, description });
      setOpen(false);
    } catch (error) {
      console.error("Error updating task", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="text-white bg-blue-500 hover:bg-blue-800" onClick={() => setOpen(true)} >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit} className="mb-8">
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
              <DialogFooter>
                <Button
                  type="submit"
                  variant={"outline"}
                  className="m-2"
                  disabled={loading}
                >
                  Save
                </Button>
                <DialogClose>
                  <Button variant={"destructive"} className="m-2" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditNewTaskDialog;
