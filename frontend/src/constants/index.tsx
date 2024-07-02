import DroneIcon from "@/assets/icons/drone.svg";
import MemberIcon from "@/assets/icons/member.svg";

export type InstanceProps = {
    id: string;
    status: string;
    componentName: string;
    partName: string;
  }

export const navLinks = [
    {
        label: "New Product",
        route: "/add-product",
        icon: DroneIcon,
    },
    {
        label: "Add Employee",
        route: "/add-employee",
        icon: MemberIcon,
    },
   
];
