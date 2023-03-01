import { Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import Webcam from "react-webcam";

const UploadReceiptForm = () => {
  const handleSubmit = (event) => {
    console.log("Form submitted!");
  };

  return (
    <Card elevation={2}>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Typography variant="h5" color="primary.dark">
            Upload receipt
          </Typography>
          <Webcam
            audio={false}
            height={720}
            screenshotFormat="image/jpeg"
            width={1280}
            videoConstraints={{
              width: 1280,
              height: 720,
              facingMode: "user",
            }}
          >
            {({ getScreenshot }) => (
              <Button
                onClick={() => {
                  const imageSrc = getScreenshot();
                  console.log(imageSrc);
                }}
              >
                Capture photo
              </Button>
            )}
          </Webcam>
        </CardContent>
      </form>
    </Card>
  );
};

export default UploadReceiptForm;
