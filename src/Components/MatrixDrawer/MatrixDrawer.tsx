import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button'
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
  const getMaxAreaCoord = () => {
    let coord: string[] = [];
    coord = LargestAreaMatrix(matrix)?.coordinatesArray;
    console.log("return of area service", LargestAreaMatrix(matrix));
    setCoordArray(coord);
  };
  useEffect(() => {
    readyToDraw ? getMaxAreaCoord() : console.log("triggered");
  }, 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [matrix,readyToDraw]);

  
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
  const handleWidth = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputWidth = parseInt(e.target.value);
    const width = !inputWidth && inputWidth !== 0 ? 0 : inputWidth;
    setWidth(width);
  };
  const handleHeight = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputHeight = parseInt(e.target.value);
    const height = !inputHeight && inputHeight !== 0 ? 0 : inputHeight;
    setHeight(height);
  };
  const handlePossibleColors = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputPossibleColors = parseInt(e.target.value);
    const possibleColors =
      !inputPossibleColors && inputPossibleColors !== 0
        ? 0
        : inputPossibleColors;
    setPossibleColors(possibleColors);
  };
  return (
    <div>
      <div className="input-block">
        <div>
          set Width:{" "}
          <TextField
            value={width}
            type="number"
            onChange={(e) => handleWidth(e)}
          />
        </div>
        <div>
          set height:{" "}
          <TextField
            value={height}
            type="number"
            onChange={(e) => handleHeight(e)}
          />
        </div>
        <div>
          Possible colors:{" "}
          <TextField
            value={possibleColors}
            type="number"
            onChange={(e) => handlePossibleColors(e)}
          />
        </div>
      </div>
      <Button className="button-margin-bottom" variant="contained" onClick={() => handleCalculateButton()}>Draw square</Button>
      
        {readyToDraw && (
          <div className="box-container">
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
          </div>
        )}
      
    </div>
  );
}

export default MatrixDrawer;
