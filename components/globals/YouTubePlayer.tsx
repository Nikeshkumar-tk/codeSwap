import YouTube from 'react-youtube';

interface Props {
  videoId: string
  className?: string
}
function YouTubePlayer(props: Props) {
  const videoId = props.videoId;
  const opts = {
    height: '230',
    width: '290',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className={`${props.className}`}>
      <YouTube videoId={videoId} opts={opts} />
    </div>
  )
}

export default YouTubePlayer
