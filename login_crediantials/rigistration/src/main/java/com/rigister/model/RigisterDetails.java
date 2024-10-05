package com.rigister.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RigisterDetails{

	private String userName;
	private String mail;
	private String psw;
	
}
