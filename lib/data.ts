export type Player = string;

export interface Group {
  letter: string;
  players: Player[];
  color: string;
  ringColor: string;
}

export interface Match {
  id: string;
  group: string;
  player1: Player;
  player2: Player;
}

export const GROUPS: Group[] = [
  {
    letter: "A",
    color: "from-blue-600 to-blue-800",
    ringColor: "#0085C7",
    players: [
      "GAYTAN INESTAL, RUBEN",
      "MISIAC, MARIA DE LOS ANGELES",
      "GUIDATI, RICCARDO",
      "OLIVELLA PRATS, LUCIA",
      "JOAO JAVIER",
    ],
  },
  {
    letter: "B",
    color: "from-yellow-500 to-yellow-700",
    ringColor: "#F4C300",
    players: [
      "LORENZO JAQUEZ, MERCE",
      "CHAROENROOK ELIZALDE, PATRICIA",
      "MARTIN LA FUENTE, DANIEL",
      "ROMAGOSA VIVES, CRISTINA",
      "EDGAR CORTES",
    ],
  },
  {
    letter: "C",
    color: "from-zinc-700 to-zinc-900",
    ringColor: "#333333",
    players: [
      "AMPUDIA, RODRIGO",
      "DIAZ ESCUDERO, SUSANA",
      "JANER FERRER, MARC",
      "PIÑEYRO MUR, AITOR",
    ],
  },
  {
    letter: "D",
    color: "from-green-600 to-green-800",
    ringColor: "#009F6B",
    players: [
      "OUAHABI AYAOU, ADNANE",
      "FONTANA DESTRIEUX, CARLOS",
      "LAM, YIN HEI",
      "PUIG FERRER, JOSE MARIA",
    ],
  },
  {
    letter: "E",
    color: "from-red-600 to-red-800",
    ringColor: "#DF0024",
    players: [
      "LUENGO GALLEGO, JUAN",
      "GIMENO GALLARDO, MARTINA",
      "MARQUIEGUI DIAZ, JAIME",
      "VALDES BELDA, SARA",
    ],
  },
  {
    letter: "F",
    color: "from-blue-600 to-blue-800",
    ringColor: "#0085C7",
    players: [
      "JOVER TORT, RICARDO",
      "MARIELLI, SABRINA",
      "DOMENECH RUBI, EDUARDO",
      "PASTOR LOPEZ, CELIA",
    ],
  },
  {
    letter: "G",
    color: "from-yellow-500 to-yellow-700",
    ringColor: "#F4C300",
    players: [
      "ARGIZ, ANTONELLA",
      "SANCHEZ BLANCO, JORGE",
      "CAMIÑA GIL, MARTA PIA",
      "MANUBENS MERCADE, CARLOS",
    ],
  },
  {
    letter: "H",
    color: "from-green-600 to-green-800",
    ringColor: "#009F6B",
    players: [
      "PEREZ MATA, CLAUDIA",
      "FERREIRA MARTINS, BRUNO",
      "BANNET MAS, ELISABETH",
      "MIRALLES SOLA, ORIOL",
    ],
  },
];

function getMatches(group: Group): Match[] {
  const matches: Match[] = [];
  let num = 1;
  for (let i = 0; i < group.players.length; i++) {
    for (let j = i + 1; j < group.players.length; j++) {
      matches.push({
        id: `${group.letter}${num}`,
        group: group.letter,
        player1: group.players[i],
        player2: group.players[j],
      });
      num++;
    }
  }
  return matches;
}

export const ALL_MATCHES: Match[] = GROUPS.flatMap(getMatches);

export const GROUP_MATCHES: Record<string, Match[]> = Object.fromEntries(
  GROUPS.map((g) => [g.letter, getMatches(g)])
);

export const R16_MATCHUPS = [
  { slot: "R1", p1: "1st Group A", p2: "2nd Group B" },
  { slot: "R2", p1: "1st Group C", p2: "2nd Group D" },
  { slot: "R3", p1: "1st Group E", p2: "2nd Group F" },
  { slot: "R4", p1: "1st Group G", p2: "2nd Group H" },
  { slot: "R5", p1: "1st Group B", p2: "2nd Group A" },
  { slot: "R6", p1: "1st Group D", p2: "2nd Group C" },
  { slot: "R7", p1: "1st Group F", p2: "2nd Group E" },
  { slot: "R8", p1: "1st Group H", p2: "2nd Group G" },
];

export const TOURNAMENT_STATS = {
  participants: 34,
  groups: 8,
  groupMatches: ALL_MATCHES.length,
  knockoutMatches: 15,
  totalMatches: ALL_MATCHES.length + 15,
};
