package com.ssafy.sayeon.common.exception;

public class NotExistUserException extends RuntimeException{
	public NotExistUserException() {
		super("존재하지 않는 유저입니다.");
	}

}
