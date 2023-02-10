// components/wrapper.tsx
import Profile from "./Profile";
import Navigation from "../Navigation";

const Wrapper: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {children}
    </div>
  );
};

export default Wrapper;
