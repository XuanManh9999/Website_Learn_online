package com.toilamanh.toilamanh.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.function.Function;

@Service
public class JWTUtils {
    private String secreteString = "YFBRaoJ7LxB2VB10cGWI5MIua1/xHvnpcOXDLIephhzpmpS2qPb+ijVeiCVhT0dK";
    @Value("${jwt.EXPIRATION_TIME}")
    private Long EXPIRATION_TIME;//for 7 days
    private final SecretKey Key;

    public JWTUtils () {
        byte[] keyBytes = Base64.getDecoder().decode(secreteString.getBytes(StandardCharsets.UTF_8));
        this.Key = new SecretKeySpec(keyBytes, "HmacSHA256");
    }

    public String generateToken (UserDetails userDetails) {
        return Jwts.builder()
                .subject(userDetails.getUsername())
                .claim("role", userDetails.getAuthorities().iterator().next().getAuthority())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(Key)
                .compact();
    }

    public String extractUsername (String token) {
        return extractClaims(token, Claims::getSubject);
    }


    private <T> T extractClaims (String token, Function<Claims, T> claimsResolver) {
        return claimsResolver.apply(Jwts.parser().verifyWith(Key).build().parseSignedClaims(token).getPayload());
    }

    public boolean isValidToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
    private boolean isTokenExpired (String token) {
        return extractClaims(token, Claims::getExpiration).before(new Date());
    }
}
