import React, { useContext } from "react"
import { gradients } from "./../gradients"
import Gradient from "./Gradient"
import { FilterContext } from "./../context/FilterContext"

const GradientsList = (props) => {
  const { filter } = useContext(FilterContext)
  const list = gradients.filter((el) => {
    if (filter === "all") {
      return true
    }
    return el.tags.includes(filter)
  })
  return (
    <ul className="row list-unstyled">
      {list.map((el) => {
        const { name, start, end, tags = [] } = el
        return (
          <Gradient
            key={el.name}
            colorStart={start}
            colorEnd={end}
            name={name}
            tags={tags}
          />
        )
      })}
    </ul>
  )
}

export default GradientsList
