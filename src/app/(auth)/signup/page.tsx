import React from "react";
import { SignUp } from "@/app/components";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/app/components/ui/Button";

const SignUpPage = () => {
    return (
        <div className="absolute inset-0">
            <div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20">
                <Link
                    href="/"
                    className={cn(
                        buttonVariants({ variant: 'ghost' }),
                        'self-start -mt-20'
                    )}>
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    <span>Home</span>
                </Link>
                <SignUp />
            </div>
        </div>
    )
}

export default SignUpPage
