import {
    BarChart3,
    UserCog,
    LayoutGrid,
    Settings,
} from "lucide-react";
import { NavigationItemsTypes } from "./types";


export const navigationItems: NavigationItemsTypes[] = [
    { id: 0, icon: <BarChart3 className="w-5 h-5 text-gray-500" />, label: "Overview", active: true },
    { id: 1, icon: <UserCog className="w-5 h-5 text-gray-500" />, label: "Admins", active: false },
    { id: 2, icon: <LayoutGrid className="w-5 h-5 text-gray-500" />, label: "Match's", active: false },
    // { id: 3, icon: <CreditCard className="w-5 h-5 text-gray-500" />, label: "Payments", active: false },
    { id: 3, icon: <Settings className="w-5 h-5 text-gray-500" />, label: "Settings", active: false },
  ];