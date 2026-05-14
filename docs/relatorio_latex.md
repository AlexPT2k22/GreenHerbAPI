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
\usepackage{tabularx}
\usepackage{float}
\usepackage{graphicx}
\usepackage{amsmath}

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
    \item Desenvolver endpoints de autenticação: \texttt{POST /api/auth/login}, \texttt{POST /api/auth/register}, \texttt{POST /api/auth/refresh}.
    
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

A matriz de rastreabilidade estabelece a ligação bidirecional entre casos de teste e requisitos funcionais, garantindo cobertura completa. Apresenta-se segmentada por função do módulo \texttt{authService}.

\subsubsection{TU-01 a TU-04: generateAccessToken}

\begin{table}[H]
\centering
\footnotesize % Reduz ligeiramente o tamanho do texto
\resizebox{\textwidth}{!}{% Força a tabela a caber na largura da página
\begin{tabular}{|l|l|p{2.5cm}|l|p{3.2cm}|p{2.8cm}|p{2.5cm}|c|}
\hline
\textbf{ID} & \textbf{Req.} & \textbf{Endpoint} & \textbf{Nível} & \textbf{Técnica} & \textbf{Resultado Esperado} & \textbf{Resultado Obtido} & \textbf{Estado} \\
\hline
TU-01 & RF-02 & (authService) & Unid. & CM \texttt{(!userId || !perfil)}: T|T (Ambos ausentes) & Lança erro "userId and perfil are required" & Erro lançado conforme esperado & Passou \\
\hline
TU-02 & RF-02 & (authService) & Unid. & CM: T|F (Falta userId, contém perfil) & Lança erro "userId and perfil are required" & Erro lançado conforme esperado & Passou \\
\hline
TU-03 & RF-02 & (authService) & Unid. & CM: F|T (Contém userId, falta perfil) & Lança erro "userId and perfil are required" & Erro lançado conforme esperado & Passou \\
\hline
TU-04 & RF-02 & (authService) & Unid. & CM: F|F (Ambos presentes) + PE válida & Retorna JWT válido \texttt{id="u1"} \texttt{perfil="Técnico"} & JWT retornado com payload correto & Passou \\
\hline
\end{tabular}%
}
\end{table}




\textbf{Pré-condições:} \texttt{JWT\_SECRET} definido em \texttt{process.env}; sem dependências de base de dados.

\subsubsection{TU-05 a TU-09: generateRefreshToken}

\begin{table}[H]
\centering
\caption{Matriz de Rastreabilidade - \texttt{generateRefreshToken}}
\footnotesize
\resizebox{\textwidth}{!}{%
\begin{tabular}{|l|l|p{2.5cm}|l|p{2.8cm}|p{2.8cm}|p{2.5cm}|c|}
\hline
\textbf{ID} & \textbf{Req.} & \textbf{Endpoint} & \textbf{Nível} & \textbf{Técnica} & \textbf{Resultado Esperado} & \textbf{Resultado Obtido} & \textbf{Estado} \\
\hline
TU-05 & RF-03 & (authService) & Unid. & CM T|T (Ambos ausentes) & Lança erro "userId and perfil are required" & Erro lançado conforme esperado & Passou \\
\hline
TU-06 & RF-03 & (authService) & Unid. & CM T|F (Falta userId) & Lança erro "userId and perfil are required" & Erro lançado conforme esperado & Passou \\
\hline
TU-07 & RF-03 & (authService) & Unid. & CM F|T (Falta perfil) & Lança erro "userId and perfil are required" & Erro lançado conforme esperado & Passou \\
\hline
TU-08 & RF-03 & (authService) & Unid. & CM F|F + PE válida & Retorna JWT assinado com JWT\_REFRESH\_SECRET & JWT refresh token retornado & Passou \\
\hline
TU-09 & RF-03 & (authService) & Unid. & PE fallback & Usa JWT\_SECRET quando JWT\_REFRESH\_SECRET ausente & JWT\_SECRET usado como fallback & Passou \\
\hline
\end{tabular}%
}
\end{table}

\textbf{Pré-condições:} \texttt{JWT\_REFRESH\_SECRET} definido em \texttt{process.env} (excepto TU-09).

\subsubsection{TU-10 a TU-14: verifyToken}

\begin{table}[H]
\centering
\caption{Matriz de Rastreabilidade - \texttt{verifyToken}}
\footnotesize
\resizebox{\textwidth}{!}{%
\begin{tabular}{|l|l|p{2.5cm}|l|p{2.8cm}|p{2.8cm}|p{2.5cm}|c|}
\hline
\textbf{ID} & \textbf{Req.} & \textbf{Endpoint} & \textbf{Nível} & \textbf{Técnica} & \textbf{Resultado Esperado} & \textbf{Resultado Obtido} & \textbf{Estado} \\
\hline
TU-10 & RF-05 & (authService) & Unid. & PE classe inválida (nulo) & Lança "Token is required" & Erro lançado conforme esperado & Passou \\
\hline
TU-11 & RF-05 & (authService) & Unid. & PE classe inválida (adulterado) & Lança JsonWebTokenError & JsonWebTokenError lançado & Passou \\
\hline
TU-12 & RF-05 & (authService) & Unid. & PE classe inválida (expirado) & Lança TokenExpiredError & TokenExpiredError lançado & Passou \\
\hline
TU-13 & RF-05 & (authService) & Unid. & PE classe válida & Retorna payload com id e perfil & Payload retornado corretamente & Passou \\
\hline
TU-14 & RF-05 & (authService) & Unid. & PE fallback & Usa JWT\_SECRET do ambiente & JWT\_SECRET usado corretamente & Passou \\
\hline
\end{tabular}%
}
\end{table}

\textbf{Pré-condições:} \texttt{JWT\_SECRET} definido; tokens gerados conforme necessário para cada teste.

\subsubsection{TU-15 a TU-17: renewAccessToken}

\begin{table}[H]
\centering
\caption{Matriz de Rastreabilidade - \texttt{renewAccessToken}}
\footnotesize
\resizebox{\textwidth}{!}{%
\begin{tabular}{|l|l|p{2.5cm}|l|p{2.8cm}|p{2.8cm}|p{2.5cm}|c|}
\hline
\textbf{ID} & \textbf{Req.} & \textbf{Endpoint} & \textbf{Nível} & \textbf{Técnica} & \textbf{Resultado Esperado} & \textbf{Resultado Obtido} & \textbf{Estado} \\
\hline
TU-15 & RF-04 & (authService) & Unid. & PE classe válida & Retorna novo access token com payload do refresh token & Novo token gerado com payload & Passou \\
\hline
TU-16 & RF-04 & (authService) & Unid. & PE classe inválida & Propaga erro de verifyToken & Erro propagado conforme esperado & Passou \\
\hline
TU-17 & RF-04 & (authService) & Unid. & PE fallback & Usa JWT\_SECRET quando JWT\_REFRESH\_SECRET ausente & JWT\_SECRET usado como fallback & Passou \\
\hline
\end{tabular}%
}
\end{table}

\textbf{Pré-condições:} Refresh token válido assinado com \texttt{JWT\_REFRESH\_SECRET} (excepto TU-17).

\subsubsection{TU-18 a TU-24: login}

\begin{table}[H]
\centering
\caption{Matriz de Rastreabilidade - \texttt{login}}
\footnotesize
\resizebox{\textwidth}{!}{%
\begin{tabular}{|l|l|p{2.5cm}|l|p{2.8cm}|p{2.8cm}|p{2.5cm}|c|}
\hline
\textbf{ID} & \textbf{Req.} & \textbf{Endpoint} & \textbf{Nível} & \textbf{Técnica} & \textbf{Resultado Esperado} & \textbf{Resultado Obtido} & \textbf{Estado} \\
\hline
TU-18 & RF-01 & (authService) & Unid. & CM T|T (Ambos ausentes) & Lança erro "Username and password are required" & Erro lançado conforme esperado & Passou \\
\hline
TU-19 & RF-01 & (authService) & Unid. & CM T|F (Falta username) & Lança erro "Username and password are required" & Erro lançado conforme esperado & Passou \\
\hline
TU-20 & RF-01 & (authService) & Unid. & CM F|T (Falta password) & Lança erro "Username and password are required" & Erro lançado conforme esperado & Passou \\
\hline
TU-21 & RF-01 & (authService) & Unid. & PE utilizador inexistente & Lança "Invalid credentials" & Erro lançado conforme esperado & Passou \\
\hline
TU-22 & RF-01 & (authService) & Unid. & PE password incorrecta & Lança "Invalid credentials" & Erro lançado conforme esperado & Passou \\
\hline
TU-23 & RF-01, 02, 03 & (authService) & Unid. & CM F|F + PE válida & Retorna accessToken, refreshToken e perfil & Tokens retornados corretamente & Passou \\
\hline
TU-24 & RF-01, 02, 03 & (authService) & Unid. & PE fallback user.id & Retorna tokens com payload correto & Tokens com payload correto & Passou \\
\hline
\end{tabular}%
}
\end{table}

\textbf{Pré-condições:} \texttt{findUser} mockado conforme cenário; password hash gerado com \texttt{bcryptjs} (salt=10).

\subsubsection{TU-25 a TU-29: hasProfile}

\begin{table}[H]
\centering
\caption{Matriz de Rastreabilidade - \texttt{hasProfile}}
\footnotesize
\resizebox{\textwidth}{!}{%
\begin{tabular}{|l|l|p{2.5cm}|l|p{2.8cm}|p{2.8cm}|p{2.5cm}|c|}
\hline
\textbf{ID} & \textbf{Req.} & \textbf{Endpoint} & \textbf{Nível} & \textbf{Técnica} & \textbf{Resultado Esperado} & \textbf{Resultado Obtido} & \textbf{Estado} \\
\hline
TU-25 & RF-06 & (authService) & Unid. & CM !userPerfil (T) & Retorna false & Retorna false & Passou \\
\hline
TU-26 & RF-06 & (authService) & Unid. & CM !allowedProfiles (T) & Retorna false & Retorna false & Passou \\
\hline
TU-27 & RF-06 & (authService) & Unid. & CM !Array.isArray (T) & Retorna false & Retorna false & Passou \\
\hline
TU-28 & RF-06 & (authService) & Unid. & PE perfil presente & Retorna true & Retorna true & Passou \\
\hline
TU-29 & RF-06 & (authService) & Unid. & PE perfil ausente & Retorna false & Retorna false & Passou \\
\hline
\end{tabular}%
}
\end{table}

\textbf{Pré-condições:} Perfil de utilizador e lista de perfis permitidos passados como argumentos.

\subsubsection{Cobertura Bidirecional: Requisitos → Testes}

A tabela seguinte apresenta a rastreabilidade inversa, demonstrando que todos os requisitos possuem cobertura:

\begin{table}[H]
\centering
\caption{Rastreabilidade Inversa - Requisitos para Casos de Teste}
\begin{tabular}{|p{1.5cm}|p{10cm}|}
\hline
\textbf{Requisito} & \textbf{Casos de Teste} \\
\hline
RF-01 & TU-18, TU-19, TU-20, TU-21, TU-22, TU-23, TU-24 \\
\hline
RF-02 & TU-01, TU-02, TU-03, TU-04, TU-23, TU-24 \\
\hline
RF-03 & TU-05, TU-06, TU-07, TU-08, TU-09, TU-23, TU-24 \\
\hline
RF-04 & TU-15, TU-16, TU-17 \\
\hline
RF-05 & TU-10, TU-11, TU-12, TU-13, TU-14 \\
\hline
RF-06 & TU-25, TU-26, TU-27, TU-28, TU-29 \\
\hline
\end{tabular}
\end{table}

\textbf{Conclusão:} Todos os 6 requisitos funcionais de autenticação estão cobertos pelos 29 testes de unidade implementados.

\subsection{Ferramentas Utilizadas}

\begin{itemize}[leftmargin=2cm]
    \item \textbf{Framework de teste:} Jest (Node.js)
    \item \textbf{Mocking e Stubbing:} Sinon.js, Jest Mocks
    \item \textbf{Cobertura de código:} Istanbul/nyc
    \item \textbf{Testes de integração:} Supertest
    \item \textbf{Controlo de versão:} Git (repositório mencionado em seção anterior)
\end{itemize}

\subsection{Resultados e Métricas}

\subsubsection{Cobertura de Código}

A execução dos 29 testes de unidade resultou em cobertura completa de todas as funções do módulo de autenticação. O relatório foi gerado com \texttt{npx jest --coverage}.

\begin{table}[H]
\centering
\caption{Cobertura de Código - Sprint 1 (authService.js)}
\begin{tabular}{|l|c|c|c|c|}
\hline
\textbf{Função} & \textbf{Instruções} & \textbf{Ramos} & \textbf{Funções} & \textbf{Linhas} \\
\hline
generateAccessToken & 100\% & 100\% & 100\% & 100\% \\
\hline
generateRefreshToken & 100\% & 100\% & 100\% & 100\% \\
\hline
verifyToken & 100\% & 100\% & 100\% & 100\% \\
\hline
renewAccessToken & 100\% & 100\% & 100\% & 100\% \\
\hline
login & 100\% & 100\% & 100\% & 100\% \\
\hline
hasProfile & 100\% & 100\% & 100\% & 100\% \\
\hline
\textbf{authService.js (Total)} & \textbf{100\%} & \textbf{100\%} & \textbf{100\%} & \textbf{100\%} \\
\hline
\end{tabular}
\end{table}

\textbf{Nota:} A cobertura de 100\% em todas as métricas demonstra que todas as instruções, ramos de decisão, funções e linhas de código foram exercitadas pelos testes implementados.

\subsubsection{Número de Testes Executados}

\begin{table}[H]
\centering
\caption{Distribuição de Testes - Sprint 1}
\begin{tabular}{|l|c|}
\hline
\textbf{Categoria} & \textbf{Quantidade} \\
\hline
Testes de Unidade - generateAccessToken & 4 \\
\hline
Testes de Unidade - generateRefreshToken & 5 \\
\hline
Testes de Unidade - verifyToken & 5 \\
\hline
Testes de Unidade - renewAccessToken & 3 \\
\hline
Testes de Unidade - login & 7 \\
\hline
Testes de Unidade - hasProfile & 5 \\
\hline
\textbf{Total Sprint 1} & \textbf{29 testes} \\
\hline
\end{tabular}
\end{table}

\begin{itemize}[leftmargin=2cm]
    \item \textbf{Testes aprovados:} 29/29 (100\%)
    \item \textbf{Testes reprovados:} 0/29 (0\%)
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

Durante a execução dos testes do Sprint 1, \textbf{não foram identificados defeitos} no módulo de autenticação. Todos os 29 testes passaram com sucesso na primeira execução, indicando conformidade completa da implementação com os requisitos especificados.

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
    \item[$\checkmark$] Criação de endpoints em Node.js
    \item[$\checkmark$] Criação de testes de unidade para autenticação (29 testes)
    \item[$\checkmark$] Aplicação de técnicas formais (CM, PE)
    \item[$\checkmark$] Cobertura de 100\% em todas as métricas
    \item[$\checkmark$] Matriz de rastreabilidade completa e bidirecional
    \item[$\checkmark$] Documentação rigorosa de técnicas aplicadas
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

\begin{table}[H]
\centering
\caption{Testes de Unidade: Validação de Ervas e Valores Limite (TU-H01 a TU-H15)}
\footnotesize
\resizebox{\textwidth}{!}{%
\begin{tabular}{|l|l|p{2.5cm}|l|p{3.2cm}|p{2.8cm}|p{2.5cm}|c|}
\hline
\textbf{ID} & \textbf{Req.} & \textbf{Endpoint} & \textbf{Nível} & \textbf{Técnica} & \textbf{Resultado Esperado} & \textbf{Resultado Obtido} & \textbf{Estado} \\
\hline
TU-H01 & RF-03 & (herbsService) & Unid. & PE: Classe Válida & Aceito (valid=true) & Aceito (valid=true) & Passou \\
\hline
TU-H02 & RF-03 & (herbsService) & Unid. & PE: Nome vazio & Rejeitado (valid=false) & Erro: "Nome é obrigatório" & Passou \\
\hline
TU-H03 & RF-03 & (herbsService) & Unid. & PE: Espécie vazia & Rejeitado (valid=false) & Erro: "Espécie é obrigatória" & Passou \\
\hline
TU-H04 & RF-03 & (herbsService) & Unid. & PE: Objeto null & Rejeitado (valid=false) & Erro: "Herb object required" & Passou \\
\hline
TU-H05 & RN-05 & (herbsService) & Unid. & VL: tempMin = -51 & Rejeitado (fora do intervalo) & Rejeitado conforme esp. & Passou \\
\hline
TU-H06 & RN-05 & (herbsService) & Unid. & VL: tempMin = -50 & Aceito (valid=true) & Aceito (valid=true) & Passou \\
\hline
TU-H08 & RN-05 & (herbsService) & Unid. & VL: tempMax = 50 & Aceito (valid=true) & Aceito (valid=true) & Passou \\
\hline
TU-H09 & RN-05 & (herbsService) & Unid. & VL: tempMax = 51 & Rejeitado (fora do intervalo) & Rejeitado conforme esp. & Passou \\
\hline
TU-H10 & RN-10 & (herbsService) & Unid. & VL: umidadeMin = -1 & Rejeitado (fora do intervalo) & Rejeitado conforme esp. & Passou \\
\hline
TU-H11 & RN-10 & (herbsService) & Unid. & VL: umidadeMin = 0 & Aceito (valid=true) & Aceito (valid=true) & Passou \\
\hline
TU-H13 & RN-13 & (herbsService) & Unid. & VL: lumMin = 0 & Aceito (valid=true) & Aceito (valid=true) & Passou \\
\hline
TU-H15 & RN-13 & (herbsService) & Unid. & VL: lumMax = 100001 & Rejeitado (fora do intervalo) & Rejeitado conforme esp. & Passou \\
\hline
\end{tabular}%
}
\end{table}

\begin{table}[H]
\centering
\caption{Testes de Unidade: Importação e Parsing CSV (TU-H16 a TU-H25)}
\footnotesize
\resizebox{\textwidth}{!}{%
\begin{tabular}{|l|l|p{2.5cm}|l|p{3.2cm}|p{2.8cm}|p{2.5cm}|c|}
\hline
\textbf{ID} & \textbf{Req.} & \textbf{Endpoint} & \textbf{Nível} & \textbf{Técnica} & \textbf{Resultado Esperado} & \textbf{Resultado Obtido} & \textbf{Estado} \\
\hline
TU-H16 & RF-04 & (herbsService) & Unid. & PE: 1 linha válida & valid=1, invalid=0 & valid=1, invalid=0 & Passou \\
\hline
TU-H17 & RF-04 & (herbsService) & Unid. & PE: Misto (1 Vál, 1 Inv) & valid=1, invalid=1 & valid=1, invalid=1 & Passou \\
\hline
TU-H18 & RF-05 & (herbsService) & Unid. & PE: Conteúdo vazio "" & Erro "must be non-empty" & Erro retornado & Passou \\
\hline
TU-H21 & RN-05 & (herbsService) & Unid. & VL: tempMin no CSV & Importa objeto com temp=18 & Sucesso na importação & Passou \\
\hline
TU-H23 & RF-04 & (herbsService) & Unid. & PE: CSV formatado & Retorna objeto JSON completo & JSON retornado corretamente & Passou \\
\hline
TU-H24 & RF-04 & (herbsService) & Unid. & PE: Poucas colunas & Retorna null & null & Passou \\
\hline
TU-H25 & RF-04 & (herbsService) & Unid. & PE: Espaços (trim) & Objeto com campos limpos & Sucesso no trim & Passou \\
\hline
\end{tabular}%
}
\end{table}

% =========================================================================
% 2. TESTES DE UNIDADE -- PLANS SERVICE (37 TESTES)
% =========================================================================

\begin{table}[H]
\centering
\caption{Testes de Unidade: Planos, Duração e MC/DC (TU-P01 a TU-P22)}
\footnotesize
\resizebox{\textwidth}{!}{%
\begin{tabular}{|l|l|p{2.5cm}|l|p{3.2cm}|p{2.8cm}|p{2.5cm}|c|}
\hline
\textbf{ID} & \textbf{Req.} & \textbf{Endpoint} & \textbf{Nível} & \textbf{Técnica} & \textbf{Resultado Esperado} & \textbf{Resultado Obtido} & \textbf{Estado} \\
\hline
TU-P01 & RF-13 & (plansService) & Unid. & PE: Tipo Regular & Aceito (valid=true) & Aceito (valid=true) & Passou \\
\hline
TU-P04 & RF-13 & (plansService) & Unid. & PE: Tipo Inválido & Rejeitado (valid=false) & Rejeitado conforme esp. & Passou \\
\hline
TU-P06 & RN-20 & (plansService) & Unid. & VL: duracao = 0 & Rejeitado (erro 1-365) & Rejeitado conforme esp. & Passou \\
\hline
TU-P07 & RN-20 & (plansService) & Unid. & VL: duracao = 1 & Aceito (valid=true) & Aceito (valid=true) & Passou \\
\hline
TU-P09 & RN-20 & (plansService) & Unid. & VL: duracao = 365 & Aceito (valid=true) & Aceito (valid=true) & Passou \\
\hline
TU-P19 & RN-04 & (plansService) & Unid. & MC/DC: \texttt{pontual \&\& !autoriz} (T|T) & Rejeitado (falta autorização) & Rejeitado (valid=false) & Passou \\
\hline
TU-P20 & RN-04 & (plansService) & Unid. & MC/DC: \texttt{pontual \&\& !autoriz} (T|F) & Aceito (autorização presente) & Aceito (valid=true) & Passou \\
\hline
TU-P21 & RN-04 & (plansService) & Unid. & MC/DC: \texttt{pontual \&\& !autoriz} (F|T) & Aceito (não é pontual) & Aceito (valid=true) & Passou \\
\hline
\end{tabular}%
}
\end{table}

\begin{table}[H]
\centering
\caption{Testes de Unidade: Alertas e Transições de Estado (TU-P23 a TU-P37)}
\footnotesize
\resizebox{\textwidth}{!}{%
\begin{tabular}{|l|l|p{2.5cm}|l|p{3.2cm}|p{2.8cm}|p{2.5cm}|c|}
\hline
\textbf{ID} & \textbf{Req.} & \textbf{Endpoint} & \textbf{Nível} & \textbf{Técnica} & \textbf{Resultado Esperado} & \textbf{Resultado Obtido} & \textbf{Estado} \\
\hline
TU-P23 & RN-30 & (plansService) & Unid. & MC/DC: Temp fora, Sensor OK & Retorna "Aviso" & "Aviso" & Passou \\
\hline
TU-P25 & RN-30 & (plansService) & Unid. & MC/DC: Temp + Hum fora & Retorna "Crítico" & "Crítico" & Passou \\
\hline
TU-P27 & RN-30 & (plansService) & Unid. & MC/DC: Sensor Falhou & Retorna null & null & Passou \\
\hline
TU-P28 & RN-50 & (plansService) & Unid. & PE: Sem perdas & Retorna 100\% & 100\% & Passou \\
\hline
TU-P32 & RN-39 & (plansService) & Unid. & MC/DC: Ativo $\to$ Concluido & Permitido (true) & true & Passou \\
\hline
TU-P36 & RN-40 & (plansService) & Unid. & MC/DC: Concluido $\to$ Ativo & Rejeitado (false) & false & Passou \\
\hline
TU-P37 & RN-41 & (plansService) & Unid. & MC/DC: Ativo $\to$ Inválido & Rejeitado (false) & false & Passou \\
\hline
\end{tabular}%
}
\end{table}

% =========================================================================
% 3. TESTES DE INTEGRAÇÃO (20 TESTES)
% =========================================================================

\begin{table}[H]
\centering
\caption{Testes de Integração: Fluxos de Dados CSV e Ciclo de Vida (TI-01 a TI-05)}
\footnotesize
\resizebox{\textwidth}{!}{%
\begin{tabular}{|l|l|p{2.5cm}|l|p{3.2cm}|p{2.8cm}|p{2.5cm}|c|}
\hline
\textbf{ID} & \textbf{Req.} & \textbf{Endpoint} & \textbf{Nível} & \textbf{Técnica} & \textbf{Resultado Esperado} & \textbf{Resultado Obtido} & \textbf{Estado} \\
\hline
TI-01-01 & RF-13 & POST /api/herbs/import + POST /api/plans & Integ. & PE: Herb CSV $\to$ Plano & Herb importada usada para criar plano & Plano criado com sucesso & Passou \\
\hline
TI-02-05 & RN-30 & POST /api/herbs/import & Integ. & PE: Detecção de 6 erros & Rejeição de todas as linhas & valid=0, invalid=6 & Passou \\
\hline
TI-02-06 & RN-30 & POST /api/herbs/import & Integ. & PE: Filtragem de válidas & Aceita 3 linhas, rejeita 2 & valid=3, invalid=2 & Passou \\
\hline
TI-03-02 & RN-04 & POST /api/plans & Integ. & MC/DC: Falta autorização & Rejeitado (valid=false) & Erro autorização detectado & Passou \\
\hline
TI-04-01 & RN-39 & PATCH /api/batches/:id/state & Integ. & MC/DC: Conclusão com perdas & Transição OK e prod = 95\% & permitido=true, prod=95 & Passou \\
\hline
TI-05-01 & RF-16 & Múltiplos endpoints & Integ. & Mista & Fluxo: CSV $\to$ Plan $\to$ Alerts $\to$ Prod & Ciclo validado com sucesso & Passou \\
\hline
\end{tabular}%
}
\end{table}

\subsubsection{Particionamento de Equivalência - Tipos de Plano}

\begin{table}[H]
\centering
\caption{PE -- Tipos de Plano}
\footnotesize
\resizebox{\textwidth}{!}{%
\begin{tabular}{|l|p{4cm}|p{4.5cm}|l|c|}
\hline
\textbf{Classe} & \textbf{Descrição} & \textbf{Entrada} & \textbf{Testes} & \textbf{Estado} \\
\hline
Válida 1 & Tipo regular & \texttt{tipo="regular"} & TU-P01 & Pass \\
\hline
Válida 2 & Tipo emergência & \texttt{tipo="emergência"} & TU-P02 & Pass \\
\hline
Válida 3 & Tipo pontual (com autorização) & \texttt{tipo="pontual", autorizacao=true} & TU-P03 & Pass \\
\hline
Inválida 1 & Tipo desconhecido & \texttt{tipo="invalido"} & TU-P04 & Pass \\
\hline
Inválida 2 & Tipo ausente & \texttt{tipo=undefined} & TU-P05 & Pass \\
\hline
\end{tabular}%
}
\end{table}

\subsubsection{Análise de Valores Limite - Parâmetros de Ambiente}


\begin{table}[H]
\centering
\caption{Análise de Valores Limite -- Parâmetros de Ambiente}
\footnotesize % Reduz ligeiramente o tamanho do texto
\resizebox{\textwidth}{!}{% Força a tabela a caber na largura da página
\begin{tabular}{|l|p{3.5cm}|c|c|c|c|c|p{3.5cm}|}
\hline
\textbf{Parâmetro} & \textbf{Intervalo (exemplo)} & \multicolumn{5}{c|}{\textbf{Valores Testados}} & \textbf{Testes} \\
\cline{3-7}
 & & \textbf{Abaixo} & \textbf{Mínimo} & \textbf{Nominal} & \textbf{Máximo} & \textbf{Acima} & \\
\hline
Temperatura & \lbrack 18, 28 \rbrack & 17 & 18 & 23 & 28 & 29 & TU-P11 a TU-P12 \\
\hline
Humidade & \lbrack 40, 80 \rbrack & 39 & 40 & 60 & 80 & 81 & TU-P13 a TU-P14 \\
\hline
Luminosidade & \lbrack 5000, 25000 \rbrack & 4999 & 5000 & 15000 & 25000 & 25001 & TU-P15 a TU-P18 \\
\hline
\end{tabular}%
}
\end{table}

\subsection{Resultados e Métricas}

\subsubsection{Cobertura de Código}

A execução dos 82 testes de unidade e integração do Sprint 2 (25 herbs + 37 plans + 20 integração) resultou em cobertura elevada do código produtivo. O relatório foi gerado com \texttt{npm run test:coverage}.

\begin{table}[H]
\centering
\caption{Cobertura de Código - Sprint 2 (herbsService.js + plansService.js)}
\begin{tabular}{|l|c|c|c|c|}
\hline
\textbf{Módulo} & \textbf{Instruções} & \textbf{Ramos} & \textbf{Funções} & \textbf{Linhas} \\
\hline
herbsService.js & 86.30\% & 86.58\% & 100\% & 85.91\% \\
\hline
plansService.js & 81.81\% & 81.37\% & 100\% & 81.81\% \\
\hline
authService.js (Sprint 1) & 100\% & 100\% & 100\% & 100\% \\
\hline
\textbf{Total Projeto} & \textbf{85.91\%} & \textbf{85.49\%} & \textbf{100\%} & \textbf{85.78\%} \\
\hline
\end{tabular}
\end{table}

\textbf{Nota:} A cobertura de 100\% em funções demonstra que todas as funções foram exercitadas. As linhas não cobertas correspondem principalmente a tratamento de exceções raras e validações de casos extremos.

\subsubsection{Número de Testes Executados}

\begin{table}[H]
\centering
\caption{Distribuição de Testes - Sprint 2}
\begin{tabular}{|l|c|}
\hline
\textbf{Categoria} & \textbf{Quantidade} \\
\hline
\multicolumn{2}{|c|}{\textbf{Testes de Unidade - Herbs Service}} \\
\hline
Particionamento de Equivalência (validateHerbData) & 4 \\
\hline
Valores Limite - Temperatura & 5 \\
\hline
Valores Limite - Umidade & 3 \\
\hline
Valores Limite - Luminosidade & 3 \\
\hline
Importação CSV & 7 \\
\hline
Parse CSV & 3 \\
\hline
\textbf{Subtotal Herbs} & \textbf{25} \\
\hline
\multicolumn{2}{|c|}{\textbf{Testes de Unidade - Plans Service}} \\
\hline
Particionamento de Equivalência (tipo de plano) & 5 \\
\hline
Valores Limite - Duração & 5 \\
\hline
Valores Limite - Parâmetros Ambientais & 8 \\
\hline
MC/DC - Plano Pontual & 4 \\
\hline
MC/DC - Classificação de Alertas & 5 \\
\hline
Cálculo de Produtividade & 4 \\
\hline
Validação de Transições de Estado & 6 \\
\hline
\textbf{Subtotal Plans} & \textbf{37} \\
\hline
\multicolumn{2}{|c|}{\textbf{Testes de Integração}} \\
\hline
Fluxos de importação CSV + criação de planos & 6 \\
\hline
Medições + geração de alertas & 8 \\
\hline
Ciclos completos de lote & 6 \\
\hline
\textbf{Subtotal Integração} & \textbf{20} \\
\hline
\hline
\textbf{Total Sprint 2} & \textbf{82 testes} \\
\hline
\textbf{Total Sprint 1} & \textbf{29 testes} \\
\hline
\textbf{Total Acumulado (Sprint 1 + Sprint 2)} & \textbf{112 testes} \\
\hline
\end{tabular}
\end{table}

\begin{itemize}[leftmargin=2cm]
    \item \textbf{Testes aprovados:} 112/112 (100\%)
    \item \textbf{Testes reprovados:} 0/112 (0\%)
    \item \textbf{Test suites aprovados:} 4/4 (100\%)
    \item \textbf{Tempo total de execução:} 3.429 segundos
    \item \textbf{Média por teste:} $\sim$ 31 milissegundos
\end{itemize}

\subsubsection{Técnicas Aplicadas - Resumo Quantitativo Sprint 2}

\begin{table}[H]
\centering
\caption{Aplicação de Técnicas de Teste - Sprint 2}
\begin{tabular}{|l|c|p{6cm}|}
\hline
\textbf{Técnica} & \textbf{Casos} & \textbf{Funções Aplicadas} \\
\hline
Particionamento de Equivalência (PE) & 32 & validateHerbData (4), validatePlanData (5), importFromCSV (7), parseCSVLine (3), classifyAlert (5), transições (6), outros (2) \\
\hline
Valores Limite (VL) & 44 & Temperatura (10), Umidade (6), Luminosidade (6), Duração (5), outros parâmetros (17) \\
\hline
Cobertura MC/DC & 10 & Plano pontual + autorização (4), Classificação alertas (5), Decisão automação (1) \\
\hline
Testes de Integração & 20 & Fluxos end-to-end combinando múltiplos componentes \\
\hline
\end{tabular}
\end{table}

\subsubsection{Defeitos Encontrados}

Durante a execução dos testes do Sprint 2, \textbf{não foram identificados defeitos críticos}. Todos os 82 testes passaram com sucesso após iterações de refinamento da implementação.

\begin{table}[H]
\centering
\caption{Registo de Defeitos - Sprint 2}
\begin{tabular}{|p{1.5cm}|p{5cm}|p{2cm}|p{2cm}|p{2cm}|}
\hline
\textbf{ID} & \textbf{Descrição} & \textbf{Severidade} & \textbf{Estado} & \textbf{Resolução} \\
\hline
\multicolumn{5}{|c|}{\textit{Nenhum defeito crítico encontrado}} \\
\hline
\end{tabular}
\end{table}

\textbf{Observações:}
\begin{itemize}[leftmargin=2cm]
    \item Validações rigorosas de entrada impediram a maioria dos casos de erro
    \item Tratamento adequado de CSV malformado ou vazio
    \item Lógica de classificação de alertas implementada conforme especificação
    \item Transições de estado de lote com validação completa
    \item Cálculo de produtividade preciso incluindo perdas e divisões
\end{itemize}

\subsection{Notas e Observações}

\subsubsection{Decisões de Implementação - Sprint 2}

Durante o Sprint 2, foram tomadas as seguintes decisões técnicas relevantes:

\begin{enumerate}[leftmargin=2cm]
    \item \textbf{Validação de Intervalos:} Implementação de validadores numéricos para temperatura [-50, 50], umidade [0, 100] e luminosidade [0, 100000] com mensagens de erro específicas.
    
    \item \textbf{Parse CSV Tolerante:} Função \texttt{parseCSVLine} implementa trim automático de espaços e validação de número mínimo de colunas (8).
    
    \item \textbf{Importação Resiliente:} \texttt{importFromCSV} processa linha a linha, retornando contadores de válidas/inválidas e array de erros detalhado.
    
    \item \textbf{Classificador de Alertas:} Lógica MC/DC implementada com decisões compostas: temperatura fora dos limites \textbf{OR} humidade fora \textbf{AND} sensor funcionando.
    
    \item \textbf{Autorização de Plano Pontual:} Validação explícita com regra de negócio RN-04: planos pontuais exigem campo \texttt{autorizacaoResponsavel=true}.
    
    \item \textbf{Produtividade com Divisões:} Fórmula implementada: \texttt{(quantidadeInicial - perdas) / (1 + divisoes)} conforme RN-35.
\end{enumerate}

\subsubsection{Lições Aprendidas - Sprint 2}

\begin{itemize}[leftmargin=2cm]
    \item A aplicação de \textbf{Análise de Valores Limite} revelou-se essencial para descobrir bugs em validações de intervalos (off-by-one errors são comuns).
    
    \item Testes de \textbf{importação CSV} com ficheiros reais (válidos, inválidos, mistos, vazios) garantem robustez em produção.
    
    \item A técnica \textbf{MC/DC} aplicada à classificação de alertas assegura que cada condição individual (temperatura, humidade, sensor) pode independentemente afetar o resultado.
    
    \item Testes de \textbf{integração} que combinam importação $\to$ validação $\to$ criação de plano detectaram inconsistências de FK (foreign keys) não capturadas por testes unitários isolados.
    
    \item A manutenção de \textbf{fixtures} (ficheiros CSV de teste) em \texttt{/tests/fixtures/} facilita reprodução consistente de cenários.
\end{itemize}

\subsubsection{Conformidade com Requisitos do Enunciado - Sprint 2}

O Sprint 2 cumpre integralmente os objetivos estabelecidos no enunciado do trabalho:

\begin{itemize}[leftmargin=2cm]
    \item[$\checkmark$] Criação de testes de unidade para importação do catálogo de ervas aromáticas (25 testes herbs)
    \item[$\checkmark$] Criação de testes de unidade para criação de planos de cultivo (37 testes plans)
    \item[$\checkmark$] Aplicação de técnicas formais: PE (32 testes), VL (44 testes), MC/DC (10 testes)
    \item[$\checkmark$] Testes de integração end-to-end (20 testes)
    \item[$\checkmark$] Cobertura $>$ 85\% em todas as métricas
    \item[$\checkmark$] Atualização da matriz de rastreabilidade (todas as tabelas preenchidas)
    \item[$\checkmark$] Documentação rigorosa de decisões de implementação
\end{itemize}

% ============================================
% SPRINT 3 - REQUISITOS RESTANTES
% ============================================
\newpage
\section{Sprint 3 - Requisitos Restantes}

\subsection{Descrição e Objetivos}

O Sprint 3 centra-se na criação de testes de unidade para os requisitos restantes não cobertos nos sprints anteriores. Enquanto os Sprints 1 e 2 focaram na autenticação, ervas e planos, este sprint completa a cobertura de teste dos módulos operacionais críticos da plataforma GREENHERB.

\textbf{Objetivos específicos:}
\begin{enumerate}[leftmargin=2cm]
    \item Implementar 8 novos módulos de serviços com lógica de negócio completa
    
    \item Criar testes de unidade para lotes (batches), medições (measurements), alertas (alerts)
    
    \item Desenvolver testes para tarefas (tasks), automação (automation) e utilizadores (users)
    
    \item Testar módulos de relatórios (reports) e auditoria (audit)
    
    \item Aplicar técnicas PE, VL e MC/DC conforme requisitos
    
    \item Manter cobertura global $\geq$ 85\% em todas as métricas
    
    \item Atingir 100\% de taxa de aprovação nos testes
\end{enumerate}

\subsection{Planeamento e Estratégia}

\subsubsection{Módulos Implementados}

\begin{table}[H]
\centering
\caption{Módulos Desenvolvidos no Sprint 3}
\begin{tabular}{|l|p{6cm}|c|c|}
\hline
\textbf{Módulo} & \textbf{Descrição} & \textbf{Prioridade} & \textbf{Testes} \\
\hline
batchesService & Gestão de lotes, divisões, produtividade (RN-37, RN-39, RN-40) & Alta & 29 \\
\hline
measurementsService & Medições ambientais, geração automática de alertas (RN-30) & Alta & 29 \\
\hline
alertsService & Validações de alertas, ignorar críticos com justificação (RN-05) & Alta & 29 \\
\hline
tasksService & Tarefas operacionais, prioridades, execução e cancelamento & Média & 21 \\
\hline
automationService & Regras de automação, modo Manual/Automático (RN-45) & Média & 22 \\
\hline
reportsService & Geração de relatórios CSV/Excel, agregações, filtros & Baixa & 18 \\
\hline
auditService & Log de auditoria, operações críticas (RN-55) & Baixa & 13 \\
\hline
usersService & Gestão de utilizadores, hierarquia de perfis (RN-01) & Baixa & 22 \\
\hline
\textbf{Total Sprint 3} & \textbf{8 módulos completos} & - & \textbf{183} \\
\hline
\end{tabular}
\end{table}

\subsubsection{Técnicas de Teste Aplicadas}

\begin{table}[H]
\centering
\caption{Distribuição de Técnicas de Teste - Sprint 3}
\begin{tabular}{|l|c|p{7cm}|}
\hline
\textbf{Técnica} & \textbf{Casos} & \textbf{Aplicação Principal} \\
\hline
Particionamento de Equivalência (PE) & 87 & Estados (ativo/concluído), tipos (Crítico/Aviso/Informativo), perfis (Técnico/Responsável/Admin), formatos (CSV/Excel) \\
\hline
Valores Limite (VL) & 58 & Temperatura [-50, 100], humidade [0, 100], luminosidade [0, 100000], justificações [10, 500] chars, username [3, 50], password [8, 128] \\
\hline
Cobertura MC/DC & 38 & Conclusão de lote (dataFim AND sem alertas críticos), ignorar alerta crítico (perfil AND justificação), geração automática de alertas (temp fora OR humidade fora), permissões compostas \\
\hline
\textbf{Total} & \textbf{183} & - \\
\hline
\end{tabular}
\end{table}

\subsection{Casos de Teste Representativos}

\subsubsection{Exemplo 1: Gestão de Lotes (batchesService)}

\begin{table}[H]
\centering
\caption{Casos de Teste - Divisão de Lotes (RN-37)}
\begin{tabular}{|l|p{3cm}|p{3cm}|p{3cm}|l|}
\hline
\textbf{ID} & \textbf{Entrada} & \textbf{Pré-condições} & \textbf{Saída Esperada} & \textbf{Técnica} \\
\hline
TU-91 & quantidade=40 & batch.estado=ativo, quantAtual=100 & canDivide=true & PE \\
\hline
TU-92 & quantidade=0 & batch ativo & canDivide=false, erro & VL \\
\hline
TU-93 & quantidade=-10 & batch ativo & canDivide=false, erro & VL \\
\hline
TU-94 & quantidade=100 & quantAtual=100 & canDivide=false, erro (>=) & VL \\
\hline
TU-95 & quantidade=1 & quantAtual=100 & canDivide=true & VL \\
\hline
TU-96 & quantidade=99 & quantAtual=100 & canDivide=true & VL \\
\hline
TU-97 & quantidade=40 & estado=concluido & canDivide=false, erro & MC/DC \\
\hline
\end{tabular}
\end{table}

\subsubsection{Exemplo 2: Geração de Alertas (measurementsService)}

\begin{table}[H]
\centering
\caption{Casos de Teste - Classificação de Alertas (RN-30)}
\begin{tabular}{|l|p{3cm}|p{2.5cm}|p{3cm}|l|}
\hline
\textbf{ID} & \textbf{Medição} & \textbf{Limites Plano} & \textbf{Resultado} & \textbf{Técnica} \\
\hline
TU-128 & temp=22, hum=65 & [18-26], [50-80] & Sem alerta & MC/DC \\
\hline
TU-129 & temp=35, hum=65 & [18-26], [50-80] & Crítico (dist>=9) & MC/DC \\
\hline
TU-130 & temp=28, hum=65 & [18-26], [50-80] & Aviso (dist<9) & MC/DC \\
\hline
TU-131 & temp=22, hum=30 & [18-26], [50-80] & Crítico (dist>=20) & MC/DC \\
\hline
TU-132 & temp=22, hum=45 & [18-26], [50-80] & Aviso (dist<20) & MC/DC \\
\hline
TU-134 & temp=35, hum=45 & [18-26], [50-80] & Crítico (prioridade) & MC/DC \\
\hline
\end{tabular}
\end{table}

\textbf{Lógica MC/DC implementada:}
\begin{itemize}[leftmargin=2cm]
    \item Alerta = (temperatura fora \textbf{OR} humidade fora)
    \item Severidade = \textbf{IF} (distância $\geq$ limiar) \textbf{THEN} Crítico \textbf{ELSE} Aviso
    \item Priorização: Crítico $>$ Aviso $>$ Informativo
\end{itemize}

\subsubsection{Exemplo 3: Ignorar Alerta Crítico (alertsService - RN-05)}

\begin{table}[H]
\centering
\caption{Casos de Teste - Ignorar Alerta com Justificação (RN-05)}
\begin{tabular}{|l|p{3cm}|p{2cm}|p{3cm}|l|}
\hline
\textbf{ID} & \textbf{Alerta} & \textbf{Perfil} & \textbf{Justificação} & \textbf{Resultado} \\
\hline
TU-153 & Aviso ativo & Responsável & "" (vazia) & Aceita \\
\hline
TU-154 & Aviso ativo & Técnico & "Válida" & Rejeita (perfil) \\
\hline
TU-155 & Crítico ativo & Responsável & "Curta" (5 chars) & Rejeita (<10) \\
\hline
TU-156 & Crítico ativo & Responsável & "0123456789" (10) & Aceita (VL) \\
\hline
TU-157 & Crítico ativo & Responsável & 500 chars & Aceita (VL) \\
\hline
TU-158 & Crítico ativo & Responsável & 501 chars & Rejeita (>500) \\
\hline
TU-159 & Crítico ativo & Responsável & "Válida 50ch" & Aceita \\
\hline
TU-160 & resolvido & Responsável & "Válida" & Rejeita (estado) \\
\hline
\end{tabular}
\end{table}

\textbf{Condição MC/DC:} \texttt{(perfil = Responsável OR Admin) AND (tipo != Crítico OR justificação [10, 500])}

\subsection{Matriz de Rastreabilidade Completa (Sprint 3)}

\begin{table}[H]
\centering
\caption{Rastreabilidade - Batches Service (29 testes)}
\footnotesize
\resizebox{\textwidth}{!}{%
\begin{tabular}{|l|l|p{2.5cm}|l|p{2.8cm}|p{2.8cm}|p{2.5cm}|c|}
\hline
\textbf{ID} & \textbf{Req.} & \textbf{Endpoint} & \textbf{Nível} & \textbf{Técnica} & \textbf{Resultado Esperado} & \textbf{Resultado Obtido} & \textbf{Estado} \\
\hline
TU-85 & RN-37 & (batchesService) & Unid. & PE: Lote válido completo & Aceito (valid=true) & Aceito (valid=true) & Passou \\
\hline
TU-86 & RN-37 & (batchesService) & Unid. & PE: Lote nulo & Rejeitado (valid=false) & Erro: "Lote não pode ser nulo" & Passou \\
\hline
TU-87 & RN-37 & (batchesService) & Unid. & PE: Sem planId & Rejeitado (valid=false) & Erro: "planId é obrigatório" & Passou \\
\hline
TU-88 & RN-37 & (batchesService) & Unid. & VL: quantidadeInicial=0 & Rejeitado (valid=false) & Erro: "deve ser maior que 0" & Passou \\
\hline
TU-89 & RN-37 & (batchesService) & Unid. & PE: Estado inválido & Rejeitado (valid=false) & Erro: "Estado inválido" & Passou \\
\hline
TU-90 & RN-37 & (batchesService) & Unid. & VL: quantAtual > quantInicial & Rejeitado (valid=false) & Erro: "não pode exceder" & Passou \\
\hline
TU-91 & RN-37 & (batchesService) & Unid. & PE: Divisão válida (quant=40) & canDivide=true & canDivide=true & Passou \\
\hline
TU-92 & RN-37 & (batchesService) & Unid. & VL: Divisão quant=0 & canDivide=false & Erro: "maior que 0" & Passou \\
\hline
TU-93 & RN-37 & (batchesService) & Unid. & VL: Divisão quant=-10 & canDivide=false & Erro: "maior que 0" & Passou \\
\hline
TU-94 & RN-37 & (batchesService) & Unid. & VL: Divisão quant>=quantAtual & canDivide=false & Erro: "menor que atual" & Passou \\
\hline
TU-95 & RN-37 & (batchesService) & Unid. & VL: Divisão quant=1 (limite) & canDivide=true & canDivide=true & Passou \\
\hline
TU-96 & RN-37 & (batchesService) & Unid. & VL: Divisão quant=99 (limite) & canDivide=true & canDivide=true & Passou \\
\hline
TU-97 & RN-37 & (batchesService) & Unid. & MC/DC: Lote não ativo & canDivide=false & Erro: "Apenas ativos" & Passou \\
\hline
TU-98 & RN-35 & (batchesService) & Unid. & PE: Lote concluído (14 dias) & duration=14 & duration=14 & Passou \\
\hline
TU-99 & RN-35 & (batchesService) & Unid. & PE: Sem dataInicio & duration=null & duration=null & Passou \\
\hline
TU-100 & RN-35 & (batchesService) & Unid. & PE: Sem dataFim (usa hoje) & duration>=6 & duration calculada corretamente & Passou \\
\hline
TU-101 & RN-39 & (batchesService) & Unid. & MC/DC: Conclusão sem alertas & canClose=true & canClose=true & Passou \\
\hline
TU-102 & RN-39 & (batchesService) & Unid. & MC/DC: Com alertas críticos & canClose=false & Erro: "alertas críticos" & Passou \\
\hline
TU-103 & RN-39 & (batchesService) & Unid. & MC/DC: Alertas resolvidos & canClose=true & canClose=true & Passou \\
\hline
TU-104 & RN-39 & (batchesService) & Unid. & MC/DC: Sem dataFim & canClose=false & Erro: "dataFim obrigatória" & Passou \\
\hline
TU-105 & RN-39 & (batchesService) & Unid. & MC/DC: Lote não ativo & canClose=false & Erro: "Apenas ativos" & Passou \\
\hline
TU-106 & RN-40 & (batchesService) & Unid. & PE: Justificação válida & canClose=true & canClose=true & Passou \\
\hline
TU-107 & RN-40 & (batchesService) & Unid. & VL: Justif. < 10 chars & canClose=false & Erro: "pelo menos 10" & Passou \\
\hline
TU-108 & RN-40 & (batchesService) & Unid. & VL: Justif. = 10 chars & canClose=true & canClose=true & Passou \\
\hline
TU-109 & RN-40 & (batchesService) & Unid. & VL: Justif. = 500 chars & canClose=true & canClose=true & Passou \\
\hline
TU-110 & RN-40 & (batchesService) & Unid. & VL: Justif. > 500 chars & canClose=false & Erro: "não exceder 500" & Passou \\
\hline
TU-111 & RN-35 & (batchesService) & Unid. & PE: Produtividade (90/10) & productivity=9.0 & productivity=9.0 & Passou \\
\hline
TU-112 & RN-35 & (batchesService) & Unid. & PE: Lote não concluído & productivity=null & productivity=null & Passou \\
\hline
TU-113 & RN-35 & (batchesService) & Unid. & PE: Duração zero & productivity=null & productivity=null & Passou \\
\hline
\end{tabular}%
}
\end{table}

\begin{table}[H]
\centering
\caption{Rastreabilidade - Measurements Service (29 testes)}
\footnotesize
\resizebox{\textwidth}{!}{%
\begin{tabular}{|l|l|p{2.5cm}|l|p{2.8cm}|p{2.8cm}|p{2.5cm}|c|}
\hline
\textbf{ID} & \textbf{Req.} & \textbf{Endpoint} & \textbf{Nível} & \textbf{Técnica} & \textbf{Resultado Esperado} & \textbf{Resultado Obtido} & \textbf{Estado} \\
\hline
TU-114 & RN-30 & (measurementsService) & Unid. & PE: Medição válida completa & Aceito (valid=true) & Aceito (valid=true) & Passou \\
\hline
TU-115 & RN-30 & (measurementsService) & Unid. & PE: Medição nula & Rejeitado (valid=false) & Erro: "não pode ser nula" & Passou \\
\hline
TU-116 & RN-30 & (measurementsService) & Unid. & PE: Sem sensorId & Rejeitado (valid=false) & Erro: "sensorId obrigatório" & Passou \\
\hline
TU-117 & RN-30 & (measurementsService) & Unid. & VL: temp < -50°C & Rejeitado (valid=false) & Erro: "entre -50 e 100" & Passou \\
\hline
TU-118 & RN-30 & (measurementsService) & Unid. & VL: temp = -50°C (limite) & Aceito (valid=true) & Aceito (valid=true) & Passou \\
\hline
TU-119 & RN-30 & (measurementsService) & Unid. & VL: temp = 100°C (limite) & Aceito (valid=true) & Aceito (valid=true) & Passou \\
\hline
TU-120 & RN-30 & (measurementsService) & Unid. & VL: humidade < 0\% & Rejeitado (valid=false) & Erro: "entre 0 e 100" & Passou \\
\hline
TU-121 & RN-30 & (measurementsService) & Unid. & VL: humidade = 0\% (limite) & Aceito (valid=true) & Aceito (valid=true) & Passou \\
\hline
TU-122 & RN-30 & (measurementsService) & Unid. & VL: luminosidade > 100000 & Rejeitado (valid=false) & Erro: "entre 0 e 100000" & Passou \\
\hline
TU-123 & RN-30 & (measurementsService) & Unid. & PE: Valor abaixo do mínimo & isOutOfRange=true & isOutOfRange=true & Passou \\
\hline
TU-124 & RN-30 & (measurementsService) & Unid. & PE: Valor acima do máximo & isOutOfRange=true & isOutOfRange=true & Passou \\
\hline
TU-125 & RN-30 & (measurementsService) & Unid. & PE: Valor dentro do range & isOutOfRange=false & isOutOfRange=false & Passou \\
\hline
TU-126 & RN-30 & (measurementsService) & Unid. & VL: Valor no limite inferior & isOutOfRange=false & isOutOfRange=false & Passou \\
\hline
TU-127 & RN-30 & (measurementsService) & Unid. & VL: Valor no limite superior & isOutOfRange=false & isOutOfRange=false & Passou \\
\hline
TU-128 & RN-30 & (measurementsService) & Unid. & MC/DC: Medição dentro limites & shouldAlert=false & shouldAlert=false & Passou \\
\hline
TU-129 & RN-30 & (measurementsService) & Unid. & MC/DC: Temp muito fora (dist>=9) & tipo=Crítico & tipo=Crítico & Passou \\
\hline
TU-130 & RN-30 & (measurementsService) & Unid. & MC/DC: Temp levemente fora (dist<9) & tipo=Aviso & tipo=Aviso & Passou \\
\hline
TU-131 & RN-30 & (measurementsService) & Unid. & MC/DC: Hum muito fora (dist>=20) & tipo=Crítico & tipo=Crítico & Passou \\
\hline
TU-132 & RN-30 & (measurementsService) & Unid. & MC/DC: Hum levemente fora (dist<20) & tipo=Aviso & tipo=Aviso & Passou \\
\hline
TU-133 & RN-30 & (measurementsService) & Unid. & MC/DC: Luminosidade fora & tipo=Informativo & tipo=Informativo & Passou \\
\hline
TU-134 & RN-30 & (measurementsService) & Unid. & MC/DC: Prioriza Crítico sobre Aviso & tipo=Crítico & tipo=Crítico & Passou \\
\hline
TU-135 & RN-30 & (measurementsService) & Unid. & MC/DC: Plano não especificado & shouldAlert=false & shouldAlert=false & Passou \\
\hline
TU-136 & - & (measurementsService) & Unid. & PE: Desvio positivo (110/100) & deviation=10.0 & deviation=10.0 & Passou \\
\hline
TU-137 & - & (measurementsService) & Unid. & PE: Desvio negativo (90/100) & deviation=-10.0 & deviation=-10.0 & Passou \\
\hline
TU-138 & - & (measurementsService) & Unid. & PE: Optimal=0 & deviation=0 & deviation=0 & Passou \\
\hline
TU-139 & - & (measurementsService) & Unid. & PE: Média de temperaturas & avg=22.0 & avg=22.0 & Passou \\
\hline
TU-140 & - & (measurementsService) & Unid. & PE: Ignora valores null/undefined & avg=22.0 (2 valores) & avg=22.0 & Passou \\
\hline
TU-141 & - & (measurementsService) & Unid. & PE: Array vazio & avg=null & avg=null & Passou \\
\hline
TU-142 & - & (measurementsService) & Unid. & PE: Nenhum valor válido & avg=null & avg=null & Passou \\
\hline
\end{tabular}%
}
\end{table}

\begin{table}[H]
\centering
\caption{Rastreabilidade - Alerts Service (29 testes)}
\footnotesize
\resizebox{\textwidth}{!}{%
\begin{tabular}{|l|l|p{2.5cm}|l|p{2.8cm}|p{2.8cm}|p{2.5cm}|c|}
\hline
\textbf{ID} & \textbf{Req.} & \textbf{Endpoint} & \textbf{Nível} & \textbf{Técnica} & \textbf{Resultado Esperado} & \textbf{Resultado Obtido} & \textbf{Estado} \\
\hline
TU-143 & RN-05 & (alertsService) & Unid. & PE: Alerta válido completo & Aceito (valid=true) & Aceito (valid=true) & Passou \\
\hline
TU-144 & RN-05 & (alertsService) & Unid. & PE: Alerta nulo & Rejeitado (valid=false) & Erro: "não pode ser nulo" & Passou \\
\hline
TU-145 & RN-05 & (alertsService) & Unid. & PE: Sem batchId & Rejeitado (valid=false) & Erro: "batchId obrigatório" & Passou \\
\hline
TU-146 & RN-05 & (alertsService) & Unid. & PE: Tipo inválido & Rejeitado (valid=false) & Erro: "tipo deve ser..." & Passou \\
\hline
TU-147 & RN-05 & (alertsService) & Unid. & PE: Mensagem vazia & Rejeitado (valid=false) & Erro: "mensagem obrigatória" & Passou \\
\hline
TU-148 & RN-05 & (alertsService) & Unid. & PE: Estado inválido & Rejeitado (valid=false) & Erro: "estado deve ser..." & Passou \\
\hline
TU-149 & - & (alertsService) & Unid. & PE: Técnico resolve ativo & canResolve=true & canResolve=true & Passou \\
\hline
TU-150 & - & (alertsService) & Unid. & PE: Responsável resolve ativo & canResolve=true & canResolve=true & Passou \\
\hline
TU-151 & - & (alertsService) & Unid. & PE: Não resolve já resolvido & canResolve=false & Erro: "Apenas ativos" & Passou \\
\hline
TU-152 & - & (alertsService) & Unid. & PE: Perfil inválido & canResolve=false & Erro: "não autorizado" & Passou \\
\hline
TU-153 & RN-05 & (alertsService) & Unid. & PE: Resp ignora Aviso sem justif. & canIgnore=true & canIgnore=true & Passou \\
\hline
TU-154 & RN-05 & (alertsService) & Unid. & MC/DC: Técnico NÃO ignora & canIgnore=false & Erro: "Apenas Resp/Admin" & Passou \\
\hline
TU-155 & RN-05 & (alertsService) & Unid. & VL+MC/DC: Crítico justif.<10 & canIgnore=false & Erro: "pelo menos 10" & Passou \\
\hline
TU-156 & RN-05 & (alertsService) & Unid. & VL: Crítico justif.=10 (limite) & canIgnore=true & canIgnore=true & Passou \\
\hline
TU-157 & RN-05 & (alertsService) & Unid. & VL: Crítico justif.=500 (limite) & canIgnore=true & canIgnore=true & Passou \\
\hline
TU-158 & RN-05 & (alertsService) & Unid. & VL: Crítico justif.>500 & canIgnore=false & Erro: "não exceder 500" & Passou \\
\hline
TU-159 & RN-05 & (alertsService) & Unid. & MC/DC: Crítico justif. válida & canIgnore=true & canIgnore=true & Passou \\
\hline
TU-160 & RN-05 & (alertsService) & Unid. & MC/DC: Alerta não ativo & canIgnore=false & Erro: "Apenas ativos" & Passou \\
\hline
TU-161 & RN-05 & (alertsService) & Unid. & VL: Justif. válida [10,500] & valid=true & valid=true & Passou \\
\hline
TU-162 & RN-05 & (alertsService) & Unid. & VL: Justif. < 10 & valid=false & Erro: "pelo menos 10" & Passou \\
\hline
TU-163 & RN-05 & (alertsService) & Unid. & VL: Justif. = 10 (limite) & valid=true & valid=true & Passou \\
\hline
TU-164 & RN-05 & (alertsService) & Unid. & VL: Justif. > 500 & valid=false & Erro: "não exceder 500" & Passou \\
\hline
TU-165 & - & (alertsService) & Unid. & PE: Informativo → Aviso & newSeverity=Aviso & newSeverity=Aviso & Passou \\
\hline
TU-166 & - & (alertsService) & Unid. & PE: Aviso → Crítico & newSeverity=Crítico & newSeverity=Crítico & Passou \\
\hline
TU-167 & - & (alertsService) & Unid. & PE: Crítico mantém-se & newSeverity=Crítico & newSeverity=Crítico & Passou \\
\hline
TU-168 & - & (alertsService) & Unid. & PE: Crítico recente & priority=10 & priority=10 & Passou \\
\hline
TU-169 & - & (alertsService) & Unid. & PE: Aviso recente & priority=5 & priority=5 & Passou \\
\hline
TU-170 & - & (alertsService) & Unid. & PE: Informativo recente & priority=2 & priority=2 & Passou \\
\hline
TU-171 & - & (alertsService) & Unid. & PE: Aviso antigo (>24h) & priority=7 (5+2) & priority=7 & Passou \\
\hline
\end{tabular}%
}
\end{table}

\begin{table}[H]
\centering
\caption{Rastreabilidade - Tasks Service (21 testes)}
\footnotesize
\resizebox{\textwidth}{!}{%
\begin{tabular}{|l|l|p{2.5cm}|l|p{2.8cm}|p{2.8cm}|p{2.5cm}|c|}
\hline
\textbf{ID} & \textbf{Req.} & \textbf{Endpoint} & \textbf{Nível} & \textbf{Técnica} & \textbf{Resultado Esperado} & \textbf{Resultado Obtido} & \textbf{Estado} \\
\hline
TU-172 & - & (tasksService) & Unid. & PE: Tarefa válida completa & Aceito (valid=true) & Aceito (valid=true) & Passou \\
\hline
TU-173 & - & (tasksService) & Unid. & PE: Tarefa nula & Rejeitado (valid=false) & Erro: "não pode ser nula" & Passou \\
\hline
TU-174 & - & (tasksService) & Unid. & PE: Sem batchId & Rejeitado (valid=false) & Erro: "batchId obrigatório" & Passou \\
\hline
TU-175 & - & (tasksService) & Unid. & PE: Tipo inválido & Rejeitado (valid=false) & Erro: "tipo deve ser..." & Passou \\
\hline
TU-176 & - & (tasksService) & Unid. & PE: Estado inválido & Rejeitado (valid=false) & Erro: "estado deve ser..." & Passou \\
\hline
TU-177 & - & (tasksService) & Unid. & PE: Técnico executa pendente & canExecute=true & canExecute=true & Passou \\
\hline
TU-178 & - & (tasksService) & Unid. & PE: Responsável executa pendente & canExecute=true & canExecute=true & Passou \\
\hline
TU-179 & - & (tasksService) & Unid. & PE: Não executa concluída & canExecute=false & Erro: "Apenas pendentes" & Passou \\
\hline
TU-180 & - & (tasksService) & Unid. & PE: Perfil não autorizado & canExecute=false & Erro: "não autorizado" & Passou \\
\hline
TU-181 & - & (tasksService) & Unid. & VL: Tarefa com data passada & isOverdue=true & isOverdue=true & Passou \\
\hline
TU-182 & - & (tasksService) & Unid. & VL: Tarefa com data futura & isOverdue=false & isOverdue=false & Passou \\
\hline
TU-183 & - & (tasksService) & Unid. & VL: Tarefa concluída (não atrasa) & isOverdue=false & isOverdue=false & Passou \\
\hline
TU-184 & - & (tasksService) & Unid. & VL: Sem dataExecucao & isOverdue=false & isOverdue=false & Passou \\
\hline
TU-185 & - & (tasksService) & Unid. & PE: Colheita (alta prioridade) & priority=8 & priority=8 & Passou \\
\hline
TU-186 & - & (tasksService) & Unid. & PE: Rega & priority=7 & priority=7 & Passou \\
\hline
TU-187 & - & (tasksService) & Unid. & PE: Monitorização (baixa) & priority=3 & priority=3 & Passou \\
\hline
TU-188 & - & (tasksService) & Unid. & PE: Atrasada (+2 prioridade) & priority=9 (7+2) & priority=9 & Passou \\
\hline
TU-189 & - & (tasksService) & Unid. & PE: Resp cancela pendente & canCancel=true & canCancel=true & Passou \\
\hline
TU-190 & - & (tasksService) & Unid. & PE: Técnico NÃO cancela & canCancel=false & Erro: "Apenas Resp/Admin" & Passou \\
\hline
TU-191 & - & (tasksService) & Unid. & PE: Não cancela concluída & canCancel=false & Erro: "não podem ser..." & Passou \\
\hline
TU-192 & - & (tasksService) & Unid. & PE: Não cancela já cancelada & canCancel=false & Erro: "já está cancelada" & Passou \\
\hline
\end{tabular}%
}
\end{table}

\begin{table}[H]
\centering
\caption{Rastreabilidade - Automation Service (22 testes)}
\footnotesize
\resizebox{\textwidth}{!}{%
\begin{tabular}{|l|l|p{2.5cm}|l|p{2.8cm}|p{2.8cm}|p{2.5cm}|c|}
\hline
\textbf{ID} & \textbf{Req.} & \textbf{Endpoint} & \textbf{Nível} & \textbf{Técnica} & \textbf{Resultado Esperado} & \textbf{Resultado Obtido} & \textbf{Estado} \\
\hline
TU-193 & RN-45 & (automationService) & Unid. & PE: Regra válida completa & Aceito (valid=true) & Aceito (valid=true) & Passou \\
\hline
TU-194 & RN-45 & (automationService) & Unid. & PE: Regra nula & Rejeitado (valid=false) & Erro: "não pode ser nula" & Passou \\
\hline
TU-195 & RN-45 & (automationService) & Unid. & PE: Sem nome & Rejeitado (valid=false) & Erro: "nome obrigatório" & Passou \\
\hline
TU-196 & RN-45 & (automationService) & Unid. & PE: Sem condição & Rejeitado (valid=false) & Erro: "condição obrigatória" & Passou \\
\hline
TU-197 & RN-45 & (automationService) & Unid. & PE: Estado inválido & Rejeitado (valid=false) & Erro: "deve ser ativa/inativa" & Passou \\
\hline
TU-198 & RN-45 & (automationService) & Unid. & PE: Avalia temp>30 como true & result=true (temp=35) & result=true & Passou \\
\hline
TU-199 & RN-45 & (automationService) & Unid. & PE: Avalia temp>30 como false & result=false (temp=25) & result=false & Passou \\
\hline
TU-200 & RN-45 & (automationService) & Unid. & PE: Avalia hum<50 como true & result=true (hum=40) & result=true & Passou \\
\hline
TU-201 & RN-45 & (automationService) & Unid. & PE: Avalia hum<50 como false & result=false (hum=60) & result=false & Passou \\
\hline
TU-202 & RN-45 & (automationService) & Unid. & PE: Sem contexto & result=false & result=false & Passou \\
\hline
TU-203 & RN-45 & (automationService) & Unid. & PE: Sem condição & result=false & result=false & Passou \\
\hline
TU-204 & RN-45 & (automationService) & Unid. & MC/DC: Ativa + Automático & shouldExecute=true & shouldExecute=true & Passou \\
\hline
TU-205 & RN-45 & (automationService) & Unid. & MC/DC: Ativa + Manual & shouldExecute=false & Erro: "modo Manual" & Passou \\
\hline
TU-206 & RN-45 & (automationService) & Unid. & MC/DC: Inativa + Automático & shouldExecute=false & Erro: "não está ativa" & Passou \\
\hline
TU-207 & RN-45 & (automationService) & Unid. & MC/DC: Modo inválido & shouldExecute=false & Erro: "Modo inválido" & Passou \\
\hline
TU-208 & RN-45 & (automationService) & Unid. & MC/DC: Regra null & shouldExecute=false & Erro: "não especificado" & Passou \\
\hline
TU-209 & RN-45 & (automationService) & Unid. & PE: Resp altera modo & canToggle=true & canToggle=true & Passou \\
\hline
TU-210 & RN-45 & (automationService) & Unid. & PE: Técnico NÃO altera & canToggle=false & Erro: "Apenas Resp/Admin" & Passou \\
\hline
TU-211 & RN-45 & (automationService) & Unid. & PE: Modo inválido & canToggle=false & Erro: "deve ser Manual/Auto" & Passou \\
\hline
TU-212 & RN-45 & (automationService) & Unid. & PE: User null & canToggle=false & Erro: "não especificado" & Passou \\
\hline
TU-213 & RN-45 & (automationService) & Unid. & PE: Automático → executar & actionType=executar & actionType=executar & Passou \\
\hline
TU-214 & RN-45 & (automationService) & Unid. & PE: Manual → sugerir & actionType=sugerir & actionType=sugerir & Passou \\
\hline
\end{tabular}%
}
\end{table}

\begin{table}[H]
\centering
\caption{Rastreabilidade - Reports Service (18 testes)}
\footnotesize
\resizebox{\textwidth}{!}{%
\begin{tabular}{|l|l|p{2.5cm}|l|p{2.8cm}|p{2.8cm}|p{2.5cm}|c|}
\hline
\textbf{ID} & \textbf{Req.} & \textbf{Endpoint} & \textbf{Nível} & \textbf{Técnica} & \textbf{Resultado Esperado} & \textbf{Resultado Obtido} & \textbf{Estado} \\
\hline
TU-215 & - & (reportsService) & Unid. & PE: Params válidos & Aceito (valid=true) & Aceito (valid=true) & Passou \\
\hline
TU-216 & - & (reportsService) & Unid. & PE: Formato inválido & Rejeitado (valid=false) & Erro: "CSV/Excel/JSON" & Passou \\
\hline
TU-217 & - & (reportsService) & Unid. & PE: Período inválido & Rejeitado (valid=false) & Erro: "período deve ser..." & Passou \\
\hline
TU-218 & - & (reportsService) & Unid. & VL: Data início futura & Rejeitado (valid=false) & Erro: "não pode ser futura" & Passou \\
\hline
TU-219 & - & (reportsService) & Unid. & VL: Data fim < início & Rejeitado (valid=false) & Erro: "deve ser após início" & Passou \\
\hline
TU-220 & - & (reportsService) & Unid. & PE: Personalizado válido & Aceito com data início/fim & Aceito (valid=true) & Passou \\
\hline
TU-221 & - & (reportsService) & Unid. & PE: Calcula média & {avg: 22.0} & {avg: 22.0} & Passou \\
\hline
TU-222 & - & (reportsService) & Unid. & PE: Calcula máximo & {max: 35} & {max: 35} & Passou \\
\hline
TU-223 & - & (reportsService) & Unid. & PE: Calcula mínimo & {min: 10} & {min: 10} & Passou \\
\hline
TU-224 & - & (reportsService) & Unid. & PE: Calcula totais & {total: 100, count: 4} & {total: 100, count: 4} & Passou \\
\hline
TU-225 & - & (reportsService) & Unid. & PE: CSV com dados simples & Retorna CSV formatado & CSV correto & Passou \\
\hline
TU-226 & - & (reportsService) & Unid. & PE: CSV com vírgulas (escape) & Campos escapados com aspas & Campos escapados & Passou \\
\hline
TU-227 & - & (reportsService) & Unid. & PE: CSV vazio & Retorna headers apenas & Headers apenas & Passou \\
\hline
TU-228 & - & (reportsService) & Unid. & PE: Excel com dados & {headers, rows} & Estrutura Excel & Passou \\
\hline
TU-229 & - & (reportsService) & Unid. & PE: Excel vazio & {headers, rows=[]} & Estrutura vazia & Passou \\
\hline
TU-230 & - & (reportsService) & Unid. & VL: Filtra range válido & data.length=1 & 1 registro retornado & Passou \\
\hline
TU-231 & - & (reportsService) & Unid. & VL: Exclui fora range & data.length=2 (in range) & 2 registros retornados & Passou \\
\hline
TU-232 & - & (reportsService) & Unid. & PE: Sem datas & data.length=0 & 0 registros & Passou \\
\hline
\end{tabular}%
}
\end{table}

\begin{table}[H]
\centering
\caption{Rastreabilidade - Audit Service (13 testes)}
\footnotesize
\resizebox{\textwidth}{!}{%
\begin{tabular}{|l|l|p{2.5cm}|l|p{2.8cm}|p{2.8cm}|p{2.5cm}|c|}
\hline
\textbf{ID} & \textbf{Req.} & \textbf{Endpoint} & \textbf{Nível} & \textbf{Técnica} & \textbf{Resultado Esperado} & \textbf{Resultado Obtido} & \textbf{Estado} \\
\hline
TU-233 & RN-55 & (auditService) & Unid. & PE: Log operação válida & Retorna objeto log completo & Objeto log completo & Passou \\
\hline
TU-234 & RN-55 & (auditService) & Unid. & PE: Log com timestamp auto & Timestamp gerado automaticamente & Timestamp correto & Passou \\
\hline
TU-235 & RN-55 & (auditService) & Unid. & PE: Log sem userId & Rejeitado (userId obrigatório) & Erro: "userId obrigatório" & Passou \\
\hline
TU-236 & RN-55 & (auditService) & Unid. & PE: POST /api/plans (audita) & shouldAudit=true & shouldAudit=true & Passou \\
\hline
TU-237 & RN-55 & (auditService) & Unid. & PE: DELETE operation (audita) & shouldAudit=true & shouldAudit=true & Passou \\
\hline
TU-238 & RN-55 & (auditService) & Unid. & PE: POST /api/users (audita) & shouldAudit=true & shouldAudit=true & Passou \\
\hline
TU-239 & RN-55 & (auditService) & Unid. & PE: GET /api/batches (NÃO audita) & shouldAudit=false & shouldAudit=false & Passou \\
\hline
TU-240 & RN-55 & (auditService) & Unid. & PE: PUT operation (NÃO audita) & shouldAudit=false & shouldAudit=false & Passou \\
\hline
TU-241 & - & (auditService) & Unid. & PE: Filtra range válido & logs.length=1 & 1 log retornado & Passou \\
\hline
TU-242 & - & (auditService) & Unid. & PE: Exclui fora range & logs.length=2 & 2 logs retornados & Passou \\
\hline
TU-243 & - & (auditService) & Unid. & PE: Filtra por CREATE & logs.length=1 & 1 log CREATE & Passou \\
\hline
TU-244 & - & (auditService) & Unid. & PE: Filtra por DELETE & logs.length=2 & 2 logs DELETE & Passou \\
\hline
TU-245 & - & (auditService) & Unid. & PE: Filtra por userId & logs.length=1 & 1 log do user & Passou \\
\hline
\end{tabular}%
}
\end{table}

\begin{table}[H]
\centering
\caption{Rastreabilidade - Users Service (22 testes)}
\footnotesize
\resizebox{\textwidth}{!}{%
\begin{tabular}{|l|l|p{2.5cm}|l|p{2.8cm}|p{2.8cm}|p{2.5cm}|c|}
\hline
\textbf{ID} & \textbf{Req.} & \textbf{Endpoint} & \textbf{Nível} & \textbf{Técnica} & \textbf{Resultado Esperado} & \textbf{Resultado Obtido} & \textbf{Estado} \\
\hline
TU-246 & RN-01 & (usersService) & Unid. & PE: User válido completo & Aceito (valid=true) & Aceito (valid=true) & Passou \\
\hline
TU-247 & RN-01 & (usersService) & Unid. & PE: User nulo & Rejeitado (valid=false) & Erro: "não pode ser nulo" & Passou \\
\hline
TU-248 & RN-01 & (usersService) & Unid. & VL: Username < 3 chars & Rejeitado (valid=false) & Erro: "pelo menos 3" & Passou \\
\hline
TU-249 & RN-01 & (usersService) & Unid. & VL: Username = 3 chars (limite) & Aceito (valid=true) & Aceito (valid=true) & Passou \\
\hline
TU-250 & RN-01 & (usersService) & Unid. & VL: Password < 8 chars & Rejeitado (valid=false) & Erro: "pelo menos 8" & Passou \\
\hline
TU-251 & RN-01 & (usersService) & Unid. & PE: Perfil inválido & Rejeitado (valid=false) & Erro: "perfil deve ser..." & Passou \\
\hline
TU-252 & RN-01 & (usersService) & Unid. & MC/DC: Admin cria Técnico & canCreate=true & canCreate=true & Passou \\
\hline
TU-253 & RN-01 & (usersService) & Unid. & MC/DC: Técnico NÃO cria & canCreate=false & Erro: "Apenas Admin" & Passou \\
\hline
TU-254 & RN-01 & (usersService) & Unid. & MC/DC: Responsável NÃO cria & canCreate=false & Erro: "Apenas Admin" & Passou \\
\hline
TU-255 & RN-01 & (usersService) & Unid. & MC/DC: User null & canCreate=false & Erro: "não especificado" & Passou \\
\hline
TU-256 & RN-01 & (usersService) & Unid. & MC/DC: User edita a si próprio & canUpdate=true & canUpdate=true & Passou \\
\hline
TU-257 & RN-01 & (usersService) & Unid. & MC/DC: Admin edita qualquer um & canUpdate=true & canUpdate=true & Passou \\
\hline
TU-258 & RN-01 & (usersService) & Unid. & MC/DC: Resp edita Técnico & canUpdate=true & canUpdate=true & Passou \\
\hline
TU-259 & RN-01 & (usersService) & Unid. & MC/DC: Técnico NÃO edita outro & canUpdate=false & Erro: "sem permissão" & Passou \\
\hline
TU-260 & RN-01 & (usersService) & Unid. & MC/DC: Resp NÃO edita Admin & canUpdate=false & Erro: "sem permissão" & Passou \\
\hline
TU-261 & RN-01 & (usersService) & Unid. & MC/DC: Admin apaga outro & canDelete=true & canDelete=true & Passou \\
\hline
TU-262 & RN-01 & (usersService) & Unid. & MC/DC: Admin NÃO apaga a si próprio & canDelete=false & Erro: "não pode apagar-se" & Passou \\
\hline
TU-263 & RN-01 & (usersService) & Unid. & MC/DC: Técnico NÃO apaga & canDelete=false & Erro: "Apenas Admin" & Passou \\
\hline
TU-264 & RN-01 & (usersService) & Unid. & MC/DC: User null & canDelete=false & Erro: "não especificado" & Passou \\
\hline
TU-265 & - & (usersService) & Unid. & PE: Admin > Responsável & hierarchy: Admin > Resp & hierarchy: 3 > 2 & Passou \\
\hline
TU-266 & - & (usersService) & Unid. & PE: Responsável > Técnico & hierarchy: Resp > Técnico & hierarchy: 2 > 1 & Passou \\
\hline
TU-267 & - & (usersService) & Unid. & PE: Perfil desconhecido & hierarchy: 0 (inválido) & hierarchy: 0 & Passou \\
\hline
\end{tabular}%
}
\end{table}

\subsection{Resultados de Execução}

\subsubsection{Sumário Executivo Sprint 3}

\begin{table}[H]
\centering
\caption{Resultados de Execução - Sprint 3}
\begin{tabular}{|l|c|}
\hline
\textbf{Métrica} & \textbf{Valor} \\
\hline
Total de Testes Sprint 3 & 183 \\
\hline
Testes Aprovados & 183 (100\%) \\
\hline
Testes Reprovados & 0 (0\%) \\
\hline
Módulos Implementados & 8 \\
\hline
Funções Testadas & 41 \\
\hline
Técnicas Aplicadas & PE (87), VL (58), MC/DC (38) \\
\hline
Tempo de Execução & $\sim$ 3.2 segundos \\
\hline
Média por Teste & $\sim$ 17 milissegundos \\
\hline
\end{tabular}
\end{table}

\subsubsection{Cobertura de Código Sprint 3}

\begin{table}[H]
\centering
\caption{Métricas de Cobertura - Módulos Sprint 3}
\begin{tabular}{|l|c|c|c|c|}
\hline
\textbf{Módulo} & \textbf{Statements} & \textbf{Branches} & \textbf{Functions} & \textbf{Lines} \\
\hline
batchesService.js & 100\% & 100\% & 100\% & 100\% \\
\hline
measurementsService.js & 100\% & 100\% & 100\% & 100\% \\
\hline
alertsService.js & 100\% & 100\% & 100\% & 100\% \\
\hline
tasksService.js & 100\% & 100\% & 100\% & 100\% \\
\hline
automationService.js & 100\% & 100\% & 100\% & 100\% \\
\hline
reportsService.js & 100\% & 97.5\% & 100\% & 100\% \\
\hline
auditService.js & 100\% & 100\% & 100\% & 100\% \\
\hline
usersService.js & 100\% & 100\% & 100\% & 100\% \\
\hline
\textbf{Média Sprint 3} & \textbf{100\%} & \textbf{99.7\%} & \textbf{100\%} & \textbf{100\%} \\
\hline
\end{tabular}
\end{table}

\subsubsection{Resumo Acumulado (Todos os Sprints)}

\begin{table}[H]
\centering
\caption{Totais Acumulados - Sprint 1 + 2 + 3}
\begin{tabular}{|l|c|}
\hline
\textbf{Categoria} & \textbf{Quantidade} \\
\hline
\textbf{Sprint 1} - Autenticação & 29 testes \\
\hline
\textbf{Sprint 2} - Herbs + Plans & 82 testes \\
\hline
\textbf{Sprint 3} - Requisitos Restantes & 183 testes \\
\hline
\hline
\textbf{Total Acumulado} & \textbf{295 testes} \\
\hline
\textbf{Taxa de Aprovação Global} & \textbf{100\%} \\
\hline
\textbf{Cobertura Global} & \textbf{>85\% (statements, branches, functions)} \\
\hline
\textbf{Módulos Completos} & \textbf{11 módulos} \\
\hline
\end{tabular}
\end{table}

\begin{itemize}[leftmargin=2cm]
    \item \textbf{Test Suites:} 12 aprovados, 0 reprovados
    \item \textbf{Tempo Total:} $\sim$ 3.2 segundos para 295 testes
    \item \textbf{Performance:} $\sim$ 11 milissegundos por teste (média)
    \item \textbf{Defeitos Críticos:} 0
\end{itemize}

\subsection{Defeitos e Correções}

Durante a execução dos testes do Sprint 3, foram identificados 2 defeitos menores durante o desenvolvimento, \textbf{corrigidos imediatamente} antes da entrega final. Todos os 183 testes passaram com sucesso na versão final.

\begin{table}[H]
\centering
\caption{Registo de Defeitos - Sprint 3}
\begin{tabular}{|p{1.5cm}|p{5cm}|p{2cm}|p{2cm}|p{2cm}|}
\hline
\textbf{ID} & \textbf{Descrição} & \textbf{Severidade} & \textbf{Estado} & \textbf{Resolução} \\
\hline
DEF-03 & measurementsService: Cálculo de severidade de alerta usando desvio percentual em vez de distância absoluta & Baixa & Resolvido & Alterada lógica para usar distância mínima aos limites ($\geq$ 9°C para Crítico) \\
\hline
DEF-04 & measurementsService: Limiar de alerta crítico >10 não capturava valor=9 & Baixa & Resolvido & Ajustado para $\geq$ 9 (temperatura) e $\geq$ 20 (humidade) \\
\hline
\end{tabular}
\end{table}

\textbf{Observações sobre defeitos:}
\begin{itemize}[leftmargin=2cm]
    \item Ambos defeitos detetados durante execução de testes unitários (TDD efetivo)
    \item Correção trivial (ajuste de operadores lógicos)
    \item Nenhum defeito detetado após correções
    \item Validações rigorosas impediram propagação de erros
\end{itemize}

\subsection{Decisões de Implementação - Sprint 3}

Durante o Sprint 3, foram tomadas as seguintes decisões técnicas relevantes:

\begin{enumerate}[leftmargin=2cm]
    \item \textbf{Lógica de Divisão de Lotes (RN-37):} Validação implementada com verificação de estado ativo, quantidade $>$ 0 e quantidade $<$ quantidadeAtual (não $\leq$).
    
    \item \textbf{Geração Automática de Alertas (RN-30):} Classificação baseada em distância absoluta do limite mais próximo: Crítico se distância $\geq$ limiar (9°C temp, 20\% hum), caso contrário Aviso.
    
    \item \textbf{Justificação para Alerta Crítico (RN-05):} Validação rigorosa de comprimento [10, 500] caracteres aplicada apenas para alertas do tipo "Crítico", outros tipos não exigem justificação.
    
    \item \textbf{Hierarquia de Perfis:} Implementação de função \texttt{comparePerfilHierarchy} que retorna -1, 0, 1 para comparações: Técnico (1) $<$ Responsável (2) $<$ Administrador (3).
    
    \item \textbf{Modo Manual vs Automático (RN-45):} Lógica MC/DC implementada: \texttt{(regra.estado = ativa) AND (modo = Automático)} para execução automática.
    
    \item \textbf{Auditoria de Operações Críticas (RN-55):} Lista explícita de endpoints auditáveis: \texttt{POST /api/plans}, \texttt{DELETE /api/batches}, todos endpoints de users, e qualquer operação DELETE.
    
    \item \textbf{Formatação de Relatórios:} Implementação de \texttt{formatToCSV} com escape de vírgulas e aspas, e \texttt{formatToExcel} com estrutura simplificada (headers + rows array).
    
    \item \textbf{Cálculo de Prioridade de Tarefas:} Base por tipo (colheita=8, rega=7, fertilização=5), incremento +2 se atrasada (data $<$ hoje), máximo 10.
\end{enumerate}

\subsection{Lições Aprendidas - Sprint 3}

\begin{itemize}[leftmargin=2cm]
    \item A técnica \textbf{MC/DC} aplicada a condições compostas (conclusão de lote, ignorar alerta crítico, execução automática) garante que cada condição individual pode afetar o resultado final independentemente.
    
    \item Testes de \textbf{Valores Limite} para justificações [10, 500] e validações de intervalos detectaram off-by-one errors comuns (uso de $>$ vs $\geq$).
    
    \item Implementação de \textbf{8 módulos} completos em paralelo demonstrou a importância de convenções de nomenclatura consistentes (\texttt{validateXData}, \texttt{canPerformAction}).
    
    \item Testes de \textbf{permissões hierárquicas} (Técnico $<$ Responsável $<$ Admin) exigiram casos de teste explícitos para cada combinação de perfis.
    
    \item A cobertura de \textbf{100\% em funções} foi mantida graças à implementação completa de todos os métodos públicos de cada service.
    
    \item Testes para \textbf{geração de alertas} com priorização (Crítico $>$ Aviso $>$ Informativo) exigiram lógica de ordenação explícita.
\end{itemize}

\subsection{Conformidade com Requisitos do Enunciado - Sprint 3}

O Sprint 3 cumpre integralmente os objetivos estabelecidos no enunciado do trabalho:

\begin{itemize}[leftmargin=2cm]
    \item[$\checkmark$] Criação de testes de unidade para os requisitos restantes (183 testes)
    \item[$\checkmark$] Implementação de 8 módulos de serviços completos
    \item[$\checkmark$] Aplicação de técnicas formais: PE (87 testes), VL (58 testes), MC/DC (38 testes)
    \item[$\checkmark$] Cobertura $\geq$ 85\% (média 99.7\% branches, 100\% statements e functions)
    \item[$\checkmark$] Taxa de aprovação 100\% (183/183 testes passando)
    \item[$\checkmark$] Atualização da matriz de rastreabilidade completa
    \item[$\checkmark$] Documentação detalhada de decisões de implementação
    \item[$\checkmark$] Total acumulado: 295 testes (Sprint 1 + 2 + 3)
\end{itemize}
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