import { Button } from "@/components/ui/button"
import type { Hunt } from "@/model/hunt"
import { faker } from "@faker-js/faker"
import { ArrowBigRight } from "lucide-react"

export function HuntCard(props: HuntCardProps) {
  const { hunt, key } = props

  return (
    <div
      className="h-card w-card flex flex-col overflow-hidden rounded-lg bg-white shadow-md"
      key={key}
    >
      <img
        src={`${faker.image.url()}?random=${Math.random()}`}
        alt="location"
        width={600}
        height={400}
        className="h-64 w-full object-cover"
      />
      <div className="mt-5 flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="font-biorhyme text-xl font-semibold">{hunt.name}</h3>
          <span>{hunt.description}</span>
        </div>

        <Button className="mb-5 transition-all duration-300 hover:scale-105">
          Access hunt <ArrowBigRight />
        </Button>
      </div>
    </div>
  )
}

type HuntCardProps = {
  hunt: Hunt
  key: string
}
