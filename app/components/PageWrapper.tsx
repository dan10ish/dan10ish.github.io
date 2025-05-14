"use client";

import { usePathname } from "next/navigation";

export const PageWrapper = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <div>{children}</div>;
};