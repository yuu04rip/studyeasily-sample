import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-darkPurple to-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-purple-pink bg-clip-text text-transparent mb-4">
              StudyEasily
            </h3>
            <p className="text-gray-300">
              Your gateway to quality online education. Learn at your own pace, anytime, anywhere.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-accent">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/corsi" className="text-gray-300 hover:text-accent transition">
                  Browse Courses
                </Link>
              </li>
              <li>
                <Link href="/piani" className="text-gray-300 hover:text-accent transition">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/business" className="text-gray-300 hover:text-accent transition">
                  Business Solutions
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-accent transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-accent">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-accent transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contatti" className="text-gray-300 hover:text-accent transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/canali" className="text-gray-300 hover:text-accent transition">
                  Support Channels
                </Link>
              </li>
              <li>
                <Link href="/data-analytics" className="text-gray-300 hover:text-accent transition">
                  Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-accent">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-accent transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-accent transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-accent transition">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} StudyEasily. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
