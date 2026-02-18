import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi, Mocked } from 'vitest';
import '@testing-library/jest-dom';
import LoginPage from '../../pages/LoginPage.jsx';
import VuelosPage from '../../pages/VuelosPage.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';

vi.mock('axios');
const mockedAxios = axios as Mocked<typeof axios>;

describe('Caso Nº 8 - Test E2E con login hasta paso 3', () => {
  it('login, ver listado de vuelos y filtrar por estado', async () => {
    // Mock del login
    mockedAxios.post.mockResolvedValueOnce({
      data: { access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OTkzM2Q4N2Y3OWE4Yzk1ZjIwZGFkZTgiLCJlbWFpbCI6ImFkbWluMUBnbWFpbC5jb20iLCJyb2wiOiJhZG1pbiIsIm5vbWJyZSI6IlJhZmFlbCIsImlhdCI6MTc3MTQzMDI0NCwiZXhwIjoxNzcxNDMzODQ0fQ.OpWe6KyD8NQbLWPtOAFqN7ix0KV3Zupj3h7Ufx6Nmlc' }
    });

    // Mock de vuelos
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        { _id: '1', origen: 'Salta', destino: 'Formosa', estado: 'programado', avion: 'Airbus A320' },
        { _id: '2', origen: 'Mendoza', destino: 'Buenos Aires', estado: 'en vuelo', avion: 'Boeing 737' }
      ]
    });

    // Mock de función login
    const mockLogin = vi.fn(() => Promise.resolve({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OTkzM2Q4N2Y3OWE4Yzk1ZjIwZGFkZTgiLCJlbWFpbCI6ImFkbWluMUBnbWFpbC5jb20iLCJyb2wiOiJhZG1pbiIsIm5vbWJyZSI6IlJhZmFlbCIsImlhdCI6MTc3MTQzMDI0NCwiZXhwIjoxNzcxNDMzODQ0fQ.OpWe6KyD8NQbLWPtOAFqN7ix0KV3Zupj3h7Ufx6Nmlc', role: 'admin' }));

    // Renderizamos LoginPage dentro de un Router y con contexto
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ login: mockLogin, user: null }}>
          <LoginPage />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    // Completar formulario de login (ajustado a placeholders reales)
    fireEvent.change(screen.getByPlaceholderText(/correo electrónico/i), {
      target: { value: 'admin1@gmail.com' }
    });
    fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
      target: { value: '123456' }
    });

    fireEvent.click(screen.getByRole('button', { name: /ingresar/i }));

    // Simulamos que el login guarda el usuario en contexto
    const mockUser = { role: 'admin', token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OTkzM2Q4N2Y3OWE4Yzk1ZjIwZGFkZTgiLCJlbWFpbCI6ImFkbWluMUBnbWFpbC5jb20iLCJyb2wiOiJhZG1pbiIsIm5vbWJyZSI6IlJhZmFlbCIsImlhdCI6MTc3MTQzMDI0NCwiZXhwIjoxNzcxNDMzODQ0fQ.OpWe6KyD8NQbLWPtOAFqN7ix0KV3Zupj3h7Ufx6Nmlc' };

    // Renderizamos la página de vuelos con usuario autenticado
    render(
      <AuthContext.Provider value={{ user: mockUser }}>
        <VuelosPage />
      </AuthContext.Provider>
    );

    // Paso 2: ver listado
    const table = await screen.findByRole('table');
    expect(table).toBeInTheDocument();

    // Paso 3: filtrar por estado
    const selects = screen.getAllByRole('combobox');
    const filtroEstado = selects[0]; // el select de filtros
    fireEvent.change(filtroEstado, { target: { value: 'programado' } });

    const programados = within(table).getAllByText(/programado/i);
    expect(programados.length).toBeGreaterThan(0);
  });
});
