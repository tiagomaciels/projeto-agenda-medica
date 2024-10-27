import { AgendamentoService } from '../AgendamentoService';
import { AgendamentoDTO } from '../../dto/AgendamentoDTO';

describe('AgendamentoService', () => {
  let agendamentoService: AgendamentoService;

  beforeEach(() => {
    agendamentoService = new AgendamentoService();
  });

  test('Deve realizar um agendamento com sucesso', () => {
    const agendamentoDTO = new AgendamentoDTO(
      1,
      'Carlos Almeida',
      '2024-10-05 09:00',
    );

    const resultado = agendamentoService.marcarAgendamento(agendamentoDTO);
    expect(resultado.mensagem).toBe('Agendamento realizado com sucesso');
    expect(resultado.agendamento).toEqual({
      medico: 'Dr. João Silva',
      paciente: 'Carlos Almeida',
      data_horario: '2024-10-05 09:00',
    });
  });

  test('Deve lançar erro se o médico ou horário estiver indisponível', () => {
    const agendamentoDTO = new AgendamentoDTO(
      1,
      'Carlos Almeida',
      '2024-10-07 09:00',
    );

    expect(() => agendamentoService.marcarAgendamento(agendamentoDTO)).toThrow(
      'Médico ou horário indisponível',
    );
  });
});
