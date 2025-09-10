"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { useMarketStore } from "@/store/useMarketStore";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const formSchema = z.object({
  email: z.email({
    message: "Ingresa un correo valido.",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener minimo 6 caracteres.",
  }),
  captchaToken: z.string().min(1, {
    message: "Porfavor completa el captcha",
  }),
});

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuth } = useMarketStore((state) => state);
  const recaptchaRef = useRef<HCaptcha>(null);
  const router = useRouter();
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
      setIsAuth(true);
      toast.success("Login exitoso");
      router.push("/");
      router.refresh();
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
    <div className="min-h-screen container mx-auto flex items-center justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Iniciar Sesion</CardTitle>
              <CardDescription>Ingresa los datos de tu cuenta.</CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="jhon@email.com" {...field} />
                    </FormControl>
                    <FormDescription>Email de tu cuenta.</FormDescription>
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
                      <Input
                        type="password"
                        placeholder="password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Contraseña de tu cuenta.</FormDescription>
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
                <Link href="/auth/request-reset">Olvidaste tu contraseña?</Link>
                <Link href="/auth/register">Aun no tienes una cuenta?</Link>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading && <Loader2 className="size-4 animate-spin" />}
                Login
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
