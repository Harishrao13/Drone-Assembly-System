import DroneIcon from "@/assets/icons/drone.svg";
import MemberIcon from "@/assets/icons/member.svg";

export interface Product {
    label: string;
    code: string;
}

export const navLinks = [
    {
        label: "Add New Product",
        route: "/add-product",
        icon: DroneIcon,
    },
    {
        label: "Add New Member",
        route: "/add-member",
        icon: MemberIcon,
    },
   
];


