import { useState } from 'react'
import Colleges from './components/Colleges'
import Checklist from './components/Checklist'
import Deadlines from './components/Deadlines'

const TABS = [
  { id: 'faculdades', label: 'Faculdades', Component: Colleges },
  { id: 'checklist', label: 'Checklist', Component: Checklist },
  { id: 'prazos', label: 'Prazos', Component: Deadlines },
]

function App() {
  const [activeTab, setActiveTab] = useState('faculdades')
  const Active = TABS.find((tab) => tab.id === activeTab)?.Component ?? Colleges

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6">
          <h1 className="text-xl font-bold text-slate-900">Transferência Universitária</h1>
          <p className="mt-1 text-sm text-slate-500">
            Organização de faculdades, prazos e checklist do processo de transferência.
          </p>
        </div>
      </header>

      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl gap-1 px-4 sm:px-6">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`border-b-2 px-3 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <Active />
      </main>
    </div>
  )
}

export default App
