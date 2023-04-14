package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.Comparator;
import java.util.stream.Collectors;

@RestController
@RequestMapping("data")
public class RestControllers {
    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public RestControllers(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/users")
    public Object getUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/users/{id}")
    public Object getUser(@PathVariable("id") Long id) {
        return userService.getUserById(id);
    }

    @GetMapping("roles")
    public Object getRoles() {
        return roleService.findAll().stream().sorted(Comparator.comparing(Role::getId));
    }

    @PostMapping("update/{id}")
    public void updateUser(@PathVariable Long id, @RequestBody User user) {
        userService.updateUser(user, id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUserById(id);
    }

    @PutMapping("/new")
    public void addUser(@RequestBody User user) {
        userService.saveUser(user);
    }
}
