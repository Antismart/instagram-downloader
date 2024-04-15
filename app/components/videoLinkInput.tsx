'use client'

import { useState } from 'react';
import axios from 'axios';

const VideoLinkInput = () => {
  const [videoLink, setVideoLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [videoData, setVideoData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Replace these with your actual Instagram user ID and access token
      const userId = process.env.NEXT_PUBLIC_YOUR_USER_ID;
      const accessToken = process.env.NEXT_PUBLIC_YOUR_ACCESS_TOKEN;
      const response = await axios.get(`https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${accessToken}`, { timeout: 5000 });
      setVideoData(response.data);
    } catch (err) {
      setError('An error occurred while fetching video data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="video_link" className="block text-sm font-medium text-gray-700">
          Instagram Video Link
        </label>
        <input
          id="video_link"
          name="video_link"
          type="text"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter Instagram Video Link"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Fetch
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {loading && <p>Loading...</p>}
      {videoData && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold">Video Data:</h2>
          <pre>{JSON.stringify(videoData, null, 2)}</pre>
        </div>
      )}
    </form>
  );
};

export default VideoLinkInput;
