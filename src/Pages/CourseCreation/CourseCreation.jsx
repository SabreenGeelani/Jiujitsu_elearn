import { useMemo, useRef, useState } from "react";
import "./CourseCreation.css";
import { RiGalleryUploadFill } from "react-icons/ri";
import { BASE_URI } from "../../Config/url";
import useFetch from "../../hooks/useFetch";
export default function CourseCreation() {
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category_id: "",
    status: "",
    price: "",
    discount: "",
    thumbnail: null,
    tag_ids: [],
  });
  const editorRef = useRef(null);
  const token = localStorage.getItem("token");
  const tagsUrl = `${BASE_URI}/api/v1/tags`;
  const categoriesUrl = `${BASE_URI}/api/v1/category`;
  const fetchOptions = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const { data } = useFetch(tagsUrl, fetchOptions);
  const tags = useMemo(() => data?.data || [], [data]);

  const { data: categoriesData } = useFetch(categoriesUrl, fetchOptions);
  const categories = useMemo(
    () => categoriesData?.data || [],
    [categoriesData]
  );

  const applyStyle = (command) => {
    document.execCommand(command, false, null);
  };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        editorRef.current.innerHTML = e.target.result;
      };
      reader.readAsText(file);
    }
  };
  return (
    <div className="w-100">
      <header className="d-flex align-items-center justify-content-between py-3">
        <h3 className="fw-bold">Course Creation</h3>
        <button className=" signup-now py-2 px-3 fw-lightBold mb-0 h-auto">
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
              name="title"
              value={courseData.title}
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
            <div
              id="courseDescription"
              name="description"
              value={courseData.description}
              ref={editorRef}
              className="px-5 py-2-half-5 border-secondary-subtle border rounded-bottom-2 w-100"
              style={{ height: "13rem", overflowY: "auto" }}
              contentEditable
            ></div>
          </div>
          <div className="mb-3">
            <label htmlFor="" className="d-block mb-1 fs-5 fw-light">
              Course Category <span className="text-danger">*</span>
            </label>
            <select
              className="px-5 py-2-half-5 border-secondary-subtle border rounded-2 w-100"
              name="category_id"
              value={courseData.category_id}
            >
              <option value="" disabled>
                Select
              </option>
              {categories.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="" className="d-block mb-1 fs-5 fw-light">
              Course Status <span className="text-danger">*</span>
            </label>
            <select
              className="px-5 py-2-half-5 border-secondary-subtle border rounded-2 w-100"
              name="status"
              value={courseData.status}
            >
              <option value="" disabled>
                Select
              </option>
              <option value="active">Active</option>
              <option value="inActive">In Active</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="" className="d-block mb-1 fs-5 fw-light">
              Select Tags <span className="text-danger">*</span>
            </label>
            <select
              className="px-5 py-2-half-5 border-secondary-subtle border rounded-2 w-100"
              name="tag_ids"
              value={courseData.tag_ids}
            >
              <option value="" disabled>
                Select
              </option>
              {tags.map((tag) => (
                <option value={tag.id} key={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="" className="d-block mb-1 fs-5 fw-light">
              Add Thumbnail <span className="text-danger">*</span>
            </label>
            <div className="input-group">
              <input
                type="text"
                name="thumbnail"
                value={courseData.thumbnail}
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
                  name="price"
                  value={courseData.price}
                  placeholder="Enter Price"
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
                  name="discount"
                  value={courseData.discount}
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
            <button
              type="submit"
              className=" signup-now py-2 px-3 fw-light mb-0 h-auto"
            >
              Add Course
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
