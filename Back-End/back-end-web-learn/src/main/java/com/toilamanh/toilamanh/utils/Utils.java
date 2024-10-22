package com.toilamanh.toilamanh.utils;

import java.security.SecureRandom;

public class Utils {
    // Hàm tạo mật khẩu ngẫu nhiên
    private static final String UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
    private static final String DIGITS = "0123456789";
    private static final String SPECIAL_CHARACTERS = "!@#$%^&*()-_+=<>?";
    private static final String ALL_CHARACTERS = UPPERCASE + LOWERCASE + DIGITS + SPECIAL_CHARACTERS;
    private static final SecureRandom random = new SecureRandom();


    // Hàm tạo 6 số ngẫu nhiên
    public static String generateOTP() {
        SecureRandom random = new SecureRandom();
        StringBuilder otp = new StringBuilder();

        for (int i = 0; i < 6; i++) {
            otp.append(random.nextInt(10)); // Tạo số ngẫu nhiên từ 0-9
        }

        return otp.toString();
    }

    public static String generatePassword(int length) {
        if (length < 8) {
            throw new IllegalArgumentException("Mật khẩu phải có độ dài ít nhất 8 ký tự.");
        }

        StringBuilder password = new StringBuilder(length);

        // Đảm bảo có ít nhất 1 ký tự cho mỗi loại (chữ hoa, chữ thường, số, ký tự đặc biệt)
        password.append(UPPERCASE.charAt(random.nextInt(UPPERCASE.length())));
        password.append(LOWERCASE.charAt(random.nextInt(LOWERCASE.length())));
        password.append(DIGITS.charAt(random.nextInt(DIGITS.length())));
        password.append(SPECIAL_CHARACTERS.charAt(random.nextInt(SPECIAL_CHARACTERS.length())));

        // Điền các ký tự còn lại ngẫu nhiên
        for (int i = 4; i < length; i++) {
            password.append(ALL_CHARACTERS.charAt(random.nextInt(ALL_CHARACTERS.length())));
        }

        // Trộn mật khẩu để các ký tự không theo thứ tự dự đoán
        return shufflePassword(password.toString());
    }

    // Hàm trộn các ký tự trong mật khẩu
    private static String shufflePassword(String password) {
        char[] passwordArray = password.toCharArray();
        for (int i = passwordArray.length - 1; i > 0; i--) {
            int j = random.nextInt(i + 1);
            // Hoán đổi các ký tự
            char temp = passwordArray[i];
            passwordArray[i] = passwordArray[j];
            passwordArray[j] = temp;
        }
        return new String(passwordArray);
    }
}
