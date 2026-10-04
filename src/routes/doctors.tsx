import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { ArrowLeft, Stethoscope } from "lucide-react";
import "@/components/doctors/doctors.css";
import { DOCTORS } from "@/components/doctors/doctors-data";
import { DoctorsBackground } from "@/components/doctors/DoctorsBackground";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import { DoctorProfile } from "@/components/doctors/DoctorProfile";
import { AppointmentBooking } from "@/components/doctors/AppointmentBooking";

export const Route = createFileRoute("/doctors")({
  head: () => ({
    meta: [
      { title: "Our Doctors — MedAI Assist" },
      { name: "description", content: "Meet our experienced healthcare professionals dedicated to providing trusted and personalized care." },
    ],
  }),
  component: DoctorsPage,
});

type View =
  | { name: "list" }
  | { name: "profile"; id: string }
  | { name: "book"; id: string; from: "list" | "profile" };

function DoctorsPage() {
  const [view, setView] = useState<View>({ name: "list" });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [view]);

  const current = view.name === "list" ? undefined : DOCTORS.find((d) => d.id === view.id);
  const toList = () => setView({ name: "list" });

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-sky-50 to-white text-slate-900">
      <DoctorsBackground />
      <div className="relative z-10 mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {view.name === "profile" && current && (
          <DoctorProfile
            key={`profile-${current.id}`} doctor={current} onBack={toList}
            onBook={(d) => setView({ name: "book", id: d.id, from: "profile" })}
          />
        )}

        {view.name === "book" && current && (
          <AppointmentBooking
            key={`book-${current.id}`} doctor={current} onDone={toList}
            onBack={() => setView(view.from === "profile" ? { name: "profile", id: current.id } : { name: "list" })}
          />
        )}

        {(view.name === "list" || !current) && (
          <div className="dr-view-in">
            <Link to="/" className="dr-btn-ghost dr-fade-up rounded-full px-4 py-2 text-sm">
              <ArrowLeft className="h-4 w-4" aria-hidden /> Back to Home
            </Link>

            <header className="dr-fade-up mx-auto mt-6 max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-4 py-1.5 text-sm font-semibold text-blue-800 shadow-sm">
                <Stethoscope className="h-4 w-4" aria-hidden /> MedAI Assist
              </span>
              <h1 className="dr-grad-text mt-4 pb-1 font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Our Doctors
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
                Meet our experienced healthcare professionals dedicated to providing trusted and personalized care.
              </p>
            </header>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {DOCTORS.map((d, i) => (
                <DoctorCard
                  key={d.id} doctor={d} index={i}
                  onView={(doc) => setView({ name: "profile", id: doc.id })}
                  onBook={(doc) => setView({ name: "book", id: doc.id, from: "list" })}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}