package com.todoapp.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;

import javax.crypto.SecretKey;
import java.nio.file.attribute.UserPrincipal;
import java.util.Date;

/**
 * @author pc
 **/
public class JwtUtils {
    private static final Logger logger=  LoggerFactory.getLogger(JwtUtils.class);

    @Value("${app.jwt.secret}")
    private String jwtSecret;

    @Value("${app.jwt.expiration}")
    private int jwtExpirationMs;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    public String generateJwtToken(Authentication authentication) {
        UserPrincipal  userPrincipal=(UserPrincipal) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject((userPrincipal.getName()))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime()+jwtExpirationMs))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();

    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJwt(token)
                .getBody()
                .getSubject();
    }

    public boolean validateJwtToken(String authToken){
        try{
            Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(authToken);
            return true;
        }
        catch(SecurityException e){
            logger.error("Invalid JWT signature: {}", e.getMessage());
        }
        catch(MalformedJwtException e){
            logger.error("Invalid JWT token: {}", e.getMessage());
        }
        catch(ExpiredJwtException e){
            logger.error("JWR token is expired: {}",e.getMessage());
        }
        catch(UnsupportedJwtException e){
            logger.error("JWT token is unsupported: {}",e.getMessage());
        }
        catch(IllegalArgumentException e){
            logger.error("JWT claims string is empty: {}",e.getMessage());
        }
        return false;
    }

}
