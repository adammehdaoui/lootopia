export const confirm = async (code: string, mail: string) => {
  const result = await fetch("http://localhost:8080/auth/activate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ activationCode: code, mail })
  })

  console.log(result)

  return result
}
