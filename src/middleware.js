import { NextResponse } from "next/server";

/**
+ * Middleware function that checks the authentication token and redirects the user based on the URL.
+ *
+ * @param {Object} req - The request object.
+ * @return {Object} The response object.
+ */

export function middleware(req) {
  // Extract the authentication token from the request cookies
  const authToken = req.cookies.get("token");
  console.log(req.cookies.token);
  
  // Extract the pathname (path without query parameters) from the requested URL.
  const url = req.nextUrl.pathname;

  // 1. Unauthenticated user trying to access protected pages
  if (!authToken && (url === "/" || url === "/User")) {
    return NextResponse.redirect(`${req.nextUrl.origin}/Login`);
  }

  // 2. Authenticated user trying to access login or register pages
  if (authToken && (url === "/Login" || url === "/Register")) {
    return NextResponse.redirect("http://localhost:3001/User");
  }

  // 3. Authenticated user trying to access valid pages
  if (authToken && (url === "/" || url === "/User")) {
    return NextResponse.next();
  }
  // 4. Default behavior (optional)
  // Default: Allow access for unauthenticated users on non-protected pages
  return NextResponse.next();
}

// Configure the middleware to match specific routes
export const config = {
  matcher: ["/User", "/Login", "/Register", "/"],
};
