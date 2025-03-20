import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from "@/components/ui/navigation-menu"
import { Crown } from "lucide-react"
import { Link } from "@remix-run/react"
import { FaUser } from "react-icons/fa"

export default function RewardMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Button variant="crown">
            <Crown size={30} />
            <span>999 | +</span>
          </Button>
        </NavigationMenuItem>
        <Link to={"/login"} className="flex justify-end">
          <FaUser className="ml-4 h-6 w-6 text-white duration-300 hover:text-slate-500" />
        </Link>

        <NavigationMenuItem></NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
