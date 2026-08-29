import DashboardPage from "@/components/dashboard/DashboardPage";
import MosqueForm from "@/components/mosque/MosqueForm";
import { getMosqueById } from "@/lib/features/mosque/services/mosque.service";



export default async function EditMosquePage({params}: {params: {id: string}}) {
    const { id } = await params;

    const mosque = await getMosqueById(id);
    

    return (
        <DashboardPage>
            <MosqueForm
                initialData={{
                    id: mosque.id,
                    name: mosque.name,
                    managerEmail: mosque.manager.email,
                    location: mosque.location
                }}
            />
        </DashboardPage>
    )
}
