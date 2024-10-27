import { IAgendamento } from '../interface/IAgendamento';

export class AgendamentoDTO implements IAgendamento {
  medico_id: number;
  paciente_nome: string;
  data_horario: string;

  constructor(medico_id: number, paciente_nome: string, data_horario: string) {
    this.medico_id = medico_id;
    this.paciente_nome = paciente_nome;
    this.data_horario = data_horario;
  }
}
