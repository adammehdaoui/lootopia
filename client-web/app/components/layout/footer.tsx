import { Facebook, Instagram, Twitter } from "lucide-react";
import { AiOutlineApple } from "react-icons/ai";
import { IoLogoGooglePlaystore } from "react-icons/io5";

export function Footer() {
  return (
    <div className="bg-[#142247] rounded-t-xl text-white p-8 md:p-16">
      <div className="flex flex-col md:flex-row gap-8 md:gap-24">
        <span className="flex flex-col gap-4">
          <p className="font-bold py-4">Réseaux sociaux</p>
          <a href="/" className="flex items-center gap-2 hover:scale-110">
            Facebook <Facebook size={20} />
          </a>
          <a href="/" className="flex items-center gap-2 hover:scale-110">
            Instagram <Instagram size={20} />
          </a>
          <a href="/" className="flex items-center gap-2 hover:scale-110">
            Twitter <Twitter size={20} />
          </a>
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
      <span className="flex flex-col md:flex-row items-center gap-6 pt-8">
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
