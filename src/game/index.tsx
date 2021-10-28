import { useState, useCallback, useRef, FunctionComponent } from "react";
import produce from "immer";
// utils
import {AiOutlinePlayCircle, AiOutlinePauseCircle} from 'react-icons/ai'
// styling
import * as STYLE from '../style/game'
// data
import operations from '../data/operations.json'

const Game: FunctionComponent = () => {
  const gridRows = 20;
  const gridColumns = 50;

  const generateEmptyGrid = () => {
    const rows = [];
    for (let i = 0; i < gridRows; i++) {
      rows
        .push(
          Array
            .from(
              Array(gridColumns), 
              () => 0
            )
        );
    }

    return rows;
  };

  const [grid, setGrid] = useState(
    () => {
      return generateEmptyGrid();
    }
  );

  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid(
      g => {
        return produce(g, gridCopy => {
          for (let i = 0; i < gridRows; i++) {
            for (let k = 0; k < gridColumns; k++) {
              let neighbors = 0;
              operations
                .forEach(
                  ([x, y]) => {
                    const newI = i + x;
                    const newK = k + y;
                    if (newI >= 0 && newI < gridRows && newK >= 0 && newK < gridColumns) {
                      neighbors += g[newI][newK];
                    }
                  }
                );

              if (neighbors < 2 || neighbors > 3) {
                gridCopy[i][k] = 0;
              } else if (g[i][k] === 0 && neighbors === 3) {
                gridCopy[i][k] = 1;
              }
            }
          }
        });
      }
    );

    setTimeout(runSimulation, 100);
  }, [gridColumns, gridRows]);

  return (
    <STYLE.Page>
      <STYLE.ButtonWrapper>
        <STYLE.ButtonContainer>
          <STYLE.Button
            icon={true}
            onClick={() => {
              setRunning(!running);
              if (!running) {
                runningRef.current = true;
                runSimulation();
              }
            }}
          >
            {running 
              ? <AiOutlinePauseCircle /> 
              : <AiOutlinePlayCircle />
            }
          </STYLE.Button>
          <STYLE.ButtonBody>
            <STYLE.Button
              onClick={() => {
                const rows = [];
                for (let i = 0; i < gridRows; i++) {
                  rows.push(
                    Array.from(Array(gridColumns), () => (Math.random() > 0.7 ? 1 : 0))
                  );
                }

                setGrid(rows);
              }}
            >
              random
            </STYLE.Button>
            <STYLE.Button
              onClick={() => {
                setGrid(generateEmptyGrid());
              }}
            >
              clear
            </STYLE.Button>
          </STYLE.ButtonBody>
        </STYLE.ButtonContainer>
      </STYLE.ButtonWrapper>
      <STYLE.CellWrapper>
        <STYLE.CellContainer>
          <STYLE.CellBody grid={gridColumns}>
            {grid.map((rows, i) =>
              rows.map((col, k) => (
                <STYLE.Cell
                  key={`${i}-${k}`}
                  onClick={() => {
                    const newGrid = produce(grid, gridCopy => {
                      gridCopy[i][k] = grid[i][k] ? 0 : 1;
                    });
                    setGrid(newGrid);
                  }}
                  active={grid[i][k]}
                />
              ))
            )}
          </STYLE.CellBody>
        </STYLE.CellContainer>
      </STYLE.CellWrapper>
    </STYLE.Page>
  );
};

export default Game;