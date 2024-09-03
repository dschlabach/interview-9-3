"use client";

import UserTable from "@/app/components/UserTable";

export default function DataPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Data</h1>
      <UserTable />
    </div>
  );
}
