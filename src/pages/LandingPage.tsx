import { useEffect, useState } from "react";
import type { Doctor } from "../types";
import axios from "axios";
import DoctorCard from "../components/DoctorCard";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [search, setSearch] = useState("");

useEffect(() => {
  axios.get("http://localhost:5000/api/doctors")
    .then(res => {
      console.log("Doctors loaded:", res.data); // confirm here
      setDoctors(res.data);
    })
    .catch(err => console.error("Failed to fetch doctors:", err));
}, []);

  const filtered = doctors.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 h-screen bg bg-slate-900">
      <input
        type="text"
        placeholder="Search doctors..."
        className="p-2 border w-full mb-4 rounded text-white"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map(doctor => (
          <Link to={`/doctor/${doctor._id}`} key={String(doctor._id)}>
            <DoctorCard doctor={doctor} />
          </Link>
        ))}
      </div>
    </div>
  );
}
