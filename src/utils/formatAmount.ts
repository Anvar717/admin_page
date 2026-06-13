export function formatAmountInput(value: string): string {
  const digits = value.replace(/\D/g, '')
  if (!digits) return ''
  return Number(digits).toLocaleString('en-US')
}

export function onAmountInput(event: Event, setter: (value: string) => void) {
  const input = event.target as HTMLInputElement
  const formatted = formatAmountInput(input.value)
  setter(formatted)
  input.value = formatted
}
