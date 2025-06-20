import { HuntCard } from "@/components/custom/hunt-card"
import { useSession } from "@/contexts/auth-context"
import { QueryHandler } from "@/handlers/query-handler"
import { hunts } from "@/services/hunts"
import { useQuery } from "@tanstack/react-query"

export default function Hunts() {
  const { token } = useSession()

  const { isPending, error, data } = useQuery({
    queryKey: ["hunts"],
    queryFn: async () => {
      return await hunts(token)
    }
  })

  return (
    <QueryHandler isPending={isPending} error={error}>
      <div className="mt-16 flex flex-wrap justify-center gap-5 pb-20">
        {data?.map((hunt) => <HuntCard hunt={hunt} key={hunt.huntDto.id} />)}
      </div>
    </QueryHandler>
  )
}
