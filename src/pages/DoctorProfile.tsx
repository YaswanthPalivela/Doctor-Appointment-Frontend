import {useParams,useNavigate} from "react-router-dom";
import {useEffect,useState} from 'react';
import axios from 'axios';
import type { Doctor } from "../types";

const DoctorProfile = () => {

  const {id} = useParams()
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/doctors/${id}`).then(res =>{
      setDoctor(res.data)
    })
  }, [id]);

  if (!doctor) {
    return <div className=" p-4">Loading...</div>;
  } 


  return (
    <section className=" bg-slate-800">
      <div className="p-6 h-screen flex justify-center items-center gap-10">
      <div className="flex items-center gap-4 mb-6">
        <img src={ doctor.profileImage} className="w-24 h-24 rounded-full" alt={doctor.name} />
        <div>
          <h1 className="text-white text-2xl font-bold">
            {doctor.name}
          </h1>
          <p className="text-slate-300">{doctor.specialization}</p>
          <span className={` text-sm font-semibold ${doctor.availability === 'Available' ? 'text-green-500' : 'text-red-500'}`}>
            {doctor.availability}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <h2 className=" text-lg text-white font-semibold mb-2"> Weekly schedule</h2>
        <ul className="list-disc list-inside text-slate-300">
          {doctor.schedule.map((slot, idx) => (
            <li key={idx} className="mb-1">
              {slot}
            </li>
          ))}       
        </ul>
      </div>
      <div> <button onClick= {() => navigate(`/book/${doctor._id}`)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-indigo-700 transition hover:cursor-pointer duration-300">
          Book Appointment
        </button></div>
          
    </div>
   
    </section>
  )
}

export default DoctorProfile