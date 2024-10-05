package com.rigister.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rigister.entity.RigisterEntity;
import com.rigister.model.RigisterDetails;
import com.rigister.service.RigisterService;

@RestController
@RequestMapping("/api/rigister")
@CrossOrigin(origins = {"*"})
public class RigisterController {
	
	@Autowired
	RigisterService rigisterService;
	
	@PostMapping("/create")
	public RigisterEntity createStudent(@RequestBody RigisterDetails rigisterDetails) {
		
		return rigisterService.creatStudent(rigisterDetails); 
	}
	
	@GetMapping("retrive")
	public List<RigisterEntity> retriveStudent() {
		return rigisterService.retriveStudent();
	}
	
	@GetMapping("getByid/{studentId}")
	public Optional<RigisterEntity> getByid(@PathVariable long studentId)
	{
		return rigisterService.getByid(studentId);
	}
	
	@GetMapping("getBymail/{mail}")
	public Optional<RigisterEntity> getByemail(@PathVariable String mail){
		return rigisterService.getByemail(mail);
	}
	
	@PatchMapping("/update/{studentId}")
	public RigisterEntity updateStudent(@PathVariable long studentId , @RequestBody RigisterDetails details) {
		return rigisterService.updateStudent(studentId,details);
	}
	
	@DeleteMapping("delete/{studentId}")
	public void deleteStudent(@PathVariable long studentId) {
		rigisterService.delete(studentId);
	}
}
