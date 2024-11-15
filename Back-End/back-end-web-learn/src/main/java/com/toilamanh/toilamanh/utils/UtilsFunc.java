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
        // Loại bỏ phần "PT" khỏi chuỗi và tách ra các phần giờ, phút và giây
        String[] parts = isoDuration.replace("PT", "").split("[HMS]");

        // Nếu có giờ, chuyển đổi giờ thành phút
        int hours = 0;
        int minutes = 0;
        int seconds = 0;

        if (isoDuration.contains("H")) {
            hours = Integer.parseInt(parts[0]);
        }
        if (isoDuration.contains("M")) {
            minutes = Integer.parseInt(parts[parts.length - 2]);
        }
        if (isoDuration.contains("S")) {
            seconds = Integer.parseInt(parts[parts.length - 1]);
        }

        // Chuyển đổi giờ thành phút
        minutes += hours * 60;

        // Đảm bảo định dạng là MM:SS
        return String.format("%02d:%02d", minutes, seconds);
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
    public static String convertSecondsToMinutesSeconds(Long seconds) {
        Long minutes = seconds / 60;
        Long remainingSeconds = seconds % 60;
        return String.format("%02d:%02d", minutes, remainingSeconds);
    }
}
