export interface ListOfWords {
  [key: string]: Array<string>;
}
export interface PreviousWord {
  word: string;
  isCorrect: boolean;
}
export type PreviousWordArray = Array<PreviousWord>;
