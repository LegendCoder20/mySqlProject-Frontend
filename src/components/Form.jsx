import React, {useState} from "react";
import axios from "axios";

function Form() {
  const [toastVisible, setToastVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rollno, setRollNo] = useState("");
  const [name, setName] = useState("");
  const [marks, setMarks] = useState("");
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const hRollNo = (e) => setRollNo(e.target.value);
  const hName = (e) => setName(e.target.value);
  const hMarks = (e) => setMarks(e.target.value);
  const hImage = (e) => setImage(e.target.files[0]);

  const sendData = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorVisible(false);

    const formData = new FormData();
    formData.append("rollno", rollno);
    formData.append("name", name);
    formData.append("marks", marks);
    formData.append("image", image);

    const url = "http://localhost:5000/api/addStudent";

    try {
      await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setRollNo("");
      setName("");
      setMarks("");
      setImage(null);
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response && err.response.data && err.response.data.msg) {
          setErrorMessage(err.response.data.msg);
          setErrorVisible(true);
        } else {
          setErrorMessage("An unexpected error occurred");
          setErrorVisible(true);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <React.Fragment>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Form
          </h2>
        </div>

        <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
          <form method="POST" className="space-y-6" onSubmit={sendData}>
            <div>
              <label
                htmlFor="rollno"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Roll No
              </label>
              <input
                type="number"
                name="rollno"
                id="rollno"
                value={rollno}
                onChange={hRollNo}
                className="rounded-none bg-gray-50 border text-gray-900 text-sm focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 placeholder-gray-400 ring-gray-300"
                required
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={hName}
                className="rounded-none bg-gray-50 border text-gray-900 text-sm focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 placeholder-gray-400 ring-gray-300"
                placeholder="eg. Aryan Manjarekar"
                required
              />
            </div>
            <div>
              <label
                htmlFor="marks"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Marks
              </label>
              <input
                type="number"
                name="marks"
                id="marks"
                value={marks}
                onChange={hMarks}
                className="rounded-none bg-gray-50 border text-gray-900 text-sm focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 placeholder-gray-400 ring-gray-300"
                required
              />
            </div>
            <div>
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-green-700"
              >
                Upload file
              </label>
              <input
                className="block w-full border bg-green-50 border-green-500 text-black placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500"
                id="image"
                type="file"
                name="image"
                onChange={hImage}
                required
              />
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 mt-4 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>

          {toastVisible && (
            <div className="fixed bottom-4 right-4 z-[1000] transform transition-all duration-500 ease-in-out opacity-100">
              <div
                className="flex items-center w-full max-w-xs p-2 space-x-3 bg-gradient-to-r from-green-500 via-green-500 to-green-500 border border-green-600 text-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                role="alert"
              >
                <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full">
                  <svg
                    className="w-5 h-5 text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div className="pl-2 text-sm font-medium">
                  Student added successfully!
                </div>
              </div>
            </div>
          )}

          {errorVisible && (
            <div className="fixed bottom-4 right-4 z-[1000] transform transition-all duration-500 ease-in-out opacity-100">
              <div
                className="flex items-center w-full max-w-xs p-2 space-x-3 bg-red-600 border border-red-700 text-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                role="alert"
              >
                <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full">
                  <svg
                    className="w-5 h-5 text-red-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <div className="pl-2 text-sm font-medium">{errorMessage}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Form;
