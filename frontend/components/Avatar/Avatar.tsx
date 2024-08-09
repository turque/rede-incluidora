import { Avatar as ChakraAvatar } from '@chakra-ui/react'
import { AiOutlineUser } from "react-icons/ai"

export type AvatarProps = {
  src?: string;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
} & React.HTMLAttributes<HTMLDivElement>;

function Avatar({src, name, size }: AvatarProps) {
    return (
      <ChakraAvatar src={src} name={name} size={size} icon={<AiOutlineUser fontSize='2rem'/>} />
    );
  };


export default Avatar;

// import { Avatar as ChakraAvatar } from '@chakra-ui/react'
// import { AiOutlineUser } from "react-icons/ai"

// export type AvatarProps = {
//   size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
//   name?: string;
//   src?: string;
// } & React.HTMLAttributes<HTMLDivElement>;


// export default function Avatar({
//   size,
//   name,
//   src='https://bit.ly/broken-link',
//   className
// }: AvatarProps) {
//   return (
//     <ChakraAvatar  src={src} size={size} />
//   );
// }



// import classNames from "classnames";
// import AvatarIcon from "./AvatarIcon";
// import AvatarImage from "./AvatarImage";
// import React from "react";



// const avatarSizeMap = {
//   xs: "w-5 h-5",
//   sm: "w-6 h-6",
//   md: "w-8 h-8",
//   lg: "w-9 h-9",
// };

// const Avatar = ({
//   size = "xs",
//   image,
//   descricao = "",
//   className,
//   ...rest
// }: AvatarProps) => {
//   const avatarSizeClass = avatarSizeMap[size];

//   const avatarComponent = image ? (
//     <AvatarImage src={image} altDescription={descricao} />
//   ) : (
//     <AvatarIcon />
//   );

//   return (
//     <div
//       className={classNames(
//         "relative rounded-full bg-slate-100 flex items-center justify-center text-slate-400",
//         avatarSizeClass,
//         className
//       )}
//       {...rest}
//     >
//       {avatarComponent}
//     </div>
//   );
// };

// export default Avatar;
