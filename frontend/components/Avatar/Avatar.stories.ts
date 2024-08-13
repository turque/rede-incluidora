import { Meta, StoryObj } from "@storybook/react";

import Avatar, { type AvatarProps } from "./Avatar";

const meta: Meta<AvatarProps> = {
  title: "Atoms/Avatar",
  component: Avatar,
  argTypes: {
    size: { type: "string" },
    name: { type: "string" },
    src: { type: "string" },
  },
};

export default meta;

export const Primary: StoryObj<AvatarProps> = {
  args: {},
};

export const AvatarSmall: StoryObj<AvatarProps> = {
  args: {
    size: "sm",
    // name: "Avatar Icon"
  },
};

export const AvatarMedium: StoryObj<AvatarProps> = {
  args: {
    size: "2xl",
    name: "Avatar Icon"
  },
};

// export const AvatarLarge: StoryObj<AvatarProps> = {
//   args: {
//     size: "lg",
//   },
// };
// export const AvatarLarge: StoryObj<AvatarProps> = {
//   args: {
//     size: "lg",
//   },
// };

// export const AvatarExtraLarge: StoryObj<AvatarProps> = {
//   args: {
//     size: "xl",
//   },
// };
// export const AvatarExtraLarge: StoryObj<AvatarProps> = {
//   args: {
//     size: "xl",
//   },
// };

// export const AvatarImage: StoryObj<AvatarProps> = {
//   args: {
//     size: "lg",
//     src: "https://placehold.co/400x400.png",
//   },
// };
// export const AvatarImage: StoryObj<AvatarProps> = {
//   args: {
//     size: "lg",
//     src: "https://placehold.co/400x400.png",
//   },
// };
