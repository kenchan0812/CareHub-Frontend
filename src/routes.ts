export const publicRoutes = ["/home"];

export const authRoutes = [
  "/auth/login",
  "/auth/register/customer",
  "/auth/register/care-provider",
  "/auth/role",
  "/auth/otp",
  "/api/otp",
  "/api/request",
  "/api/user",
];

export const DEFAULT_LOGIN_ROUTE_PROVIDER = "/care-provider/dashboard";
export const DEFAULT_LOGIN_ROUTE_CUSTOMER = "/customer/dashboard";

export const protectedRoutes = [
  "/care-provider/dashboard",
  "/care-provider/request",
  "/care-provider/user-settings",
  "/care-provider/chat-page",
  "/customer/dashboard",
  "/customer/offer",
  "/customer/user-settings",
  "/cusomter/profile-creation",
  "/customer/chat-page",
  "/chat",
];
