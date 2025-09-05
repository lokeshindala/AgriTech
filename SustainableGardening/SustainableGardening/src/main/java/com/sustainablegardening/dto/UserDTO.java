

package com.sustainablegardening.dto;
import com.sustainablegardening.dto.UserDTO;

public class UserDTO {

    private String username;
    private String email;

    // --- Constructors ---
    public UserDTO() {}

    public UserDTO(String username, String email) {
        this.username = username;
        this.email = email;
    }

    // --- Getters & Setters ---
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
