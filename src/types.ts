export interface AllCharacterType {
  correct: number;
  incorrect: number;
  missed: number;
}

interface WordInput {
  word: string;
  status: 'active' | 'inactive' | 'incorrect' | 'correct';
}
export type WordInputArray = Array<WordInput>;
