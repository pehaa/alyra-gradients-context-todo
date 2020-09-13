import React, { useState } from "react"
import { gradients } from "../gradients"

const GradientsHeader = (props) => {
  const { children } = props
  const length = gradients.length

  const chooseGradient = () => Math.floor(Math.random() * length)

  const [randomGradient, setRandomGradient] = useState(chooseGradient)
  const handleReloadClick = () => {
    setRandomGradient(chooseGradient)
  }

  const style = {
    backgroundImage: `linear-gradient(to right, ${gradients[randomGradient].start}, ${gradients[randomGradient].end})`,
  }
  return (
    <header className="text-center bg-dark text-white py-5 mb-5" style={style}>
      {children}
      <button
        aria-label="Clicker pour changer le background"
        type="button"
        className="btn btn-outline-light"
        onClick={handleReloadClick}
      >
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          className="bi bi-arrow-clockwise"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3.17 6.706a5 5 0 0 1 7.103-3.16.5.5 0 1 0 .454-.892A6 6 0 1 0 13.455 5.5a.5.5 0 0 0-.91.417 5 5 0 1 1-9.375.789z"
          />
          <path
            fillRule="evenodd"
            d="M8.147.146a.5.5 0 0 1 .707 0l2.5 2.5a.5.5 0 0 1 0 .708l-2.5 2.5a.5.5 0 1 1-.707-.708L10.293 3 8.147.854a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </button>
    </header>
  )
}

export default GradientsHeader
