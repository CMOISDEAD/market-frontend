"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
import { Loader2, Lock, CheckCircle, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

const formSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, {
        message: "Password must be at least 6 characters long",
      })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const NewPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const { id: token } = useParams<{ id: string }>();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setTokenValid(false);
        return;
      }

      try {
        await apiFetch("/auth/request-verify", {
          method: "POST",
          data: {
            token: token,
          },
        });

        setTokenValid(true);
      } catch (error) {
        console.error("Error validating token:", error);
        setTokenValid(false);
      }
    };

    validateToken();
  }, [token]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!token) {
      toast.error("Invalid reset token");
      return;
    }

    try {
      setIsLoading(true);

      await apiFetch(`/auth/reset-password/${token}`, {
        method: "PATCH",
        data: values,
      });

      setIsSuccess(true);
      toast.success("Password reset successfully");
      form.reset();

      router.push("/");
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  // Loading state while validating token
  if (tokenValid === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="ml-2">Validating reset link...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Invalid token
  if (!tokenValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-destructive">
              Invalid Reset Link
            </CardTitle>
            <CardDescription>
              This password reset link is invalid or has expired. Please request
              a new one.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button asChild className="w-full">
                <Link href="/reset-password">Request new reset link</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Success state
  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>Password reset successful</CardTitle>
            <CardDescription>
              Your password has been successfully reset. You will be redirected
              to the home page shortly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <CardTitle>Set new password</CardTitle>
          <CardDescription>
            Enter your new password below. Make sure it&apos;s strong and
            secure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your new password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Password must be at least 6 characters with uppercase,
                      lowercase, and number.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm your new password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Re-enter your password to confirm.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  Reset password
                </Button>

                <Button asChild variant="outline" className="w-full">
                  <Link href="/">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </Link>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewPassword;
