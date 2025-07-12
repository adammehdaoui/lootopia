"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, UserPlus, MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { AddUserModal } from "@/components/custom/add-user-modal"
import { useToast } from "@/hooks/use-toast"
import { EditUserModal } from "@/components/custom/edit-user-modal"
import { DeleteUserModal } from "@/components/custom/delete-user-modal"

type User = {
  id: string
  username: string
  email: string
  status: "active" | "inactive"
  joinDate: string
  huntsCreated: number
  huntsParticipated: number
}

export default function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const { toast } = useToast()

  // Mock users data - replace with real data later
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      username: "john.doe@example.com",
      email: "john.doe@example.com",
      status: "active",
      joinDate: "2024-01-15",
      huntsCreated: 5,
      huntsParticipated: 12
    },
    {
      id: "2",
      username: "jane.smith@example.com",
      email: "jane.smith@example.com",
      status: "active",
      joinDate: "2024-02-20",
      huntsCreated: 2,
      huntsParticipated: 8
    },
    {
      id: "3",
      username: "bob.wilson@example.com",
      email: "bob.wilson@example.com",
      status: "inactive",
      joinDate: "2024-01-10",
      huntsCreated: 0,
      huntsParticipated: 3
    },
    {
      id: "4",
      username: "alice.brown@example.com",
      email: "alice.brown@example.com",
      status: "active",
      joinDate: "2024-03-05",
      huntsCreated: 8,
      huntsParticipated: 15
    }
  ])

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddUser = (
    newUser: Omit<User, "id" | "joinDate" | "huntsCreated" | "huntsParticipated">
  ) => {
    const user: User = {
      ...newUser,
      id: Math.random().toString(36).substring(2, 15),
      joinDate: new Date().toISOString().split("T")[0],
      huntsCreated: 0,
      huntsParticipated: 0
    }

    setUsers((prev) => [user, ...prev])
    toast({
      title: "User added",
      description: `${user.username} has been successfully added.`
    })
  }

  const handleEditUser = (updatedUser: User) => {
    setUsers((prev) => prev.map((user) => (user.id === updatedUser.id ? updatedUser : user)))
    toast({
      title: "User updated",
      description: `${updatedUser.username} has been successfully updated.`
    })
  }

  const handleDeleteUser = (userId: string) => {
    const userToDelete = users.find((user) => user.id === userId)
    setUsers((prev) => prev.filter((user) => user.id !== userId))
    toast({
      title: "User deleted",
      description: `${userToDelete?.username} has been successfully deleted.`,
      variant: "destructive"
    })
  }

  const openEditModal = (user: User) => {
    setSelectedUser(user)
    setIsEditModalOpen(true)
  }

  const openDeleteModal = (user: User) => {
    setSelectedUser(user)
    setIsDeleteModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-600">Manage user accounts and permissions</p>
        </div>
        <Button className="flex items-center gap-2" onClick={() => setIsAddModalOpen(true)}>
          <UserPlus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Users ({filteredUsers.length})</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search users..."
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
                  <th className="px-4 py-3 text-left font-medium text-gray-900">User</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">Status</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">Join Date</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">Hunts Created</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">
                    Hunts Participated
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium text-gray-900">{user.username}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={user.status === "active" ? "default" : "secondary"}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {new Date(user.joinDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{user.huntsCreated}</td>
                    <td className="px-4 py-3 text-gray-600">{user.huntsParticipated}</td>
                    <td className="px-4 py-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditModal(user)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => openDeleteModal(user)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddUser={handleAddUser}
      />

      {selectedUser && (
        <EditUserModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false)
            setSelectedUser(null)
          }}
          user={selectedUser}
          onEditUser={handleEditUser}
        />
      )}

      {selectedUser && (
        <DeleteUserModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false)
            setSelectedUser(null)
          }}
          user={selectedUser}
          onDeleteUser={handleDeleteUser}
        />
      )}
    </div>
  )
}
