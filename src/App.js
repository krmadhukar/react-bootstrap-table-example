import { useEffect, useState } from "react";
import "./styles.css";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
export default function App() {
  const [data, setData] = useState(null);
  const [itemCount, setItemCount] = useState("10");
  const [allData, setAllData] = useState(null);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((resp) => {
        setAllData(resp);
        setData(() => {
          return resp.slice(0, itemCount);
        });
      });
  }, []);
  useEffect(() => {
    if (allData && allData.length >= itemCount) {
      setData(() => {
        return allData.slice(0, itemCount);
      });
    }
  }, [itemCount]);
  const changePagination = (e) => {
    setItemCount(e.target.value);
  };

  return (
    <div className="App">
      <select onChange={(e) => changePagination(e)}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>userId</th>
            <th>Id</th>
            <th>title</th>
            <th>body</th>
          </tr>
        </thead>
        {data && data.length && (
          <tbody>
            {data.map((row) => {
              return (
                <tr key={row.id}>
                  <td>{row.userId}</td>
                  <td>{row.id}</td>
                  <td>{row.title}</td>
                  <td>{row.body}</td>
                </tr>
              );
            })}
          </tbody>
        )}
      </Table>
    </div>
  );
}
