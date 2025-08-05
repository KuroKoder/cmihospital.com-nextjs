// File: components/footer/FooterBottom.tsx
const FooterBottom = () => (
  <div className="bg-green-950 py-4 border-t border-green-700/30">
    <div className="max-w-7xl mx-auto px-6 lg:px-8 text-sm text-white-300 text-center">
      &copy; {new Date().getFullYear()} CMI Hospital. All rights reserved.
    </div>
  </div>
);

export default FooterBottom;