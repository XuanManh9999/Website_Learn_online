package com.toilamanh.toilamanh.repository;

import com.toilamanh.toilamanh.entity.Otp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OtpRepository extends JpaRepository<Otp, Long> {
    Optional<Otp> findByEmailAndOtpCode(String email, String otpType);
}
