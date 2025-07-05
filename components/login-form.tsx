"use client";

import { cn } from "@/lib/utils";

import { Card, CardContent} from "@/components/ui/card";
import LoginFormInner from "./LoginFormInner";
import { usePathname } from "next/navigation";
import RegisterFormInner from "./RegistrationForm";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const pathname = usePathname();

  return (
    <div className={cn("flex flex-col gap-6 ", className)} {...props}>
      <Card>
        <CardContent>
          {pathname === "/register" && <RegisterFormInner />}
          {pathname === "/login" && <LoginFormInner />}
        </CardContent>
      </Card>
    </div>
  );
}
