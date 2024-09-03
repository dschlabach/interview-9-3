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
    <div>
      <h2>Birthday</h2>
      <input
        type="date"
        value={birthday}
        onChange={handleDateChange}
        aria-label="Birthday"
      />
    </div>
  );
};

export default BirthdayInput;
