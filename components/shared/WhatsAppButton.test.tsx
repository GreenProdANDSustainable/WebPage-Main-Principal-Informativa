import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import WhatsAppButton from './WhatsAppButton';

describe('<WhatsAppButton />', () => {
  it('enlaza al número de WhatsApp correcto', () => {
    render(<WhatsAppButton />);
    const link = screen.getByRole('link', { name: /contactar por whatsapp/i });
    expect(link).toHaveAttribute('href', 'https://wa.me/51919514085');
  });

  it('abre en una pestaña nueva de forma segura', () => {
    render(<WhatsAppButton />);
    const link = screen.getByRole('link', { name: /contactar por whatsapp/i });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
