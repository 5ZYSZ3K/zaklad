import axios from "axios";

function DeleteFile({ path, name }) {
  const clickHandler = () => {
    axios.delete(`http://localhost:4000/images/update/${name}`, {
      data: { path: path.split("/").pop() },
    });
  };
  return <button onClick={clickHandler}>Usuń</button>;
}

export default DeleteFile;
