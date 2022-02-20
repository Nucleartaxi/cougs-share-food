import React,{useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


class post {
  constructor(foodName, pickupLocation, contact, imagePath) {
    this.foodName = foodName;
    this.pickupLocation = pickupLocation;
    this.contact = contact;
    this.imagePath = imagePath;
  }
}
export default function InputForm() {
  const [foodName, setFoodName] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [contact, setContactLocation] = useState("");
  const posts = [];


  const fFoodName = (evt) => {
    setFoodName(evt.target.value);
  }
  const fPickupLocation = (evt) => {
    setPickupLocation(evt.target.value);
  }
  const fContact = (evt) => {
    setContactLocation(evt.target.value);
  }
  const submitForm = (evt) => {
    const o = new post(foodName, pickupLocation, contact);
    posts.push(o);
    console.log(o);
    // console.log(foodName);
    // console.log(pickupLocation);
    // console.log(contact);
    console.log(posts);
  }
  return (
    <div>
      <p>test text</p>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Food Name" variant="outlined" onChange={fFoodName} value={foodName} />
        <TextField id="outlined-basic" label="Pickup Location" variant="outlined" onChange={fPickupLocation} value={pickupLocation} />
        <TextField id="outlined-basic" label="Contact" variant="outlined" onChange={fContact} value={contact} />
      </Box>
      <Button onClick={submitForm} variant="contained">test</Button>
    </div>
  );
}

// function inputForm() {
//   return <div></div>;
// }

