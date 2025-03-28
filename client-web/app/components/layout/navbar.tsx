import DrawerMenu from "@/components/custom/drawer-menu"
import Menu from "@/components/custom/menu"
import RewardMenu from "@/components/custom/reward-menu"

export default function Navbar(props: NavbarProps) {
  const { connected } = props

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between rounded-b-xl bg-royal px-8 py-4">
      <Menu />

      <div className="ml-5 mr-10 flex space-x-5">
        <RewardMenu connected={connected} />
        <DrawerMenu connected={connected} />
      </div>
    </div>
  )
}

type NavbarProps = {
  connected: boolean
}
