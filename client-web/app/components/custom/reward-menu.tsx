import Logout from "@/components/custom/logout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from "@/components/ui/navigation-menu"
import { useSession } from "@/contexts/auth-context"
import { useCrowns } from "@/contexts/crown-context"
import { Link } from "@remix-run/react"
import { Crown } from "lucide-react"

export default function RewardMenu() {
  const { connected } = useSession()
  const { crownBalance } = useCrowns()

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex space-x-5">
        <NavigationMenuItem>
          <Link to="/crown">
            <Button variant="crown">
              <Crown size={30} />
              <span>{crownBalance} | +</span>
            </Button>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          {connected && <Logout className="hidden lg:flex" />}
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/login" className="flex justify-end">
            <Avatar className="cursor-pointer">
              <AvatarImage src="/assets/fallback.png" />
              <AvatarFallback>LOO</AvatarFallback>
            </Avatar>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
