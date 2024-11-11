import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

const App = () => (
  <ThemeProvider defaultTheme="system" storageKey="chat-theme">
    <Toaster />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;