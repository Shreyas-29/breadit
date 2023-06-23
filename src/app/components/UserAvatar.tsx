import { AvatarProps } from "@radix-ui/react-avatar";
import { User } from "next-auth";
import Image from "next/image";
import { FC } from "react";
import { Icons } from "./Icons";
import { Avatar, AvatarFallback } from "./ui/Avatar";

interface UserAvatarProps extends AvatarProps {
    user: Pick<User, 'name' | 'image'>
}

const UserAvatar: FC<UserAvatarProps> = ({
    user, ...props
}) => {
    return (
        <Avatar>
            {user?.image ? (
                <div className="relative aspect-square h-full w-full">
                    <Image
                        src={user?.image!}
                        alt={user?.name!}
                        referrerPolicy="no-referrer"
                        fill
                    />
                </div>
            ) : (
                <AvatarFallback>
                    <span className="sr-only">
                        {user?.name}
                    </span>
                    <Icons.user className="w-4 h-4" />
                </AvatarFallback>
            )}
        </Avatar>
    );
}

export default UserAvatar;