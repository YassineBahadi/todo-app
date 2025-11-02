package com.todoapp.service;

import com.todoapp.entity.User;
import com.todoapp.repository.UserRepository;
import com.todoapp.security.UserPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

/**
 * @author pc
 **/
@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository=userRepository;
    }

    public User getCurrentUser(){
        UserPrincipal userPrincipal=(UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return userRepository.findByUsername(userPrincipal.getUsername())
                .orElseThrow(()->new RuntimeException("User not found"));
    }


}
