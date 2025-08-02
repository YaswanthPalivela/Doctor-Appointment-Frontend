import type { Doctor } from "../types"

const DoctorCard = ({doctor}:{doctor:Doctor}) => {
  return (
    <div className="flex h-50 shadow-xl bg-slate-500 rounded-2xl gap-2  border hover:shadow-lg hover:shadow-slate-500 transition">
      <img src={doctor.profileImage} className="h-full rounded " />
      <div className="flex flex-col justify-center p-4 gap-2">
        <h2 className="text-xl text-white font-semibold">{doctor.name}</h2>
        <p className="text-slate-200">{doctor.specialization}</p>
        <span className={`text-sm font-semibold ${doctor.availability === 'Available' ? 'text-green-500' : 'text-red-500'}`}>
          {doctor.availability}
        </span>
    </div>
    </div>
  )
}

export default DoctorCard