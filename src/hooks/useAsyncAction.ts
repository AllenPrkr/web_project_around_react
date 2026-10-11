import { useState } from 'react'

export function getErrorMessage(error: unknown, fallback: string): string {
  return error instanceof Error && error.message ? error.message : fallback
}

export default function useAsyncAction() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  async function run(action: () => Promise<void>, fallback: string) {
    setIsSubmitting(true)
    setSubmitError('')

    try {
      await action()
      return true
    } catch (error) {
      setSubmitError(getErrorMessage(error, fallback))
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  return { isSubmitting, run, submitError }
}
