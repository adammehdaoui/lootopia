import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from "@/components/ui/navigation-menu"
import { useToast } from "@/hooks/use-toast"
import { NavLink } from "@remix-run/react"

export default function Menu() {
  const { toast } = useToast()

  const handleClickOnWIP = () => {
    toast({
      title: "Work in progress",
      description: "This feature is not available yet.",
      variant: "default"
    })
  }

  return (
    <NavigationMenu className="ml-3 lg:ml-10">
      <NavigationMenuList className="flex space-x-10">
        <NavigationMenuItem className="whitespace-nowrap">
          <NavLink to="/" className="cursor-pointer">
            <img src="/assets/logo.png" alt="Lootopia Logo" className="max-h-24 max-w-24" />
          </NavLink>
        </NavigationMenuItem>
        <div className="hidden space-x-3 lg:flex">
          <NavigationMenuItem>
            <Button asChild variant="navigation">
              <NavLink to="/hunts" viewTransition>
                Popular hunts
              </NavLink>
            </Button>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Button asChild variant="navigation" onClick={handleClickOnWIP}>
              <NavLink to="/" viewTransition>
                Marketplace
              </NavLink>
            </Button>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Button asChild variant="navigation" onClick={handleClickOnWIP}>
              <NavLink to="/" viewTransition>
                Leaderboard
              </NavLink>
            </Button>
          </NavigationMenuItem>
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
