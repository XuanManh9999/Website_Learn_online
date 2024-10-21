package com.toilamanh.toilamanh.security;

import com.toilamanh.toilamanh.service.CustomUserDetailsService;
import com.toilamanh.toilamanh.utils.JWTUtils;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JWTAuthFilter extends OncePerRequestFilter{
    private final JWTUtils jwtUtils;
    @Autowired
    private CustomUserDetailsService customUserDetailsService;
    public JWTAuthFilter(JWTUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final String authorizationHeader = request.getHeader("Authorization");
        final String jwtToken;
        final String userName;

        try {
            if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ") || authorizationHeader.isBlank()) {
                filterChain.doFilter(request, response);
                return;
            }
            jwtToken = authorizationHeader.substring(7);
            userName = jwtUtils.extractUsername(jwtToken);

            if (userName != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = customUserDetailsService.loadUserByUsername(userName);
                if (jwtUtils.isValidToken(jwtToken, userDetails)) {
                    SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    securityContext.setAuthentication(authentication);
                    SecurityContextHolder.setContext(securityContext);
                }
            }
        } catch (ExpiredJwtException e) {
            // Thiết lập mã lỗi 401 Unauthorized
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json"); // Thiết lập kiểu nội dung là JSON
            response.setCharacterEncoding("UTF-8"); // Đảm bảo mã hóa UTF-8 cho ký tự tiếng Việt nếu có

            // Tạo thông báo lỗi JSON
            String jsonResponse = "{\"status\": 401, \"message\": \"JWT token has expired. Please log in again.\"}";

            // Ghi thông báo lỗi vào response
            response.getWriter().write(jsonResponse);

            return; // Dừng filter tại đây
        }

        filterChain.doFilter(request, response);
    }

}
