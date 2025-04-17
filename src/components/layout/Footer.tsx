
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Footer = () => {
  const { toast } = useToast();

  const handleSocialClick = (platform: string) => {
    toast({
      title: `${platform} Link`,
      description: `You clicked the ${platform} link. This would open our ${platform} page.`,
    });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    
    toast({
      title: "Newsletter Subscription",
      description: `Thank you! ${email} has been subscribed to our newsletter.`,
    });
    
    form.reset();
  };

  return (
    <footer className="bg-commerce-bg-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and description */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-xl font-bold mb-4">Buyliance</h2>
            <p className="text-sm text-gray-300 mb-4">
              Discover exceptional products with an unmatched shopping experience. Quality meets convenience.
            </p>
            <div className="flex space-x-4">
              <button onClick={() => handleSocialClick("Facebook")} className="text-white hover:text-brand-light">
                <Facebook className="h-5 w-5" />
              </button>
              <button onClick={() => handleSocialClick("Twitter")} className="text-white hover:text-brand-light">
                <Twitter className="h-5 w-5" />
              </button>
              <button onClick={() => handleSocialClick("Instagram")} className="text-white hover:text-brand-light">
                <Instagram className="h-5 w-5" />
              </button>
              <button onClick={() => handleSocialClick("Email")} className="text-white hover:text-brand-light">
                <Mail className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-2">Contact Information</h3>
              <div className="text-sm text-gray-300 space-y-2">
                <p className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  123 Main Street, Mumbai, Maharashtra, India
                </p>
                <p className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  +91 98765 43210
                </p>
                <p className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  support@buyliance.in
                </p>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/shop" className="text-gray-300 hover:text-white">All Products</Link></li>
              <li><Link to="/categories" className="text-gray-300 hover:text-white">Categories</Link></li>
              <li><Link to="/shop?featured=true" className="text-gray-300 hover:text-white">Featured</Link></li>
              <li><Link to="/shop?discount=true" className="text-gray-300 hover:text-white">Sale</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact Us</Link></li>
              <li>
                <button 
                  onClick={() => toast({ 
                    title: "Careers", 
                    description: "Our careers page is coming soon!" 
                  })} 
                  className="text-gray-300 hover:text-white"
                >
                  Careers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => toast({ 
                    title: "Blog", 
                    description: "Our blog is coming soon!" 
                  })} 
                  className="text-gray-300 hover:text-white"
                >
                  Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-gray-300 mb-4">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <input 
                type="email" 
                name="email"
                placeholder="Your email address"
                required
                className="w-full px-3 py-2 text-sm text-gray-900 bg-white rounded-md"
              />
              <button 
                type="submit" 
                className="w-full px-3 py-2 text-sm font-medium text-white bg-brand rounded-md hover:bg-brand-dark"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-6 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} Buyliance. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button onClick={() => toast({ title: "Privacy Policy", description: "Our Privacy Policy page is coming soon!" })} className="hover:text-white">
                Privacy Policy
              </button>
              <button onClick={() => toast({ title: "Terms of Service", description: "Our Terms of Service page is coming soon!" })} className="hover:text-white">
                Terms of Service
              </button>
              <button onClick={() => toast({ title: "Cookie Policy", description: "Our Cookie Policy page is coming soon!" })} className="hover:text-white">
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
