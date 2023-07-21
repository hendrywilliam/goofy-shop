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
  ],
  footerNavigation: [
    {
      title: "Lofi",
      items: [
        {
          title: "Lofi Girl Original",
          href: "https://www.youtube.com/watch?v=jfKfPfyJRdk&pp=ygUJbG9maSBnaXJs",
        },
        {
          title: "Synthwave Boy",
          href: "https://www.youtube.com/watch?v=4xDzrJKXOOY&pp=ygUJbG9maSBnaXJs",
        },
      ],
    },
  ],
};
