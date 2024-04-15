import VideoLinkInput from '../app/components/videoLinkInput'

const Fetch = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Instagram Video Fetcher</h1>
        <VideoLinkInput />
      </div>
    </div>
  );
};

export default Fetch;