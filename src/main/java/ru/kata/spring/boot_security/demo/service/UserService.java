package ru.kata.spring.boot_security.demo.service;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.repository.UserRepository;

import java.util.Collection;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public void saveUser(User user) {
        userRepository.save(user);
    }

    @Transactional
    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

    @Transactional
    public User getUserById(Long id) {
        return userRepository.findById(id).get();
    }

    @Transactional
    public void updateUser(User user, Long id) {
        User ouser = userRepository.findById(id).get();
        ouser.setName(user.getName());
        ouser.setLastName(user.getLastName());
        ouser.setUsername(user.getUsername());
        ouser.setRoles((Collection<Role>) user.getAuthorities());
        userRepository.save(ouser);
    }

    @Transactional
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Transactional(readOnly = true)
    public Iterable<User> getAllUsers () {
        return userRepository.findAll();
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException(String.format("User '%s' not found", username));
        }

        return user;
    }
}
