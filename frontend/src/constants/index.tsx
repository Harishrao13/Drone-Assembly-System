import DroneIcon from "@/assets/icons/drone.svg";
import MemberIcon from "@/assets/icons/member.svg";
import DashboardIcon from "@/assets/icons/dashboard.svg";

export type InstanceProps = {
    id: string;
    status: string;
    componentName: string;
    partName: string;
  }

export const navLinks = [
    {
        label: "Dashboard",
        route: "/dashboard",
        icon: DashboardIcon
    }, 
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
