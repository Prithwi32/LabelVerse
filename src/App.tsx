
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WagmiProvider } from 'wagmi';
import { config } from './lib/web3-config';
import { ThemeProvider } from './contexts/ThemeContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import Home from "./pages/Home";
import Datasets from "./pages/Datasets";
import Dashboard from "./pages/Dashboard";
import Contribution from "./pages/Contribution";
import AdminPanel from "./pages/AdminPanel";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/datasets" element={<Datasets />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/contribute/:datasetId" element={<Contribution />} />
                  <Route path="/admin" element={<AdminPanel />} />
                  <Route path="/about" element={<About />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              <ThemeToggle />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </ThemeProvider>
);

export default App;
