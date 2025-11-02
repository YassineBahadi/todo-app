package com.todoapp.entity;

import ch.qos.logback.core.status.Status;
import jakarta.annotation.Priority;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * @author pc
 **/
@Entity
@Table(name="tasks")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max=100)
    private String title;

    @Size(max=500)
    private String description;

    @Enumerated(EnumType.STRING)
    private Priority priority=Priority.MEDIUM;

    @Enumerated(EnumType.STRING)
    private Status status=Status.PENDING;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    public Task(String title, String description, Priority priority, Status status, User user) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.status = status;
        this.user = user;
    }

    public enum Priority {
        LOW, MEDIUM, HIGH
    }

    public  enum Status {
        PENDING,IN_PROGRESS,COMPLETED
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

}
