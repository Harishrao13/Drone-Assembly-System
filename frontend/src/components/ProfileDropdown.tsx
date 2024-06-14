import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import Profile from '@/assets/icons/profile.svg'

const ProfileDropdown = () => {
  return (
    <div className="cursor-pointer absolute top-4 right-4"><DropdownMenu>
    <DropdownMenuTrigger>
     <img src={Profile} width={40}/>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Change Password</DropdownMenuItem>
      <DropdownMenuItem className="bg-red-600 text-white">Logout</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
    </div>
  )
}

export default ProfileDropdown;