import collctivLogoIndigo from "../assets/collctivLogo_indigo.svg";
import instagramIcon from "../assets/instagram.png";
import linkGraphic from "../assets/Link.svg";
import techstarsBadge from "../assets/techstars.svg";
import xIcon from "../assets/X.png";

const footerColumns = [
  {
    heading: "Navigation",
    items: [
      { href: "/", label: "Home" },
      { href: "#", label: "About Us" },
      { href: "#", label: "Blog" },
      { href: "#", label: "Support" },
      { href: "#", label: "Contact Us" },
      { href: "#", label: "Careers" },
    ],
  },
  {
    heading: "Product",
    items: [
      { href: "#", label: "Login" },
      { href: "#", label: "App Store" },
      { href: "#", label: "Google Play" },
      { href: "#", label: "PayPal Money Pools" },
      { href: "#", label: "Sweepstake Generator" },
      { href: "#", label: "Secret Santa Generator" },
    ],
  },
  {
    heading: "Legal",
    items: [
      { href: "#", label: "Terms & Conditions" },
      { href: "#", label: "Privacy Policy" },
    ],
  },
] as const;

const socialLinks = [
  { href: "#", icon: instagramIcon, label: "Instagram" },
  { href: "#", icon: linkGraphic, label: "LinkedIn" },
  { href: "#", icon: xIcon, label: "X" },
] as const;

type FooterProps = {
  className?: string;
};

export function Footer({ className = "" }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={`bg-white px-4 pb-8 pt-16 sm:px-6 sm:pt-20 lg:px-8 ${className}`.trim()}>
      <div className="mx-auto max-w-[1188px]">
        <div className="grid gap-14 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[260px_minmax(0,1fr)]">
          <div className="flex flex-col items-start">
            <img
              src={collctivLogoIndigo}
              alt="Collctiv"
              className="h-auto w-[150px] sm:w-[176px]"
            />
            <img
              src={techstarsBadge}
              alt="Techstars recognition"
              className="mt-4 h-auto w-full max-w-[196px]"
            />
            <img
              src={linkGraphic}
              alt=""
              aria-hidden="true"
              className="mt-6 h-[84px] w-[84px] object-contain"
            />
            <p className="mt-6 text-[15px] font-medium text-[#5f6c85]">Follow us on social</p>
            <div className="mt-8 flex items-center gap-6">
              {socialLinks.map((socialLink) => (
                <a
                  key={socialLink.label}
                  href={socialLink.href}
                  aria-label={socialLink.label}
                  className="flex size-8 items-center justify-center rounded-[7px] border border-[#dfe5ef] bg-white transition hover:border-[#cbd4e4] hover:bg-[#f8fafc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#260677]/15"
                >
                  <img src={socialLink.icon} alt="" className="size-[16px] object-contain opacity-70" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12 xl:gap-20">
            {footerColumns.map((column) => (
              <div key={column.heading}>
                <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#7f8ea6]">
                  {column.heading}
                </h2>
                <ul className="mt-5 space-y-[16px]">
                  {column.items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="text-[15px] leading-8 text-[#7b88a3] transition hover:text-[#260677] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#260677]/15"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-[#e9edf5] pt-8 text-center text-[14px] leading-7 text-[#7b88a3] sm:mt-20 sm:pt-10">
          <p>
            &copy; {year} Collctiv Ltd. All rights reserved. Collctiv is a company registered in
            England and Wales (Company number: 11783005)
          </p>
          <p>Collctiv Ltd, Colony, 5 Piccadilly Place, Manchester, England, M1 3BR. VAT number: 348654172</p>
        </div>
      </div>
    </footer>
  );
}
