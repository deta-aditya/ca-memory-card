import { Card } from "./card";

export type Action = 
  | { kind: 'match', card1: Card, card2: Card };