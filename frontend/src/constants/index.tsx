import DroneIcon from "@/assets/icons/drone.svg";
import MemberIcon from "@/assets/icons/member.svg";
import AdminIcon from "@/assets/icons/admin.svg";

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
    {
        label: "Add New Admin",
        route: "/add-admin",
        icon: AdminIcon,
    },
];

export const productNames = (): Product[] => [
    {
        label: "TEJAS-M",
        code: "AX"
    },
    {
        label: "TEJAS-X",
        code: "AM"
    },
];

export const modelNames = (): Product[] => [
    {
        label: "Motor",
        code: "M",
    },
    {
        label: "Flight Controller",
        code: "FC",
    },
    {
        label: "Canopy",
        code: "CA",
    },
];
