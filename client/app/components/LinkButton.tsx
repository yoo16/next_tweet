import Link from "next/link";

interface LinkButtonProps {
    href: string;
    label: string;
    className?: string;
}

const LinkButton = ({ href, label, className }: LinkButtonProps) => {
    className ??= `flex justify-center py-3 my-1 
                    border border-gray-300
                    text-gray-800 bg-white
                    hover:bg-gray-100 
                    rounded-lg`;
    return (
        <Link
            href={href}
            className={className}>
            {label}
        </Link>
    );
}

export default LinkButton;