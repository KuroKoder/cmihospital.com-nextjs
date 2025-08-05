import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

const FooterLinkList = ({ items }: { items: [string, string][] }) => (
  <ul className="space-y-3">
    {items.map(([label, url], index) => (
      <li key={index} className="flex items-center group">
        <FaChevronRight className="mr-2 text-white-300 text-xs group-hover:translate-x-1 transition-transform" />
        <Link href={url} className="text-white-100 hover:text-white transition-colors">
          {label}
        </Link>
      </li>
    ))}
  </ul>
);

export default FooterLinkList;
