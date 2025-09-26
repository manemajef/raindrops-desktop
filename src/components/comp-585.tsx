import { useId } from "react";
import {
  HashIcon,
  HouseIcon,
  MailIcon,
  SearchIcon,
  UsersRound,
} from "lucide-react";

import Logo from "@/components/navbar-components/logo";
import NotificationMenu from "@/components/navbar-components/notification-menu";
import UserMenu from "@/components/navbar-components/user-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import AppBreadcrumbs from "./app-breadcrumbs";

import ThemeToggle from "./theme-toggle";

const teams = ["Acme Inc.", "Origin UI", "Junon"];

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "#", label: "Home", icon: HouseIcon },
  { href: "#", label: "Hash", icon: HashIcon },
  { href: "#", label: "Groups", icon: UsersRound },
];

export default function Navbar({ trigger }: { trigger?: React.ReactNode }) {
  const id = useId();

  return (
    <header className="border-b px-4 md:px-6">
      <div className="flex h-12 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex flex-1 items-center gap-4">
          {/* Mobile menu trigger */}
          {trigger}
          <AppBreadcrumbs />

          {/* <UserMenu /> */}
        </div>
        <div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
