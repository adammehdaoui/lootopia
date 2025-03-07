import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from "@/components/ui/navigation-menu";
import { Crown } from "lucide-react";

import { RxHamburgerMenu } from "react-icons/rx";



export default function Navbar() {
  return (
    <div className="sticky top-0 z-10 flex justify-between rounded-b-xl bg-royal px-8 py-4">
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

      <div className="ml-5 mr-10 flex space-x-5">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Button variant="crown">
                <Crown size={30} />
                <span>999 | +</span>
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <NavigationMenu className="flex lg:hidden">
          <NavigationMenuList>
            <Drawer>
              <DrawerTrigger className="text-white"><RxHamburgerMenu />
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Menu</DrawerTitle>
                  <DrawerDescription>All you can do on the app</DrawerDescription>
                </DrawerHeader>
                <div className="flex flex-col">
                  <Button variant="drawer">Hunts List</Button>
                  <Button variant="drawer">Marketplace</Button>
                  <Button variant="drawer">Leaderboard</Button>
                </div>
                <DrawerFooter>
                  <DrawerClose>
                    <Button variant="navigation">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div >
  )
}
