function loadVideo(element, videoUrl) {
    // Criar o iframe
    const iframe = document.createElement('iframe');
    iframe.src = videoUrl;
    iframe.frameBorder = '0';
    iframe.allowFullscreen = true;
    iframe.style.width = '100%';
    iframe.style.height = '250px';
    iframe.style.borderRadius = '12px';
    iframe.style.border = '3px solid #d39e4f';

    // Substituir a miniatura e o botão pelo iframe
    const parent = element.parentNode;
    parent.innerHTML = '';  // Limpar conteúdo anterior
    parent.appendChild(iframe);  // Adicionar o iframe
  }

    const frases = [
    "O charme da música brasileira",
    "Sertanejo, MPB e muito mais",
    "A emoção que canta",
    "Flashback com alma"
  ];

  let i = 0;
  const fraseEl = document.getElementById("frase");

  function trocarFrase() {
    fraseEl.classList.remove("show"); // Esconde
    setTimeout(() => {
      fraseEl.textContent = frases[i];
      fraseEl.classList.add("show");  // Mostra
      i = (i + 1) % frases.length;
    }, 500); // Tempo para desaparecer antes de trocar
  }

  // Primeira exibição
  fraseEl.classList.add("show");
  setInterval(trocarFrase, 4000);

    const indices = {
      carouselFotos: 0,
      carouselVideos: 0
    };

    function moverCarousel(id, dir) {
      const track = document.getElementById(id);
      const total = track.children.length;
      indices[id] = (indices[id] + dir + total) % total;
      track.style.transform = `translateX(-${indices[id] * 100}%)`;
    }

    const depoimentos = [
    {
      nome: "Ana Clara",
      papel: "Cliente",
      texto: "O Valter cantou no aniversário da minha mãe e foi simplesmente incrível! Todos amaram!",
      foto: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      nome: "João Pedro",
      papel: "Organizador de Eventos",
      texto: "Profissionalismo e carisma definem. Valter é uma escolha certeira para qualquer evento.",
      foto: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      nome: "Marina Silva",
      papel: "Fã",
      texto: "A voz do Valter emociona! Vi ele ao vivo e foi inesquecível.",
      foto: "https://randomuser.me/api/portraits/women/3.jpg"
    },
    {
      nome: "Carlos Souza",
      papel: "Empresário",
      texto: "Valter trouxe uma energia maravilhosa para nosso evento corporativo. Todos ficaram encantados com sua performance.",
      foto: "https://randomuser.me/api/portraits/men/4.jpg"
    },
    {
      nome: "Fernanda Lima",
      papel: "Fã",
      texto: "Já assisti Valter em várias apresentações e cada vez é melhor! Sempre um show de talento e emoção.",
      foto: "https://randomuser.me/api/portraits/women/4.jpg"
    },
    {
      nome: "Ricardo Alves",
      papel: "Organizador de Festas",
      texto: "A presença de palco do Valter é impressionante. Ele é o diferencial que todo evento precisa.",
      foto: "https://randomuser.me/api/portraits/men/5.jpg"
    },
    {
      nome: "Luana Martins",
      papel: "Cliente",
      texto: "Uma experiência única! A voz do Valter é encantadora e ele cria uma atmosfera maravilhosa em qualquer evento.",
      foto: "https://randomuser.me/api/portraits/women/5.jpg"
    },
    {
      nome: "Eduardo Costa",
      papel: "Fã",
      texto: "Eu fui ao show do Valter e posso dizer que é uma das melhores apresentações que já vi! Super recomendo!",
      foto: "https://randomuser.me/api/portraits/men/6.jpg"
    },
    {
      nome: "Tatiane Gomes",
      papel: "Organizadora de Casamentos",
      texto: "O Valter é uma escolha excepcional para casamentos! Sua voz encantou todos os convidados, um verdadeiro talento!",
      foto: "https://randomuser.me/api/portraits/women/6.jpg"
    },
    {
      nome: "José Carlos",
      papel: "Cliente",
      texto: "Contratamos o Valter para a festa da empresa e todos amaram. Ele é um verdadeiro showman!",
      foto: "https://randomuser.me/api/portraits/men/7.jpg"
    },
    {
      nome: "Sofia Ribeiro",
      papel: "Fã",
      texto: "Eu sou fã do Valter há anos! Sempre que posso, vou aos seus shows. É uma experiência maravilhosa!",
      foto: "https://randomuser.me/api/portraits/women/7.jpg"
    },
    {
      nome: "Rafael Pinto",
      papel: "Organizador de Eventos",
      texto: "O Valter é muito profissional e tem uma energia contagiante. Todos os nossos convidados adoraram sua performance.",
      foto: "https://randomuser.me/api/portraits/men/8.jpg"
    },
    {
      nome: "Juliana Costa",
      papel: "Cliente",
      texto: "Fui a um evento em que Valter cantou e posso garantir que sua presença de palco é incrível. Amei!",
      foto: "https://randomuser.me/api/portraits/women/8.jpg"
    },
    {
      nome: "Leonardo Oliveira",
      papel: "Fã",
      texto: "Valter tem uma energia que não se encontra facilmente. Cada show é uma experiência única e inesquecível.",
      foto: "https://randomuser.me/api/portraits/men/9.jpg"
    },
    {
      nome: "Beatriz Fernandes",
      papel: "Organizadora de Eventos",
      texto: "A contratação do Valter foi a melhor decisão para o nosso evento. Ele trouxe um toque de classe e diversão ao mesmo tempo.",
      foto: "https://randomuser.me/api/portraits/women/9.jpg"
    }
  ];


    let index = 0;

    function mostrarDepoimento() {
      const atual = depoimentos[index];
      document.getElementById('testimonialBox').innerHTML = `
        <img class="testimonial-photo" src="${atual.foto}" alt="Foto de ${atual.nome}">
        <div class="testimonial-name">${atual.nome}</div>
        <div class="testimonial-role">${atual.papel}</div>
        <div class="testimonial-text">"${atual.texto}"</div>
      `;
      index = (index + 1) % depoimentos.length;
    }

    // Mostrar o primeiro depoimento e alternar a cada 5 segundos
    mostrarDepoimento();
    setInterval(mostrarDepoimento, 5000);
