import { useEffect, useState } from "react";

import { ConfigurationsContext } from "./ConfigurationsContext";

export const ConfigurationsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [shouldThrow, setShouldThrow] = useState(() => {
    const stored = localStorage.getItem("shouldThrow");
    return stored === "true";
  });

  useEffect(() => {
    localStorage.setItem("shouldThrow", shouldThrow.toString());
  }, [shouldThrow]);

  return (
    <ConfigurationsContext.Provider value={{ shouldThrow }}>
      {children}

      <ConfigurationSettings
        shouldThrow={shouldThrow}
        setShouldThrow={setShouldThrow}
      />
    </ConfigurationsContext.Provider>
  );
};

interface ConfigurationSettingsProps {
  shouldThrow: boolean;
  setShouldThrow: (value: boolean) => void;
}

function ConfigurationSettings({
  shouldThrow,
  setShouldThrow,
}: ConfigurationSettingsProps) {
  return (
    <div className="flex flex-col gap-4 fixed bottom-4 right-4 bg-black/50 border border-slate-800 text-white p-4 rounded-lg shadow">
      <h3 className="font-semibold">Settings</h3>

      <label className="inline-flex items-center space-x-2 select-none">
        <input
          type="checkbox"
          checked={shouldThrow}
          onChange={(e) => setShouldThrow(e.target.checked)}
        />
        <span className="text-sm">Simulate Errors</span>
      </label>
    </div>
  );
}
