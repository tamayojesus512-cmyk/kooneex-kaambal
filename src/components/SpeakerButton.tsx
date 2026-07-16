import { Volume2 } from "lucide-react";

let currentAudio: HTMLAudioElement | null = null;
let playbackRequestId = 0;

type AudioFile = string | string[];
type AudioMap = Record<string, AudioFile>;

type AudioSource = {
  folder: string;
  files: AudioMap;
};

/*
 * =====================================================
 * NÚMEROS
 * public/audio/palabras/numeros/
 * =====================================================
 */
const NUMBER_AUDIO_FILES: AudioMap = {
  jun: "jun.mp3",

  "ka'": ["ka'a.mp3", "ka.mp3"],
  "ka'a": ["ka'a.mp3", "ka.mp3"],

  oox: ["Oox.mp3", "oox.mp3"],
  kan: "kan.mp3",

  "jo'": ["jo'.mp3", "jo.mp3"],
  jo: ["jo'.mp3", "jo.mp3"],

  wak: "wak.mp3",

  "uk'": ["u´uk.mp3", "uk.mp3"],
  "u'uk": ["u´uk.mp3", "uk.mp3"],

  waxak: "waxak.mp3",
  bolon: "bolon.mp3",
  lajun: "lajun.mp3",
  buluk: "buluk.mp3",

  "lajka'": ["lajka'.mp3", "lajka.mp3"],
  lajka: ["lajka'.mp3", "lajka.mp3"],

  ooxlajun: "ooxlajun.mp3",
  kanlajun: "kanlajun.mp3",

  "jo'olajun": "joolajun.mp3",
  joolajun: "joolajun.mp3",

  waklajun: "waklajun.mp3",
  uklajun: "uklajun.mp3",
  waxaklajun: "waxaklajun.mp3",

  "bolon lajun": ["bolon lajun.mp3", "bolonlajun.mp3"],
  bolonlajun: ["bolon lajun.mp3", "bolonlajun.mp3"],

  "junk'aal": "junkaal.mp3",
  junkaal: "junkaal.mp3",

  "ka'k'aal": ["kakaal.mp3", "kakaal.mp3"],
  kakaal: "kakaal.mp3",

  "ooxk'aal": ["ooxk'aal.mp3", "ooxkaal.mp3"],
  ooxkaal: ["ooxk'aal.mp3", "ooxkaal.mp3"],
};

/*
 * =====================================================
 * ANIMALES
 * public/audio/palabras/animales/
 * =====================================================
 */
const ANIMAL_AUDIO_FILES: AudioMap = {
  aak: ["Aak.mp3", "aak.mp3"],
  aayin: ["Aayin.mp3", "aayin.mp3"],

  baalam: "balam.mp3",
  balam: "balam.mp3",

  "ch'iich'": "chi´iich.mp3",
  "ch'iich": "chi´iich.mp3",
  chiich: "chi´iich.mp3",

  chiwoj: "chiwoj.mp3",

  "ch'oom": "choom.mp3",
  choom: "choom.mp3",

  juuj: "juuj.mp3",
  kaa: "kaa.mp3",
  kaan: "kaan.mp3",
  kaax: "kaax.mp3",
  kay: "kay.mp3",
  keej: "keej.mp3",

  "k'eek'en": "keeken.mp3",
  keeken: "keeken.mp3",

  miis: "miis.mp3",
  mukuy: "mukuy.mp3",

  "peek'": "peek.mp3",
  peek: "peek.mp3",

  "sina'an": "sina´an.mp3",
  "siina'an": "sina´an.mp3",
  sinaan: "sina´an.mp3",
  siinaan: "sina´an.mp3",

  tsiimin: "tsiimin.mp3",

  "t'u'ul": "t´u´ul.mp3",
  tuul: "t´u´ul.mp3",

  // Pavo o guajolote
  ulun: "ulun.mp3",

  wakax: "wakaax.mp3",
  wakaax: "wakaax.mp3",
};

/*
 * =====================================================
 * CUERPO
 * public/audio/palabras/cuerpo/
 * =====================================================
 */
const BODY_AUDIO_FILES: AudioMap = {
  // Lengua
  "aak'": "aak.mp3",

  // Cuerpo o carne
  "bak'el": "bakeel.mp3",
  bakeel: "bakeel.mp3",

  // Boca
  "chi'": "chi.mp3",
  chi: "chi.mp3",

  // Ojo o rostro
  ich: "ich.mp3",

  // Cuello
  kaal: "kaal.mp3",

  // Mano o brazo
  "k'ab": "kab.mp3",
  kab: "kab.mp3",

  // Sangre
  "k'i'ik'": "kiik.mp3",
  "k'i'ik": "kiik.mp3",
  kiik: "kiik.mp3",
  "yaak'il": "kiik.mp3",

  // Diente
  koj: "koj.mp3",

  // Estómago o vientre
  "nak'": "nak.mp3",
  nak: "nak.mp3",

  // Nariz
  "ni'": "ni.mp3",
  ni: "ni.mp3",

  // Pie
  ook: "ook.mp3",

  // Cabeza
  pool: "pool.mp3",

  // Corazón
  "puksi'ik'al": "puksikal.mp3",
  puksiikal: "puksikal.mp3",
  puksikal: "puksikal.mp3",

  // Pecho
  tseem: "tseem.mp3",

  // Cabello
  "tso'otsel pool": "tsotsel-pool.mp3",
  "tsootsel pool": "tsotsel-pool.mp3",
  "tsotsel pool": "tsotsel-pool.mp3",
  "tsa'ay": "tsotsel-pool.mp3",

  // Oreja
  xikin: "xikin.mp3",
};

/*
 * =====================================================
 * SALUDOS
 * public/audio/palabras/saludos/
 * =====================================================
 */
const GREETING_AUDIO_FILES: AudioMap = {
  "ba'ax ka wa'alik": "Baax-ka-waalik.mp3",
  "baax ka wa'alik": "Baax-ka-waalik.mp3",
  "baax ka waalik": "Baax-ka-waalik.mp3",

  "bix a beel": "Bix-a-Beel.mp3",

  "ma'alob": "ma´alob.mp3",
  maalob: "ma´alob.mp3",

  "yuum bo'otik": "Yuum-bo-otik.mp3",
  "yuum bootik": "Yuum-bo-otik.mp3",

  "in lak'ech": "In-lakech.mp3",
  "in laak'ech": "In-lakech.mp3",
  "in lakech": "In-lakech.mp3",

  "mix ba'al": "mix-ba-al.mp3",
  "mix baal": "mix-ba-al.mp3",

  saamal: "sáamal.mp3",

  // ¿Cómo estás?
  "bix yanikech": [
    "bix-yanikeech.mp3",
    "bix-yanikech.mp3",
  ],
  "bix yanik'ech": [
    "bix-yanikeech.mp3",
    "bix-yanikech.mp3",
  ],
  "bix yanikeech": [
    "bix-yanikeech.mp3",
    "bix-yanikech.mp3",
  ],

  // Buenos días
  "ma'alob k'iin": "ma-alob-kiin.mp3",
  "maalob k'iin": "ma-alob-kiin.mp3",
  "maalob kiin": "ma-alob-kiin.mp3",

  // Buenas noches
  "ma'alob aak'ab": "maalob-áakab.mp3",
  "maalob aakab": "maalob-áakab.mp3",

  // Muy bien
  "asab ma'alob": "asab-maalob.mp3",
  "asab maalob": "asab-maalob.mp3",

  // Que te vaya bien
  "ka xi'ik tech utsil": [
    "ka-xi´ix-tech-uts.mp3",
    "ka-xiik-tech-utsil.mp3",
  ],
  "ka xi'ik tech uts": [
    "ka-xi´ix-tech-uts.mp3",
    "ka-xiik-tech-utsil.mp3",
  ],
  "ka xiix tech utsil": [
    "ka-xi´ix-tech-uts.mp3",
    "ka-xiik-tech-utsil.mp3",
  ],
  "ka xiik tech utsil": [
    "ka-xi´ix-tech-uts.mp3",
    "ka-xiik-tech-utsil.mp3",
  ],

  // Sí
  "ja'aj": "ja-aj.mp3",
  jaaj: "ja-aj.mp3",

  // No
  "ma'": "ma.mp3",
  ma: "ma.mp3",

  // Perdóname
  "sa'as ten": "saas-ten.mp3",
  "saas ten": "saas-ten.mp3",
};

/*
 * =====================================================
 * TIEMPO
 * public/audio/palabras/tiempo/
 * =====================================================
 */
const TIME_AUDIO_FILES: AudioMap = {
  // Noche
  "aak'ab": "áak´ab.mp3",
  aakab: "áak´ab.mp3",

  // Mediodía
  "chuumuk k'iin": "chúumuk k´iin.mp3",
  "chuumuk kiin": "chúumuk k´iin.mp3",

  // Hoy
  "bejla'e'": ["Bejla'e'.mp3", "Bejla'e.mp3"],
  "bejla'e": ["Bejla'e'.mp3", "Bejla'e.mp3"],
  bejlae: ["Bejla'e'.mp3", "Bejla'e.mp3"],

  // Anochecer
  "eek'eb": "éek´eb.mp3",
  eekeb: "éek´eb.mp3",

  // Atardecer
  "eek'same'en": "éek´same´en.mp3",
  eeksameen: "éek´same´en.mp3",

  // Ayer
  "ho'olje'": ["Ho'olje.mp3", "Ho'olje'.mp3"],
  "ho'olje": ["Ho'olje.mp3", "Ho'olje'.mp3"],
  hoolje: ["Ho'olje.mp3", "Ho'olje'.mp3"],

  // Año
  "ja'ab": "ja´ab.mp3",
  jaab: "ja´ab.mp3",

  // Mañana
  saamal: "Sáamal.mp3",

  // Amanecer
  saastal: "sáastal.mp3",

  // Semana
  semanaa: "semaana.mp3",

  // Momento
  suutuk: "súutuk.mp3",

  // Mes
  winaal: "wináal.mp3",
};

/*
 * =====================================================
 * VERBOS
 * public/audio/palabras/verbos/
 * =====================================================
 */
const VERB_AUDIO_FILES: AudioMap = {
  aantik: "áantik.mp3",
  awat: "awat.mp3",
  baaxal: "báaxal.mp3",
  bin: "bin.mp3",

  "cha'an": "cha´an.mp3",
  chaan: "cha´an.mp3",

  "che'ej": "che´ej.mp3",
  cheej: "che´ej.mp3",

  ilik: "ilik.mp3",
  janal: "janal.mp3",

  // Querer o pedir
  "k'aat": "k´aatik.mp3",
  kaat: "k´aatik.mp3",
  "k'aatik": "k´aatik.mp3",
  kaatik: "k´aatik.mp3",

  "ka'ansik": "ka´ansik.mp3",
  kaansik: "ka´ansik.mp3",

  kaambal: "kaambal.mp3",
  konik: "konik.mp3",
  maan: "máan.mp3",
  manik: "manik.mp3",
  meyaj: "meyaj.mp3",

  // Saber
  ojel: "ojeltik.mp3",
  ojeltik: "ojeltik.mp3",

  "ok'ol": "ok´ol.mp3",
  okol: "ok´ol.mp3",

  "t'aan": "t´aan.mp3",
  taan: "t´aan.mp3",

  taal: "taal.mp3",

  "ts'iib": "ts´íib.mp3",
  tsiib: "ts´íib.mp3",

  // Pensar
  tukul: "tukultik.mp3",
  tukultik: "tukultik.mp3",

  "uk'ul": "uk´ul.mp3",
  ukul: "uk´ul.mp3",

  uuyik: "uuyik.mp3",
  wenel: "wenel.mp3",
  xook: "xook.mp3",
  yaakuntaj: "yaakuntaj.mp3",
};

/*
 * =====================================================
 * NATURALEZA
 * public/audio/palabras/naturaleza/
 * =====================================================
 */
const NATURE_AUDIO_FILES: AudioMap = {
  // Ceiba
  yaaxche: "yáaxché.mp3",

  // Cerro
  witz: "witz.mp3",

  // Luna
  uj: "uj.mp3",

  // Piedra
  tunich: "tunich.mp3",

  // Cenote
  "ts'ono'ot": "ts´ono´ot.mp3",
  tsonoot: "ts´ono´ot.mp3",

  // Hierba o zacate
  "su'uk": "su´uk.mp3",
  suuk: "su´uk.mp3",

  // Manantial
  sayab: "sayab.mp3",

  // Luz
  saasil: "sáasil.mp3",

  // Nube
  muuyal: "múuyal.mp3",

  // Tierra
  "lu'um": "lu´um.mp3",
  luum: "lu´um.mp3",

  // Flor
  lool: "lool.mp3",

  // Milpa
  kool: "kool.mp3",

  // Cielo
  "ka'an": "ka´an.mp3",
  kaan: "ka´an.mp3",

  // Sol
  "k'iin": "k´iin.mp3",
  kiin: "k´iin.mp3",

  // Selva o monte
  "k'aax": "k´áax.mp3",
  kaax: "k´áax.mp3",

  // Agua
  "ja'": "ja´.mp3",
  ja: "ja´.mp3",

  // Viento
  "iik'": "iik´.mp3",
  iik: "iik´.mp3",

  // Oscuridad
  "eek'joch'e'en": "éek´joch´e´en.mp3",
  eekjocheen: "éek´joch´e´en.mp3",

  // Estrella
  "eek'": "eek´.mp3",
  eek: "eek´.mp3",

  // Árbol o madera
  "che'": "che´.mp3",
  che: "che´.mp3",

  // Lluvia
  chaak: "cháak.mp3",

  // Pozo
  "ch'een": "ch´een.mp3",
  cheen: "ch´een.mp3",
};

/*
 * =====================================================
 * FAMILIA
 * public/audio/palabras/familia/
 * =====================================================
 */
const FAMILY_AUDIO_FILES: AudioMap = {
  yuum: "yuum.mp3",

  "xi'ipal": "xi´ipal.mp3",
  xiipal: "xi´ipal.mp3",

  taata: "taata.mp3",

  "suku'un": "suku´un.mp3",
  sukuun: "suku´un.mp3",

  "na'": "na´.mp3",
  na: "na´.mp3",

  nool: "nool.mp3",

  "laak'tsil": "láak´tsil.mp3",
  laaktsil: "láak´tsil.mp3",

  "ko'olel": "ko´olel.mp3",
  koolel: "ko´olel.mp3",

  kiik: "kiik.mp3",

  "iits'in": "iits´in.mp3",
  iitsin: "iits´in.mp3",

  // X-ch'úupal se normaliza como “x ch'uupal”
  "x ch'uupal": "x-ch´uupal.mp3",
  "x chuupal": "x-ch´uupal.mp3",

  paal: "paal.mp3",
  wiinik: "wíinik.mp3",
  iichan: "íichan.mp3",
  chich: "chich.mp3",

  "chan paal": "chan paal.mp3",

  atan: "atan.mp3",

  // También funciona en la sección de Saludos
  "a lak'en": "a lak´en.mp3",
  "a laken": "a lak´en.mp3",
};

/*
 * =====================================================
 * CULTURA
 * public/audio/palabras/cultura/
 * =====================================================
 */
const CULTURE_AUDIO_FILES: AudioMap = {
  // Sandalia
  xanab: "xanab.mp3",

  // Bebida de maíz
  sakab: "sakab.mp3",

  // Lengua o habla
  "t'aan": "t´aan.mp3",
  taan: "t´aan.mp3",

  // Alma
  pixan: "pixan.mp3",

  // Enagua
  piik: "píik.mp3",

  // Baile
  "ook'ot": "óok´ot.mp3",
  ookot: "óok´ot.mp3",

  // Ropa
  "nook'": "nook´.mp3",
  nook: "nook´.mp3",

  // Cultura
  miatsil: "miatsil.mp3",

  // Casa
  naj: "naj.mp3",

  // Lengua maya
  "maaya t'aan": "mayaat´aan.mp3",
  "maya t'aan": "mayaat´aan.mp3",
  "maaya taan": "mayaat´aan.mp3",
  "maya taan": "mayaat´aan.mp3",
  mayataan: "mayaat´aan.mp3",
  maayataan: "mayaat´aan.mp3",

  // Pueblo
  kaaj: "kaaj.mp3",

  // Canto
  "k'aay": "k´aay.mp3",
  kaay: "k´aay.mp3",

  // Huipil
  huipil: "huipil.mp3",

  // Sacerdote o curandero maya
  "h'men": "h´men.mp3",
  hmen: "h´men.mp3",

  // Juego
  baaxal: "báaxal.mp3",

  // Alux
  alux: "alux.mp3",

  // Fuego
  "k'aak'": "k´áak´.mp3",
  "k'aak": "k´áak´.mp3",
  kaak: "k´áak´.mp3",
};

/*
 * Convierte la palabra que aparece en la página a una
 * forma común para poder buscarla en los mapas.
 *
 * Ejemplos:
 * Óox          -> oox
 * Báalam       -> baalam
 * T’u’ul       -> t'u'ul
 * X-ch'úupal   -> x ch'uupal
 */
function normalizeMayaWord(word: string): string {
  return word
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’´`]/g, "'")
    .replace(/[¿?¡!.,;:]/g, "")
    .replace(/[-–—]+/g, " ")
    .replace(/\s+/g, " ");
}

/*
 * Aquí se indica la carpeta de cada categoría.
 *
 * El sistema recopila todos los audios que coincidan.
 * Esto ayuda cuando una palabra aparece en dos categorías.
 */
const AUDIO_SOURCES: AudioSource[] = [
  {
    folder: "palabras/numeros",
    files: NUMBER_AUDIO_FILES,
  },
  {
    folder: "palabras/animales",
    files: ANIMAL_AUDIO_FILES,
  },
  {
    folder: "palabras/cuerpo",
    files: BODY_AUDIO_FILES,
  },
  {
    folder: "palabras/naturaleza",
    files: NATURE_AUDIO_FILES,
  },
  {
    folder: "palabras/familia",
    files: FAMILY_AUDIO_FILES,
  },
  {
    folder: "palabras/cultura",
    files: CULTURE_AUDIO_FILES,
  },
  {
    folder: "palabras/saludos",
    files: GREETING_AUDIO_FILES,
  },
  {
    folder: "palabras/tiempo",
    files: TIME_AUDIO_FILES,
  },
  {
    folder: "palabras/verbos",
    files: VERB_AUDIO_FILES,
  },
];

/*
 * Convierte un nombre en una lista.
 */
function toFileList(audioFile: AudioFile): string[] {
  return Array.isArray(audioFile) ? audioFile : [audioFile];
}

/*
 * Genera variantes por si un archivo usa un tipo diferente
 * de apóstrofo o fue renombrado sin acentos.
 */
function createFileNameVariants(fileName: string): string[] {
  const variants = new Set<string>();

  variants.add(fileName);

  const withStraightApostrophe = fileName.replace(/[’´`]/g, "'");
  variants.add(withStraightApostrophe);
  variants.add(withStraightApostrophe.replace(/'/g, "´"));
  variants.add(withStraightApostrophe.replace(/'/g, "’"));

  const currentVariants = Array.from(variants);

  for (const variant of currentVariants) {
    variants.add(variant.toLowerCase());

    const withoutAccents = variant
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    variants.add(withoutAccents);
    variants.add(withoutAccents.toLowerCase());
  }

  return Array.from(variants);
}

/*
 * Crea un nombre provisional cuando una palabra todavía
 * no está agregada a ningún mapa.
 */
function createProvisionalFileName(word: string): string {
  return normalizeMayaWord(word)
    .replace(/'/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/*
 * Obtiene todas las rutas posibles para una palabra.
 */
function getAudioCandidates(word: string): string[] {
  const normalizedWord = normalizeMayaWord(word);
  const candidates = new Set<string>();

  for (const source of AUDIO_SOURCES) {
    const mappedFile = source.files[normalizedWord];

    if (!mappedFile) {
      continue;
    }

    const fileNames = toFileList(mappedFile);

    for (const fileName of fileNames) {
      const variants = createFileNameVariants(fileName);

      for (const variant of variants) {
        candidates.add(
          `/audio/${source.folder}/${encodeURIComponent(variant)}`,
        );
      }
    }
  }

  /*
   * Si todavía no está configurada, intenta buscarla
   * directamente dentro de public/audio/.
   */
  if (candidates.size === 0) {
    const provisionalName = createProvisionalFileName(word);
    candidates.add(`/audio/${provisionalName}.mp3`);
  }

  return Array.from(candidates);
}

/*
 * Prueba cada ruta hasta encontrar un archivo existente.
 */
function tryToPlayAudio(
  word: string,
  candidates: string[],
  requestId: number,
  index = 0,
): void {
  if (requestId !== playbackRequestId) {
    return;
  }

  if (index >= candidates.length) {
    console.error(
      `No se encontró ningún audio para "${word}".`,
      candidates,
    );

    currentAudio = null;
    return;
  }

  const audioPath = candidates[index];
  const audio = new Audio(audioPath);

  let failed = false;

  audio.preload = "auto";
  currentAudio = audio;

  const tryNextCandidate = () => {
    if (failed || requestId !== playbackRequestId) {
      return;
    }

    failed = true;

    audio.pause();
    audio.currentTime = 0;

    if (currentAudio === audio) {
      currentAudio = null;
    }

    tryToPlayAudio(word, candidates, requestId, index + 1);
  };

  audio.addEventListener("error", tryNextCandidate, {
    once: true,
  });

  audio.addEventListener(
    "ended",
    () => {
      if (
        currentAudio === audio &&
        requestId === playbackRequestId
      ) {
        currentAudio = null;
      }
    },
    {
      once: true,
    },
  );

  audio
    .play()
    .then(() => {
      console.log(`Reproduciendo "${word}": ${audioPath}`);
    })
    .catch(() => {
      tryNextCandidate();
    });
}

/*
 * Reproduce el audio de la palabra seleccionada.
 */
export function playMayaAudio(word: string): void {
  playbackRequestId += 1;

  const requestId = playbackRequestId;

  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }

  const candidates = getAudioCandidates(word);

  tryToPlayAudio(word, candidates, requestId);
}

type SpeakerButtonProps = {
  word: string;
  size?: "sm" | "md";
};

export function SpeakerButton({
  word,
  size = "md",
}: SpeakerButtonProps) {
  const dimensions =
    size === "sm" ? "h-7 w-7" : "h-8 w-8";

  const iconDimensions =
    size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5";

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        playMayaAudio(word);
      }}
      aria-label={`Escuchar pronunciación de ${word}`}
      title={`Escuchar ${word}`}
      className={`
        inline-grid place-items-center
        ${dimensions}
        shrink-0 rounded-full
        border border-cinnabar/40
        bg-cinnabar/10 text-cinnabar
        transition
        hover:bg-cinnabar
        hover:text-primary-foreground
      `}
    >
      <Volume2 className={iconDimensions} />
    </button>
  );
}