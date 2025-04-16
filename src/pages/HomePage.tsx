
import MainLayout from "@/components/layout/MainLayout";
import Hero from "@/components/home/Hero";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import { Button } from "@/components/ui/button";
import { ChevronRight, Truck, ShieldCheck, RotateCcw, Clock, CreditCard, LucideIcon } from "lucide-react";

interface FeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const Feature = ({ icon: Icon, title, description }: FeatureProps) => (
  <div className="flex flex-col items-center text-center p-6 rounded-lg">
    <div className="h-12 w-12 rounded-full bg-brand/10 flex items-center justify-center mb-4">
      <Icon className="h-6 w-6 text-brand" />
    </div>
    <h3 className="font-semibold text-lg mb-2">{title}</h3>
    <p className="text-gray-500">{description}</p>
  </div>
);

const HomePage = () => {
  return (
    <MainLayout>
      <Hero />
      
      <FeaturedCategories />
      
      <FeaturedProducts />
      
      {/* Features section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Why Shop With Us</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              We're dedicated to providing you with the best shopping experience possible
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Feature 
              icon={Truck}
              title="Free Shipping"
              description="Free shipping on all orders over $50"
            />
            <Feature 
              icon={ShieldCheck}
              title="Secure Payments"
              description="We use encrypted SSL security for your transactions"
            />
            <Feature 
              icon={RotateCcw}
              title="Easy Returns"
              description="30-day money back guarantee if you're not satisfied"
            />
            <Feature 
              icon={Clock}
              title="24/7 Support"
              description="Our customer service team is always here to help"
            />
          </div>
        </div>
      </section>
      
      {/* Newsletter section */}
      <section className="py-16 bg-commerce-bg-light">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 mb-8">
              Be the first to know about new arrivals, special offers, and sales
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow rounded-md border border-gray-300 px-4 py-2 focus:border-brand focus:outline-none"
                required
              />
              <Button type="submit">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;
