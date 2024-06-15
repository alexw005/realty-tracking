"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
    {
        href: "/",
        label: "Home",
    },
    {
        href: "/dashboard",
        label: "Dashboard",
    }

];

export default function Header() {
    const pathname = usePathname();

    return (
        <header className="flex justify-between items-center py-4 px-7 border-b">
            <Link href="/">
                <h1>CompanyLogo</h1>
            </Link>

            <nav>
                <ul className="flex gap-x-5 text-[14px]">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                className={`${pathname === link.href ? "text-zinc-900" : "text-zinc-400"
                                    }`}
                                href={link.href}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}