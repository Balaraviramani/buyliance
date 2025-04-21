
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import React from "react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ isLoading, setIsLoading }) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      if (error) throw error;

      toast({ title: "Success!", description: "You have successfully logged in." });
      navigate("/");
    } catch (error: any) {
      console.error("Login failed:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <Label htmlFor="login-email">Email</Label>
              <FormControl>
                <Input
                  id="login-email"
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
              <Label htmlFor="login-password">Password</Label>
              <FormControl>
                <Input
                  id="login-password"
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
        <div className="text-right">
          <a href="#" className="text-sm text-brand hover:underline">
            Forgot password?
          </a>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Loading..." : "Sign In"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
