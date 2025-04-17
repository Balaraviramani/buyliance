
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { CreditCard } from "lucide-react";

interface PaymentMethodProps {
  paymentMethod: string;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
  formData: {
    cardNumber: string;
    expiryDate: string;
    cvc: string;
    agreeTerms: boolean;
  };
  handleCardNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleExpiryDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  paymentMethod,
  setPaymentMethod,
  formData,
  handleCardNumberChange,
  handleExpiryDateChange,
  handleChange,
  setFormData,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold mb-4">Payment Method</h2>
      
      <RadioGroup
        value={paymentMethod}
        onValueChange={setPaymentMethod}
        className="space-y-4"
      >
        <div className="flex items-center space-x-3 border rounded-md p-3">
          <RadioGroupItem value="creditCard" id="creditCard" />
          <Label htmlFor="creditCard" className="flex-1 flex items-center">
            <CreditCard className="mr-2 h-5 w-5" />
            Credit / Debit Card
          </Label>
          <div className="flex space-x-1">
            <div className="w-8 h-5 bg-blue-500 rounded text-white flex items-center justify-center text-xs">VISA</div>
            <div className="w-8 h-5 bg-red-500 rounded text-white flex items-center justify-center text-xs">MC</div>
            <div className="w-8 h-5 bg-green-500 rounded text-white flex items-center justify-center text-xs">AMEX</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 border rounded-md p-3">
          <RadioGroupItem value="upi" id="upi" />
          <Label htmlFor="upi" className="flex-1 flex items-center">
            <span className="mr-2 text-green-600 font-bold">UPI</span>
            UPI / Google Pay / PhonePe
          </Label>
        </div>
        
        <div className="flex items-center space-x-3 border rounded-md p-3">
          <RadioGroupItem value="cod" id="cod" />
          <Label htmlFor="cod" className="flex-1">
            Cash on Delivery (COD)
          </Label>
        </div>
      </RadioGroup>
      
      {paymentMethod === "creditCard" && (
        <div className="mt-4 space-y-4">
          <div>
            <Label htmlFor="cardNumber">Card Number *</Label>
            <Input
              id="cardNumber"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={handleCardNumberChange}
              maxLength={19}
              required={paymentMethod === "creditCard"}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiryDate">Expiry Date *</Label>
              <Input
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleExpiryDateChange}
                maxLength={5}
                required={paymentMethod === "creditCard"}
              />
            </div>
            <div>
              <Label htmlFor="cvc">CVC *</Label>
              <Input
                id="cvc"
                name="cvc"
                placeholder="123"
                value={formData.cvc}
                onChange={handleChange}
                maxLength={4}
                required={paymentMethod === "creditCard"}
              />
            </div>
          </div>
        </div>
      )}

      {paymentMethod === "upi" && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-600 mb-2">
            You will be prompted to complete the payment using your preferred UPI app after placing the order.
          </p>
          <div className="flex space-x-4 mt-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Google_Pay_logo.svg/512px-Google_Pay_logo.svg.png" alt="Google Pay" className="h-8" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/PhonePe_Logo.svg/512px-PhonePe_Logo.svg.png" alt="PhonePe" className="h-8" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/512px-UPI-Logo-vector.svg.png" alt="UPI" className="h-8" />
          </div>
        </div>
      )}

      {paymentMethod === "cod" && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-600">
            Pay in cash when your order is delivered. Please have the exact amount ready.
          </p>
          <p className="text-sm text-red-600 mt-2">
            Note: Cash on Delivery is available only for orders below ₹10,000.
          </p>
        </div>
      )}
      
      <div className="mt-6">
        <div className="flex items-center mb-4">
          <Checkbox 
            id="agreeTerms" 
            name="agreeTerms" 
            checked={formData.agreeTerms}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, agreeTerms: checked as boolean })
            }
            required
          />
          <label htmlFor="agreeTerms" className="ml-2 text-sm text-gray-600">
            I agree to the <a href="#" className="text-brand hover:underline">Terms and Conditions</a> and <a href="#" className="text-brand hover:underline">Privacy Policy</a>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
