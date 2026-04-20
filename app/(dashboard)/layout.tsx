import React from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-bg-white text-gray-900">
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
