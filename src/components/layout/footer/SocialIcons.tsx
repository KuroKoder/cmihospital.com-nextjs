import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const socialLinks = [
  { href: "https://facebook.com/cmihospital", label: "Facebook", icon: FaFacebookF },
  { href: "https://instagram.com/cmihospital", label: "Instagram", icon: FaInstagram },
  { href: "https://twitter.com/cmihospital", label: "Twitter", icon: FaTwitter },
  { href: "https://linkedin.com/company/cmihospital", label: "LinkedIn", icon: FaLinkedinIn },
  { href: "https://youtube.com/@cmihospital", label: "YouTube", icon: FaYoutube },
];

const SocialIcons = ({ rounded = false }: { rounded?: boolean }) => (
  <div className="flex items-center gap-4">
    {socialLinks.map(({ href, label, icon: Icon }, idx) => (
      <Link
        key={idx}
        href={href}
        aria-label={label}
        target="_blank"
        rel="noopener noreferrer"
        className={
          rounded
            ? "w-9 h-9 rounded-full bg-green-600 hover:bg-green-500 flex items-center justify-center transition-colors"
            : "text-white hover:text-green-300 transition-colors"
        }
      >
        <Icon />
      </Link>
    ))}
  </div>
);

export default SocialIcons;
