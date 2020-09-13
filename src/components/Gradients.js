import React from "react"
import { uniqueTags } from "../gradients"
import GradientsList from "./GradientsList"
import GradientsSelect from "./GradientsSelect"

const Gradients = () => {
  return (
    <>
      <GradientsSelect tags={uniqueTags} />
      <GradientsList />
    </>
  )
}

export default Gradients
