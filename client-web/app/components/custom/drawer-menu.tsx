import Logout from "@/components/custom/logout"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer"
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu"
import { useSession } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { Link } from "@remix-run/react"
import { FaHome } from "react-icons/fa"
import { RxHamburgerMenu } from "react-icons/rx"

export default function DrawerMenu() {
  const { connected } = useSession()
  const { toast } = useToast()

  const handleClickOnWIP = () => {
    toast({
      title: "Work in progress",
      description: "This feature is not available yet.",
      variant: "default"
    })
  }

  return (
    <NavigationMenu className="flex lg:hidden">
      <NavigationMenuList>
        <Drawer>
          <DrawerTrigger className="text-white">
            <RxHamburgerMenu className="h-6 w-6 text-white duration-300 hover:text-slate-500" />
          </DrawerTrigger>
          <DrawerContent className="flex w-full flex-col items-center justify-center">
            <DrawerHeader className="mt-3 flex flex-col items-center justify-center">
              <DrawerTitle>Menu</DrawerTitle>
              <DrawerDescription>All you can do on the app</DrawerDescription>
            </DrawerHeader>
            <div className="flex flex-col">
              <Button variant="drawer" asChild>
                <Link to="/" viewTransition>
                  <FaHome />
                </Link>
              </Button>
              <Button variant="drawer" asChild>
                <Link to="/hunts" viewTransition>
                  Popular hunts
                </Link>
              </Button>
              <Button variant="drawer" onClick={handleClickOnWIP}>
                Marketplace
              </Button>
              <Button variant="drawer" onClick={handleClickOnWIP}>
                Leaderboard
              </Button>
              {connected && (
                <Button variant="drawer" asChild>
                  <Logout />
                </Button>
              )}
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
