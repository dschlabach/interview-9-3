"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  PersonIcon,
  ResetIcon,
  TableIcon,
} from "@radix-ui/react-icons";

const Nav = () => {
  const pathname = usePathname();
  return (
    <nav className="w-52 bg-emerald-900 h-screen fixed left-0 top-0 p-3 py-6">
      <ul className="flex flex-col gap-2 text-emerald-100">
        <li>
          {pathname === "/" ? (
            <button
              className="w-full flex items-center gap-2 text-left hover:text-white rounded hover:bg-emerald-800 px-3 py-2 transition-all duration-75"
              onClick={() => {
                localStorage.removeItem("userId");
                window.location.reload();
              }}
            >
              <ResetIcon className="size-4" />
              <span>Reset user</span>
            </button>
          ) : (
            <Link
              href="/"
              className="w-full flex items-center gap-2 text-left hover:text-white rounded hover:bg-emerald-800 px-3 py-2 transition-all duration-75"
            >
              <HomeIcon className="size-4" />
              <span>Onboarding</span>
            </Link>
          )}
        </li>
        <li>
          <Link
            href="/admin"
            className="w-full flex items-center gap-2 text-left hover:text-white rounded hover:bg-emerald-800 px-3 py-2 transition-all duration-75"
          >
            <PersonIcon className="size-4" />
            <span>Admin</span>
          </Link>
        </li>
        <li>
          <Link
            href="/data"
            className="w-full flex items-center gap-2 text-left hover:text-white rounded hover:bg-emerald-800 px-3 py-2 transition-all duration-75"
          >
            <TableIcon className="size-4" />
            <span>Data</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
