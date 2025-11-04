package com.todoapp.controller;

import com.todoapp.dto.TaskDto;
import com.todoapp.entity.Task;
import com.todoapp.entity.User;
import com.todoapp.service.TaskService;
import com.todoapp.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author pc
 **/
@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins="*",maxAge = 3600)
public class TaskController {
    private final TaskService taskService;
    private final UserService userService;

    public TaskController(TaskService taskService, UserService userService) {
        this.taskService = taskService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<TaskDto>> getAllTasks(){
        User currentUser=userService.getCurrentUser();
        List<TaskDto> tasks=taskService.getAllUserTasks(currentUser);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskDto> getTaskById(@PathVariable Long id){
        User currentUser=userService.getCurrentUser();
        TaskDto task=taskService.getTaskById(id, currentUser);
        return ResponseEntity.ok(task);
    }

    @PostMapping
    public ResponseEntity<TaskDto> createTask(@Valid @RequestBody TaskDto taskDto){
        User currentUser=userService.getCurrentUser();
        TaskDto createdTask=taskService.createTask(taskDto, currentUser);
        return ResponseEntity.ok(createdTask);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskDto> updateTask(@PathVariable Long id,@Valid @RequestBody TaskDto taskDto){
        User currentUser=userService.getCurrentUser();
        TaskDto updatedTask=taskService.updateTask(id,taskDto,currentUser);
        return ResponseEntity.ok(updatedTask);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id){
        User currentUser=userService.getCurrentUser();
        taskService.deleteTask(id, currentUser);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<TaskDto>> searchTasks(@RequestParam String q){
        User currentUser=userService.getCurrentUser();
        List<TaskDto> tasks=taskService.searchTasks(currentUser,q);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/filter/status")
    public ResponseEntity<List<TaskDto>> filterByStatus(@RequestParam Task.Status status){
        User currentUser=userService.getCurrentUser();
        List<TaskDto>tasks=taskService.filterTasksByStatus(currentUser,status);

        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/filter/priority")
    public ResponseEntity<List<TaskDto>> filterByPriority(@RequestParam Task.Priority priority){
        User currentUser = userService.getCurrentUser();
        List<TaskDto> tasks=taskService.filterTasksByPriority(currentUser,priority);
        return ResponseEntity.ok(tasks);
    }


}
