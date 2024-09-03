import { useState } from "react";

interface EmailLoginProps {
  updateUserData: (data: { email: string }) => void;
  nextStep: () => void;
}

const EmailLogin: React.FC<EmailLoginProps> = ({
  updateUserData,
  nextStep,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email, password);
    // updateUserData({ email: localEmail });
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold">Welcome!</h2>
        <p className="text-gray-600 text-sm">
          Enter an email and password to create an account.
        </p>
      </div>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          data-1p-ignore
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          data-1p-ignore
        />
      </div>
      <button
        type="submit"
        className="w-full bg-emerald-800 text-white py-2 px-4 rounded-md hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      >
        Next
      </button>
    </form>
  );
};

export default EmailLogin;
