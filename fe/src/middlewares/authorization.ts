import { NextRequest, NextResponse } from "next/server";
import filter from "./filter";
import checkOwner from "./checkOwner";
const authorization = async (req: NextRequest): Promise<NextResponse> => {
  if (req.nextUrl.pathname.startsWith("/guest") &&  req.nextUrl.pathname !== "/guest/auth") return filter(req, "guest");
  if (req.nextUrl.pathname.startsWith("/admin")) return filter(req, "admin");
  if (
    req.nextUrl.pathname.startsWith("/owner") &&
    req.nextUrl.pathname !== "/owner/register" &&
    req.nextUrl.pathname !== "/owner/auth"
  ) {
    if (req.nextUrl.pathname === "/owner") return checkOwner(req);
    else return filter(req, "owner");
  }
  return NextResponse.next();
};

export default authorization;
