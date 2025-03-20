import type { LinksFunction } from "@remix-run/node"
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react"

import { ErrorHandler } from "@/components/custom/error"
import Footer from "@/components/layout/footer"
import Navbar from "@/components/layout/navbar"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React, { useState } from "react"
import { Toaster } from "./components/ui/toaster"
import "./tailwind.css"

export const links: LinksFunction = () => [
  {
    href: "https://fonts.googleapis.com/css2?family=BioRhyme:wght@200..800&display=swap",
    rel: "stylesheet"
  },
  {
    href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap",
    rel: "stylesheet"
  }
]

export function Layout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <html lang="en" className="font-montserrat">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-deep">
        <Navbar />
        <QueryClientProvider client={queryClient}>
          <div className="min-h-screen">{children}</div>
        </QueryClientProvider>
        <Footer />
        <Toaster />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary() {
  return <ErrorHandler />
}
