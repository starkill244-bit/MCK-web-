"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function McKennaGracePortfolio() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Hero Section Staggered Reveal
      gsap.fromTo('.hero-text', 
        { y: 60, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power4.out', delay: 0.1 }
      );
      
      gsap.fromTo('.hero-btn',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.6 }
      );

      // Scroll Reveal for Lower Sections
      gsap.utils.toArray('.reveal-up').forEach((elem) => {
        gsap.fromTo(elem,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: {
              trigger: elem,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-[#ff0055] selection:text-white overflow-x-hidden">
      {/* Enable Smooth Scrolling globally for this page */}
      <style dangerouslySetInnerHTML={{ __html: `html { scroll-behavior: smooth; }` }} />

      {/* 1. Navigation Bar (Sticky & Glassmorphic) */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#050505]/70 border-b border-zinc-900 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <a href="#home" className="text-2xl font-black tracking-tighter uppercase text-white hover:text-[#ff0055] transition-colors duration-300">
            Mckenna Grace
          </a>
          <div className="hidden md:flex space-x-10 text-xs font-bold tracking-[0.2em] text-zinc-400">
            <a href="#home" className="hover:text-white transition-colors duration-300">HOME</a>
            <a href="#music" className="hover:text-white transition-colors duration-300">MUSIC + VIDEO</a>
            <a href="#merch" className="hover:text-white transition-colors duration-300">MERCH</a>
            <a href="#contact" className="hover:text-[#ff0055] transition-colors duration-300">KEEP IN TOUCH</a>
          </div>
        </div>
      </nav>

      <main>
        {/* 2. Hero Section (The Landing Phase) */}
        <header id="home" className="relative h-screen flex flex-col justify-center px-6 overflow-hidden">
          {/* Moody Background Structure & Overlay Tint */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1595166297042-3d8b021d7b3f?auto=format&fit=crop&q=80&w=2000" 
              alt="Mckenna Grace Dark Aesthetic" 
              className="w-full h-full object-cover opacity-30 transform scale-105"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-[#050505]/80 to-[#050505]"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto w-full pt-20">
            <p className="hero-text text-[#ff0055] font-bold tracking-[0.3em] text-xs md:text-sm uppercase mb-6 flex items-center">
              <span className="w-8 h-[1px] bg-[#ff0055] mr-4"></span> The New Single
            </p>
            <h1 className="hero-text text-7xl md:text-[10rem] font-black tracking-tighter uppercase leading-[0.85] text-white mb-10">
              Bones <br /> And All
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <button className="hero-btn relative group overflow-hidden px-10 py-4 bg-transparent border border-zinc-700 text-white font-bold tracking-widest text-xs uppercase transition-colors duration-300 hover:border-[#ff0055]">
                <span className="relative z-10">Listen Now</span>
                <div className="absolute inset-0 w-full h-full bg-[#ff0055] blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
              <button className="hero-btn relative group overflow-hidden px-10 py-4 bg-white text-black font-bold tracking-widest text-xs uppercase hover:bg-zinc-200 transition-colors duration-300">
                <span className="relative z-10 flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  Watch Video
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* 3. Media Showcase (The Discography Grid) */}
        <section id="music" className="py-24 px-6 reveal-up">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-12">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white">Discography</h2>
              <a href="#" className="text-xs font-bold tracking-[0.2em] text-zinc-500 hover:text-[#ff0055] uppercase transition-colors hidden md:block">View All Releases</a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Bones and All", tag: "Single", img: "https://images.unsplash.com/photo-1618525997637-29367df21469?auto=format&fit=crop&q=80&w=800" },
                { title: "It's So Fine", tag: "EP", img: "https://images.unsplash.com/photo-1516280440502-3903823485f7?auto=format&fit=crop&q=80&w=800" },
                { title: "Ugly and Rotten", tag: "Album", img: "https://images.unsplash.com/photo-1505562085718-2e0618b7eb4e?auto=format&fit=crop&q=80&w=800" }
              ].map((item, idx) => (
                <div key={idx} className="group relative aspect-square overflow-hidden bg-zinc-900 border border-zinc-900 hover:border-zinc-700 transition-colors duration-500 cursor-pointer">
                  {/* Strict aspect-square prevents CLS before the image lazy-loads */}
                  <img 
                    src={item.img} 
                    alt={`${item.title} Cover`} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out opacity-70 group-hover:opacity-100" 
                    loading="lazy" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
                    <div>
                      <p className="text-[#ff0055] text-[10px] font-bold tracking-[0.2em] uppercase mb-2">{item.tag}</p>
                      <h3 className="text-2xl font-black tracking-tighter text-white uppercase">{item.title}</h3>
                    </div>
                    {/* Streaming Shortcuts */}
                    <div className="flex space-x-4 text-zinc-400">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 hover:text-white transition-colors"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.54.659.3 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.84.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.56.3z"/></svg>
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 hover:text-white transition-colors"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Video Gallery Section */}
        <section className="py-24 px-6 relative reveal-up">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-black tracking-tighter uppercase mb-10 text-center text-white">
              Featured <span className="text-[#ff0055]">Visuals</span>
            </h2>
            {/* aspect-video utility ensures 16:9 ratio and eliminates mobile CLS */}
            <div className="relative aspect-video w-full overflow-hidden border border-zinc-800 shadow-[0_0_50px_rgba(255,0,85,0.05)]">
              <iframe 
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/I2h-f11O9aU?autoplay=0&controls=1&rel=0"
                title="Mckenna Grace - Casual Kisses (Official Music Video)"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </section>

        {/* 5. "Keep In Touch" Fan Engagement Form */}
        <section id="contact" className="py-32 px-6 bg-zinc-950 border-t border-zinc-900 reveal-up">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4 text-white">Keep In Touch</h2>
            <p className="text-zinc-500 mb-12 text-xs md:text-sm tracking-[0.2em] font-bold uppercase">Join the mailing list for tours, merch & early access.</p>
            
            <form className="space-y-6 text-left" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase ml-1">First Name</label>
                  <input type="text" className="w-full bg-[#050505] border border-zinc-800 px-5 py-4 text-white text-sm focus:outline-none focus:border-[#ff0055] focus:ring-1 focus:ring-[#ff0055] transition-all duration-300" required />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase ml-1">Last Name</label>
                  <input type="text" className="w-full bg-[#050505] border border-zinc-800 px-5 py-4 text-white text-sm focus:outline-none focus:border-[#ff0055] focus:ring-1 focus:ring-[#ff0055] transition-all duration-300" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase ml-1">Email Address</label>
                <input type="email" className="w-full bg-[#050505] border border-zinc-800 px-5 py-4 text-white text-sm focus:outline-none focus:border-[#ff0055] focus:ring-1 focus:ring-[#ff0055] transition-all duration-300" required />
              </div>
              
              <button type="submit" className="w-full group relative overflow-hidden bg-zinc-100 text-black py-5 mt-4 font-bold tracking-widest text-sm uppercase transition-colors">
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">Subscribe</span>
                <div className="absolute inset-0 h-full w-full bg-[#ff0055] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"></div>
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="py-10 border-t border-zinc-900 bg-[#050505] text-center">
        <p className="text-zinc-700 text-[10px] tracking-[0.2em] font-bold uppercase">&copy; {new Date().getFullYear()} Mckenna Grace. All Rights Reserved.</p>
      </footer>
    </div>
  );
    }
                
