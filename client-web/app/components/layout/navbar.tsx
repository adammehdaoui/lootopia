import DrawerMenu from "@/components/custom/drawer-menu"
import Menu from "@/components/custom/menu"
import RewardMenu from "@/components/custom/reward-menu"
import { Link } from "@remix-run/react"
import { FaUser } from "react-icons/fa"

export default function Navbar() {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between rounded-b-xl bg-royal px-8 py-4">
      <Menu />

      <div className="ml-5 mr-10 flex space-x-5">
        <RewardMenu />
        <DrawerMenu />
      </div>
      <Link to={"/register"} className="flex justify-end">
        <FaUser className="h-6 w-6 text-white duration-300 hover:text-slate-500" />
      </Link>
    </div>
  )
}
