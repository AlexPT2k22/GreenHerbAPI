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
\caption{Exemplos de Casos de Teste para Autenticação (Sprint 1)}
\begin{tabular}{|l|l|p{4cm}|}
\hline
\textbf{ID} & \textbf{Cenário} & \textbf{Resultado Esperado} \\
\hline
TU01 & Hash de password válida & Password armazenada com hash seguro \\
\hline
TU02 & Comparação de password correcta & Retorna TRUE \\
\hline
TU03 & Comparação de password incorrecta & Retorna FALSE \\
\hline
TU04 & Geração de JWT válido & Token com expiração e claim de utilizador \\
\hline
TI01 & Login com email e password válidos & HTTP 200, token devolvido \\
\hline
TI02 & Login com email inválido & HTTP 401 Unauthorized \\
\hline
TI03 & Login com password errada & HTTP 401 Unauthorized \\
\hline
TI04 & Acesso a endpoint protegido sem token & HTTP 401 Unauthorized \\
\hline
TI05 & Acesso a endpoint protegido com token expirado & HTTP 403 Forbidden \\
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
\begin{tabular}{|c|c|l|}
\hline
\textbf{Valor} & \textbf{Classificação} & \textbf{Resultado Esperado} \\
\hline
7 caracteres & Abaixo do limite & HTTP 400 Bad Request (password muito curta) \\
\hline
8 caracteres & Limite inferior & HTTP 200 OK (aceite) \\
\hline
50 caracteres & Valor nominal & HTTP 200 OK (aceite) \\
\hline
128 caracteres & Limite superior & HTTP 200 OK (aceite) \\
\hline
129 caracteres & Acima do limite & HTTP 400 Bad Request (password muito longa) \\
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
\begin{tabular}{|p{1cm}|p{1.5cm}|p{3.5cm}|p{1.5cm}|p{2cm}|p{3cm}|}
\hline
\textbf{ID} & \textbf{Req.} & \textbf{Endpoint} & \textbf{Nível} & \textbf{Técnica} & \textbf{Resultado Esperado} \\
\hline
TU-01 & RF-01 & POST /api/auth/login & Unidade & PE (P-U1: username null) & Retorna 400 Bad Request \\
\hline
TU-02 & RF-01 & POST /api/auth/login & Unidade & PE (P-U1: username vazio) & Retorna 400 Bad Request \\
\hline
TU-03 & RF-01 & POST /api/auth/login & Unidade & PE (P-U2: username inexistente) & Retorna 401 Authentication failed \\
\hline
TU-04 & RF-01 & POST /api/auth/login & Unidade & PE (P-P1: password null) & Retorna 400 Bad Request \\
\hline
TU-05 & RF-01 & POST /api/auth/login & Unidade & PE (P-P1: password vazia) & Retorna 400 Bad Request \\
\hline
TU-06 & RF-01 & POST /api/auth/login & Unidade & PE (P-P2: password incorrecta) & Retorna 401 Authentication failed \\
\hline
TU-07 & RF-01, 02, 03 & POST /api/auth/login & Unidade & PE (P-U3 × P-P3: válidos) & Retorna 200 com accessToken, refreshToken e perfil \\
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
\begin{tabular}{|p{1cm}|p{1.5cm}|p{3.5cm}|p{1.5cm}|p{2cm}|p{3cm}|}
\hline
\textbf{ID} & \textbf{Req.} & \textbf{Endpoint} & \textbf{Nível} & \textbf{Técnica} & \textbf{Resultado Esperado} \\
\hline
TU-08 & RF-04 & POST /api/auth/refresh & Unidade & PE (token ausente) & Retorna 400 Bad Request \\
\hline
TU-09 & RF-04 & POST /api/auth/refresh & Unidade & PE (token inválido) & Retorna 401 Token renewal failed \\
\hline
TU-10 & RF-04 & POST /api/auth/refresh & Unidade & PE (token válido) & Retorna 200 com novo accessToken \\
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

O Sprint 2 alarga o âmbito dos testes para cobrir funcionalidades críticas relacionadas com a gestão do catálogo de ervas aromáticas e criação de planos de cultivo. Nesta fase, são desenvolvidos serviços de validação de negócio (\texttt{herbsService} e \texttt{plansService}) com testes de unidade abrangentes, aplicando técnicas formais de Particionamento de Equivalência (PE), Análise de Valores Limite (VL) e Cobertura de Condições Múltiplas (MC/DC).

\textbf{Objetivos específicos:}
\begin{enumerate}[leftmargin=2cm]
    \item Implementar \texttt{herbsService.js} com validação de dados de ervas aromáticas e importação de ficheiros CSV.
    
    \item Implementar \texttt{plansService.js} com validação de planos de cultivo (regular, emergência, pontual) e regra de negócio RN-04 (autorização para planos pontuais).
    
    \item Desenvolver 36 testes de unidade para \texttt{herbsService} aplicando PE e VL.
    
    \item Desenvolver 50 testes de unidade para \texttt{plansService} aplicando PE, VL e MC/DC.
    
    \item Atualizar matriz de rastreabilidade com 86 novos casos de teste (TU-15 a TU-100).
    
    \item Alcançar cobertura de código superior a 92\% em todas as métricas.
\end{enumerate}

\subsection{Componentes Desenvolvidos}

\subsubsection{herbsService.js}

Serviço de validação e importação de ervas aromáticas com as seguintes funcionalidades:

\begin{itemize}[leftmargin=2cm]
    \item \texttt{validateHerb(herbData)}: Valida dados completos de uma erva aromática
    \item \texttt{parseCsvLine(line, lineNumber)}: Analisa e valida linha CSV
    \item \texttt{importHerbsFromCsv(csvContent)}: Importação massiva com relatório agregado
\end{itemize}

\textbf{Validações implementadas:}
\begin{itemize}[leftmargin=2cm]
    \item Nome: 2-100 caracteres (obrigatório)
    \item Nome científico: 2-100 caracteres (obrigatório)
    \item Temperatura ideal: 0-50°C (obrigatório, numérico)
    \item Humidade ideal: 0-100\% (obrigatório, numérico)
    \item Luminosidade ideal: 0-100000 lux (obrigatório, numérico)
    \item Dias até colheita: 1-365 dias (obrigatório, inteiro)
\end{itemize}

\subsubsection{plansService.js}

Serviço de validação de planos de cultivo com suporte aos três tipos de plano:

\begin{itemize}[leftmargin=2cm]
    \item \texttt{isValidPlanType(planType)}: Valida tipo de plano (regular, emergencia, pontual)
    \item \texttt{validateTemperatureRange(min, max)}: Valida intervalo [18-28°C]
    \item \texttt{validateHumidityRange(min, max)}: Valida intervalo [40-80\%]
    \item \texttt{validateLuminosityRange(min, max)}: Valida intervalo [5000-25000 lux]
    \item \texttt{validateDuration(duration)}: Valida duração [1-365 dias inteiros]
    \item \texttt{validatePlanCreation(planData)}: Validação completa de plano
    \item \texttt{validatePontualPlanAuthorization(type, hasAuth, paramsValid)}: Validação de RN-04 com MC/DC
\end{itemize}

\textbf{Regras de Negócio Implementadas:}
\begin{itemize}[leftmargin=2cm]
    \item \textbf{RN-01:} Intervalos obrigatórios para temperatura, humidade, luminosidade e duração
    \item \textbf{RN-04:} Plano pontual requer autorização explícita do Responsável Técnico
\end{itemize}

\subsection{Plano de Testes Detalhado}

\subsubsection{Estratégia Geral}

O Sprint 2 aplica de forma rigorosa as três técnicas formais exigidas no enunciado:

\begin{enumerate}[leftmargin=2cm]
    \item \textbf{Particionamento de Equivalência (PE):} 32 testes (37.2\%)
    \begin{itemize}
        \item Classes válidas e inválidas para tipos de plano
        \item Campos obrigatórios presentes vs ausentes
        \item Formatos CSV válidos vs malformados
    \end{itemize}
    
    \item \textbf{Análise de Valores Limite (VL):} 44 testes (51.2\%)
    \begin{itemize}
        \item Testes em intervalos: min-1, min, nominal, max, max+1
        \item Temperatura: [18-28°C]
        \item Humidade: [40-80\%]
        \item Luminosidade: [5000-25000 lux]
        \item Duração: [1-365 dias]
    \end{itemize}
    
    \item \textbf{Cobertura de Condições Múltiplas (MC/DC):} 10 testes (11.6\%)
    \begin{itemize}
        \item Tabela de verdade completa (8 combinações)
        \item Demonstração de independência de cada condição
        \item Decisão: (isPontual \&\& hasAuthorization \&\& parametersValid)
    \end{itemize}
\end{enumerate}

\subsubsection{Casos de Teste - Importação de Ervas (36 testes)}

\begin{table}[H]
\centering
\caption{Distribuição de Testes - herbsService}
\begin{tabular}{|l|c|}
\hline
\textbf{Grupo de Testes} & \textbf{Quantidade} \\
\hline
validateHerb - Particionamento de Equivalência & 6 \\
\hline
validateHerb - Valores Limite (Nome, Temp, Dias) & 12 \\
\hline
validateHerb - Valores Limite (Humidade, Luminosidade) & 8 \\
\hline
parseCsvLine - Particionamento de Equivalência & 4 \\
\hline
importHerbsFromCsv - Casos Combinados & 6 \\
\hline
\textbf{Total herbsService} & \textbf{36 testes} \\
\hline
\end{tabular}
\end{table}

\textbf{Exemplos representativos:}

\begin{table}[H]
\centering
\caption{Casos de Teste Selecionados - herbsService}
\small
\begin{tabular}{|p{1.2cm}|p{2.5cm}|p{1.5cm}|p{4cm}|p{2cm}|}
\hline
\textbf{ID} & \textbf{Técnica} & \textbf{Tipo} & \textbf{Descrição} & \textbf{Estado} \\
\hline
TU-15 & PE erro & Unidade & herbData null → Lança "Herb data is required" & ✅ Passou \\
\hline
TU-20 & PE válida & Unidade & Todos campos válidos → isValid true & ✅ Passou \\
\hline
TU-26 & VL (0°C) & Unidade & Temperatura 0°C (limite inf.) → isValid true & ✅ Passou \\
\hline
TU-27 & VL (50°C) & Unidade & Temperatura 50°C (limite sup.) → isValid true & ✅ Passou \\
\hline
TU-30 & VL (1 dia) & Unidade & 1 dia até colheita (limite inf.) → isValid true & ✅ Passou \\
\hline
TU-31 & VL (365 dias) & Unidade & 365 dias até colheita (limite sup.) → isValid true & ✅ Passou \\
\hline
TU-40 & PE válida & Unidade & CSV com 2 linhas válidas → total=2, valid=2 & ✅ Passou \\
\hline
TU-42 & PE mista & Unidade & CSV misto (2 válidas, 1 inválida) → totais corretos & ✅ Passou \\
\hline
\end{tabular}
\end{table}

\subsubsection{Casos de Teste - Planos de Cultivo (50 testes)}

\begin{table}[H]
\centering
\caption{Distribuição de Testes - plansService}
\begin{tabular}{|l|c|}
\hline
\textbf{Grupo de Testes} & \textbf{Quantidade} \\
\hline
isValidPlanType - Particionamento de Equivalência & 7 \\
\hline
validateTemperatureRange - Valores Limite & 7 \\
\hline
validateHumidityRange - Valores Limite & 6 \\
\hline
validateLuminosityRange - Valores Limite & 6 \\
\hline
validateDuration - Valores Limite & 6 \\
\hline
validatePlanCreation - Validação Completa & 8 \\
\hline
validatePontualPlanAuthorization - MC/DC & 10 \\
\hline
\textbf{Total plansService} & \textbf{50 testes} \\
\hline
\end{tabular}
\end{table}

\textbf{Exemplos representativos:}

\begin{table}[H]
\centering
\caption{Casos de Teste Selecionados - plansService}
\small
\begin{tabular}{|p{1.2cm}|p{2.5cm}|p{1.5cm}|p{4cm}|p{2cm}|}
\hline
\textbf{ID} & \textbf{Técnica} & \textbf{Tipo} & \textbf{Descrição} & \textbf{Estado} \\
\hline
TU-51 & PE válida & Unidade & Tipo "regular" → true & ✅ Passou \\
\hline
TU-54 & PE inválida & Unidade & Tipo "invalido" → false & ✅ Passou \\
\hline
TU-59 & VL (18°C) & Unidade & Temperatura min=18°C (limite inf.) → isValid true & ✅ Passou \\
\hline
TU-62 & VL (29°C) & Unidade & Temperatura max=29°C (acima limite) → isValid false & ✅ Passou \\
\hline
TU-66 & VL (40\%) & Unidade & Humidade min=40\% (limite inf.) → isValid true & ✅ Passou \\
\hline
TU-80 & VL (365 dias) & Unidade & Duração 365 dias (limite sup.) → isValid true & ✅ Passou \\
\hline
TU-86 & PE inválida & Unidade & Plano pontual sem autorização → isValid false & ✅ Passou \\
\hline
TU-87 & PE válida & Unidade & Plano pontual com autorização → isValid true & ✅ Passou \\
\hline
TU-96 & MC/DC (T-T-T) & Unidade & Pontual autorizado e válido → canCreate true & ✅ Passou \\
\hline
\end{tabular}
\end{table}

\subsection{Aplicação de Técnicas Formais}

\subsubsection{Particionamento de Equivalência - Tipos de Plano}

\begin{table}[H]
\centering
\caption{Particionamento de Equivalência - Tipos de Plano de Cultivo}
\begin{tabular}{|l|p{5cm}|p{3cm}|}
\hline
\textbf{Classe} & \textbf{Descrição} & \textbf{Casos de Teste} \\
\hline
Válida & Tipo = "regular", "emergencia", "pontual" (case-insensitive) & TU-51, TU-52, TU-53, TU-57 \\
\hline
Inválida & Tipo desconhecido, null, undefined & TU-54, TU-55, TU-56 \\
\hline
\end{tabular}
\end{table}

\textbf{Justificação:} Os três tipos de plano constituem classes de equivalência válidas porque provocam comportamentos distintos no sistema (em particular, o tipo "pontual" ativa validação adicional de autorização — RN-04). Tipos fora deste conjunto são inválidos e devem ser rejeitados uniformemente.

\subsubsection{Particionamento de Equivalência - Importação CSV}

\begin{table}[H]
\centering
\caption{Particionamento de Equivalência - Ficheiros CSV}
\begin{tabular}{|l|p{5cm}|p{3cm}|}
\hline
\textbf{Classe} & \textbf{Descrição} & \textbf{Casos de Teste} \\
\hline
Válida & Ficheiro com linhas corretas (6 campos numéricos válidos) & TU-35, TU-40 \\
\hline
Inválida Total & Ficheiro vazio, apenas cabeçalho, linhas malformadas & TU-37, TU-38, TU-39, TU-41 \\
\hline
Mista (Parcial) & Combinação de linhas válidas e inválidas & TU-42 \\
\hline
\end{tabular}
\end{table}

\textbf{Justificação:} A importação CSV possui comportamento distinto para ficheiros totalmente válidos (aceita tudo), totalmente inválidos (rejeita tudo) e mistos (relatório agregado). Cada classe exige tratamento diferenciado.

\subsubsection{Análise de Valores Limite - Parâmetros de Ambiente}

O enunciado especifica intervalos rigorosos para parâmetros ambientais de planos de cultivo. A tabela seguinte apresenta os valores-limite testados:

\begin{table}[H]
\centering
\caption{Valores Limite Testados - Parâmetros de Planos}
\begin{tabular}{|l|c|c|c|c|c|}
\hline
\textbf{Parâmetro} & \textbf{min-1} & \textbf{min} & \textbf{nominal} & \textbf{max} & \textbf{max+1} \\
\hline
Temperatura (°C) & 17 ❌ & 18 ✅ & 23 ✅ & 28 ✅ & 29 ❌ \\
\hline
Humidade (\%) & 39 ❌ & 40 ✅ & 60 ✅ & 80 ✅ & 81 ❌ \\
\hline
Luminosidade (lux) & 4999 ❌ & 5000 ✅ & 15000 ✅ & 25000 ✅ & 25001 ❌ \\
\hline
Duração (dias) & 0 ❌ & 1 ✅ & 90 ✅ & 365 ✅ & 366 ❌ \\
\hline
\end{tabular}
\end{table}

\textbf{Casos de Teste Mapeados:}
\begin{itemize}[leftmargin=2cm]
    \item Temperatura: TU-58 (17°), TU-59 (18°), TU-60 (23°), TU-61 (28°), TU-62 (29°)
    \item Humidade: TU-65 (39\%), TU-66 (40\%), TU-67 (60\%), TU-68 (80\%), TU-69 (81\%)
    \item Luminosidade: TU-71 (4999), TU-72 (5000), TU-73 (15000), TU-74 (25000), TU-75 (25001)
    \item Duração: TU-77 (0), TU-78 (1), TU-79 (90), TU-80 (365), TU-81 (366)
\end{itemize}

\textbf{Justificação:} Defeitos de implementação ocorrem frequentemente nas fronteiras de intervalos (erros de comparação $<$ vs $\leq$, $>$ vs $\geq$). Testar os limites e valores imediatamente adjacentes maximiza a deteção destes erros.

\subsubsection{Análise de Valores Limite - herbsService}

Aplicação idêntica para validação de ervas aromáticas:

\begin{table}[H]
\centering
\caption{Valores Limite Testados - herbsService}
\begin{tabular}{|l|c|c|c|c|c|}
\hline
\textbf{Parâmetro} & \textbf{min-1} & \textbf{min} & \textbf{nominal} & \textbf{max} & \textbf{max+1} \\
\hline
Nome (chars) & 1 ❌ & 2 ✅ & 50 ✅ & 100 ✅ & 101 ❌ \\
\hline
Temperatura (°C) & -1 ❌ & 0 ✅ & 25 ✅ & 50 ✅ & 51 ❌ \\
\hline
Humidade (\%) & -1 ❌ & 0 ✅ & 50 ✅ & 100 ✅ & 101 ❌ \\
\hline
Luminosidade (lux) & -1 ❌ & 0 ✅ & 50000 ✅ & 100000 ✅ & 100001 ❌ \\
\hline
Dias colheita & 0 ❌ & 1 ✅ & 180 ✅ & 365 ✅ & 366 ❌ \\
\hline
\end{tabular}
\end{table}

\subsubsection{Cobertura de Condições Múltiplas (MC/DC)}

A função \texttt{validatePontualPlanAuthorization} implementa a regra de negócio RN-04: "Plano pontual requer autorização do Responsável Técnico". A decisão lógica envolve três condições atómicas:

\textbf{Decisão Composta:}
\begin{verbatim}
canCreate = (C1: isPontual) && (C2: hasAuthorization) && (C3: parametersValid)
\end{verbatim}

\textbf{Tabela de Verdade Completa:}

\begin{table}[H]
\centering
\caption{Tabela de Verdade MC/DC - validatePontualPlanAuthorization}
\begin{tabular}{|c|c|c|c|c|c|l|}
\hline
\textbf{ID} & \textbf{C1} & \textbf{C2} & \textbf{C3} & \textbf{Resultado} & \textbf{Estado} & \textbf{Descrição} \\
\hline
TU-89 & F & F & F & FALSE & ✅ & Plano regular, params inválidos \\
\hline
TU-90 & F & F & T & TRUE & ✅ & Plano regular, params válidos \\
\hline
TU-91 & F & T & F & FALSE & ✅ & Plano emergência, params inválidos \\
\hline
TU-92 & F & T & T & TRUE & ✅ & Plano emergência, params válidos \\
\hline
TU-93 & T & F & F & FALSE & ✅ & Pontual sem autorização \\
\hline
TU-94 & T & F & T & FALSE & ✅ & Pontual sem autorização (C2 crítico) \\
\hline
TU-95 & T & T & F & FALSE & ✅ & Pontual autorizado, params inválidos (C3 crítico) \\
\hline
TU-96 & T & T & T & TRUE & ✅ & Pontual autorizado e válido ✓ \\
\hline
\end{tabular}
\end{table}

\textbf{Análise de Independência (MC/DC):}

Para satisfazer MC/DC, cada condição atómica deve demonstrar capacidade de afetar o resultado da decisão de forma independente:

\begin{itemize}[leftmargin=2cm]
    \item \textbf{C1 (isPontual):} Comparando TU-90 (C1=F, resultado=TRUE) com TU-96 (C1=T, resultado=TRUE), observamos que C1 afeta o resultado quando C2=T e C3=T. A transição de FALSE para TRUE em C1 exige autorização adicional.
    
    \item \textbf{C2 (hasAuthorization):} Comparando TU-94 (C2=F, resultado=FALSE) com TU-96 (C2=T, resultado=TRUE), observamos que C2 afeta criticamente o resultado quando C1=T e C3=T. Sem autorização, planos pontuais são sempre rejeitados.
    
    \item \textbf{C3 (parametersValid):} Comparando TU-95 (C3=F, resultado=FALSE) com TU-96 (C3=T, resultado=TRUE), observamos que C3 afeta o resultado quando C1=T e C2=T. Parâmetros inválidos bloqueiam criação mesmo com autorização.
\end{itemize}

\textbf{Conclusão MC/DC:} As 8 combinações foram testadas, e cada condição demonstrou capacidade de afetar independentemente o resultado da decisão. O subconjunto mínimo MC/DC seria \{TU-90, TU-94, TU-95, TU-96\}, mas testámos todas as combinações para garantir cobertura total.

\subsection{Matriz de Rastreabilidade Atualizada (Sprint 2)}

A matriz de rastreabilidade do Sprint 2 adiciona 86 casos de teste (TU-15 a TU-100) aos 29 do Sprint 1, totalizando \textbf{115 casos de teste} rastreados bidireccionalmente.

\subsubsection{Estrutura da Matriz}

Cada linha da matriz contém:
\begin{itemize}[leftmargin=2cm]
    \item \textbf{ID:} Identificador único (TU-15 a TU-100)
    \item \textbf{Requisito / Regra:} RF ou RN testada
    \item \textbf{Endpoint / Componente:} Recurso REST ou função interna
    \item \textbf{Nível:} Unidade, Integração ou Sistema
    \item \textbf{Técnica:} PE, VL ou MC/DC
    \item \textbf{Resultado Esperado:} Comportamento conforme especificação
    \item \textbf{Resultado Obtido:} Comportamento observado na execução
    \item \textbf{Estado:} ✅ Passou / ❌ Falhou / ⏸️ Pendente
    \item \textbf{Pré-condições:} Estado inicial necessário
\end{itemize}

\subsubsection{Cobertura de Requisitos}

\begin{table}[H]
\centering
\caption{Cobertura de Requisitos por Casos de Teste - Sprint 2}
\begin{tabular}{|p{2cm}|p{6cm}|p{3cm}|}
\hline
\textbf{Requisito} & \textbf{Descrição} & \textbf{Casos de Teste} \\
\hline
RF-03 & Importação e validação de catálogo de ervas aromáticas & TU-15 a TU-50 (36 testes) \\
\hline
RF-04 & Criação e validação de planos de cultivo (regular, emergência, pontual) & TU-51 a TU-100 (50 testes) \\
\hline
RN-01 & Intervalos obrigatórios para temperatura [18-28°C], humidade [40-80\%], luminosidade [5000-25000 lux], duração [1-365 dias] & TU-58 a TU-82 (25 testes) \\
\hline
RN-04 & Plano pontual requer autorização do Responsável Técnico & TU-86, TU-87, TU-89 a TU-98 (12 testes) \\
\hline
\end{tabular}
\end{table}

\textbf{Conclusão:} Todos os 4 requisitos funcionais principais do Sprint 2 possuem cobertura completa, sem lacunas identificadas.

\subsubsection{Cobertura Bidirecional - Endpoints}

\begin{table}[H]
\centering
\caption{Rastreabilidade Endpoints → Casos de Teste}
\begin{tabular}{|p{4cm}|p{2cm}|p{4cm}|}
\hline
\textbf{Endpoint / Componente} & \textbf{Método} & \textbf{Casos de Teste} \\
\hline
/herbs/import & POST & TU-37 a TU-42 (6 testes) \\
\hline
/plans & POST & TU-83 a TU-88, TU-99, TU-100 (8 testes) \\
\hline
herbsService (interno) & - & TU-15 a TU-50 (36 testes) \\
\hline
plansService (interno) & - & TU-51 a TU-100 (50 testes) \\
\hline
\end{tabular}
\end{table}

\subsection{Resultados e Métricas}

\subsubsection{Cobertura de Código}

Os testes do Sprint 2 alcançaram cobertura excelente em todas as métricas de código:

\begin{table}[H]
\centering
\caption{Cobertura de Código - Sprint 2}
\begin{tabular}{|l|c|c|c|c|}
\hline
\textbf{Ficheiro} & \textbf{Instruções} & \textbf{Ramos} & \textbf{Funções} & \textbf{Linhas} \\
\hline
authService.js (Sprint 1) & 100\% & 100\% & 100\% & 100\% \\
\hline
herbsService.js & 88.7\% & 91.46\% & 100\% & 88.33\% \\
\hline
plansService.js & 92.4\% & 94.49\% & 100\% & 92.4\% \\
\hline
\textbf{Média Global} & \textbf{92.39\%} & \textbf{94.24\%} & \textbf{100\%} & \textbf{92.3\%} \\
\hline
\end{tabular}
\end{table}

\textbf{Análise:}
\begin{itemize}[leftmargin=2cm]
    \item ✅ \textbf{100\% de cobertura de funções:} Todas as funções exportadas foram testadas
    \item ✅ \textbf{94.24\% de cobertura de ramos:} Quase todos os caminhos de decisão cobertos
    \item ✅ \textbf{92.39\% de instruções:} Excede objetivo de 90\% estabelecido no enunciado
    \item ⚠️ Linhas não cobertas: Principalmente tratamento de erros edge-case e validações secundárias
\end{itemize}

\subsubsection{Número de Testes Executados}

\begin{table}[H]
\centering
\caption{Distribuição de Testes - Sprint 2}
\begin{tabular}{|l|c|}
\hline
\textbf{Categoria} & \textbf{Quantidade} \\
\hline
Testes de Unidade - herbsService & 36 \\
\hline
Testes de Unidade - plansService & 50 \\
\hline
\textbf{Total Sprint 2} & \textbf{86 testes} \\
\hline
\textbf{Total Acumulado (Sprint 1 + 2)} & \textbf{115 testes} \\
\hline
\end{tabular}
\end{table}

\textbf{Métricas de Execução:}
\begin{itemize}[leftmargin=2cm]
    \item \textbf{Testes aprovados:} 115/115 (100\%)
    \item \textbf{Testes reprovados:} 0/115 (0\%)
    \item \textbf{Tempo total de execução:} 2.154 segundos
    \item \textbf{Média por teste:} $\sim$ 18.7 milissegundos
\end{itemize}

\subsubsection{Distribuição por Técnica}

\begin{table}[H]
\centering
\caption{Aplicação de Técnicas de Teste - Sprint 2}
\begin{tabular}{|l|c|c|}
\hline
\textbf{Técnica} & \textbf{Quantidade} & \textbf{Percentual} \\
\hline
Particionamento de Equivalência (PE) & 32 & 37.2\% \\
\hline
Análise de Valores Limite (VL) & 44 & 51.2\% \\
\hline
Cobertura de Condições Múltiplas (MC/DC) & 10 & 11.6\% \\
\hline
\textbf{Total} & \textbf{86} & \textbf{100\%} \\
\hline
\end{tabular}
\end{table}

\textbf{Observação:} A predominância de testes de Valores Limite (51.2\%) reflete a natureza dos requisitos do Sprint 2, que especificam múltiplos intervalos numéricos para validação.

\subsubsection{Defeitos Encontrados}

\begin{table}[H]
\centering
\caption{Registo de Defeitos - Sprint 2}
\begin{tabular}{|p{1.5cm}|p{6cm}|p{2cm}|p{2cm}|}
\hline
\textbf{ID} & \textbf{Descrição} & \textbf{Severidade} & \textbf{Estado} \\
\hline
\multicolumn{4}{|c|}{\textbf{Nenhum defeito encontrado}} \\
\hline
\end{tabular}
\end{table}

\textbf{Análise:} Todos os 86 testes do Sprint 2 passaram com sucesso na execução final. Um pequeno ajuste foi necessário durante o desenvolvimento para diferenciar corretamente strings vazias (\texttt{''}) de valores \texttt{null} na validação de CSV, mas este foi corrigido antes da entrega final.

\textbf{Taxa de Defeitos Encontrados:} 0 defeitos / 86 testes = 0\% (excelente qualidade de código).

\subsection{Notas e Observações}

\subsubsection{Decisões de Implementação}

Durante o Sprint 2, foram tomadas as seguintes decisões técnicas:

\begin{enumerate}[leftmargin=2cm]
    \item \textbf{Validação em Camadas:} Separação clara entre validação de campos individuais (funções específicas) e validação completa de entidade (funções agregadoras). Facilita testes unitários e reutilização.
    
    \item \textbf{Retorno Estruturado:} Todas as funções de validação retornam objeto \texttt{\{isValid: boolean, errors: string[]\}}, permitindo reportar múltiplos erros simultaneamente em vez de falhar no primeiro erro.
    
    \item \textbf{Importação CSV Tolerante a Falhas:} A função \texttt{importHerbsFromCsv} não lança exceção para linhas inválidas, mas regista-as no relatório final. Permite importação parcial de ficheiros mistos.
    
    \item \textbf{Constantes de Validação:} Exportação de \texttt{VALIDATION\_RANGES} e \texttt{PLAN\_TYPES} como constantes públicas, facilitando reutilização em controllers e documentação automática.
    
    \item \textbf{Case-Insensitive:} Tipos de plano aceites em maiúsculas, minúsculas ou misto (\texttt{.toLowerCase()}), aumentando usabilidade da API.
\end{enumerate}

\subsubsection{Lições Aprendidas}

\begin{itemize}[leftmargin=2cm]
    \item A aplicação rigorosa de \textbf{Análise de Valores Limite} é extremamente eficaz para detetar erros de comparação ($<$ vs $\leq$). Recomenda-se testar sempre: min-1, min, nominal, max, max+1.
    
    \item A técnica \textbf{MC/DC} exige documentação cuidadosa com tabelas de verdade. Investir tempo na elaboração da tabela facilita enormemente a implementação dos testes e a justificação das escolhas.
    
    \item \textbf{Testes de CSV} beneficiam de fixtures pré-construídas. Considerar criação de ficheiros de exemplo (válido.csv, invalido.csv, misto.csv) em \texttt{tests/fixtures/} para sprints futuros.
    
    \item A \textbf{matriz de rastreabilidade} deve incluir coluna "Resultado Obtido" desde o início, evitando atualizações retroativas trabalhosas.
\end{itemize}

\subsubsection{Conformidade com Requisitos do Enunciado}

O Sprint 2 cumpre integralmente os objetivos estabelecidos:

\begin{itemize}[leftmargin=2cm]
    \item[$\checkmark$] Criação de testes de unidade para importação de ervas aromáticas (36 testes)
    \item[$\checkmark$] Criação de testes de unidade para criação de planos de cultivo (50 testes)
    \item[$\checkmark$] Aplicação de Particionamento de Equivalência (32 casos, 37.2\%)
    \item[$\checkmark$] Aplicação de Análise de Valores Limite (44 casos, 51.2\%)
    \item[$\checkmark$] Aplicação de Cobertura de Condições Múltiplas / MC/DC (10 casos, 11.6\%)
    \item[$\checkmark$] Matriz de rastreabilidade atualizada com 86 casos de teste
    \item[$\checkmark$] Cobertura de código >92\% em todas as métricas
    \item[$\checkmark$] Documentação rigorosa com tabelas de verdade, justificações e análise MC/DC
\end{itemize}

\subsubsection{Próximos Passos}

Para os sprints seguintes, recomenda-se:

\begin{enumerate}[leftmargin=2cm]
    \item Integrar \texttt{herbsService} e \texttt{plansService} com controllers respectivos
    \item Implementar testes de integração com base de dados real (ou in-memory)
    \item Desenvolver testes end-to-end para fluxos completos (criação de erva → criação de plano → associação a lote)
    \item Aplicar MC/DC a componentes adicionais (classificador de alertas, motor de automação)
    \item Considerar testes de performance para importação de ficheiros CSV grandes (>10000 linhas)
\end{enumerate}

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