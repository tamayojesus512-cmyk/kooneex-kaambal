// Datos del proyecto Káaxal Maaya
// Basados en "U nu'ukbesajil u ts'íibta'al maayat'aan" (INALI, SEP, 2014),
// el alfabeto oficial de la lengua maya yucateca y la tradición oral del Mayab.

export type DictEntry = {
  maya: string;
  es: string;
  tipo: "sust." | "vb." | "adj." | "adv." | "pron." | "interj." | "num.";
  ejemplo?: string;
  ejemploEs?: string;
  categoria: Category;
};

export type Category =
  | "Saludos"
  | "Familia"
  | "Naturaleza"
  | "Cuerpo"
  | "Números"
  | "Comida"
  | "Animales"
  | "Tiempo"
  | "Cultura"
  | "Verbos";

export const categorias: Category[] = [
  "Saludos", "Familia", "Naturaleza", "Cuerpo",
  "Números", "Comida", "Animales", "Tiempo", "Cultura", "Verbos",
];

export const dictionary: DictEntry[] = [
  // Saludos y expresiones
  { maya: "Ba'ax ka wa'alik", es: "¿Qué dices? / ¿Cómo estás?", tipo: "interj.", categoria: "Saludos", ejemplo: "Ba'ax ka wa'alik in wéet xook.", ejemploEs: "¿Qué tal, mi compañero de estudios?" },
  { maya: "Bix a beel", es: "¿Cómo estás? (lit. ¿cómo tu camino?)", tipo: "interj.", categoria: "Saludos" },
  { maya: "Ma'alob", es: "Bien / está bien", tipo: "adj.", categoria: "Saludos" },
  { maya: "Yuum bo'otik", es: "Gracias (lit. Dios te lo pague)", tipo: "interj.", categoria: "Saludos" },
  { maya: "In lak'ech", es: "Tú eres mi otro yo (saludo de hermandad)", tipo: "interj.", categoria: "Saludos" },
  { maya: "A lak'en", es: "Yo soy tu otro tú (respuesta a In lak'ech)", tipo: "interj.", categoria: "Saludos" },
  { maya: "Mix ba'al", es: "De nada / no hay de qué", tipo: "interj.", categoria: "Saludos" },
  { maya: "Sáamal", es: "Mañana / hasta mañana", tipo: "adv.", categoria: "Saludos" },

  // Familia
  { maya: "Na'", es: "madre", tipo: "sust.", categoria: "Familia" },
  { maya: "Taata", es: "padre", tipo: "sust.", categoria: "Familia" },
  { maya: "Paal", es: "niño / hijo", tipo: "sust.", categoria: "Familia" },
  { maya: "Atan", es: "esposa", tipo: "sust.", categoria: "Familia" },
  { maya: "Íicham", es: "esposo", tipo: "sust.", categoria: "Familia" },
  { maya: "Suku'un", es: "hermano mayor", tipo: "sust.", categoria: "Familia" },
  { maya: "Kiik", es: "hermana mayor", tipo: "sust.", categoria: "Familia" },
  { maya: "Íits'in", es: "hermano/a menor", tipo: "sust.", categoria: "Familia" },
  { maya: "Nool", es: "abuelo", tipo: "sust.", categoria: "Familia" },
  { maya: "Cha'an", es: "abuela", tipo: "sust.", categoria: "Familia" },

  // Naturaleza
  { maya: "K'iin", es: "sol / día", tipo: "sust.", categoria: "Naturaleza", ejemplo: "Jach k'iin bejla'e'.", ejemploEs: "Hace mucho sol hoy." },
  { maya: "Uj", es: "luna / mes", tipo: "sust.", categoria: "Naturaleza" },
  { maya: "Eek'", es: "estrella", tipo: "sust.", categoria: "Naturaleza" },
  { maya: "Ka'an", es: "cielo", tipo: "sust.", categoria: "Naturaleza" },
  { maya: "Lu'um", es: "tierra", tipo: "sust.", categoria: "Naturaleza" },
  { maya: "Ja'", es: "agua / lluvia", tipo: "sust.", categoria: "Naturaleza" },
  { maya: "K'áax", es: "monte / selva", tipo: "sust.", categoria: "Naturaleza" },
  { maya: "Yáaxche'", es: "ceiba (árbol sagrado)", tipo: "sust.", categoria: "Naturaleza" },
  { maya: "Cha'an", es: "cenote", tipo: "sust.", categoria: "Naturaleza" },
  { maya: "Iik'", es: "viento", tipo: "sust.", categoria: "Naturaleza" },

  // Cuerpo
  { maya: "Puksi'ik'al", es: "corazón", tipo: "sust.", categoria: "Cuerpo" },
  { maya: "Pool", es: "cabeza", tipo: "sust.", categoria: "Cuerpo" },
  { maya: "Ich", es: "ojo / cara", tipo: "sust.", categoria: "Cuerpo" },
  { maya: "Chi'", es: "boca", tipo: "sust.", categoria: "Cuerpo" },
  { maya: "Ni'", es: "nariz", tipo: "sust.", categoria: "Cuerpo" },
  { maya: "Xikin", es: "oreja", tipo: "sust.", categoria: "Cuerpo" },
  { maya: "K'ab", es: "mano / brazo", tipo: "sust.", categoria: "Cuerpo" },
  { maya: "Ook", es: "pie", tipo: "sust.", categoria: "Cuerpo" },

  // Números
  { maya: "Jun", es: "uno", tipo: "num.", categoria: "Números" },
  { maya: "Ka'", es: "dos", tipo: "num.", categoria: "Números" },
  { maya: "Óox", es: "tres", tipo: "num.", categoria: "Números" },
  { maya: "Kan", es: "cuatro", tipo: "num.", categoria: "Números" },
  { maya: "Jo'", es: "cinco", tipo: "num.", categoria: "Números" },
  { maya: "Wak", es: "seis", tipo: "num.", categoria: "Números" },
  { maya: "Uk'", es: "siete", tipo: "num.", categoria: "Números" },
  { maya: "Waxak", es: "ocho", tipo: "num.", categoria: "Números" },
  { maya: "Bolon", es: "nueve", tipo: "num.", categoria: "Números" },
  { maya: "Lajun", es: "diez", tipo: "num.", categoria: "Números" },

  // Comida
  { maya: "Waaj", es: "tortilla / pan", tipo: "sust.", categoria: "Comida" },
  { maya: "Ixi'im", es: "maíz", tipo: "sust.", categoria: "Comida" },
  { maya: "Bu'ul", es: "frijol", tipo: "sust.", categoria: "Comida" },
  { maya: "Iik", es: "chile", tipo: "sust.", categoria: "Comida" },
  { maya: "Kakaw", es: "cacao", tipo: "sust.", categoria: "Comida" },
  { maya: "Sakan", es: "masa", tipo: "sust.", categoria: "Comida" },
  { maya: "Pib", es: "horno bajo tierra / tamal asado", tipo: "sust.", categoria: "Comida" },
  { maya: "Kab", es: "miel", tipo: "sust.", categoria: "Comida" },

  // Animales
  { maya: "Peek'", es: "perro", tipo: "sust.", categoria: "Animales" },
  { maya: "Miis", es: "gato", tipo: "sust.", categoria: "Animales" },
  { maya: "Ch'íich'", es: "pájaro", tipo: "sust.", categoria: "Animales" },
  { maya: "Kaan", es: "serpiente", tipo: "sust.", categoria: "Animales" },
  { maya: "Báalam", es: "jaguar", tipo: "sust.", categoria: "Animales" },
  { maya: "Kéej", es: "venado", tipo: "sust.", categoria: "Animales" },
  { maya: "Káax", es: "gallina", tipo: "sust.", categoria: "Animales" },
  { maya: "T'u'ul", es: "conejo", tipo: "sust.", categoria: "Animales" },
  { maya: "Kay", es: "pez", tipo: "sust.", categoria: "Animales" },
  { maya: "Ulun", es: "pavo / guajolote", tipo: "sust.", categoria: "Animales" },

  // Tiempo
  { maya: "Bejla'e'", es: "hoy", tipo: "adv.", categoria: "Tiempo" },
  { maya: "Ho'olje'", es: "ayer", tipo: "adv.", categoria: "Tiempo" },
  { maya: "Sáamal", es: "mañana", tipo: "adv.", categoria: "Tiempo" },
  { maya: "Áak'ab", es: "noche", tipo: "sust.", categoria: "Tiempo" },
  { maya: "Ja'ab", es: "año", tipo: "sust.", categoria: "Tiempo" },
  { maya: "Éek'same'en", es: "madrugada", tipo: "sust.", categoria: "Tiempo" },

  // Cultura
  { maya: "Kaaj", es: "pueblo / comunidad", tipo: "sust.", categoria: "Cultura" },
  { maya: "Miatsil", es: "cultura / costumbre", tipo: "sust.", categoria: "Cultura" },
  { maya: "T'aan", es: "palabra / lengua", tipo: "sust.", categoria: "Cultura" },
  { maya: "Maayat'aan", es: "lengua maya", tipo: "sust.", categoria: "Cultura" },
  { maya: "Pixan", es: "alma / espíritu", tipo: "sust.", categoria: "Cultura" },
  { maya: "Alux", es: "duende guardián del monte", tipo: "sust.", categoria: "Cultura" },
  { maya: "H'men", es: "sacerdote / curandero maya", tipo: "sust.", categoria: "Cultura" },
  { maya: "Sakab", es: "bebida ritual de maíz", tipo: "sust.", categoria: "Cultura" },

  // Verbos
  { maya: "Kaambal", es: "aprender", tipo: "vb.", categoria: "Verbos" },
  { maya: "Ka'ansik", es: "enseñar", tipo: "vb.", categoria: "Verbos" },
  { maya: "Xook", es: "leer / contar", tipo: "vb.", categoria: "Verbos" },
  { maya: "Ts'íib", es: "escribir", tipo: "vb.", categoria: "Verbos" },
  { maya: "Janal", es: "comer", tipo: "vb.", categoria: "Verbos" },
  { maya: "Uk'ul", es: "beber", tipo: "vb.", categoria: "Verbos" },
  { maya: "Wenel", es: "dormir", tipo: "vb.", categoria: "Verbos" },
  { maya: "Máan", es: "caminar / pasar", tipo: "vb.", categoria: "Verbos" },
  { maya: "Yaakuntaj", es: "amar", tipo: "vb.", categoria: "Verbos" },
  { maya: "Ilik", es: "ver", tipo: "vb.", categoria: "Verbos" },
];

// Frases sabias para el carrusel (algunas tomadas del PDF INALI 2014)
export const wisdom = [
  { maya: "Maayat'aane' u puksi'ik'al kaaj, u miatsil u muuk'.", es: "La lengua maya es el corazón del pueblo y la fuerza de su cultura.", source: "Káajbal · INALI 2014" },
  { maya: "Yáaxche' u tuukulil le ka'ano' yéetel le lu'umo'.", es: "La ceiba es el pensamiento del cielo y de la tierra.", source: "Cosmovisión" },
  { maya: "Jach uts u meentik máax ku kaambal.", es: "Es muy bueno aquel que aprende.", source: "Proverbio yucateco" },
  { maya: "Le máax ku ka'ansik t'aan, ku ka'ansik kuxtal.", es: "Quien enseña la palabra, enseña la vida.", source: "Sabiduría Maya" },
  { maya: "I'inaje' k'a'abet u pa'ak'al.", es: "La semilla necesita ser sembrada.", source: "U nu'ukbesajil §2.5" },
  { maya: "Éek'same'en ka'aj bino'on janal.", es: "Era de madrugada cuando fuimos a comer.", source: "U nu'ukbesajil §2.5" },
  { maya: "Tu juunal ku máan le ch'íich'o' ti' le k'áaxo'.", es: "Solo va el pájaro por el monte.", source: "Tradición oral" },
  { maya: "In lak'ech — a lak'en.", es: "Tú eres mi otro yo — yo soy tu otro tú.", source: "Filosofía maya" },
];

// Relatos / leyendas
export const relatos = [
  {
    id: "xtabay",
    titulo: "La Xtabay",
    subtitulo: "U Xtabay — La mujer del ceibo",
    resumen: "Bajo la luna del Mayab, una mujer de larga cabellera negra peina sus cabellos junto al tronco de la ceiba. Quien la sigue, no regresa.",
    relato: [
      "Cuentan los abuelos del Mayab que en las noches sin viento, cuando la luna se cuelga del yáaxche' (ceiba), una mujer hermosa de cabellos largos aparece peinándose con espina de henequén. Viste un huipil blanco impecable y huele a flor de xtabentún.",
      "Su nombre es la Xtabay. A los hombres que vagan solos por los caminos del monte —sobre todo a aquellos que han bebido o que llevan mal corazón— los llama con dulzura. Quien se acerca, encuentra de pronto que la mujer se transforma en árbol espinoso, en serpiente o en una nube de aire frío, y al amanecer aparece perdido, enfermo o no aparece más.",
      "La leyenda enseña respeto: el monte tiene dueños y la noche tiene sus propias reglas. Caminar el k'áax (monte) sin permiso, sin pedir licencia al Yum K'áax, es exponerse a encontrar a la Xtabay.",
    ],
  },
  {
    id: "aluxes",
    titulo: "Los Aluxes",
    subtitulo: "Aluxo'ob — Los guardianes del monte",
    resumen: "Pequeños seres de barro que cuidan la milpa, los cenotes y los caminos antiguos. Si los respetas, te protegen; si los olvidas, te juegan bromas.",
    relato: [
      "Los aluxo'ob son seres pequeños, del tamaño de un niño, modelados —según la tradición— de barro y maíz por el h'men (sacerdote maya) para cuidar la milpa. Llevan sombrero, huaraches y a veces un arco diminuto.",
      "Cuidan los sembradíos, los cenotes y las ruinas. Para que trabajen, el dueño de la milpa les ofrece sakab (bebida de maíz), miel y velas durante siete años. Pasado ese tiempo, deben ser encerrados en una casita de piedra para que descansen.",
      "Si se les ignora o se les ofende, hacen travesuras: silban en la noche, mueven herramientas, esconden objetos, o enferman al ganado. Hasta hoy, en muchos pueblos del Mayab, antes de construir o sembrar se pide permiso a los aluxes con una ofrenda.",
    ],
  },
  {
    id: "hanal-pixan",
    titulo: "Hanal Pixán",
    subtitulo: "Janal Pixan — La comida de las ánimas",
    resumen: "Del 31 de octubre al 2 de noviembre, las familias yucatecas reciben a sus muertos con un altar de pib, xpelón, frutas y velas.",
    relato: [
      "Hanal Pixán significa literalmente \"comida de las ánimas\". Durante tres días —el 31 de octubre dedicado a los niños difuntos (u hanal palal), el 1 de noviembre a los adultos (u hanal nucuch uinicoob) y el 2 de noviembre a todas las ánimas (u hanal pixanoob)— las familias del Mayab montan altares para recibir a quienes ya partieron.",
      "El altar lleva mantel bordado, veladoras, flores de xpujuk y x't'eel, fotografías de los difuntos, atole nuevo, jícaras con agua, frutas de temporada y, sobre todo, el pib o mucbipollo: un gran tamal de masa rellena de pollo y cerdo cocido bajo tierra entre piedras calientes y hojas de plátano.",
      "Las puertas se dejan entreabiertas, una vela enciende el camino y se llama por su nombre a los muertos para que vengan a saborear lo suyo. Es una de las tradiciones más vivas del pueblo maya yucateco contemporáneo.",
    ],
  },
];

// Banco de preguntas para el quiz (multiple choice)
export type QuizQuestion = {
  pregunta: string;
  opciones: string[];
  correcta: number; // índice
  explicacion: string;
};

export const quizQuestions: QuizQuestion[] = [
  { pregunta: "¿Qué significa K'iin en español?", opciones: ["Luna", "Sol / día", "Estrella", "Cielo"], correcta: 1, explicacion: "K'iin significa sol y también día. Es una de las palabras más sagradas del calendario maya." },
  { pregunta: "¿Cómo se dice 'agua' en maya?", opciones: ["Lu'um", "Ja'", "Ka'an", "Iik'"], correcta: 1, explicacion: "Ja' significa agua y también lluvia. Lu'um es tierra, Ka'an es cielo, Iik' es viento." },
  { pregunta: "¿Qué es el Yáaxche'?", opciones: ["Una bebida ritual", "El árbol ceiba sagrado", "Un instrumento musical", "Un cenote"], correcta: 1, explicacion: "El yáaxche' (ceiba) es el árbol cósmico que une cielo, tierra e inframundo en la cosmovisión maya." },
  { pregunta: "¿Cómo respondes a 'In lak'ech'?", opciones: ["Ma'alob", "A lak'en", "Yuum bo'otik", "Mix ba'al"], correcta: 1, explicacion: "'In lak'ech' significa 'tú eres mi otro yo' y se responde 'A lak'en' — 'yo soy tu otro tú'." },
  { pregunta: "¿Qué número es Óox?", opciones: ["Uno", "Dos", "Tres", "Cuatro"], correcta: 2, explicacion: "Óox es tres. La serie es: Jun (1), Ka' (2), Óox (3), Kan (4), Jo' (5)." },
  { pregunta: "¿Qué significa Puksi'ik'al?", opciones: ["Cabeza", "Mano", "Corazón", "Ojo"], correcta: 2, explicacion: "Puksi'ik'al es corazón, centro vital del ser en la cosmovisión maya." },
  { pregunta: "¿Quiénes son los aluxo'ob?", opciones: ["Sacerdotes mayas", "Duendes guardianes del monte", "Guerreros antiguos", "Espíritus de muertos"], correcta: 1, explicacion: "Los aluxo'ob son pequeños guardianes del monte y la milpa, tradicionalmente creados por el h'men." },
  { pregunta: "¿Cómo se dice 'gracias' en maya?", opciones: ["Ma'alob", "Mix ba'al", "Yuum bo'otik", "Bix a beel"], correcta: 2, explicacion: "Yuum bo'otik literalmente significa 'Dios te lo pague' y es la forma tradicional de agradecer." },
  { pregunta: "¿Qué es Hanal Pixán?", opciones: ["Una danza ritual", "La comida de las ánimas", "Un tipo de tamal", "El año nuevo maya"], correcta: 1, explicacion: "Hanal Pixán es la tradición yucateca de recibir a los muertos del 31 de octubre al 2 de noviembre con altar y pib." },
  { pregunta: "¿Qué significa Maayat'aan?", opciones: ["Tierra maya", "Lengua maya", "Pueblo maya", "Casa maya"], correcta: 1, explicacion: "Maayat'aan = Maaya (maya) + t'aan (palabra/lengua) = lengua maya." },
  { pregunta: "¿Cuál es el alimento base de la cultura maya?", opciones: ["Bu'ul (frijol)", "Ixi'im (maíz)", "Iik (chile)", "Kakaw (cacao)"], correcta: 1, explicacion: "El ixi'im (maíz) es la planta sagrada. Según el Popol Vuh, los humanos fueron creados de masa de maíz." },
  { pregunta: "¿Qué significa Bejla'e'?", opciones: ["Ayer", "Hoy", "Mañana", "Anoche"], correcta: 1, explicacion: "Bejla'e' = hoy. Ho'olje' = ayer. Sáamal = mañana." },
];

// Palabra del día — banco de palabras a adivinar
// El usuario ve la pista en español y debe escribir la palabra (en español).
// Al acertar o tras 3 intentos se revela la palabra maya y su significado completo.
export type DailyWord = {
  pista: string;
  respuestas: string[]; // respuestas válidas en español (lowercase, sin acentos en la comparación)
  respuestaPrincipal: string;
  maya: string;
  significado: string;
  curiosidad: string;
};

export const dailyWords: DailyWord[] = [
  {
    pista: "Árbol sagrado de los mayas. Sus raíces tocan el inframundo, su tronco la tierra y su copa el cielo.",
    respuestas: ["ceiba", "yaxche"],
    respuestaPrincipal: "Ceiba",
    maya: "Yáaxche'",
    significado: "Árbol cósmico que une los tres niveles del universo maya: ka'an (cielo), lu'um (tierra) y xibalbá (inframundo).",
    curiosidad: "Bajo la sombra del yáaxche' se reunían los ancianos para decidir los asuntos del pueblo.",
  },
  {
    pista: "Bebida ritual hecha de maíz que se ofrece a los aluxes y a los dioses del monte.",
    respuestas: ["sakab", "saka"],
    respuestaPrincipal: "Sakab",
    maya: "Sakab",
    significado: "Bebida sagrada de masa de maíz nuevo disuelta en agua, sin fermentar, que se ofrece a las deidades.",
    curiosidad: "El h'men prepara el sakab antes del amanecer para que los espíritus lo reciban frío y puro.",
  },
  {
    pista: "Centro vital del ser humano según la cosmovisión maya. En español también lo llamamos así.",
    respuestas: ["corazon", "corazón"],
    respuestaPrincipal: "Corazón",
    maya: "Puksi'ik'al",
    significado: "No solo el órgano físico, sino la sede del pensamiento, la voluntad y la memoria.",
    curiosidad: "Decir 'u puksi'ik'al kaaj' (el corazón del pueblo) significa la lengua y la cultura misma.",
  },
  {
    pista: "Felino sagrado que representa el poder y la noche. Los gobernantes mayas vestían su piel.",
    respuestas: ["jaguar", "balam", "bálam"],
    respuestaPrincipal: "Jaguar",
    maya: "Báalam",
    significado: "Jaguar; también significa 'sacerdote' o 'protector' en contextos rituales.",
    curiosidad: "Los Bacabes Báalam eran los cuatro jaguares que sostenían las esquinas del cielo.",
  },
  {
    pista: "Pequeños duendes de barro y maíz que cuidan la milpa. Se les ofrenda miel y velas.",
    respuestas: ["aluxes", "alux", "aluxo'ob"],
    respuestaPrincipal: "Aluxes",
    maya: "Aluxo'ob",
    significado: "Guardianes diminutos del monte y la milpa, modelados por el h'men con barro, cera y la sangre del dueño.",
    curiosidad: "Si silbas en la noche del monte, puede que un alux te conteste — entonces no debes mirar atrás.",
  },
  {
    pista: "La comida de las ánimas. Tradición yucateca del 31 de octubre al 2 de noviembre.",
    respuestas: ["hanal pixan", "hanal pixán", "hanalpixan"],
    respuestaPrincipal: "Hanal Pixán",
    maya: "Janal Pixan",
    significado: "Literalmente 'comida de las almas'. Tres días para recibir a los muertos con altar y pib.",
    curiosidad: "El plato central es el mucbipollo: un gran tamal cocido bajo tierra entre piedras calientes.",
  },
  {
    pista: "Pozo natural de agua dulce, abertura sagrada hacia el inframundo.",
    respuestas: ["cenote", "ts'ono'ot"],
    respuestaPrincipal: "Cenote",
    maya: "Ts'ono'ot",
    significado: "Depósito natural de agua dulce formado en la roca caliza; entrada al Xibalbá.",
    curiosidad: "Solo en la península de Yucatán hay más de 6,000 cenotes mapeados — y muchos aún por descubrir.",
  },
  {
    pista: "Saludo maya de hermandad que significa 'tú eres mi otro yo'.",
    respuestas: ["in lakech", "in lak'ech", "inlakech"],
    respuestaPrincipal: "In Lak'ech",
    maya: "In lak'ech",
    significado: "Tú eres mi otro yo. Filosofía maya de unidad: el otro soy yo mismo en distinta forma.",
    curiosidad: "Se responde 'A lak'en' — yo soy tu otro tú. Cierra el círculo del reconocimiento mutuo.",
  },

  
];

// Devuelve la palabra del día según el día del año (rotación diaria estable)
export function getDailyWord(date = new Date()): DailyWord {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const day = Math.floor(diff / (1000 * 60 * 60 * 24));
  return dailyWords[day % dailyWords.length];
}

export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['']/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// ────────────────────────────────────────────────────────────────────────
// Ampliación de vocabulario (curado de UADY / INALI / Bolles)
// ────────────────────────────────────────────────────────────────────────
dictionary.push(
  // Saludos / cortesía
  { maya: "Bix yanikech", es: "¿cómo estás?", tipo: "interj.", categoria: "Saludos" },
  { maya: "Ma'alob k'iin", es: "buenos días", tipo: "interj.", categoria: "Saludos" },
  { maya: "Ma'alob áak'ab", es: "buenas noches", tipo: "interj.", categoria: "Saludos" },
  { maya: "Asab ma'alob", es: "muy bien", tipo: "interj.", categoria: "Saludos" },
  { maya: "Ka xi'ik tech utsil", es: "que te vaya bien", tipo: "interj.", categoria: "Saludos" },
  { maya: "Ja'aj", es: "sí (es verdad)", tipo: "interj.", categoria: "Saludos" },
  { maya: "Ma'", es: "no", tipo: "interj.", categoria: "Saludos" },
  { maya: "Sa'as ten", es: "perdóname", tipo: "interj.", categoria: "Saludos" },

  // Familia
  { maya: "Yuum", es: "señor / padre respetuoso", tipo: "sust.", categoria: "Familia" },
  { maya: "Ko'olel", es: "mujer", tipo: "sust.", categoria: "Familia" },
  { maya: "Xi'ipal", es: "muchacho / joven", tipo: "sust.", categoria: "Familia" },
  { maya: "X-ch'úupal", es: "muchacha / joven", tipo: "sust.", categoria: "Familia" },
  { maya: "Chan paal", es: "bebé / pequeñín", tipo: "sust.", categoria: "Familia" },
  { maya: "Wíinik", es: "hombre / persona", tipo: "sust.", categoria: "Familia" },
  { maya: "Láak'tsil", es: "pariente / familia", tipo: "sust.", categoria: "Familia" },

  // Naturaleza
  { maya: "Múuyal", es: "nube", tipo: "sust.", categoria: "Naturaleza" },
  { maya: "Cháak", es: "lluvia / dios de la lluvia", tipo: "sust.", categoria: "Naturaleza" },
  { maya: "Ts'ono'ot", es: "cenote", tipo: "sust.", categoria: "Naturaleza" },
  { maya: "Witz", es: "cerro / montaña", tipo: "sust.", categoria: "Naturaleza" },
  { maya: "Sayab", es: "manantial", tipo: "sust.", categoria: "Naturaleza" },
  { maya: "Kool", es: "milpa", tipo: "sust.", categoria: "Naturaleza" },
  { maya: "Lool", es: "flor", tipo: "sust.", categoria: "Naturaleza" },
  { maya: "Che'", es: "árbol / madera", tipo: "sust.", categoria: "Naturaleza" },
  { maya: "Su'uk", es: "hierba / zacate", tipo: "sust.", categoria: "Naturaleza" },
  { maya: "Tunich", es: "piedra", tipo: "sust.", categoria: "Naturaleza" },
  { maya: "Sáasil", es: "luz / claridad", tipo: "sust.", categoria: "Naturaleza" },
  { maya: "Éek'joch'e'en", es: "oscuridad", tipo: "sust.", categoria: "Naturaleza" },

  // Cuerpo
  { maya: "Nak'", es: "vientre / estómago", tipo: "sust.", categoria: "Cuerpo" },
  { maya: "Bak'el", es: "cuerpo / carne", tipo: "sust.", categoria: "Cuerpo" },
  { maya: "Kaal", es: "cuello / garganta", tipo: "sust.", categoria: "Cuerpo" },
  { maya: "Tseem", es: "pecho", tipo: "sust.", categoria: "Cuerpo" },
  { maya: "Aak'", es: "lengua", tipo: "sust.", categoria: "Cuerpo" },
  { maya: "Koj", es: "diente", tipo: "sust.", categoria: "Cuerpo" },
  { maya: "Tsa'ay", es: "cabello", tipo: "sust.", categoria: "Cuerpo" },
  { maya: "Yáak'il", es: "sangre", tipo: "sust.", categoria: "Cuerpo" },

  // Números (11–20 + decenas)
  { maya: "Buluk", es: "once", tipo: "num.", categoria: "Números" },
  { maya: "Lajka'", es: "doce", tipo: "num.", categoria: "Números" },
  { maya: "Óoxlajun", es: "trece", tipo: "num.", categoria: "Números" },
  { maya: "Kanlajun", es: "catorce", tipo: "num.", categoria: "Números" },
  { maya: "Jo'olajun", es: "quince", tipo: "num.", categoria: "Números" },
  { maya: "Waklajun", es: "dieciséis", tipo: "num.", categoria: "Números" },
  { maya: "Uklajun", es: "diecisiete", tipo: "num.", categoria: "Números" },
  { maya: "Waxaklajun", es: "dieciocho", tipo: "num.", categoria: "Números" },
  { maya: "Bolonlajun", es: "diecinueve", tipo: "num.", categoria: "Números" },
  { maya: "Junk'áal", es: "veinte", tipo: "num.", categoria: "Números" },
  { maya: "Ka'k'áal", es: "cuarenta", tipo: "num.", categoria: "Números" },
  { maya: "Óoxk'áal", es: "sesenta", tipo: "num.", categoria: "Números" },

  // Comida
  { maya: "Sikil", es: "pepita de calabaza", tipo: "sust.", categoria: "Comida" },
  { maya: "K'uum", es: "calabaza", tipo: "sust.", categoria: "Comida" },
  { maya: "P'aak", es: "tomate", tipo: "sust.", categoria: "Comida" },
  { maya: "Ts'iin", es: "yuca", tipo: "sust.", categoria: "Comida" },
  { maya: "Iis", es: "camote", tipo: "sust.", categoria: "Comida" },
  { maya: "Ch'ujuk", es: "dulce", tipo: "adj.", categoria: "Comida" },
  { maya: "K'aaj", es: "amargo", tipo: "adj.", categoria: "Comida" },
  { maya: "Pa'", es: "agrio", tipo: "adj.", categoria: "Comida" },
  { maya: "K'iináal", es: "caliente", tipo: "adj.", categoria: "Comida" },
  { maya: "Síis", es: "frío", tipo: "adj.", categoria: "Comida" },
  { maya: "Sa'", es: "atole", tipo: "sust.", categoria: "Comida" },
  { maya: "Chuk", es: "carbón / brasa", tipo: "sust.", categoria: "Comida" },

  // Animales
  { maya: "Ch'óom", es: "zopilote", tipo: "sust.", categoria: "Animales" },
  { maya: "Ulun", es: "pavo / guajolote", tipo: "sust.", categoria: "Animales" },
  { maya: "Áak", es: "tortuga", tipo: "sust.", categoria: "Animales" },
  { maya: "Aayin", es: "lagarto / cocodrilo", tipo: "sust.", categoria: "Animales" },
  { maya: "K'a'naab", es: "iguana", tipo: "sust.", categoria: "Animales" },
  { maya: "Wakax", es: "vaca / res", tipo: "sust.", categoria: "Animales" },
  { maya: "Tsíimin", es: "caballo", tipo: "sust.", categoria: "Animales" },
  { maya: "K'éek'en", es: "cerdo", tipo: "sust.", categoria: "Animales" },
  { maya: "Tukub", es: "tórtola", tipo: "sust.", categoria: "Animales" },
  { maya: "Kaab", es: "abeja / miel", tipo: "sust.", categoria: "Animales" },
  { maya: "Xnuuk", es: "tarántula", tipo: "sust.", categoria: "Animales" },
  { maya: "Sina'an", es: "alacrán", tipo: "sust.", categoria: "Animales" },

  // Tiempo
  { maya: "Sáastal", es: "amanecer", tipo: "sust.", categoria: "Tiempo" },
  { maya: "Chúumuk k'iin", es: "mediodía", tipo: "sust.", categoria: "Tiempo" },
  { maya: "Éek'eb", es: "anochecer", tipo: "sust.", categoria: "Tiempo" },
  { maya: "Semaana", es: "semana", tipo: "sust.", categoria: "Tiempo" },
  { maya: "Wináal", es: "mes (veintena)", tipo: "sust.", categoria: "Tiempo" },
  { maya: "Súutuk", es: "momento / rato", tipo: "sust.", categoria: "Tiempo" },

  // Cultura
  { maya: "Naj", es: "casa", tipo: "sust.", categoria: "Cultura" },
  { maya: "K'áak'", es: "fuego", tipo: "sust.", categoria: "Cultura" },
  { maya: "Nook'", es: "ropa", tipo: "sust.", categoria: "Cultura" },
  { maya: "Xanab", es: "huarache / zapato", tipo: "sust.", categoria: "Cultura" },
  { maya: "Píik", es: "fustán / enagua", tipo: "sust.", categoria: "Cultura" },
  { maya: "Hipil", es: "huipil (vestido tradicional)", tipo: "sust.", categoria: "Cultura" },
  { maya: "Báaxal", es: "juego", tipo: "sust.", categoria: "Cultura" },
  { maya: "K'aay", es: "canto", tipo: "sust.", categoria: "Cultura" },
  { maya: "Óok'ot", es: "danza", tipo: "sust.", categoria: "Cultura" },

  // Verbos
  { maya: "Bin", es: "ir", tipo: "vb.", categoria: "Verbos" },
  { maya: "Taal", es: "venir", tipo: "vb.", categoria: "Verbos" },
  { maya: "Cha'an", es: "ver / mirar (espectáculo)", tipo: "vb.", categoria: "Verbos" },
  { maya: "U'uy", es: "oír / sentir", tipo: "vb.", categoria: "Verbos" },
  { maya: "T'aan", es: "hablar", tipo: "vb.", categoria: "Verbos" },
  { maya: "Báaxal", es: "jugar", tipo: "vb.", categoria: "Verbos" },
  { maya: "Meyaj", es: "trabajar", tipo: "vb.", categoria: "Verbos" },
  { maya: "Áantik", es: "ayudar", tipo: "vb.", categoria: "Verbos" },
  { maya: "K'áat", es: "querer / pedir", tipo: "vb.", categoria: "Verbos" },
  { maya: "Ojel", es: "saber", tipo: "vb.", categoria: "Verbos" },
  { maya: "Tukul", es: "pensar", tipo: "vb.", categoria: "Verbos" },
  { maya: "Manik", es: "comprar", tipo: "vb.", categoria: "Verbos" },
  { maya: "Konik", es: "vender", tipo: "vb.", categoria: "Verbos" },
  { maya: "Awat", es: "gritar", tipo: "vb.", categoria: "Verbos" },
  { maya: "Che'ej", es: "reír", tipo: "vb.", categoria: "Verbos" },
  { maya: "Ok'ol", es: "llorar", tipo: "vb.", categoria: "Verbos" },
);

// Alfabeto maya (orden oficial INALI 2014)
export const mayaAlphabet = [
  "a","b","ch","ch'","e","i","j","k","k'","l","m","n","o","p","p'","s","t","t'","ts","ts'","u","w","x","y",
];

// Devuelve la letra inicial maya de una palabra (respeta dígrafos y glotalizadas)
export function mayaInitial(word: string): string {
  const w = word.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const ordered = ["ch'","ts'","ch","ts","k'","p'","t'","b","e","i","j","k","l","m","n","o","p","s","t","u","w","x","y","a"];
  for (const l of ordered) if (w.startsWith(l)) return l;
  return w.charAt(0);
}

// Distancia Levenshtein (capada para fuzzy)
export function levenshtein(a: string, b: string, max = 3): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const dp = Array.from({ length: a.length + 1 }, (_, i) => i);
  for (let j = 1; j <= b.length; j++) {
    let prev = dp[0]; dp[0] = j;
    let best = j;
    for (let i = 1; i <= a.length; i++) {
      const tmp = dp[i];
      dp[i] = a[i - 1] === b[j - 1] ? prev : 1 + Math.min(prev, dp[i], dp[i - 1]);
      if (dp[i] < best) best = dp[i];
      prev = tmp;
    }
    if (best > max) return max + 1;
  }
  return dp[a.length];
}

// Búsqueda fuzzy bidireccional
export type SearchHit = { entry: DictEntry; score: number; field: "maya" | "es" };
export function smartSearch(q: string, dir: "maya-es" | "es-maya" = "maya-es", limit = 20): SearchHit[] {
  const nq = normalize(q);
  if (!nq) return [];
  const hits: SearchHit[] = [];
  for (const entry of dictionary) {
    const fields: { field: "maya" | "es"; value: string }[] = dir === "maya-es"
      ? [{ field: "maya", value: normalize(entry.maya) }, { field: "es", value: normalize(entry.es) }]
      : [{ field: "es", value: normalize(entry.es) }, { field: "maya", value: normalize(entry.maya) }];
    let best = Infinity;
    let bestField: "maya" | "es" = fields[0].field;
    for (const f of fields) {
      let s = Infinity;
      if (f.value === nq) s = 0;
      else if (f.value.startsWith(nq)) s = 1;
      else if (f.value.includes(nq)) s = 2;
      else if (f.value.split(/\s+/).some(w => w.startsWith(nq))) s = 3;
      else {
        const lev = levenshtein(nq, f.value, 2);
        if (lev <= 2) s = 5 + lev;
      }
      if (s < best) { best = s; bestField = f.field; }
    }
    if (best < Infinity) hits.push({ entry, score: best, field: bestField });
  }
  hits.sort((a, b) => a.score - b.score);
  return hits.slice(0, limit);
}

// ────────────────────────────────────────────────────────────────────────
// Lecciones (sección Aprende)
// ────────────────────────────────────────────────────────────────────────
export type Leccion = {
  slug: string;
  titulo: string;
  resumen: string;
  intro: string;
  contenido: { maya: string; es: string; nota?: string }[];
  gramatica?: string;
};

export const lecciones: Leccion[] = [
  {
    slug: "alfabeto",
    titulo: "Alfabeto y pronunciación",
    resumen: "Las 20 consonantes y 5 vocales del maya yucateco, con sus glotalizadas.",
    intro: "El maya yucateco usa el alfabeto latino con dígrafos (ch, ts) y consonantes glotalizadas marcadas con apóstrofo (k', t', p', ch', ts').",
    contenido: [
      { maya: "a, e, i, o, u", es: "vocales cortas", nota: "Existen también largas (aa) y rearticuladas (a'a)." },
      { maya: "k'iin", es: "sol", nota: "La k' es una k glotalizada: cierre brusco de garganta." },
      { maya: "ch'íich'", es: "pájaro", nota: "ch' es la ch glotalizada." },
      { maya: "ts'íib", es: "escribir", nota: "ts' es la ts glotalizada." },
      { maya: "Yáaxche'", es: "ceiba", nota: "Una vocal larga (áa) y final glotal (')." },
    ],
    gramatica: "Las vocales tienen 5 tonos: corta (a), larga (aa), glotalizada ('a), larga-alta (áa), rearticulada (a'a).",
  },
  {
    slug: "saludos",
    titulo: "Saludos básicos",
    resumen: "Formas comunes de saludar y agradecer en la vida diaria del Mayab.",
    intro: "Saludar bien abre la conversación. En maya, el saludo siempre lleva intención.",
    contenido: [
      { maya: "Bix a beel", es: "¿cómo estás? (lit. ¿cómo tu camino?)" },
      { maya: "Ma'alob", es: "bien" },
      { maya: "Asab ma'alob", es: "muy bien" },
      { maya: "Yuum bo'otik", es: "gracias" },
      { maya: "Mix ba'al", es: "de nada" },
      { maya: "In lak'ech", es: "tú eres mi otro yo", nota: "Se responde 'A lak'en'." },
    ],
  },
  {
    slug: "pronombres",
    titulo: "Pronombres personales",
    resumen: "Series A (ergativos, antes del verbo) y B (absolutivos, después).",
    intro: "El maya usa dos series de pronombres. La serie A marca al sujeto del verbo transitivo; la B al sujeto del intransitivo y objeto del transitivo.",
    contenido: [
      { maya: "in", es: "yo (Serie A)", nota: "in k'áat = yo quiero" },
      { maya: "a", es: "tú (Serie A)", nota: "a k'áat = tú quieres" },
      { maya: "u", es: "él/ella (Serie A)" },
      { maya: "k", es: "nosotros (Serie A)" },
      { maya: "-en", es: "yo (Serie B)", nota: "Wenelen = duermo" },
      { maya: "-ech", es: "tú (Serie B)" },
    ],
    gramatica: "Los pronombres de Serie A van pegados al verbo por delante; los de Serie B van por detrás.",
  },
  {
    slug: "numeros",
    titulo: "Números del 1 al 20",
    resumen: "Sistema vigesimal maya: cuentas de veinte en veinte.",
    intro: "El maya es vigesimal: la base es 20 (jun k'áal). Aprende del 1 al 20 y ya tienes la llave.",
    contenido: [
      { maya: "Jun, Ka', Óox, Kan, Jo'", es: "1, 2, 3, 4, 5" },
      { maya: "Wak, Uk', Waxak, Bolon, Lajun", es: "6, 7, 8, 9, 10" },
      { maya: "Buluk, Lajka', Óoxlajun, Kanlajun, Jo'olajun", es: "11–15" },
      { maya: "Waklajun, Uklajun, Waxaklajun, Bolonlajun, Junk'áal", es: "16–20" },
    ],
    gramatica: "Junk'áal (20) significa literalmente 'un veinte'. Ka'k'áal = 40, Óoxk'áal = 60.",
  },
  {
    slug: "familia",
    titulo: "Familia y parentesco",
    resumen: "Cómo nombrar a quienes te rodean.",
    intro: "La familia (láak'tsil) es el primer círculo de aprendizaje del Mayab.",
    contenido: [
      { maya: "In na'", es: "mi madre" },
      { maya: "In taata", es: "mi padre" },
      { maya: "In suku'un", es: "mi hermano mayor" },
      { maya: "In kiik", es: "mi hermana mayor" },
      { maya: "In paal", es: "mi hijo/a" },
      { maya: "In nool", es: "mi abuelo" },
    ],
    gramatica: "Para decir 'mi X' antepones 'in' (yo). Para 'tu X', usa 'a'.",
  },
  {
    slug: "frases-utiles",
    titulo: "Frases útiles del día",
    resumen: "Diez frases para abrir conversación con un hablante.",
    intro: "Estas frases son el puente para entrar en la lengua viva.",
    contenido: [
      { maya: "¿Bix a k'aaba'?", es: "¿cómo te llamas?" },
      { maya: "In k'aaba'e' ...", es: "me llamo ..." },
      { maya: "¿Tu'ux ka taal?", es: "¿de dónde vienes?" },
      { maya: "Yucatán in kaajal", es: "Yucatán es mi pueblo" },
      { maya: "Ma' in na'atik", es: "no entiendo" },
      { maya: "Ts'aatech ten ...", es: "dame ..." },
      { maya: "¿Bahux u tojol?", es: "¿cuánto cuesta?" },
      { maya: "Asab uts tin t'aan", es: "me gusta mucho" },
      { maya: "Tene' kin kaambal maaya", es: "yo estoy aprendiendo maya" },
      { maya: "Sáamal k'iin", es: "hasta mañana" },
    ],
  },
];
