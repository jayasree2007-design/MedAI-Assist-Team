import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Calendar,
  Clock,
  CheckCircle2,
  ArrowLeft,
  Stethoscope,
  User as UserIcon,
  Phone,
  Mail,
  RotateCcw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/appointment")({
  head: () => ({
    meta: [
      { title: "Book Appointment — AI Health Assistant" },
      {
        name: "description",
        content: "Book an appointment with a qualified doctor in seconds.",
      },
    ],
  }),
  component: Appointment,
});

const DOCTORS = [
  "Dr. Koteswara — Orthopedic Surgeon",
  "Dr. Anil Sharma — General Physician",
  "Dr. Priya Nair — Internal Medicine",
  "Dr. Rajiv Khanna — Cardiologist",
  "Dr. Meera Iyer — Pediatrician",
  "Dr. Sameer Ali — Dermatologist",
  "Dr. Hassan Omar — ENT Specialist",
  "Dr. Naomi Park — Neurologist",
];

const TIMES = [
  "09:00",
  "10:30",
  "12:00",
  "14:00",
  "15:30",
  "17:00",
  "18:30",
];

function Appointment() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    doctor: "",
  });

  const [confirmed, setConfirmed] = useState<typeof form | null>(null);

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    doctor: "",
  });

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({
      ...f,
      [k]: v,
    }));

    setErrors((e) => ({
      ...e,
      [k]: "",
    }));
  }

  // -----------------------------
  // FORM VALIDATION
  // -----------------------------

  function validateForm() {
    const newErrors = {
      name: "",
      phone: "",
      email: "",
      date: "",
      time: "",
      doctor: "",
    };

    // -----------------------------
    // NAME VALIDATION
    // -----------------------------

    if (!form.name.trim()) {
      newErrors.name = "Patient name is required";
    } else if (!/^[A-Za-z ]+$/.test(form.name)) {
      newErrors.name = "Name can contain only letters and spaces";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must contain at least 2 characters";
    } else if (form.name.trim().length > 50) {
      newErrors.name = "Name must not exceed 50 characters";
    }

    // -----------------------------
    // PHONE VALIDATION
    // -----------------------------

    if (!form.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Phone number must contain exactly 10 digits";
    }

    // -----------------------------
    // EMAIL VALIDATION
    // -----------------------------

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z][A-Za-z0-9-]*\.[A-Za-z]{2,}$/.test(
        form.email
      )
    ) {
      newErrors.email = "Enter a valid email address";
    }
    // -----------------------------
    // DOCTOR VALIDATION
    // -----------------------------

    if (!form.doctor) {
      newErrors.doctor = "Please select a doctor";
    }

    // -----------------------------
    // DATE VALIDATION
    // -----------------------------

    if (!form.date) {
      newErrors.date = "Please select an appointment date";
    } else {
      const today = new Date();

      today.setHours(0, 0, 0, 0);

      const selectedDate = new Date(`${form.date}T00:00:00`);

      if (selectedDate < today) {
        newErrors.date = "Appointment date cannot be in the past";
      }
    }

    // -----------------------------
    // TIME VALIDATION
    // -----------------------------

    if (!form.time) {
      newErrors.time = "Please select an appointment time";
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some(
      (error) => error !== ""
    );
  }

  // -----------------------------
  // SUBMIT FORM
  // -----------------------------

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    try {
      // Save appointment here if required

      setConfirmed(form);
    } catch (err) {
      console.error(err);
      alert("Failed to book appointment");
    }
  }

  // -----------------------------
  // RESCHEDULE
  // -----------------------------

  function reschedule() {
    setConfirmed(null);
  }

  // -----------------------------
  // CLEAR FORM
  // -----------------------------

  function clearForm() {
    setForm({
      name: "",
      phone: "",
      email: "",
      date: "",
      time: "",
      doctor: "",
    });

    setErrors({
      name: "",
      phone: "",
      email: "",
      date: "",
      time: "",
      doctor: "",
    });
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto max-w-4xl px-4 py-10">
        {/* BACK TO HOME */}

        <Link
          to="/"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to home
        </Link>

        {/* PAGE TITLE */}

        <h1 className="mt-3 font-display text-3xl font-bold">
          Book a Doctor Appointment
        </h1>

        <p className="mt-1 text-muted-foreground">
          Find the right specialist for any concern — across every medical
          field.
        </p>

        {/* CONFIRMATION */}

        {confirmed ? (
          <Confirmation
            appt={confirmed}
            onReschedule={reschedule}
          />
        ) : (
          /* APPOINTMENT FORM */

          <form
            onSubmit={submit}
            className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8"
          >
            <div className="grid gap-5 md:grid-cols-2">

              {/* PATIENT NAME */}

              <Field
                label="Patient Name"
                icon={UserIcon}
              >
                <Input
                  required
                  value={form.name}
                  maxLength={50}
                  onChange={(e) => {
                    const value = e.target.value;

                    // Only letters and spaces are allowed
                    if (/^[A-Za-z ]*$/.test(value)) {
                      set("name", value);
                    }
                  }}
                  placeholder="Enter your name"
                />

                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.name}
                  </p>
                )}
              </Field>

              {/* PHONE NUMBER */}

              <Field
                label="Phone Number"
                icon={Phone}
              >
                <Input
                  required
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={form.phone}
                  onChange={(e) => {
                    // Remove everything except digits
                    const value = e.target.value.replace(/\D/g, "");

                    // Maximum 10 digits
                    set("phone", value.slice(0, 10));
                  }}
                  placeholder="Enter 10 digit mobile number"
                />

                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.phone}
                  </p>
                )}
              </Field>

              {/* EMAIL */}

              <Field
                label="Email"
                icon={Mail}
              >
                <Input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    set("email", e.target.value)
                  }
                  placeholder="you@email.com"
                />

                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.email}
                  </p>
                )}
              </Field>

              {/* DOCTOR */}

              <Field
                label="Doctor"
                icon={Stethoscope}
              >
                <Select
                  value={form.doctor}
                  onValueChange={(v) =>
                    set("doctor", v)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a specialist" />
                  </SelectTrigger>

                  <SelectContent>
                    {DOCTORS.map((doctor) => (
                      <SelectItem
                        key={doctor}
                        value={doctor}
                      >
                        {doctor}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {errors.doctor && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.doctor}
                  </p>
                )}
              </Field>

              {/* DATE */}

              <Field
                label="Preferred Date"
                icon={Calendar}
              >
                <Input
                  required
                  type="date"
                  min={new Date()
                    .toISOString()
                    .split("T")[0]}
                  value={form.date}
                  onChange={(e) =>
                    set("date", e.target.value)
                  }
                />

                {errors.date && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.date}
                  </p>
                )}
              </Field>

              {/* TIME */}

              <Field
                label="Preferred Time"
                icon={Clock}
              >
                <Select
                  value={form.time}
                  onValueChange={(v) =>
                    set("time", v)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a slot" />
                  </SelectTrigger>

                  <SelectContent>
                    {TIMES.map((time) => (
                      <SelectItem
                        key={time}
                        value={time}
                      >
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {errors.time && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.time}
                  </p>
                )}
              </Field>
            </div>

            {/* BUTTONS */}

            <div className="mt-7 flex flex-wrap gap-3">

              {/* BOOK APPOINTMENT */}

              <Button
                type="submit"
                size="lg"
                className="bg-care-gradient text-white shadow-glow"
                disabled={
                  !form.name ||
                  !form.phone ||
                  form.phone.length !== 10 ||
                  !form.email ||
                  !form.date ||
                  !form.time ||
                  !form.doctor
                }
              >
                Book Appointment
              </Button>

              {/* CLEAR */}

              <Button
                type="button"
                size="lg"
                variant="outline"
                onClick={clearForm}
              >
                Clear
              </Button>
            </div>
          </form>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}

// -----------------------------
// FIELD COMPONENT
// -----------------------------

function Field({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: any;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </Label>

      {children}
    </div>
  );
}

// -----------------------------
// CONFIRMATION COMPONENT
// -----------------------------

function Confirmation({
  appt,
  onReschedule,
}: {
  appt: {
    name: string;
    phone: string;
    email: string;
    date: string;
    time: string;
    doctor: string;
  };
  onReschedule: () => void;
}) {
  return (
    <div className="mt-8 overflow-hidden rounded-3xl border border-secondary/40 bg-card shadow-card">

      {/* HEADER */}

      <div className="bg-care-gradient p-8 text-white">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-8 w-8" />

          <h2 className="font-display text-2xl font-bold">
            Appointment Confirmed
          </h2>
        </div>

        <p className="mt-2 text-white/85">
          We've sent the details to {appt.email}.
        </p>
      </div>

      {/* DETAILS */}

      <div className="grid gap-4 p-6 sm:grid-cols-2 md:p-8">
        <Detail
          label="Patient"
          value={appt.name}
        />

        <Detail
          label="Doctor"
          value={appt.doctor}
        />

        <Detail
          label="Date"
          value={appt.date}
        />

        <Detail
          label="Time"
          value={appt.time}
        />

        <Detail
          label="Phone"
          value={appt.phone}
        />

        <Detail
          label="Email"
          value={appt.email}
        />
      </div>

      {/* ACTION BUTTONS */}

      <div className="flex flex-wrap gap-3 border-t border-border bg-muted/40 p-6">

        <Button
          onClick={onReschedule}
          variant="outline"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reschedule
        </Button>

        <Button
          asChild
          className="bg-primary-gradient text-white"
        >
          <Link to="/recovery">
            Go to Recovery Tracker
          </Link>
        </Button>
      </div>
    </div>
  );
}

// -----------------------------
// DETAIL COMPONENT
// -----------------------------

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-muted/40 p-4">

      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </div>

      <div className="mt-1 text-sm font-semibold">
        {value}
      </div>

    </div>
  );
}