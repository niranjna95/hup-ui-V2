import { Role } from "./helpers/Roles";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import RoleDto from "./dtos/RoleDto";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const pageUrl = req.nextUrl.pathname;
    const token = req.nextauth.token as { user?: { roles?: RoleDto[] } };
    const rolesObject = token.user?.roles || [];
    const roles = rolesObject.map((el) => el.name);

    console.log("This is the roles", roles); // Debugging
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
  matcher: ["/admin/:path*", "/user/:path*", "/booking/:path*"],
};
