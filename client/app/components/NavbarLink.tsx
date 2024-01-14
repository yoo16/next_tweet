"use client"

import Link from 'next/link';

interface NavbarLinkProps {
    href: string;
    label: string;
    onClick?: any;
}

const className = "hidden p-3 md:inline-block text-black";

const NavbarLink = (props: NavbarLinkProps) => {
    return (
        <Link href={props.href} className={className}>
            {props.label}
        </Link>
    );
}

export default NavbarLink;