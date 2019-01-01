import * as React from 'react'

const ThumbnailTrack = ({ children }) => {
  return (
    <div className="carousel-thumbnail-track">
      <div className="carousel-thumbnail-track__inner">
        {children}
      </div>
    </div>
  )
}

export default ThumbnailTrack
