import AvatarHandler from "@/components/custom/avatar-handler"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useSession } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { requireAuth } from "@/services/auth/auth"
import { uploadAvatar } from "@/services/avatar"
import { ActionFunction, ActionFunctionArgs, data } from "@remix-run/node"
import { Form, useActionData } from "@remix-run/react"
import { useQueryClient } from "@tanstack/react-query"
import { ReasonPhrases, StatusCodes } from "http-status-codes"
import { useEffect } from "react"

type ActionResponse = {
  message: string
  status: StatusCodes
}

export const action: ActionFunction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const file = formData.get("file")

  if (!file) {
    return data<ActionResponse>({
      message: `${ReasonPhrases.BAD_REQUEST}: No form data found`,
      status: StatusCodes.BAD_REQUEST
    })
  }

  const token = await requireAuth({ request })

  if (!token) {
    return data<ActionResponse>({
      message: `${ReasonPhrases.UNAUTHORIZED}: You are not authorized to perform this action`,
      status: StatusCodes.UNAUTHORIZED
    })
  }

  try {
    await uploadAvatar(file, token)

    return data<ActionResponse>({
      message: `${ReasonPhrases.OK}: Avatar uploaded successfully`,
      status: StatusCodes.OK
    })
  } catch (error) {
    console.error("Upload avatar error: ", error)
    return data<ActionResponse>({
      message: `${ReasonPhrases.INTERNAL_SERVER_ERROR}: File not uploaded, please try again later`,
      status: StatusCodes.INTERNAL_SERVER_ERROR
    })
  }
}

export default function Profile() {
  const data = useActionData<typeof action>()
  const { username, id } = useSession()
  const queryClient = useQueryClient()
  const { toast } = useToast()

  useEffect(() => {
    if (data?.status === StatusCodes.OK) {
      queryClient.invalidateQueries({ queryKey: ["avatar"] })
    }

    if (!data) return

    toast({
      title: "Success",
      description:
        data?.status === StatusCodes.OK ? "Avatar uploaded successfully" : "Error uploading avatar",
      variant: data?.status === StatusCodes.OK ? "default" : "destructive"
    })
  }, [data, queryClient, toast])

  const handleClickOnWIP = () => {
    toast({
      title: "Work in progress",
      description: "This feature is not available yet.",
      variant: "default"
    })
  }

  return (
    <div className="flex min-h-screen justify-center bg-gradient-to-tl from-deep via-royal to-light">
      <div className="flex w-full max-w-xl flex-col items-center justify-center space-y-16 text-white">
        <div className="flex w-full flex-col space-y-8">
          <h2 className="text-center text-2xl font-extrabold tracking-tight">
            Change your profile
          </h2>

          <div className="flex flex-col items-center justify-between space-x-5 space-y-5 rounded-2xl bg-deep px-10 py-7 shadow-lg ring-1 ring-light">
            <div className="flex items-center space-x-4">
              <AvatarHandler />
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold">{username}</h3>
                <span className="text-xs text-gray-300">{id}</span>
              </div>
            </div>
            <Form
              method="post"
              encType="multipart/form-data"
              className="flex w-full flex-col items-end gap-2 py-5"
            >
              <Input
                type="file"
                name="file"
                className="text-white file:rounded-lg file:border-none file:bg-light file:text-sm file:text-white"
                required
              />
              <Button variant="submit" className="bg-light transition hover:bg-royal">
                Upload
              </Button>
            </Form>
          </div>
        </div>

        <Separator className="bg-indigo-700/30" />

        <button
          className="group flex w-full cursor-pointer flex-col space-y-2"
          onClick={handleClickOnWIP}
        >
          <h2 className="flex items-center gap-2 text-lg font-bold">Bio</h2>
          <Input
            disabled
            placeholder="This feature is a work in progress"
            className="bg-gray-800/50 text-gray-400 ring-indigo-500 transition group-hover:ring-2"
            onClick={handleClickOnWIP}
          />
        </button>

        <Separator className="bg-indigo-700/30" />

        <div className="flex w-full flex-col space-y-2">
          <h2 className="flex items-center gap-2 text-lg font-bold">Gender</h2>
          <Select disabled>
            <SelectTrigger className="w-1/2 bg-gray-800/50 text-gray-400">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
          </Select>
        </div>
      </div>
    </div>
  )
}
