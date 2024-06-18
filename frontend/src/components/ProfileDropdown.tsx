import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Profile from '@/assets/icons/profile.svg'
import { useState, useEffect } from 'react';


const ProfileDropdown = () => {
 const [isMobile, setIsMobile] = useState(window.innerWidth <= 815);
 
   useEffect(() => {
     const handleResize = () => {
       setIsMobile(window.innerWidth <= 815);
     };
 
     window.addEventListener('resize', handleResize);
 
     return () => window.removeEventListener('resize', handleResize);
   }, []);
 return (
   <div className={`cursor-pointer ${!isMobile ? 'absolute top-4 right-4' : 'relative' }`}>
     <DropdownMenu>
   <DropdownMenuTrigger>
    <img src={Profile} width={40}/>
   </DropdownMenuTrigger>
   <DropdownMenuContent className="cursor-pointer">
     <DropdownMenuLabel>My Account</DropdownMenuLabel>
     <DropdownMenuSeparator />
     <DropdownMenuItem>Profile</DropdownMenuItem>
     <DropdownMenuItem>Change Password</DropdownMenuItem>
     <DropdownMenuItem className="text-red-600 hover:text-white font-bold ">Logout</DropdownMenuItem>
   </DropdownMenuContent>
 </DropdownMenu>
   </div>
 )
}

export default ProfileDropdown;