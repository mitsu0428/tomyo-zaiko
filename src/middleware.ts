import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: "/:path*",
};

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get("authorization");

  if (basicAuth) {
    const auth = basicAuth.split(" ")[1];
    const [user, password] = atob(auth).split(":");

    // MEMO: 本番で使う時はここにIDとPASSは書かない
    if (user === "okada" && password === "okada") {
      return NextResponse.next();
    }
  }

  return new Response("Auth required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}
