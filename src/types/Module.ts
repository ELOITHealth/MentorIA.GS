export interface Module {
  id: number;
  // English keys (from API or other sources)
  title?: string;
  description?: string;
  imageUrl?: string;
  profession?: string;

  // Portuguese keys (used across the app UI)
  nome?: string;
  descricao?: string;
  imagem?: string;
  conteudo?: string;
  profissao?: string;
}