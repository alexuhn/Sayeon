package com.ssafy.sayeon.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.sayeon.model.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
	Optional<User> findByUserId(String userId);
}
