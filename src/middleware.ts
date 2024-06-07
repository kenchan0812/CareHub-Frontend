import { NextResponse, type NextRequest } from "next/server";
import { publicRoutes, authRoutes, protectedRoutes } from "@/routes";
import { CookiesSchema } from "@/schemas";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const cookie: unknown = request.cookies.get("session");
  const validatedCookie = CookiesSchema.safeParse(cookie);
  //Temporary variable used for determining if the user is a customer or provider
  const customer = process.env.CUSTOMER === "false" ? false : true;

  //If the user is not authenticated and is not an auth route, redirect to the login page
  if (!validatedCookie.success && !isAuthRoute) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }
  //If the user is authenticated, he is allowed to use /api route handlers(server side)
  if (validatedCookie.success && request.nextUrl.pathname.startsWith("/api")) {
    return;
  }
  //If the user is authenticated and is a customer, redirect to the customer dashboard
  if (
    validatedCookie.success &&
    !request.nextUrl.pathname.startsWith("/customer") &&
    customer
  ) {
    return NextResponse.redirect(new URL("/customer/dashboard", request.url));
  }
  //If the user is authenticated and is a provider, redirect to the provider dashboard
  if (
    validatedCookie.success &&
    !request.nextUrl.pathname.startsWith("/care-provider") &&
    !customer
  ) {
    return NextResponse.redirect(
      new URL("/care-provider/dashboard", request.url)
    );
  }
  return null;
}
//Runs the middleware every time the matcher is triggered
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
