import { FaPen, FaYoutube } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";
import { MdAddBox, MdDone } from "react-icons/md";
import { BASE_URI } from "../../Config/url";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useCallback, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast/headless";
import { RiGalleryUploadFill } from "react-icons/ri";
import { useDropzone } from "react-dropzone";
import { IoCloudUploadOutline } from "react-icons/io5";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { TbDragDrop } from "react-icons/tb";
import Modal from "../../Components/Modal/Modal";

export default function AddLesson() {
  const [isAddChapter, setIsAddChapter] = useState(false);
  const { id } = useParams();
  const [openForm, setOpenForm] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [editLesson, setEditLesson] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const [finalDelete, setFinalDelete] = useState(false);
  const [newLesson, setNewLesson] = useState({
    chapter_id: "",
    title: "",
    video_url: "",
    video_type: "",
    text_content: "",
    duration: "",
    thumbnail: null,
    course_id: id,
  });

  const [newChapterData, setNewChapterData] = useState({
    course_id: id,
    title: "",
  });

  const editorRef = useRef(null);
  const token = localStorage.getItem("token");
  const courseUrl = `${BASE_URI}/api/v1/courses/${id}`;
  const chaptersUrl = `${BASE_URI}/api/v1/chapters/courseChapters/${id}`;

  const fetchOptions = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const { data } = useFetch(courseUrl, fetchOptions);
  const { title } = data?.data[0] || "";

  const { data: chaptersData, refetch } = useFetch(chaptersUrl, fetchOptions);
  const { data: chapters } = chaptersData || [];

  const handleAddChapter = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_URI}/api/v1/chapters`, newChapterData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        toast.success(resp.data.message);
        setNewChapterData({ title: "", course_id: id });
        refetch();
      })
      .catch((err) => {
        toast.error(err.response ? err.response.data.message : err.message);
      });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (editorRef.current) {
          editorRef.current.getEditor().setText(e.target.result);
        }
      };
      reader.readAsText(file);
    }
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const fileType = file.type.split("/")[0];

        if (fileType === "image") {
          setFilePreview(URL.createObjectURL(file));
          setNewLesson((prevData) => ({
            ...prevData,
            thumbnail: file,
          }));
        } else if (fileType === "video") {
          setNewLesson((prevData) => ({
            ...prevData,
            video_type: file,
          }));
        } else {
          console.log("Unsupported file type:", fileType);
        }
      }
    },
    [setNewLesson]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  const handleAddLessonClick = (chapterId, lesson = null) => {
    setOpenForm(openForm === chapterId ? null : chapterId);

    if (lesson) {
      setEditLesson(lesson.id);
      setNewLesson({
        chapter_id: chapterId,
        title: lesson.title,
        video_url: lesson.video_url,
        video_type: lesson.video_type,
        text_content: lesson.text_content,
        duration: lesson.duration,
        thumbnail: lesson.thumbnail,
        course_id: id,
      });
    } else {
      // Adding a new lesson
      setEditLesson(null);
      setNewLesson({
        chapter_id: chapterId,
        title: "",
        video_url: "",
        video_type: "",
        text_content: "",
        duration: "",
        thumbnail: null,
        course_id: id,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLesson({
      ...newLesson,
      [name]: value,
    });
  };

  const handleEditorChange = (content) => {
    setNewLesson((prevData) => ({
      ...prevData,
      text_content: content,
    }));
  };

  const handleLessonSubmit = (e) => {
    e.preventDefault();
    const url = editLesson
      ? `${BASE_URI}/api/v1/lessons/${editLesson}`
      : `${BASE_URI}/api/v1/lessons`;

    axios
      .post(url, newLesson, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setNewLesson({
          chapter_id: "",
          title: "",
          video_url: "",
          video_type: "",
          text_content: "",
          duration: "",
          thumbnail: null,
          course_id: id,
        });
        handleAddLessonClick(null);
        toast.success(resp.data.message);
        refetch();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  const handleDeleteLesson = () => {
    axios
      .delete(`${BASE_URI}/api/v1/lessons/${editLesson}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((resp) => {
        toast.success(resp.data.message);
        setEditLesson(null);
        setNewLesson({
          chapter_id: "",
          title: "",
          video_url: "",
          video_type: "",
          text_content: "",
          duration: "",
          thumbnail: null,
          course_id: id,
        });
        refetch();
        setFinalDelete(true);
        setIsDelete(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  const closeModal = () => {
    setIsDelete(false);
  };

  return (
    <div className="w-100">
      <header className="d-flex align-items-center justify-content-between py-3 pb-4">
        <h3 className="fw-bold text-capitalize">{title}</h3>
        <button className="signup-now py-2 px-3 fw-lightBold mb-0 h-auto">
          Edit Course
        </button>
      </header>
      <main
        className="custom-box px-5 py-4 h-100"
        style={{
          minHeight: "30rem",
        }}
      >
        <div className="d-flex flex-column align-items-center text-center gap-5 py-4">
          <p className="fs-4 fw-lightBold">
            Start adding Chapters to your course
          </p>

          {isAddChapter || chapters?.length !== 0 || (
            <button
              className="signup-now px-4 py-1-and-08rem fs-5 mt-5"
              onClick={() => setIsAddChapter(true)}
            >
              {" "}
              <MdAddBox className="fs-1 me-2" />
              Add Chapter
            </button>
          )}

          <div className="w-100">
            {chapters?.length > 0 &&
              chapters.map((chapter, index) => (
                <div
                  className="rounded-2 border border-secondary-subtle text-start px-5 py-3 mb-3"
                  key={chapter.id}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-4">
                      <p className="mb-0 fs-4 fw-lightBold">
                        {index + 1}. {chapter.title}
                      </p>
                      <FaPen className="primary-color" />
                      <IoMdTrash className="fs-5 primary-color" />
                    </div>
                    <button
                      className="signup-now py-2 px-3 fw-lightBold mb-0 h-auto"
                      onClick={() => handleAddLessonClick(chapter.id)}
                    >
                      Add Lesson
                    </button>
                  </div>
                  {chapter.lessons.map((lesson, i) => (
                    <div
                      className="p-3 rounded-2 border border-secondary-subtle d-flex align-items-center justify-content-between my-3"
                      key={lesson.id}
                      onClick={() => handleAddLessonClick(chapter.id, lesson)}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <FaYoutube className="primary-color fs-5" />
                        <p className="primary-color mb-0">
                          {i + 1}. {lesson.title}
                        </p>
                      </div>
                      <div className="d-flex gap-5">
                        <p className="mb-0  fs-5">{lesson.duration}m</p>
                        <TbDragDrop className="fs-3" />
                      </div>
                    </div>
                  ))}
                  {openForm === chapter.id && (
                    <form onSubmit={handleLessonSubmit}>
                      <div className="mb-3">
                        <label
                          htmlFor="title"
                          className="d-block mb-1 fs-5 fw-light text-start"
                        >
                          Lesson Title <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="title"
                          placeholder="Enter Title"
                          className="px-5 py-2-half-5 border-secondary-subtle border rounded-2 w-100 input-custom"
                          value={newLesson.title}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <div className="d-flex justify-content-between ">
                          <label
                            htmlFor="text_content"
                            className="d-block mb-1 fs-5 fw-light"
                          >
                            Lesson Description{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <div className="cursor-pointer">
                            <input
                              type="file"
                              accept=".txt"
                              onChange={handleFileUpload}
                              style={{ display: "none" }}
                              id="uploadFile"
                            />
                            <label
                              htmlFor="uploadFile"
                              className="fs-small neutral-color"
                            >
                              <RiGalleryUploadFill className="fs-5 me-2" />
                              Upload .txt file
                            </label>
                          </div>
                        </div>
                        <div className="border border-secondary-subtle rounded">
                          <ReactQuill
                            value={newLesson.text_content}
                            onChange={handleEditorChange}
                            ref={editorRef}
                            theme="snow"
                            modules={{
                              toolbar: [
                                [
                                  { header: "1" },
                                  { header: "2" },
                                  { font: [] },
                                ],
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
                        <label
                          htmlFor="video_type"
                          className="d-block mb-1 fs-5 fw-light text-start"
                        >
                          URL Type <span className="text-danger">*</span>
                        </label>
                        <select
                          name="video_type"
                          className="py-2-half-5 border-secondary-subtle border rounded-2 w-100 text-center"
                          value={newLesson.video_type}
                          onChange={handleChange}
                        >
                          <option value="" disabled>
                            Select
                          </option>
                          <option
                            value="youtube"
                            className="border-top border-bottom py-2"
                          >
                            youtube
                          </option>
                          <option value="chrome" className="border-bottom py-2">
                            chrome
                          </option>
                          <option value="upload" className="border-bottom py-2">
                            Upload from device
                          </option>
                        </select>
                        {newLesson.video_type === "upload" && (
                          <div className="mt-3 w-25">
                            <div
                              {...getRootProps()}
                              className="d-flex flex-column align-items-center justify-content-center  border-dotted rounded-2 py-3"
                            >
                              {filePreview && (
                                <div className="mt-3">
                                  <video
                                    src={filePreview}
                                    alt="Preview"
                                    className="w-100 h-100"
                                    style={{
                                      // maxHeight: "150px",
                                      objectFit: "cover",
                                    }}
                                  />
                                </div>
                              )}
                              <input {...getInputProps()} />
                              <IoCloudUploadOutline className="fs-1" />
                              <p className="mt-2">Drag or drop here</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="video_url"
                          className="d-block mb-1 fs-5 fw-light text-start"
                        >
                          Lesson URL <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="video_url"
                          placeholder="Enter or Paste URL"
                          className="px-5 py-2-half-5 border-secondary-subtle border rounded-2 w-100 input-custom"
                          value={newLesson.video_url}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="thumbnail"
                          className="d-block mb-1 fs-5 fw-light"
                        >
                          Add Thumbnail <span className="text-danger">*</span>
                        </label>
                        <div {...getRootProps()} className="input-group">
                          <input
                            type="text"
                            name="thumbnail"
                            placeholder={
                              newLesson.thumbnail
                                ? newLesson.thumbnail.name
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
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="duration"
                          className="d-block mb-1 fs-5 fw-light text-start"
                        >
                          Lesson Duration <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="duration"
                          placeholder="Enter Duration"
                          className="px-5 py-2-half-5 border-secondary-subtle border rounded-2 w-100 input-custom"
                          value={newLesson.duration}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="d-flex align-items-center justify-content-end ">
                        {editLesson ? (
                          <div className="d-flex align-items-center gap-5">
                            <button
                              type="button"
                              className="signup-now py-2 px-4 mt-4"
                              style={{ background: "#CC3737" }}
                              onClick={() => setIsDelete(true)}
                            >
                              Delete
                            </button>
                            <button
                              type="submit"
                              className="signup-now py-2 px-4 mt-4"
                            >
                              Save Changes
                            </button>
                          </div>
                        ) : (
                          <div className="d-flex align-items-center gap-5">
                            <button
                              type="button"
                              className="signup-now py-2 px-3 fw-light mb-0 h-auto"
                              onClick={() => handleAddLessonClick(null)}
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="signup-now py-2 px-3 fw-light mb-0 h-auto"
                            >
                              Add Lesson
                            </button>
                          </div>
                        )}
                      </div>
                    </form>
                  )}
                </div>
              ))}
          </div>

          {isAddChapter && (
            <form className="pt-3" onSubmit={handleAddChapter}>
              <div className="d-flex gap-2 justify-content-between">
                <input
                  type="text"
                  className="w-100 custom-input px-2"
                  placeholder="Enter chapter name"
                  value={newChapterData.title}
                  onChange={(e) =>
                    setNewChapterData((prevData) => ({
                      ...prevData,
                      title: e.target.value,
                    }))
                  }
                />
                <button className="signup-now px-3 fw-lightBold mb-0 h-auto py-2">
                  Add
                </button>
              </div>
            </form>
          )}

          {chapters?.length > 0 && (
            <div className="w-100 text-start">
              <button
                className="signup-now py-2 px-3 fw-lightBold mb-0 h-auto mt-5"
                onClick={() => setIsAddChapter(true)}
              >
                Add Chapter
              </button>
            </div>
          )}
        </div>
      </main>
      {isDelete && (
        <Modal onClose={closeModal}>
          <div className="p-3 text-center">
            <h5 className="mb-4">Are you sure to delete the lesson?</h5>
            <div className="d-flex align-items-center justify-content-center gap-5">
              <button
                className="signup-now py-2 px-3 fw-light mb-0 h-auto"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="signup-now py-2 px-3 fw-light mb-0 h-auto"
                onClick={handleDeleteLesson}
              >
                Continue
              </button>
            </div>
          </div>
        </Modal>
      )}

      {finalDelete && (
        <Modal>
          <div className="d-flex flex-column align-items-center gap-3 justify-content-center">
            <MdDone className="fs-1" />
            <h5>Lesson deleted successfully.</h5>
            <button
              className="signup-now px-3 fw-lightBold mb-0 h-auto py-2"
              onClick={() => setFinalDelete(false)}
            >
              Continue
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
