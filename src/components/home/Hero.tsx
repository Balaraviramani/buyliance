
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-commerce-bg-light">
      <div className="container mx-auto flex flex-col md:flex-row items-center py-16 px-6">
        <div className="w-full md:w-1/2 z-10">
          <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight text-commerce-bg-dark mb-6">
            Discover <span className="text-brand">Premium Products</span> for Modern Living
          </h1>
          <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-lg">
            Shop the latest trends and essentials with confidence. Quality products, exceptional service, and fast delivery.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/shop">
              <Button size="lg" className="font-medium">
                Shop Now
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="font-medium">
                Contact Us
              </Button>
            </Link>
          </div>
          <div className="flex items-center mt-10 gap-6">
            <div className="text-center">
              <p className="font-bold text-2xl text-brand">10k+</p>
              <p className="text-sm text-gray-600">Products</p>
            </div>
            <div className="h-8 border-r border-gray-300"></div>
            <div className="text-center">
              <p className="font-bold text-2xl text-brand">15k+</p>
              <p className="text-sm text-gray-600">Happy Customers</p>
            </div>
            <div className="h-8 border-r border-gray-300"></div>
            <div className="text-center">
              <p className="font-bold text-2xl text-brand">99%</p>
              <p className="text-sm text-gray-600">Satisfaction</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 mt-12 md:mt-0 flex justify-center md:justify-end">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-brand-light rounded-full opacity-20 blur-3xl"></div>
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
              alt="Featured Products"
              className="relative z-10 max-w-md rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
