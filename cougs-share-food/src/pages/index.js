import React, { useState, useEffect } from "react";
import storage from "../firebase";

function handleCLick() {}

function Home() {
  const [allImages, setImages] = useState([]);
  const getFromFirebase = () => {
    //1.
    let storageRef = storage.ref("images");
    //2.
    console.log(storageRef);
    storageRef
      .listAll()
      .then(function (res) {
        //3.
        res.items.forEach((imageRef) => {
          imageRef.getDownloadURL().then((url) => {
            //4.
            setImages((allImages) => [...allImages, url]);
            console.log(allImages);
          });
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getFromFirebase();
  }, []);

  return (
    <div>
      <h1>Coug Share Food</h1>

      <button onClick={handleCLick}> add</button>

      <div id="photos">
        {allImages.map((image) => {
          return (
            <div key={image} className="image">
              <img src={image} alt="" />
              {/* <button onClick={() => deleteFromFirebase(image)}>
               Delete
              </button> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
