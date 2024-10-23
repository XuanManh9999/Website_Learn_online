export const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

// Hàm kiểm tra tính hợp lệ của mật khẩu
export const validatePassword = (password) => {
    // Kiểm tra mật khẩu có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

// Hàm kiểm tra tính hợp lệ của số điện thoại
export const validatePhoneNumber = (phoneNumber) => {
    // Giả sử số điện thoại phải có 10 đến 15 ký tự và có thể bắt đầu bằng dấu cộng (+)
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    return phoneRegex.test(phoneNumber);
};