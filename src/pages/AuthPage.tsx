
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import MainLayout from "@/components/layout/MainLayout";
import { FormControl, FormField, FormItem, Form } from "@/components/ui/form";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

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

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Create separate form instances for login and register
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
  });

  // Reset forms when switching between login and register
  const handleSwitchForm = (toLogin: boolean) => {
    if (toLogin && !isLogin) {
      setIsLogin(true);
      // Reset register form
      registerForm.reset();
    } else if (!toLogin && isLogin) {
      setIsLogin(false);
      // Reset login form
      loginForm.reset();
    }
  };

  const onLoginSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) throw error;
      toast({
        title: "Success!",
        description: "You have successfully logged in.",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onRegisterSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      // Sign up the user
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
      
      // Check if user was created successfully
      if (signUpData?.user) {
        // Also create a profile record explicitly 
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
        
        // After successful registration, switch to login form
        handleSwitchForm(true);
      }
    } catch (error: any) {
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
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold mb-6">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>

            <div className="mb-6">
              <div className="flex border-b">
                <button
                  className={`px-4 py-2 w-1/2 text-center ${
                    isLogin ? "border-b-2 border-brand font-medium text-brand" : "text-gray-500"
                  }`}
                  onClick={() => handleSwitchForm(true)}
                  type="button"
                >
                  Login
                </button>
                <button
                  className={`px-4 py-2 w-1/2 text-center ${
                    !isLogin ? "border-b-2 border-brand font-medium text-brand" : "text-gray-500"
                  }`}
                  onClick={() => handleSwitchForm(false)}
                  type="button"
                >
                  Register
                </button>
              </div>
            </div>

            {isLogin ? (
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
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
                    control={loginForm.control}
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
            ) : (
              <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={registerForm.control}
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
                      control={registerForm.control}
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
                    control={registerForm.control}
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
                    control={registerForm.control}
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
                    control={registerForm.control}
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
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AuthPage;
