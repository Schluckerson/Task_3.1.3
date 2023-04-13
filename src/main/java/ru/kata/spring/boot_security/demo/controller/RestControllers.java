package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;
import java.util.Map;

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
        return roleService.findAll();
    }

    @PostMapping("update/{id}")
    public void updateUser(@PathVariable Long id, @RequestParam Map<String, String> map) {
        for (String key: map.keySet()) {

        }
    }
}
