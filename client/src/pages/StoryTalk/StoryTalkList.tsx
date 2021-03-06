import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import StoryTalkItem from "components/StoryTalk/StoryTalkItem";
import {
  Stack,
  Box,
  Divider,
  CircularProgress,
  Snackbar,
  Alert,
  Button,
} from "@mui/material";
import Headerbar from "components/Headerbar";
import StoryTalk from "./StoryTalk";
import StoryTalkHeaderbar from "components/StoryTalk/StoryTalkHeaderbar";

export default function StoryTalkList() {
  // STATE
  const [storyTalkList, setStoryTalkList] = useState<any>();
  const [myInfo, setMyInfo] = useState<any>();
  const [storyTalkOpen, setStoryTalkOpen] = useState(false);
  const [load, setLoad] = useState(true);
  const [otherUserInfo, setOtherUserInfo] = useState<{
    id: string;
    nickname: string;
    profilePic: number;
    withdrawal: string;
  }>({ id: "", nickname: "", profilePic: 0, withdrawal: "" });

  // GET 요청
  const getStoryTalkList = () => {
    axios
      .get("/story-talk/list", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response: any) => {
        setStoryTalkList(response.data.storyTalkList);
      })
      .catch((err: any) => {
        // console.log(err);
      });
  };

  const getMyInfo = () => {
    axios
      .get("userInfo/myinfo", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setMyInfo(res.data.data);
      })
      .catch((err) => {
        if (err.response.status === 500) {
          localStorage.removeItem("token");
          setTimeout(function () {
            window.location.reload();
          }, 500);
        }
      });
  };

  const getOtherUserInfo = (otherUserId: string) => {
    axios
      .get("userInfo", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          userId: otherUserId,
        },
      })
      .then((res) => {
        setOtherUserInfo({
          id: otherUserId,
          nickname: res.data.data.memberProfile.nickname,
          profilePic: res.data.data.memberProfile.profilePic,
          withdrawal: res.data.data.memberProfile.withdrawal,
        });
        setStoryTalkOpen(true);
      })
      .catch((err) => {
        // console.log(err)
      });
  };

  const endRef = useRef<null | HTMLDivElement>(null);
  // RENDER
  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (storyTalkList) {
      setTimeout(() => {
        setLoad(false);
      }, 300);
    } else {
      getMyInfo();
      getStoryTalkList();
    }
  }, [storyTalkList, storyTalkOpen]);

  const showStoryTalkItems = storyTalkList?.map(
    (storyTalk: any, idx: number) => {
      return (
        <Box
          onClick={() => {
            getOtherUserInfo(
              storyTalk.storyTalk[0].receiverId === myInfo.userId
                ? storyTalk.storyTalk[0].senderId
                : storyTalk.storyTalk[0].receiverId
            );
          }}
          key={idx}
        >
          <StoryTalkItem
            key={idx}
            storyTalk={storyTalk.storyTalk}
            myInfo={myInfo}
            storyTalkOpen={storyTalkOpen}
            setStoryTalkOpen={setStoryTalkOpen}
          />
          {idx < storyTalkList.length - 1 && (
            <Divider light sx={{ margin: "0 15px" }} />
          )}
        </Box>
      );
    }
  );

  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState("");
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      {storyTalkOpen && (
        <StoryTalkHeaderbar
          headerName={otherUserInfo?.nickname}
          otherUserInfo={otherUserInfo}
          otherUserId={otherUserInfo.id}
          setStoryTalkOpen={setStoryTalkOpen}
          setOpen={setOpen}
          setSnackbar={setSnackbar}
        />
      )}
      {!storyTalkOpen && <Headerbar headerName={"사연 대화 목록"} />}
      <Stack
        direction="column"
        sx={{
          height: "calc(100% - 70px - 70px)",
          overflowY: "auto",
        }}
      >
        {load && (
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
              height: "calc(100% - 70px - 70px)",
              width: "100%",
              position: "fixed",
              backgroundColor: "#f9f9f9",
              zIndex: 1,
            }}
          >
            <CircularProgress />
          </Stack>
        )}
        <Box sx={{ margin: storyTalkOpen ? "0" : "10px 0 10px 10px" }}>
          {storyTalkList && !storyTalkOpen && <div id="scroll" ref={endRef} />}
          {storyTalkList && !storyTalkOpen && showStoryTalkItems}
          {storyTalkList && storyTalkOpen && (
            <StoryTalk
              myInfo={myInfo}
              otherUserInfo={otherUserInfo}
              setStoryTalkOpen={setStoryTalkOpen}
            />
          )}
        </Box>
        {storyTalkList && storyTalkList.length === 0 && (
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ height: "100%" }}
          >
            <p style={{ color: "#8c8888", fontSize: "15px" }}>
              아직 받은 사연이 없습니다.
            </p>
            <p style={{ color: "#8c8888", fontSize: "15px" }}>
              새로운 사연을 보내보세요!
            </p>
            <Button
              href="/send"
              sx={{
                color: "white",
                fontFamily: "S-CoreDream-4Regular",
                margin: "10px 30px 30px",
              }}
              disableElevation={true}
              size="large"
              variant="contained"
            >
              사연 보내기
            </Button>
          </Stack>
        )}
      </Stack>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          성공적으로 처리되었습니다.
        </Alert>
      </Snackbar>
    </>
  );
}
