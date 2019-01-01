import * as React from 'react'

const ThumbnailTrack = ({ children }) => {
  return (
    <div className="carousel__thumbnail-track">
      <div className="carousel__thumbnail-track-inner">
        {children}
      </div>
    </div>
  )
}

export default ThumbnailTrack
