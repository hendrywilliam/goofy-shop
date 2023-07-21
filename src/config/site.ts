import { FooterNavItem, MainNavItem } from "@/types";

export type SiteConfiguration = typeof siteConfig;

export const siteConfig = {
  name: "Spaceshop",
  description:
    "A simple space-shop (e-commerce) written in Typescript and small adoption of tRPC.",
  mainNavigation: [
    {
      title: "Stays",
      href: "/",
    },
    {
      title: "Experiences",
      href: "/experiences",
    },
    {
      title: "Online Experiences",
      href: "/online-experiences",
    },
  ] satisfies MainNavItem[],
  footerNavigation: [
    {
      title: "Lofis",
      items: [
        {
          title: "Lofi Girl Original",
          href: "https://www.youtube.com/watch?v=jfKfPfyJRdk&pp=ygUJbG9maSBnaXJs",
        },
        {
          title: "Synthwave Boy",
          href: "https://www.youtube.com/watch?v=4xDzrJKXOOY&pp=ygUJbG9maSBnaXJs",
        },
        {
          title: "Lofi chill/sleep",
          href: "https://www.youtube.com/watch?v=rUxyKA_-grg",
        },
        {
          title: "A fresh start",
          href: "https://www.youtube.com/watch?v=rwionZbOryo",
        },
      ],
    },
    {
      title: "Socials",
      items: [
        {
          title: "GitHub",
          href: "https://github.com/hendrywilliam",
        },
        {
          title: "Twitter",
          href: "https://twitter.com/Freya_JKT48",
        },
        {
          title: "Instagram",
          href: "https://www.instagram.com/jkt48.freya/",
        },
      ],
    },
    {
      title: "Credits",
      items: [
        {
          title: "shadcn",
          href: "https://github.com/shadcn",
        },
        {
          title: "uploadthings",
          href: "https://uploadthing.com/",
        },
        {
          title: "taxonomy",
          href: "https://github.com/shadcn-ui/taxonomy",
        },
        {
          title: "tailwind-variants",
          href: "https://www.tailwind-variants.org/",
        },
      ],
    },
  ] satisfies FooterNavItem[],
};
