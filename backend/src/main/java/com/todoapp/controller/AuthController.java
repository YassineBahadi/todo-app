package com.todoapp.controller;

import com.todoapp.dto.JwtResponse;
import com.todoapp.dto.LoginRequest;
import com.todoapp.dto.RegisterRequest;
import com.todoapp.entity.User;
import com.todoapp.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * @author pc
 **/
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins="*",maxAge=3600)
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest){
        JwtResponse jwtResponse=authService.authenticateUser(loginRequest);
        return ResponseEntity.ok(jwtResponse);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest signUpRequest){
        User user=authService.registreUser(
                signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                signUpRequest.getPassword()
        );
        Map <String,String> response=new HashMap<>();
        response.put("message","User registered successfully");
        response.put("username",user.getUsername());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/check")
    public ResponseEntity<?> checkAuth(){
        Map<String,String> response=new HashMap<>();
        response.put("message","API is working!");
        return ResponseEntity.ok(response);
    }
}
