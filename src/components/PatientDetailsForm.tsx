import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle, Loader } from "lucide-react";

export interface PatientDetails {
  name: string;
  phone: string;
  email: string;
}

interface PatientDetailsFormProps {
  onSubmit: (details: PatientDetails) => void;
  isLoading?: boolean;
  error?: string | null;
  onValidationFail?: (errors: Record<string, string>) => void;
}

export function PatientDetailsForm({
  onSubmit,
  isLoading = false,
  error,
  onValidationFail,
}: PatientDetailsFormProps) {
  const [formData, setFormData] = useState<PatientDetails>({
    name: "",
    phone: "",
    email: "",
  });

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const validateForm = () => {
    const errors: Record<string, string> = {};

    // NAME VALIDATION
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (!/^[A-Za-z ]+$/.test(formData.name)) {
      errors.name = "Name can contain only letters and spaces";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must contain at least 2 characters";
    } else if (formData.name.trim().length > 50) {
      errors.name = "Name must not exceed 50 characters";
    }

    // PHONE VALIDATION
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Phone number must contain exactly 10 digits";
    }

    // EMAIL VALIDATION
    if (formData.email.trim()) {
      const emailRegex =
        /^[A-Za-z0-9._%+-]+@[A-Za-z][A-Za-z0-9-]*\.[A-Za-z]{2,}$/;

      if (!emailRegex.test(formData.email.trim())) {
        errors.email = "Please enter a valid email address";
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    } else if (onValidationFail) {
      onValidationFail(validationErrors);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    // NAME: allow only letters and spaces
    if (name === "name") {
      if (!/^[A-Za-z ]*$/.test(value)) {
        return;
      }

      if (value.length > 50) {
        return;
      }
    }

    // PHONE: allow only digits and maximum 10 digits
    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "");

      if (digitsOnly.length > 10) {
        return;
      }

      setFormData((prev) => ({
        ...prev,
        phone: digitsOnly,
      }));

      if (validationErrors.phone) {
        setValidationErrors((prev) => ({
          ...prev,
          phone: "",
        }));
      }

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear validation error for this field when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-6 space-y-5">
      <div>
        <h3 className="font-display text-lg font-bold text-foreground">
          Patient Information
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          We need your details to connect you with a doctor and for our
          records
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="flex items-start gap-3 rounded-lg bg-destructive/10 border border-destructive/30 p-3">
            <AlertCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Full Name *
          </Label>

          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            disabled={isLoading}
            maxLength={50}
            className={
              validationErrors.name ? "border-destructive" : ""
            }
            autoComplete="name"
          />

          {validationErrors.name && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {validationErrors.name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium">
            Phone Number *
          </Label>

          <Input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            placeholder="Enter mobile number"
            value={formData.phone}
            onChange={handleChange}
            disabled={isLoading}
            maxLength={10}
            className={
              validationErrors.phone ? "border-destructive" : ""
            }
            autoComplete="tel"
          />

          {validationErrors.phone && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {validationErrors.phone}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email Address (optional)
          </Label>

          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            className={
              validationErrors.email ? "border-destructive" : ""
            }
            autoComplete="email"
          />

          {validationErrors.email && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {validationErrors.email}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-care-gradient text-white mt-6"
        >
          {isLoading ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Saving details...
            </>
          ) : (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Continue to Symptom Analysis
            </>
          )}
        </Button>
      </form>

      <p className="text-xs text-muted-foreground text-center">
        Your information is secure and will only be used for appointment
        scheduling and healthcare purposes.
      </p>
    </div>
  );
}