import { Link } from "@remix-run/react"

export default function Payment() {
  return (
    <div className="mt-16 flex h-full w-full flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-white">Payment Page</h1>
      <Link to="/checkout" className="mt-4 text-blue-500 hover:underline">
        Go to Checkout
      </Link>
    </div>
  )
}
