"use client";

import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Image from 'next/image'; 
import Navbar from '@/components/common/Navbar';
import crewImage from '@/public/crew.jpg';

const JoinOurCrew = () => {
  const email = "careers@rockstock.com"; 
  const subject = "Rockstock Career Inquiry"; 
  const body = "Hey Rockstock Team,\n\nI'm interested in joining the crew! Here's why I'd be a great fit..."; 
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <div className="min-h-screen font-sans">
      <Header />
      <Navbar />
      <div className="container mx-auto max-w-6xl px-4 py-10 md:py-20">
        
        {/* Join Our Crew Section */}
        <section className="mb-10 md:mb-20 flex flex-col items-center mt-8"> 
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-red-600">Join Our Crew</h1>
          <p className="text-base md:text-lg mb-6 max-w-2xl mx-auto text-center leading-relaxed">
            Looking for a gig where creativity, rebellion, and craftsmanship collide? Rockstock is on the hunt for passionate misfits
            who don’t settle for boring. Let’s build something legendary together.
          </p>
          <div className="flex justify-center mb-10">
            <div className="w-full max-w-2xl rounded-lg overflow-hidden shadow-lg"> 
              <Image 
                src={crewImage} 
                alt="Rockstock Team" 
                className="rounded-lg object-cover" 
                layout="responsive" 
                width={500} 
                height={300} 
              />
            </div>
          </div>
        </section>

        {/* Why Join Us? */}
        <section className="mb-10 md:mb-20"> 
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-red-600">Why Join Us?</h2>
          <p className="text-base md:text-lg mb-6 text-justify"> 
            We’re not just making furniture—we’re creating a movement. If you’ve got a rebellious streak, a passion for design,
            and an undying love for rock culture, you’ll fit right in.
          </p>
        </section>

        {/* Open Positions */}
        <section className="mb-10 md:mb-20"> 
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-red-600">Open Positions</h2>
          <ul className="list-disc pl-6 text-base md:text-lg">
            <li>Furniture Designer (Dark Aesthetic Specialist)</li>
            <li>Marketing Rockstar (Because &quot;normal marketing&ldquo; is boring)</li>
            <li>Warehouse Warrior (Handle our legendary stock)</li>
          </ul>
        </section>

        {/* Contact */}
        <section className="mb-10 md:mb-20">
          <div className="shadow-lg p-6 md:p-10 rounded-lg flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-red-600">Ready to Join?</h2>
              <p className="text-base md:text-lg mb-4">
                Drop us an email with your CV, portfolio, or just an epic story about why you belong here.
              </p>
            </div>
            <a href={mailtoLink} className="bg-red-600 border border-black font-semibold px-4 md:px-6 py-2 rounded-lg shadow hover:bg-green-600 transition md:ml-4">
              Apply Now
            </a>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default JoinOurCrew;
