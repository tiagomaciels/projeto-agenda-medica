# [2024] Projeto Agenda Médica - API com AWS Lambda e Serverless Framework

## Este projeto é uma API para buscar agendas e horários de médicos e marcar agendamento do paciente.

API construída utlizando Node.js, TypeScript e Serverless Framework com o plugin serveless-offline para teste local. E as funções foram implementadas como AWS Lambda e as triggers Rest API (AWS Api Gateway).

## Índice

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Configuração do Projeto](#configuração-do-projeto)
- [Comandos Disponíveis](#comandos-disponíveis)
- [Endpoints](#endpoints)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Deploy na AWS](#deploy-na-aws)
- [Considerações](#considerações)

---

### Tecnologias Utilizadas

- **Node.js** com **TypeScript** para construção da API
- **Jest** para testes unitários da lógica de negócio e validações
- **Serverless Framework** para gerenciar a infraestrutura
- **AWS Lambda** e **API Gateway** para deploy Serverless
- **ESLint** e **Prettier** para qualidade e formatação do código

### Configuração do Projeto

1. **Clonar o Repositório**
   ```bash
   git clone https://github.com/tiagomaciels/projeto-agenda-medica.git
   cd projeto-agenda-medica
   ```
2. **Instalar Dependências**

   ```bash
   npm install
   ```

3. **Configurar Credenciais AWS**

   Configure suas credenciais AWS para permitir o deploy

   ```bash
   aws configure
   ```

4. **Configuração do Serverless**

   Verifique o arquivo serverless.yml para ajustar as configurações de acordo com suas necessidades.


5. **Executar o Jest para testes unitários da lógica de negócio e validações**
      ```bash
      npx jest
      ```

6. **Executar o projeto localmente com o plugin serveless-offline**
      ```bash
      npx serverless offline
      ```

### Comandos Disponíveis

Verifica problemas de código com o ESLint:

    npm run lint

Corrige problemas de código automaticamente:

    npm run lint:fix

Aplica a formatação de código com o Prettier:

    npm run format

Executa testes unitários da lógica de negócio e validações

    npx jest

Executa o projeto localmente para testes:

    npx serverless offline

Faz o deploy da aplicação para a AWS Lambda:

    npx serverless deploy


### Endpoints

Local:

1. **Endpoint: Buscar agendas e horários dos médicos**

- **Rota**: `GET /agendas`

        GET | http://localhost:3000/dev/agendas

- **Descrição**: Retorna uma lista de médicos com suas respectivas agendas e horários disponíveis.
- **Resposta esperada**:

        {
            "medicos": [
                {
                    "id": 1,
                    "nome": "Dr. João Silva",
                    "especialidade": "Cardiologista",
                    "horarios_disponiveis": [
                        "2024-10-05 09:00",
                        "2024-10-05 10:00",
                        "2024-10-05 11:00"
                    ]
                },
                {
                    "id": 2,
                    "nome": "Dra. Maria Souza",
                    "especialidade": "Dermatologista",
                    "horarios_disponiveis": [
                        "2024-10-06 14:00",
                        "2024-10-06 15:00"
                    ]
                }
            ]
        }

2. **Endpoint: Marcar agendamento do paciente**

- **Rota**: `POST /agendamento`

        POST | http://localhost:3000/dev/agendamento

- **Descrição**: Permite que o paciente marque um horário de consulta com um médico.
- **Payload esperado**:

        {
            "medico_id": 1,
            "paciente_nome": "Carlos Almeida",
            "data_horario": "2024-10-05 09:00"
        }

- **Resposta esperada**:

        {
            "mensagem": "Agendamento realizado com sucesso",
            "agendamento": {
                "medico": "Dr. João Silva",
                "paciente": "Carlos Almeida",
                "data_horario": "2024-10-05 09:00"
            }
        }

### Estrutura de Pastas

    projeto-agenda-medica/
    ├── src/
    │   ├── utils/                  # Funções utilitárias
    │   ├── agenda/
    │   │   ├── controller/         # Lógica de controle de agenda
    │   │   ├── service/            # Lógica de negócio da agenda
    │   │   ├── dto/                # Definições de DTOs
    │   │   ├── interface/          # Definições de interfaces
    │   │   ├── mocks/              # Dados de exemplo para testes
    │   ├── agendamento/
    │   │   ├── controller/         # Lógica de controle de agendamento
    │   │   ├── service/            # Lógica de negócio do agendamento
    │   │   ├── dto/                # Definições de DTOs
    │   │   ├── interface/          # Definições de interfaces
    │   │   ├── mocks/              # Dados de exemplo para testes
    │   ├── handler.ts              # Ponto de entrada para funções Lambda
    ├── .gitignore                  # Pastas ignorados pelo Git
    ├── .prettierignore             # Arquivos e pastas ignorados pelo Prettier
    ├── .prettierrc                 # Configuração do Prettier
    ├── eslint.config.js            # Configuração do ESLint
    ├── jest.config.ts              # Configuração do Jest      
    ├── package.json                # Dependências do projeto
    ├── README.md                   # Instruções do projeto.
    ├── serverless.yml              # Configurações do Serverless Framework
    └── tsconfig.json               # Configurações do Typescript

### Deploy na AWS

Para fazer o deploy da aplicação para a AWS Lambda:

        npx serverless deploy

Após o deploy, você receberá as URLs de endpoint fornecidas pela AWS.

### Considerações

- **Limitações e Escalabilidade:** Este projeto foi projetado como uma API serverless e pode ser escalado automaticamente pela AWS Lambda para atender ao aumento de requisições sem a necessidade de gerenciar servidores. A escolha do API Gateway também permite lidar com CORS, autenticação e roteamento com facilidade.

- **Segurança:** Certifique-se de configurar as permissões de segurança da AWS corretamente. É altamente recomendável o uso do AWS IAM com políticas restritivas para garantir que as funções Lambda tenham acesso apenas aos recursos necessários. Em ambientes de produção, considere implementar mecanismos de autenticação e autorização.

- **Manutenção e Testes:** Este projeto inclui o uso de TypeScript para melhorar a legibilidade e evitar erros durante o desenvolvimento. O Jest é utilizado para testes unitários, assegurando que a lógica de negócio se comporte conforme o esperado e facilitando a identificação de erros durante o desenvolvimento. Para manter a qualidade do código, utilize os comandos de linting e formatação (npm run lint e npm run format ou configure seu VSCode para formatar o código ao salvar) antes de cada commit, e execute regularmente os testes (npm run test). Adicionalmente, considere expandir os testes unitários para cobrir integrações com o API Gateway e simulações de resposta da AWS.

- **Despesas e Custos:** A execução de funções Lambda e o uso do API Gateway podem gerar custos, especialmente se a API for utilizada em grande escala. Monitore o uso através do console da AWS e configure alertas para evitar cobranças inesperadas. A AWS oferece uma camada gratuita que pode cobrir os custos iniciais de desenvolvimento e testes.

- **Deploy e Ambiente de Desenvolvimento:** O Serverless Framework facilita o deploy e a administração de recursos na AWS, mas é fundamental configurar as credenciais AWS corretamente. Em ambientes de desenvolvimento, o uso do plugin **serverless-offline** permite a simulação local do API Gateway e Lambda, ajudando a desenvolver e testar o projeto sem custos adicionais.
