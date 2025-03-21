import { Live } from "@/components/custom/live"
import type { HuntLike } from "@/model/hunt"
import { faker } from "@faker-js/faker"
import { Heart } from "lucide-react"

export function HuntCard(props: HuntCardProps) {
  const { hunt } = props

  const currentTime = new Date().toISOString()

  const live = currentTime < hunt.huntDto.endTime && currentTime > hunt.huntDto.startTime

  return (
    <div className="flex h-card w-card cursor-pointer flex-col overflow-hidden rounded-lg bg-white shadow-md transition-all duration-100 hover:scale-105">
      <img
        src={`${faker.image.url()}?random=${Math.random()}`}
        alt="location"
        width={600}
        height={400}
        className="h-64 w-full object-cover"
      />
      <div className="mt-5 flex flex-1 flex-col justify-between p-5">
        <div className="flex flex-col space-y-5">
          <div className="flex justify-between">
            <button>
              <Heart size={25} className="cursor-pointer duration-500 hover:scale-125" />
            </button>
          </div>

          <div className="flex justify-center space-x-5">
            <h3 className="font-biorhyme text-xl font-semibold">{hunt.huntDto.description}</h3>
            <span className="mt-3">{live && <Live />}</span>
          </div>
          <span>{hunt.huntDto.description}</span>
        </div>
      </div>
    </div>
  )
}

type HuntCardProps = {
  hunt: HuntLike
}
