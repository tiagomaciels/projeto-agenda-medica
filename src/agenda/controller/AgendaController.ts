import { APIGatewayProxyHandler } from 'aws-lambda';
import { AgendaService } from '../service/AgendaService';

const agendaService = new AgendaService();

export const buscarAgendas: APIGatewayProxyHandler = async () => {
  const agendas = agendaService.buscarAgendas();

  return {
    statusCode: 200,
    body: JSON.stringify(agendas),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};
