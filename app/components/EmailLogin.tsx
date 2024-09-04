import Input from "@/app/components/Input";
import { trpc } from "@/utils/trpc";
import { motion } from "framer-motion";
import { useState } from "react";

interface EmailLoginProps {
  incrementStep: () => void;
}

const EmailLogin = ({ incrementStep }: EmailLoginProps) => {
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
        incrementStep();
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setError(`Error creating account. ${errorMessage}`);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex flex-col gap-8"
      initial={{ opacity: 1, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "-100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      layout="position"
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold text-gray-700">Welcome!</h2>
        <p className="text-gray-500 text-sm">
          Enter an email and password to create an account.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <Input
          label="Email Address"
          type="email"
          id="email"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          data-1p-ignore
        />
        <Input
          label="Password"
          type="password"
          id="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          data-1p-ignore
        />
        <button
          type="submit"
          className="w-full bg-emerald-800 text-white py-2 px-4 rounded-md hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          Next
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </motion.form>
  );
};

export default EmailLogin;
