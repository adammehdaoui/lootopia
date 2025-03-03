import { Link } from "@remix-run/react";
import { Button } from "../Button";
import { useState } from "react";
import { Crown, User } from "lucide-react";

export function Navbar() {
  const [nbCrowns, setNbCrowns] = useState(999);
  return (
    <div className="bg-[#142247] sticky  top-0 flex items-center justify-between px-8 rounded-b-xl ">
      <div className="flex gap-4">
        <Link to="/" className="flex items-center">
          <img
            src="/assets/logo.webp"
            alt="Lootopia Logo"
            className="h-20 m-4 w-auto"
          />
        </Link>
        <div className="flex justify-center items-center gap-8">
          <Button text="Hunts list" />
          <Button text="Marketplace" />
          <Button text="Leaderboard" />
        </div>{" "}
      </div>
      <div className="flex gap-10 justify-center items-center">
        {" "}
        <button className="flex h-10 px-4 text-white border-4 rounded-full items-center gap-2 hover:text-[#142247] hover:bg-white hover:font-semibold">
          <Crown size={28} />
          <p>{nbCrowns}</p>
          <p>|</p>
          <p>+</p>
        </button>
        <User
          className="text-white hover:scale-125 duration-300 cursor-pointer"
          size={32}
        />
      </div>
    </div>
  );
}
