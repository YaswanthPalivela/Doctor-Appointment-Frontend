export interface Doctor {
    _id:String,
    name: string,
    specialization: string,
    profileImage: string,
    experience: number,
    availability: string,
    contactNumber: string,
    schedule:[string]
}

export interface Appointment {
  patientName: string;
  email: string;
  date: string;
  time: string;
  doctorId: string;
}