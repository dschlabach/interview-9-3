import { trpc } from "@/utils/trpc";
import { useState } from "react";

interface EmailLoginProps {
  nextStep: () => void;
}

const EmailLogin: React.FC<EmailLoginProps> = ({ nextStep }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const createUserMutation = trpc.users.createUser.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = await createUserMutation.mutateAsync({
        email,
        password,
        onboardingStep: 2,
      });

      if (user.userId) {
        // Store the userId in localStorage in case user refreshes
        localStorage.setItem("userId", user.userId);
        nextStep();
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setError(`Error creating account. ${errorMessage}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
          placeholder="email@example.com"
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
          placeholder="password"
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
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
};

export default EmailLogin;
