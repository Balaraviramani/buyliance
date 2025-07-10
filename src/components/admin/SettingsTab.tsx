import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SettingsTab = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium mb-4">Store Settings</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-2">General Settings</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Store Name
              </label>
              <Input defaultValue="Buyliance" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Store Email
              </label>
              <Input defaultValue="contact@buyliance.com" type="email" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <Input defaultValue="+1 (555) 123-4567" />
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">Store Address</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address Line 1
              </label>
              <Input defaultValue="123 Commerce St" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <Input defaultValue="San Francisco" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <Input defaultValue="CA" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP Code
                </label>
                <Input defaultValue="94105" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <Button>Save Settings</Button>
      </div>
    </div>
  );
};

export default SettingsTab;