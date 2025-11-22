// app/page.tsx
import Hero from '@/components/layout/sections/homepage/Hero';
import ServicesHighlight from '@/components/layout/sections/homepage/ServicesHighlight'; 
import Testimonials from '@/components/layout/sections/homepage/Testimonials';
import BlogHighlight from '@/components/layout/sections/homepage/BlogHighlight';
import Team from '@/components/layout/sections/homepage/Team'; 
import Faq from '@/components/layout/sections/homepage/Faq';
import Cta from '@/components/layout/sections/Cta';
// <-- IMPORT

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesHighlight /> {/* <-- ADD THE COMPONENT HERE */}
      <Testimonials />
      <Team />
      <BlogHighlight /> 
      <Cta />
       <Faq />
      {/* Testimonials will go here next */}
    </>
  );
}