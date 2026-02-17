/**
 * Форматирует дату для отображения
 */
export function formatDate(dateStr?: string, locale = 'en-US'): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
