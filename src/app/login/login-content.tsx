"use client";

import Image from "next/image";
import Link from "next/link";

import { FcGoogle } from "react-icons/fc";

import { Background } from "@/components/background";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/language-context";

export function LoginContent() {
  const { t } = useLanguage();

  return (
    <Background>
      <section className="py-28 lg:pt-44 lg:pb-32">
        <div className="container">
          <div className="flex flex-col gap-4">
            <Card className="mx-auto w-full max-w-sm">
              <CardHeader className="flex flex-col items-center space-y-0">
                <Image
                  src="/logo.svg"
                  alt="logo"
                  width={94}
                  height={18}
                  className="mb-7 dark:invert"
                />
                <p className="mb-2 text-2xl font-bold">
                  {t("login.title", "Welcome back")}
                </p>
                <p className="text-muted-foreground">
                  {t("login.subtitle", "Please enter your details.")}
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <Input
                    type="email"
                    placeholder={t("login.email", "Enter your email")}
                    required
                  />
                  <div>
                    <Input
                      type="password"
                      placeholder={t("login.password", "Enter your password")}
                      required
                    />
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        className="border-muted-foreground"
                      />
                      <label
                        htmlFor="remember"
                        className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {t("login.remember", "Remember me")}
                      </label>
                    </div>
                    <a href="#" className="text-primary text-sm font-medium">
                      {t("login.forgot", "Forgot password")}
                    </a>
                  </div>
                  <Button type="submit" className="mt-2 w-full">
                    {t("login.button", "Sign in")}
                  </Button>
                  <Button variant="outline" className="w-full">
                    <FcGoogle className="mr-2 size-5" />
                    {t("login.google", "Sign in with Google")}
                  </Button>
                </div>
                <div className="text-muted-foreground mx-auto mt-8 flex justify-center gap-1 text-sm">
                  <p>{t("login.no_account", "Don't have an account?")}</p>
                  <Link href="/signup" className="text-primary font-medium">
                    {t("login.signup_link", "Sign up")}
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Background>
  );
}
