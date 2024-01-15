"use client"

import Link from 'next/link';

interface NavbarLinkProps {
    href: string;
    label: string;
    onClick?: () => void;
}

const className = "hidden p-3 md:inline-block text-black";

const NavbarLink = ({ href, label, onClick }: NavbarLinkProps) => {
    return (
        <Link href={href} className={className} onClick={onClick}>
            {label}
        </Link>
    );
}

export default NavbarLink;