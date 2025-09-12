import SelectViewTabs from "./components/layout/SelectViewTabs";

import LeadsList from "./components/LeadsList";

function App() {
  return (
    <div className="mx-auto w-full max-w-4xl bg-slate-50 p-10 m-12 rounded-xl drop-shadow-lg text-slate-800">
      <SelectViewTabs />

      <LeadsList />
    </div>
  );
}

export default App;
