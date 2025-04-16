
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-commerce-bg-light py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Buyliance</h1>
            <p className="text-lg text-gray-600 mb-8">
              We're on a mission to revolutionize online shopping with quality products and exceptional service.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2022, Buyliance began with a simple idea: to create an online shopping experience that puts customers first. Our founders, with decades of experience in retail and technology, saw an opportunity to build something better.
              </p>
              <p className="text-gray-600 mb-4">
                What started as a small operation has quickly grown into a trusted marketplace offering thousands of quality products to customers worldwide.
              </p>
              <p className="text-gray-600">
                Despite our growth, our core values remain the same: quality products, fair prices, and exceptional customer service. We believe that shopping online should be easy, enjoyable, and worry-free.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=1974&auto=format&fit=crop" 
                alt="Our Team" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Customer Focus</h3>
              <p className="text-gray-600">
                Every decision we make starts with the question: "How will this benefit our customers?" We're committed to creating experiences that delight.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Quality First</h3>
              <p className="text-gray-600">
                We carefully select every product in our catalog, ensuring it meets our rigorous standards for quality, durability, and value.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Trust & Transparency</h3>
              <p className="text-gray-600">
                We believe in honest pricing, clear policies, and open communication. When you shop with us, there are no surprises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Our Team</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Meet the passionate people behind Buyliance who work tirelessly to bring you the best shopping experience.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <div className="mb-4 relative">
                <img 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop" 
                  alt="John Doe" 
                  className="w-32 h-32 rounded-full mx-auto object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">John Doe</h3>
              <p className="text-brand mb-2">CEO & Founder</p>
              <p className="text-gray-600 text-sm">
                With over 15 years in retail, John leads our vision and strategy.
              </p>
            </div>
            
            {/* Team Member 2 */}
            <div className="text-center">
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop" 
                  alt="Jane Smith" 
                  className="w-32 h-32 rounded-full mx-auto object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Jane Smith</h3>
              <p className="text-brand mb-2">Head of Product</p>
              <p className="text-gray-600 text-sm">
                Jane ensures we offer only the highest quality products.
              </p>
            </div>
            
            {/* Team Member 3 */}
            <div className="text-center">
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop" 
                  alt="Mike Johnson" 
                  className="w-32 h-32 rounded-full mx-auto object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Mike Johnson</h3>
              <p className="text-brand mb-2">Customer Experience</p>
              <p className="text-gray-600 text-sm">
                Mike works to make your shopping experience exceptional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-brand text-white text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Shopping?</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Browse our extensive catalog of quality products and experience shopping the Buyliance way.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/shop">
              <Button size="lg" variant="secondary" className="font-medium">
                Shop Now
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-medium">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default AboutPage;
