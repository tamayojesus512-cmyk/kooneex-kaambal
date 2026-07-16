import { createFileRoute, Link } from "@tanstack/react-router";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  dictionary,
  categorias,
  type Category,
} from "../lib/maya-data";
import { ArrowLeft, RotateCcw, Trophy } from "lucide-react";

export const Route = createFileRoute("/juegos/sopa")({
  head: () => ({
    meta: [
      {
        title:
          "Sopa de letras · Juegos · ¡Ko'one'ex Kaambal!",
      },
    ],
  }),
  component: SopaPage,
});

const SIZE = 12;

type Cell = [number, number];

const DIRS: Cell[] = [
  [1, 0], // vertical hacia abajo
  [-1, 0], // vertical hacia arriba
  [0, 1], // horizontal derecha
  [0, -1], // horizontal izquierda
  [1, 1], // diagonal abajo-derecha
  [-1, -1], // diagonal arriba-izquierda
  [-1, 1], // diagonal arriba-derecha
  [1, -1], // diagonal abajo-izquierda
];

function clean(text: string): string {
  return text
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’'´`\s-]/g, "");
}

type Placed = {
  word: string;
  display: string;
  cells: Cell[];
};

function place(words: string[]) {
  const grid: string[][] = Array.from(
    { length: SIZE },
    () => Array(SIZE).fill(""),
  );

  const placed: Placed[] = [];

  const cleaned = words
    .map((word) => ({
      display: word,
      clean: clean(word),
    }))
    .filter(
      (word) =>
        word.clean.length >= 3 &&
        word.clean.length <= SIZE,
    )
    .sort(
      (first, second) =>
        second.clean.length - first.clean.length,
    );

  for (const { display, clean: word } of cleaned) {
    let placedSuccessfully = false;

    for (
      let attempt = 0;
      attempt < 100 && !placedSuccessfully;
      attempt += 1
    ) {
      const [rowDirection, columnDirection] =
        DIRS[Math.floor(Math.random() * DIRS.length)];

      const startingRow = Math.floor(Math.random() * SIZE);
      const startingColumn = Math.floor(
        Math.random() * SIZE,
      );

      const cells: Cell[] = [];
      let validPosition = true;

      for (let index = 0; index < word.length; index += 1) {
        const row =
          startingRow + rowDirection * index;

        const column =
          startingColumn + columnDirection * index;

        if (
          row < 0 ||
          row >= SIZE ||
          column < 0 ||
          column >= SIZE
        ) {
          validPosition = false;
          break;
        }

        if (
          grid[row][column] &&
          grid[row][column] !== word[index]
        ) {
          validPosition = false;
          break;
        }

        cells.push([row, column]);
      }

      if (!validPosition) {
        continue;
      }

      cells.forEach(([row, column], index) => {
        grid[row][column] = word[index];
      });

      placed.push({
        word,
        display,
        cells,
      });

      placedSuccessfully = true;
    }
  }

  const availableLetters = "ABCDEFIJKLMNOPSTUWXY";

  for (let row = 0; row < SIZE; row += 1) {
    for (let column = 0; column < SIZE; column += 1) {
      if (!grid[row][column]) {
        grid[row][column] =
          availableLetters[
            Math.floor(
              Math.random() * availableLetters.length,
            )
          ];
      }
    }
  }

  return {
    grid,
    placed,
  };
}

/*
 * Crea una línea desde la primera casilla hasta la última.
 *
 * Solo acepta:
 * - horizontal
 * - vertical
 * - diagonal
 */
function createStraightPath(
  start: Cell,
  end: Cell,
): Cell[] | null {
  const rowDifference = end[0] - start[0];
  const columnDifference = end[1] - start[1];

  const absoluteRowDifference = Math.abs(rowDifference);
  const absoluteColumnDifference = Math.abs(
    columnDifference,
  );

  const isHorizontal = rowDifference === 0;
  const isVertical = columnDifference === 0;

  const isDiagonal =
    absoluteRowDifference === absoluteColumnDifference;

  if (!isHorizontal && !isVertical && !isDiagonal) {
    return null;
  }

  const numberOfSteps = Math.max(
    absoluteRowDifference,
    absoluteColumnDifference,
  );

  const rowStep =
    rowDifference === 0
      ? 0
      : rowDifference > 0
        ? 1
        : -1;

  const columnStep =
    columnDifference === 0
      ? 0
      : columnDifference > 0
        ? 1
        : -1;

  return Array.from(
    { length: numberOfSteps + 1 },
    (_, index): Cell => [
      start[0] + rowStep * index,
      start[1] + columnStep * index,
    ],
  );
}

function pathsAreEqual(
  firstPath: Cell[],
  secondPath: Cell[],
): boolean {
  return (
    firstPath.length === secondPath.length &&
    firstPath.every(
      ([row, column], index) =>
        row === secondPath[index][0] &&
        column === secondPath[index][1],
    )
  );
}

function SopaPage() {
  const [category, setCategory] =
    useState<Category>("Animales");

  const [seed, setSeed] = useState(0);

  const { grid, placed } = useMemo(() => {
    const words = dictionary
      .filter(
        (dictionaryWord) =>
          dictionaryWord.categoria === category,
      )
      .map((dictionaryWord) => dictionaryWord.maya)
      .slice(0, 10);

    void seed;

    return place(words);
  }, [category, seed]);

  const [path, setPath] = useState<Cell[]>([]);
  const [found, setFound] = useState<string[]>([]);

  /*
   * Estas referencias permiten mantener la selección
   * actualizada mientras se arrastra el mouse o el dedo.
   */
  const selectingRef = useRef(false);
  const startCellRef = useRef<Cell | null>(null);
  const pathRef = useRef<Cell[]>([]);

  const allFound =
    found.length === placed.length && placed.length > 0;

  useEffect(() => {
    setFound([]);
    setPath([]);

    selectingRef.current = false;
    startCellRef.current = null;
    pathRef.current = [];
  }, [category, seed]);

  useEffect(() => {
    if (!allFound) {
      return;
    }

    const previousScore = Number(
      localStorage.getItem("kaambal.scores.sopa") || 0,
    );

    if (placed.length > previousScore) {
      localStorage.setItem(
        "kaambal.scores.sopa",
        String(placed.length),
      );
    }
  }, [allFound, placed.length]);

  function cellKey(row: number, column: number) {
    return `${row},${column}`;
  }

  function isInCurrentPath(
    row: number,
    column: number,
  ) {
    return path.some(
      ([pathRow, pathColumn]) =>
        pathRow === row && pathColumn === column,
    );
  }

  function isInFoundWord(
    row: number,
    column: number,
  ) {
    return placed.some(
      (placedWord) =>
        found.includes(placedWord.word) &&
        placedWord.cells.some(
          ([wordRow, wordColumn]) =>
            wordRow === row &&
            wordColumn === column,
        ),
    );
  }

  function updatePath(nextPath: Cell[]) {
    pathRef.current = nextPath;
    setPath(nextPath);
  }

  function startSelection(
    row: number,
    column: number,
  ) {
    const startingCell: Cell = [row, column];

    selectingRef.current = true;
    startCellRef.current = startingCell;

    updatePath([startingCell]);
  }

  function moveSelection(
    row: number,
    column: number,
  ) {
    if (
      !selectingRef.current ||
      !startCellRef.current
    ) {
      return;
    }

    const straightPath = createStraightPath(
      startCellRef.current,
      [row, column],
    );

    /*
     * Si intenta hacer una curva, no agrega esas casillas.
     * Conserva la última línea válida.
     */
    if (!straightPath) {
      return;
    }

    updatePath(straightPath);
  }

  function endSelection() {
    if (!selectingRef.current) {
      return;
    }

    selectingRef.current = false;
    startCellRef.current = null;

    const selectedPath = pathRef.current;

    const matchingWord = placed.find((placedWord) => {
      if (found.includes(placedWord.word)) {
        return false;
      }

      const normalPath = placedWord.cells;
      const reversedPath = [...placedWord.cells].reverse();

      return (
        pathsAreEqual(selectedPath, normalPath) ||
        pathsAreEqual(selectedPath, reversedPath)
      );
    });

    if (matchingWord) {
      setFound((currentFound) => {
        if (
          currentFound.includes(matchingWord.word)
        ) {
          return currentFound;
        }

        return [
          ...currentFound,
          matchingWord.word,
        ];
      });
    }

    updatePath([]);
  }

  /*
   * Permite detectar la casilla que está debajo del
   * mouse o del dedo mientras se arrastra.
   */
  function handlePointerMove(
    event: ReactPointerEvent<HTMLDivElement>,
  ) {
    if (!selectingRef.current) {
      return;
    }

    event.preventDefault();

    const element = document.elementFromPoint(
      event.clientX,
      event.clientY,
    );

    const cell =
      element?.closest<HTMLButtonElement>(
        "[data-sopa-cell='true']",
      );

    if (!cell) {
      return;
    }

    const row = Number(cell.dataset.row);
    const column = Number(cell.dataset.column);

    if (
      Number.isNaN(row) ||
      Number.isNaN(column)
    ) {
      return;
    }

    moveSelection(row, column);
  }

  function restart() {
    setSeed((currentSeed) => currentSeed + 1);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
      <Link
        to="/juegos"
        className="mb-6 inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3 w-3" />
        Volver a juegos
      </Link>

      <header className="mb-6 text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-cinnabar">
          — Sopa de letras
        </p>

        <h1 className="font-display text-3xl sm:text-5xl">
          Encuentra las palabras{" "}
          <em className="text-gradient-gold">
            mayas
          </em>
          .
        </h1>
      </header>

      <div className="mb-4 flex flex-wrap justify-center gap-1.5">
        {categorias.map((currentCategory) => (
          <button
            key={currentCategory}
            type="button"
            onClick={() =>
              setCategory(currentCategory)
            }
            className={`
              rounded-full border px-3 py-1.5
              text-xs transition
              ${
                category === currentCategory
                  ? "border-cinnabar bg-cinnabar text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-cinnabar/50"
              }
            `}
          >
            {currentCategory}
          </button>
        ))}
      </div>

      <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-wider text-muted-foreground">
        <span>
          Encontradas:{" "}
          <span className="font-semibold text-gold">
            {found.length}
          </span>{" "}
          / {placed.length}
        </span>

        <button
          type="button"
          onClick={restart}
          className="inline-flex items-center gap-2 text-cinnabar hover:text-gold"
        >
          <RotateCcw className="h-3 w-3" />
          Nueva sopa
        </button>
      </div>

      <div
        onPointerMove={handlePointerMove}
        onPointerUp={endSelection}
        onPointerCancel={endSelection}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") {
            endSelection();
          }
        }}
        className="mx-auto mb-6 grid touch-none select-none gap-0.5 sm:gap-1"
        style={{
          gridTemplateColumns: `repeat(${SIZE}, minmax(0, 1fr))`,
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((character, columnIndex) => {
            const selected = isInCurrentPath(
              rowIndex,
              columnIndex,
            );

            const discovered = isInFoundWord(
              rowIndex,
              columnIndex,
            );

            return (
              <button
                key={cellKey(
                  rowIndex,
                  columnIndex,
                )}
                type="button"
                data-sopa-cell="true"
                data-row={rowIndex}
                data-column={columnIndex}
                onPointerDown={(event) => {
                  if (
                    event.pointerType === "mouse" &&
                    event.button !== 0
                  ) {
                    return;
                  }

                  event.preventDefault();

                  startSelection(
                    rowIndex,
                    columnIndex,
                  );
                }}
                className={`
                  aspect-square rounded-sm border
                  font-mono text-[11px] font-bold
                  transition sm:text-sm

                  ${
                    discovered
                      ? "border-jade/60 bg-jade/30 text-jade"
                      : selected
                        ? "border-cinnabar bg-cinnabar text-primary-foreground"
                        : "border-border bg-obsidian/70 text-foreground/80 hover:bg-cinnabar/15"
                  }
                `}
              >
                {character}
              </button>
            );
          }),
        )}
      </div>

      <div className="rounded-xl border border-border bg-card/50 p-4">
        <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
          Palabras ocultas
        </div>

        <div className="flex flex-wrap gap-1.5">
          {placed.map((placedWord) => (
            <span
              key={placedWord.word}
              className={`
                rounded-full border px-2.5 py-1
                text-xs transition

                ${
                  found.includes(placedWord.word)
                    ? "border-jade/50 bg-jade/15 text-jade line-through"
                    : "border-border text-foreground"
                }
              `}
            >
              {placedWord.display}
            </span>
          ))}
        </div>
      </div>

      {allFound && (
        <div className="card-ritual mt-6 rounded-2xl p-6 text-center">
          <Trophy className="mx-auto mb-3 h-10 w-10 text-gold" />

          <p className="font-display text-2xl">
            ¡Encontraste todas!
          </p>

          <button
            type="button"
            onClick={restart}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-cinnabar px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            <RotateCcw className="h-4 w-4" />
            Nueva sopa
          </button>
        </div>
      )}
    </div>
  );
}