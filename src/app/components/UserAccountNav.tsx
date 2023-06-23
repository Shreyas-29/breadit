'use client';

import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";
import UserAvatar from "./UserAvatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/DropDownMenu";

interface UserAccountNavProps {
    user: Pick<User, 'name' | 'image' | 'email'>
}

const UserAccountNav: FC<UserAccountNavProps> = ({
    user
}) => {

    const handleSignOut = (e: any) => {
        e.preventDefault();
        signOut();
    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar
                    user={{
                        name: user.name,
                        image: user.image
                    }}
                    className="h-7 w-7"
                />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-white" align="end">
                <div className="flex items-center justify-normal gap-2 px-3 py-2 rounded-lg">
                    <div className="flex flex-col space-y-1 leading-none">
                        {user?.name &&
                            <p className="font-medium capitalize">
                                {user.name}
                            </p>
                        }
                        {user?.email &&
                            <p className="w-48 text-sm text-zinc-700">
                                {user.email}
                            </p>
                        }
                    </div>
                </div>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                    <Link href='/'>
                        Feed
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link href='/r/create'>
                        Create Community
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link href='/settings'>
                        Settings
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem onSelect={handleSignOut} className="cursor-pointer">
                    Sign Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default UserAccountNav;