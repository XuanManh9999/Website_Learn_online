package com.toilamanh.toilamanh.repository;

import com.toilamanh.toilamanh.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserNameAndActive(String userName, Integer active);
    Optional<User> findByUserNameAndActiveAndEmail(String userName, Integer active, String email);
    Optional<User> findByEmailAndActive(String email, Integer active);
    Optional<User> findByIdAndActive(Long id, Integer active);
    Optional<User> findByEmail(String email);
    Long countAllByActive(Integer active);
    Optional<User> findByuserName(String username);
    @Query("SELECT U FROM User U WHERE LOWER(U.userName) LIKE LOWER(CONCAT('%', :userName, '%'))")
    List<User> searchUsersByUserName(@Param("userName") String userName);
}
