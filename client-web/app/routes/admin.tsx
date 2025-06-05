import { Outlet } from "@remix-run/react"
import AdminNavbar from "@/components/layout/admin-navbar"

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <main className="container mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  )
}
