"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, MoreHorizontal } from "lucide-react"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useSession } from "@/contexts/auth-context"
import { QueryHandler } from "@/handlers/query-handler"
import { hunts } from "@/services/hunts"
import { useQuery } from "@tanstack/react-query"

export default function AdminHunts() {
  const { token } = useSession()
  const [searchQuery, setSearchQuery] = useState("")

  const { isPending, error, data } = useQuery({
    queryKey: ["admin-hunts"],
    queryFn: async () => {
      return await hunts(token)
    }
  })

  const getHuntStatus = (hunt: any) => {
    const currentTime = new Date().toISOString()
    if (currentTime >= hunt.huntDto.startTime && currentTime <= hunt.huntDto.endTime) {
      return { status: "live", label: "Live", variant: "default" as const }
    }
    if (currentTime < hunt.huntDto.startTime) {
      return { status: "upcoming", label: "Upcoming", variant: "secondary" as const }
    }
    return { status: "past", label: "Past", variant: "outline" as const }
  }

  const filteredHunts = (data || []).filter(
    (hunt: any) =>
      hunt.huntDto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (hunt.huntDto.description &&
        hunt.huntDto.description.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hunts Management</h1>
          <p className="text-gray-600">Manage treasure hunts and their settings</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Hunt
        </Button>
      </div>

      <QueryHandler isPending={isPending} error={error}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Hunts ({filteredHunts.length})</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search hunts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Hunt Name</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Status</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Start Date</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">End Date</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Likes</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Location</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHunts.map((hunt: any) => {
                    const huntStatus = getHuntStatus(hunt)
                    return (
                      <tr key={hunt.huntDto.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div>
                            <div className="font-medium text-gray-900">{hunt.huntDto.name}</div>
                            <div className="max-w-xs truncate text-sm text-gray-500">
                              {hunt.huntDto.description || "No description"}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant={huntStatus.variant}>{huntStatus.label}</Badge>
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {new Date(hunt.huntDto.startTime).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {new Date(hunt.huntDto.endTime).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-gray-600">{hunt.likeCount}</td>
                        <td className="px-4 py-3 text-gray-600">
                          <div className="text-sm">
                            {hunt.huntDto.latitude.toFixed(4)}, {hunt.huntDto.longitude.toFixed(4)}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Edit Hunt</DropdownMenuItem>
                              <DropdownMenuItem>Duplicate Hunt</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                Delete Hunt
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </QueryHandler>
    </div>
  )
}
