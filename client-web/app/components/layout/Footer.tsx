import { Link } from "@remix-run/react";
import { AiOutlineApple } from "react-icons/ai";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { LuFacebook, LuInstagram, LuTwitter } from "react-icons/lu";

export function Footer() {
  return (
    <div className="flex flex-col bg-[#142247] rounded-t-xl text-white p-8 md:p-16">
      <div className="flex justify-center  md:flex-row gap-8 md:gap-24">
        <span className="flex flex-col gap-4">
          <p className="font-bold py-4">Réseaux sociaux</p>
          <Link to="/" className="flex items-center gap-2 hover:scale-110 duration-300">
            Facebook <LuFacebook />
          </Link>
          <Link to="/" className="flex items-center gap-2 hover:scale-110 duration-300">
            Twitter <LuTwitter />
          </Link>
          <Link to="/" className="flex items-center gap-2 hover:scale-110 duration-300">
            Instagram <LuInstagram />
          </Link>
        </span>
        <span className="flex flex-col gap-4">
          <p className="font-bold py-4">Download app</p>
          <a href="/" className="flex items-center gap-2 hover:scale-110">
            Apple Store <AiOutlineApple size={25} />
          </a>
          <a href="/" className="flex items-center gap-2 hover:scale-110">
            Play Store <IoLogoGooglePlaystore size={20} />
          </a>
        </span>
        <span className="flex flex-col gap-4">
          <p className="font-bold py-4">Comment ça marche ?</p>
          <a href="/" className="hover:underline">
            FAQ
          </a>
          <a href="/" className="hover:underline">
            Guide d&apos;utilisation
          </a>
          <a href="/" className="hover:underline">
            Avis des utilisateurs
          </a>
        </span>
      </div>
      <span className="flex justify-center md:flex-row items-cente  r gap-6 pt-8">
        <p className="font-semibold text-center md:text-left">
          © 2025 Lootopia, Inc. Tous droits réservés
        </p>
        <div className="flex gap-2 justify-center md:justify-start">
          <a href="/" className="hover:underline">
            Contact
          </a>
          <p>·</p>

          <a href="/" className="hover:underline">
            Privacy Policy
          </a>
          <p>·</p>

          <a href="/" className="hover:underline">
            Legal Notice
          </a>
        </div>
      </span>
    </div>
  );
}
