import axiosClient from "@/lib/client"

export const test = async (token: string) => {
  return axiosClient.get("/", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
