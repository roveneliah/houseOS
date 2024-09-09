import Image from "next/image";
import { useState } from "react";

const Header = () => {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    // Implement your connection logic here
    setIsConnected(!isConnected);
  };

  return (
    <header className="flex items-center justify-between bg-base-100 px-4 py-2 shadow-md">
      <div className="flex items-center">
        <Image
          src="/initials.svg"
          alt="Logo"
          width={50}
          height={50}
          className="mr-2"
        />
      </div>
      <button
        onClick={handleConnect}
        className={`btn ${isConnected ? "btn-secondary" : "btn-primary"}`}
      >
        {isConnected ? "Disconnect" : "Connect"}
      </button>
    </header>
  );
};

export default Header;
