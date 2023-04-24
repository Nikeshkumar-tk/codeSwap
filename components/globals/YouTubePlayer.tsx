import YouTube from 'react-youtube';

interface Props{
    videoId:string
    className?:string
}
function YouTubePlayer(props:Props) {
  const videoId = props.videoId;
  const opts = {
    height: '300',
    width: '550',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return(
    <div className={`${props.className}`}>
  <YouTube videoId={videoId} opts={opts} />
    </div>
  ) 
}

export default YouTubePlayer
