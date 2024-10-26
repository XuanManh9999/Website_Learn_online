package com.toilamanh.toilamanh.component;

import com.toilamanh.toilamanh.repository.OtpRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)

@ConditionalOnBean(OtpRepository.class)
// chi hoat dong khi co bean do
public class OTPDataCleaner {

    OtpRepository otpRepository;

    // chay moi ngay dau tien cua quy
    @Scheduled(cron = "0 0 0 1 1,4,7,10 ?")
    public void cleanOldOTP() {
        log.info("Cleaning old OTP");
        otpRepository.deleteAll();
    }
}
