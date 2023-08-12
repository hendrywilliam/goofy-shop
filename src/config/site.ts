import { FooterNavItem, MainNavItem } from "@/types";

export type SiteConfiguration = typeof siteConfig;

export const siteConfig = {
  name: "Spaceshop",
  description:
    "A simple space-shop written in Typescript and small adoption of tRPC.",
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
          title: "lofi girl original",
          href: "https://www.youtube.com/watch?v=jfKfPfyJRdk&pp=ygUJbG9maSBnaXJs",
        },
        {
          title: "synthwave boy",
          href: "https://www.youtube.com/watch?v=4xDzrJKXOOY&pp=ygUJbG9maSBnaXJs",
        },
        {
          title: "lofi chill/sleep",
          href: "https://www.youtube.com/watch?v=rUxyKA_-grg",
        },
        {
          title: "a fresh start",
          href: "https://www.youtube.com/watch?v=rwionZbOryo",
        },
      ],
    },
    {
      title: "Socials",
      items: [
        {
          title: "github",
          href: "https://github.com/hendrywilliam",
        },
        {
          title: "twitter",
          href: "https://twitter.com/Freya_JKT48",
        },
        {
          title: "instagram",
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
