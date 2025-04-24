
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Premium from "./pages/Premium";
import Plugins from "./pages/Plugins";
import Recent from "./pages/Recent";
import Starred from "./pages/Starred";
import Community from "./pages/Community";
import Collaborators from "./pages/Collaborators";
import Terminal from "./pages/Terminal";
import Run from "./pages/Run";
import Help from "./pages/Help";
import GitHub from "./pages/GitHub";
import Settings from "./pages/Settings";
import { useEffect } from "react";

const queryClient = new QueryClient();

function App() {
  // Set dark mode on app initialization
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/plugins" element={<Plugins />} />
            <Route path="/recent" element={<Recent />} />
            <Route path="/starred" element={<Starred />} />
            <Route path="/community" element={<Community />} />
            <Route path="/collaborators" element={<Collaborators />} />
            <Route path="/terminal" element={<Terminal />} />
            <Route path="/run" element={<Run />} />
            <Route path="/help" element={<Help />} />
            <Route path="/github" element={<GitHub />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
