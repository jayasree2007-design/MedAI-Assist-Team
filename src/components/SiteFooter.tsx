import { Link } from "@tanstack/react-router";
import { ShieldAlert } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-muted/40">
      <div className="container mx-auto grid gap-10 px-4 py-14 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            {/* MedAI Assist Logo */}
            <div className="flex h-10 w-10 items-center justify-center">
              <img
                src="src/assets/logo.webp"
                alt="MedAI Assist Logo"
                className="h-10 w-10 object-contain"
              />
            </div>

            <span className="font-display text-lg font-bold">
              MedAI Assist
            </span>
          </div>

          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            A complete patient journey platform — from understanding your
            first symptom to tracking your full recovery, powered by
            clinical-grade AI.
          </p>
        </div>

        <FooterCol
          title="Product"
          links={[
            ["Symptom AI", "/symptom-analyzer"],
            ["Reports", "/reports"],
            ["Recovery", "/recovery"],
            ["Appointments", "/appointment"],
          ]}
        />

        <FooterCol
          title="Company"
          links={[
            ["About", "/"],
            ["Doctors", "/doctors"],
            ["Contact", "/"],
          ]}
        />

        <FooterCol
          title="Legal"
          links={[
            ["Privacy Policy", "/"],
            ["Terms of Service", "/"],
          ]}
        />
      </div>

      <div className="border-t border-border">
        <div className="container mx-auto flex flex-col gap-3 px-4 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} MedAI Assist. All rights reserved.</p>

          <p className="flex items-start gap-2 md:max-w-2xl md:justify-end md:text-right">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
            This AI assistant does not replace professional medical advice.
            Always consult a qualified healthcare professional for diagnosis
            and treatment.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold">{title}</h4>

      <ul className="space-y-2 text-sm text-muted-foreground">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link
              to={href}
              className="transition hover:text-foreground"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}