import { AgendaDTO } from '../dto/AgendaDTO';

export const agendaMock: AgendaDTO[] = [
  new AgendaDTO(1, 'Dr. João Silva', 'Cardiologista', [
    '2024-10-05 09:00',
    '2024-10-05 10:00',
    '2024-10-05 11:00',
  ]),
  new AgendaDTO(2, 'Dra. Maria Souza', 'Dermatologista', [
    '2024-10-06 14:00',
    '2024-10-06 15:00',
  ]),
];
