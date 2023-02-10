// components/NavLink.tsx
import Link from "next/link";

interface NavLinkProps {
  href: string;
  label: string;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label, className }) => {
  return (
    <Link href={href}>
      <a
        className={
          "px-4 py-2 text-sm font-medium text-gray-700 transition duration-150 ease-in-out rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:text-gray-900 focus:bg-gray-50 " +
          className
        }
      >
        {label}
      </a>
    </Link>
  );
};

export default NavLink;
