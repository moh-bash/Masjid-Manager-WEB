"use client";

import DashboardPage from "@/components/dashboard/DashboardPage";
import FormUi from "@/components/layout/FormUi";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import MapPicker from "@/components/UI/map/MapPickerWrapper";
import { LocationCoordinates } from "@/components/UI/map/types";
import { addMosque } from "@/lib/features/mosque/services/mosque.service";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function AddMosque() {
  const [location, setLocation] = useState<LocationCoordinates | undefined>(undefined);
  const [mosqueName, setMosqueName] = useState("");
  const [managerEmail, setManagerEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");

    if (!mosqueName.trim() || !managerEmail.trim()) {
      setErrorMessage("يرجى ملء جميع الحقول المطلوبة.");
      return;
    }

    if (!location){
      setErrorMessage("يرجى تحديد موقع المسجد على الخريطة.");
      return;
    }

    try {
      setIsLoading(true);
       await addMosque({
        name: mosqueName,
        managerEmail: managerEmail,
        location: {lat: location?.lat || 0, lng: location?.lng || 0},
      });


      router.push("/admin/mosques");
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "حدث خطا.");
    } finally {
      setIsLoading(false);
    }
  }


return (
  <DashboardPage>
    {/* header */}
    <form
      onSubmit={handleSubmit}
    >
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg md:text-3xl font-bold">إضافة مسجد جديد</h2>
        <div className="flex gap-2">
          <Button
            type="submit"
            variant="primary"
            size="md"
          >
           {isLoading ? <Loader2 className="animate-spin" /> : "إضافة المسجد"}
          </Button>
          <Button
            type="reset"
            variant="outline"
            size="md"
            href="/admin/mosques"
          >
            إلغاء
          </Button>
        </div>
      </div>
      <FormUi>
        {errorMessage && (
          <div className="col-span-2 text-red-500 bg-red-300/25 border border-red-600 rounded-xl py-2 mb-4 text-center">
            {errorMessage}
          </div>
        )}
        <Input
          id="mosqueName"
          name="mosqueName"
          type="text"
          label="اسم المسجد"
          placeholder="أدخل اسم المسجد"
          value={mosqueName}
          onChange={(e) => setMosqueName(e.target.value)}
        />
        <Input
          id="managerEmail"
          name="managerEmail"
          type="email"
          label="بريد المدير الإلكتروني"
          placeholder="example@mosque.com"
          value={managerEmail}
          onChange={(e) => setManagerEmail(e.target.value)}
        />
        <div className="col-span-2">
          <h2 className="mb-2 text-lg font-bold">
            موقع المسجد
          </h2>

          <p className="mb-4 text-sm text-slate-500">
            حدد موقع المسجد من خلال الضغط على الخريطة，
            أواستخدم موقعك الحالي.
          </p>

          <MapPicker
            value={location}
            onChange={setLocation}
          />
        </div>
      </FormUi>
    </form>

  </DashboardPage>
)
}

export default AddMosque
