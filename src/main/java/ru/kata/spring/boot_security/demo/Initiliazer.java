package ru.kata.spring.boot_security.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Service
public  class Initiliazer implements ApplicationRunner {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public Initiliazer(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        Role adminRole = new Role("ROLE_ADMIN");
        Role userRole = new Role("ROLE_USER");
        Set<Role> roles = new HashSet<>();
        roles.add(adminRole);
        roles.add(userRole);
        User user = new User("name", "lastname",
                "user", "password", Collections.singleton(userRole));
        User admin = new User("name", "lastname", "admin", "password", roles);
        roleService.saveRole(adminRole);
        roleService.saveRole(userRole);
        userService.saveUser(admin);
        userService.saveUser(user);
    }
}
