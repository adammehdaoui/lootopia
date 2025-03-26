import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from "@/components/ui/navigation-menu"
import { AvatarFallback } from "@radix-ui/react-avatar"
import { Link } from "@remix-run/react"
import { Crown } from "lucide-react"

export default function RewardMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex space-x-5">
        <NavigationMenuItem>
          <Button variant="crown">
            <Crown size={30} />
            <span>999 | +</span>
          </Button>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to={"/login"} className="flex justify-end">
            <Avatar>
              <AvatarImage src="/public/assets/fallback.jpg" />
              <AvatarFallback>LOO</AvatarFallback>
            </Avatar>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
