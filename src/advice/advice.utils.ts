import { Advice } from 'schemas/advice.schema';

export const pickRandoms = (advices: Advice[]): Advice => {
  const randomIndex = Math.floor(Math.random() * advices.length);
  return advices[randomIndex];
};
