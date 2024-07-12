"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { logout } from "@/server/actions";
import { CircleUser } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CookiesSchema } from "@/schemas";
import { z } from "zod";
const profile = ({ name, value }: z.infer<typeof CookiesSchema>) => {
  let userType = "";
  if (value === "Provider") {
    userType = "care-provider";
  } else if (value === "Customer") {
    userType = "customer";
  }
  return value ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className=" hover:bg-custom-green">
        <Button
          variant="secondary"
          size="iconLarge"
          className="rounded-full bg-custom-green"
          style={{ color: "#282e1c" }}
        >
          <CircleUser className="h-9 w-9 " color="#f5f7f2" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`/${userType}/user-settings`} className="w-full">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <div>
      <Button variant="customGhost" className="bg-custom-green text-custom-nav">
        <Link href="/auth/login">
          <span>Login</span>
        </Link>
      </Button>
      <Button
        variant="customOutline"
        className="bg-custom-green text-custom-nav  border-custom-nav"
      >
        <Link href="/auth/role">
          <span>Register</span>
        </Link>
      </Button>
    </div>
  );
};

export default profile;
