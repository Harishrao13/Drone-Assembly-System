import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DialogBoxProps {
  onItemAdded: () => void;
  defaultHolder: string;
  handleSubmit: (data: { [key: string]: string }) => void;
  itemName: string;
}

export function DialogBox({ defaultHolder, onItemAdded, handleSubmit, itemName }: DialogBoxProps) {
  const [formData, setFormData] = useState<{ [key: string]: string }>({ name: "", code: "", quantity: "" });
  const [open, setOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(formData);
    onItemAdded();
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="mt-4 flex flex-center bg-blue-800 hover:bg-blue-900 text-xl p-6 rounded-3xl">
            + Add New {itemName}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Add New {itemName}</DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder={defaultHolder}
                  className="col-span-3"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={itemName === "Part" ? "quantity" : "code"} className="text-right">
                  {itemName === "Part" ? "Quantity" : "Code"}
                </Label>
                <Input
                  id={itemName === "Part" ? "quantity" : "code"}
                  name={itemName === "Part" ? "quantity" : "code"}
                  placeholder={itemName === "Part" ? "6" : "X"}
                  type={itemName === "Part" ? "number" : "text"}
                  className="col-span-3"
                  value={itemName === "Part" ? formData.quantity : formData.code}
                  onChange={handleChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-blue-700 hover:bg-blue-800">
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
