package com.todoapp.service;

import com.todoapp.dto.JwtResponse;
import com.todoapp.dto.LoginRequest;
import com.todoapp.entity.User;
import com.todoapp.repository.UserRepository;
import com.todoapp.security.JwtUtils;
import com.todoapp.security.UserPrincipal;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author pc
 **/
@Service
@Transactional
public class AuthService {
    private final  AuthenticationManager authenticationManager;
    private final   UserRepository userRepository;
    private final  PasswordEncoder passwordEncoder;
    private final  JwtUtils jwtUtils;

    public AuthService(AuthenticationManager authenticationManager, UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    public JwtResponse authenticateUser(LoginRequest loginRequest){
        Authentication authentication=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),loginRequest.getPassword()));
        String jwt=jwtUtils.generateJwtToken(authentication);
        UserPrincipal userPrincipal=(UserPrincipal) authentication.getPrincipal();
        return new JwtResponse(jwt,userPrincipal.getUsername(),userPrincipal.getEmail());
    }

    public User registreUser(String username,String email,String password){
        if(userRepository.existsByUsername(username)){
            throw new RuntimeException("Username already exists");
        }
        if(userRepository.existsByEmail(email)){
            throw new RuntimeException("Email already exists");
        }
        User user=new User(username,passwordEncoder.encode(password),email);
        return userRepository.save(user);

    }
}
