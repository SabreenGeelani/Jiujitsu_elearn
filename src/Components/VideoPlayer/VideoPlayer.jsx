const VideoPlayer = ({ videoUrl, videoType }) => {
  let content;

  if (videoType === "youtube") {
    content = (
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoUrl}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    );
  } else if (videoType === "vimeo") {
    content = (
      <iframe
        width="560"
        height="315"
        src={`https://player.vimeo.com/video/${videoUrl}`}
        title="Vimeo video player"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      ></iframe>
    );
  } else if (videoType === "local") {
    content = (
      <iframe
        width="560"
        height="315"
        src={videoUrl}
        title="Vimeo video player"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      ></iframe>
    );
  } else {
    content = (
      <video width="560" height="315" controls>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }

  return <div className="video-player text-center">{content}</div>;
};

export default VideoPlayer;
