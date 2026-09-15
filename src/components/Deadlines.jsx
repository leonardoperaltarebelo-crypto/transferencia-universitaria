import { colleges } from '../data/colleges'
import { sortByDeadline, daysUntil, formatDeadlineDate } from '../utils/format'

export default function Deadlines() {
  const ordered = sortByDeadline(colleges)

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-base font-semibold text-slate-900">
        Prazos, do mais próximo para o mais distante
      </h2>
      <ol className="relative flex flex-col gap-4 border-l border-slate-200 pl-6">
        {ordered.map((college) => {
          const days = college.deadlineDate ? daysUntil(college.deadlineDate) : null
          const isRolling = college.deadlineDate == null
          const urgent = days != null && days <= 30

          return (
            <li key={college.id} className="relative">
              <span
                className={`absolute -left-[29px] top-1.5 h-3 w-3 rounded-full border-2 border-white ${
                  isRolling ? 'bg-amber-400' : urgent ? 'bg-red-500' : 'bg-slate-400'
                }`}
              />
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold text-slate-900">{college.name}</h3>
                  {isRolling ? (
                    <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-800">
                      Rolling — aplicar agora
                    </span>
                  ) : (
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                        urgent ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {days >= 0 ? `${days} dias restantes` : 'Prazo já passou'}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-slate-600">
                  {college.deadlineLabel}
                  {college.deadlineDate && ` — ${formatDeadlineDate(college.deadlineDate)}`}
                  {' · '}
                  {college.intake}
                </p>
                {college.deadlineNote && (
                  <p className="mt-1 text-xs text-slate-500">{college.deadlineNote}</p>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
