
import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { CreditCard } from "lucide-react";

interface PaymentMethodProps {
  paymentMethod: string;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
  handleCardNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleExpiryDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  paymentMethod,
  setPaymentMethod,
  handleCardNumberChange,
  handleExpiryDateChange,
}) => {
  const { control, formState: { errors } } = useFormContext();

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
          <label htmlFor="creditCard" className="flex-1 flex items-center">
            <CreditCard className="mr-2 h-5 w-5" />
            Credit / Debit Card
          </label>
          <div className="flex space-x-1">
            <div className="w-8 h-5 bg-blue-500 rounded text-white flex items-center justify-center text-xs">VISA</div>
            <div className="w-8 h-5 bg-red-500 rounded text-white flex items-center justify-center text-xs">MC</div>
            <div className="w-8 h-5 bg-green-500 rounded text-white flex items-center justify-center text-xs">AMEX</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 border rounded-md p-3">
          <RadioGroupItem value="upi" id="upi" />
          <label htmlFor="upi" className="flex-1 flex items-center">
            <span className="mr-2 text-green-600 font-bold">UPI</span>
            UPI / Google Pay / PhonePe
          </label>
        </div>
        
        <div className="flex items-center space-x-3 border rounded-md p-3">
          <RadioGroupItem value="cod" id="cod" />
          <label htmlFor="cod" className="flex-1">
            Cash on Delivery (COD)
          </label>
        </div>
      </RadioGroup>
      
      {paymentMethod === "creditCard" && (
        <div className="mt-4 space-y-4">
          <FormField
            control={control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card Number *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    onChange={handleCardNumberChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="MM/YY"
                      maxLength={5}
                      onChange={handleExpiryDateChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={control}
              name="cvc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVC *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123"
                      maxLength={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
        <FormField
          control={control}
          name="agreeTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I agree to the <a href="#" className="text-brand hover:underline">Terms and Conditions</a> and <a href="#" className="text-brand hover:underline">Privacy Policy</a>
                </FormLabel>
                {errors.agreeTerms && (
                  <p className="text-sm font-medium text-destructive">{errors.agreeTerms.message as string}</p>
                )}
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default PaymentMethod;
