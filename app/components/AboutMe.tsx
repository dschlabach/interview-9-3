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
    <div className="about-me">
      <h2>About Me</h2>
      <textarea
        value={aboutText}
        onChange={handleChange}
        className="border border-gray-300 rounded-md p-2 w-full"
        placeholder="Write something about yourself..."
        rows={5}
        cols={50}
      />
    </div>
  );
};

export default AboutMe;
