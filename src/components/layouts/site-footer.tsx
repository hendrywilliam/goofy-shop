import { Shell } from "@/components/ui/shell";
import { IconGithub } from "@/components/icons/icon-github";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function SiteFooter() {
  return (
    <Shell className="h-[max] border-t py-4">
      <footer className="flex flex-col">
        <section
          id="footer-content"
          className="w-full h-full flex flex-row justify-between"
        >
          <section id="footer-branding" className="h-full w-full p-4">
            <p className="font-bold">Spaceshop8</p>
          </section>
          <section id="footer-lofi" className="h-full w-full p-4 text-center">
            <p className="font-bold">{siteConfig.footerNavigation[0].title}</p>
            <ul className="flex flex-col mt-2 gap-2">
              {siteConfig.footerNavigation[0].items.map((item, index) => {
                return (
                  <li key={index}>
                    <Link href={item.href} target="_blank">
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
          <section
            id="footer-social-media"
            className="h-full w-full p-4 text-center"
          >
            <p className="font-bold">{siteConfig.footerNavigation[1].title}</p>
            <ul className="flex flex-col mt-2 gap-2">
              {siteConfig.footerNavigation[1].items.map((item, index) => {
                return (
                  <li key={index}>
                    <Link href={item.href} target="_blank">
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
          <section
            id="footer-credits"
            className="h-full w-full p-4 text-center"
          >
            <p className="font-bold">{siteConfig.footerNavigation[2].title}</p>
            <ul className="flex flex-col mt-2 gap-2">
              {siteConfig.footerNavigation[2].items.map((item, index) => {
                return (
                  <li key={index}>
                    <Link href={item.href} target="_blank">
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        </section>
        <div className="flex flex-row h-full w-full mt-4 justify-between">
          <p>
            Built by <span className="font-bold">Yrdneh</span>
          </p>
          <Link href="https://github.com/hendrywilliam" target="_blank">
            <IconGithub width="1.5em" height="1.5em"></IconGithub>
          </Link>
        </div>
      </footer>
    </Shell>
  );
}
