import React from "react";
import PropTypes from "prop-types";
import './youtube-embed.css';

const YoutubeEmbed = ({ embedId }) => {
  return(
    <div className="video-responsive">
      <iframe
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${embedId}`}
        
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>

  )
};

export default YoutubeEmbed;