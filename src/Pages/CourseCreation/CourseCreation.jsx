import { useMemo, useRef, useState, useCallback } from "react";
import { RiGalleryUploadFill } from "react-icons/ri";
import { useDropzone } from "react-dropzone";
import "./CourseCreation.css";
import { BASE_URI } from "../../Config/url";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "../../Components/Modal/Modal";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import DOMPurify from "dompurify";

export default function CourseCreation({ editCourse, courseeId }) {
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
  const [isModal, setIsModal] = useState(false);
  const [courseId, setCourseId] = useState("");

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "tag_ids") {
      setCourseData((prevData) => ({
        ...prevData,
        tag_ids: [...event.target.selectedOptions].map(
          (option) => option.value
        ),
      }));
    } else {
      setCourseData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        toast.success("File uploaded successfully!");
        setCourseData((prevData) => ({
          ...prevData,
          description: e.target.result,
        }));
      };
      reader.onerror = () => toast.error("Failed to read file.");
      reader.readAsText(file);
    }
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setCourseData((prevData) => ({
          ...prevData,
          thumbnail: file,
        }));
      }
    },
    [setCourseData]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  const handleEditorChange = (content) => {
    const sanitizedContent = DOMPurify.sanitize(content); // Sanitize HTML
    setCourseData((prevData) => ({
      ...prevData,
      description: sanitizedContent,
    }));
  };

  const closeModal = () => {
    setIsModal(false);
  };

  const handleCancel = () => {
    setCourseData({
      title: "",
      description: "",
      category_id: "",
      status: "",
      price: "",
      discount: "",
      thumbnail: null,
      tag_ids: [],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(courseData);

    // const formData = new FormData();
    // Object.keys(courseData).forEach((key) => {
    //   if (key === "tag_ids") {
    //     formData.append(key, JSON.stringify(courseData[key]));
    //   } else {
    //     formData.append(key, courseData[key]);
    //   }
    // });

    axios
      .post(`${BASE_URI}/api/v1/courses`, courseData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // console.log(response.data);
        setCourseId(response.data.data.course_id);
        setIsModal(true);
        // console.log(isModal);
      })
      .catch((error) => {
        // console.log(error);
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="w-100">
      <header className="d-flex align-items-center justify-content-between py-3">
        <h3 className="fw-bold">Course Creation</h3>
        <button className="signup-now py-2 px-3 fw-lightBold mb-0 h-auto">
          <Link to="/courses" className="text-decoration-none text-white">
            Cancel
          </Link>
        </button>
      </header>
      <main className="custom-box px-5 py-5">
        <form action="newCourse" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="d-block mb-1 fs-5 fw-light">
              Course Title <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={courseData.title}
              onChange={handleChange}
              placeholder="Enter Title"
              className="px-5 py-2-half-5 border-secondary-subtle border rounded-2 w-100 input-custom"
            />
          </div>
          <div className="mb-3">
            <div className="d-flex justify-content-between ">
              <label
                htmlFor="text_content"
                className="d-block mb-1 fs-5 fw-light"
              >
                Lesson Description <span className="text-danger">*</span>
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
            <div className="border border-secondary-subtle rounded">
              <ReactQuill
                value={courseData.description}
                name="description"
                onChange={handleEditorChange}
                ref={editorRef}
                theme="snow"
                modules={{
                  toolbar: [
                    [{ header: "1" }, { header: "2" }, { font: [] }],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["bold", "italic", "underline"],
                    [{ color: [] }, { background: [] }],
                    [{ align: [] }],
                    ["clean"],
                  ],
                }}
                formats={[
                  "header",
                  "font",
                  "list",
                  "bullet",
                  "bold",
                  "italic",
                  "underline",
                  "color",
                  "background",
                  "align",
                ]}
                style={{ height: "13rem", overflowY: "auto" }}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="category_id" className="d-block mb-1 fs-5 fw-light">
              Course Category <span className="text-danger">*</span>
            </label>
            <select
              className="px-5 py-2-half-5 border-secondary-subtle border rounded-2 w-100"
              name="category_id"
              value={courseData.category_id}
              onChange={handleChange}
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
            <label htmlFor="status" className="d-block mb-1 fs-5 fw-light">
              Course Status <span className="text-danger">*</span>
            </label>
            <select
              className="px-5 py-2-half-5 border-secondary-subtle border rounded-2 w-100"
              name="status"
              value={courseData.status}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select
              </option>
              <option value="active">Active</option>
              <option value="inActive">In Active</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="tag_ids" className="d-block mb-1 fs-5 fw-light">
              Select Tags <span className="text-danger">*</span>
            </label>
            <select
              className="px-5 py-2-half-5 border-secondary-subtle border rounded-2 w-100"
              name="tag_ids"
              value={courseData.tag_ids}
              onChange={(e) =>
                setCourseData({
                  ...courseData,
                  tag_ids: [...e.target.selectedOptions].map(
                    (option) => option.value
                  ),
                })
              }
              multiple
            >
              <option
                value=""
                disabled
                className="border  px-2 py-2 text-center"
              >
                Select
              </option>
              {tags.map((tag) => (
                <option
                  value={tag.id}
                  key={tag.id}
                  className="border  px-2 py-2 text-center"
                >
                  {tag.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="thumbnail" className="d-block mb-1 fs-5 fw-light">
              Add Thumbnail <span className="text-danger">*</span>
            </label>
            <div {...getRootProps()} className="input-group">
              <input
                type="text"
                name="thumbnail"
                placeholder={
                  courseData.thumbnail
                    ? courseData.thumbnail.name
                    : "Select or Drag & Drop"
                }
                className="form-control px-5 py-2-half-5 border-secondary-subtle border border-end-0 rounded-start-2 input-custom"
                readOnly
              />
              <button
                type="button"
                className="input-group-text border-start-0 bg-white border-secondary-subtle"
              >
                <RiGalleryUploadFill className="fs-5 neutral-color" />
              </button>
              <input
                {...getInputProps({
                  style: { display: "none" },
                })}
              />
            </div>
            <div className="mb-5 d-flex align-item-center gap-4">
              <div className="w-50">
                <label htmlFor="price" className="d-block mb-1 fs-5 fw-light">
                  Price <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <label htmlFor="price" className="input-group-text">
                    ₹
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={courseData.price}
                    onChange={handleChange}
                    placeholder="Enter Price"
                    className="form-control px-5 py-2-half-5 input-custom"
                    required
                  />
                </div>
              </div>
              <div className="w-50">
                <label
                  htmlFor="discount"
                  className="d-block mb-1 fs-5 fw-light"
                >
                  Discount <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <label htmlFor="discount" className="input-group-text">
                    %
                  </label>
                  <input
                    type="text"
                    name="discount"
                    value={courseData.discount}
                    onChange={handleChange}
                    placeholder="Enter Discount"
                    className="form-control px-5 py-2-half-5 input-custom"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <button
              type="submit"
              className="signup-now py-2 px-3 fw-light mb-0 h-auto"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="signup-now py-2 px-3 fw-light mb-0 h-auto"
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
      {isModal && (
        <Modal
          onClose={closeModal}
          btnName="Continue"
          path={`/addLesson/${courseId}`}
        >
          <div className="p-4 text-center">
            <h5>Your Course has been successfully created!</h5>
          </div>
        </Modal>
      )}
    </div>
  );
}
