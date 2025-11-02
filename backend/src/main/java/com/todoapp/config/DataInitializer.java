package com.todoapp.config;

import com.todoapp.entity.Task;
import com.todoapp.entity.User;
import com.todoapp.repository.TaskRepository;
import com.todoapp.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;

/**
 * @author pc
 **/
@Component
public class DataInitializer implements CommandLineRunner {
    private final UserRepository userRepository;
    private final TaskRepository taskRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, TaskRepository taskRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String ... args) throws Exception {
        if(userRepository.findByUsername("demo").isEmpty()){
            User demoUser =new User("demo",passwordEncoder.encode("demo123"),"demo@todoapp.com");
            User savedUser = userRepository.save(demoUser);

            Task task1 = new Task("Learn Angular", "Learn Angular 19 with standalone components",
                    Task.Priority.HIGH, Task.Status.IN_PROGRESS, savedUser);
            Task task2 = new Task("Build Spring Boot API", "Create REST API with Spring Boot 3",
                    Task.Priority.HIGH, Task.Status.COMPLETED, savedUser);
            Task task3 = new Task("Deploy Application", "Deploy to Railway/Render",
                    Task.Priority.MEDIUM, Task.Status.PENDING, savedUser);


            taskRepository.saveAll(Arrays.asList(task1, task2, task3));


        }
    }

}
