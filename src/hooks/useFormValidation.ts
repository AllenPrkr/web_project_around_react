import { useState } from 'react'
import {
  hasValidationErrors,
  validateValue,
  validateValues,
  type ValidationRules,
} from '../utils/validation'

export default function useFormValidation(
  values: Record<string, string>,
  rules: ValidationRules,
) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  function validateField(name: string): void {
    const rule = rules[name]

    if (!rule) return

    setTouched((current) => ({ ...current, [name]: true }))
    setErrors((current) => ({
      ...current,
      [name]: validateValue(values[name] ?? '', rule),
    }))
  }

  function validateChangedField(name: string, value: string): void {
    if (!touched[name] || !rules[name]) return

    setErrors((current) => ({
      ...current,
      [name]: validateValue(value, rules[name]),
    }))
  }

  function validateForm(): boolean {
    const nextErrors = validateValues(values, rules)
    const allTouched = Object.fromEntries(
      Object.keys(rules).map((name) => [name, true]),
    )

    setTouched(allTouched)
    setErrors(nextErrors)
    return !hasValidationErrors(nextErrors)
  }

  return { errors, validateChangedField, validateField, validateForm }
}
