// Hàm chuyển đổi chuỗi ISO 8601 thành số phút
function parseDuration(duration) {
  const hoursMatch = duration.match(/(\d+)H/); // Tìm số giờ
  const minutesMatch = duration.match(/(\d+)M/); // Tìm số phút
  const secondsMatch = duration.match(/(\d+)S/); // Tìm số giây

  const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
  const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;
  const seconds = secondsMatch ? parseInt(secondsMatch[1]) : 0;

  // Chuyển đổi tất cả sang phút
  return hours * 60 + minutes + Math.floor(seconds / 60);
}

// Hàm tính tổng thời gian từ danh sách video
export function getTotalDuration(videos) {
  let totalMinutes = 0;
  videos.forEach((video) => {
    totalMinutes += parseDuration(video?.contentDetails?.duration);
  });

  // Chuyển đổi tổng phút thành định dạng `116h44p`
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}h${minutes}p`;
}

export function getViewByCourse(videos) {
  const totalViews = videos.reduce((acc, item) => {
    return acc + Number(item.statistics.viewCount);
  }, 0);

  // Định dạng số với dấu chấm phân cách hàng nghìn
  return totalViews.toLocaleString("de-DE"); // Sử dụng 'de-DE' để có định dạng dấu chấm
}



export function convertDurationCourse(seconds) {
  // Tính số giờ, phút, giây
  const hours = Math.floor(seconds / 3600); // 1 giờ = 3600 giây
  const minutes = Math.floor((seconds % 3600) / 60); // 1 phút = 60 giây
  const remainingSeconds = seconds % 60; // Số giây còn lại

  // Trả về định dạng "HH giờ MM phút"
  return `${hours.toString().padStart(2, '0')} giờ ${minutes.toString().padStart(2, '0')} phút`;
}

export const getVideo = (chapterList) => {
  for (let chapter of chapterList) {
      const video = chapter.videos.find(v => v?.preOrder === 1);
      if (video) {
          return video;
      }
  }
  return chapterList[0].videos[0];
};

export function formatDate(dateString) {
  const date = new Date(dateString);
  const monthNames = [
    "tháng 1", "tháng 2", "tháng 3", "tháng 4", "tháng 5", "tháng 6",
    "tháng 7", "tháng 8", "tháng 9", "tháng 10", "tháng 11", "tháng 12"
  ];
  
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `Cập nhật ${month} năm ${year}`;
}