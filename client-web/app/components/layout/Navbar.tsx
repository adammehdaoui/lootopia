import { Link } from "@remix-run/react";
import { useState } from "react";
import { Crown, User, Menu } from "lucide-react";
import { Button } from "../ui/button";

export function Navbar() {
  const [nbCrowns, setNbCrowns] = useState(999);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const [userLoggedIn, setUserLoggedIn] = useState(true);

  const handleLogout = () => {
    setUserLoggedIn(false);
  };

  return (
    <div className="bg-[#142247] sticky top-0 flex items-center justify-between px-8 py-4 rounded-b-xl">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center">
          <img
            src="/assets/logo.png"
            alt="Lootopia Logo"
            className="h-28 md:h-28 m-2 w-auto"
          />
        </Link>
        <div className="hidden lg:flex justify-center items-center gap-4 md:gap-2 lg:gap-8">
          <Button>Hunts list</Button>
          <Button>Marketplace</Button>
          <Button>Leaderboard</Button>
        </div>
      </div>
      <div className="flex gap-6 md:gap-10 justify-center items-center">
        <Button variant="crown">
          <Crown size={24} />
          <p>{nbCrowns}</p>
          <p>|</p>
          <p>+</p>
        </Button>
        <User
          className="text-white hover:text-gray-500 duration-300 cursor-pointer"
          size={28}
          onClick={() => {
            setUserMenuOpen(!userMenuOpen);
          }}
        />
        <button
          className="lg:hidden text-white"
          onClick={() => {
            setMenuOpen(!menuOpen);
            setUserMenuOpen(false);
          }}
        >
          <Menu
            className="text-white hover:text-gray-500 duration-300 cursor-pointer "
            size={32}
          />
        </button>
      </div>
      {menuOpen && (
        <div className="absolute top-full right-0 bg-[#142247] flex flex-col items-center py-4 md:block">
          <Button variant="noscale">Hunts list</Button>
          <Button variant="noscale">Marketplace</Button>
          <Button variant="noscale">Leaderboard</Button>
        </div>
      )}

      {userMenuOpen && (
        <div className="absolute top-full right-0 bg-[#142247] flex flex-col items-center p-8 border-2 border-white rounded-xl ">
          {userLoggedIn ? (
            <>
              <a href="/" className="text-white hover:underline py-2">
                Test
              </a>
              <a href="/" className="text-white hover:underline py-2">
                Test
              </a>
              <Button variant="noscale" onClick={handleLogout}>
                Log Out
              </Button>
            </>
          ) : (
            <>
              <button className="text-white bg-[#142247] py-2 px-4 border-2 rounded-full mt-2 hover:bg-white hover:text-[#142247] transition duration-300">
                Sign In
              </button>
              <button className="text-white bg-[#142247] py-2 px-4 border-2 rounded-full mt-2 hover:bg-white hover:text-[#142247] transition duration-300">
                Sign Up
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
