import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { storage, fireStore } from "../firebase";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// class post {
//   constructor(foodName, pickupLocation, contact, ImagePath) {
//     this.foodName = foodName;
//     this.pickupLocation = pickupLocation;
//     this.contact = contact;
//     this.imagePath = ImagePath;
//   }
// }

export default function InputForm() {
  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  const [foodName, setFoodName] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [contact, setContactLocation] = useState("");

  const fFoodName = (evt) => {
    setFoodName(evt.target.value);
  };
  const fPickupLocation = (evt) => {
    setPickupLocation(evt.target.value);
  };
  const fContact = (evt) => {
    setContactLocation(evt.target.value);
  };

  console.log(imageAsFile);
  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };

  const submitForm = (evt) => {
    evt.preventDefault();
    console.log("start of upload");
    if (imageAsFile === "") {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    }

    const uploadTask = storage
      .ref(`/images/${imageAsFile.name}`)
      .put(imageAsFile);
    //initiates the firebase side uploading
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot);
      },
      (err) => {
        //catches the errors
        console.log(err);
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage
          .ref("images")
          .child(imageAsFile.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            setImageAsUrl((prevObject) => ({
              ...prevObject,
              imgUrl: fireBaseUrl,
            }));
          });
      }
    );
    fireStore.collection("posts").add({
      food: foodName,
      location: pickupLocation,
      contactInfo: contact,
      imageName: imageAsFile.name,
    });
    let navigate = useNavigate();
    navigate.push("/");
  };

  const Input = styled("input")({
    display: "none",
  });
  return (
    <div>
      <p className="test">test text</p>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Food Name"
          variant="outlined"
          onChange={fFoodName}
          value={foodName}
        />
        <TextField
          id="outlined-basic"
          label="Pickup Location"
          variant="outlined"
          onChange={fPickupLocation}
          value={pickupLocation}
        />
        <TextField
          id="outlined-basic"
          label="Contact"
          variant="outlined"
          onChange={fContact}
          value={contact}
        />
      </Box>

      <Stack>
        <label htmlFor="icon-button-file">
          <Input
            accept="image/*"
            id="icon-button-file"
            type="file"
            onChange={handleImageAsFile}
          />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            size="large"
          >
            <PhotoCamera size="large" />
          </IconButton>
        </label>
      </Stack>
      <Button onClick={submitForm} variant="contained" size="large">
        Submit
      </Button>
    </div>
  );
}
