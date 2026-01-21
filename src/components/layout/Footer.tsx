import Link from "next/link";

function Footer() {
  return ( 
    <footer className="bg-white px-10 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

        {/* FORM */}
        <form className="space-y-4">
          <input 
            placeholder="Your names"
            className="input"
          />
          <input 
            placeholder="Your email"
            className="input"
          />
          <textarea 
            placeholder="Your message"
            className="input h-28 resize-none"
          />
          <button className="btn">Submit</button>
        </form>

        {/* LINKS */}
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl text-black font-bold">Quick Links</h2>
          <Link href="#" className="text-gray-500">→ Home</Link>
          <Link href="#" className="text-gray-500">→ Browse Cars</Link>
          <Link href="#" className="text-gray-500">→ List Your Cars</Link>
          <Link href="#" className="text-gray-500">→ About Us</Link>
        </div>

        {/* CONTACT */}
        <div>
          <h2 className="text-2xl text-black font-bold">Contact</h2>
          <ul className="space-y-2 text-gray-600">
            <li>carental@info.com</li>
            <li>+250 788 303 303</li>
            <li>Kigali, Rwanda</li> 
          </ul>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="mt-8 border-t pt-5 flex flex-col md:flex-row justify-between text-sm text-gray-500">
        <h2>© 2026 Brand. All rights reserved.</h2>
        <p className="cursor-pointer hover:text-black">
          Terms | Privacy
        </p>
      </div>
    </footer>
  );
}

export default Footer;
