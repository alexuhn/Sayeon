import React, { useCallback, useState } from "react";
import styled from "@emotion/styled";
import { Dialog, IconButton } from "@mui/material";
import { ReactComponent as Close } from "../../assets/icon/close.svg";

const defaultPolaroidRatios = {
  MINI: 54 / 86,
  SQUARE: 72 / 86,
  WIDE: 108 / 86,
};

const defaultImageAndFrameRatios = {
  MINI: 42 / 54,
  SQUARE: 62 / 72,
  WIDE: 99 / 108,
};

const Polaroid: React.FC<{
  imageUrl: string;
  imageType: "MINI" | "SQUARE" | "WIDE";
  senderNickname: string;
}> = ({ imageUrl, imageType, senderNickname }) => {
  const [open, setOpen] = React.useState(false);
  const [height, setHeight] = useState(0);
  const div = useCallback((node) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  const StyledImage = styled.img`
    max-width: ${defaultImageAndFrameRatios[imageType] * 100}%;
    max-height: 100%;
    transform: translateY(12.32%);
    width: 100%;
    border: solid rgba(140, 136, 136, 0.3) 1px;
  `;

  const PolaroidFrame = styled.div`
    background-color: white;
    aspect-ratio: ${defaultPolaroidRatios[imageType]};
    text-align: center;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.05);
    position: relative;
    height: 100%;
  `;

  const Nickname = styled.p`
    position: absolute;
    bottom: 5%;
    right: 5%;
    font-size: ${height / 20}px;
  `;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        PaperProps={{
          style: { borderRadius: 0, overflowY: "unset" },
        }}
        onClose={handleClose}
        open={open}
        disableScrollLock={true}
      >
        <PolaroidFrame>
          <IconButton
            sx={{
              position: "absolute",
              zIndex: "1",
              right: "-5%",
              top: "-20%",
              padding: 0,
            }}
            onClick={handleClose}
          >
            <Close style={{ fill: "white" }} />
          </IconButton>
          <StyledImage
            // src={require(`../../assets/images/test/${imageUrl}`)}
            src={imageUrl}
            alt="img"
            onClick={handleClickOpen}
          />
          <Nickname>{senderNickname}</Nickname>
        </PolaroidFrame>
      </Dialog>

      <PolaroidFrame ref={div}>
        <StyledImage src={imageUrl} alt="img" onClick={handleClickOpen} />
        <Nickname>{senderNickname}</Nickname>
      </PolaroidFrame>
    </>
  );
};

export default Polaroid;
