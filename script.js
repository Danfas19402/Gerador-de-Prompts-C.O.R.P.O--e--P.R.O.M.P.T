// === Script principal ===

document.addEventListener('DOMContentLoaded', () => {

  const modoBtn = document.getElementById('modoEscuro');
  const outputEl = document.getElementById('outputPrompt');

  // Função do modo escuro
  function aplicarModoEscuro(ativo) {
    if (ativo) {
      document.body.classList.add('dark');
      modoBtn.textContent = '☀️ Modo Claro';
    } else {
      document.body.classList.remove('dark');
      modoBtn.textContent = '🌙 Modo Escuro';
    }
    localStorage.setItem('modoEscuro', ativo ? 'true' : 'false');
  }

  // Evento de clique
  modoBtn.addEventListener('click', () => {
    const ativo = document.body.classList.toggle('dark');
    aplicarModoEscuro(ativo);
  });

  // Aplicar o modo salvo (Chrome corrige ao carregar DOM)
  const modoSalvo = localStorage.getItem('modoEscuro');
  console.log('Modo salvo:', modoSalvo);
  if (modoSalvo === 'true') {
    aplicarModoEscuro(true);
  } else {
    aplicarModoEscuro(false);
  }

  // Demais botões e funções originais
  const gerarBtn = document.getElementById('gerar');
  const copiarBtn = document.getElementById('copiar');
  const baixarBtn = document.getElementById('baixar');
  const exportarBtn = document.getElementById('exportar');
  const exemploBtn = document.getElementById('exemplo');
  const aleatorioBtn = document.getElementById('aleatorio');

  const fields = [
    'contexto','objetivo','regras','persona','output',
    'proposito','requisitos','orientacoes','modelo','parametros','tarefa'
  ];

  const val = id => document.getElementById(id).value.trim();

  function montarPrompt() {
    const corpo = `C.O.R.P.O
Contexto: ${val('contexto')}
Objetivo: ${val('objetivo')}
Regras: ${val('regras')}
Persona: ${val('persona')}
Output: ${val('output')}`;

    const prompt = `P.R.O.M.P.T
Propósito: ${val('proposito')}
Requisitos: ${val('requisitos')}
Orientações: ${val('orientacoes')}
Modelo: ${val('modelo')}
Parâmetros: ${val('parametros')}
Tarefa: ${val('tarefa')}`;

    return `${corpo}\n\n${prompt}`;
  }

  gerarBtn.addEventListener('click', () => {
    outputEl.value = montarPrompt();
  });

  copiarBtn.addEventListener('click', () => {
    outputEl.select();
    document.execCommand('copy');
    alert('Prompt copiado!');
  });

  baixarBtn.addEventListener('click', () => {
    const blob = new Blob([outputEl.value], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'prompt.txt';
    link.click();
  });

  exportarBtn.addEventListener('click', () => {
    const dados = {};
    fields.forEach(id => dados[id] = val(id));
    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'prompt.json';
    link.click();
  });

  exemploBtn.addEventListener('click', () => {
    document.getElementById('contexto').value = 'Criação de site DEVCLUB';
    document.getElementById('objetivo').value = 'Aprender estrutura de prompt';
    document.getElementById('regras').value = 'Ser claro e objetivo';
    document.getElementById('persona').value = 'Estudante de programação';
    document.getElementById('output').value = 'Prompt estruturado';

    document.getElementById('proposito').value = 'Estudo de Engenharia de Prompt';
    document.getElementById('requisitos').value = 'Usar estrutura C.O.R.P.O e P.R.O.M.P.T';
    document.getElementById('orientacoes').value = 'Linguagem clara';
    document.getElementById('modelo').value = 'Texto instrutivo';
    document.getElementById('parametros').value = 'Tom educativo';
    document.getElementById('tarefa').value = 'Gerar descrição para GitHub';
    outputEl.value = montarPrompt();
  });

  aleatorioBtn.addEventListener('click', () => {
    const textos = ['Crie algo novo', 'Desenvolva um app', 'Teste um layout', 'Explore ideias!'];
    outputEl.value = textos[Math.floor(Math.random() * textos.length)];
  });

});

  // === Geração Automática e Tema Aleatório ===
  const gerarAutomaticoBtn = document.getElementById('gerarAutomatico');
  const nomePromptInput = document.getElementById('nomePrompt');
  const temaAleatorioBtn = document.getElementById('temaAleatorio');
  const limparCamposBtn = document.getElementById('limparCampos');

  const temasAleatorios = [
    "Inteligência Artificial",
    "Educação Online",
    "Marketing Digital",
    "Sustentabilidade",
    "Desenvolvimento Web",
    "Saúde Mental",
    "Automação com IA",
    "Finanças Pessoais",
    "Programação Criativa",
    "Empreendedorismo Jovem",
    "Design de Interfaces",
    "Produtividade no Trabalho"
  ];

  // Função para preencher campos automaticamente
  function preencherCampos(tema) {
    document.getElementById('contexto').value = `Este prompt tem como tema principal: ${tema}.`;
    document.getElementById('objetivo').value = `Gerar ideias e instruções claras relacionadas a ${tema}.`;
    document.getElementById('regras').value = `Ser direto, criativo e objetivo, evitando repetições sobre ${tema}.`;
    document.getElementById('persona').value = `Usuários interessados em ${tema} ou que desejam aprender sobre o assunto.`;
    document.getElementById('output').value = `Um texto estruturado e coerente sobre ${tema}.`;

    document.getElementById('proposito').value = `O propósito é explorar o tema ${tema} com clareza e criatividade.`;
    document.getElementById('requisitos').value = `Deve incluir conceitos, benefícios e possíveis aplicações de ${tema}.`;
    document.getElementById('orientacoes').value = `Usar linguagem simples, organizada e inspiradora ao tratar de ${tema}.`;
    document.getElementById('modelo').value = `Texto explicativo, dividido por tópicos ou etapas, abordando ${tema}.`;
    document.getElementById('parametros').value = `Tom informativo e amigável.`;
    document.getElementById('tarefa').value = `Gerar um conteúdo completo sobre ${tema} usando as estruturas C.O.R.P.O e P.R.O.M.P.T.`;

    outputEl.value = montarPrompt();
  }

  // Geração Automática com nome digitado
  gerarAutomaticoBtn.addEventListener('click', () => {
    const tema = nomePromptInput.value.trim();
    if (!tema) {
      alert('Digite um nome ou tema para gerar o prompt automaticamente!');
      return;
    }
    preencherCampos(tema);
  });

  // Tema Aleatório Automático
  temaAleatorioBtn.addEventListener('click', () => {
    const temaSorteado = temasAleatorios[Math.floor(Math.random() * temasAleatorios.length)];
    nomePromptInput.value = temaSorteado;
    preencherCampos(temaSorteado);
  });

  // Limpar todos os campos
  limparCamposBtn.addEventListener('click', () => {
    const campos = [
      'contexto','objetivo','regras','persona','output',
      'proposito','requisitos','orientacoes','modelo','parametros','tarefa'
    ];
    campos.forEach(id => document.getElementById(id).value = '');
    nomePromptInput.value = '';
    outputEl.value = '';
  });

