const RAW_PLAYER_NAMES: string[] = [
  "GAYTAN INESTAL, RUBEN",
  "MISIAC, MARIA DE LOS ANGELES",
  "GUIDATI, RICCARDO",
  "OLIVELLA PRATS, LUCIA",
  "JOAO JAVIER",
  "LORENZO JAQUEZ, MERCE",
  "CHAROENROOK ELIZALDE, PATRICIA",
  "MARTIN LA FUENTE, DANIEL",
  "ROMAGOSA VIVES, CRISTINA",
  "EDGAR CORTES",
  "AMPUDIA, RODRIGO",
  "JANER FERRER, MARC",
  "PIÑEYRO MUR, AITOR",
  "OUAHABI AYAOU, ADNANE",
  "FONTANA DESTRIEUX, CARLOS",
  "LAM, YIN HEI",
  "PUIG FERRER, JOSE MARIA",
  "LUENGO GALLEGO, JUAN",
  "GIMENO GALLARDO, MARTINA",
  "MARQUIEGUI DIAZ, JAIME",
  "VALDES BELDA, SARA",
  "JOVER TORT, RICARDO",
  "MARIELLI, SABRINA",
  "DOMENECH RUBI, EDUARDO",
  "PASTOR LOPEZ, CELIA",
  "SANCHEZ BLANCO, JORGE",
  "CAMIÑA GIL, MARTA PIA",
  "MANUBENS MERCADE, CARLOS",
  "PEREZ MATA, CLAUDIA",
  "FERREIRA MARTINS, BRUNO",
  "BANNET MAS, ELISABETH",
  "MIRALLES SOLA, ORIOL",
];

function toDisplayName(raw: string): string {
  if (raw.includes(",")) {
    const [surname, first] = raw.split(",").map((s) => s.trim());
    return `${first} ${surname}`.toLowerCase();
  }
  return raw.toLowerCase();
}

export const PLAYER_NAMES: string[] = [...RAW_PLAYER_NAMES].sort((a, b) =>
  toDisplayName(a).localeCompare(toDisplayName(b))
);
