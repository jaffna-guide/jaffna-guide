import * as React from 'react'

const Icon = ({ icon: SVGComponent, className }) => {
  return (
    <SVGComponent className={className} />
  )
}

export default Icon
