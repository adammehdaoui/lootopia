import { hunts } from "@/services/hunts"
import { useQuery } from "@tanstack/react-query"

export default function Hunts() {
  const { isPending, error, data } = useQuery({
    queryKey: ["hunts"],
    queryFn: hunts
  })

  if (error) {
    return <div>Error: {error.message}</div>
  }

  console.log(data)

  return <></>
}
