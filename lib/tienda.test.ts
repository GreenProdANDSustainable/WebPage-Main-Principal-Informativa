import { afterEach, describe, expect, it } from 'vitest';
import { PRECIOS, formatearSoles, idDeProducto, precioDe, totalPedido } from './tienda';

/** Deja la tabla de precios como estaba: hoy, vacía. */
afterEach(() => {
  for (const clave of Object.keys(PRECIOS)) delete PRECIOS[clave];
});

describe('idDeProducto', () => {
  it('convierte el nombre del catálogo en la clave del carrito', () => {
    expect(idDeProducto('GP-Trich')).toBe('gp-trich');
    expect(idDeProducto('  GP-Megafort ')).toBe('gp-megafort');
  });
});

describe('formatearSoles', () => {
  it('escribe el monto en soles', () => {
    // Intl separa el símbolo con un espacio que no siempre es el común.
    expect(formatearSoles(45).replace(/\s/g, ' ')).toBe('S/ 45.00');
    expect(formatearSoles(1234.5).replace(/\s/g, ' ')).toBe('S/ 1,234.50');
  });
});

describe('precioDe', () => {
  it('devuelve null cuando el producto todavía no tiene precio', () => {
    expect(precioDe('gp-trich')).toBeNull();
  });

  it('devuelve el precio cargado', () => {
    PRECIOS['gp-trich'] = 45;
    expect(precioDe('gp-trich')).toBe(45);
  });
});

describe('totalPedido', () => {
  it('sin lista de precios, el total queda incompleto', () => {
    const { total, completo } = totalPedido([{ id: 'gp-trich', quantity: 2 }]);
    expect(completo).toBe(false);
    expect(total).toBe(0);
  });

  it('multiplica precio por cantidad y suma las líneas', () => {
    PRECIOS['gp-trich'] = 45;
    PRECIOS['gp-bauver'] = 10;

    const { total, completo } = totalPedido([
      { id: 'gp-trich', quantity: 2 },
      { id: 'gp-bauver', quantity: 3 },
    ]);

    expect(total).toBe(120);
    expect(completo).toBe(true);
  });

  it('marca incompleto si a una sola línea le falta precio', () => {
    PRECIOS['gp-trich'] = 45;

    const { total, completo } = totalPedido([
      { id: 'gp-trich', quantity: 1 },
      { id: 'gp-sin-precio', quantity: 1 },
    ]);

    // El monto que sí se pudo calcular se conserva, pero `completo` avisa
    // que no sirve para cobrar.
    expect(total).toBe(45);
    expect(completo).toBe(false);
  });
});
