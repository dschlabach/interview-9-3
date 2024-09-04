import React from "react";
import Input from "@/app/components/inputs/Input";

interface AddressInputsProps {
  onChange: (field: string, value: string) => void;
}

const AddressInputs = ({ onChange }: AddressInputsProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Address</h2>
      <div className="flex flex-col gap-2">
        <Input
          label="Street Address"
          type="text"
          placeholder="1234 Main St"
          onChange={(e) => onChange("street", e.target.value)}
          required
          data-1p-ignore
        />
        <Input
          label="City"
          type="text"
          placeholder="New York"
          onChange={(e) => onChange("city", e.target.value)}
          required
          data-1p-ignore
        />
        <Input
          label="State"
          type="text"
          placeholder="NY"
          onChange={(e) => onChange("state", e.target.value)}
          required
          data-1p-ignore
        />
        <Input
          label="ZIP Code"
          type="text"
          placeholder="10001"
          onChange={(e) => onChange("zip", e.target.value)}
          required
          data-1p-ignore
        />
      </div>
    </div>
  );
};

export default AddressInputs;
