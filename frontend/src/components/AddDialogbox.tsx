import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
//   DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function DialogBox(props: any) {
    const {} = props
  return (
    <div>
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-4 flex flex-center bg-blue-800 hover:bg-blue-900 text-xl p-6 ">+ Add New</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Tejas-U"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Code
            </Label>
            <Input
              id="username"
              placeholder="X"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="bg-blue-700 hover:bg-blue-800">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>
  )
}
