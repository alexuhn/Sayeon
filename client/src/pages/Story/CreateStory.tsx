import React, { useState } from "react";
import CropImage from "../../components/Story/CropImage";
import { Stack } from "@mui/material";
import Headerbar from "../../components/Headerbar";
import SelectWaiting from "../../components/Story/SelectWaiting";
import SelectKeyword from "../../components/Story/SelectKeyword";
import ConfirmStory from "../../components/Story/ConfirmStory";
import CreateStoryHeaderbar from "../../components/Story/CreateStoryHeaderbar";

const CreateStory: React.FC = () => {
  const [step, setStep] = useState<number>(1);

  return (
    <>
      {step === 1 ? (
        <Headerbar headerName={"사연 작성"} />
      ) : (
        <CreateStoryHeaderbar headerName={"사연 작성"} setStep={setStep} />
      )}

      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ height: "calc(100% - 56px)" }}
      >
        {
          {
            1: <CropImage setStep={setStep} />,
            2: <SelectWaiting setStep={setStep} />,
            3: <SelectKeyword setStep={setStep} />,
            4: <ConfirmStory setStep={setStep} />,
          }[step]
        }
      </Stack>
    </>
  );
};

export default CreateStory;