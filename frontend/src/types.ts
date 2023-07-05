export interface Stat {
  correct: number;
  incorrect: number;
  missed: number;
}
export interface TypingStat {
  stat: Stat;
  wpm: number;
  acc: number;
}
export type TypingStats = Array<TypingStat>;

export type WordInputArray = Array<string>;
