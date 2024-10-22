package com.toilamanh.toilamanh.utils;

import java.security.SecureRandom;

public class Utils {
    // Hàm tạo 6 số ngẫu nhiên
    public static String generateOTP() {
        SecureRandom random = new SecureRandom();
        StringBuilder otp = new StringBuilder();

        for (int i = 0; i < 6; i++) {
            otp.append(random.nextInt(10)); // Tạo số ngẫu nhiên từ 0-9
        }

        return otp.toString();
    }
}
