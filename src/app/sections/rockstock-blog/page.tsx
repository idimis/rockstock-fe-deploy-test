"use client";

import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Image from 'next/image'; 
import Link from 'next/link';

import blogImage1 from '@/public/darkacademia.webp';
import blogImage2 from '@/public/dark.jpeg';
import blogImage3 from '@/public/darkinspiration.jpeg';

const blogPosts = [
  {
    id: 1,
    title: "The Rise of Gothic Furniture",
    excerpt: "Explore how gothic aesthetics are making a comeback in modern furniture design.",
    image: blogImage1,
    link: "/blog/rise-of-gothic-furniture"
  },
  {
    id: 2,
    title: "Alternative Home Decor: A Rocker's Guide",
    excerpt: "How to transform your living space into a true alternative haven.",
    image: blogImage2,
    link: "/blog/alternative-home-decor"
  },
  {
    id: 3,
    title: "Why Dark Academia and Rock Styles Merge Perfectly",
    excerpt: "A deep dive into the aesthetic fusion of Dark Academia and rock culture.",
    image: blogImage3,
    link: "/blog/dark-academia-rock"
  }
];

const RockstockBlog = () => {
  return (
    <div className="min-h-screen font-sans">
      <Header />
      <div className="container mx-auto max-w-6xl px-4 py-10 md:py-20">
        
        {/* Blog Header */}
        <section className="mb-10 md:mb-20 text-center"> 
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-red-600">Rockstock Blog</h1>
          <p className="text-base md:text-lg mb-6 max-w-2xl mx-auto leading-relaxed">
            Dive into stories, inspirations, and deep dives into the world of alternative design and rock culture.
          </p>
        </section>

        {/* Blog Post List */}
        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <Image 
                src={post.image} 
                alt={post.title} 
                className="w-full object-cover" 
                layout="responsive" 
                width={500} 
                height={300} 
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
                <p className="text-gray-600 mt-2">{post.excerpt}</p>
                <Link href={post.link} passHref>
                  <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition">
                    Read More
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default RockstockBlog;
