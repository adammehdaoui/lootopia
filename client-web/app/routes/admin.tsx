import { requireAuth } from "@/services/auth.server"
import { json, redirect, type LoaderFunction } from "@remix-run/node"

export const loader: LoaderFunction = async (args) => {
  try {
    await requireAuth(args) // Passe directement l'objet args
    return json({})
  } catch {
    return redirect("/login")
  }
}

export default function AdminPage() {
  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <p>Bienvenue dans admin 🚀</p>
    </div>
  )
}
