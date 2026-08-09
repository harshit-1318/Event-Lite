import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      // Dashboard protection
      if (pathname.startsWith("/dashboard")) {
        if (!isLoggedIn) return false;

        const role = auth?.user?.role;
        // Admin section
        if (pathname.startsWith("/dashboard/admin")) {
          return role === "ADMIN";
        }
        // Faculty section
        if (pathname.startsWith("/dashboard/faculty")) {
          return role === "FACULTY" || role === "ADMIN";
        }
        // Student section
        if (pathname.startsWith("/dashboard/student")) {
          return role === "STUDENT" || role === "FACULTY" || role === "ADMIN";
        }
        return true;
      }

      // If logged in and visiting login or register, redirect to appropriate dashboard
      if (isLoggedIn && (pathname === "/login" || pathname === "/register")) {
        const role = auth?.user?.role;
        if (role === "ADMIN") {
          return Response.redirect(new URL("/dashboard/admin", nextUrl));
        } else if (role === "FACULTY") {
          return Response.redirect(new URL("/dashboard/faculty", nextUrl));
        } else {
          return Response.redirect(new URL("/dashboard/student", nextUrl));
        }
      }

      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.department = user.department;
        token.rollNo = user.rollNo;
        token.studentClass = user.studentClass;
        token.isActive = user.isActive;
      }
      if (trigger === "update" && session) {
        token.name = session.name ?? token.name;
        token.department = session.department ?? token.department;
        token.rollNo = session.rollNo ?? token.rollNo;
        token.studentClass = session.studentClass ?? token.studentClass;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as any;
        session.user.department = token.department as string | null;
        session.user.rollNo = token.rollNo as string | null;
        session.user.studentClass = token.studentClass as string | null;
        session.user.isActive = token.isActive as boolean;
      }
      return session;
    },
  },
  providers: [], // Configured with Credentials in auth.ts
};
