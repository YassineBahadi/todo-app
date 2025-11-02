package com.todoapp.service;

import com.todoapp.dto.JwtResponse;
import com.todoapp.dto.LoginRequest;
import com.todoapp.entity.User;
import com.todoapp.repository.UserRepository;
import com.todoapp.security.JwtUtils;
import com.todoapp.security.UserPrincipal;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * @author pc
 **/
@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtils jwtUtils;


    @InjectMocks
    private AuthService authService;

    private User testUser;
    private LoginRequest loginRequest;

    @BeforeEach
    void setUp(){
        testUser=new User("testuser","encodedPassword","test@example.com");
        testUser.setId(1L);

        loginRequest=new LoginRequest("testuser","password");
    }

    @Test
    void authenticateUser_Success(){
        Authentication authentication=mock(Authentication.class);
        UserPrincipal userPrincipal=UserPrincipal.create(testUser);

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(authentication);
        when(authentication.getPrincipal()).thenReturn(userPrincipal);
        when(jwtUtils.generateJwtToken(authentication)).thenReturn("jwt-token");

        JwtResponse response=authService.authenticateUser(loginRequest);

        assertNotNull(response);
        assertEquals("jwt-token",response.getToken());
        assertEquals("testuser",response.getUsername());
        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
    }

    @Test
    void registerUser_Success(){
        when(userRepository.existsByUsername("newuser")).thenReturn(false);
        when(userRepository.existsByEmail("new@example.com")).thenReturn(false);
        when(passwordEncoder.encode("password")).thenReturn("encodderPassword");
        when(userRepository.save(any(User.class))).thenReturn(testUser);

        User result =authService.registreUser("newuser","new@example.com","password");

        assertNotNull(result);
        assertEquals("testuser",result.getUsername());
        verify(userRepository).save(any(User.class));
    }

    @Test
    void registerUser_UsernameTaken_ThrowsException(){
        when(userRepository.existsByUsername("existinguser")).thenReturn(true);

        RuntimeException exception=assertThrows(RuntimeException.class,()->{
            authService.registreUser("existinguser","new@example.com","password");
        });

        assertEquals("Error: Username is already taken!",exception.getMessage());
    }


}