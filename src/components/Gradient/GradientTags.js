import React from "react"
import GradientTagButton from "./GradientTagButton"

const GradientTags = ({ tags, filter, setFilter }) => {
  return (
    <div className="mt-3">
      {tags.sort().map((tag) => {
        return (
          <GradientTagButton
            key={tag}
            tag={tag}
            filter={filter}
            setFilter={setFilter}
          />
        )
      })}
    </div>
  )
}

export default GradientTags
