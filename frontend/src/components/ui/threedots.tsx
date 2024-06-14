import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from "./button";

const ThreeDots = () => {
  return (
    <div className="cursor-pointer absolute top-4 right-4"><DropdownMenu>
    <DropdownMenuTrigger>
    <Button> ... </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
           <DropdownMenuSeparator />
           <DropdownMenuItem>Edit</DropdownMenuItem>
           <DropdownMenuItem className="bg-red-600 text-white">Delete</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
    </div>
  )
}

export default ThreeDots;