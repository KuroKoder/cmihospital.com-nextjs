// File: components/footer/FloatingAppointmentButton.tsx
import { FaCalendarAlt } from "react-icons/fa";

const FloatingAppointmentButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-500 text-white p-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400"
    aria-label="Buat Janji Konsultasi"
  >
    <FaCalendarAlt className="text-xl" />
  </button>
);

export default FloatingAppointmentButton;