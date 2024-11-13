package com.toilamanh.toilamanh.utils;

import java.time.Duration;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public  class UtilsFunc {
    public static Long convertDurationToSeconds(String duration) {
        Duration parsedDuration = Duration.parse(duration);
        return parsedDuration.getSeconds();  // Trả về số giây
    }
    public static String convertIsoToDurationText(String isoDuration) {
        // Parse chuỗi ISO 8601 thành đối tượng Duration
        Duration duration = Duration.parse(isoDuration);

        // Lấy số giờ, phút và giây từ Duration
        long hours = duration.toHours();
        long minutes = duration.toMinutes() % 60;

        // Trả về chuỗi định dạng "XhYp"
        return hours + "h" + minutes + "p";
    }
    public static String convertDuration(String duration) {
        // Sử dụng regex để lấy giá trị giờ, phút và giây
        Pattern pattern = Pattern.compile("PT(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+)S)?");
        Matcher matcher = pattern.matcher(duration);

        int hours = 0, minutes = 0, seconds = 0;

        if (matcher.matches()) {
            // Kiểm tra và lấy giá trị giờ, phút và giây từ chuỗi
            if (matcher.group(1) != null) hours = Integer.parseInt(matcher.group(1));
            if (matcher.group(2) != null) minutes = Integer.parseInt(matcher.group(2));
            if (matcher.group(3) != null) seconds = Integer.parseInt(matcher.group(3));
        }

        // Tính tổng số phút từ giờ và giây
        int totalMinutes = hours * 60 + minutes + (seconds > 0 ? 1 : 0);

        // Định dạng lại theo yêu cầu
        return String.format("%02d:%02d", totalMinutes / 60, totalMinutes % 60);
    }

    public static String convertToDurationText(Long durationInSeconds) {
        // Chuyển đổi giây thành giờ và phút
        Long hours = durationInSeconds / 3600;
        Long minutes = (durationInSeconds % 3600) / 60;

        // Định dạng kết quả thành chuỗi "XhYp"
        return String.format("%dh%dp", hours, minutes);
    }
}
