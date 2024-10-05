package com.rigister.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rigister.entity.RigisterEntity;

@Repository
public interface RigisterRepository extends JpaRepository<RigisterEntity, Long>{

	Optional<RigisterEntity> findBymail(String mail);
}
