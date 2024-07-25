import { useState } from "react";
import "./CourseCreation.css";
import { RiGalleryUploadFill } from "react-icons/ri";
export default function CourseCreation() {
  const [text, setText] = useState("");

  const applyStyle = (style) => {
    const textarea = document.getElementById("courseDescription");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    let newText = "";
    switch (style) {
      case "bold":
        newText =
          textarea.value.substring(0, start) +
          "<b>" +
          selectedText +
          "</b>" +
          textarea.value.substring(end);
        break;
      case "italic":
        newText =
          textarea.value.substring(0, start) +
          "<i>" +
          selectedText +
          "</i>" +
          textarea.value.substring(end);
        break;
      case "underline":
        newText =
          textarea.value.substring(0, start) +
          "<u>" +
          selectedText +
          "</u>" +
          textarea.value.substring(end);
        break;
      default:
        break;
    }
    setText(newText);
  };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setText(e.target.result);
      };
      reader.readAsText(file);
    }
  };
  return (
    <div className="w-100">
      <header className="d-flex align-items-center justify-content-between py-3">
        <h3 className="fw-bold">Course Creation</h3>
        <button className="fs-small signup-now py-2 px-3 fw-lightBold mb-0 h-auto">
          Cancel
        </button>
      </header>
      <main className="custom-box px-5 py-5">
        <form action="newCourse">
          <div className="mb-3">
            <label htmlFor="" className="d-block mb-1 fs-5 fw-light">
              Course Title <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Title"
              className="px-5 py-2-half-5 border-secondary-subtle border rounded-2 w-100 input-custom"
            />
          </div>
          <div className="mb-3">
            <div className="d-flex justify-content-between ">
              <label
                htmlFor="courseDescription"
                className="d-block mb-1 fs-5 fw-light"
              >
                Course Description <span className="text-danger">*</span>
              </label>
              <div className="cursor-pointer">
                <input
                  type="file"
                  accept=".txt"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                  id="uploadFile"
                />
                <label htmlFor="uploadFile" className="fs-small neutral-color">
                  <RiGalleryUploadFill className="fs-5 me-2" />
                  Upload .txt file
                </label>
              </div>
            </div>

            <div className="border-top border-start border-end border-secondary-subtle rounded-top-2 px-4 py-2">
              <button
                type="button"
                className="btn btn-light me-2"
                onClick={() => applyStyle("bold")}
              >
                <strong className="fs-4">B</strong>
              </button>
              <button
                type="button"
                className="btn btn-light me-2"
                onClick={() => applyStyle("italic")}
              >
                <em className="fs-4">I</em>
              </button>
              <button
                type="button"
                className="btn btn-light"
                onClick={() => applyStyle("underline")}
              >
                <u className="fs-4">U</u>
              </button>
            </div>
            <textarea
              id="courseDescription"
              className="px-5 py-2-half-5 border-secondary-subtle border rounded-bottom-2 w-100"
              style={{ height: "13rem" }}
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="" className="d-block mb-1 fs-5 fw-light">
              Course Category <span className="text-danger">*</span>
            </label>
            <select className="px-5 py-2-half-5 border-secondary-subtle border rounded-2 w-100">
              <option value="" disabled>
                Select
              </option>
              <option value="Category1">Category 1</option>
              <option value="Category1">Category 1</option>
              <option value="Category1">Category 1</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="" className="d-block mb-1 fs-5 fw-light">
              Course Status <span className="text-danger">*</span>
            </label>
            <select className="px-5 py-2-half-5 border-secondary-subtle border rounded-2 w-100">
              <option value="" disabled>
                Select
              </option>
              <option value="Category1">Active</option>
              <option value="Category1">In Active</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="" className="d-block mb-1 fs-5 fw-light">
              Select Tags <span className="text-danger">*</span>
            </label>
            <select className="px-5 py-2-half-5 border-secondary-subtle border rounded-2 w-100">
              <option value="" disabled>
                Select
              </option>
              <option value="Category1">Tag 1</option>
              <option value="Category1">Tag 1</option>
              <option value="Category1">Tag 1</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="" className="d-block mb-1 fs-5 fw-light">
              Add Thumbnail <span className="text-danger">*</span>
            </label>
            <div className="input-group">
              <input
                type="text"
                placeholder="Select or Drag & Drop"
                className="form-control px-5 py-2-half-5 border-secondary-subtle border border-end-0 rounded-start-2  input-custom"
              />
              <button
                type="button"
                className="input-group-text border-start-0 bg-white border-secondary-subtle"
                // onClick={togglePasswordVisibility}
              >
                <RiGalleryUploadFill className="fs-5 neutral-color" />
              </button>
            </div>
          </div>
          <div className="mb-5 d-flex align-item-center gap-4">
            <div className="w-50">
              <label htmlFor="" className="d-block mb-1 fs-5 fw-light">
                Price <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <label htmlFor="email" className="input-group-text">
                  ₹
                </label>
                <input
                  type="text"
                  placeholder="Enter Price"
                  // id="email"
                  className="form-control px-5 py-2-half-5 input-custom"
                  required
                />
              </div>
            </div>
            <div className="w-50">
              <label htmlFor="" className="d-block mb-1 fs-5 fw-light">
                Discount <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <label htmlFor="email" className="input-group-text">
                  %
                </label>
                <input
                  type="text"
                  placeholder="Enter Discount"
                  className="form-control px-5 py-2-half-5 input-custom"
                  required
                />
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <button className=" signup-now py-2 px-3 fw-light mb-0 h-auto">
              Cancel
            </button>
            <button className=" signup-now py-2 px-3 fw-light mb-0 h-auto">
              Add Course
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
