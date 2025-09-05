package com.sustainablegardening.controller;

import com.sustainablegardening.model.Reminder;
import com.sustainablegardening.model.User;
import com.sustainablegardening.repository.ReminderRepository;
import com.sustainablegardening.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reminders")
public class ReminderController {

    @Autowired
    private ReminderRepository reminderRepository;

    @Autowired
    private UserRepository userRepository;

    // GET a reminder by ID
    @GetMapping("/{id}")
    public Reminder getReminderById(@PathVariable Long id) {
        return reminderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reminder not found"));
    }

    // PUT (update) a reminder by ID
    @PutMapping("/{id}")
    public Reminder updateReminder(@PathVariable Long id, @RequestBody Reminder updatedReminder) {
        Reminder reminder = reminderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reminder not found"));

        reminder.setTitle(updatedReminder.getTitle());
        reminder.setDescription(updatedReminder.getDescription());
        reminder.setDate(updatedReminder.getDate());

        return reminderRepository.save(reminder);
    }

    // DELETE a reminder by ID
    @DeleteMapping("/{id}")
    public void deleteReminder(@PathVariable Long id) {
        reminderRepository.deleteById(id);
    }

    // GET all reminders
    @GetMapping
    public List<Reminder> getAllReminders() {
        return reminderRepository.findAll();
    }

    // ✅ POST: Create a new reminder for a specific user
    @PostMapping("/user/{userId}")
    public Reminder createReminderForUser(@PathVariable Long userId, @RequestBody Reminder reminder) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        reminder.setUser(user);
        return reminderRepository.save(reminder);
    }
}
