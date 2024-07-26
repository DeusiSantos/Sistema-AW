export const objectUsers = {
  user1: {
    foto: "../src/components/img/12.jpg",
    nome: "Andrade",
    sobrenome: "Mateus",
    BI: "03357782LA088",
    Email: "AndradeMateus@gmail.com",
    Contato: 923667554,
    tipo: "Admin",
    nif: '123456789',
    endereco: 'Endereço 1', qtdBlocos: 5,
    id: 1

  },
}



export const objectBacias = {
  bacia1: {
    denominacao: "Bacia 1",
    tipo: "Tipo 1",
    area: "1000 km²",
    decreto: "Decreto 1",
    descricao: "Descrição da Bacia 1"
  },
  bacia2: {
    denominacao: "Bacia 2",
    tipo: "Tipo 2",
    area: "1500 km²",
    decreto: "Decreto 2",
    descricao: "Descrição da Bacia 2"
  },
  bacia3: {
    denominacao: "Bacia 3",
    tipo: "Tipo 3",
    area: "2000 km²",
    decreto: "Decreto 3",
    descricao: "Descrição da Bacia 3"
  },
  bacia4: {
    denominacao: "Bacia 4",
    tipo: "Tipo 4",
    area: "2500 km²",
    decreto: "Decreto 4",
    descricao: "Descrição da Bacia 4"
  },
  bacia5: {
    denominacao: "Bacia 5",
    tipo: "Tipo 5",
    area: "3000 km²",
    decreto: "Decreto 5",
    descricao: "Descrição da Bacia 5"
  },
  bacia6: {
    denominacao: "Bacia 1",
    tipo: "Tipo 1",
    area: "1000 km²",
    decreto: "Decreto 1",
    descricao: "Descrição da Bacia 1"
  },
  bacia7: {
    denominacao: "Bacia 2",
    tipo: "Tipo 2",
    area: "1500 km²",
    decreto: "Decreto 2",
    descricao: "Descrição da Bacia 2"
  },
  bacia8: {
    denominacao: "Bacia 3",
    tipo: "Tipo 3",
    area: "2000 km²",
    decreto: "Decreto 3",
    descricao: "Descrição da Bacia 3"
  },
  bacia9: {
    denominacao: "Bacia 4",
    tipo: "Tipo 4",
    area: "2500 km²",
    decreto: "Decreto 4",
    descricao: "Descrição da Bacia 4"
  },
  bacia10: {
    denominacao: "Bacia 5",
    tipo: "Tipo 5",
    area: "3000 km²",
    decreto: "Decreto 5",
    descricao: "Descrição da Bacia 5"
  }
};


export const BlocosObjects = [
  {
      id: 1,
      denominacao: "Bloco 1",
      operador: "Empresa X",
      tipoBacias: "Marítimas",
      bacias: "Bacia1",
      numeroBloco: "B-123",
      decretoConcepcao: "123/2023",
      tipoContrato: "Concessão",
      dataAssinaturaContrato: "01/01/2023",
      dataEfetiva: "01/02/2023",
      dataFinalPesquisa: "01/03/2023",
      bonusAssinatura: "$1,000,000",
      bonusSocial: "$500,000",
      aquisicaoSismica: "Sim",
      penalidade: "5%",
      areaBloco: "1000 km²",
      sismicaBloco: "Alta resolução",
      laminaAgua: "50 metros",
      numPocosExpectavies: 10,
      gerenteBloco: "João Silva",
      contatoGerente: "(11) 99999-9999",
      emailGerente: "joao.silva@empresa.com",
      diretorExploracao: "Maria Souza",
      emailDiretorExploracao: "maria.souza@empresa.com",
      contato1DiretorExploracao: "(11) 88888-8888",
      contato2DiretorExploracao: "(11) 77777-7777",
      notas: "Este bloco está localizado na região sul da Bacia de Santos."
  },
  {
      id: 2,
      denominacao: "Bloco 2",
      operador: "Empresa Y",
      tipoBacias: "Terrestres",
      bacias: "Bacia2",
      numeroBloco: "B-456",
      decretoConcepcao: "456/2023",
      tipoContrato: "Partilha de Produção",
      dataAssinaturaContrato: "01/04/2023",
      dataEfetiva: "01/05/2023",
      dataFinalPesquisa: "01/06/2023",
      bonusAssinatura: "$800,000",
      bonusSocial: "$300,000",
      aquisicaoSismica: "Não",
      penalidade: "3%",
      areaBloco: "800 km²",
      sismicaBloco: "Média resolução",
      laminaAgua: "30 metros",
      numPocosExpectavies: 8,
      gerenteBloco: "Pedro Oliveira",
      contatoGerente: "(11) 66666-6666",
      emailGerente: "pedro.oliveira@empresa.com",
      diretorExploracao: "Ana Rodrigues",
      emailDiretorExploracao: "ana.rodrigues@empresa.com",
      contato1DiretorExploracao: "(11) 55555-5555",
      contato2DiretorExploracao: "(11) 44444-4444",
      notas: "Este bloco está localizado na região norte da Bacia do Paraná."
  },
];


export const camposObjects = [
  {
      id: 1,
      nome: "Campo 1",
      nomeBloco: "Bloco A",
      tipoBacias: "Tipo A",
      bacias: "Bacia X",
      operador: "Operador 1",
      bloco: "Bloco A"
  },
  {
      id: 2,
      nome: "Campo 2",
      nomeBloco: "Bloco B",
      tipoBacias: "Tipo B",
      bacias: "Bacia Y",
      operador: "Operador 2",
      bloco: "Bloco B"
  },
  {
      id: 3,
      nome: "Campo 3",
      nomeBloco: "Bloco C",
      tipoBacias: "Tipo C",
      bacias: "Bacia Z",
      operador: "Operador 3",
      bloco: "Bloco C"
  },
  // Adicione mais objetos de campos conforme necessário
];

export const objectPocos = {
  poco1: {
    id: 1,
    nomeCampo: 'Campo A',
    numeroBloco: 'B1',
    tipoBacias: 'Tipo 1',
    bacias: 'Bacia X',
    operador: 'Operador A',
    bloco: 'Bloco 1',
    plataforma: 'Plataforma 1',
    estado: 'Ativo',
    descricao: 'Descrição do Poço A',
    numeroLicencaExploracao: '123456',
    dataInicioPerfuracao: '01/01/2023',
    dataFimPerfuracao: '01/02/2023',
  },
  poco2: {
    id: 2,
    nomeCampo: 'Campo B',
    numeroBloco: 'B2',
    tipoBacias: 'Tipo 2',
    bacias: 'Bacia Y',
    operador: 'Operador B',
    bloco: 'Bloco 2',
    plataforma: 'Plataforma 2',
    estado: 'Inativo',
    descricao: 'Descrição do Poço B',
    numeroLicencaExploracao: '654321',
    dataInicioPerfuracao: '01/03/2023',
    dataFimPerfuracao: '01/04/2023',
  },
  poco3: {
    id: 3,
    nomeCampo: 'Campo C',
    numeroBloco: 'B3',
    tipoBacias: 'Tipo 1',
    bacias: 'Bacia Z',
    operador: 'Operador C',
    bloco: 'Bloco 3',
    plataforma: 'Plataforma 3',
    estado: 'Em Andamento',
    descricao: 'Descrição do Poço C',
    numeroLicencaExploracao: '987654',
    dataInicioPerfuracao: '01/05/2023',
    dataFimPerfuracao: '01/06/2023',
  },
  poco6: {
    id: 3,
    nomeCampo: 'Campo C',
    numeroBloco: 'B3',
    tipoBacias: 'Tipo 1',
    bacias: 'Bacia Z',
    operador: 'Operador C',
    bloco: 'Bloco 3',
    plataforma: 'Plataforma 3',
    estado: 'Em Andamento',
    descricao: 'Descrição do Poço C',
    numeroLicencaExploracao: '987654',
    dataInicioPerfuracao: '01/05/2023',
    dataFimPerfuracao: '01/06/2023',
  },
  poco4: {
    id: 3,
    nomeCampo: 'Campo C',
    numeroBloco: 'B3',
    tipoBacias: 'Tipo 1',
    bacias: 'Bacia Z',
    operador: 'Operador C',
    bloco: 'Bloco 3',
    plataforma: 'Plataforma 3',
    estado: 'Em Andamento',
    descricao: 'Descrição do Poço C',
    numeroLicencaExploracao: '987654',
    dataInicioPerfuracao: '01/05/2023',
    dataFimPerfuracao: '01/06/2023',
  },
  poco5: {
    id: 3,
    nomeCampo: 'Campo C',
    numeroBloco: 'B3',
    tipoBacias: 'Tipo 1',
    bacias: 'Bacia Z',
    operador: 'Operador C',
    bloco: 'Bloco 3',
    plataforma: 'Plataforma 3',
    estado: 'Em Andamento',
    descricao: 'Descrição do Poço C',
    numeroLicencaExploracao: '987654',
    dataInicioPerfuracao: '01/05/2023',
    dataFimPerfuracao: '01/06/2023',
  },
  poco8: {
    id: 3,
    nomeCampo: 'Campo C',
    numeroBloco: 'B3',
    tipoBacias: 'Tipo 1',
    bacias: 'Bacia Z',
    operador: 'Operador C',
    bloco: 'Bloco 3',
    plataforma: 'Plataforma 3',
    estado: 'Em Andamento',
    descricao: 'Descrição do Poço C',
    numeroLicencaExploracao: '987654',
    dataInicioPerfuracao: '01/05/2023',
    dataFimPerfuracao: '01/06/2023',
  },
  poco7: {
    id: 3,
    nomeCampo: 'Campo C',
    numeroBloco: 'B3',
    tipoBacias: 'Tipo 1',
    bacias: 'Bacia Z',
    operador: 'Operador C',
    bloco: 'Bloco 3',
    plataforma: 'Plataforma 3',
    estado: 'Em Andamento',
    descricao: 'Descrição do Poço C',
    numeroLicencaExploracao: '987654',
    dataInicioPerfuracao: '01/05/2023',
    dataFimPerfuracao: '01/06/2023',
  },
};

export const projetos = [
  {
      id: 1,
      nomeProjeto: "Projeto A",
      criadoPor: "João",
      dataCriacao: "2024-04-20",
      operador: "Operador A",
      bloco: "Bloco 1",
      poco: "Poço 1",
      licenca: "Licença 12345"
  },
  {
      id: 2,
      nomeProjeto: "Projeto B",
      criadoPor: "Maria",
      dataCriacao: "2024-04-22",
      operador: "Operador B",
      bloco: "Bloco 2",
      poco: "Poço 2",
      licenca: "Licença 67890"
  },
  {
      id: 3,
      nomeProjeto: "Projeto C",
      criadoPor: "Pedro",
      dataCriacao: "2024-04-25",
      operador: "Operador C",
      bloco: "Bloco 3",
      poco: "Poço 3",
      licenca: "Licença 24680"
  }
];


export const objectPlataformas = {
  plataforma1: {
      id: 1,
      descricao: 'Plataforma A',
      tipo: 'Tipo 1',
      latitude: '40.7128° N',
      longitude: '74.0060° W',
      capacidade: '10000 bpd',
      profundidade: '1000 m',
      qtdPocos: 5,
      estado: 'Ativo',
  },
  plataforma2: {
      id: 2,
      descricao: 'Plataforma B',
      tipo: 'Tipo 2',
      latitude: '34.0522° N',
      longitude: '118.2437° W',
      capacidade: '8000 bpd',
      profundidade: '800 m',
      qtdPocos: 3,
      estado: 'Inativo',
  },
  plataforma3: {
      id: 3,
      descricao: 'Plataforma C',
      tipo: 'Tipo 3',
      latitude: '51.5074° N',
      longitude: '0.1278° W',
      capacidade: '12000 bpd',
      profundidade: '1200 m',
      qtdPocos: 7,
      estado: 'Ativo',
  },
  plataforma4: {
      id: 4,
      descricao: 'Plataforma D',
      tipo: 'Tipo 1',
      latitude: '48.8566° N',
      longitude: '2.3522° E',
      capacidade: '15000 bpd',
      profundidade: '1500 m',
      qtdPocos: 6,
      estado: 'Ativo',
  },
};




