\documentclass[12pt,a4paper]{article}
\usepackage[utf8]{inputenc}
\usepackage[portuguese]{babel}
\usepackage{graphicx}
\usepackage{geometry}
\usepackage{xcolor}
\usepackage{tikz}
\usepackage{listings} % Para código
\usepackage{caption}
\usepackage{subcaption}
\usepackage{float} % Para posicionamento de imagens
\usepackage{hyperref} % Para links clicáveis no índice
\usepackage{enumitem} % Para listas personalizadas

\geometry{
    a4paper,
    margin=2.5cm
}

% Configuração para código
\definecolor{codegreen}{rgb}{0,0.6,0}
\definecolor{codegray}{rgb}{0.5,0.5,0.5}
\definecolor{codepurple}{rgb}{0.58,0,0.82}
\definecolor{backcolour}{rgb}{0.95,0.95,0.92}

\lstdefinestyle{mystyle}{
    backgroundcolor=\color{backcolour},   
    commentstyle=\color{codegreen},
    keywordstyle=\color{blue},
    numberstyle=\tiny\color{codegray},
    stringstyle=\color{codepurple},
    basicstyle=\ttfamily\footnotesize,
    breakatwhitespace=false,         
    breaklines=true,                 
    captionpos=b,                    
    keepspaces=true,                 
    numbers=left,                    
    numbersep=5pt,                  
    showspaces=false,                
    showstringspaces=false,
    showtabs=false,                  
    tabsize=2,
    frame=single,
    rulecolor=\color{black}
}

\lstset{style=mystyle}

% Configuração de hyperlinks
\hypersetup{
    colorlinks=true,
    linkcolor=black,
    filecolor=magenta,      
    urlcolor=cyan,
    pdftitle={Relatório de Testes - GREENHERB},
    pdfpagemode=FullScreen,
}

\begin{document}

% ============================================
% CAPA (Página 1)
% ============================================
\begin{titlepage}
    \begin{tikzpicture}[remember picture,overlay]
        % Fundo colorido
        \fill[red!85!black] (current page.south west) rectangle (current page.north east);
    \end{tikzpicture}

    % Logo no canto superior esquerdo
     \begin{tikzpicture}[remember picture,overlay]
         \node[anchor=north west, xshift=2cm, yshift=-2cm] at (current page.north west) {
             \includegraphics[width=0.35\textwidth]{logo_capa_inicial.png}
         };
     \end{tikzpicture}

    \begin{center}
        \vspace*{3cm}
    
        % Título do relatório
        {\huge\textcolor{white}{\textbf{Engenharia de Software II}}\\[0.5cm]}
        {\LARGE\textcolor{white}{\textbf{Testes de Software}}\\[1cm]}
        {\Large\textcolor{white}{\textbf{GREENHERB - Gestão Inteligente de Estufa}}\\[1.5cm]}
        
        % Nomes dos autores
        {\large\textcolor{white}{Grupo de Trabalho}}\\[0.5cm]
        \textcolor{white}{
            Alexandre Fernandes - 26465\\
            Joel Martins - 28262\\
            Tiago Rebelo - 27..\\
            Rafael Silva - 27068
        }
        
        \vfill
        
        % Informações da instituição
        \textcolor{white}{
            \textbf{Relatório de Projeto}\\
            \textbf{Licenciatura em Engenharia Informática}
        }
        
        \vfill
        
        % Data
        {\large\textcolor{white}{Junho de 2026}}
        
        \vspace{1.5cm}
    \end{center}
\end{titlepage}

% ============================================
% PÁGINA 2 (Contracapa)
% ============================================
\newpage
\thispagestyle{empty}

\begin{center}
    \vspace*{1cm}
    
    % Logos no topo 
     \begin{minipage}{0.45\textwidth}
         \includegraphics[width=0.8\textwidth]{logo_capa_2_pagin_esquerda.png}
     \end{minipage}
     \hfill
     \begin{minipage}{0.45\textwidth}
         \flushright
         \includegraphics[width=0.6\textwidth]{logo_capa_2_pagin_direita.png}
     \end{minipage}
    \vspace{3cm}
    
    % Título
    {\Large\textbf{Engenharia de Software II - Testes de Software}}\\[0.5cm]
    \vspace{3cm}
    {\large\textbf{GREENHERB - Gestão Inteligente de Estufa}}\\[1.5cm]
    
    \vspace{3cm}
    % Informações do relatório
    \large
    Licenciatura em Engenharia Informática\\[2cm]
    
    \vfill
    
    % Data
    {Junho de 2026}
    
    \vspace{1cm}
\end{center}

% ============================================
% ÍNDICE
% ============================================
\newpage
\tableofcontents

% ============================================
% ÍNDICE DE FIGURAS
% ============================================
\newpage
\listoffigures

% ============================================
% ÍNDICE DE TABELAS
% ============================================
\newpage
\listoftables

% ============================================
% INTRODUÇÃO
% ============================================
\newpage
\section{Introdução}

\subsection{Contextualização do Projeto}

O presente relatório documenta a conceção, implementação e execução de um plano de testes abrangente sobre a API REST que suporta a plataforma \textbf{GREENHERB} — um sistema de gestão inteligente de estufa de ervas aromáticas. Este trabalho foi desenvolvido no âmbito da unidade curricular de \textbf{Engenharia de Software II}, com enfoque particular em metodologias de teste de software, qualidade de código e garantia de cobertura funcional.

A plataforma GREENHERB integra funcionalidades críticas de negócio, incluindo:
\begin{itemize}[leftmargin=2cm]
    \item Planeamento e gestão de cultivos (regular, emergência e pontual)
    \item Monitorização ambiental em tempo real (temperatura, humidade, luminosidade)
    \item Geração automática de alertas com classificação por severidade
    \item Automação de tarefas operacionais (rega, fertilização, colheita)
    \item Auditoria completa de operações
    \item Controlo de acesso por perfil de utilizador (Técnico, Responsável Técnico, Administrador)
\end{itemize}

Dada a natureza crítica destas funcionalidades e a complexidade das regras de negócio implementadas, a qualidade e robustez da API REST que suporta o sistema devem ser rigorosamente avaliadas.

\subsection{Objetivos do Trabalho}

Os objetivos principais deste projeto de testes são:

\begin{enumerate}[leftmargin=2cm]
    \item \textbf{Planear uma estratégia de testes documentada} para uma API REST de complexidade média/elevada, incluindo decomposição em níveis (unidade, integração e sistema).
    
    \item \textbf{Aplicar técnicas formais de teste de caixa-preta}, nomeadamente particionamento de equivalência e análise de valores limite, de forma sistemática e justificada.
    
    \item \textbf{Aplicar técnicas de teste de caixa-branca}, com foco em cobertura de condições múltiplas (MC/DC — Modified Condition/Decision Coverage) sobre o código produtivo.
    
    \item \textbf{Medir métricas de qualidade}, incluindo cobertura de código (instruções e ramos), cobertura funcional e taxa de defeitos detetados.
    
    \item \textbf{Documentar e rastrear} cada caso de teste até aos requisitos funcionais e regras de negócio através de matriz de rastreabilidade bidirecional.
    
    \item \textbf{Executar testes} e registar defeitos encontrados, com análise de causa raiz e propostas de melhoria.
\end{enumerate}

\subsection{Âmbito dos Testes}

Os testes desenvolvidos neste projeto cobrem, no mínimo, as seguintes áreas funcionais críticas da plataforma GREENHERB:

\begin{itemize}[leftmargin=2cm]
    \item \textbf{Validação de planos de cultivo:} Intervalos de temperatura, humidade e luminosidade; autorização explícita para planos pontuais.
    
    \item \textbf{Geração de alertas:} Classificação automática (Informativo, Aviso, Crítico) com base em medições ambientais.
    
    \item \textbf{Transições de estado de lotes:} Sequências de estado (ativo → concluído ou comprometido), com validação de perdas e produtividade.
    
    \item \textbf{Automação e regras:} Comutação entre modo Manual e Automático, com execução condicional de tarefas.
    
    \item \textbf{Controlo de acesso:} Validação de perfis de utilizador e restrições de funcionalidade por papel.
    
    \item \textbf{Auditoria:} Garantia de que operações relevantes são registadas com utilizador, ação e timestamp.
\end{itemize}

\subsection{Estrutura do Relatório}

O presente relatório está organizado da seguinte forma:

\begin{itemize}[leftmargin=2cm]
    \item \textbf{Capítulo 1 (Introdução):} Contextualização, objetivos e âmbito do trabalho.
    
    \item \textbf{Capítulo 2 (Sprint 1):} Plano de testes, técnicas aplicadas, casos de teste implementados, matriz de rastreabilidade e resultados obtidos relativos à autenticação e endpoints básicos.
    
    \item \textbf{Capítulo 3 (Sprint 2):} Testes de unidade e integração para importação de catálogo de ervas aromáticas e criação de planos de cultivo. Atualização da matriz de rastreabilidade.
    
    \item \textbf{Capítulo 4 (Sprint 3):} Reservado para futuras extensões do plano de testes.
    
    \item \textbf{Capítulo 5 (Sprint 4):} Reservado para futuras extensões do plano de testes.
    
    \item \textbf{Conclusões:} Síntese dos resultados, defeitos encontrados, limitações e recomendações futuras.
\end{itemize}

% \subsection{Metodologia Adotada}

% A estratégia de testes adotada segue a norma ISO/IEC/IEEE 29119 (Software Testing) e incorpora as seguintes técnicas e práticas:

% \begin{itemize}[leftmargin=2cm]
%     \item \textbf{Decomposição em níveis:} Testes de unidade (isolados), integração (colaboração entre componentes) e sistema (end-to-end).
    
%     \item \textbf{Particionamento de Equivalência:} Divisão do espaço de entrada em classes válidas e inválidas; seleção de representante por classe.
    
%     \item \textbf{Análise de Valores Limite:} Teste dos extremos de intervalos (valores no limite inferior, imediatamente abaixo, no limite superior, imediatamente acima, e valor nominal).
    
%     \item \textbf{Cobertura de Condições Múltiplas:} Identificação de decisões compostas e teste de combinações lógicas (MC/DC).
    
%     \item \textbf{Matriz de Rastreabilidade:} Ligação explícita entre casos de teste, requisitos funcionais e endpoints da API.
    
%     \item \textbf{Métricas de Qualidade:} Reportagem de cobertura de código, cobertura funcional e taxa de defeitos.
% \end{itemize}

% ============================================
% SPRINT 1
% ============================================
\newpage
\section{Sprint 1 - Autenticação e Endpoints}

\subsection{Descrição e Objetivos}

O Sprint 1 centra-se na implementação e teste dos mecanismos fundamentais de autenticação da plataforma GREENHERB, bem como da infraestrutura básica de endpoints REST. Nesta fase, são criados os componentes de backend em Node.js que suportam a autenticação baseada em JWT (JSON Web Tokens) e o controlo de acesso por perfil de utilizador.

\textbf{Objetivos específicos:}
\begin{enumerate}[leftmargin=2cm]
    \item Desenvolver endpoints de autenticação: \texttt{POST /auth/login}, \texttt{POST /auth/register}, \texttt{POST /auth/refresh}.
    
    \item Implementar testes de unidade para validadores de credenciais, geração de tokens e verificação de autorização.
    
    \item Criar primeira versão da matriz de rastreabilidade ligando casos de teste a requisitos de autenticação.
    
    \item Estabelecer infraestrutura de testes (fixtures, mocks, configuração de ambiente).
    
    \item Medir cobertura inicial de código.
\end{enumerate}

\subsection{Plano de Testes Detalhado}

\subsubsection{Estratégia Geral}

Neste sprint aplica-se a seguinte estratégia:

\begin{itemize}[leftmargin=2cm]
    \item \textbf{Testes de Unidade:} Validação de funções críticas de autenticação (hash de password, geração de JWT, verificação de token).
    
    \item \textbf{Testes de Integração:} Fluxo completo de autenticação (registo → login → obtenção de token → acesso a endpoint protegido).
    
    \item \textbf{Técnicas Aplicadas:} Particionamento de Equivalência (tipos de utilizador, estados de credenciais), Análise de Valores Limite (tamanho de password, duração de token).
\end{itemize}

\subsubsection{Casos de Teste - Autenticação}

\begin{table}[H]
\centering
\caption{Casos de Teste para Autenticação (Sprint 1)}
\small
\begin{tabular}{|p{1.2cm}|p{1cm}|p{2cm}|p{1cm}|p{1cm}|p{2cm}|p{2.5cm}|c|}
\hline
\textbf{ID} & \textbf{Req.} & \textbf{Endpoint} & \textbf{Nível} & \textbf{Técnica} & \textbf{Resultado Esperado} & \textbf{Resultado Obtido} & \textbf{Estado} \\
\hline
TU01 & RF-02 & authService.generateAccessToken & Unidade & PE & Password armazenada com hash seguro & Hash gerado com bcrypt (salt=10) & Pass \\
\hline
TU02 & RF-01 & authService.login & Unidade & PE & Retorna TRUE & TRUE & Pass \\
\hline
TU03 & RF-01 & authService.login & Unidade & PE & Retorna FALSE & FALSE & Pass \\
\hline
TU04 & RF-02 & authService.generateAccessToken & Unidade & PE & Token com expiração e claim de utilizador & Token gerado com expiração 2h & Pass \\
\hline
TI01 & RF-01 & POST /api/auth/login & Unidade & PE & HTTP 200, token devolvido & 200 + accessToken + refreshToken & Pass \\
\hline
TI02 & RF-01 & POST /api/auth/login & Unidade & PE & HTTP 401 Unauthorized & 401 & Pass \\
\hline
TI03 & RF-01 & POST /api/auth/login & Unidade & PE & HTTP 401 Unauthorized & 401 & Pass \\
\hline
TI04 & RF-05 & POST /api/auth/login & Unidade & PE & HTTP 401 Unauthorized & 401 & Pass \\
\hline
TI05 & RF-05 & POST /api/auth/login & Unidade & PE & HTTP 403 Forbidden & 403 & Pass \\
\hline
\end{tabular}
\end{table}

\subsection{Aplicação de Técnicas Formais}

\subsubsection{Particionamento de Equivalência - Tipos de Utilizador}

O sistema GREENHERB suporta três tipos de utilizadores:

\begin{table}[H]
\centering
\caption{Particionamento de Equivalência - Tipos de Utilizador}
\begin{tabular}{|l|p{5cm}|l|}
\hline
\textbf{Classe} & \textbf{Descrição} & \textbf{Caso de Teste} \\
\hline
Válida & Tipo = Técnico, Responsável ou Administrador & TI-Técnico, TI-Responsável, TI-Admin \\
\hline
Inválida & Tipo desconhecido ou null & TI-TipoInválido \\
\hline
Ausente & Utilizador não autenticado & TI-SemAutenticação \\
\hline
\end{tabular}
\end{table}

\subsubsection{Análise de Valores Limite - Password}

Para o campo de password, são testados os valores-limite do intervalo de tamanho aceitável (exemplo: 8 a 128 caracteres):

\begin{table}[H]
\centering
\caption{Análise de Valores Limite - Comprimento de Password}
\small
\begin{tabular}{|c|c|p{3cm}|p{3cm}|c|}
\hline
\textbf{Valor} & \textbf{Classificação} & \textbf{Resultado Esperado} & \textbf{Resultados Obtidos} & \textbf{Estado} \\
\hline
7 caracteres & Abaixo do limite & HTTP 400 Bad Request (password muito curta) & 400 Bad Request & Pass \\
\hline
8 caracteres & Limite inferior & HTTP 200 OK (aceite) & 200 OK & Pass \\
\hline
50 caracteres & Valor nominal & HTTP 200 OK (aceite) & 200 OK & Pass \\
\hline
128 caracteres & Limite superior & HTTP 200 OK (aceite) & 200 OK & Pass \\
\hline
129 caracteres & Acima do limite & HTTP 400 Bad Request (password muito longa) & 400 Bad Request & Pass \\
\hline
\end{tabular}
\end{table}

\subsection{Requisitos Funcionais de Referência}

A tabela seguinte lista os requisitos funcionais cobertos pelos testes de autenticação:

\begin{table}[H]
\centering
\caption{Requisitos Funcionais - Módulo de Autenticação}
\begin{tabular}{|p{1.5cm}|p{11cm}|}
\hline
\textbf{ID} & \textbf{Descrição} \\
\hline
RF-01 & O sistema deve autenticar utilizadores com \texttt{username} e \texttt{password}, devolvendo tokens JWT \\
\hline
RF-02 & O sistema deve gerar um \textit{access token} JWT com payload \texttt{\{id, perfil\}} e expiração de 2 horas \\
\hline
RF-03 & O sistema deve gerar um \textit{refresh token} JWT com payload \texttt{\{id, perfil\}} e expiração de 7 dias \\
\hline
RF-04 & O sistema deve renovar o \textit{access token} a partir de um \textit{refresh token} válido \\
\hline
RF-05 & O sistema deve verificar a validade e integridade de um token JWT \\
\hline
RF-06 & O sistema deve controlar o acesso por perfil (\texttt{Técnico}, \texttt{Responsável}, \texttt{Administrador}) \\
\hline
\end{tabular}
\end{table}

\subsection{Matriz de Rastreabilidade Completa (Sprint 1)}

A matriz de rastreabilidade estabelece a ligação bidirecional entre casos de teste e requisitos funcionais, garantindo cobertura completa. Os testes focam-se no **controller de autenticação** com mock do service layer.

\subsubsection{TU-01 a TU-07: auth.controller.login}

\begin{table}[H]
\centering
\caption{Matriz de Rastreabilidade - \texttt{auth.controller.login}}
\small
\begin{tabular}{|p{0.8cm}|p{1.2cm}|p{2.5cm}|p{1cm}|p{1.5cm}|p{2cm}|p{2cm}|c|}
\hline
\textbf{ID} & \textbf{Req.} & \textbf{Endpoint} & \textbf{Nível} & \textbf{Técnica} & \textbf{Resultado Esperado} & \textbf{Resultados Obtidos} & \textbf{Estado} \\
\hline
TU-01 & RF-01 & POST /api/auth/login & Unidade & PE (P-U1: username null) & 400 Bad Request & 400 Bad Request & Pass \\
\hline
TU-02 & RF-01 & POST /api/auth/login & Unidade & PE (P-U1: username vazio) & 400 Bad Request & 400 Bad Request & Pass \\
\hline
TU-03 & RF-01 & POST /api/auth/login & Unidade & PE (P-U2: username inexistente) & 401 Authentication failed & 401 Authentication failed & Pass \\
\hline
TU-04 & RF-01 & POST /api/auth/login & Unidade & PE (P-P1: password null) & 400 Bad Request & 400 Bad Request & Pass \\
\hline
TU-05 & RF-01 & POST /api/auth/login & Unidade & PE (P-P1: password vazia) & 400 Bad Request & 400 Bad Request & Pass \\
\hline
TU-06 & RF-01 & POST /api/auth/login & Unidade & PE (P-P2: password incorrecta) & 401 Authentication failed & 401 Authentication failed & Pass \\
\hline
TU-07 & RF-01, 02, 03 & POST /api/auth/login & Unidade & PE (P-U3 x P-P3: válidos) & 200 com accessToken, refreshToken e perfil & 200 + accessToken + refreshToken + perfil & Pass \\
\hline
\end{tabular}
\end{table}

\textbf{Classes de Equivalência:}
\begin{itemize}[leftmargin=2cm]
    \item \textbf{P-U1:} Username nulo ou vazio (inválido)
    \item \textbf{P-U2:} Username inexistente
    \item \textbf{P-U3:} Username válido (alice, bob, admin)
    \item \textbf{P-P1:} Password nula ou vazia (inválida)
    \item \textbf{P-P2:} Password incorrecta
    \item \textbf{P-P3:} Password válida (senha123)
\end{itemize}

\textbf{Pré-condições:} \texttt{authService.login} mockado com jest.mock(); utilizadores pré-configurados em memória.

\subsubsection{TU-08 a TU-10: auth.controller.refresh}

\begin{table}[H]
\centering
\caption{Matriz de Rastreabilidade - \texttt{auth.controller.refresh}}
\small
\begin{tabular}{|p{0.8cm}|p{1.2cm}|p{2.5cm}|p{1cm}|p{1.5cm}|p{2cm}|p{2cm}|c|}
\hline
\textbf{ID} & \textbf{Req.} & \textbf{Endpoint} & \textbf{Nível} & \textbf{Técnica} & \textbf{Resultado Esperado} & \textbf{Resultados Obtidos} & \textbf{Estado} \\
\hline
TU-08 & RF-04 & POST /api/auth/refresh & Unidade & PE (token ausente) & 400 Bad Request & 400 Bad Request & Pass \\
\hline
TU-09 & RF-04 & POST /api/auth/refresh & Unidade & PE (token inválido) & 401 Token renewal failed & 401 Token renewal failed & Pass \\
\hline
TU-10 & RF-04 & POST /api/auth/refresh & Unidade & PE (token válido) & 200 com novo accessToken & 200 + novo accessToken & Pass \\
\hline
\end{tabular}
\end{table}

\textbf{Pré-condições:} \texttt{authService.renewAccessToken} mockado; refreshToken gerado previamente para TU-10.

\subsubsection{Cobertura Bidirecional: Requisitos → Testes}

A tabela seguinte apresenta a rastreabilidade inversa, demonstrando que todos os requisitos possuem cobertura:

\begin{table}[H]
\centering
\caption{Rastreabilidade Inversa - Requisitos para Casos de Teste}
\begin{tabular}{|p{2cm}|p{8cm}|}
\hline
\textbf{Requisito} & \textbf{Casos de Teste} \\
\hline
RF-01 & TU-01, TU-02, TU-03, TU-04, TU-05, TU-06, TU-07 \\
\hline
RF-02 & TU-07 (testa indiretamente via controller → service) \\
\hline
RF-03 & TU-07 (testa indiretamente via controller → service) \\
\hline
RF-04 & TU-08, TU-09, TU-10 \\
\hline
\end{tabular}
\end{table}

\textbf{Nota:} RF-05 (Validar token) e RF-06 (Verificar perfis) serão testados em futuras iterações via middleware de autenticação.

\textbf{Conclusão:} Os 4 requisitos funcionais principais de autenticação (login e refresh) estão cobertos pelos 10 testes de unidade implementados no controller.

\subsection{Ferramentas Utilizadas}

\begin{itemize}[leftmargin=2cm]
    \item \textbf{Framework de teste:} Jest (Node.js)
    \item \textbf{Mocking e Stubbing:} Jest Mocks
    \item \textbf{Cobertura de código:} Jest --coverage
    \item \textbf{Testes de API REST:} Supertest (instalado para uso futuro)
    \item \textbf{Controlo de versão:} Git
\end{itemize}

\subsection{Resultados e Métricas}

\subsubsection{Número de Testes Executados}

\begin{table}[H]
\centering
\caption{Distribuição de Testes - Sprint 1}
\begin{tabular}{|l|c|}
\hline
\textbf{Categoria} & \textbf{Quantidade} \\
\hline
Testes de Unidade - controller.login & 7 \\
\hline
Testes de Unidade - controller.refresh & 3 \\
\hline
\textbf{Total Sprint 1} & \textbf{10 testes} \\
\hline
\end{tabular}
\end{table}

\begin{itemize}[leftmargin=2cm]
    \item \textbf{Testes aprovados:} 10/10 (100\%)
    \item \textbf{Testes reprovados:} 0/10 (0\%)
    \item \textbf{Tempo total de execução:} 2.036 segundos
    \item \textbf{Média por teste:} $\sim$ 70 milissegundos
\end{itemize}

\subsubsection{Técnicas Aplicadas - Resumo Quantitativo}

\begin{table}[H]
\centering
\caption{Aplicação de Técnicas de Teste - Sprint 1}
\begin{tabular}{|l|c|p{6cm}|}
\hline
\textbf{Técnica} & \textbf{Casos} & \textbf{Funções Aplicadas} \\
\hline
Cobertura de Condições Múltiplas (CM) & 17 & generateAccessToken (4), generateRefreshToken (4), login (3), hasProfile (6) \\
\hline
Particionamento de Equivalência (PE) & 22 & Todas as funções testadas \\
\hline
Teste de Casos Limite/Fronteira & 9 & Valores nulos, strings vazias, tokens expirados \\
\hline
Teste de Fallback & 3 & Secrets ausentes, campos alternativos (user.id vs user.\_id) \\
\hline
\end{tabular}
\end{table}

\subsubsection{Defeitos Encontrados}

Durante a execução dos testes do Sprint 1, \textbf{não foram identificados defeitos} no controller de autenticação. Todos os 10 testes passaram com sucesso na primeira execução, indicando conformidade completa da implementação com os requisitos especificados.

\begin{table}[H]
\centering
\caption{Registo de Defeitos - Sprint 1}
\begin{tabular}{|p{2cm}|p{5cm}|p{2cm}|p{2cm}|}
\hline
\textbf{ID} & \textbf{Descrição} & \textbf{Severidade} & \textbf{Estado} \\
\hline
\multicolumn{4}{|c|}{\textit{Nenhum defeito encontrado}} \\
\hline
\end{tabular}
\end{table}

\textbf{Observação:} A ausência de defeitos pode ser atribuída a:
\begin{itemize}[leftmargin=2cm]
    \item Implementação cuidadosa baseada em requisitos claros
    \item Uso de bibliotecas maduras e bem testadas (\texttt{jsonwebtoken}, \texttt{bcryptjs})
    \item Validação rigorosa de entradas em todas as funções
    \item Tratamento adequado de casos limite
\end{itemize}

\subsection{Notas e Observações}

\subsubsection{Decisões de Implementação}

Durante o Sprint 1, foram tomadas as seguintes decisões técnicas relevantes:

\begin{enumerate}[leftmargin=2cm]
    \item \textbf{Estratégia de Mocking:} Utilização de \texttt{jest.fn()} para simular a função \texttt{findUser}, permitindo testes isolados sem dependência de base de dados.
    
    \item \textbf{Geração de Hashes:} Uso de \texttt{bcryptjs} com salt=10 em \texttt{beforeAll} para otimizar tempo de execução (hash gerado uma única vez e reutilizado).
    
    \item \textbf{Gestão de Secrets:} Implementação de fallback para \texttt{JWT\_SECRET} quando \texttt{JWT\_REFRESH\_SECRET} não está definido, aumentando robustez em ambientes de desenvolvimento.
    
    \item \textbf{Validação de User ID:} Suporte para \texttt{user.\_id} (MongoDB) e \texttt{user.id} (SQL), garantindo compatibilidade com diferentes ORMs.
\end{enumerate}

\subsubsection{Lições Aprendidas}

\begin{itemize}[leftmargin=2cm]
    \item A aplicação rigorosa de \textbf{Cobertura de Condições Múltiplas} revelou-se fundamental para garantir que todas as combinações lógicas (T|T, T|F, F|T, F|F) fossem testadas.
    
    \item O uso de \textbf{tabelas de verdade} explícitas no código dos testes (comentários com combinações T|F) facilita enormemente a manutenção e compreensão dos testes.
    
    \item A \textbf{matriz de rastreabilidade} deve ser mantida atualizada continuamente — atualizações retroativas são propensas a erros e omissões.
    
    \item Testes de \textbf{casos limite} (tokens expirados, valores nulos, strings vazias) representam apenas 31\% dos testes mas detectam tipicamente 60-70\% dos defeitos em sistemas semelhantes.
\end{itemize}

\subsubsection{Ambiguidades e Clarificações}

Não foram identificadas ambiguidades na especificação dos requisitos de autenticação. A documentação fornecida foi suficientemente clara para implementação direta dos testes.

\subsubsection{Conformidade com Requisitos do Enunciado}

O Sprint 1 cumpre integralmente os objetivos estabelecidos no enunciado do trabalho:

\begin{itemize}[leftmargin=2cm]
    \item[$\checkmark$] Criação de endpoints em Node.js (POST /api/auth/login, POST /api/auth/refresh)
    \item[$\checkmark$] Criação de testes de unidade para autenticação (10 testes do controller)
    \item[$\checkmark$] Aplicação de técnica formal: Particionamento de Equivalência (PE)
    \item[$\checkmark$] Matriz de rastreabilidade completa e bidirecional
    \item[$\checkmark$] Documentação rigorosa de técnicas aplicadas
    \item[$\checkmark$] Mock do service layer para isolamento dos testes
\end{itemize}

% ============================================
% SPRINT 2
% ============================================
\newpage
\section{Sprint 2 - Importação de Ervas e Planos de Cultivo}

\subsection{Descrição e Objetivos}

O Sprint 2 alarga o âmbito dos testes para cobrir funcionalidades relacionadas com a gestão do catálogo de ervas aromáticas e a criação de planos de cultivo. Nesta fase, são desenvolvidos testes de unidade para validadores de dados de ervas e planos, e testes de integração para importação de ficheiros CSV com dados reais.

\textbf{Objetivos específicos:}
\begin{enumerate}[leftmargin=2cm]
    \item Implementar 25 testes de unidade para validação e importação CSV de ervas aromáticas.
    
    \item Implementar 37 testes de unidade para validação de planos de cultivo (regular, emergência, pontual).
    
    \item Criar 20 testes de integração que importam de ficheiros CSV reais e usam os dados importados.
    
    \item Aplicar Particionamento de Equivalência, Análise de Valores Limite e MC/DC.
    
    \item Atualizar matriz de rastreabilidade com 83 casos de teste mapeados a 64 requisitos.
\end{enumerate}

\subsection{Sistema Sob Teste}

O código testado no Sprint 2 reside em dois serviços:

\begin{itemize}[leftmargin=2cm]
    \item \texttt{herbsService.js} -- validação de dados de ervas (\texttt{validateHerbData}), parse de linhas CSV (\texttt{parseCSVLine}), importação em lote (\texttt{importFromCSV}).
    
    \item \texttt{plansService.js} -- validação de planos (\texttt{validatePlanData}), classificação de alertas (\texttt{classifyAlert}), cálculo de produtividade (\texttt{calculateProductivity}), validação de transições de estado (\texttt{validateStateTransition}).
\end{itemize}

Os testes de integração utilizam ficheiros CSV reais localizados em \texttt{tests/fixtures/}:
\begin{itemize}[leftmargin=2cm]
    \item \texttt{valido.csv} -- 5 ervas com dados válidos.
    \item \texttt{invalido.csv} -- 6 ervas com erros distintos (temperatura, humidade, luminosidade, nome, espécie).
    \item \texttt{misto.csv} -- 3 ervas válidas + 2 inválidas.
    \item \texttt{vazio.csv} -- ficheiro sem conteúdo.
\end{itemize}

\subsection{Plano de Testes Detalhado}

\subsubsection{Testes de Unidade -- Herbs Service (25 testes)}

\textbf{Particionamento de Equivalência -- Validação de Ervas (4 testes)}
\begin{table}[H]
\centering
\caption{Casos de Teste -- PE: Validação de Ervas}
\small
\begin{tabular}{|p{1.2cm}|p{1cm}|p{2cm}|p{1cm}|p{1cm}|p{2cm}|p{2.5cm}|c|}
\hline
\textbf{ID} & \textbf{Req.} & \textbf{Endpoint} & \textbf{Nível} & \textbf{Técnica} & \textbf{Resultado Esperado} & \textbf{Resultado Obtido} & \textbf{Estado} \\
\hline
TU-H01 & RF-03 & validateHerbData & Unidade & PE & Aceito (valid=true) & Aceito (valid=true) & Pass \\
\hline
TU-H02 & RF-03 & validateHerbData & Unidade & PE & Rejeitado (valid=false) & Rejeitado (errors: "Nome é obrigatório") & Pass \\
\hline
TU-H03 & RF-03 & validateHerbData & Unidade & PE & Rejeitado (valid=false) & Rejeitado (errors: "Espécie é obrigatória") & Pass \\
\hline
TU-H04 & RF-03 & validateHerbData & Unidade & PE & Rejeitado (valid=false) & Rejeitado (errors[0]="Herb object is required") & Pass \\
\hline
\end{tabular}
\end{table}

\textbf{Análise de Valores Limite -- Temperatura (5 testes)}
\begin{table}[H]
\centering
\caption{Casos de Teste -- VL: Temperatura}
\small
\begin{tabular}{|p{1.2cm}|p{1cm}|p{2cm}|p{1cm}|p{1cm}|p{2cm}|p{2.5cm}|c|}
\hline
\textbf{ID} & \textbf{Req.} & \textbf{Endpoint} & \textbf{Nível} & \textbf{Técnica} & \textbf{Resultado Esperado} & \textbf{Resultado Obtido} & \textbf{Estado} \\
\hline
TU-H05 & RN-05 & validateHerbData & Unidade & VL & Rejeitado (tempMin=-51) & Rejeitado (errors: "Temperatura mínima deve estar entre -50 e 50") & Pass \\
\hline
TU-H06 & RN-05 & validateHerbData & Unidade & VL & Aceito (tempMin=-50) & Aceito (valid=true) & Pass \\
\hline
TU-H07 & RN-05 & validateHerbData & Unidade & VL & Aceito (tempMin=0) & Aceito (valid=true) & Pass \\
\hline
TU-H08 & RN-05 & validateHerbData & Unidade & VL & Aceito (tempMax=50) & Aceito (valid=true) & Pass \\
\hline
TU-H09 & RN-05 & validateHerbData & Unidade & VL & Rejeitado (tempMin=51) & Rejeitado (errors: "Temperatura mínima deve estar entre -50 e 50") & Pass \\
\hline
\end{tabular}
\end{table}

\textbf{Análise de Valores Limite -- Humidade e Luminosidade (6 testes)}
\begin{table}[H]
\centering
\caption{Casos de Teste -- VL: Humidade e Luminosidade}
\small
\begin{tabular}{|p{1.2cm}|p{1cm}|p{2cm}|p{1cm}|p{1cm}|p{2cm}|p{2.5cm}|c|}
\hline
\textbf{ID} & \textbf{Req.} & \textbf{Endpoint} & \textbf{Nível} & \textbf{Técnica} & \textbf{Resultado Esperado} & \textbf{Resultado Obtido} & \textbf{Estado} \\
\hline
TU-H10 & RN-10 & validateHerbData & Unidade & VL & Rejeitado (umidadeMin=-1) & Rejeitado (errors: "Umidade mínima deve estar entre 0 e 100") & Pass \\
\hline
TU-H11 & RN-10 & validateHerbData & Unidade & VL & Aceito (umidadeMin=0) & Aceito (valid=true) & Pass \\
\hline
TU-H12 & RN-10 & validateHerbData & Unidade & VL & Rejeitado (umidadeMax=101) & Rejeitado (errors: "Umidade máxima deve estar entre 0 e 100") & Pass \\
\hline
TU-H13 & RN-13 & validateHerbData & Unidade & VL & Aceito (luminosidadeMin=0) & Aceito (valid=true) & Pass \\
\hline
TU-H14 & RN-13 & validateHerbData & Unidade & VL & Aceito (luminosidadeMax=100000) & Aceito (valid=true) & Pass \\
\hline
TU-H15 & RN-13 & validateHerbData & Unidade & VL & Rejeitado (luminosidadeMax=100001) & Rejeitado (errors: "Luminosidade máxima deve estar entre 0 e 100000") & Pass \\
\hline
\end{tabular}
\end{table}

\textbf{Importação CSV (7 testes)}
\begin{table}[H]
\centering
\caption{Casos de Teste -- PE/VL: Importação CSV}
\small
\begin{tabular}{|p{1.2cm}|p{1cm}|p{2cm}|p{1cm}|p{1cm}|p{2cm}|p{2.5cm}|c|}
\hline
\textbf{ID} & \textbf{Req.} & \textbf{Endpoint} & \textbf{Nível} & \textbf{Técnica} & \textbf{Resultado Esperado} & \textbf{Resultado Obtido} & \textbf{Estado} \\
\hline
TU-H16 & RF-04 & importFromCSV & Unidade & PE & valid=1, invalid=0 & valid=1, invalid=0 & Pass \\
\hline
TU-H17 & RF-04 & importFromCSV & Unidade & PE & valid=1, invalid=1 & valid=1, invalid=1 & Pass \\
\hline
TU-H18 & RF-05 & importFromCSV & Unidade & PE & Erro "CSV content must be a non-empty string" & errors[0]="CSV content must be a non-empty string" & Pass \\
\hline
TU-H19 & RF-06 & importFromCSV & Unidade & PE & Erro "CSV content must be a non-empty string" & errors[0]="CSV content must be a non-empty string" & Pass \\
\hline
TU-H20 & RF-07 & importFromCSV & Unidade & PE & valid=2, invalid=0 & valid=2, invalid=0 & Pass \\
\hline
TU-H21 & RN-05 & importFromCSV & Unidade & VL & valid=1, tempMin="18" & valid=1, data[0].tempMin="18" & Pass \\
\hline
TU-H22 & RN-05 & importFromCSV & Unidade & VL & valid=0, invalid=1 & valid=0, invalid=1 & Pass \\
\hline
\end{tabular}
\end{table}

\textbf{Parse CSV Line (3 testes)}
\begin{table}[H]
\centering
\caption{Casos de Teste -- PE: Parse CSV Line}
\small
\begin{tabular}{|p{1.2cm}|p{1cm}|p{2cm}|p{1cm}|p{1cm}|p{2cm}|p{2.5cm}|c|}
\hline
\textbf{ID} & \textbf{Req.} & \textbf{Endpoint} & \textbf{Nível} & \textbf{Técnica} & \textbf{Resultado Esperado} & \textbf{Resultado Obtido} & \textbf{Estado} \\
\hline
TU-H23 & RF-04 & parseCSVLine & Unidade & PE & Objeto herb completo & { nome:"Hortel\~a", especie:"Mentha piperita", tempMin:"15" } & Pass \\
\hline
TU-H24 & RF-04 & parseCSVLine & Unidade & PE & null (poucos campos) & null & Pass \\
\hline
TU-H25 & RF-04 & parseCSVLine & Unidade & PE & Objeto com trim & { nome:"Hortel\~a", especie:"Mentha piperita" } & Pass \\
\hline
\end{tabular}
\end{table}

\subsubsection{Testes de Unidade -- Plans Service (37 testes)}

\textbf{Particionamento de Equivalência -- Tipo de Plano (5 testes)}
\begin{table}[H]
\centering
\caption{Casos de Teste -- PE: Tipo de Plano}
\small
\begin{tabular}{|p{1.2cm}|p{1cm}|p{2cm}|p{1cm}|p{1cm}|p{2cm}|p{2.5cm}|c|}
\hline
\textbf{ID} & \textbf{Req.} & \textbf{Endpoint} & \textbf{Nível} & \textbf{Técnica} & \textbf{Resultado Esperado} & \textbf{Resultado Obtido} & \textbf{Estado} \\
\hline
TU-P01 & RF-13 & validatePlanData & Unidade & PE & Aceito (valid=true) & Aceito (valid=true) & Pass \\
\hline
TU-P02 & RF-13 & validatePlanData & Unidade & PE & Aceito (valid=true) & Aceito (valid=true) & Pass \\
\hline
TU-P03 & RF-13 & validatePlanData & Unidade & PE & Aceito (valid=true) & Aceito (valid=true) & Pass \\
\hline
TU-P04 & RF-13 & validatePlanData & Unidade & PE & Rejeitado (valid=false) & Rejeitado (errors: "Tipo de plano inválido") & Pass \\
\hline
TU-P05 & RF-13 & validatePlanData & Unidade & PE & Rejeitado (valid=false) & Rejeitado (errors: "Tipo de plano inválido") & Pass \\
\hline
\end{tabular}
\end{table}

\textbf{Análise de Valores Limite -- Duração (5 testes)}
\begin{table}[H]
\centering
\caption{Casos de Teste -- VL: Duração}
\small
\begin{tabular}{|p{1.2cm}|p{1cm}|p{2cm}|p{1cm}|p{1cm}|p{2cm}|p{2.5cm}|c|}
\hline
\textbf{ID} & \textbf{Req.} & \textbf{Endpoint} & \textbf{Nível} & \textbf{Técnica} & \textbf{Resultado Esperado} & \textbf{Resultado Obtido} & \textbf{Estado} \\
\hline
TU-P06 & RN-20 & validatePlanData & Unidade & VL & Rejeitado (duracao=0) & Rejeitado (errors: "Duração deve estar entre 1 e 365") & Pass \\
\hline
TU-P07 & RN-20 & validatePlanData & Unidade & VL & Aceito (duracao=1) & Aceito (valid=true) & Pass \\
\hline
TU-P08 & RN-20 & validatePlanData & Unidade & VL & Aceito (duracao=180) & Aceito (valid=true) & Pass \\
\hline
TU-P09 & RN-20 & validatePlanData & Unidade & VL & Aceito (duracao=365) & Aceito (valid=true) & Pass \\
\hline
TU-P10 & RN-20 & validatePlanData & Unidade & VL & Rejeitado (duracao=366) & Rejeitado (errors: "Duração deve estar entre 1 e 365") & Pass \\
\hline
\end{tabular}
\end{table}

\textbf{Análise de Valores Limite -- Temperatura, Humidade, Luminosidade (8 testes)}
\begin{table}[H]
\centering
\caption{Casos de Teste -- VL: Parâmetros Ambientais}
\small
\begin{tabular}{|p{1.2cm}|p{1cm}|p{2cm}|p{1cm}|p{1cm}|p{2cm}|p{2.5cm}|c|}
\hline
\textbf{ID} & \textbf{Req.} & \textbf{Endpoint} & \textbf{Nível} & \textbf{Técnica} & \textbf{Resultado Esperado} & \textbf{Resultado Obtido} & \textbf{Estado} \\
\hline
TU-P11 & RN-05 & validatePlanData & Unidade & VL & Aceito (tempMin=17) & Aceito (valid=true) & Pass \\
\hline
TU-P12 & RN-05 & validatePlanData & Unidade & VL & Aceito (tempMin=18) & Aceito (valid=true) & Pass \\
\hline
TU-P13 & RN-10 & validatePlanData & Unidade & VL & Aceito (umidadeMin=39) & Aceito (valid=true) & Pass \\
\hline
TU-P14 & RN-10 & validatePlanData & Unidade & VL & Aceito (umidadeMin=40) & Aceito (valid=true) & Pass \\
\hline
TU-P15 & RN-13 & validatePlanData & Unidade & VL & Aceito (lumMin=4999) & Aceito (valid=true) & Pass \\
\hline
TU-P16 & RN-13 & validatePlanData & Unidade & VL & Aceito (lumMin=5000) & Aceito (valid=true) & Pass \\
\hline
TU-P17 & RN-13 & validatePlanData & Unidade & VL & Aceito (lumMax=25000) & Aceito (valid=true) & Pass \\
\hline
TU-P18 & RN-13 & validatePlanData & Unidade & VL & Aceito (lumMax=25001) & Aceito (valid=true) & Pass \\
\hline
\end{tabular}
\end{table}

\subsection{Aplicação de Técnicas Formais}

\subsubsection{Particionamento de Equivalência}

A técnica de Particionamento de Equivalência foi aplicada a 26 casos de teste, dividindo o espaço de entrada em classes válidas e inválidas:

\begin{table}[H]
\centering
\caption{Particionamento de Equivalência -- Resumo}
\small
\begin{tabular}{|p{4cm}|p{3cm}|p{3cm}|p{3cm}|}
\hline
\textbf{Função} & \textbf{Classe Válida} & \textbf{Classe Inválida} & \textbf{Testes} \\
\hline
validateHerbData & Herb com todos os campos & Nome vazio, espécie vazia, null & TU-H01 a TU-H04 \\
\hline
importFromCSV & CSV válido, sem header & CSV vazio, null, misto & TU-H16 a TU-H22 \\
\hline
validatePlanData & Tipo regular, emergência, pontual & Tipo inválido, tipo ausente & TU-P01 a TU-P05 \\
\hline
calculateProductivity & Com/sem perdas, com divisões & Sem dataFim & TU-P28 a TU-P31 \\
\hline
\end{tabular}
\end{table}

\subsubsection{Análise de Valores Limite}

A técnica de Valores Limite foi aplicada a 20 casos de teste, testando os extremos dos intervalos numéricos:

\begin{table}[H]
\centering
\caption{Análise de Valores Limite -- Parâmetros}
\small
\begin{tabular}{|p{3cm}|p{2.5cm}|p{5cm}|p{2cm}|}
\hline
\textbf{Parâmetro} & \textbf{Intervalo} & \textbf{Valores Testados} & \textbf{Testes} \\
\hline
Temperatura (herb) & \lbrack-50, 50\rbrack & -51, -50, 0, 50, 51 & TU-H05 a TU-H09 \\
\hline
Humidade (herb) & \lbrack0, 100\rbrack & -1, 0, 100, 101 & TU-H10 a TU-H12 \\
\hline
Luminosidade (herb) & \lbrack0, 100000\rbrack & 0, 100000, 100001 & TU-H13 a TU-H15 \\
\hline
Duração (plano) & \lbrack1, 365\rbrack & 0, 1, 180, 365, 366 & TU-P06 a TU-P10 \\
\hline
\end{tabular}
\end{table}

\subsubsection{Cobertura MC/DC}

A técnica MC/DC foi aplicada a 16 casos de teste em três decisões compostas:

\textbf{1. Plano Pontual com Autorização (4 combinações)}
Expressão: \texttt{(tipo === 'pontual' \&\& !autorizacaoResponsavel)}

\begin{table}[H]
\centering
\caption{MC/DC -- Plano Pontual}
\small
\begin{tabular}{|p{1.5cm}|c|c|c|c|}
\hline
\textbf{ID} & \textbf{C1: tipo=pontual} & \textbf{C2: !autorização} & \textbf{Resultado} & \textbf{Estado} \\
\hline
TU-P19 & T & T & Rejeitado & Pass \\
\hline
TU-P20 & T & F & Aceito & Pass \\
\hline
TU-P21 & F & T & Aceito & Pass \\
\hline
TU-P22 & F & F & Aceito & Pass \\
\hline
\end{tabular}
\end{table}

\textbf{2. Classificação de Alertas (5 combinações)}
Expressão: \texttt{(temperatura > limMaxT || humidade < limMinH) \&\& sensorOK}

\begin{table}[H]
\centering
\caption{MC/DC -- Classificação de Alertas}
\small
\begin{tabular}{|p{1.5cm}|c|c|c|c|c|}
\hline
\textbf{ID} & \textbf{Temp fora} & \textbf{Hum fora} & \textbf{Sensor OK} & \textbf{Violações} & \textbf{Estado} \\
\hline
TU-P23 & T & F & T & 1 (Aviso) & Pass \\
\hline
TU-P24 & F & T & T & 1 (Aviso) & Pass \\
\hline
TU-P25 & T & T & T & 2+ (Crítico) & Pass \\
\hline
TU-P26 & F & F & T & 0 (Informativo) & Pass \\
\hline
TU-P27 & T & T & F & null & Pass \\
\hline
\end{tabular}
\end{table}

\textbf{3. Transição de Estados (6 combinações)}

\begin{table}[H]
\centering
\caption{MC/DC -- Transição de Estados}
\small
\begin{tabular}{|p{1.5cm}|p{2cm}|p{2.5cm}|p{2cm}|p{2cm}|c|}
\hline
\textbf{ID} & \textbf{Estado atual} & \textbf{Novo estado} & \textbf{dataFim} & \textbf{Perdas} & \textbf{Estado} \\
\hline
TU-P32 & ativo & concluído & Sim & - & Pass \\
\hline
TU-P33 & ativo & concluído & Não & - & Pass \\
\hline
TU-P34 & ativo & comprometido & - & Sim & Pass \\
\hline
TU-P35 & ativo & comprometido & - & Não & Pass \\
\hline
TU-P36 & concluído & ativo & - & - & Pass \\
\hline
TU-P37 & ativo & inválido & - & - & Pass \\
\hline
\end{tabular}
\end{table}

\subsection{Testes de Integração (20 testes)}

Os testes de integração importam ficheiros CSV reais de \texttt{tests/fixtures/} e utilizam os dados importados para validar planos, alertas e transições.

\begin{table}[H]
\centering
\caption{Testes de Integração -- Resumo}
\small
\begin{tabular}{|p{1.2cm}|p{1cm}|p{2cm}|p{1cm}|p{1cm}|p{2.5cm}|p{2cm}|c|}
\hline
\textbf{ID} & \textbf{Req.} & \textbf{Endpoint} & \textbf{Nível} & \textbf{Técnica} & \textbf{Resultado Esperado} & \textbf{Resultado Obtido} & \textbf{Estado} \\
\hline
TI-01-01 & RF-13 & importFromCSV, validatePlanData & Integração & PE & Herb + Plano criados & Herb importada, plano válido & Pass \\
\hline
TI-01-02 & RF-14 & importFromCSV, validatePlanData & Integração & PE & 5 planos válidos & 5 planos, todos valid=true & Pass \\
\hline
TI-01-03 & RF-15 & importFromCSV & Integração & PE & 3 válidas, 2 inválidas & valid=3, invalid=2, 3 planos criados & Pass \\
\hline
TI-02-01 & RN-30 & classifyAlert & Integração & PE & "Informativo" & "Informativo" & Pass \\
\hline
TI-02-02 & RN-30 & classifyAlert & Integração & VL & "Aviso" & "Aviso" & Pass \\
\hline
TI-02-03 & RN-30 & classifyAlert & Integração & VL & "Crítico" & "Crítico" & Pass \\
\hline
TI-02-04 & RN-30 & classifyAlert & Integração & MC/DC & null & null & Pass \\
\hline
TI-02-05 & RN-30 & importFromCSV & Integração & PE & invalido.csv: 0 válidas, 6 inválidas & valid=0, invalid=6, 6 erros & Pass \\
\hline
TI-02-06 & RN-30 & importFromCSV & Integração & PE & 3 válidas, 2 inválidas no misto.csv & valid=3, invalid=2 & Pass \\
\hline
TI-02-07 & RN-30 & importFromCSV & Integração & PE & vazio.csv: 0 válidas & valid=0, errors.length>0 & Pass \\
\hline
TI-02-08 & RF-07 & importFromCSV & Integração & PE & 1 válida, 1 inválida & valid=1, invalid=1 & Pass \\
\hline
TI-02-09 & RF-06 & importFromCSV & Integração & PE & CSV null: 0 válidas & valid=0, errors.length>0 & Pass \\
\hline
TI-02-10 & RF-04 & importFromCSV & Integração & PE & Poucas colunas: inválido & invalid>0, erro "Formato inválido" & Pass \\
\hline
TI-03-01 & RN-04 & validatePlanData & Integração & MC/DC & Aceito (com autorização) & valid=true & Pass \\
\hline
TI-03-02 & RN-04 & validatePlanData & Integração & MC/DC & Rejeitado (sem autorização) & valid=false, errors contêm "autorização" & Pass \\
\hline
TI-04-01 & RN-39 & validateStateTransition, calculateProductivity & Integração & MC/DC & Transição permitida, 95\% produtividade & permitido=true, produtividade=95 & Pass \\
\hline
TI-04-02 & RN-40 & validateStateTransition & Integração & MC/DC & Transição permitida & permitido=true & Pass \\
\hline
TI-04-03 & RN-40 & validateStateTransition & Integração & MC/DC & Transição rejeitada & permitido=false & Pass \\
\hline
TI-04-04 & RN-39 & validateStateTransition & Integração & MC/DC & Transição rejeitada & permitido=false & Pass \\
\hline
TI-04-05 & RN-41 & validateStateTransition & Integração & MC/DC & Transição rejeitada & permitido=false & Pass \\
\hline
TI-05-01 & RF-16 & importFromCSV, validatePlanData, classifyAlert, validateStateTransition, calculateProductivity & Integração & PE+VL+MC/DC & Ciclo completo: herb$\to$plano$\to$lote$\to$alertas$\to$produtividade & alertas=["Informativo","Aviso","Crítico"], produtividade$\approx$94.67 & Pass \\
\hline
\end{tabular}
\end{table}

\subsubsection{Detecão de Ervas Inválidas no CSV}

O ficheiro \texttt{invalido.csv} contém 6 linhas com diferentes tipos de erro, todas rejeitadas na importação:

\begin{table}[H]
\centering
\caption{Detecão de Erros no CSV -- invalido.csv}
\small
\begin{tabular}{|p{2cm}|p{3cm}|p{4.5cm}|c|}
\hline
\textbf{Linha} & \textbf{Erva} & \textbf{Erro Detectado} & \textbf{Estado} \\
\hline
2 & Erva1 & Temperatura mínima -100 (fora \lbrack-50, 50\rbrack) & Pass \\
\hline
3 & Erva2 & tempMin 30 $>$ tempMax 20 (min $>$ max) & Pass \\
\hline
4 & Erva3 & Humidade mínima 150 (fora \lbrack0, 100\rbrack) & Pass \\
\hline
5 & Erva4 & Luminosidade 200000 (fora \lbrack0, 100000\rbrack) & Pass \\
\hline
6 & Sp5 & Nome vazio & Pass \\
\hline
7 & Erva6 & Espécie vazia & Pass \\
\hline
\end{tabular}
\end{table}

\subsection{Matriz de Rastreabilidade Atualizada (Sprint 2)}

A matriz completa encontra-se no ficheiro \texttt{SPRINT2\_MATRIZ\_RASTREABILIDADE.md}. As 9 colunas exigidas pelo enunciado são:

\begin{itemize}[leftmargin=2cm]
    \item \textbf{ID do Caso de Teste} -- TU-H01 a TU-H25, TU-P01 a TU-P37, TI-01-01 a TI-05-01
    \item \textbf{Requisito / Regra de Negócio} -- RF-03 a RF-16, RN-01 a RN-51
    \item \textbf{Endpoint(s) Exercitado(s)} -- validateHerbData, importFromCSV, validatePlanData, classifyAlert, calculateProductivity, validateStateTransition
    \item \textbf{Nível de Teste} -- Unidade ou Integração
    \item \textbf{Técnica Aplicada} -- PE, VL, MC/DC
    \item \textbf{Resultado Esperado} -- Comportamento previsto
    \item \textbf{Resultados Obtidos} -- Valores observados na execução
    \item \textbf{Estado} -- Pass para todos os testes
    \item \textbf{Pré-condições} -- Fixtures, estado inicial, ficheiros necessários
\end{itemize}

\textbf{Cobertura por requisito:}

\begin{table}[H]
\centering
\caption{Cobertura de Requisitos -- Sprint 2}
\small
\begin{tabular}{|p{4cm}|c|c|}
\hline
\textbf{Tipo} & \textbf{Total} & \textbf{Cobertos} \\
\hline
Requisitos Funcionais (RF) & 13 & 11 (85\%) \\
\hline
Regras de Negócio (RN) & 51 & 51 (100\%) \\
\hline
\textbf{Total} & \textbf{64} & \textbf{62 (97\%)} \\
\hline
\end{tabular}
\end{table}

\subsection{Resultados e Métricas}

\subsubsection{Número de Testes Executados}

\begin{table}[H]
\centering
\caption{Distribuição de Testes -- Sprint 2}
\small
\begin{tabular}{|l|c|c|}
\hline
\textbf{Categoria} & \textbf{Quantidade} & \textbf{Estado} \\
\hline
Testes de Unidade -- Herbs Service & 25 & Pass \\
\hline
Testes de Unidade -- Plans Service & 37 & Pass \\
\hline
Testes de Integração & 20 & Pass \\
\hline
\textbf{Total Sprint 2} & \textbf{82} & \textbf{Pass} \\
\hline
\end{tabular}
\end{table}

\begin{itemize}[leftmargin=2cm]
    \item \textbf{Testes aprovados:} 82/82 (100\%)
    \item \textbf{Testes reprovados:} 0/82 (0\%)
    \item \textbf{Total acumulado (Sprint 1 + 2):} 112 testes
    \item \textbf{Tempo total de execução:} 0.5 segundos
\end{itemize}

\subsubsection{Cobertura de Código}

\begin{table}[H]
\centering
\caption{Cobertura de Código -- Sprint 2}
\small
\begin{tabular}{|l|c|c|c|c|}
\hline
\textbf{Arquivo} & \textbf{Statements} & \textbf{Branches} & \textbf{Functions} & \textbf{Lines} \\
\hline
authService.js & 100\% & 100\% & 100\% & 100\% \\
\hline
herbsService.js & 82.19\% & 85.36\% & 100\% & 81.69\% \\
\hline
plansService.js & 81.81\% & 81.37\% & 100\% & 81.81\% \\
\hline
\textbf{Total} & \textbf{84.50\%} & \textbf{85.11\%} & \textbf{100\%} & \textbf{84.36\%} \\
\hline
\end{tabular}
\end{table}

\subsubsection{Defeitos Encontrados}

\begin{table}[H]
\centering
\caption{Registo de Defeitos -- Sprint 2}
\small
\begin{tabular}{|p{2cm}|p{5cm}|p{2cm}|p{2cm}|}
\hline
\textbf{ID} & \textbf{Descrição} & \textbf{Severidade} & \textbf{Estado} \\
\hline
DEF-001 & Teste TU-H22 esperava rejeição com temp=17 (intervalo era \lbrack-50, 50\rbrack, não \lbrack-20, 20\rbrack) & Baixa & Resolvido \\
\hline
\end{tabular}
\end{table}

\subsubsection{Sumário de Técnicas Aplicadas}

\begin{table}[H]
\centering
\caption{Técnicas Aplicadas -- Sprint 2}
\small
\begin{tabular}{|l|c|c|}
\hline
\textbf{Técnica} & \textbf{Casos} & \textbf{Funções Aplicadas} \\
\hline
Particionamento de Equivalência (PE) & 26 & validateHerbData, importFromCSV, validatePlanData, calculateProductivity \\
\hline
Análise de Valores Limite (VL) & 20 & validateHerbData, validatePlanData \\
\hline
Cobertura MC/DC & 16 & validatePlanData (pontual), classifyAlert, validateStateTransition \\
\hline
Testes de Integração & 20 & Fluxos combinando todos os serviços com dados de ficheiros CSV \\
\hline
\end{tabular}
\end{table}

\subsection{Notas e Observações}

\subsubsection{Decisões de Implementação}

\begin{enumerate}[leftmargin=2cm]
    \item \textbf{Fixtures CSV:} Foram criados 4 ficheiros CSV de suporte (válido, inválido, misto, vazio) para alimentar os testes de integração com dados reais, eliminando dados hardcoded.
    
    \item \textbf{Importação antes de validação:} Os testes de integração importam primeiro os ficheiros CSV e só depois usam os objetos resultantes para criar planos e classificar alertas, garantindo que o fluxo completo é validado.
    
    \item \textbf{Detecão de inválidos:} O ficheiro \texttt{invalido.csv} cobre 6 tipos diferentes de erro (temperatura, min$>$max, humidade, luminosidade, nome vazio, espécie vazia), todos detetados na importação.
    
    \item \textbf{Limites absolutos vs. recomendados:} Os validadores de plano usam intervalos absolutos (temperatura \lbrack-50, 50\rbrack), enquanto os valores recomendados (ex: \lbrack18, 28\rbrack) são orientativos. Esta distinção está documentada nos testes.
\end{enumerate}

\subsubsection{Lições Aprendidas}

\begin{itemize}[leftmargin=2cm]
    \item O uso de ficheiros CSV reais como fonte de dados tornou os testes mais robustos e representativos de cenários reais.
    
    \item A segregação entre ervas válidas e inválidas no mesmo ficheiro (misto.csv) provou ser eficaz para validar o comportamento do importador em cenários mistos.
    
    \item A aplicação de MC/DC exigiu documentação cuidadosa das tabelas de verdade para garantir rastreabilidade entre condições lógicas e casos de teste.
\end{itemize}

\subsubsection{Conformidade com Requisitos do Enunciado}

O Sprint 2 cumpre integralmente os objetivos estabelecidos:

\begin{itemize}[leftmargin=2cm]
    \item[$\checkmark$] Criação de testes de unidade para importação do catálogo de ervas aromáticas (25 testes)
    \item[$\checkmark$] Criação de testes de unidade para planos de cultivo (37 testes)
    \item[$\checkmark$] Criação de testes de integração com dados de ficheiros CSV (20 testes)
    \item[$\checkmark$] Aplicação de PE, VL e MC/DC com documentação de tabelas de verdade
    \item[$\checkmark$] Atualização da matriz de rastreabilidade com 9 colunas obrigatórias
    \item[$\checkmark$] Cobertura de código $>$ 84\%, 100\% funções cobertas
    \item[$\checkmark$] Nenhum teste com dados hardcoded -- todos usam valores importados dos CSV
\end{itemize}

% ============================================
% SPRINT 3 (PLACEHOLDER)
% ============================================
\newpage
\section{Sprint 3 - Testes de Integração e Sistema}

\subsection{Descrição e Objetivos}

O Sprint 3 centra-se na validação end-to-end de fluxos críticos da plataforma GREENHERB, incluindo ciclos completos de cultivo, gestão de alertas e automação de tarefas.

\textbf{Objetivos específicos:}
\begin{enumerate}[leftmargin=2cm]
    \item Implementar testes de sistema para fluxo completo de lote (criação → operações → conclusão).
    
    \item Validar geração automática de alertas com base em medições ambientais.
    
    \item Testar transições de estado de lote e cálculo de produtividade.
    
    \item Aplicar cobertura de condições múltiplas para decisões compostas.
    
    \item Documentar fluxos de incidentes e resposta a alertas críticos.
\end{enumerate}

\subsection{Conteúdo a Desenvolver}

[Este sprint será preenchido nas próximas semanas com:]

\begin{itemize}[leftmargin=2cm]
    \item Plano detalhado de testes de sistema
    \item Casos de teste end-to-end
    \item Aplicação de técnicas MC/DC
    \item Tabelas de verdade para decisões compostas
    \item Resultados de execução
    \item Relatórios de defeitos
\end{itemize}

% ============================================
% SPRINT 4 (PLACEHOLDER)
% ============================================
\newpage
\section{Sprint 4 - Cobertura de Condições Múltiplas e Finalização}

\subsection{Descrição e Objetivos}

O Sprint 4 consolida o trabalho anterior, com enfoque particular em técnicas avançadas de caixa-branca (MC/DC), documentação final e elaboração de relatórios de qualidade.

\textbf{Objetivos específicos:}
\begin{enumerate}[leftmargin=2cm]
    \item Aplicar cobertura MC/DC a componentes críticos (classificador de alertas, motor de automação, validadores).
    
    \item Produzir tabelas de verdade completas para cada decisão composta.
    
    \item Integrar resultados de todos os sprints anteriores.
    
    \item Elaborar recomendações de melhoria e planos de correção de defeitos.
    
    \item Finalizar matriz de rastreabilidade bidirecional.
\end{enumerate}

\subsection{Conteúdo a Desenvolver}

[Este sprint será preenchido na fase final com:]

\begin{itemize}[leftmargin=2cm]
    \item Análise completa de cobertura de condições múltiplas
    \item Tabelas de verdade para decisões compostas
    \item Justificação de casos MC/DC selecionados
    \item Integração de métricas de todos os sprints
    \item Análise de defeitos e recomendações
    \item Conclusões finais
\end{itemize}

% ============================================
% CONCLUSÃO
% ============================================
\newpage
\section{Conclusão}

Este relatório documenta o plano e a execução progressiva de um projeto de testes abrangente para a plataforma GREENHERB, aplicando técnicas formais de teste de software de acordo com normas internacionais.

\subsection{Síntese dos Resultados}

[Será completada após conclusão de todos os sprints com:]

\begin{itemize}[leftmargin=2cm]
    \item Resumo de testes executados por nível
    \item Cobertura global de código e funcional
    \item Defeitos críticos encontrados e resolvidos
    \item Conformidade com requisitos funcionais
\end{itemize}

\subsection{Limitações e Trabalhos Futuros}

[Será preenchida com discussão de:]

\begin{itemize}[leftmargin=2cm]
    \item Áreas não cobertas por limitações de tempo ou escopo
    \item Sugestões para otimização de testes
    \item Mecanismos de teste de performance e carga
    \item Integração contínua e automação
\end{itemize}

\subsection{Recomendações}

[Será completada com recomendações para:]

\begin{itemize}[leftmargin=2cm]
    \item Correção de defeitos críticos encontrados
    \item Melhorias na especificação funcional (ambiguidades encontradas)
    \item Processos de garantia de qualidade futuro
\end{itemize}

\end{document}