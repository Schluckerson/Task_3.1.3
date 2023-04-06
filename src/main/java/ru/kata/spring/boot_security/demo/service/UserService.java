package ru.kata.spring.boot_security.demo.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import ru.kata.spring.boot_security.demo.model.User;

public interface UserService extends UserDetailsService {
    Object getAllUsers();

    void deleteUserById(Long id);

    void updateUser(User user, Long id);

    Object getUserById(Long id);

    void saveUser(User user);
}
