package com.todoapp.repository;

import com.todoapp.entity.Task;
import com.todoapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * @author pc
 **/
public interface TaskRepository extends JpaRepository<Task,Long> {
    List<Task> findByUser(User user);
    List<Task> findByUserAndTitleContainingIgnoreCase(User user,String title);
    List<Task> findByUserAndStatus(User user,Task.Status status);
    List<Task> findByUserAndPriority(User user,Task.Priority priority);

    @Query("SELECT t FROM Task t WHERE t.user = :user AND " +
            "(LOWER(t.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(t.description) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<Task> findByUserAndSearchTerm(@Param("user") User user,@Param("search") String search);


}
