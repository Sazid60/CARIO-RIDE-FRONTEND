import { LogOutIcon, UserPenIcon } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 ">
          <Avatar>
            <AvatarImage src="./avatar.jpg" alt="Profile image" />
            <AvatarFallback>KK</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64" align="end">
        {/* User Info */}
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className=" truncate text-sm font-medium">
            Keith Kennedy
          </span>
          <span className="truncate text-xs font-normal">
            k.kennedy@originui.com
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* View Profile */}
        <DropdownMenuItem>
          <UserPenIcon size={16} className="" aria-hidden="true" />
          <span>View Profile</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem>
          <LogOutIcon size={16} className="" aria-hidden="true" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
