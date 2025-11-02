package com.todoapp.service;

import com.todoapp.dto.TaskDto;
import com.todoapp.entity.Task;
import com.todoapp.entity.User;
import com.todoapp.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

/**
 * @author pc
 **/
@ExtendWith(MockitoExtension.class)
class TaskServiceTest {
    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    private User testUser;
    private Task testTask;
    private TaskDto testTaskDto;

    @BeforeEach
    void setUp(){
        testUser=new User("testuser","password","test@example.com");
        testUser.setId(1L);

        testTask=new Task("Test Task","Test Description",Task.Priority.HIGH,Task.Status.PENDING,testUser);
        testTask.setId(1L);

        testTaskDto=new TaskDto(1L,"Test Task","Test Description",Task.Priority.HIGH,Task.Status.PENDING,null,null);

    }


    @Test
    void getAllUserTasks_Success(){
        when(taskRepository.findByUser(testUser)).thenReturn(Arrays.asList(testTask));

        List<TaskDto> result=taskService.getAllUserTasks(testUser);

        assertNotNull(result);
        assertEquals(1,result.size());
        assertEquals("Test Task",result.get(0).getTitle());
        verify(taskRepository.findByUser(testUser));
    }

    @Test
    void createTask_Success(){
        when(taskRepository.save(any(Task.class))).thenReturn(testTask);

        TaskDto result=taskService.createTask(testTaskDto,testUser);

        assertNotNull(result);
        assertEquals("Test Task",result.getTitle());
        verify(taskRepository).save(any(Task.class));
    }


    @Test
    void deleteTask_Success(){
        when(taskRepository.findById(1L)).thenReturn(Optional.of(testTask));

        taskService.deleteTask(1L,testUser);

        verify(taskRepository).delete(testTask);
    }

}