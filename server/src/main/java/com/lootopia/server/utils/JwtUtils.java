package com.lootopia.server.utils;

import com.lootopia.server.security.CustomUserDetails;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Component
public class JwtUtils {
    private static final long EXPIRATION_TIME = 86400000;
    Logger logger = LoggerFactory.getLogger(JwtUtils.class);
    @Value("${jwt.secret}")
    private String secretKey;

    public String generateToken(CustomUserDetails customUserDetails) {
        List<String> roles = customUserDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        String token = Jwts.builder()
                .subject(customUserDetails.getUsername())
                .claim("id", customUserDetails.getId())
                .claim("roles", roles)
                .issuedAt(new Date())
                .expiration(new Date(new Date().getTime() + EXPIRATION_TIME))
                .signWith(getSigningKey())
                .compact();

        return String.format("Bearer %s", token);
    }

    public Claims getClaimsFromToken(String token) {
        SecretKey key = getSigningKey();

        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean validateToken(String token) {
        SecretKey key = getSigningKey();

        JwtParser parser = Jwts.parser()
                .verifyWith(key)
                .build();

        try {
            parser.parse(token);
            return true;
        } catch (Exception e) {
            logger.error("Invalid token");

            return false;
        }
    }

    public String extractToken(String token) throws MalformedJwtException {
        Objects.requireNonNull(token);

        if (token.isBlank() || !token.startsWith("Bearer ")) {
            throw new MalformedJwtException("Invalid token");
        }

        String plainToken = token.substring(7);

        logger.info("Plain token {}", token);

        logger.info("Extracted token {}", plainToken);

        return plainToken;
    }

    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

}
