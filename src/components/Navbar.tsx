import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Menu, X, Wallet } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Datasets", href: "/datasets" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "About", href: "/about" },
  ];

  const connectWallet = () => {
    const metamaskConnector = connectors.find(
      (connector) => connector.name === "MetaMask"
    );
    if (metamaskConnector) {
      connect({ connector: metamaskConnector });
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <nav className="bg-white shadow-sm border-b dark:bg-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/img/logo.png"
                alt="LabelVerse"
                className="h-12 w-12"
              />
              <span className="text-xl font-bold text-gray-900">
                LabelVerse
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname === item.href
                    ? "text-orange-600 border-b-2 border-orange-600"
                    : "text-gray-700 hover:text-orange-600"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {isConnected ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {formatAddress(address!)}
                </span>
                <Button variant="outline" onClick={() => disconnect()}>
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button
                onClick={connectWallet}
                className="bg-orange-600 hover:bg-orange-700 dark:text-white"
              >
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-orange-600"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-base font-medium transition-colors ${
                    location.pathname === item.href
                      ? "text-orange-600 bg-orange-50"
                      : "text-gray-700 hover:text-orange-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                {isConnected ? (
                  <div className="space-y-2">
                    <span className="text-sm text-gray-600 block">
                      {formatAddress(address!)}
                    </span>
                    <Button
                      variant="outline"
                      onClick={() => disconnect()}
                      className="w-full"
                    >
                      Disconnect
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={connectWallet}
                    className="w-full bg-orange-600 hover:bg-orange-700"
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    Connect Wallet
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
