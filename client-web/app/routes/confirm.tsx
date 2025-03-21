import { Button } from "@/components/ui/button"
import { confirm } from "@/services/auth/auth"
import { Link, useSearchParams } from "@remix-run/react"
import { useEffect, useState } from "react"

export default function Confirm() {
  const [searchParams] = useSearchParams()
  const code = searchParams.get("code")
  const mail = searchParams.get("mail")
  const [message, setMessage] = useState("Activation en cours...")

  useEffect(() => {
    if (code && mail) {
      confirm(code, mail)
        .then((data) => {
          setMessage(data.message || "Compte activé ! Vous pouvez vous connecter.")
        })
        .catch((error) => {
          console.error("error", error)
          setMessage("Erreur d'activation.")
        })
    }
  }, [code, mail])

  return (
    <div className="mx-auto my-32 flex max-w-lg flex-col items-center justify-center rounded-3xl border-4 border-white bg-royal px-8 py-16 sm:w-full">
      <div className="flex w-full flex-col items-center">
        <h1 className="mb-4 w-full text-center text-2xl font-bold text-white">{message}</h1>
        <Button variant="submit">
          <Link to={"/login"}>Login</Link>
        </Button>
      </div>
    </div>
  )
}
