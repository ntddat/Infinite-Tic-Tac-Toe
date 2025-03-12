import { useRef, useEffect, useState } from 'react';
import '../index.css';
import Props from './Props.tsx';

function GameCanvas({ onButtonClick }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  //const [ isXTurn, setXTurn ] = useState(false)
  const gridSize = 100
  var isXTurn = true
  const xCoords: number[][] = []
  const oCoords: number[][] = []
  var xHash = {}
  var oHash = {}
  var xWin = false
  var oWin = false


  useEffect(() => {
    const canvas = canvasRef.current    
    if (!canvas) {
      console.log("Can't find canvas!\n")
      return;
    }

    const context = canvas.getContext('2d')
    if (!context) {
      console.log("Can't find context!\n")
      return;
    }


    canvas.width = window.innerWidth * 10
    canvas.height = window.innerHeight * 10

    for (var i = 0; i < canvas.width; i++) {
      context.beginPath()
      context.moveTo(i*gridSize, 0)
      context.lineTo(i*gridSize, canvas.height)
      context.lineWidth = 3
      context.strokeStyle = "#f39944"
      context.stroke()
    }
    for (var i = 0; i < canvas.height; i++) {
      context.beginPath()
      context.moveTo(0, i*gridSize)
      context.lineTo(canvas.width, i*gridSize)
      context.lineWidth = 3
      context.strokeStyle = "#f39944"
      context.stroke()
    }

  }, [])

  //if (xWin || oWin) {
  //  return (
  //    <>
  //      <canvas ref={canvasRef}/>
  //      <div id="end">
  //        Winner!
  //      </div>
  //    </>
  //  )
  //}

  return (
    <>
      <canvas ref={canvasRef} onClick={(e) => {

        if (xWin === true || oWin === true) {
          return;
        }
        const canvas = canvasRef.current    
        if (!canvas) {
          console.log("Can't find canvas!\n")
          return;
        }

        const context = canvas.getContext('2d')
        if (!context) {
          console.log("Can't find context!\n")
          return;
        }

        const gridSize = 100

        var boundingRect = canvas.getBoundingClientRect();
        var mouseX = e.clientX - boundingRect.left
        var mouseY = e.clientY - boundingRect.top

        var boxX = mouseX - (mouseX % gridSize)
        var boxY = mouseY - (mouseY % gridSize)
        console.log([boxX, boxY])
        if (isXTurn) {
          if (oHash.hasOwnProperty([boxX, boxY])) {
            return
          }

          context.beginPath()
          context.moveTo(boxX + 10, boxY + 10) 
          context.lineTo(boxX + 90, boxY + 90)
          context.lineWidth = 10
          context.strokeStyle = "red"
          context.stroke()
          context.beginPath()
          context.strokeStyle = "red"
          context.moveTo(boxX + 90, boxY + 10) 
          context.lineTo(boxX + 10, boxY + 90)
          context.lineWidth = 10
          context.stroke()
          console.log(isXTurn)

          xCoords.push([boxX, boxY])
          xHash[[boxX, boxY]] = 1
          console.log(xCoords)

          if (checkWin(xHash, boxX, boxY)) {
            xWin = true
            onButtonClick("X Win")
          }

        }
        else {
          if (xHash.hasOwnProperty([boxX, boxY])) {
            return
          }
          context.beginPath();
          context.strokeStyle = "blue"
          context.lineWidth = 10
          context.arc(boxX + 50, boxY + 50, 40, 0, 2 * Math.PI);
          context.stroke();
          console.log(isXTurn)
          oCoords.push([boxX, boxY])
          oHash[[boxX, boxY]] = 1
          console.log(oCoords)
          if (checkWin(oHash, boxX, boxY)) {
            oWin = true
            onButtonClick("O Win")
          }
        }
        isXTurn = !isXTurn

        }}
      />
    </>
  )
}

function checkWin(hash, boxX, boxY) {
  let verCount = 0
  let horCount = 0
  let backDiagCount = 0
  let fwdDiagCount = 0
  for (let i = -400; i <= 400; i = i + 100) {
    if (verCount === 5 || horCount === 5 || backDiagCount === 5 || fwdDiagCount === 5) {
      return true
    }
    if (hash.hasOwnProperty([boxX, boxY + i])) {
      verCount += 1
    }
    if (hash.hasOwnProperty([boxX + i, boxY])) {
      horCount += 1
    }
    if (hash.hasOwnProperty([boxX + i, boxY + i])) {
      backDiagCount += 1
    }
    if (hash.hasOwnProperty([boxX + i, boxY - i])) {
      fwdDiagCount += 1
    }
  }
  if (verCount >= 5 || horCount >= 5 || backDiagCount >= 5 || fwdDiagCount >= 5) {
    return true
  }

  return false
}

export default GameCanvas
