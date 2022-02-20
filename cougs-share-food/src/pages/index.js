import React, { useState, useEffect } from "react";
import { storage, fireStore } from "../firebase";
import { Link } from "react-router-dom";
import "./HomePage.css";
import Button from "@mui/material/Button";

function Home() {
  // const [downloadUrl, setDownloadUrl] = useState(null);
  const [allImages, setImages] = useState([]);
  const [allTextData, setTextData] = useState([]);
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
    //1.
    let storageRef = storage.ref("images");

    storageRef
      .listAll()
      .then(function (res) {
        res.items.forEach((imageRef) => {
          imageRef.getDownloadURL().then((url) => {
            let imageData = {
              urlFirebase: url,
              text: imageRef.name,
            };
            setImages((allImages) => [...allImages, imageData]);
          });
        });
        console.log(allImages);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getTextData();
    console.log(allTextData);
    getFromFirebase();
  }, []);

  return (
    <div className="page">
      <span>
        <h1>Coug Share Food</h1>
        <h2>Cougs helping prevent food waste through sharing</h2>
        <Link to="/inputForm">
          <Button variant="contained"> add</Button>
        </Link>
      </span>
      <h2>Feed</h2>
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
                <span>dynamic Text Info</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
