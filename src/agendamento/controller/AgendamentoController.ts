import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { AgendamentoService } from '../service/AgendamentoService';
import { AgendamentoDTO } from '../dto/AgendamentoDTO';
import { IAgendamento } from '../interface/IAgendamento';

const agendamentoService = new AgendamentoService();

export const marcarAgendamento = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    // Parse do body para JSON
    const payload = JSON.parse(event.body || '{}');

    // Validar o payload
    const validacao = validarPayloadAgendamento(payload);
    if (!validacao.valido) {
      return {
        statusCode: 400,
        body: JSON.stringify({ mensagem: validacao.mensagem }),
      };
    }

    // Criar o DTO com o payload validado
    const agendamentoDTO = new AgendamentoDTO(
      payload.medico_id,
      payload.paciente_nome,
      payload.data_horario,
    );

    // Marcar o agendamento
    const resultado = agendamentoService.marcarAgendamento(agendamentoDTO);

    // Retornar a resposta de sucesso
    return {
      statusCode: 201,
      body: JSON.stringify(resultado),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    // Em caso de erro inesperado
    const err =
      error instanceof Error
        ? error.message
        : 'Erro ao processar o agendamento';
    return {
      statusCode: 500,
      body: JSON.stringify({ mensagem: err }),
    };
  }
};

// Função de validação para o payload de agendamento
export function validarPayloadAgendamento(payload: IAgendamento): {
  valido: boolean;
  mensagem?: string;
} {
  const { medico_id, paciente_nome, data_horario } = payload;

  // Validar se todos os campos obrigatórios estão presentes
  if (typeof medico_id !== 'number') {
    return {
      valido: false,
      mensagem: "O campo 'medico_id' é obrigatório e deve ser um número.",
    };
  }
  if (typeof paciente_nome !== 'string' || paciente_nome.trim() === '') {
    return {
      valido: false,
      mensagem:
        "O campo 'paciente_nome' é obrigatório e não deve ser uma string vazia.",
    };
  }
  if (
    typeof data_horario !== 'string' ||
    !/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(data_horario)
  ) {
    return {
      valido: false,
      mensagem:
        "O campo 'data_horario' é obrigatório e deve estar no formato 'YYYY-MM-DD HH:MM'.",
    };
  }

  return { valido: true };
}
