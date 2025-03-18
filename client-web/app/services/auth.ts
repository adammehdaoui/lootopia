import axios from "axios"

export const confirm = async (code: string, mail: string) => {
  const result = await axios.post(
    "http://localhost:8080/auth/activate",
    { activationCode: code, mail },
    {
      headers: { "Content-Type": "application/json" }
    }
  )

  return result.data
}
