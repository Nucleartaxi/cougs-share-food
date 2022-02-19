import React,{useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export default function InputForm() {
  const [foodName, setFoodName] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [contact, setContactLocation] = useState("");

  const fFoodName = (evt) => {
    setFoodName(evt.target.value);
    console.log(foodName);
  }
  const fPickupLocation = (evt) => {
    setPickupLocation(evt.target.value);
    console.log(pickupLocation);
  }
  const fContact = (evt) => {
    setContactLocation(evt.target.value);
    console.log(contact);
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
    </div>
  );
}

// function inputForm() {
//   return <div></div>;
// }

