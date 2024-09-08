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

const AddNewTaskDialog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { createTask } = useTask();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await createTask({ title, description, status: "TODO" });
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
        <Button className="text-white bg-blue-500 border rounded-md px-4 py-2 hover:bg-blue-800">
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg mx-auto p-4">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
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
              Add Task
            </Button>
            <Button variant={"destructive"} className="m-2">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewTaskDialog;
