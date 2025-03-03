import { Facebook, Instagram, Twitter } from "lucide-react";
import { AiOutlineApple } from "react-icons/ai";
import { IoLogoGooglePlaystore } from "react-icons/io5";

export function Footer() {
  return (
    <div className="bg-[#142247]  rounded-t-xl text-white p-16 ">
      <div className="flex gap-96">
        <span className="flex flex-col gap-1">
          <p className="font-bold py-4">Reseaux sociaux</p>
          <a href="/" className="flex items-center gap-2 hover:scale-110">
            Facebook <Facebook size={20} />
          </a>
          <a href="/" className="flex items-center gap-2 hover:scale-110">
            Instagram <Instagram size={20} />{" "}
          </a>
          <a href="/" className="flex items-center gap-2 hover:scale-110">
            Twitter <Twitter size={20} />
          </a>
        </span>
        <span className="flex flex-col gap-1">
          <p className="font-bold py-4">Download app</p>
          <a href="/" className="flex items-center gap-2 hover:scale-110">
            Apple Store <AiOutlineApple size={25} />
          </a>
          <a href="/" className="flex items-center gap-2 hover:scale-110">
            Play Store <IoLogoGooglePlaystore size={20} />
          </a>
        </span>
        <span className="flex flex-col gap-1">
          <p className="font-bold py-4">Commment ca marche ?</p>
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
      <span className="flex items-center gap-6 pt-8">
        <p className="font-semibold">
          © 2025 Lootopia, Inc. Tous droits réservés
        </p>
        <p>·</p>
        <a href="/" className="hover:underline">
          FAQ
        </a>
        <p>·</p>

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
      </span>
    </div>
  );
}
