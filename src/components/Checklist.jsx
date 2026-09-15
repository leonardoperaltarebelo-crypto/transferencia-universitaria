import { colleges, checklistTemplate } from '../data/colleges'
import { useLocalStorage } from '../hooks/useLocalStorage'

function itemKey(collegeId, item) {
  return `${collegeId}::${item}`
}

export default function Checklist() {
  const [checked, setChecked] = useLocalStorage('transferencia:checklist', {})

  function toggle(key) {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-900">Checklist por faculdade</h2>
        <p className="text-xs text-slate-500">Salvo automaticamente neste navegador</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {colleges.map((college) => {
          const items = checklistTemplate.map((item) => itemKey(college.id, item))
          const doneCount = items.filter((key) => checked[key]).length

          return (
            <div key={college.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">{college.name}</h3>
                <span className="text-xs font-medium text-slate-500">
                  {doneCount}/{checklistTemplate.length}
                </span>
              </div>
              <ul className="flex flex-col gap-2">
                {checklistTemplate.map((item) => {
                  const key = itemKey(college.id, item)
                  return (
                    <li key={key}>
                      <label className="flex cursor-pointer items-start gap-2 text-sm text-slate-700">
                        <input
                          type="checkbox"
                          className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          checked={!!checked[key]}
                          onChange={() => toggle(key)}
                        />
                        <span className={checked[key] ? 'text-slate-400 line-through' : ''}>{item}</span>
                      </label>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
