import Footer from "@/components/layout/footer"
import Navbar from "@/components/layout/navbar"
import { AuthProvider } from "@/contexts/auth-context"
import { ErrorHandler } from "@/handlers/error-handler"
import { auth, requireDisconnect } from "@/services/auth/auth"
import { connectedRoutes } from "@/utils/connectedRoutes"
import { disconnectRoutes } from "@/utils/disconnectRoutes"
import {
  redirect,
  type LinksFunction,
  type LoaderFunction,
  type LoaderFunctionArgs
} from "@remix-run/node"
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  type MetaFunction
} from "@remix-run/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
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

export const meta: MetaFunction = () => [
  { title: "Lootopia" },
  {
    property: "og:title",
    content: "Lootopia"
  },
  {
    name: "description",
    content: "Lootopia is a web3 game that allows players to earn rewards through AR gameplay."
  }
]

export const loader: LoaderFunction = async (args: LoaderFunctionArgs) => {
  const currentUrl = new URL(args.request.url)
  const currentRoute = currentUrl.pathname

  const connectedRoute = connectedRoutes.includes(currentRoute)
  const disconnectedRoute = disconnectRoutes.includes(currentRoute)

  if (!connectedRoute && !disconnectedRoute) {
    return auth(args, false)
  }

  if (disconnectedRoute) {
    try {
      await requireDisconnect(args)
    } catch {
      console.error("Already connected")
      return redirect("/")
    }

    return auth(args, false)
  }

  return auth(args, true)
}

export function Layout({ children }: { readonly children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            staleTime: 6 * 1000
          }
        }
      })
  )
  const { connected, username, id, token } = useLoaderData<typeof loader>()

  const authProviderProps = {
    connected,
    username,
    id,
    token
  }

  return (
    <html lang="en" className="font-montserrat">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="cursor-default bg-deep">
        <QueryClientProvider client={queryClient}>
          <AuthProvider {...authProviderProps}>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <ReactQueryDevtools initialIsOpen={false} />
            <Footer />
            <Toaster />
          </AuthProvider>
        </QueryClientProvider>
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
