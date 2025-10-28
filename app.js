const { useState, useEffect } = React;

const ValesMensais = () => {
  const [valesAbertos, setValesAbertos] = useState([]);
  const [valesUtilizados, setValesUtilizados] = useState([]);
  const [valeAtivo, setValeAtivo] = useState(null);
  const [mostrarMensagem, setMostrarMensagem] = useState('');
  const [carregando, setCarregando] = useState(true);

  const vales = [
    { id: 1, titulo: "Vale Jantar Romântico", descricao: "Um jantar romântico especial preparado com carinho" },
    { id: 2, titulo: "Vale Cinema", descricao: "Cinema com direito a pipoca e guloseimas à vontade" },
    { id: 3, titulo: "Vale Piquenique", descricao: "Piquenique ao ar livre com suas comidas favoritas" },
    { id: 4, titulo: "Vale Massagem Caseira", descricao: "Uma massagem relaxante feita em casa com todo carinho" },
    { id: 5, titulo: "Vale Noite de Jogos", descricao: "Noite de jogos - você escolhe qual jogar!" },
    { id: 6, titulo: "Vale Passeio Surpresa", descricao: "Um passeio surpresa para um lugar especial" },
    { id: 7, titulo: "Vale Doce", descricao: "Chocolate, sobremesa especial ou qualquer doce que você quiser" },
    { id: 8, titulo: "Vale Flores", descricao: "Um buquê de flores lindas escolhidas especialmente para você" },
    { id: 9, titulo: "Vale Compras", descricao: "Vale compras de até 100 reais - escolha o que quiser!" },
    { id: 10, titulo: "Vale Salão de Beleza", descricao: "Um dia no salão para você ficar ainda mais linda" },
    { id: 11, titulo: "Vale Sorvete", descricao: "Sorvete no sabor e quantidade que você quiser" },
    { id: 12, titulo: "Vale Brigadeiro de Pote", descricao: "Brigadeiro de pote feito especialmente para você" },
    { id: 13, titulo: "Vale Massagem nos Pés", descricao: "Massagem relaxante nos pés com hidratação" },
    { id: 14, titulo: "Vale Escolher o Filme", descricao: "Você escolhe o filme e eu assisto sem reclamar!" },
    { id: 15, titulo: "Vale Carona", descricao: "Carona para onde você quiser, quando quiser" },
    { id: 16, titulo: "Vale Carta de Amor", descricao: "Uma carta de amor escrita à mão só para você" },
    { id: 17, titulo: "Vale Tarde de Fotos", descricao: "Uma tarde especial tirando fotos lindas juntos" },
    { id: 18, titulo: "Vale Pizza", descricao: "Pizza no sabor que você escolher, delivery ou restaurante" },
    { id: 19, titulo: "Vale Passeio ou Caminhada", descricao: "Um passeio ou caminhada relaxante no lugar que você preferir" },
    { id: 20, titulo: "Vale Escolher Roupa", descricao: "Você escolhe minha roupa do dia - seja criativa!" },
  ];

  useEffect(() => {
    carregarProgresso();
    lucide.createIcons();
  }, []);

  useEffect(() => {
    lucide.createIcons();
  }, [valesAbertos, valesUtilizados, mostrarMensagem]);

  const carregarProgresso = () => {
    try {
      const dados = localStorage.getItem('vales-data');
      if (dados) {
        const { abertos, utilizados } = JSON.parse(dados);
        setValesAbertos(abertos || []);
        setValesUtilizados(utilizados || []);
      }
    } catch (error) {
      console.log('Primeiro acesso ou erro ao carregar:', error);
    } finally {
      setCarregando(false);
    }
  };

  const salvarProgresso = (novosAbertos, novosUtilizados) => {
    try {
      localStorage.setItem('vales-data', JSON.stringify({
        abertos: novosAbertos,
        utilizados: novosUtilizados
      }));
    } catch (error) {
      console.error('Erro ao salvar:', error);
    }
  };

  const podeAbrirVale = (indiceVale) => {
    if (valesAbertos.includes(indiceVale) || valesUtilizados.includes(indiceVale)) {
      return false;
    }
    return true;
  };

  const abrirVale = (indiceVale) => {
    if (!podeAbrirVale(indiceVale)) {
      if (valesAbertos.includes(indiceVale) || valesUtilizados.includes(indiceVale)) {
        setMostrarMensagem('Este vale já foi aberto! 😊');
      }
      setTimeout(() => setMostrarMensagem(''), 3000);
      return;
    }

    const novosAbertos = [...valesAbertos, indiceVale];
    setValesAbertos(novosAbertos);
    setValeAtivo(indiceVale);
    salvarProgresso(novosAbertos, valesUtilizados);
    setMostrarMensagem('Vale aberto! Agora você pode utilizá-lo ou devolvê-lo 🎉');
    setTimeout(() => setMostrarMensagem(''), 4000);
  };

  const utilizarVale = (indiceVale) => {
    const novosAbertos = valesAbertos.filter(v => v !== indiceVale);
    const novosUtilizados = [...valesUtilizados, indiceVale];
    
    setValesAbertos(novosAbertos);
    setValesUtilizados(novosUtilizados);
    setValeAtivo(null);
    salvarProgresso(novosAbertos, novosUtilizados);
    setMostrarMensagem('Vale utilizado com sucesso! Espero que aproveite! 💝');
    setTimeout(() => setMostrarMensagem(''), 3000);
  };

  const devolverVale = (indiceVale) => {
    const novosAbertos = valesAbertos.filter(v => v !== indiceVale);
    
    setValesAbertos(novosAbertos);
    setValeAtivo(null);
    salvarProgresso(novosAbertos, valesUtilizados);
    setMostrarMensagem('Vale devolvido! Você pode escolher outro quando quiser 🔄');
    setTimeout(() => setMostrarMensagem(''), 3000);
  };

  const obterStatusVale = (indiceVale) => {
    if (valesUtilizados.includes(indiceVale)) {
      return 'utilizado';
    }
    if (valesAbertos.includes(indiceVale)) {
      return 'aberto';
    }
    if (podeAbrirVale(indiceVale)) {
      return 'disponivel';
    }
    return 'bloqueado';
  };

  if (carregando) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <i data-lucide="heart" className="loading-icon"></i>
          <div className="loading-text">Carregando seus vales de amor... 💕</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Corações flutuantes de fundo */}
      <div className="floating-hearts">
        <i data-lucide="heart" className="floating-heart heart-1"></i>
        <i data-lucide="heart" className="floating-heart heart-2"></i>
        <i data-lucide="heart" className="floating-heart heart-3"></i>
        <i data-lucide="heart" className="floating-heart heart-4"></i>
        <i data-lucide="star" className="floating-heart star-1"></i>
        <i data-lucide="star" className="floating-heart star-2"></i>
        <i data-lucide="sparkles" className="floating-heart sparkle-1"></i>
      </div>

      <div className="content-wrapper">
        {/* Cabeçalho */}
        <div className="header">
          <div className="header-icons">
            <i data-lucide="heart" className="header-heart"></i>
            <h1 className="header-title">Vales do Amor</h1>
            <i data-lucide="heart" className="header-heart"></i>
          </div>
          <p className="header-subtitle">20 vales especiais para momentos incríveis! 💝</p>
          <p className="header-description">Abra qualquer vale quando quiser e escolha se quer usar ou trocar</p>
          
          <div className="stats-container">
            <div className="stat-badge">
              <i data-lucide="sparkles" className="stat-icon"></i>
              {valesUtilizados.length} vales usados
            </div>
            {valesAbertos.length > 0 && (
              <div className="stat-badge open-badge">
                <i data-lucide="gift" className="stat-icon"></i>
                {valesAbertos.length} vale(s) aberto(s)
              </div>
            )}
          </div>
        </div>

        {/* Mensagem de feedback */}
        {mostrarMensagem && (
          <div className="feedback-message">
            <i data-lucide="gift" className="feedback-icon"></i>
            {mostrarMensagem}
          </div>
        )}

        {/* Grid de vales */}
        <div className="vales-grid">
          {vales.map((vale, indice) => {
            const status = obterStatusVale(indice);
            const estaAberto = valesAbertos.includes(indice);
            
            return (
              <div
                key={vale.id}
                className={`vale-card ${status}`}
                onClick={() => status === 'disponivel' && abrirVale(indice)}
              >
                {/* Badge do número */}
                <div className={`vale-badge ${status}-badge`}>{vale.id}</div>

                {/* Ícone */}
                <div className="vale-icon-container">
                  {status === 'utilizado' ? (
                    <>
                      <i data-lucide="check" className="vale-icon utilizado-icon"></i>
                      <i data-lucide="sparkles" className="vale-icon-badge sparkle-badge"></i>
                    </>
                  ) : status === 'aberto' ? (
                    <>
                      <i data-lucide="gift" className="vale-icon aberto-icon pulse"></i>
                      <i data-lucide="star" className="vale-icon-badge star-badge"></i>
                    </>
                  ) : status === 'disponivel' ? (
                    <>
                      <i data-lucide="heart" className="vale-icon disponivel-icon pulse"></i>
                      <i data-lucide="star" className="vale-icon-badge star-badge"></i>
                    </>
                  ) : (
                    <i data-lucide="lock" className="vale-icon bloqueado-icon"></i>
                  )}
                </div>

                {/* Título */}
                <h3 className={`vale-title ${status}-title`}>{vale.titulo}</h3>

                {/* Conteúdo quando aberto */}
                {estaAberto && (
                  <div className="vale-content">
                    <div className="vale-description">{vale.descricao}</div>
                    <div className="vale-buttons">
                      <button
                        className="vale-button use-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          utilizarVale(indice);
                        }}
                      >
                        <i data-lucide="check" className="button-icon"></i>
                        Usar Vale
                      </button>
                      <button
                        className="vale-button return-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          devolverVale(indice);
                        }}
                      >
                        <i data-lucide="rotate-ccw" className="button-icon"></i>
                        Devolver
                      </button>
                    </div>
                  </div>
                )}

                {/* Conteúdo quando utilizado */}
                {status === 'utilizado' && (
                  <div className="vale-content">
                    <div className="vale-description">
                      {vale.descricao}
                      <p className="vale-status-text">✓ Utilizado</p>
                    </div>
                  </div>
                )}

                {/* Status bloqueado */}
                {status === 'bloqueado' && (
                  <p className="vale-locked">Em breve... 🔒</p>
                )}

                {/* Botão para abrir */}
                {status === 'disponivel' && (
                  <div className="open-vale-button">
                    <i data-lucide="sparkles" className="open-icon"></i>
                    Abrir Vale!
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Rodapé */}
        <div className="footer">
          <i data-lucide="heart" className="footer-icon"></i>
          <p className="footer-text">Cada vale é uma promessa de amor e carinho 💕</p>
          <p className="footer-subtext">Abra, escolha usar ou devolva para tentar outro depois!</p>
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ValesMensais />);