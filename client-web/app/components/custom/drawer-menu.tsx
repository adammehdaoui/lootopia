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
  NavigationMenuList
} from "@/components/ui/navigation-menu";

import { RxHamburgerMenu } from "react-icons/rx";

export default function DrawerMenu() {
  return (
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
  )
}