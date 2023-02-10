// components/Navigation.tsx
import NavLink from "./components/NavLink";

const Navigation: React.FC = () => {
  return (
    <nav className="flex mt-8">
      <NavLink href="/about" label="About" />
      <NavLink href="/games" label="Games" />
      <NavLink href="/code" label="Code" />
      <NavLink href="/skills" label="Skills" />
    </nav>
  );
};

export default Navigation;
