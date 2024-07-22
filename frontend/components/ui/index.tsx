import { Avatar } from '@chakra-ui/react'
import { AiOutlineUser } from "react-icons/ai"

interface UserAvatarProps {
  src: string;
  name: string
}

export function UserAvatar({src, name }: UserAvatarProps) {
    return (
      <Avatar src={src} name={name} icon={<AiOutlineUser fontSize='2rem'/>} />
    );
  }
