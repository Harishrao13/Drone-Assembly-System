import DroneIcon from "@/assets/icons/drone.svg";
import MemberIcon from "@/assets/icons/member.svg";
import DashboardIcon from "@/assets/icons/dashboard.svg";

export type InstanceProps = {
    id: string;
    units: number;
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

export const InstanceTable: InstanceProps[] = [
    {
      id: "m5gr84i9",
      units: 2,
      status: `0/2`,
      componentName: "Motor",  
      partName: "Hobbywing X6Plus CW",
    },
    {
      id: "3u1reuv4",
      units: 3,
      status: "0/3",
      componentName: "Motor",  
      partName: "Hobbywing X6Plus CCW",
    },
    {
      id: "derv1ws0",
      units: 4,
      status: "0/4",
      componentName: "Motor",  
      partName: "HB Pressure Pump 5L",
    },
    {
      id: "5kma53ae",
      units: 2,
      status: "0/2",
      componentName: "Motor",  
      partName: "Ready to Sky RS 2306",
    },
    {
      id: "bhqecj4p",
      units: 1,
      status: "0/1",
      componentName: "Motor",  
      partName: "Tarrot",
    },
    {
      id: "bhqecj4p",
      units: 3,
      status: "0/3",
      componentName: "Flow Meter",
      partName: "CKG Star (White)",
    },
  ]
