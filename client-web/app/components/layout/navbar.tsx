import DrawerMenu from "@/components/custom/drawer-menu"
import Menu from "@/components/custom/menu"
import RewardMenu from "@/components/custom/reward-menu"
import { useTheme } from "@/hooks/use-theme"

export default function Navbar(props: NavbarProps) {
  const { connected } = props
  //const { theme, toggleTheme } = useTheme()

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between rounded-b-xl bg-royal px-8 py-4">
      <Menu />

      <div className="ml-5 mr-10 flex items-center space-x-5">
        <RewardMenu connected={connected} />
        <DrawerMenu connected={connected} />

        <button
          onClick={toggleTheme}
          className="rounded-lg bg-primary px-4 py-2 text-primary-foreground shadow-md transition"
        >
          {theme === "light" ? "🌙 Nuit" : theme === "dark" ? "🌸 Sakura" : "☀️ Jour"}
        </button>
      </div>
    </div>
  )
}

type NavbarProps = {
  connected: boolean
}
