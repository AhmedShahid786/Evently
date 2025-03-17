import { NextRequest, NextResponse } from "next/server";
import { auth } from "../auth";

export async function middleware(request) {
  console.log(
    "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Middleware Working >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
  );

  const session = await auth();
  const url = request.nextUrl;

  if (session) {
    if (
      url.pathname.startsWith("/login") ||
      url.pathname.startsWith("/signup") ||
      url.pathname.startsWith("/verify") ||
      url.pathname.startsWith("/info")
    ) {
      if (session.user.role === "user") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      } else {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    } else if (url.pathname.startsWith("/admin")) {
      if (session.user.role === "user") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
  } else if (
    url.pathname.startsWith("/dashboard") ||
    url.pathname.startsWith("/admin")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matchers: ["/login", "/signup", "/", "/verify", "/admin/:path*"],
};

// export { auth as middleware } from "@/auth";
