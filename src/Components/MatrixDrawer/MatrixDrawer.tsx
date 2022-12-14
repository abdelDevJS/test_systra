import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputNumber from "../InputNumber";
import "./Matrix.style.css";
import LargestAreaMatrix from "../../utils/LargestAreaMatrix";
import generateRandom from "../../utils/generateRandom";
function MatrixDrawer() {
  //States declaration
  let [width, setWidth] = useState<number>(0);
  let [height, setHeight] = useState<number>(0);
  let [possibleColors, setPossibleColors] = useState(0);
  let [readyToDraw, setReadyToDraw] = useState<boolean>(false);
  let [matrix, setMatrix] = useState<number[][]>([]);
  let [colorsList, setColorsList] = useState<string[]>([]);
  let [coordArray, setCoordArray] = useState<string[]>([]);
  let [biggestArea, setBiggestArea] = useState<number>();

  //Function for handle the drawing method
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
  // Function to get matrix details from util function. (coordinates, maxarea, color Value )
  const getMaxAreaCoord = () => {
    let matrixDetails = LargestAreaMatrix(matrix);
    let coord: string[] = [];
    coord = matrixDetails?.coordinatesArray;
    setBiggestArea(matrixDetails?.max);
    console.log("return of area service", LargestAreaMatrix(matrix));
    setCoordArray(coord);
  };
  useEffect(
    () => {
      readyToDraw ? getMaxAreaCoord() : console.log("triggered");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [matrix, readyToDraw]
  );

  //Create 2D Array of matrix and fill each item with random color value
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

  //Generate random RGB color.
  const rgbRandomGenerator = () => {
    let randomValue = () => (Math.random() * 256) >> 0;
    let color = `rgb(${randomValue()}, ${randomValue()}, ${randomValue()})`;

    return color;
  };

  //set the list of possible generated colors from possible colors number.
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

  //Handle the set width input onChange.
  const handleWidth = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputWidth = parseInt(e.target.value);
    const width = !inputWidth && inputWidth !== 0 ? 0 : inputWidth;
    setWidth(width);
  };

  //Handle the set height input onChange.
  const handleHeight = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputHeight = parseInt(e.target.value);
    const height = !inputHeight && inputHeight !== 0 ? 0 : inputHeight;
    setHeight(height);
  };

  //Handle the possible colors onChange.
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
    <React.Fragment>
      <div className="input-block">
        <div>
          set Width: <InputNumber onChange={handleWidth} value={width} />
        </div>
        <div>
          set height: <InputNumber onChange={handleHeight} value={height} />
        </div>
        <div>
          Possible colors:{" "}
          <InputNumber onChange={handlePossibleColors} value={possibleColors} />
        </div>
      </div>
      <Button
        className="button-margin-bottom"
        variant="contained"
        onClick={handleCalculateButton}
      >
        Draw square
      </Button>

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
      {readyToDraw && <Box component="span"> BIGGEST AREA: {biggestArea}</Box>}
    </React.Fragment>
  );
}

export default MatrixDrawer;
