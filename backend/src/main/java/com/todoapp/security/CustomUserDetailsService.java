package com.todoapp.security;

import com.todoapp.entity.User;
import com.todoapp.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author pc
 **/
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    @Transactional()
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        User user=userRepository.findByUsername(username)
                .orElseThrow(()->new UsernameNotFoundException("User not found with username: " + username));

        return UserPrincipal.create(user);
    }

    @Transactional
    public UserDetails loadUserById(Long id){
        User user=userRepository.findById(id)
                .orElseThrow(()->new UsernameNotFoundException("User not find with id: "+id));
        return UserPrincipal.create(user);
    }
}
