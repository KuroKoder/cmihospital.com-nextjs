// / File: components/footer/ContactInfo.tsx
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactInfo = () => (
  <ul className="space-y-4 mb-6">
    <li className="flex items-start gap-3">
      <FaPhoneAlt className="text-green-300 mt-1" aria-hidden="true" />
      <a href="tel:+6282121590000" className="text-white-100 hover:text-white transition-colors">
        +62 821-2159-0000
      </a>
    </li>
    <li className="flex items-start gap-3">
      <FaEnvelope className="text-green-300 mt-1" aria-hidden="true" />
      <a href="mailto:info@cmihospital.com" className="text-white-100 hover:text-white transition-colors">
        info@cmihospital.com
      </a>
    </li>
    <li className="flex items-start gap-3">
      <FaMapMarkerAlt className="text-green-300 mt-1" aria-hidden="true" />
      <span className="text-white-100">
        Jl. Tubagus Ismail VII, Sekeloa, Kecamatan Coblong, Kota Bandung, Jawa Barat 40134
      </span>
    </li>
  </ul>
);

export default ContactInfo;