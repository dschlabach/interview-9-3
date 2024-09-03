"use client";

import { trpc } from "@/utils/trpc";
import React from "react";

const componentOptions = ["aboutMe", "address", "birthdate"];

const AdminPage = () => {
  const [screen1Config, setScreen1Config] = React.useState<string[]>([]);
  const [screen2Config, setScreen2Config] = React.useState<string[]>([]);
  const updateConfigMutation = trpc.admin.updateOnboardingConfig.useMutation();

  const { data: existingConfig } = trpc.admin.getOnboardingConfig.useQuery();

  React.useEffect(() => {
    if (existingConfig) {
      setScreen1Config(existingConfig[0].components);
      setScreen2Config(existingConfig[1].components);
    }
  }, [existingConfig]);

  const handleConfigChange = (screen: number, index: number, value: string) => {
    if (screen === 1) {
      const newConfig = [...screen1Config];
      newConfig[index] = value;
      setScreen1Config(newConfig);
    } else {
      const newConfig = [...screen2Config];
      newConfig[index] = value;
      setScreen2Config(newConfig);
    }
  };

  const handleAddField = (screen: number) => {
    if (screen === 1) {
      setScreen1Config([...screen1Config, ""]);
    } else {
      setScreen2Config([...screen2Config, ""]);
    }
  };

  const handleRemoveField = (screen: number, index: number) => {
    if (screen === 1) {
      const newConfig = screen1Config.filter((_, i) => i !== index);
      setScreen1Config(newConfig);
    } else {
      const newConfig = screen2Config.filter((_, i) => i !== index);
      setScreen2Config(newConfig);
    }
  };

  const isConfigValid = () => {
    const allComponents = [...screen1Config, ...screen2Config];
    const uniqueComponents = new Set(allComponents);
    return (
      screen1Config.length > 0 &&
      screen2Config.length > 0 &&
      allComponents.length === uniqueComponents.size &&
      !allComponents.includes("")
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConfigValid()) {
      alert("Invalid configuration. Please check your settings.");
      return;
    }
    try {
      await updateConfigMutation.mutateAsync([
        { pageNumber: 1, config: screen1Config },
        { pageNumber: 2, config: screen2Config },
      ]);
    } catch (error) {
      alert("Error updating configuration");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold mb-6">Onboarding Flow Configuration</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Screen 1</h2>
          {screen1Config.map((field, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <select
                value={field}
                onChange={(e) => handleConfigChange(1, index, e.target.value)}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Select a component</option>
                {componentOptions.map((option) => (
                  <option
                    key={option}
                    value={option}
                    disabled={
                      screen1Config.includes(option) ||
                      screen2Config.includes(option)
                    }
                  >
                    {option}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => handleRemoveField(1, index)}
                className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddField(1)}
            className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Add Field
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Screen 2</h2>
          {screen2Config.map((field, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <select
                value={field}
                onChange={(e) => handleConfigChange(2, index, e.target.value)}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Select a component</option>
                {componentOptions.map((option) => (
                  <option
                    key={option}
                    value={option}
                    disabled={
                      screen1Config.includes(option) ||
                      screen2Config.includes(option)
                    }
                  >
                    {option}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => handleRemoveField(2, index)}
                className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddField(2)}
            className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Add Field
          </button>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-emerald-800 text-white rounded-md hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50"
          disabled={!isConfigValid() || updateConfigMutation.isPending}
        >
          {updateConfigMutation.isPending
            ? "Saving..."
            : updateConfigMutation.isSuccess
            ? "Saved"
            : "Save Configuration"}
        </button>
        {updateConfigMutation.isError && (
          <div className="text-red-500">
            Error: {updateConfigMutation.error.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default AdminPage;
