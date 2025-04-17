
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

const CustomFooter = () => {
  const { toast } = useToast();
  
  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would send the email to your API
    toast({
      title: "Success!",
      description: "You have been subscribed to our newsletter",
    });
    
    (e.target as HTMLFormElement).reset();
  };

  const handleSocialClick = (platform: string) => {
    toast({
      title: `${platform} clicked`,
      description: `You are now being redirected to our ${platform} page`,
    });
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Buyliance</h3>
            <p className="text-gray-300 mb-4">
              Discover quality products at the best prices. We are committed to providing an exceptional shopping experience.
            </p>
            <div className="flex space-x-3">
              <button onClick={() => handleSocialClick("Facebook")} className="bg-gray-700 hover:bg-brand p-2 rounded-full transition-colors">
                <Facebook size={18} />
              </button>
              <button onClick={() => handleSocialClick("Instagram")} className="bg-gray-700 hover:bg-brand p-2 rounded-full transition-colors">
                <Instagram size={18} />
              </button>
              <button onClick={() => handleSocialClick("Twitter")} className="bg-gray-700 hover:bg-brand p-2 rounded-full transition-colors">
                <Twitter size={18} />
              </button>
              <button onClick={() => handleSocialClick("LinkedIn")} className="bg-gray-700 hover:bg-brand p-2 rounded-full transition-colors">
                <Linkedin size={18} />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-300 hover:text-white transition-colors">Shop</Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-300 hover:text-white transition-colors">Categories</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-xl font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/account/orders" className="text-gray-300 hover:text-white transition-colors">Track Order</Link>
              </li>
              <li>
                <Link to="/faqs" className="text-gray-300 hover:text-white transition-colors">FAQs</Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="text-gray-300 hover:text-white transition-colors">Shipping Policy</Link>
              </li>
              <li>
                <Link to="/return-policy" className="text-gray-300 hover:text-white transition-colors">Return Policy</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">Subscribe to our newsletter for exclusive offers and updates.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col space-y-2">
              <div className="flex">
                <Input 
                  type="email" 
                  name="email" 
                  placeholder="Enter your email" 
                  className="rounded-r-none bg-gray-800 border-gray-700 focus:ring-brand"
                />
                <Button type="submit" className="rounded-l-none">Subscribe</Button>
              </div>
            </form>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-center">
            <Mail className="text-brand mr-3" />
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <a href="mailto:support@buyliance.com" className="text-gray-300 hover:text-white">support@buyliance.com</a>
            </div>
          </div>
          <div className="flex items-center">
            <Phone className="text-brand mr-3" />
            <div>
              <p className="text-sm text-gray-400">Phone</p>
              <a href="tel:+919876543210" className="text-gray-300 hover:text-white">+91 98765 43210</a>
            </div>
          </div>
          <div className="flex items-center">
            <MapPin className="text-brand mr-3" />
            <div>
              <p className="text-sm text-gray-400">Address</p>
              <address className="not-italic text-gray-300">123 Commerce Street, Bangalore, Karnataka, India</address>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Buyliance. All rights reserved.</p>
          <p className="mt-1">
            <Link to="/terms" className="hover:text-white">Terms of Service</Link> | <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default CustomFooter;
