import React, {useState, useEffect} from "react";
import axios from "axios";

function HomePage() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    let url = "http://localhost:5000/api/getStudents";

    await axios
      .get(url)
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteData = async (rollno) => {
    let url = `http://localhost:5000/deleteStudent/${rollno}`;
    try {
      await axios
        .delete(url)
        .then((res) => {
          fetchData();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err, "Some Error Occured while Deteling Data");
    }
  };

  const downloadImage = async (imageUrl, filename) => {
    try {
      const response = await fetch(imageUrl);

      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <React.Fragment>
      <div className="text-center mt-10 text-2xl ">
        <table className="table-auto w-full border-collapse border border-gray-500">
          {data.length > 0 ? (
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-500 p-2">Roll No</th>
                <th className="border border-gray-500 p-2">Name</th>
                <th className="border border-gray-500 p-2">Marks</th>
                <th className="border border-gray-500 p-2">Image</th>
                <th className="border border-gray-500 p-2">Delete</th>
                <th className="border border-gray-500 p-2">Download</th>
              </tr>
            </thead>
          ) : (
            <>
              <h1>NO DATA FOUND</h1>
            </>
          )}
          <tbody>
            {data.map((student) => (
              <tr key={student.rollno} className="text-center">
                <td className="border border-gray-500 p-2 ">
                  {student.rollno}
                </td>
                <td className="border border-gray-500 p-2">{student.name}</td>
                <td className="border border-gray-500 p-2">{student.marks}</td>
                <td className="border border-gray-500 p-2">
                  <img
                    src={student.image_url}
                    alt={student.name}
                    width="100"
                    className="block mx-auto"
                  />
                </td>
                <td className="border border-gray-500 p-2">
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 mt-4 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    onClick={() => deleteData(student.rollno)}
                  >
                    Delete
                  </button>
                </td>
                <td className="border border-gray-500 p-2">
                  <button
                    type="submit"
                    onClick={() =>
                      downloadImage(student.image_url, `${student.rollno}.jpg`)
                    }
                    className="flex w-full justify-center rounded-md bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 mt-4 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}

export default HomePage;
