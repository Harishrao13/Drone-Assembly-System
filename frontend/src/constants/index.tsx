import DroneIcon from '@/assets/icons/drone.svg';
import MemberIcon from '@/assets/icons/member.svg';
import AdminIcon from '@/assets/icons/admin.svg'

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
