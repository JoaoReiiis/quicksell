package com.quicksell.services;

import com.quicksell.models.User;
import com.quicksell.models.dto.UserCreateDTO;
import com.quicksell.models.dto.UserUpdateDTO;
import com.quicksell.models.enums.ProfileEnum;
import com.quicksell.repositories.UserRepository;
import com.quicksell.security.UserSpringSecurity;
import com.quicksell.services.exceptions.AuthorizationException;
import com.quicksell.services.exceptions.DataBindingViolationException;
import com.quicksell.services.exceptions.ObjectNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class UserService {

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private UserRepository userRepository;

    @SuppressWarnings("null")
    public User findById(Long id) {
        UserSpringSecurity userSpringSecurity = authenticated();
        if(
                !Objects.nonNull(userSpringSecurity) || 
                        !userSpringSecurity.hasRole(ProfileEnum.ADMIN) &&
                                !id.equals(userSpringSecurity.getId())
        )
            throw new AuthorizationException("Access denied");

        Optional<User> user = this.userRepository.findById(id);
        return user.orElseThrow(() -> new ObjectNotFoundException(
                "Usuario nao encontrado" + id + ", Tipo: " + User.class.getName()));
    }

    public Long findId() {
        Long id = authenticated().getId();
        return id;
    }
    
    @Transactional
    public User create(User obj) {
        obj.setId(null);
        obj.setPassword(this.bCryptPasswordEncoder.encode(obj.getPassword()));
        obj.setProfiles(Stream.of(ProfileEnum.USER.getCode()).collect(Collectors.toSet()));
        obj = this.userRepository.save(obj);
        return obj;
    }

    @Transactional
    public User update(User obj) {
        User newObj = findById(obj.getId());
        newObj.setPassword(this.bCryptPasswordEncoder.encode(obj.getPassword()));
        return this.userRepository.save(newObj);
    }

    @SuppressWarnings("null")
    public void delete(Long id) {
        findById(id);
        try {
            this.userRepository.deleteById(id);
        } catch (Exception e) {
            throw new DataBindingViolationException("Nao e possivel excluir pois ha entidades relacionadas");
        }
    }

    public static UserSpringSecurity authenticated(){
        try{
            return (UserSpringSecurity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        }catch (Exception e){
            return null;
        }
    }

    public User fromDTO(@Valid UserCreateDTO obj){
        User user = new User();
        user.setUsername(obj.getUsername());
        user.setPassword(obj.getPassword());
        return user;

    }

    public User fromDTO(@Valid UserUpdateDTO obj){
        User user = new User();
        user.setId(obj.getId());
        user.setPassword(obj.getPassword());
        return user;

    }
}
