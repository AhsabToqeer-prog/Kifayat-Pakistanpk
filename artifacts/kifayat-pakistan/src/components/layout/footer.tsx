import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 md:py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h3 className="font-serif text-2xl font-bold">Kifayat</h3>
          <p className="text-primary-foreground/80 max-w-xs">
            Advocating for small shopkeepers, street vendors, and laborers in Pakistan. Building a dignified, community-driven economy.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold mb-4 uppercase text-sm tracking-wider">About</h4>
          <ul className="space-y-2 text-primary-foreground/80">
            <li><Link href="/about" className="hover:text-accent transition-colors">Our Story</Link></li>
            <li><Link href="/about#mission" className="hover:text-accent transition-colors">Mission & Vision</Link></li>
            <li><Link href="/campaigns" className="hover:text-accent transition-colors">Advocacy</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4 uppercase text-sm tracking-wider">Resources</h4>
          <ul className="space-y-2 text-primary-foreground/80">
            <li><Link href="/resources?category=shopkeepers" className="hover:text-accent transition-colors">For Shopkeepers</Link></li>
            <li><Link href="/resources?category=vendors" className="hover:text-accent transition-colors">For Vendors</Link></li>
            <li><Link href="/resources?category=laborers" className="hover:text-accent transition-colors">For Laborers</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4 uppercase text-sm tracking-wider">Contact</h4>
          <ul className="space-y-2 text-primary-foreground/80">
            <li>info@kifayat.org.pk</li>
            <li>+92 300 1234567</li>
            <li>Karachi, Pakistan</li>
            <li className="pt-2">
              <Link href="/contact" className="text-accent hover:text-white transition-colors underline underline-offset-4 font-medium">Get in Touch</Link>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-primary-foreground/20 text-sm text-primary-foreground/60 flex flex-col md:flex-row justify-between items-center">
        <p>© {new Date().getFullYear()} Kifayat Pakistan. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Melting Profit for Collective Benefit</p>
      </div>
    </footer>
  );
}
