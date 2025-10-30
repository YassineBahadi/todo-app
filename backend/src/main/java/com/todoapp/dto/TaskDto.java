package com.todoapp.dto;

import com.todoapp.entity.Task;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * @author pc
 **/
@NoArgsConstructor
@AllArgsConstructor
@Data
public class TaskDto {
    private Long id;

    @NotBlank
    @Size( max = 100)
    private String title;

    @Size( max = 500)
    private String description;

    private Task.Priority priority;
    private Task.Status status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


}
