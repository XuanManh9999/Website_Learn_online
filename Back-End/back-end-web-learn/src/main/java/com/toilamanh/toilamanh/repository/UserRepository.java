package com.toilamanh.toilamanh.repository;

import com.toilamanh.toilamanh.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserNameAndActive(String userName, Integer active);
    Optional<User> findByEmailAndActive(String email, Integer active);
    Optional<User> findByIdAndActive(Long id, Integer active);
}
