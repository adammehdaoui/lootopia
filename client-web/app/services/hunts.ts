import axiosClient from "@/lib/client"

export const hunts = async () => {
  const result = await axiosClient.get("/hunts/popularity", {
    headers: { "Content-Type": "application/json" }
  })

  return result.data
}
