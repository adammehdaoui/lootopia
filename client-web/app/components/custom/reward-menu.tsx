import AvatarHandler from "@/components/custom/avatar-handler"
import Logout from "@/components/custom/logout"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from "@/components/ui/navigation-menu"
import { useSession } from "@/contexts/auth-context"
import { useCrowns } from "@/contexts/crown-context"
import { Link } from "@remix-run/react"
import { Crown, Settings } from "lucide-react"

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
        {connected && (
          <NavigationMenuItem>
            <Link to="/admin">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-deep"
              >
                <Settings size={18} />
                <span className="ml-2 hidden lg:inline">Admin</span>
              </Button>
            </Link>
          </NavigationMenuItem>
        )}
        <NavigationMenuItem>
          {connected && <Logout className="hidden lg:flex" />}
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/profile" className="flex justify-end">
            <AvatarHandler />
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
