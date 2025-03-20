import { Button } from "@/components/ui/button"
import { Form, Link } from "@remix-run/react"

export default function Login() {
  return (
    <div className="mx-auto my-32 flex max-w-lg flex-col items-center justify-center rounded-3xl border-4 border-white bg-royal p-8 sm:w-full sm:px-4">
      <h1 className="pb-8 text-2xl font-bold text-white">Connexion</h1>
      <Form method="post" className="flex w-full max-w-xs flex-col justify-center gap-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full rounded-md border-2 border-white bg-deep p-2 text-white"
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          required
          className="w-full rounded-md border-2 border-white bg-deep p-2 text-white"
        />
        <Button variant="submit">Se connecter</Button>
      </Form>
      <Link to={"/register"} className="mt-4 text-white underline">
        <p>Vous n&apos;avez pas de compte ? Inscrivez vous</p>
      </Link>
    </div>
  )
}
