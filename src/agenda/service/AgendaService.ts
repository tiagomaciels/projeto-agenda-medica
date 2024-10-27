import { agendaMock } from '../mocks/AgendaMock';
import { IAgenda } from '../interface/IAgenda';

export class AgendaService {
  buscarAgendas(): { medicos: IAgenda[] } {
    return { medicos: agendaMock };
  }
}
