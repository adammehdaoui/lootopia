import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

export default function Profile() {
  const { toast } = useToast()

  const handleClickOnWIP = () => {
    toast({
      title: "Work in progress",
      description: "This feature is not available yet.",
      variant: "default"
    })
  }

  return (
    <div className="flex justify-center">
      <div className="flex w-1/2 flex-col items-center justify-center space-y-20 pt-16 text-white">
        <div className="flex w-full flex-col justify-start space-y-8">
          <h2 className="text-xl font-bold">Change your profile</h2>

          <div className="mx-auto flex w-full max-w-xl items-center justify-between rounded-xl bg-royal px-8 py-5">
            <div className="flex space-x-3">
              <Avatar className="ml-3 cursor-pointer">
                <AvatarImage src="/assets/fallback.png" />
                <AvatarFallback>LOO</AvatarFallback>
              </Avatar>
              <div className="-mt-1 flex flex-col">
                <h3 className="text-md font-bold">Adam Reis</h3>
                <span className="text-gray-200">adamokuton</span>
              </div>
            </div>

            <Button variant="secondary">Change your avatar</Button>
          </div>
        </div>

        <Separator />

        <button className="flex w-full flex-col justify-start space-y-8" onClick={handleClickOnWIP}>
          <h2 className="text-xl font-bold">Bio</h2>
          <Input
            disabled
            placeholder="This feature is a work in progress"
            onClick={handleClickOnWIP}
          />
        </button>

        <Separator />

        <button className="flex w-full flex-col justify-start space-y-8" onClick={handleClickOnWIP}>
          <h2 className="text-xl font-bold">Gender</h2>
          <Select>
            <SelectTrigger className="w-1/2">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
          </Select>
        </button>
      </div>
    </div>
  )
}
