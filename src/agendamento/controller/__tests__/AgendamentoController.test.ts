import { APIGatewayProxyEvent } from 'aws-lambda';
import { marcarAgendamento } from '../AgendamentoController';
import { AgendamentoService } from '../../service/AgendamentoService';

// Mock do AgendamentoService para isolar a lógica de negócio
jest.mock('../../service/AgendamentoService');

const mockAgendamentoService = AgendamentoService as jest.MockedClass<
  typeof AgendamentoService
>;

describe('AgendamentoController', () => {
  beforeEach(() => {
    // Resetar mocks antes de cada teste
    jest.clearAllMocks();
  });

  test('Deve retornar erro 400 quando o corpo da requisição (event.body) está ausente', async () => {
    const event = {} as APIGatewayProxyEvent; // `event.body` está indefinido
    const result = await marcarAgendamento(event);

    expect(result.statusCode).toBe(400);
    expect(JSON.parse(result.body)).toEqual({
      mensagem: "O campo 'medico_id' é obrigatório e deve ser um número.",
    });
  });

  // Teste para caso de sucesso
  test('Deve retornar 201 e uma mensagem de sucesso quando o agendamento for realizado com sucesso', async () => {
    mockAgendamentoService.prototype.marcarAgendamento.mockReturnValue({
      mensagem: 'Agendamento realizado com sucesso',
      agendamento: {
        medico: 'Dr. João Silva',
        paciente: 'Carlos Almeida',
        data_horario: '2024-10-05 09:00',
      },
    });

    const event = {
      body: JSON.stringify({
        medico_id: 1,
        paciente_nome: 'Carlos Almeida',
        data_horario: '2024-10-05 09:00',
      }),
    } as APIGatewayProxyEvent;

    const result = await marcarAgendamento(event);

    expect(result.statusCode).toBe(201);
    expect(JSON.parse(result.body)).toEqual({
      mensagem: 'Agendamento realizado com sucesso',
      agendamento: {
        medico: 'Dr. João Silva',
        paciente: 'Carlos Almeida',
        data_horario: '2024-10-05 09:00',
      },
    });
  });

  // Testes para erros de validação
  test("Deve retornar erro 400 quando o payload está faltando 'medico_id'", async () => {
    const event = {
      body: JSON.stringify({
        paciente_nome: 'Carlos Almeida',
        data_horario: '2024-10-05 09:00',
      }),
    } as APIGatewayProxyEvent;

    const result = await marcarAgendamento(event);

    expect(result.statusCode).toBe(400);
    expect(JSON.parse(result.body)).toEqual({
      mensagem: "O campo 'medico_id' é obrigatório e deve ser um número.",
    });
  });

  test("Deve retornar erro 400 quando o payload está faltando 'paciente_nome'", async () => {
    const event = {
      body: JSON.stringify({
        medico_id: 1,
        data_horario: '2024-10-05 09:00',
      }),
    } as APIGatewayProxyEvent;

    const result = await marcarAgendamento(event);

    expect(result.statusCode).toBe(400);
    expect(JSON.parse(result.body)).toEqual({
      mensagem:
        "O campo 'paciente_nome' é obrigatório e não deve ser uma string vazia.",
    });
  });

  test("Deve retornar erro 400 quando o campo 'data_horario' está no formato incorreto", async () => {
    const event = {
      body: JSON.stringify({
        medico_id: 1,
        paciente_nome: 'Carlos Almeida',
        data_horario: '2024/10/05 09:00', // Formato incorreto
      }),
    } as APIGatewayProxyEvent;

    const result = await marcarAgendamento(event);

    expect(result.statusCode).toBe(400);
    expect(JSON.parse(result.body)).toEqual({
      mensagem:
        "O campo 'data_horario' é obrigatório e deve estar no formato 'YYYY-MM-DD HH:MM'.",
    });
  });

  // Testes para o bloco catch
  test('Deve retornar erro 500 para exceções inesperadas', async () => {
    mockAgendamentoService.prototype.marcarAgendamento.mockImplementation(
      () => {
        throw new Error('Erro ao processar o agendamento');
      },
    );

    const event = {
      body: JSON.stringify({
        medico_id: 1,
        paciente_nome: 'Carlos Almeida',
        data_horario: '2024-10-05 09:00',
      }),
    } as APIGatewayProxyEvent;

    const result = await marcarAgendamento(event);

    expect(result.statusCode).toBe(500);
    expect(JSON.parse(result.body)).toEqual({
      mensagem: 'Erro ao processar o agendamento',
    });
  });

  test('Deve retornar erro 500 com mensagem padrão quando o erro não for uma instância de Error', async () => {
    // Simulando um erro que não é uma instância de Error
    mockAgendamentoService.prototype.marcarAgendamento.mockImplementation(
      () => {
        throw 'Erro ao processar o agendamento';
      },
    );

    const event = {
      body: JSON.stringify({
        medico_id: 1,
        paciente_nome: 'Carlos Almeida',
        data_horario: '2024-10-05 09:00',
      }),
    } as APIGatewayProxyEvent;

    const result = await marcarAgendamento(event);

    expect(result.statusCode).toBe(500);
    expect(JSON.parse(result.body)).toEqual({
      mensagem: 'Erro ao processar o agendamento',
    });
  });
});
