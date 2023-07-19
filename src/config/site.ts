export type SiteConfiguration = typeof siteConfig;

export const siteConfig = {
  name: "Spaceshop",
  description:
    "A simple space-shop (e-commerce) written in Typescript and small adoption of tRPC.",
  mainNavigation: [
    {
      title: "Lobby",
      items: [
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
    },
  ],
};
