import React from "react";
import { HelpCircle, FileText, MessageSquare } from "lucide-react";
import { Input } from "@/components/features/form/Input";

interface DriverNotesFieldProps {
  mode?: "outbound" | "return";
}

export const DriverNotesField = ({ mode = "outbound" }: DriverNotesFieldProps) => {
  const isReturn = mode === "return";
  const name = isReturn ? "returnNotes" : "notes";
  const label = isReturn ? "Driver notes (Return)" : "Driver notes (Outward)";
  const placeholder = isReturn
    ? "Add any special instructions for your return driver..."
    : "Add any special instructions for your driver...";

  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          label={label}

          name={name}
          type="textarea"
          placeholder={placeholder}
          rows={5}
          inputClassName="min-h-[120px] p-4 rounded-xl bg-gray-50/50 border-gray-100"
        />
        <div className="absolute bottom-4 right-4 flex items-center gap-3 text-orange-500 pointer-events-none">
          <FileText size={18} />
          <MessageSquare size={18} />
        </div>
      </div>
    </div>
  );
};
