# MentorIA — Aprenda Inteligência Artificial Aplicada ao Trabalho

Plataforma interativa desenvolvida para ensinar profissionais de diversas áreas a utilizar IA no dia a dia por meio de trilhas personalizadas, módulos práticos e um chatbot inteligente orientado por IA.

---

# 2. Status do Projeto

✔ Finalizado — Versão 1.0  
✔ Deploy funcional no Vercel  
✔ Backend hospedado na Render  
✔ Vídeos do Pitch e Heurísticas disponíveis  
✔ Documentação completa

---

# 3. Sumário

1. Título e Descrição  
2. Status do Projeto  
3. Sumário  
4. Sobre o Projeto  
5. Tecnologias Utilizadas  
6. Instalação  
7. Como Usar  
8. Estrutura de Pastas  
9. Endpoints / Rotas  
10. Autores e Créditos  
11. Screenshots / Demonstração  
12. Contato  
13. Links Importantes  

---

# 4. Sobre o Projeto

O **MentorIA** é um sistema educacional focado em preparar profissionais para aplicar Inteligência Artificial no trabalho real.  
Ele oferece:

- Registro e login funcional via API (Render)
- Dashboard personalizado por profissão
- Trilhas de aprendizado (módulos)
- Chatbot inteligente orientado por IA
- Progresso salvo por usuário
- UX baseada nas heurísticas de Nielsen
- UX Writing com linguagem clara, humana e objetiva

O objetivo é transformar profissionais comuns em **usuários estratégicos de IA**, aumentando produtividade e reduzindo esforço operacional.

---

# 5. Tecnologias Utilizadas

### **Frontend**
- React.js + Vite
- TypeScript
- TailwindCSS
- Framer Motion
- Axios
- Recharts

### **Backend**
- Java + Spring Boot (API hospedada na Render)

### **Infra**
- Vercel (Deploy Frontend)
- Render (API Backend)
- GitHub (versionamento)

---

# 6. Instalação

###  **Requisitos**
- Node.js 18+
- npm ou yarn

###  **Instalar dependências**
```bash
npm install

#7. Como usar 
Acesse o site
 

Fluxo
1.Criar conta escolhendo sua profissão
2.Fazer login
3.Acessar o Dashboard
4.Explorar módulos
5.Conversar com o MentorIA
6.Concluir módulos para aumentar o progresso

8. Estrutura de Pastas
src/
 ├── components/
 │    ├── Navbar.tsx
 │    ├── ProgressBar.tsx
 │    ├── ModalWelcome.tsx
 │
 ├── pages/
 │    ├── Home.tsx
 │    ├── Dashboard.tsx
 │    ├── Login.tsx
 │    ├── Register.tsx
 │    ├── Chat.tsx
 │    ├── Module.tsx
 │
 ├── data/
 │    ├── mockModules.ts
 │
 ├── services/
 │    ├── api.ts
 │
 ├── types/
 │    ├── Module.ts

9. Endpoints ou Rotas Principais
Backend (Render)
Base URL da API:
https://java-global-solution-zo8v.onrender.com

Endpoints usados:
| Método | Rota             | Descrição                 |
| ------ | ---------------- | ------------------------- |
| GET    | `/usuarios`      | Lista usuários            |
| POST   | `/usuarios`      | Cria usuário              |
| GET    | `/usuarios/{id}` | Busca usuário             |
| GET    | `/modulos/{id}`  | Retorna módulo específico |

10. Autores e Créditos
Equipe EloitHealth -1TDSPK

Nome                RM            GitHub                              Linkedin
Vitor Augusto     564227    https://github.com/Vitor-Augusto-olv    www.linkedin.com/in/vitor-augusto-91234a353
                                                                
André Bellandi    564662                                        
                                                                
Matheus Silva     562480    https://github.com/Matheus-hub-prog     www.linkedin.com/in/matheus-silva-moratti

11. Contato
Para dúvidas, sugestões ou melhorias:
Email: vitorbr02@icloud.com
Fiap - 1TDSPK
Linkedin/ GitHub na tabela acima

13. Links Importantes
Video Pitch(5 minutos)
https://youtu.be/0hfLCVX8014

Video Explicativo(Heurísticas + UX writing)
https://youtu.be/uiZ12iIUkiE

Deploy no Vercel
https://mentoriags.vercel.app/