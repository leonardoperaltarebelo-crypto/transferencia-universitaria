const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export function formatRange(low, high) {
  if (low == null || high == null) return 'Não divulgado'
  if (low === high) return usd.format(low)
  return `${usd.format(low)} – ${usd.format(high)}`
}

export function sortByDeadline(items) {
  return [...items].sort((a, b) => {
    if (a.deadlineDate == null && b.deadlineDate == null) return 0
    if (a.deadlineDate == null) return -1
    if (b.deadlineDate == null) return 1
    return new Date(a.deadlineDate) - new Date(b.deadlineDate)
  })
}

export function daysUntil(dateStr) {
  if (!dateStr) return null
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(dateStr)
  target.setHours(0, 0, 0, 0)
  return Math.round((target - today) / (1000 * 60 * 60 * 24))
}

export function formatDeadlineDate(dateStr) {
  if (!dateStr) return null
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}
