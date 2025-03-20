import { Button } from "@/components/ui/button"
import type { HuntLike } from "@/model/hunt"
import { faker } from "@faker-js/faker"
import { ArrowBigRight } from "lucide-react"

export function HuntCard(props: HuntCardProps) {
  const { hunt } = props

  const currentTime = new Date().toISOString()

  const live = currentTime < hunt.huntDto.endTime && currentTime > hunt.huntDto.startTime

  return (
    <div className="flex h-card w-card flex-col overflow-hidden rounded-lg bg-white shadow-md">
      <img
        src={`${faker.image.url()}?random=${Math.random()}`}
        alt="location"
        width={600}
        height={400}
        className="h-64 w-full object-cover"
      />
      <div className="mt-5 flex flex-1 flex-col justify-between p-5">
        <div className="flex flex-col space-y-3">
          <div className="flex space-x-5">
            <h3 className="font-biorhyme text-xl font-semibold">{hunt.huntDto.description}</h3>
            <span className="mt-3">
              {live && (
                <span className="duration-800 flex h-2 w-2 animate-ping rounded-full bg-red-500" />
              )}
            </span>
          </div>
          <span>{hunt.huntDto.description}</span>
        </div>

        <Button className="mb-5 transition-all duration-300 hover:scale-105">
          Access hunt <ArrowBigRight />
        </Button>
      </div>
    </div>
  )
}

type HuntCardProps = {
  hunt: HuntLike
}
