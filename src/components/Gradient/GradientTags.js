import React from "react"
import GradientTagButton from "./GradientTagButton"

const GradientTags = ({ tags }) => {
  return (
    <div className="mt-3">
      {tags.sort().map((tag) => {
        return <GradientTagButton key={tag} tag={tag} />
      })}
    </div>
  )
}

export default GradientTags
