export const publicRoutes = ["/"];

export const authRoutes = [
  "/auth/login",
  "/auth/register/customer",
  "/auth/register/care-provider",
  "/auth/role",
];

export const DEFAULT_LOGIN_ROUTE_PROVIDER = "/care-provider/dashboard";
export const DEFAULT_LOGIN_ROUTE_CUSTOMER = "/customer/dashboard";

export const protectedRoutes = [
  "/care-provider/dashboard",
  "/care-provider/offer",
  "/care-provider/request",
  "/care-provider/user-settings",
  "/customer/dashboard",
  "/customer/request",
  "/customer/offer",
  "/customer/user-settings",
  "/cusomter/profile-creation",
];
