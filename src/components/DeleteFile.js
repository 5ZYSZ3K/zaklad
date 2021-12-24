import axios from "axios";

function DeleteFile({ imageID, name }) {
  const { REACT_APP_REST_URI } = process.env;
  const clickHandler = () => {
    axios
      .delete(`${REACT_APP_REST_URI}update/${name}/${imageID}`)
      .then(console.log)
      .catch(console.log);
  };
  return (
    <div>
      <button onClick={clickHandler}>Usuń</button>
    </div>
  );
}

export default DeleteFile;
