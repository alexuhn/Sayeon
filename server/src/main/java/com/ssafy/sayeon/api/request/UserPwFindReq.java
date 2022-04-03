package com.ssafy.sayeon.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserPwFindRequest")
public class UserPwFindReq {
	@ApiModelProperty(name="유저 이메일")
	String email;
}
