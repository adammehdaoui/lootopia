import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from "@/components/ui/navigation-menu";

export default function Menu() {
  return (
    <NavigationMenu className="ml-3 lg:ml-10">
      <NavigationMenuList className="flex space-x-3">
        <NavigationMenuItem className="whitespace-nowrap">
          <img src="/assets/logo.png" alt="Lootopia Logo" className="max-w-24 max-h-24" />
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden lg:flex">
          <Button variant="navigation">Hunts list</Button>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden lg:flex">
          <Button variant="navigation">Marketplace</Button>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden lg:flex">
          <Button variant="navigation">Leaderboard</Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}