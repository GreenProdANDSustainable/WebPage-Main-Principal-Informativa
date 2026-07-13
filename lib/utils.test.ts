import { describe, expect, it } from 'vitest';
import { cn } from './utils';

describe('cn()', () => {
  it('une clases simples separadas por espacio', () => {
    expect(cn('px-2', 'py-1')).toBe('px-2 py-1');
  });

  it('ignora valores falsy (undefined, null, false)', () => {
    expect(cn('px-2', undefined, null, false, 'py-1')).toBe('px-2 py-1');
  });

  it('resuelve conflictos de Tailwind quedándose con la última clase', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });

  it('soporta clases condicionales vía objeto', () => {
    expect(cn('base', { 'text-red-500': true, 'text-blue-500': false })).toBe('base text-red-500');
  });
});
