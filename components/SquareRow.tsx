// components/square-row.tsx
interface SquareRowProps {
  children: React.ReactNode[];
}

const SquareRow: React.FC<SquareRowProps> = ({ children }) => {
  return <div className="flex flex-wrap">{children}</div>;
};

export default SquareRow;
