"use client";

import Image from "next/image";
import Link from "next/link";

import { FcGoogle } from "react-icons/fc";

import { Background } from "@/components/background";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/language-context";

const Signup = () => {
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
                  {t("signup.title", "Start your free trial")}
                </p>
                <p className="text-muted-foreground">
                  {t("signup.subtitle", "Sign up in less than 2 minutes.")}
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <Input
                    type="text"
                    placeholder={t("signup.name", "Enter your name")}
                    required
                  />
                  <Input
                    type="email"
                    placeholder={t("signup.email", "Enter your email")}
                    required
                  />
                  <div>
                    <Input
                      type="password"
                      placeholder={t("signup.password", "Enter your password")}
                      required
                    />
                    <p className="text-muted-foreground mt-1 text-sm">
                      {t(
                        "signup.password_hint",
                        "Must be at least 8 characters.",
                      )}
                    </p>
                  </div>
                  <Button type="submit" className="mt-2 w-full">
                    {t("signup.button", "Create an account")}
                  </Button>
                  <Button variant="outline" className="w-full">
                    <FcGoogle className="mr-2 size-5" />
                    {t("signup.google", "Sign up with Google")}
                  </Button>
                </div>
                <div className="text-muted-foreground mx-auto mt-8 flex justify-center gap-1 text-sm">
                  <p>{t("signup.has_account", "Already have an account?")}</p>
                  <Link href="/login" className="text-primary font-medium">
                    {t("signup.login_link", "Log in")}
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Background>
  );
};

export default Signup;
