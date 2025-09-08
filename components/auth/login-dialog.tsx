"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ResponsiveDialog } from "@/components/layout/responsive-dialog";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMarketStore } from "@/store/useMarketStore";
import { apiFetch } from "@/lib/api";
import { useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import Link from "next/link";

const formSchema = z.object({
  email: z.email({
    message: "email must be a valid email",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  captchaToken: z.string().min(1, {
    message: "Please complete the CAPTCHA verification.",
  }),
});

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function LoginDialog({ isOpen, setIsOpen }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuth } = useMarketStore((state) => state);
  const recaptchaRef = useRef<HCaptcha>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      captchaToken: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      await apiFetch("/auth/login", {
        method: "POST",
        data: values,
      });
      form.reset();
      setIsOpen(false);
      setIsAuth(true);
      toast.success("Login successful");
    } catch (error) {
      console.error("error in login dialog", error);
      toast.error(`${error}`);
    } finally {
      resetCaptcha();
      setIsLoading(false);
    }
  }

  const handleCaptchaChange = (token: string | null) => {
    if (token) {
      form.setValue("captchaToken", token);
      form.clearErrors("captchaToken");
    } else {
      form.setValue("captchaToken", "");
    }
  };

  const resetCaptcha = () => {
    if (recaptchaRef.current) {
      recaptchaRef.current.resetCaptcha();
    }
    form.setValue("captchaToken", "");
  };

  return (
    <ResponsiveDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Login"
      description="Login into your profile account."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="jhon@email.com" {...field} />
                </FormControl>
                <FormDescription>This is your user email.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormDescription>This is your user password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="captchaToken"
            render={() => (
              <FormItem>
                <FormLabel>Verificacion</FormLabel>
                <FormControl>
                  <div className="flex justify-center">
                    <HCaptcha
                      sitekey={
                        process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY ||
                        "your-site-key"
                      }
                      onVerify={(token) => handleCaptchaChange(token)}
                      onExpire={() => handleCaptchaChange(null)}
                      onError={() => handleCaptchaChange(null)}
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Por favor verifica que no eres un robot.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col space-y-4 text-xs">
            <Link href="/auth/request-reset">Olvidaste tu contraseña</Link>
            <Link href="/auth/register">Aun no tienes una cuenta?</Link>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="size-4 animate-spin" />}
              Login
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </ResponsiveDialog>
  );
}
