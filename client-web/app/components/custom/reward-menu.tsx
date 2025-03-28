import Logout from "@/components/custom/logout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from "@/components/ui/navigation-menu"
import { Link } from "@remix-run/react"
import { Crown } from "lucide-react"

export default function RewardMenu(props: RewardMenuProps) {
  const { connected } = props

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
          {connected && <Logout className="hidden lg:flex" />}
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to={"/login"} className="flex justify-end">
            <Avatar>
              <AvatarImage src="/assets/fallback.jpg" />
              <AvatarFallback>LOO</AvatarFallback>
            </Avatar>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

type RewardMenuProps = {
  connected: boolean
}
