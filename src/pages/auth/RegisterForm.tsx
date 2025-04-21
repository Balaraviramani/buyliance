
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import React from "react";

const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});
type RegisterFormValues = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  onRegisterSuccess: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  isLoading,
  setIsLoading,
  onRegisterSuccess
}) => {
  const { toast } = useToast();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      const { error: signUpError, data: signUpData } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
          },
        },
      });
      if (signUpError) throw signUpError;

      if (signUpData?.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: signUpData.user.id,
            first_name: data.firstName,
            last_name: data.lastName,
            is_admin: false,
            wishlist: []
          });
        if (profileError) {
          console.error("Error creating profile:", profileError);
          toast({
            title: "Warning",
            description: "Account created but profile setup had issues. Some features may be limited.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success!",
            description: "Your account has been created. You can now log in.",
          });
        }
        onRegisterSuccess();
      }
    } catch (error: any) {
      console.error("Registration failed:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field, fieldState }) => (
              <FormItem>
                <Label htmlFor="first-name">First Name</Label>
                <FormControl>
                  <Input 
                    id="first-name"
                    {...field}
                    placeholder="First name"
                  />
                </FormControl>
                {fieldState.error && (
                  <p className="text-sm text-red-500">{fieldState.error.message}</p>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field, fieldState }) => (
              <FormItem>
                <Label htmlFor="last-name">Last Name</Label>
                <FormControl>
                  <Input 
                    id="last-name"
                    {...field}
                    placeholder="Last name"
                  />
                </FormControl>
                {fieldState.error && (
                  <p className="text-sm text-red-500">{fieldState.error.message}</p>
                )}
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <Label htmlFor="register-email">Email</Label>
              <FormControl>
                <Input 
                  id="register-email"
                  type="email"
                  {...field}
                  placeholder="Enter your email"
                />
              </FormControl>
              {fieldState.error && (
                <p className="text-sm text-red-500">{fieldState.error.message}</p>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <FormItem>
              <Label htmlFor="register-password">Password</Label>
              <FormControl>
                <Input 
                  id="register-password"
                  type="password"
                  {...field}
                  placeholder="••••••••"
                />
              </FormControl>
              {fieldState.error && (
                <p className="text-sm text-red-500">{fieldState.error.message}</p>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <FormItem>
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <FormControl>
                <Input 
                  id="confirm-password"
                  type="password"
                  {...field}
                  placeholder="••••••••"
                />
              </FormControl>
              {fieldState.error && (
                <p className="text-sm text-red-500">{fieldState.error.message}</p>
              )}
            </FormItem>
          )}
        />

        <div className="text-sm text-gray-600">
          By registering, you agree to our{" "}
          <a href="#" className="text-brand hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-brand hover:underline">
            Privacy Policy
          </a>
          .
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
