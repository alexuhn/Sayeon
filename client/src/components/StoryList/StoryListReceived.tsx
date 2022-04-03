import React from "react";
import Polaroid from "./StoryListPolaroid";
import { Box, ImageList, ImageListItem } from "@mui/material";

const StoryListReceived: React.FC = () => {
  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "space-between", mx: 3 }}>
        <p>받은 사연</p>
        {/* 받은 사연 수 */}
        <p>24</p>
      </Box>
      <Box sx={{ px: 2, height: 520, overflowY: "scroll", mt: 2 }}>
        <ImageList variant="masonry" cols={2} gap={10}>
          <ImageListItem>
            <Polaroid
              imageUrl={require("../../assets/images/test/square_default.png")}
              imageType={"SQUARE"}
              senderNickname={"발신자 닉네임 1"}
            />
          </ImageListItem>
          <ImageListItem>
            <Polaroid
              imageUrl={require("../../assets/images/test/mini_default.png")}
              imageType={"MINI"}
              senderNickname={"발신자 닉네임 2"}
            />
          </ImageListItem>
          <ImageListItem>
            <Polaroid
              imageUrl={require("../../assets/images/test/wide_default.png")}
              imageType={"WIDE"}
              senderNickname={"발신자 닉네임 3"}
            />
          </ImageListItem>
          <ImageListItem>
            <Polaroid
              imageUrl={require("../../assets/images/test/square_default.png")}
              imageType={"SQUARE"}
              senderNickname={"발신자 닉네임 4"}
            />
          </ImageListItem>
          <ImageListItem>
            <Polaroid
              imageUrl={require("../../assets/images/test/wide_default.png")}
              imageType={"WIDE"}
              senderNickname={"발신자 닉네임 5"}
            />
          </ImageListItem>
          <ImageListItem>
            <Polaroid
              imageUrl={require("../../assets/images/test/square_default.png")}
              imageType={"SQUARE"}
              senderNickname={"발신자 닉네임 6"}
            />
          </ImageListItem>
        </ImageList>
      </Box>
    </div>
  );
};

export default StoryListReceived;
