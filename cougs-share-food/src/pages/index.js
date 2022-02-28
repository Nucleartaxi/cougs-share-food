import React, { useState, useEffect } from "react";
import { storage, fireStore } from "../firebase";
import { Link } from "react-router-dom";
import "./HomePage.css";
import Button from "@mui/material/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";

function Home() {
  // const [downloadUrl, setDownloadUrl] = useState(null);
  const [allImages, setImages] = useState([]);
  const [allTextData, setTextData] = useState([]);
  const [allCombinedData, setAllCombinedData] = useState([]);
  const getTextData = () => {
    fireStore
      .collection("posts")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var data = element.data();
          setTextData((arr) => [...arr, data]);
        });
      });
  };

  const getFromFirebase = () => {
    let storageRef = storage.ref("images");
    storageRef
      .listAll()
      .then(function (res) {
        res.items.forEach((imageRef) => {
          imageRef.getDownloadURL().then((url) => {
            let imageData = {
              urlFirebase: url,
              title: imageRef.name,
            };
            setImages((allImages) => [...allImages, imageData]);
          });
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const combineData = () => {
    allImages.forEach((image) => {
      var searchData = allTextData.find(
        (data) => data.imageName === image.title
      );
      let combine = {
        urlFirebase: image.urlFirebase,
        title: image.title,
        food: searchData.food,
        location: searchData.location,
        contactInfo: searchData.contactInfo,
        time: searchData.time,
      };
      setAllCombinedData((allCombinedData) => [...allCombinedData, combine]);
    });
  };
  useEffect(() => {
    getFromFirebase();
    getTextData();
    console.log(allTextData);
  }, []);

  return (
    <div className="page">
      <span>
        <center>
          <h1>Coug Share Foods</h1>
          <h2>Cougs helping prevent food waste through sharing</h2>
        </center>
        <center>
          <Link to="/inputForm">
            <Button
              variant="contained"
              size="large"
              endIcon={<AddCircleIcon />}
            >
              {" "}
              Add
            </Button>
          </Link>
        </center>
      </span>

      <center>
        <h2>Feed</h2>
      </center>

      <div className="feed">
        {allImages.map((image) => {
          return (
            <div className="feedBox">
              <span key={image} className="image">
                <img
                  src={image.urlFirebase}
                  alt=""
                  width="325px"
                  height="250px"
                />

                {/* <button onClick={() => deleteFromFirebase(image)}>
               Delete
              </button> */}
              </span>
              <span className="TextDisplay">
                <h3>Name: {image.title}</h3>
                <h3>Location: </h3>
                <h3>Contact: </h3>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
