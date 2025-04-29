import {
  BarChart3,
  CreditCard,
  LayoutGrid,
  MessageCircle,
  Settings,
  Trophy,
} from "lucide-react";
import { NavigationItemsTypes } from "./types";
import { BiPhotoAlbum } from "react-icons/bi";

export const navigationItems: NavigationItemsTypes[] = [
  {
    id: 0,
    icon: <BarChart3 className="w-5 h-5 text-gray-500" />,
    label: "Overview",
    active: true,
  },
  // { id: 1, icon: <UserCog className="w-5 h-5 text-gray-500" />, label: "Admins", active: false },
  {
    id: 2,
    icon: <LayoutGrid className="w-5 h-5 text-gray-500" />,
    label: "Match's",
    active: false,
  },
  {
    id: 3,
    icon: <MessageCircle className="w-5 h-5 text-gray-500" />,
    label: "Messages",
    active: false,
  },
  {
    id: 4,
    icon: <BiPhotoAlbum className="w-5 h-5 text-gray-500" />,
    label: "Gallery",
    active: false,
  },
  {
    id: 6,
    icon: <Trophy className="w-5 h-5 text-gray-500" />,
    label: "Player of the Month",
    active: false,
  },
  {
    id: 5,
    icon: <CreditCard className="w-5 h-5 text-gray-500" />,
    label: "Payments",
    active: false,
  },
  {
    id: 7,
    icon: <Settings className="w-5 h-5 text-gray-500" />,
    label: "Settings",
    active: false,
  },
];
