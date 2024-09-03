import React from "react";

interface AddressInputsProps {
  onChange: (field: string, value: string) => void;
}

const AddressInputs: React.FC<AddressInputsProps> = ({ onChange }) => {
  return (
    <div className="flex flex-col gap-1">
      <h2>Address</h2>
      <input
        type="text"
        className="border border-gray-300 rounded-md p-2 w-full"
        placeholder="Street Address"
        onChange={(e) => onChange("streetAddress", e.target.value)}
        data-1p-ignore
      />
      <input
        type="text"
        className="border border-gray-300 rounded-md p-2 w-full"
        placeholder="City"
        onChange={(e) => onChange("city", e.target.value)}
        data-1p-ignore
      />
      <input
        type="text"
        className="border border-gray-300 rounded-md p-2 w-full"
        placeholder="State"
        onChange={(e) => onChange("state", e.target.value)}
        data-1p-ignore
      />
      <input
        type="text"
        className="border border-gray-300 rounded-md p-2 w-full"
        placeholder="ZIP Code"
        onChange={(e) => onChange("zipCode", e.target.value)}
        data-1p-ignore
      />
    </div>
  );
};

export default AddressInputs;
