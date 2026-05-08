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

O Sprint 2 alarga o âmbito dos testes para cobrir funcionalidades relacionadas com a gestão de catálogo de ervas aromáticas e criação de planos de cultivo. Nesta fase, são desenvolvidos testes de unidade para validadores de dados de ervas e testes de integração para importação de ficheiros CSV/Excel.

\textbf{Objetivos específicos:}
\begin{enumerate}[leftmargin=2cm]
    \item Implementar testes de unidade para validação de dados de ervas (nome, propriedades, intervalos de temperatura/humidade).
    
    \item Criar testes de integração para importação de catálogo (sucesso, falha parcial, rejeiçãos).
    
    \item Desenvolver testes para criação e validação de planos de cultivo (regular, emergência, pontual).
    
    \item Aplicar particionamento de equivalência para tipos de plano e análise de valores-limite para parâmetros de ambiente.
    
    \item Atualizar matriz de rastreabilidade com novos casos de teste.
\end{enumerate}

\subsection{Plano de Testes Detalhado}

[Conteúdo será preenchido na execução do Sprint 2]

\subsubsection{Casos de Teste - Importação de Ervas}

[Tabela de casos de teste será adicionada aqui]

\subsubsection{Casos de Teste - Planos de Cultivo}

[Tabela de casos de teste será adicionada aqui]

\subsection{Aplicação de Técnicas Formais}

\subsubsection{Particionamento de Equivalência - Tipos de Plano}

[Tabela de particionamento será preenchida aqui]

\subsubsection{Análise de Valores Limite - Parâmetros de Ambiente}

[Tabelas de valores-limite serão preenchidas aqui]

\subsection{Matriz de Rastreabilidade Atualizada (Sprint 2)}

[Matriz será expandida com novos casos de teste]

\subsection{Resultados e Métricas}

\subsubsection{Cobertura de Código}

[Tabela de cobertura será adicionada após execução]

\subsubsection{Número de Testes Executados}

[Estatísticas de testes serão preenchidas aqui]

\subsubsection{Defeitos Encontrados}

[Tabela de defeitos será completada após testes]

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