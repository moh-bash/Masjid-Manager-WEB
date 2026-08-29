"use client";

import DashboardPage from "@/components/dashboard/DashboardPage";
import { addMosque } from "@/lib/features/mosque/services/mosque.service";
import { useRouter } from "next/navigation";
import MosqueForm from "@/components/mosque/MosqueForm";
import { sendMosque } from "@/lib/features/mosque/types";

function AddMosque() {
return (
  <DashboardPage>
    <MosqueForm/>
  </DashboardPage>
)
}

export default AddMosque
