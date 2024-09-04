import React, { useState } from "react";

const AboutMe = ({
  onChange,
}: {
  onChange: (field: string, value: string) => void;
}) => {
  const [aboutText, setAboutText] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAboutText(event.target.value);
    onChange("aboutMe", event.target.value);
  };

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor="aboutMe"
        className="block text-xs font-medium text-gray-600"
      >
        About Me
      </label>
      <textarea
        id="aboutMe"
        value={aboutText}
        onChange={handleChange}
        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
        placeholder="Write something about yourself..."
        rows={5}
        cols={50}
        required
      />
    </div>
  );
};

export default AboutMe;
