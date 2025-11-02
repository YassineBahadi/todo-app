package com.todoapp.service;

import com.todoapp.dto.TaskDto;
import com.todoapp.entity.Task;
import com.todoapp.entity.User;
import com.todoapp.repository.TaskRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author pc
 **/
@Service
@Transactional
public class TaskService {
     final  TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    private TaskDto convertToDto(Task task) {
        return new TaskDto(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getPriority(),
                task.getStatus(),
                task.getCreatedAt(),
                task.getUpdatedAt()
        );
    }

    private Task convertToEntity(TaskDto taskDto, User user) {
        Task task = new Task();
        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        task.setPriority(taskDto.getPriority());
        task.setStatus(taskDto.getStatus());
        task.setUser(user);
        return task;
    }

    public List<TaskDto> getAllUserTasks(User user){
        return taskRepository.findByUser(user)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public TaskDto getTaskById(Long id,User user){
        Task task=taskRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Task not found with id "+id));
        if(!task.getUser().getId().equals(user.getId())){
            throw new RuntimeException("User not owned by this task");
        }
        return convertToDto(task);
    }

    public TaskDto createTask(TaskDto taskDto,User user){
        Task  task=convertToEntity(taskDto,user);
        Task savedTask=taskRepository.save(task);
        return convertToDto(savedTask);
    }

    public TaskDto updateTask(Long id,TaskDto taskDto, User user){
        Task existingTask=taskRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Task not found with id:"+ id));

        if(!existingTask.getUser().getId().equals(user.getId())){
            throw new RuntimeException("Access denied");
        }
        existingTask.setTitle(taskDto.getTitle());
        existingTask.setDescription(taskDto.getDescription());
        existingTask.setPriority(taskDto.getPriority());
        existingTask.setStatus(taskDto.getStatus());

        Task updatedTask=taskRepository.save(existingTask);
        return convertToDto(updatedTask);
    }

    public void deleteTask(Long id,User user){
        Task task=taskRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Task not found with id:"+id));
        if(!task.getUser().getId().equals(user.getId())){
            throw new RuntimeException("Access denied");
        }
        taskRepository.delete(task);
    }

    public List<TaskDto> searchTasks(User user,String searchTerm){
        return taskRepository.findByUserAndSearchTerm(user,searchTerm)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<TaskDto> filterTasksByPriority(User user,Task.Priority priority){
        return taskRepository.findByUserAndPriority(user,priority)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<TaskDto> filterTasksByStatus(User user, Task.Status status) {
        return taskRepository.findByUserAndStatus(user,status)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
}
