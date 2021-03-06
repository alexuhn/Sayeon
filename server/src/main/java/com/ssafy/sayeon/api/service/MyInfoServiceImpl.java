package com.ssafy.sayeon.api.service;

import java.security.SecureRandom;
import java.util.Date;
import java.util.Optional;

import javax.transaction.Transactional;

import org.apache.commons.mail.HtmlEmail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.sayeon.api.request.UserProfileUpdateReq;
import com.ssafy.sayeon.api.request.UserPwUpdateReq;
import com.ssafy.sayeon.model.entity.Member;
import com.ssafy.sayeon.model.entity.MemberProfile;
import com.ssafy.sayeon.model.repository.MemberProfileRepository;
import com.ssafy.sayeon.model.repository.MemberRepository;

@Service("myInfoService")
public class MyInfoServiceImpl implements MyInfoService {

	@Autowired
	MemberProfileRepository userProfileRepository;

	@Autowired
	MemberRepository memberRepository;

	@Autowired
	PasswordEncoder encode;

	@Override
	@Transactional
	public void modifyUserProfile(String userId, UserProfileUpdateReq profileUpdateInfo) {
		MemberProfile userProfile = userProfileRepository.getById(userId);

		if (profileUpdateInfo.getNickname() != null)
			userProfile.setNickname(profileUpdateInfo.getNickname());

		if (profileUpdateInfo.getProfilePic() != 0)
			userProfile.setProfilePic(profileUpdateInfo.getProfilePic());

		if (profileUpdateInfo.getLocation() != null) {
			userProfile.setLocation(profileUpdateInfo.getLocation());
			userProfile.setLatitude(profileUpdateInfo.getLatitude());
			userProfile.setLongitude(profileUpdateInfo.getLongitude());
		}

		userProfileRepository.save(userProfile);
	}

	@Override
	public void modifyUserPw(String userId, UserPwUpdateReq updatePw) {
		Member member = memberRepository.getById(userId);

		if (!updatePw.getPassword().equals(null))
			member.setPassword(encode.encode(updatePw.getPassword()));

		memberRepository.save(member);
	}

	@Override
	public boolean findUserPw(String email) {
		// TODO Auto-generated method stub
		Optional<Member> temp = memberRepository.findByEmail(email);
		if (!temp.isPresent())
			return false;
		Member member = temp.get();
		// ?????? ???????????? ??????
		String pw = "";
		char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
				'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a',
				'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
				'w', 'x', 'y', 'z', '!', '@', '#', '$', '%', '^', '&' };
		int idx = 0;
		int len = charSet.length;
		
		SecureRandom sr = new SecureRandom();
		sr.setSeed(new Date().getTime());

		for (int i = 0; i < 10; i++) {
			idx = sr.nextInt(len); 
			pw += charSet[idx];
		}

		member.setPassword(encode.encode(pw));
		memberRepository.save(member);
		sendEmail(member, pw);
		return true;
	}

	@Override
	public void sendEmail(Member member, String pw) {
		// TODO Auto-generated method stub
		// Mail Server ??????
		String charSet = "utf-8";
		String hostSMTP = "smtp.gmail.com"; // ????????? ????????? smtp.naver.com
		String hostSMTPid = "sayeonservice@gmail.com";
		String hostSMTPpwd = "qweqwe123!";

		// ????????? ?????? EMail, ??????, ??????
		String fromEmail = "sayeonservice@gmail.com";
		String fromName = "???????????? ???????????? ??????";
		String subject = "";
		String msg = "";

		subject = "???????????? ????????????, ????????? ?????? ???????????? ?????????.";
		msg += "<div align='center'>";
		msg += "<h3 style='color: blue;'>";
		msg += member.getMemberProfile().getNickname() + "?????? ?????? ???????????? ?????????. ????????? ??? ??????????????? ???????????? ???????????????.</h3>";
		msg += "<p>?????? ???????????? : ";
		msg += pw + "</p></div>";

		// ?????? ?????? E-Mail ??????
		String mail = member.getEmail();
		try {
			HtmlEmail email = new HtmlEmail();
			email.setDebug(true);
			email.setCharset(charSet);
			email.setSSL(true);
			email.setHostName(hostSMTP);
			email.setSmtpPort(465); // ????????? ????????? 587

			email.setAuthentication(hostSMTPid, hostSMTPpwd);
			email.setTLS(true);
			email.addTo(mail, charSet);
			email.setFrom(fromEmail, fromName, charSet);
			email.setSubject(subject);
			email.setHtmlMsg(msg);
			email.send();
		} catch (Exception e) {
			System.out.println("???????????? ?????? : " + e);
		}
	}
}
