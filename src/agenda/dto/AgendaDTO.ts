import { IAgenda } from '../interface/IAgenda';

export class AgendaDTO implements IAgenda {
  id: number;
  nome: string;
  especialidade: string;
  horarios_disponiveis: string[];

  constructor(
    id: number,
    nome: string,
    especialidade: string,
    horarios_disponiveis: string[],
  ) {
    this.id = id;
    this.nome = nome;
    this.especialidade = especialidade;
    this.horarios_disponiveis = horarios_disponiveis;
  }
}
