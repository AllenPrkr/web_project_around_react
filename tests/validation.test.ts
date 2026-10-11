import { describe, expect, it } from 'vitest'
import {
  hasValidationErrors,
  validateValue,
  validateValues,
} from '../src/utils/validation'

describe('validación de formularios', () => {
  it('rechaza valores obligatorios vacíos o con espacios', () => {
    expect(
      validateValue('   ', { label: 'El nombre', required: true }),
    ).toBe('El nombre es obligatorio.')
  })

  it('comprueba las longitudes mínima y máxima', () => {
    const rule = {
      label: 'El título',
      required: true,
      minLength: 2,
      maxLength: 5,
    }

    expect(validateValue('A', rule)).toContain('al menos 2')
    expect(validateValue('Demasiado largo', rule)).toContain('como máximo 5')
    expect(validateValue('Lugar', rule)).toBe('')
  })

  it('solo acepta enlaces HTTP o HTTPS válidos', () => {
    const rule = {
      label: 'El enlace',
      required: true,
      type: 'url' as const,
    }

    expect(validateValue('imagen.jpg', rule)).toContain('URL válida')
    expect(validateValue('ftp://example.com/image.jpg', rule)).toContain(
      'URL válida',
    )
    expect(validateValue('https://example.com/image.jpg', rule)).toBe('')
  })

  it('valida todos los campos de un formulario', () => {
    const errors = validateValues(
      { name: '', link: 'https://example.com/image.jpg' },
      {
        name: { label: 'El título', required: true },
        link: { label: 'El enlace', required: true, type: 'url' },
      },
    )

    expect(errors.name).toBeTruthy()
    expect(errors.link).toBe('')
    expect(hasValidationErrors(errors)).toBe(true)
  })
})
