import { Link, useLocation } from "@remix-run/react"
import { Button } from "@/components/ui/button"
import { Home, Users, MapPin, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AdminNavbar() {
  const location = useLocation()

  const navItems = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: Home
    },
    {
      href: "/admin/users",
      label: "Users",
      icon: Users
    },
    {
      href: "/admin/hunts",
      label: "Hunts",
      icon: MapPin
    }
  ]

  return (
    <nav className="border-b border-gray-200 bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/admin" className="flex items-center space-x-2">
            <img src="/assets/logo.png" alt="Lootopia Logo" className="h-8 w-8" />
            <span className="text-xl font-bold text-gray-900">Lootopia Admin</span>
          </Link>

          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <Link key={item.href} to={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "flex items-center space-x-2 text-gray-600 hover:text-gray-900",
                      isActive && "bg-gray-100 text-gray-900"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/">
            <Button variant="outline" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Site</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
