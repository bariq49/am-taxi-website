"use client";

import { useForm, FormProvider } from "react-hook-form";
import { Input } from "@/components/features/form/Input";
import FileUpload from "@/components/features/form/file-upload";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MoveRight, Loader2 } from "lucide-react";
import { useDriverRegistration } from "@/hooks/queries/use-driver-registration";
import toast from "react-hot-toast";

interface PartnerFormValues {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    carType: string;
    carColor: string;
    licensePlate: string;
    licenseNumber: string;
    experience: string;
    chauffeurPassFront: string;
    chauffeurPassBack: string;
    kiwaPermit: string;
    insurancePolicy: string;
    bankpas: string;
    kvkExtract: string;
}

export default function PartnerFormSection() {
    const { mutate: register, isPending } = useDriverRegistration();

    const methods = useForm<PartnerFormValues>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
            carType: "",
            carColor: "",
            licensePlate: "",
            licenseNumber: "",
            experience: "",
            chauffeurPassFront: "",
            chauffeurPassBack: "",
            kiwaPermit: "",
            insurancePolicy: "",
            bankpas: "",
            kvkExtract: "",
        },
    });

    const onSubmit = (data: PartnerFormValues) => {
        register(data, {
            onSuccess: () => {
                methods.reset();
            }
        });
    };

    return (
        <section id="partner-form" className="py-12 lg:py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">


                    <div className="lg:col-span-5 hidden lg:block sticky top-32 h-fit">
                        <div className="flex flex-col space-y-8">
                            <div className="mb-8">
                                <span className="text-primary font-bold text-base tracking-widest uppercase">
                                    Join the Network
                                </span>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                    Ready to Drive <br /> with AMS Taxi?
                                </h2>
                            </div>
                            <div className="flex flex-col space-y-4">
                                <p className="text-base md:text-lg text-gray-500 leading-relaxed max-w-lg">
                                    Complete the form to register your interest. Our recruitment team will review your application and guide you through the next steps.
                                </p>
                            </div>

                            <div className="flex flex-col gap-6">
                                {[
                                    {
                                        title: "Swift Onboarding",
                                        desc: "Get verified and ready to drive in as little as 48 hours."
                                    },
                                    {
                                        title: "Weekly Payments",
                                        desc: "Receive your earnings directly to your account every week."
                                    },
                                    {
                                        title: "Premium Fleet",
                                        desc: "Access to high-end clients looking for top-tier transportation."
                                    }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3 group cursor-pointer">
                                        <div className="flex-shrink-0 w-11 h-11 rounded-full bg-primary/5 flex items-center justify-center transition-colors group-hover:bg-primary/10">
                                            <CheckCircle2 className="w-5 h-5 text-primary" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-gray-900 font-bold text-base tracking-tight uppercase">
                                                {item.title}
                                            </span>
                                            <span className="text-gray-400 text-xs font-medium">
                                                {item.desc}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7 lg:p-10 lg:bg-gray-50 lg:border lg:border-border lg:rounded-2xl shadow-none">
                        <FormProvider {...methods}>
                            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6 lg:space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        name="firstName"
                                        label="First Name"
                                        placeholder="John"
                                        required
                                    />
                                    <Input
                                        name="lastName"
                                        label="Last Name"
                                        placeholder="Doe"
                                        required
                                    />
                                    <Input
                                        name="email"
                                        type="email"
                                        label="Email Address"
                                        placeholder="john@example.com"
                                        required
                                    />
                                    <Input
                                        name="phone"
                                        type="phone"
                                        label="Phone Number"
                                        placeholder="+31 000 000 000"
                                        required
                                    />
                                    <Input
                                        name="address"
                                        type="location"
                                        label="Home Address"
                                        placeholder="Enter your address"
                                        required
                                    />
                                    <Input
                                        name="carType"
                                        label="Car Type"
                                        placeholder="Mercedes E-Class"
                                        required
                                    />
                                    <Input
                                        name="carColor"
                                        label="Car Color"
                                        placeholder="Black"
                                        required
                                    />
                                    <Input
                                        name="licensePlate"
                                        label="License Plate"
                                        placeholder="AA-000-A"
                                        required
                                    />
                                    <Input
                                        name="licenseNumber"
                                        label="Driver License Number"
                                        placeholder="Enter your license number"
                                        required
                                    />
                                    <Input
                                        name="experience"
                                        label="Years of Experience"
                                        placeholder="e.g. 5"
                                        required
                                    />
                                </div>
                                <div className="space-y-8">
                                    <div className="flex flex-col space-y-1">
                                        <h3 className="text-xl font-bold text-gray-900 tracking-tight">Required Documents</h3>
                                        <p className="text-sm text-gray-500">Please upload clear copies (PNG, JPG, or PDF) of the following documents.</p>
                                    </div>

                                    {/* ID Documents */}
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                                            <FileUpload
                                                name="chauffeurPassFront"
                                                label="Chauffeur Pass (Front)"
                                                required
                                            />
                                            <FileUpload
                                                name="chauffeurPassBack"
                                                label="Chauffeur Pass (Back)"
                                                required
                                            />
                                        </div>
                                        <FileUpload
                                            name="kiwaPermit"
                                            label="KIWA Permit"
                                            required
                                        />
                                    </div>

                                    {/* Business & Insurance */}
                                    <div className="space-y-4 pt-4">
                                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Business & Insurance</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                                            <FileUpload
                                                name="insurancePolicy"
                                                label="Taxi Insurance Policy"
                                                required
                                            />
                                            <FileUpload
                                                name="kvkExtract"
                                                label="KVK Uittreksel"
                                                required
                                            />
                                        </div>
                                        <FileUpload
                                            name="bankpas"
                                            label="Bankpas (Bank Card Copy)"
                                            required
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isPending}
                                    loading={isPending}
                                    className="w-full h-14 bg-black text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-black/90 transition-all group disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    <span>Apply to Join</span>
                                    <MoveRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                                </Button>
                            </form>
                        </FormProvider>
                    </div>
                </div>
            </div>
        </section>
    );
}
