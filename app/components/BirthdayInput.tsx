import React, { useState } from "react";

const BirthdayInput = ({
  onChange,
}: {
  onChange: (field: string, value: string) => void;
}) => {
  // Add state to manage the selected date
  const [birthday, setBirthday] = useState("");

  // Handle date change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setBirthday(newDate);
    onChange("birthdate", newDate);
  };

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor="birthday"
        className="block text-xs font-medium text-gray-600"
      >
        Birthday
      </label>
      <input
        id="birthday"
        type="date"
        value={birthday}
        onChange={handleDateChange}
        aria-label="Birthday"
        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
    </div>
  );
};

export default BirthdayInput;
