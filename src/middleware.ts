import { Role } from "./helpers/Roles";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import RoleDto from "./dtos/RoleDto";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const pageUrl = req.nextUrl.pathname;

    const rolesObject = (req.nextauth.token?.roles || []) as RoleDto[];

    const roles = rolesObject.map((el) => el.name);

    if (pageUrl.startsWith("/admin") && roles.indexOf(Role.Administrator) < 0) {
      return NextResponse.redirect(new URL("/account/access-denied", req.url));
    }

    if (pageUrl.startsWith("/user") && roles.indexOf(Role.Administrator) < 0) {
      return NextResponse.redirect(new URL("/account/access-denied", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
