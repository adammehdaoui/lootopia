import { confirm } from "@/services/auth"
import { useSearchParams } from "@remix-run/react"
import { useEffect, useState } from "react"

export default function Confirm() {
  const [searchParams] = useSearchParams()
  const code = searchParams.get("code")
  const mail = searchParams.get("mail")
  const [message, setMessage] = useState("Activation en cours...")

  useEffect(() => {
    if (code && mail) {
      confirm(code, mail)
        .then((res) => res.json())
        .then((data) => {
          setMessage(data.message || "Compte activé ! Vous pouvez vous connecter.")
        })
        .catch((error) => {
          console.log("errro", error)
          setMessage("Erreur d'activation.")
        })
    }
  }, [code, mail])

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold">{message}</h1>
      <a href="/login" className="mt-4 text-blue-500">
        Se connecter
      </a>
    </div>
  )
}
