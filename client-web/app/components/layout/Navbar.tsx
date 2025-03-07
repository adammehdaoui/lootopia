import DrawerMenu from "@/components/custom/drawer-menu";
import Menu from "@/components/custom/menu";
import RewardMenu from "@/components/custom/reward-menu";

export default function Navbar() {
  return (
    <div className="sticky rounded-b-xl top-0 z-10 flex justify-between bg-royal px-8 py-4">
      <Menu />

      <div className="ml-5 mr-10 flex space-x-5">
        <RewardMenu />
        <DrawerMenu />
      </div>
    </div >
  )
}
