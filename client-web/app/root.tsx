import Footer from "@/components/layout/footer"
import Navbar from "@/components/layout/navbar"
import { ErrorHandler } from "@/handlers/error-handler"
import { requireAuth } from "@/services/auth/auth"
import { connectedRoutes } from "@/utils/connectedRoutes"
import {
  data,
  type LinksFunction,
  type LoaderFunction,
  type LoaderFunctionArgs,
  redirect
} from "@remix-run/node"
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReasonPhrases, StatusCodes } from "http-status-codes"
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

export const loader: LoaderFunction = async (args: LoaderFunctionArgs) => {
  const currentUrl = new URL(args.request.url)
  const currentRoute = currentUrl.pathname

  if (!connectedRoutes.includes(currentRoute)) {
    return data({
      message: `${ReasonPhrases.ACCEPTED}: You have access to this route`,
      status: StatusCodes.ACCEPTED
    })
  }

  try {
    await requireAuth(args)
    return data({
      message: `${ReasonPhrases.OK}: You have access to this route`,
      status: StatusCodes.OK
    })
  } catch {
    console.error("Unauthorized")
    return redirect("/login")
  }
}

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
