export type ValidationRule = {
  label: string
  required?: boolean
  minLength?: number
  maxLength?: number
  type?: 'text' | 'url'
}

export type ValidationRules = Record<string, ValidationRule>

export function validateValue(value: string, rule: ValidationRule): string {
  const normalizedValue = value.trim()

  if (rule.required && normalizedValue.length === 0) {
    return `${rule.label} es obligatorio.`
  }

  if (rule.minLength && normalizedValue.length < rule.minLength) {
    return `${rule.label} debe tener al menos ${rule.minLength} caracteres.`
  }

  if (rule.maxLength && normalizedValue.length > rule.maxLength) {
    return `${rule.label} debe tener como máximo ${rule.maxLength} caracteres.`
  }

  if (rule.type === 'url' && normalizedValue.length > 0) {
    try {
      const url = new URL(normalizedValue)

      if (!['http:', 'https:'].includes(url.protocol)) {
        throw new Error('Unsupported URL protocol')
      }
    } catch {
      return 'Ingresa una URL válida que empiece con http:// o https://.'
    }
  }

  return ''
}

export function validateValues(
  values: Record<string, string>,
  rules: ValidationRules,
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(rules).map(([name, rule]) => [
      name,
      validateValue(values[name] ?? '', rule),
    ]),
  )
}

export function hasValidationErrors(errors: Record<string, string>): boolean {
  return Object.values(errors).some(Boolean)
}
