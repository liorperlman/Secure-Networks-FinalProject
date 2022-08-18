package com.example.secure_networks.backend.Utility;

import java.math.BigInteger;
import java.security.MessageDigest;

public class Encryption {
    
    public static String calcSaltedHash(String pass, String salt) {
		//calculation
		String saltPlusPass = salt + pass;

		//set Entity field
		return encryptThisString(saltPlusPass);
	}

    public static String encryptThisString(String input) {
		try {
			// getInstance() method is called with algorithm SHA-1
			MessageDigest md = MessageDigest.getInstance("SHA-1");

			// digest() method is called
			// to calculate message digest of the input string
			// returned as array of byte
			byte[] messageDigest = md.digest(input.getBytes());

			// Convert byte array into signum representation
			BigInteger no = new BigInteger(1, messageDigest);

			// Convert message digest into hex value
			String hashtext = no.toString(16);

			// Add preceding 0s to make it 32 bit
			while (hashtext.length() < 32) {
				hashtext = "0" + hashtext;
			}

			// return the HashText
			return hashtext;
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
	}



}
