
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface ShippingAddressProps {
  formData: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    saveInfo: boolean;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const ShippingAddress: React.FC<ShippingAddressProps> = ({
  formData,
  handleChange,
  setFormData,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
      
      <div className="mb-4">
        <Label htmlFor="address">Street Address *</Label>
        <Input
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="state">State/Province *</Label>
          <Input
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="zipCode">PIN Code *</Label>
          <Input
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            disabled
          />
        </div>
      </div>
      
      <div className="flex items-center mt-4">
        <Checkbox
          id="saveInfo"
          name="saveInfo"
          checked={formData.saveInfo}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, saveInfo: checked as boolean })
          }
        />
        <label
          htmlFor="saveInfo"
          className="text-sm text-gray-600 ml-2"
        >
          Save this information for next time
        </label>
      </div>
    </div>
  );
};

export default ShippingAddress;
