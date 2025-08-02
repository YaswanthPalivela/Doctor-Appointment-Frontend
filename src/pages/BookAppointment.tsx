import {useParams,useNavigate} from "react-router-dom";
import { useState } from "react";
import axios from 'axios';



const BookAppointment = () => {

  const navigate = useNavigate();
  const { id:doctorId } = useParams();
  const [formData,setFormData] = useState({
    patientName: '',
    email: '',
    date: '',
    time: '',
  })
  const [confirmation,setConfirmation] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Combine date and time into ISO string
  const dateTime = new Date(`${formData.date}T${formData.time}`);

  try {
    await axios.post("http://localhost:5000/api/appointments", {
      patientName: formData.patientName,
      email: formData.email,
      dateTime,      // ✅ this replaces date + time
      doctorId,
    });

    setConfirmation("Appointment successfully booked!");

    setTimeout(() => {navigate("/")},1500)

  } catch (err) {
  console.error(err);
  if (axios.isAxiosError(err) && err.response?.status === 409) {
    setConfirmation("That time slot is already booked. Please choose another.");
  } else {
    setConfirmation("Something went wrong. Please try again.");
  }
  }}


  return (
    <section className="relative h-screen bg-slate-900 p-6 text-white flex ">
      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 " style={{ backgroundImage: "url('/path/to/your/background.jpg')" }}>{      
        confirmation && <div className="mb-4 font-semibold text-xl text-green-500">{confirmation}</div>
      }</div>
   <div className="w-1/2 flex flex-col justify-center items-center" >
    <h3 className=" font-semibold text-8xl pl-5">
    We’ll be with you <span className=" text-blue-500 hover:text-indigo-700 duration-200" >every</span> step   of the way.
    </h3>
   </div>
      <div className="w-1/2 flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
        type="text"
        name="patientName"
        placeholder="Patient Name"
        value={formData.patientName}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded" />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        className="w-full p-2 bg-white text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-indigo-700 hover:cursor-pointer duration-300">
          Confirm Booking
        </button>
      </form></div>
      
    </section>
  )
}

export default BookAppointment