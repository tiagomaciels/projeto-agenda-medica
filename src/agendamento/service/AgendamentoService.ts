import { AgendamentoDTO } from '../dto/AgendamentoDTO';
import { agendaMock } from '../../agenda/mocks/AgendaMock';
import { agendamentoMock } from '../mocks/AgendamentoMock';

export class AgendamentoService {
  marcarAgendamento(agendamento: AgendamentoDTO) {
    // Verificar se o médico e o horário existem na agenda
    const medico = agendaMock.find(
      (medico) =>
        medico.id === agendamento.medico_id &&
        medico.horarios_disponiveis.includes(agendamento.data_horario),
    );

    if (!medico) {
      throw new Error('Médico ou horário indisponível');
    }

    // Adicionar o agendamento à lista de agendamentos
    agendamentoMock.push(agendamento);

    return {
      mensagem: 'Agendamento realizado com sucesso',
      agendamento: {
        medico: medico.nome,
        paciente: agendamento.paciente_nome,
        data_horario: agendamento.data_horario,
      },
    };
  }
}
