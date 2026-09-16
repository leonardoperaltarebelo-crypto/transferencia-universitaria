import { colleges, COMBINED_SCHOLARSHIP_DISCLAIMER } from '../data/colleges'
import { formatRange, sortByDeadline, daysUntil, formatDeadlineDate } from '../utils/format'

function DeadlineBadge({ college }) {
  if (!college.deadlineDate) {
    return (
      <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-800">
        Rolling
      </span>
    )
  }
  const days = daysUntil(college.deadlineDate)
  const urgent = days <= 30
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
        urgent ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-700'
      }`}
    >
      {days >= 0 ? `${days} dias` : 'Prazo passou'}
    </span>
  )
}

function academicText(college) {
  if (college.netCostText) return college.netCostText
  return formatRange(college.netCostLow, college.netCostHigh)
}

function athleticText(college) {
  if (college.athleticCostText) return college.athleticCostText
  if (college.hasAthleticScholarship === false) return 'Não oferece (D3)'
  return formatRange(college.athleticCostLow, college.athleticCostHigh)
}

function combinedText(college) {
  if (college.combinedCostText) return college.combinedCostText
  if (college.hasAthleticScholarship === false) return 'Não oferece (D3)'
  return formatRange(college.combinedCostLow, college.combinedCostHigh, 'Não calculável')
}

function ComparisonTable({ items }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-slate-600">Faculdade</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-600">Prazo</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-600">Sem bolsa</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-600">Acadêmica</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-600">Esportiva (35%)</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-600">Combinada (est.)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {items.map((c) => (
            <tr key={c.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 font-medium text-slate-900">
                {c.name}
                <div className="text-xs font-normal text-slate-500">{c.location}</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-slate-700">
                <div>{c.deadlineLabel}</div>
                <DeadlineBadge college={c} />
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-slate-700">
                {formatRange(c.listCostLow, c.listCostHigh)}
                <span className="text-slate-400">/ano</span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap font-medium text-emerald-700">
                {academicText(c)}
                {c.netCostLow != null && <span className="font-normal text-slate-400">/ano</span>}
              </td>
              <td className="px-4 py-3 whitespace-nowrap font-medium text-sky-700">
                {athleticText(c)}
                {c.athleticCostLow != null && <span className="font-normal text-slate-400">/ano</span>}
              </td>
              <td className="px-4 py-3 whitespace-nowrap font-semibold text-purple-700">
                {combinedText(c)}
                {c.combinedCostLow != null && <span className="font-normal text-slate-400">/ano</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-slate-100 px-4 py-2 text-xs text-slate-500">
        Coluna "Combinada": {COMBINED_SCHOLARSHIP_DISCLAIMER}
      </p>
    </div>
  )
}

function CollegeCard({ college }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{college.name}</h3>
          <p className="text-sm text-slate-500">{college.location}</p>
        </div>
        <DeadlineBadge college={college} />
      </div>

      <dl className="grid grid-cols-1 gap-x-4 gap-y-2 text-sm sm:grid-cols-2">
        <div>
          <dt className="font-medium text-slate-500">Prazo</dt>
          <dd className="text-slate-800">
            {college.deadlineLabel}
            {college.deadlineDate && (
              <span className="text-slate-400"> ({formatDeadlineDate(college.deadlineDate)})</span>
            )}
          </dd>
          {college.deadlineNote && <dd className="mt-0.5 text-xs text-slate-500">{college.deadlineNote}</dd>}
        </div>
        <div>
          <dt className="font-medium text-slate-500">Intake</dt>
          <dd className="text-slate-800">{college.intake}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="font-medium text-slate-500">Bolsa</dt>
          <dd className="text-slate-800">{college.scholarshipInfo}</dd>
          {college.athleticNote && <dd className="mt-0.5 text-xs text-slate-500">{college.athleticNote}</dd>}
        </div>
      </dl>

      <div className="grid grid-cols-2 gap-3 rounded-lg bg-slate-50 p-3 sm:grid-cols-4">
        <div>
          <p className="text-xs font-medium text-slate-500">Sem bolsa</p>
          <p className="text-sm font-semibold text-slate-800">
            {formatRange(college.listCostLow, college.listCostHigh)}
          </p>
          {college.listCostNote && <p className="mt-0.5 text-[11px] text-slate-500">{college.listCostNote}</p>}
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500">Acadêmica</p>
          <p className="text-sm font-semibold text-emerald-700">{academicText(college)}</p>
          {college.netCostNote && <p className="mt-0.5 text-[11px] text-slate-500">{college.netCostNote}</p>}
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500">Esportiva (35%)</p>
          <p className="text-sm font-semibold text-sky-700">{athleticText(college)}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500">Combinada (est.)</p>
          <p className="text-sm font-semibold text-purple-700">{combinedText(college)}</p>
        </div>
      </div>
      {college.hasAthleticScholarship !== false && (
        <p className="text-[11px] leading-snug text-slate-400">
          {college.combinedNote ?? COMBINED_SCHOLARSHIP_DISCLAIMER}
        </p>
      )}

      <div className="grid grid-cols-1 gap-3 border-t border-slate-100 pt-3 sm:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Prós</p>
          <ul className="mt-1 space-y-1 text-sm text-slate-700">
            {college.pros.map((pro) => (
              <li key={pro} className="flex gap-2">
                <span className="text-emerald-500">+</span>
                {pro}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-red-600">Contras</p>
          <ul className="mt-1 space-y-1 text-sm text-slate-700">
            {college.cons.map((con) => (
              <li key={con} className="flex gap-2">
                <span className="text-red-500">–</span>
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function Colleges() {
  const ordered = sortByDeadline(colleges)

  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="mb-3 text-base font-semibold text-slate-900">Comparação rápida</h2>
        <ComparisonTable items={ordered} />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-base font-semibold text-slate-900">Detalhes por faculdade</h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {ordered.map((college) => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>
      </section>
    </div>
  )
}
