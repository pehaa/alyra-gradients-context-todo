import React from "react"

const GradientTagButton = ({ tag, filter, setFilter }) => {
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
