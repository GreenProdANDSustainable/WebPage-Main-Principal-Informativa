import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import esMessages from '@/messages/es.json';
import ContactForm from './ContactForm';

const d = esMessages.Pages.contact;

afterEach(() => {
  vi.unstubAllGlobals();
});

function llenarCamposObligatorios() {
  fireEvent.change(screen.getByLabelText(d.name), { target: { value: 'Juan Pérez' } });
  fireEvent.change(screen.getByLabelText(d.emailLabel), {
    target: { value: 'juan@empresa.com' },
  });
  fireEvent.change(screen.getByLabelText(d.message), {
    target: { value: 'Quiero más información.' },
  });
}

describe('<ContactForm />', () => {
  it('avisa si faltan los campos obligatorios en vez de mandar el formulario', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    render(<ContactForm dict={esMessages} lang="es" />);
    fireEvent.click(screen.getByRole('button', { name: d.submitButton }));

    expect(await screen.findByText(d.formErrorRequired)).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('manda los datos a /api/contacto y muestra la confirmación', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', fetchMock);

    render(<ContactForm dict={esMessages} lang="es" />);
    llenarCamposObligatorios();
    fireEvent.click(screen.getByRole('button', { name: d.submitButton }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('/api/contacto');
    const body = JSON.parse(init.body);
    expect(body).toMatchObject({
      name: 'Juan Pérez',
      email: 'juan@empresa.com',
      message: 'Quiero más información.',
      subject: d.subjectOptions[0],
      lang: 'es',
    });

    expect(await screen.findByText(d.formOkTitle)).toBeInTheDocument();
  });

  it('ofrece reintentar cuando el envío falla', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false });
    vi.stubGlobal('fetch', fetchMock);

    render(<ContactForm dict={esMessages} lang="es" />);
    llenarCamposObligatorios();
    fireEvent.click(screen.getByRole('button', { name: d.submitButton }));

    expect(await screen.findByText(d.formErrorTitle)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: d.formRetry }));
    expect(screen.getByRole('button', { name: d.submitButton })).toBeInTheDocument();
  });
});
