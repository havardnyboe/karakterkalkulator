export const grades = {
  5: "A",
  4: "B",
  3: "C",
  2: "D",
  1: "E",
  0: "F",
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  E: 1,
  F: 0,
};


export const round = (int, decimals = 0) => {
  return Math.round(int * 10 ** decimals) / 10 ** decimals;
};
