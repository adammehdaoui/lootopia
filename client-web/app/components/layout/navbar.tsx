import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu"
import { Crown } from "lucide-react"
import { GiTreasureMap } from "react-icons/gi"

export default function Navbar() {
  return (
    <div className="sticky top-0 z-10 flex justify-between rounded-b-xl bg-royal px-8 py-4">
      <NavigationMenu className="ml-10">
        <NavigationMenuList className="flex space-x-3">
          <NavigationMenuItem>
            <img src="/assets/logo.png" alt="Lootopia Logo" className="m-2 h-28 w-auto" />
          </NavigationMenuItem>
          <NavigationMenuItem className="hidden md:flex">
            <Button variant="navigation">Hunts list</Button>
          </NavigationMenuItem>
          <NavigationMenuItem className="hidden md:flex">
            <Button variant="navigation">Marketplace</Button>
          </NavigationMenuItem>
          <NavigationMenuItem className="hidden md:flex">
            <Button variant="navigation">Leaderboard</Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="mr-10 flex space-x-5">
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

        <NavigationMenu className="flex md:hidden">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="p-5">
                <GiTreasureMap size={24} />
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">Hunts list</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Treasure hunts and hidden rewards.
                    </p>
                  </a>
                </NavigationMenuLink>

                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">Marketplace</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Buy and sell products easily
                    </p>
                  </a>
                </NavigationMenuLink>

                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">Leaderboard</div>
                    <p className="text-sm leading-tight text-muted-foreground">Top user rankings</p>
                  </a>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  )
}
