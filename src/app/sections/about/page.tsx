"use client";

import Header from '@/components/common/Header';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import Image from 'next/image'; 

import about1 from '@/public/about1.jpg';
import about2 from '@/public/about2.png';

const About = () => {
  const email = "support@rockstock.com"; 
  const subject = "Question about Rockstock"; 
  const body = "Hey Rockstock Team,\n\nI have a question about..."; 
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <div className="min-h-screen font-sans">
      <Header />
      <Navbar />
      <div className="container mx-auto max-w-6xl px-4 py-10 md:py-20">
        
        {/* About Us Section */}
        <section className="mb-10 md:mb-20 flex flex-col items-center mt-8"> 
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-red-600">About Rockstock</h1>
          <p className="text-base md:text-lg mb-6 max-w-2xl mx-auto text-center leading-relaxed">
            Rockstock is where furniture meets rebellion. We design high-quality, vintage, and niche furniture 
            for those who grew up watching MTV, chronically active on MySpace and never really left the mosh pit (mentally). Built to last, made for legends.
          </p>
          <div className="flex justify-center mb-10">
            <div className="w-full max-w-2xl rounded-lg overflow-hidden shadow-lg"> 
              <Image 
                src={about1} 
                alt="Rockstock Showroom" 
                className="rounded-lg object-cover" 
                layout="responsive" 
                width={500} 
                height={300} 
              />
            </div>
          </div>
        </section>

        {/* Our Story */}
<section className="mb-10 md:mb-20">
  <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-red-600">Our Story</h2>
  
  <div className="flex flex-col md:flex-row justify-between items-center gap-8">
    
    {/* Teks Our Story */}
    <div className="md:w-1/2">
      <p className="text-base md:text-lg mb-6 text-justify">
        Rockstock was born from a simple truth: most furniture is boring.
        We wanted pieces that scream personality, built for those who never truly retired from headbanging in their living rooms.
      </p>
    </div>

    <div className="md:w-1/2 flex justify-center">
      <div className="w-full h-80 md:h-96 overflow-hidden rounded-lg shadow-md relative">
        <Image
          src={about2}
          alt="Rockstock Design"
          className="rounded-lg object-cover"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>

  </div>
</section>

        {/* Vision & Mission */}
        <section className="mb-10 md:mb-20"> 
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-red-600">Vision & Mission</h2>
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="md:w-1/2 p-6 shadow-lg rounded-lg"> 
              <h3 className="text-xl md:text-2xl font-bold mb-2">Vision</h3>
              <p className="text-base md:text-lg">
                To revolutionize furniture for the misfits, rebels, and rockstars of the world.
              </p>
            </div>
            <div className="md:w-1/2 border-black p-6 shadow-lg rounded-lg"> 
              <h3 className="text-xl md:text-2xl font-bold mb-2">Mission</h3>
              <p className="text-base md:text-lg">
                To craft unique, high-quality furniture that matches the soul of rock and alternative culture.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-10 md:mb-20">
          <div className="shadow-lg p-6 md:p-10 rounded-lg flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-red-600">Get in Touch</h2>
              <p className="text-base md:text-lg mb-4">
                Have a question, or just want to talk about your favorite band? Hit us up.
              </p>
            </div>
            <a href={mailtoLink} className="bg-red-600 border border-black font-semibold px-4 md:px-6 py-2 rounded-lg shadow hover:bg-green-600 transition md:ml-4">
              Contact Us
            </a>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
