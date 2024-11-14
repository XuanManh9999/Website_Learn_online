import axios from "axios";

const getVideoByIdVideo = async (IdVideo) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?id=619t4ctgKos&key=AIzaSyDsb5wa7fBTkow55HIvSVbrT1fBaS78b5o&part=snippet,contentDetails,statistics,status`
    );
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};
export { getVideoByIdVideo };
