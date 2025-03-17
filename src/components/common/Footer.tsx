import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logoImage from "@/public/rockstock1.svg";
import twitterIcon from '@/public/icons/twitter.png';
import instagramIcon from '@/public/icons/instagram.png';
import facebookIcon from '@/public/icons/facebook.jpg';
import whatsappIcon from '@/public/icons/whatsapp.png';

type FooterColumnProps = {
  title: string;
  children: React.ReactNode;
};

const FooterColumn: React.FC<FooterColumnProps> = ({ title, children }) => (
  <div className="flex flex-col items-center md:items-start space-y-3 w-full sm:w-auto">
    <h4 className="text-lg font-semibold text-black">{title}</h4>
    {children}
  </div>
);

const Footer: React.FC = () => {
  const email = 'your-email@example.com';
  const subject = 'General Inquiry';
  const body = 'Hello,\n\nI am writing to inquire about...';
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <footer className="bg-gray-200 text-black py-10">
      <div className="max-w-screen-xl mx-auto px-6">

        {/* Logo & Kolom Footer */}
        <div className="flex flex-col items-center md:flex-row md:justify-between gap-10">

          {/* Logo */}
          <div className="flex justify-center md:justify-start w-full md:w-auto">
            <Image 
              src={logoImage}
              alt="Rockstock Logo"
              width={240}
              height={240}
              className="w-60 md:w-80 object-contain"
            />
          </div>

          {/* Footer Sections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left w-full">

            <FooterColumn title="Rockstock World">
              <ul className="space-y-2 text-sm">
                <li><Link href="/sections/about" className="hover:text-red-600">About Rockstock</Link></li>
                <li><Link href="/sections/join-our-crew" className="hover:text-red-600">Join Our Crew</Link></li>
                <li><Link href="/sections/rock-partners" className="hover:text-red-600">Rock Partners</Link></li>
                <li><Link href="/sections/rockstock-blog" className="hover:text-red-600">The Rockstock Blog</Link></li>
              </ul>
            </FooterColumn>

            <FooterColumn title="Rock Support">
              <ul className="space-y-2 text-sm">
                <li><Link href="/sections/help-center" className="hover:text-red-600">Help Center</Link></li>
                <li><Link href="/sections/faq" className="hover:text-red-600">FAQs</Link></li>
                <li><Link href="/sections/terms" className="hover:text-red-600">Terms & Conditions</Link></li>
                <li><Link href="/sections/policy" className="hover:text-red-600">Privacy Policy</Link></li>
              </ul>
            </FooterColumn>

            <FooterColumn title="Get in Touch">
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href={mailtoLink} className="hover:text-red-600">Contact Us via Email</Link>
                </li>
              </ul>
            </FooterColumn>

            <FooterColumn title="Follow the Rhythm">
              <div className="flex justify-center md:justify-start gap-4">
                <Link href="https://facebook.com">
                  <Image src={facebookIcon} alt="Facebook" width={28} height={28} className='rounded-lg' />
                </Link>
                <Link href="https://twitter.com">
                  <Image src={twitterIcon} alt="Twitter" width={28} height={28} className='rounded-lg' />
                </Link>
                <Link href="https://instagram.com">
                  <Image src={instagramIcon} alt="Instagram" width={28} height={28} className='rounded-lg' />
                </Link>
                <Link href="https://whatsapp.com">
                  <Image src={whatsappIcon} alt="WhatsApp" width={28} height={28} className='rounded-lg' />
                </Link>
              </div>
            </FooterColumn>

          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500 mt-8">
          &copy; {new Date().getFullYear()} Rockstock. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
