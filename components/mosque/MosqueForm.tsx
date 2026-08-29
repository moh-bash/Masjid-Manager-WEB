"use client";

import { FormEvent, useEffect, useState } from "react";
import FormUi from "../layout/FormUi";
import MapPicker from "../map/MapPickerWrapper";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { LocationCoordinates } from "../map/types";
import { Loader2 } from "lucide-react";
import { addMosque, updateMosque } from "@/lib/features/mosque/services/mosque.service";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/toast";

interface MosqueFormData {
    id: string;
    name: string;
    managerEmail: string;
    location: LocationCoordinates;
}

export interface dataProp {
    name: string;
    managerEmail: string;
    location: LocationCoordinates;
}

interface MosqueFormProps {
    initialData?: MosqueFormData;
}

function MosqueForm({
    initialData,
}: MosqueFormProps) {
    const [location, setLocation] = useState<LocationCoordinates | undefined>(undefined);
    const [mosqueName, setMosqueName] = useState("");
    const [managerEmail, setManagerEmail] = useState("");

    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { showToast } = useToast();

    const router = useRouter();

    const mode = initialData ? "edit" : "create";

    useEffect(() => {
        if (initialData) {
            setMosqueName(initialData.name);
            setManagerEmail(initialData.managerEmail);
            setLocation(initialData.location);
        }
    }, [initialData]);

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setErrorMessage("");

        if (!mosqueName.trim()) {
            setErrorMessage("يرجى إدخال اسم المسجد");
            return;
        }

        if (!managerEmail.trim()) {
            setErrorMessage(
                "يرجى إدخال البريد الإلكتروني لمدير المسجد"
            );
            return;
        }

        if (!location) {
            setErrorMessage(
                "يرجى تحديد موقع المسجد على الخريطة"
            );
            return;
        }

        try {
            setIsLoading(true);

            const data: dataProp = {
                name: mosqueName,
                managerEmail,
                location,
            };

            if (mode === "edit") {
                if (initialData && initialData.name === data.name && initialData.managerEmail === data.managerEmail && initialData.location === data.location) {
                    showToast({
                        message: "لم يتم تعديل أي بيانات",
                        type: "info",
                    });
                    router.back();
                    return;
                }

                const response = await updateMosque(initialData!.id, data);

                showToast({
                    message: response.message,
                    type: "success",
                });
            } else {
                await addMosque(data);
                showToast({
                    message: "تم إضافة المسجد بنجاح",
                    type: "success",
                })
            }
            router.back();
        } catch (error) {
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "حدث خطأ أثناء إضافة المسجد"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold md:text-3xl">
                    {mode === "create"
                        ? "إضافة مسجد جديد"
                        : "تعديل بيانات المسجد"}
                </h2>
                <div className="flex gap-2">
                    <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader2 className="animate-spin" />
                        ) : mode === "create" ? "إضافة المسجد" : "تحديث البيانات"}
                    </Button>

                    <Button
                        type="button"
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
                    <div className="col-span-2 mb-4 rounded-xl border border-red-600 bg-red-300/25 py-2 text-center text-red-500">
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
                    onChange={(e) =>
                        setMosqueName(e.target.value)
                    }
                />

                <Input
                    id="managerEmail"
                    name="managerEmail"
                    type="email"
                    label="بريد المدير الإلكتروني"
                    placeholder="example@mosque.com"
                    value={managerEmail}
                    onChange={(e) =>
                        setManagerEmail(e.target.value)
                    }
                />

                <div className="col-span-2">
                    <h2 className="mb-2 text-lg font-bold">
                        موقع المسجد
                    </h2>

                    <p className="mb-4 text-sm text-slate-500">
                        حدد موقع المسجد من خلال الضغط على الخريطة،
                        أو استخدم موقعك الحالي.
                    </p>

                    <MapPicker
                        value={location}
                        onChange={setLocation}
                    />
                </div>
            </FormUi>
        </form>
    );
}

export default MosqueForm;
