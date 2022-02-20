import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import storage from "../firebase";

class post {
  constructor(foodName, pickupLocation, contact, ImagePath) {
    this.foodName = foodName;
    this.pickupLocation = pickupLocation;
    this.contact = contact;
    this.imagePath = ImagePath;
  }
}

export default function InputForm() {
  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  const [foodName, setFoodName] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [contact, setContactLocation] = useState("");
  const [file, setFile] = useState(null);
  const posts = [];

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
    const o = new post(foodName, pickupLocation, contact, file);
    posts.push(o);
  };
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
      <input type="file" onChange={handleImageAsFile} />
      <Button onClick={submitForm} variant="contained">
        Submit
      </Button>
    </div>
  );
}
