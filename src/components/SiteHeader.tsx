
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.webp";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 m-0 w-full border-b border-blue-300 bg-blue-400 p-0 shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        {/* Logo + Name */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="DevyoraMEDai logo"
            className="h-9 w-9 rounded-xl object-cover shadow-glow"
          />

          <div className="leading-tight">
            <div className="font-display text-base font-bold text-white">
              MedAI Assist
            </div>

            <div className="text-[10px] uppercase tracking-wider text-blue-100">
              Care, intelligently
            </div>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-3 md:flex">
          <Link
            to="/symptom-analyzer"
            className="rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-white transition-all duration-200 hover:border-white hover:bg-white/15"
          >
            Symptom AI
          </Link>

          <Link
            to="/reports"
            className="rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-white transition-all duration-200 hover:border-white hover:bg-white/15"
          >
            Reports
          </Link>

          <Link
            to="/recovery"
            className="rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-white transition-all duration-200 hover:border-white hover:bg-white/15"
          >
            Recovery
          </Link>

          <Link
            to="/doctors"
            className="rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-white transition-all duration-200 hover:border-white hover:bg-white/15"
          >
            For Doctors
          </Link>
        </nav>

        {/* Right Buttons */}
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden text-white hover:bg-white/15 hover:text-white sm:inline-flex"
          >
            <Link to="/appointment">
              Book Appointment
            </Link>
          </Button>

          <Button
            asChild
            size="sm"
            className="border border-white/30 bg-white text-blue-600 hover:bg-blue-50"
          >
            <Link to="/symptom-analyzer">
              Try Symptom AI
            </Link>
          </Button>
        </div>

      </div>
    </header>
  );
}

