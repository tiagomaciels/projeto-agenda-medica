"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/handler.ts
var handler_exports = {};
__export(handler_exports, {
  buscarAgendas: () => buscarAgendas,
  marcarAgendamento: () => marcarAgendamento
});
module.exports = __toCommonJS(handler_exports);

// src/agenda/dto/AgendaDTO.ts
var AgendaDTO = class {
  constructor(id, nome, especialidade, horarios_disponiveis) {
    this.id = id;
    this.nome = nome;
    this.especialidade = especialidade;
    this.horarios_disponiveis = horarios_disponiveis;
  }
};

// src/agenda/mocks/AgendaMock.ts
var agendaMock = [
  new AgendaDTO(1, "Dr. Jo\xE3o Silva", "Cardiologista", [
    "2024-10-05 09:00",
    "2024-10-05 10:00",
    "2024-10-05 11:00"
  ]),
  new AgendaDTO(2, "Dra. Maria Souza", "Dermatologista", [
    "2024-10-06 14:00",
    "2024-10-06 15:00"
  ])
];

// src/agenda/service/AgendaService.ts
var AgendaService = class {
  buscarAgendas() {
    return { medicos: agendaMock };
  }
};

// src/agenda/controller/AgendaController.ts
var agendaService = new AgendaService();
var buscarAgendas = async () => {
  const agendas = agendaService.buscarAgendas();
  return {
    statusCode: 200,
    body: JSON.stringify(agendas),
    headers: {
      "Content-Type": "application/json"
    }
  };
};

// src/agendamento/mocks/AgendamentoMock.ts
var agendaMock2 = [
  new AgendaDTO(1, "Dr. Jo\xE3o Silva", "Cardiologista", [
    "2024-10-05 09:00",
    "2024-10-05 10:00",
    "2024-10-05 11:00"
  ]),
  new AgendaDTO(2, "Dra. Maria Souza", "Dermatologista", [
    "2024-10-06 14:00",
    "2024-10-06 15:00"
  ])
];
var agendamentoMock = [];

// src/agendamento/service/AgendamentoService.ts
var AgendamentoService = class {
  marcarAgendamento(agendamento) {
    const medico = agendaMock2.find(
      (medico2) => medico2.id === agendamento.medico_id && medico2.horarios_disponiveis.includes(agendamento.data_horario)
    );
    if (!medico) {
      throw new Error("M\xE9dico ou hor\xE1rio indispon\xEDvel");
    }
    agendamentoMock.push(agendamento);
    return {
      mensagem: "Agendamento realizado com sucesso",
      agendamento: {
        medico: medico.nome,
        paciente: agendamento.paciente_nome,
        data_horario: agendamento.data_horario
      }
    };
  }
};

// src/agendamento/dto/AgendamentoDTO.ts
var AgendamentoDTO = class {
  constructor(medico_id, paciente_nome, data_horario) {
    this.medico_id = medico_id;
    this.paciente_nome = paciente_nome;
    this.data_horario = data_horario;
  }
};

// src/agendamento/controller/AgendamentoController.ts
var agendamentoService = new AgendamentoService();
var marcarAgendamento = async (event) => {
  try {
    const { medico_id, paciente_nome, data_horario } = JSON.parse(event.body || "{}");
    if (!medico_id || !paciente_nome || !data_horario) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          mensagem: "Dados incompletos. Certifique-se de que todos os campos est\xE3o preenchidos."
        })
      };
    }
    const agendamentoDTO = new AgendamentoDTO(medico_id, paciente_nome, data_horario);
    const resultado = agendamentoService.marcarAgendamento(agendamentoDTO);
    return {
      statusCode: 201,
      body: JSON.stringify(resultado),
      headers: {
        "Content-Type": "application/json"
      }
    };
  } catch (error) {
    let errorMessage = "Erro ao processar o agendamento";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return {
      statusCode: 400,
      body: JSON.stringify({
        mensagem: errorMessage
      })
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  buscarAgendas,
  marcarAgendamento
});
//# sourceMappingURL=handler.js.map
