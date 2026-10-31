export type Availability = "today" | "week" | "unavailable";

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  hospital: string;
  location: string;
  summary: string;
  availability: Availability;
  /** Photo URL (Unsplash stock portrait). Swap for your real doctor photos later. */
  photo: string;
  qualifications: string[];
  about: string;
  expertise: string[];
  fee: number;
  mode: string;
  languages: string[];
  days: string[];
  hours: string;
}

export const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const TIME_SLOTS = [
  "09:00 AM", "09:30 AM", "10:30 AM", "11:30 AM", "12:00 PM",
  "02:00 PM", "03:00 PM", "04:00 PM", "04:30 PM", "05:30 PM",
];

/**
 * Unsplash stock portraits (hotlinked from images.unsplash.com).
 * Each photo was picked from Unsplash's own description so that it matches the
 * doctor's gender: Dr. Arjun / Karthik / Vikram / Rohan = male photos,
 * Dr. Ananya / Priya / Sneha / Meera = female photos.
 */
const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&crop=top&w=900&h=1100&q=80`;

// NOTE: sample data — replace with your real doctors / API response.
export const DOCTORS: Doctor[] = [
  {
    id: "arjun-mehta", name: "Dr. Arjun Mehta", specialty: "Cardiologist", experience: 15,
    hospital: "MedAI Heart & Vascular Institute", location: "Hyderabad",
    summary: "Preventive cardiology, hypertension and heart-failure care with AI-assisted risk screening.",
    availability: "today", photo: unsplash("1637059824899-a441006a6875"),
    qualifications: ["MBBS", "MD (General Medicine)", "DM (Cardiology)"],
    about: "Dr. Arjun Mehta has spent over 15 years helping patients prevent and manage heart disease. He combines evidence-based care with clear, jargon-free explanations so patients feel confident about every decision.",
    expertise: ["Preventive cardiology", "Hypertension management", "Heart failure care", "ECG & echocardiography", "Cardiac rehabilitation"],
    fee: 900, mode: "In-clinic & video", languages: ["English", "Hindi", "Telugu"],
    days: ["Mon", "Tue", "Thu", "Fri"], hours: "10:00 AM – 5:00 PM",
  },
  {
    id: "ananya-reddy", name: "Dr. Ananya Reddy", specialty: "Neurologist", experience: 12,
    hospital: "MedAI Neuro Care Centre", location: "Vijayawada",
    summary: "Specialist in migraines, epilepsy and stroke recovery with a patient-first, calm approach.",
    availability: "week", photo: unsplash("1659353888906-adb3e0041693"),
    qualifications: ["MBBS", "MD (Medicine)", "DM (Neurology)"],
    about: "Dr. Ananya Reddy treats disorders of the brain, spine and nerves. She is known for careful history-taking, thoughtful use of investigations and long-term follow-up plans.",
    expertise: ["Migraine & headache", "Epilepsy care", "Stroke rehabilitation", "Neuropathy", "Movement disorders"],
    fee: 1000, mode: "In-clinic & video", languages: ["English", "Telugu", "Hindi"],
    days: ["Tue", "Wed", "Fri", "Sat"], hours: "11:00 AM – 6:00 PM",
  },
  /*{
    id: "priya-sharma", name: "Dr. Priya Sharma", specialty: "Dermatologist", experience: 9,
    hospital: "MedAI Skin & Hair Clinic", location: "Bengaluru",
    summary: "Medical and cosmetic dermatology: acne, pigmentation, hair loss and skin allergies.",
    availability: "today", photo: unsplash("1659353886868-753b0c5c5772"),
    qualifications: ["MBBS", "MD (Dermatology, Venereology & Leprosy)"],
    about: "Dr. Priya Sharma focuses on personalised skin and hair care backed by science. She helps patients build simple routines that deliver lasting results.",
    expertise: ["Acne & scars", "Pigmentation", "Hair loss treatment", "Skin allergies & eczema", "Laser & cosmetic care"],
    fee: 800, mode: "In-clinic & video", languages: ["English", "Hindi", "Kannada"],
    days: ["Mon", "Wed", "Thu", "Sat"], hours: "10:00 AM – 6:00 PM",
  },*/
  {
    id: "karthik-rao", name: "Dr. Karthik Rao", specialty: "Pediatrician", experience: 11,
    hospital: "MedAI Children's Hospital", location: "Visakhapatnam",
    summary: "Gentle child healthcare from newborn checks and vaccinations to growth and nutrition.",
    availability: "today", photo: unsplash("1642975967602-653d378f3b5b"),
    qualifications: ["MBBS", "MD (Pediatrics)"],
    about: "Dr. Karthik Rao provides friendly, reassuring care for infants, children and teenagers. Parents value his patient explanations and practical guidance.",
    expertise: ["Newborn & infant care", "Vaccinations", "Growth & nutrition", "Childhood infections", "Adolescent health"],
    fee: 700, mode: "In-clinic & video", languages: ["English", "Telugu", "Hindi"],
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"], hours: "09:00 AM – 4:00 PM",
  },
  {
    id: "vikram-singh", name: "Dr. Vikram Singh", specialty: "Orthopedic Doctor", experience: 18,
    hospital: "MedAI Bone & Joint Hospital", location: "Chennai",
    summary: "Joint replacement, sports injuries and fracture care with a focus on faster recovery.",
    availability: "week", photo: unsplash("1645066928295-2506defde470"),
    qualifications: ["MBBS", "MS (Orthopaedics)", "Fellowship in Joint Replacement"],
    about: "With 18 years of experience, Dr. Vikram Singh treats everything from sports injuries to complex joint problems. He works closely with physiotherapists for smooth recovery.",
    expertise: ["Knee & hip replacement", "Sports injuries", "Fracture management", "Arthritis care", "Spine & back pain"],
    fee: 1000, mode: "In-clinic", languages: ["English", "Hindi", "Tamil"],
    days: ["Tue", "Thu", "Fri", "Sat"], hours: "10:00 AM – 5:00 PM",
  },
  /*{
    id: "sneha-iyer", name: "Dr. Sneha Iyer", specialty: "General Physician", experience: 8,
    hospital: "MedAI Family Health Clinic", location: "Guntur",
    summary: "Your first point of contact for fever, infections, diabetes, BP and everyday health concerns.",
    availability: "today", photo: unsplash("1638202993928-7267aad84c31"),
    qualifications: ["MBBS", "MD (General Medicine)"],
    about: "Dr. Sneha Iyer offers comprehensive primary care for the whole family. She focuses on early diagnosis, lifestyle guidance and long-term management of chronic conditions.",
    expertise: ["Fever & infections", "Diabetes care", "Blood pressure management", "Preventive health checks", "Lifestyle counselling"],
    fee: 500, mode: "In-clinic & video", languages: ["English", "Telugu", "Tamil"],
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], hours: "09:00 AM – 7:00 PM",
  },*/
  {
    id: "meera-nair", name: "Dr. Meera Nair", specialty: "Gynecologist", experience: 14,
    hospital: "MedAI Women's Care Hospital", location: "Hyderabad",
    summary: "Compassionate women's healthcare covering pregnancy, fertility, PCOS and preventive care.",
    availability: "today", photo: unsplash("1623854767648-e7bb8009f0db"),
    qualifications: ["MBBS", "MS (Obstetrics & Gynaecology)"],
    about: "Dr. Meera Nair provides respectful, private and evidence-based care at every stage of a woman's life, from adolescence through pregnancy and menopause.",
    expertise: ["Pregnancy & antenatal care", "PCOS & hormonal health", "Fertility counselling", "Menstrual disorders", "Preventive screenings"],
    fee: 900, mode: "In-clinic & video", languages: ["English", "Malayalam", "Hindi"],
    days: ["Mon", "Wed", "Fri"], hours: "10:00 AM – 4:00 PM",
  },
  {
    id: "rohan-verma", name: "Dr. Rohan Verma", specialty: "ENT Specialist", experience: 10,
    hospital: "MedAI ENT & Hearing Clinic", location: "Ongole",
    summary: "Ear, nose and throat care including sinus problems, hearing concerns and voice disorders.",
    availability: "week", photo: unsplash("1622253692010-333f2da6031d"),
    qualifications: ["MBBS", "MS (ENT)"],
    about: "Dr. Rohan Verma diagnoses and treats conditions of the ear, nose and throat using modern endoscopic tools. He prefers conservative treatment wherever possible.",
    expertise: ["Sinusitis & allergies", "Hearing assessment", "Tonsil & throat problems", "Vertigo evaluation", "Voice disorders"],
    fee: 700, mode: "In-clinic", languages: ["English", "Hindi", "Telugu"],
    days: ["Mon", "Thu", "Fri", "Sat"], hours: "10:00 AM – 6:00 PM",
  },
];