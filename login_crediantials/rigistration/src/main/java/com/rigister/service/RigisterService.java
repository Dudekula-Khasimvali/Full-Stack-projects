package com.rigister.service;


import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rigister.entity.RigisterEntity;
import com.rigister.model.RigisterDetails;
import com.rigister.repository.RigisterRepository;

@Service
public class RigisterService {

	
	@Autowired
	RigisterRepository repository;
	
	public RigisterEntity creatStudent(RigisterDetails rigisterDetails) {
		
		RigisterEntity entity = new RigisterEntity();
		
		entity.setUserName(rigisterDetails.getUserName());
		entity.setMail(rigisterDetails.getMail());
		entity.setPsw(rigisterDetails.getPsw());
		entity.setCreatedAt(new Date());
		entity.setCreatedBy(System.getProperty("user.name"));
		
		return repository.save(entity);
	}

	public List<RigisterEntity> retriveStudent() {
		return repository.findAll();
	}

	public Optional<RigisterEntity> getByid(long studentId) {
		return repository.findById(studentId);
	}

	public RigisterEntity updateStudent(Long studentId, RigisterDetails details) {
	    // Find the student by ID
	    Optional<RigisterEntity> optionalEntity = repository.findById(studentId);
	    
	    // Check if the student entity is present
	    if (optionalEntity.isPresent()) { // Use isPresent() to check existence
	        RigisterEntity student = optionalEntity.get(); // Get the student entity

	        // Update fields only if provided in details
	        if (details.getUserName() != null) {
	            student.setUserName(details.getUserName());
	        }
	     
	        if (details.getMail() != null) {
	            student.setMail(details.getMail());
	        }
	        
	        if (details.getPsw() != null) {
	            student.setPsw(details.getPsw());
	        }

	        // Save the updated student entity
	        return repository.save(student);
	    }
	    
	    return null; // Return null if the student does not exist
	}

	public void delete(long studentId) {
		
		repository.deleteById(studentId);
		
	}

	public Optional<RigisterEntity> getByemail(String mail) {
		return repository.findBymail(mail);
		
	}



}
