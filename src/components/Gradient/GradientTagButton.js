import React, { useContext } from "react"
import { FilterContext } from "./../../context/FilterContext"

const GradientTagButton = ({ tag }) => {
  const { filter, setFilter } = useContext(FilterContext)
  const className = filter === tag ? "bg-light" : "bg-dark text-white"
  const handleTagClick = () => {
    setFilter(tag)
  }
  return (
    <button
      type="button"
      className={`btn btn-sm mr-2 ${className}`}
      disabled={filter === tag}
      onClick={handleTagClick}
    >
      {tag}
    </button>
  )
}

export default GradientTagButton
