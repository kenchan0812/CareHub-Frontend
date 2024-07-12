import { NextResponse, type NextRequest } from "next/server";
import { authRoutes, publicRoutes } from "@/routes";
import { CookiesSchema } from "@/schemas";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const cookieToken: unknown = request.cookies.get("session");
  const cookieUserType: unknown = request.cookies.get("userType");
  const validatedToken = CookiesSchema.safeParse(cookieToken);
  const validatedUserType = CookiesSchema.safeParse(cookieUserType);
  //Temporary variable used for determining if the user is a customer or provider
  const customer =
    validatedUserType.success && validatedUserType.data.value === "Customer"
      ? true
      : false;

  if (publicRoutes.includes(request.nextUrl.pathname)) {
    return;
  }

  if (validatedToken.success && request.nextUrl.pathname.startsWith("/chat")) {
    return;
  }
  // If the user is not authenticated and is not an auth route, redirect to the login page
  if (!validatedToken.success && !isAuthRoute) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }
  //If the user is authenticated, he is allowed to use /api route handlers(server side)
  if (validatedToken.success && request.nextUrl.pathname.startsWith("/api")) {
    return;
  }
  //If the user is authenticated and is a customer, redirect to the customer dashboard
  if (
    validatedToken.success &&
    !request.nextUrl.pathname.startsWith("/customer") &&
    customer
  ) {
    return NextResponse.redirect(new URL("/customer/dashboard", request.url));
  }
  //If the user is authenticated and is a provider, redirect to the provider dashboard
  if (
    validatedToken.success &&
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
