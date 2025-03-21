import { Link } from "@remix-run/react"
import { AiOutlineApple } from "react-icons/ai"
import { IoLogoGooglePlaystore } from "react-icons/io5"
import { LuFacebook, LuInstagram, LuTwitter } from "react-icons/lu"

export default function Footer() {
  return (
    <div className="flex flex-col rounded-t-xl bg-royal p-8 text-white md:p-16">
      <div className="flex justify-center gap-8 md:flex-row md:gap-24">
        <span className="flex flex-col gap-4">
          <p className="py-4 font-bold">Social networks</p>
          <Link
            to="/"
            className="flex cursor-pointer items-center gap-2 duration-300 hover:scale-110"
          >
            Facebook <LuFacebook />
          </Link>
          <Link
            to="/"
            className="flex cursor-pointer items-center gap-2 duration-300 hover:scale-110"
          >
            Twitter <LuTwitter />
          </Link>
          <Link
            to="/"
            className="flex cursor-pointer items-center gap-2 duration-300 hover:scale-110"
          >
            Instagram <LuInstagram />
          </Link>
        </span>
        <span className="flex flex-col gap-4">
          <p className="py-4 font-bold">Download app</p>
          <a
            href="/"
            className="flex cursor-pointer items-center gap-2 duration-300 hover:scale-110"
          >
            Apple Store <AiOutlineApple size={25} />
          </a>
          <a
            href="/"
            className="flex cursor-pointer items-center gap-2 duration-300 hover:scale-110"
          >
            Play Store <IoLogoGooglePlaystore size={20} />
          </a>
        </span>
        <span className="flex flex-col gap-4">
          <p className="py-4 font-bold">How to ?</p>
          <a href="/" className="cursor-pointer duration-300 hover:scale-110">
            Answers
          </a>
          <a href="/" className="cursor-pointer duration-300 hover:scale-110">
            Guides
          </a>
          <a href="/" className="cursor-pointer duration-300 hover:scale-110">
            Reviews
          </a>
        </span>
      </div>
      <span className="flex items-center justify-center gap-6 pt-8 md:flex-row">
        <p className="text-center font-semibold md:text-left">
          © 2025 Lootopia, Inc. All rights reserved.
        </p>
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="cursor-pointer hover:underline">
            Contact
          </a>
          <p>·</p>

          <a href="/" className="cursor-pointer hover:underline">
            Privacy Policy
          </a>
          <p>·</p>

          <a href="/" className="cursor-pointer hover:underline">
            Legal Notice
          </a>
        </div>
      </span>
    </div>
  )
}
