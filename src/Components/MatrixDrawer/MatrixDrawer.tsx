import React, { useEffect, useState } from "react";
import Square from "../Square/Square";
import "./Matrix.style.css";
import LargestAreaMatrix from "../../utils/LargestAreaMatrix";
function MatrixDrawer() {
  let [width, setWidth] = useState<number>(0);
  let [height, setHeight] = useState<number>(0);
  let [possibleColors, setPossibleColors] = useState(0);
  let [readyToDraw, setReadyToDraw] = useState<boolean>(false);
  let [matrix, setMatrix] = useState<number[][]>([]);
  let [colorsList, setColorsList] = useState<string[]>([]);
  let [coordArray, setCoordArray] = useState<string[]>([]);

  const handleCalculateButton = () => {
    if (width > 0 && height > 0 && possibleColors > 1) {
      setReadyToDraw(true);
      possibleColorsList(possibleColors);
      createAndFillMatrix(width, height, possibleColors);
      //
    } else {
      setReadyToDraw(false);
    }
  };
  useEffect(() => {
    readyToDraw ? getMaxAreaCoord() : console.log("triggered");
  }, [matrix]);

  const getMaxAreaCoord = () => {
    let coord: string[] = [];
    coord = LargestAreaMatrix(matrix)?.coordinatesArray;
    console.log("return of area service", LargestAreaMatrix(matrix));
    setCoordArray(coord);
  };
  const createAndFillMatrix = (
    width: number,
    height: number,
    possibleColors: number
  ) => {
    console.log(width, height, possibleColors);

    let matrix: any[][] = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => {
        return generateRandom(possibleColors);
      })
    );
    setMatrix(matrix);
  };
  function generateRandom(maxLimit: number) {
    let rand = Math.random() * maxLimit;
    let random = Math.floor(rand); // 99
    console.log(random); // say 99.81321410836433
    return random;
  }

  const rgbRandomGenerator = () => {
    let randomValue = () => (Math.random() * 256) >> 0;
    let color = `rgb(${randomValue()}, ${randomValue()}, ${randomValue()})`;

    return color;
  };
  const possibleColorsList = (possibleColors: number) => {
    let colorsList = [];
    for (let i = 0; i < possibleColors; i++) {
      let randomRgb = rgbRandomGenerator();
      colorsList.push(randomRgb);
    }
    console.log("colorsList==>>>", colorsList);
    setColorsList(colorsList);
    return colorsList;
  };

  return (
    <div>
      <div>
        set Width:{" "}
        <input
          value={width}
          type="number"
          onChange={(e) => setWidth(parseInt(e.target.value))}
        />
      </div>
      <div>
        set height:{" "}
        <input
          value={height}
          type="number"
          onChange={(e) => setHeight(parseInt(e.target.value))}
        />
      </div>
      <div>
        Possible colors:{" "}
        <input
          value={possibleColors}
          type="number"
          onChange={(e) => setPossibleColors(parseInt(e.target.value))}
        />
      </div>

      <button onClick={() => handleCalculateButton()}>draw</button>
      <div>
        {readyToDraw && (
          <React.Fragment>
            {matrix.map((item, idx) => (
              <tr key={idx} className="square">
                {item.map((colorValue, index) => (
                  <td
                    key={index}
                    className={
                      "square-row  td-text-center " +
                      (coordArray.includes(index + " " + idx)
                        ? "square-selected-brd"
                        : "square-brd")
                    }
                    style={{ background: `${colorsList[colorValue]}` }}
                  >
                    <p></p>
                  </td>
                ))}
              </tr>
            ))}
          
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default MatrixDrawer;
