import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img src="/img/logo.png" alt="LabelVerse" className="h-8 w-8" />
              <span className="text-xl font-bold">LabelVerse</span>
            </div>
            <p className="text-gray-400 max-w-md">
              Quality labels. Transparent rewards. Join our decentralized data
              labeling platform and earn crypto tokens for contributing
              high-quality data.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/datasets" className="text-gray-400 hover:text-white">
                  Datasets
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-gray-400 hover:text-white"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/contribute"
                  className="text-gray-400 hover:text-white"
                >
                  Contribute
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com"
                  className="text-gray-400 hover:text-white"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@labelverse.com"
                  className="text-gray-400 hover:text-white"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 LabelVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
