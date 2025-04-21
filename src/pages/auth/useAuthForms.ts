
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Login schema/types
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export type LoginFormValues = z.infer<typeof loginSchema>;

// Register schema/types
const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});
export type RegisterFormValues = z.infer<typeof registerSchema>;

interface UseAuthFormsResult {
  isLogin: boolean;
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  handleSwitchForm: (toLogin: boolean) => void;
  loginForm: ReturnType<typeof useForm<LoginFormValues>>;
  registerForm: ReturnType<typeof useForm<RegisterFormValues>>;
  onSubmitLogin: (values: LoginFormValues) => Promise<void>;
  onSubmitRegister: (values: RegisterFormValues) => Promise<void>;
}

export function useAuthForms(): UseAuthFormsResult {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
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
    mode: "onChange",
  });

  const handleSwitchForm = (toLogin: boolean) => {
    if (toLogin && !isLogin) {
      setIsLogin(true);
      registerForm.reset();
    } else if (!toLogin && isLogin) {
      setIsLogin(false);
      loginForm.reset();
    }
    setIsLoading(false);
  };

  const onSubmitLogin = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
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

  const onSubmitRegister = async (data: RegisterFormValues) => {
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
        handleSwitchForm(true);
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

  return {
    isLogin,
    isLoading,
    setIsLoading,
    handleSwitchForm,
    loginForm,
    registerForm,
    onSubmitLogin,
    onSubmitRegister,
  };
}

