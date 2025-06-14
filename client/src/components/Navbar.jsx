import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Home, Sparkles, BarChart3, Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useauth";
import { Button } from "./ui/button";

const Navbar = () => {
  const pathname = window.location.pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token, logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">Creator Platform</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-2 text-sm font-medium">
          <Link
            to="/"
            className={cn(
              "flex items-center px-3 py-1 rounded-md transition-colors hover:text-primary",
              pathname === "/" ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Home className="h-4 w-4 mr-2" />
            Home
          </Link>
          <Link
            to="/content-assistant"
            className={cn(
              "flex items-center px-3 py-1 rounded-md transition-colors hover:text-primary",
              pathname === "/content-assistant"
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Content Assistant
          </Link>
          <Link
            to="/analytics"
            className={cn(
              "flex items-center px-3 py-1 rounded-md transition-colors hover:text-primary",
              pathname === "/analytics"
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Link>

          {/* Conditional Login/Logout */}
          {token ? (
            <Button variant="outline" size="sm" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-primary"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Nav Links */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-sm font-medium">
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className={cn(
              "block px-3 py-2 rounded-md transition-colors hover:text-primary",
              pathname === "/" ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Home className="inline-block w-4 h-4 mr-2" />
            Home
          </Link>
          <Link
            to="/content-assistant"
            onClick={() => setIsMenuOpen(false)}
            className={cn(
              "block px-3 py-2 rounded-md transition-colors hover:text-primary",
              pathname === "/content-assistant"
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            <Sparkles className="inline-block w-4 h-4 mr-2" />
            Content Assistant
          </Link>
          <Link
            to="/analytics"
            onClick={() => setIsMenuOpen(false)}
            className={cn(
              "block px-3 py-2 rounded-md transition-colors hover:text-primary",
              pathname === "/analytics"
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            <BarChart3 className="inline-block w-4 h-4 mr-2" />
            Analytics
          </Link>

          {/* Mobile Login/Logout */}
          {token ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                logout();
                setIsMenuOpen(false);
              }}
              className="w-full mt-2"
            >
              Logout
            </Button>
          ) : (
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
              <Button variant="outline" size="sm" className="w-full mt-2">
                Login
              </Button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
