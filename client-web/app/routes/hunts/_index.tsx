import { hunts } from "@/services/hunts"
import { useQuery } from "@tanstack/react-query"

export default function Hunts() {
  const { isPending, error, data } = useQuery({
    queryKey: ["hunts"],
    queryFn: hunts
  })

  console.log(data)

  return <></>
}
