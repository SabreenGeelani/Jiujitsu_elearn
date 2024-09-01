import { useMemo, useRef, useState, useCallback, useEffect } from "react";
import { RiGalleryUploadFill } from "react-icons/ri";
import { useDropzone } from "react-dropzone";
import "./CourseCreation.css";
import { BASE_URI } from "../../Config/url";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "../../Components/Modal/Modal";
import { Link, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import DOMPurify from "dompurify";
import { PulseLoader } from "react-spinners";
import { MdDone } from "react-icons/md";

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
    access: "",
  });
  const [isModal, setIsModal] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const editorRef = useRef(null);
  const token = localStorage.getItem("token");
  const [showPopover, setShowPopover] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [finalDelete, setFinalDelete] = useState(false);
  const [isLoadingDeleteCourse, setIsLoadingDeleteCourse] = useState(false);
  const tagsUrl = `${BASE_URI}/api/v1/tags`;
  const categoriesUrl = `${BASE_URI}/api/v1/category`;

  const fetchOptions = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const navigate = useNavigate();

  const { data } = useFetch(tagsUrl, fetchOptions);
  const tags = useMemo(() => data?.data || [], [data]);

  const { data: categoriesData } = useFetch(categoriesUrl, fetchOptions);
  const categories = useMemo(
    () => categoriesData?.data || [],
    [categoriesData]
  );

  useEffect(() => {
    if (editCourse) {
      axios
        .get(`${BASE_URI}/api/v1/courses/${courseeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const courseDetails = response.data.data[0];
          // console.log(response.data);
          setCourseData({
            title: courseDetails.title || "",
            description: courseDetails.description || "",
            category_id: courseDetails.category_id || "",
            status: courseDetails.status || "",
            price: courseDetails.price || "",
            discount: courseDetails.discount || "",
            thumbnail: courseDetails.thumbnail || null,
            tag_ids: courseDetails.tag_ids || [],
            access: courseDetails.access || "",
          });
          setThumbnailPreview(
            courseDetails.thumbnail ? courseDetails.thumbnail : null
          );
        })
        .catch(() => {
          toast.error("Failed to load course details.");
        });
    }
  }, [editCourse, courseeId, token]);

  const handleChange = (event) => {
    setShowPopover(false);
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

  const handleTagChange = (e) => {
    const selectedOptions = [...e.target.selectedOptions].map(
      (option) => option.value
    );

    setCourseData({
      ...courseData,
      tag_ids: selectedOptions,
    });
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
      access: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(courseData);

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

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .patch(`${BASE_URI}/api/v1/courses/${courseeId}`, courseData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setLoading(false);
        toast.success("Course updated successfully!");
        setCourseId(response.data.data.course_id);
        setIsModal(true);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(
          error.response ? error.response.data.message : "Something went wrong"
        );
      });
  };

  const handleDeleteCourse = () => {
    setIsLoadingDeleteCourse(true);
    axios
      .delete(
        `${BASE_URI}/api/v1/courses/${courseeId}`,

        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(() => {
        setIsLoadingDeleteCourse(false);
        toast.success("Course deleted successfully");

        setFinalDelete(true);
        setIsDelete(false);
      })
      .catch((err) => {
        setIsLoadingDeleteCourse(false);
        toast.error(
          err.response ? err.response.data.message : "Something went wrong"
        );
      });
  };

  const handleFocus = () => {
    setShowPopover(true);
  };
  const closeModal = () => {
    setIsDelete(false);
  };

  const handleFinalDelete = () => {
    setFinalDelete(false);
    navigate("/courses");
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
              required
            />
          </div>
          <div className="mb-3">
            <div className="d-flex justify-content-between ">
              <label
                htmlFor="text_content"
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
                placeholder="Write course description here..."
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
              required
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
              required
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
              onChange={handleTagChange}
              required
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
            <label htmlFor="access" className="d-block mb-1 fs-5 fw-light">
              Access Time <span className="text-danger">*</span>
            </label>
            <select
              className="px-5 py-2-half-5 border-secondary-subtle border rounded-2 w-100"
              name="access"
              value={courseData.access}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select
              </option>
              <option value="lifetime">Lifetime</option>
              {/* <option value="inActive">In Active</option> */}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="thumbnail" className="d-block mb-1 fs-5 fw-light">
              Thumbnail <span className="text-danger">*</span>
            </label>
            <div {...getRootProps()} className="input-group mb-3">
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
                required
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
              {thumbnailPreview && (
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail Preview"
                  className="mt-2"
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                />
              )}
            </div>

            <div className="mb-5 d-flex align-item-center gap-4">
              <div className="w-50 position-relative">
                <label htmlFor="price" className="d-block mb-1 fs-5 fw-light">
                  Price <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <label htmlFor="price" className="input-group-text">
                    $
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={courseData.price}
                    onFocus={handleFocus}
                    onChange={handleChange}
                    placeholder="Enter Price"
                    className="form-control px-5 py-2-half-5 input-custom"
                    required
                  />
                  <span
                    style={{
                      cursor: "pointer",
                      marginLeft: "10px",
                      position: "relative",
                    }}
                  >
                    <i className="bi bi-info-circle"></i>
                    {showPopover && (
                      <div className="custom-popover">
                        15% of this amount will be credited to Admin
                      </div>
                    )}
                  </span>
                </div>
                <style jsx>{`
                  .custom-popover {
                    position: absolute;
                    top: -40px;
                    right: 114px;
                    background-color: #333;
                    color: #fff;
                    padding: 5px 10px;
                    border-radius: 4px;
                    font-size: 12px;
                    white-space: nowrap;
                    z-index: 1000;
                  }
                `}</style>
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

          {editCourse ? (
            <div className="d-flex justify-content-between align-items-center">
              <button
                type="button"
                className="signup-now py-2 px-3 fw-light mb-0 h-auto"
                style={{ background: "#CC3737" }}
                // onClick={handleCancelEdit}
                onClick={() => setIsDelete(true)}
              >
                Delete
              </button>
              <button
                type="submit"
                className="signup-now py-2 px-3 fw-light mb-0 h-auto"
                onClick={handleSaveChanges}
              >
                {loading ? (
                  <PulseLoader size={8} color="white" />
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          ) : (
            <div className="d-flex justify-content-between align-items-center">
              <button
                type="button"
                className="signup-now py-2 px-3 fw-light mb-0 h-auto"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="signup-now py-2 px-3 fw-light mb-0 h-auto"
              >
                {loading ? (
                  <PulseLoader size={8} color="white" />
                ) : (
                  "Add Course"
                )}
              </button>
            </div>
          )}
        </form>
      </main>

      <Modal
        show={isModal}
        // onClose={closeModal}
        btnName="Continue"
        path={`/courses/addLesson/${courseId}`}
      >
        <div className="p-4 text-center">
          <h5>Your Course has been successfully created!</h5>
        </div>
      </Modal>

      <Modal onClose={closeModal} show={isDelete}>
        <div className="p-3 text-center">
          <h5 className="mb-4">Are you sure to delete the course?</h5>
          <div className="d-flex align-items-center justify-content-center gap-5">
            <button
              className="signup-now py-2 px-3 fw-light mb-0 h-auto"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              className="signup-now py-2 px-3 fw-light mb-0 h-auto"
              onClick={handleDeleteCourse}
            >
              {isLoadingDeleteCourse ? (
                <PulseLoader size={8} color="white" />
              ) : (
                " Continue"
              )}
            </button>
          </div>
        </div>
      </Modal>

      <Modal show={finalDelete}>
        <div className="d-flex flex-column align-items-center gap-3 justify-content-center">
          <MdDone className="fs-1" />
          <h5>Lesson deleted successfully.</h5>
          <button
            className="signup-now px-3 fw-lightBold mb-0 h-auto py-2"
            onClick={handleFinalDelete}
          >
            Continue
          </button>
        </div>
      </Modal>
    </div>
  );
}
