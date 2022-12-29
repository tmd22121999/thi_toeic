import React, { useState } from "react";
import Axios from "axios";

function GoogleDriveFileUploader() {
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const handleSubmit = async (e) => {
    console.log(file);
    e.preventDefault();
    let formData = new FormData();    //formdata object

        formData.append('file', file.data);  

        console.log(file);

        Axios.post("http://localhost:4000/upload-file-to-google-drive", formData)
            .then(response => {
                const id = response.data.response.data.id;
                setImage("https://drive.google.com/uc?id="+id);
                console.log(id);
            })
            .catch(error => {
                console.log(error);
            });
    // const responseWithBody = await response.json();
    // if (response) setUrl(responseWithBody.publicUrl);
  };

  const handleFileChange = (e) => {
    const file = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setFile(file);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="file" onChange={handleFileChange}></input>
      <img src={image}></img>
      <audio controls>
                  <source src={"https://drive.google.com/uc?id=1J9RfJvDqCvTeLMeLzmQMIyhTfLsy7Sci"} type="audio/mpeg" />
                </audio>
      <button type="submit">Submit</button>
    </form>
  );
}

export default GoogleDriveFileUploader;