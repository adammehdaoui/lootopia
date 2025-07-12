"use client"

import AvatarHandler from "@/components/custom/avatar-handler"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useSession } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { requireAuth } from "@/services/auth/auth"
import { uploadAvatar } from "@/services/avatar"
import { type ActionFunction, type ActionFunctionArgs, data } from "@remix-run/node"
import { Form, useActionData } from "@remix-run/react"
import { useQueryClient } from "@tanstack/react-query"
import { ReasonPhrases, StatusCodes } from "http-status-codes"
import { useEffect, useState } from "react"
import { Edit, Save, XCircle } from "lucide-react" // Import new icons

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
  const { username: sessionUsername, id } = useSession() // Get username from session
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const [isEditingUsername, setIsEditingUsername] = useState(false)
  const [editableUsername, setEditableUsername] = useState(sessionUsername || "")

  // Initialize editableUsername when sessionUsername changes (e.g., on initial load)
  useEffect(() => {
    if (sessionUsername) {
      setEditableUsername(sessionUsername)
    }
  }, [sessionUsername])

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

  const handleSaveUsername = () => {
    // In a real application, you would send this to your backend
    // For now, it's a front-end only update
    setIsEditingUsername(false)
    toast({
      title: "Username updated",
      description: `Your username has been changed to ${editableUsername}.`,
      variant: "default"
    })
  }

  const handleCancelEditUsername = () => {
    setEditableUsername(sessionUsername || "") // Revert to original username
    setIsEditingUsername(false)
    toast({
      title: "Edit canceled",
      description: "Username change has been canceled.",
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
                {isEditingUsername ? (
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      value={editableUsername}
                      onChange={(e) => setEditableUsername(e.target.value)}
                      className="w-48 rounded-md border-2 border-white bg-deep p-2 text-white"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleSaveUsername}
                      className="text-white hover:text-green-400"
                    >
                      <Save className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleCancelEditUsername}
                      className="text-white hover:text-red-400"
                    >
                      <XCircle className="h-5 w-5" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{editableUsername}</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsEditingUsername(true)}
                      className="text-white hover:text-gray-300"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                )}
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
