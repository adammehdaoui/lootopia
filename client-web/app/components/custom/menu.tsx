import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from "@/components/ui/navigation-menu"
import { Link } from "@remix-run/react"

export default function Menu() {
  return (
    <NavigationMenu className="ml-3 lg:ml-10">
      <NavigationMenuList className="flex space-x-3">
        <NavigationMenuItem className="whitespace-nowrap pr-5">
          <Link to={"/"}>
            <h1 className="font-biorhyme text-2xl font-bold text-white">Lootopia</h1>
          </Link>
        </NavigationMenuItem>
        <div className="hidden space-x-3 lg:flex">
          <NavigationMenuItem>
            <Button variant="navigation">Hunts list</Button>
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
