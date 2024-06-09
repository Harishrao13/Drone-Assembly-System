import { useState } from "react";
import { Button } from "@/components/ui/button";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DialogBoxProps {
  onItemAdded: () => void;
  defaultHolder: string;
  handleSubmit: (e: any) => void;
  ItemName: string;
}

export function DialogBox( {defaultHolder, onItemAdded, handleSubmit, ItemName} : DialogBoxProps) {
  const onSubmit = async (e: any) => {
    e.preventDefault();
    await handleSubmit({name: itemName, code: itemCode});
    onItemAdded();
    setOpen(false);
  }
  const [itemName, setItemName] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="mt-4 flex flex-center bg-blue-800 hover:bg-blue-900 text-xl p-6">
            + Add New
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Add New {ItemName}</DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder={defaultHolder}
                  className="col-span-3"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="code" className="text-right">
                  Code
                </Label>
                <Input
                  id="code"
                  placeholder="X"
                  className="col-span-3"
                  value={itemCode}
                  onChange={(e) => setItemCode(e.target.value)}
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
