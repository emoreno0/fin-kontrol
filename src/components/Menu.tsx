import {
  Wallet,
  ChartNoAxesCombined,
  TrendingUp,
  Upload,
  X,
  FileSpreadsheet,
  Trash2,
  AlertTriangle,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import { useState } from "react";

type ImportItem = {
  name: string;
  shortName: string;
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  id: string;
  icon: typeof Wallet;
};

export default function Menu() {
  const [netWorthFile, setNetWorthFile] = useState<File | null>(null);
  const [expensesFile, setExpensesFile] = useState<File | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<ImportItem | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    ...(netWorthFile
      ? [{ name: "Net Worth", icon: Wallet }]
      : []),
    ...(expensesFile
      ? [{ name: "Expenses", icon: ChartNoAxesCombined }]
      : []),
  ];

  const importItems: ImportItem[] = [
    {
      name: "Import Net Worth",
      shortName: "Net Worth",
      file: netWorthFile,
      setFile: setNetWorthFile,
      id: "net-worth-csv",
      icon: Wallet,
    },
    {
      name: "Import Expenses",
      shortName: "Expenses",
      file: expensesFile,
      setFile: setExpensesFile,
      id: "expenses-csv",
      icon: ChartNoAxesCombined,
    },
  ];

  const confirmDelete = () => {
    if (!deleteTarget) return;

    deleteTarget.setFile(null);
    setDeleteTarget(null);
  };

  return (
    <>
      <aside
        className={`relative flex h-screen flex-col rounded-r-xl border-r border-slate-300 bg-slate-200 py-6 transition-all duration-300 ${collapsed ? "w-19 px-2" : "w-64 px-4"
          }`}
      >
        {/* Collapse Button */}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-8 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-all hover:bg-emerald-50 hover:text-emerald-600"
          title={collapsed ? "Expand menu" : "Collapse menu"}
        >
          {collapsed ? (
            <PanelLeftOpen size={15} />
          ) : (
            <PanelLeftClose size={15} />
          )}
        </button>

        {/* Logo */}
        <div
          className={`rounded-lg p-2 mb-12 flex items-center ${collapsed ? "justify-center" : "gap-3 px-2"
            }`}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white">
            <TrendingUp size={22} />
          </div>

          {!collapsed && (
            <h1 className="whitespace-nowrap text-xl font-bold tracking-tight text-slate-900">
              Fin Kontrol
            </h1>
          )}
        </div>


        {/* CSV Imports */}
        <div className="mb-8 flex flex-col gap-4">
          {!collapsed && (
            <p className="px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Data Import
            </p>
          )}

          {collapsed && (
            <div className="mx-auto mb-1 h-px w-8 bg-slate-200" />
          )}

          {importItems.map((item) => (
            <div key={item.id} className="flex flex-col gap-2">
              {!item.file ? (
                <label
                  htmlFor={item.id}
                  title={collapsed ? item.name : undefined}
                  className={`flex cursor-pointer items-center rounded-xl bg-emerald-600 font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 hover:shadow-md ${collapsed
                      ? "mx-auto h-11 w-11 justify-center"
                      : "justify-center gap-2 px-3 py-3 text-sm"
                    }`}
                >
                  <Upload size={18} />

                  {!collapsed && item.name}

                  <input
                    id={item.id}
                    type="file"
                    accept=".csv,text/csv"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) item.setFile(file);
                      e.target.value = "";
                    }}
                  />
                </label>
              ) : (
                <div
                  className={`flex items-center rounded-xl border border-emerald-200 bg-emerald-50 ${collapsed
                      ? "mx-auto h-11 w-11 justify-center"
                      : "gap-2 px-3 py-3"
                    }`}
                  title={collapsed ? `${item.shortName}: ${item.file.name}` : undefined}
                >
                  <div className="relative shrink-0">
                    <FileSpreadsheet
                      size={19}
                      className="text-emerald-600"
                    />

                    <button
                      type="button"
                      onClick={() => setDeleteTarget(item)}
                      className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full border-2 border-emerald-50 bg-red-500 text-white shadow-sm transition-all hover:scale-110 hover:bg-red-600"
                      title="Remove CSV"
                    >
                      <X size={10} strokeWidth={3} />
                    </button>
                  </div>

                  {!collapsed && (
                    <span className="min-w-0 flex-1 truncate text-xs font-medium text-emerald-800">
                      {item.file.name}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation */}
        {menuItems.length > 0 && (
          <nav className="flex flex-col gap-2">
            {!collapsed && (
              <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Dashboard
              </p>
            )}

            {collapsed && (
              <div className="mx-auto mb-1 h-px w-8 bg-slate-200" />
            )}

            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.name}
                  href="#"
                  title={collapsed ? item.name : undefined}
                  className={`flex items-center rounded-xl font-medium text-slate-700 transition-all duration-200 hover:bg-emerald-100 hover:text-emerald-700 ${collapsed
                      ? "mx-auto h-11 w-11 justify-center"
                      : "gap-3 px-4 py-3"
                    }`}
                >
                  <Icon
                    size={21}
                    strokeWidth={1.8}
                    className="shrink-0 text-emerald-600"
                  />

                  {!collapsed && (
                    <span className="text-sm">{item.name}</span>
                  )}
                </a>
              );
            })}
          </nav>
        )}
      </aside>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
              <AlertTriangle
                size={24}
                className="text-red-500"
              />
            </div>

            <h2 className="text-lg font-bold text-slate-900">
              Are you sure?
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Are you sure you want to delete this file?

              <span className="mt-2 block font-semibold text-slate-700">
                {deleteTarget.file?.name}
              </span>

              <span className="mt-2 block">
                This action cannot be undone.
              </span>
            </p>

            <div className="mt-7 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmDelete}
                className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700"
              >
                <Trash2 size={16} />
                Delete file
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
