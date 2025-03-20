import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from "@/components/ui/navigation-menu"
import { NavLink } from "@remix-run/react"

export default function Menu() {
  return (
    <NavigationMenu className="ml-3 lg:ml-10">
      <NavigationMenuList className="flex space-x-3">
        <NavigationMenuItem className="whitespace-nowrap">
          <NavLink to="/">
            <img src="/assets/logo.png" alt="Lootopia Logo" className="max-h-24 max-w-24" />
          </NavLink>
        </NavigationMenuItem>
        <div className="hidden space-x-3 lg:flex">
          <NavigationMenuItem>
            <Button asChild variant="navigation">
              <NavLink to="/hunts" viewTransition>
                Hunts
              </NavLink>
            </Button>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Button variant="navigation">Marketplace</Button>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Button variant="navigation">Leaderboard</Button>
          </NavigationMenuItem>
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
