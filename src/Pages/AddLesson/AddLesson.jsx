import { FaPen, FaYoutube } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";
import { MdAddBox } from "react-icons/md";

export default function AddLesson() {
  return (
    <div className="w-100">
      <header className="d-flex align-items-center justify-content-between py-3 pb-4">
        <h3 className="fw-bold">Figma : Beginner to Pro</h3>
        <button className=" signup-now py-2 px-3 fw-lightBold mb-0 h-auto">
          Edit Course
        </button>
      </header>
      <main
        className="custom-box px-5 py-4 h-100"
        style={{
          minHeight: "30rem",
        }}
      >
        <div className="d-flex flex-column align-items-center text-center gap-2 py-4">
          <p className="fs-4 fw-lightBold">
            Start adding Chapters to your course
          </p>

          {/* <button className="signup-now px-4 py-1-and-08rem fs-5 mt-3">
            {" "}
            <MdAddBox className="fs-1 me-2" />
            Add Chapter
          </button> */}

          {/* <div>
            <div className="mb-4 w-100">
              <label
                htmlFor=""
                className="d-block mb-1 fs-5 fw-light text-start"
              >
                Chapter Title <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Chapter Title"
                className="px-5 py-2-half-5 border-secondary-subtle border rounded-2 w-100 input-custom"
              />
            </div>
            <div className="d-flex justify-content-end align-items-center gap-5 w-100">
              <button className=" signup-now py-1 px-3 fw-lightBold mb-0 h-auto">
                Cancel
              </button>
              <button className=" signup-now py-1 px-3 fw-lightBold mb-0 h-auto">
                Add Chapter
              </button>
            </div>
          </div> */}

          <div className="w-100">
            <div className=" rounded-2 border border-secondary-subtle text-start px-5 py-3 mb-3">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-4">
                  <p className="mb-0 fs-4 fw-lightBold">1. Introduction</p>
                  <FaPen className="primary-color" />
                  <IoMdTrash className="fs-5 primary-color" />
                </div>
                <button className="signup-now py-2 px-3 fw-lightBold mb-0 h-auto">
                  Add Lesson
                </button>
              </div>

              <div className="p-3 rounded-2 border border-secondary-subtle d-flex align-items-center justify-content-between my-3">
                <div className="d-flex align-items-center gap-3">
                  <FaYoutube className="fs-5" />
                  <p className="mb-0  fs-5">Lesson 1: Lets get started</p>
                </div>
                <p className="mb-0  fs-5">21 minutes</p>
              </div>
              <div className="p-3 rounded-2 border border-secondary-subtle d-flex align-items-center justify-content-between my-3">
                <div className="d-flex align-items-center gap-3">
                  <FaYoutube className="fs-5" />
                  <p className="mb-0  fs-5">Lesson 1: Lets get started</p>
                </div>
                <p className="mb-0  fs-5">21 minutes</p>
              </div>
              <div className="p-3 rounded-2 border border-secondary-subtle d-flex align-items-center justify-content-between my-3">
                <div className="d-flex align-items-center gap-3">
                  <FaYoutube className="fs-5" />
                  <p className="mb-0  fs-5">Lesson 1: Lets get started</p>
                </div>
                <p className="mb-0  fs-5">21 minutes</p>
              </div>
            </div>

            {/* <form action="addLesson">
              <div className="mb-3">
                <label
                  htmlFor=""
                  className="d-block mb-1 fs-5 fw-light text-start"
                >
                  Lesson Title <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Title"
                  className="px-5 py-2-half-5 border-secondary-subtle border rounded-2 w-100 input-custom"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor=""
                  className="d-block mb-1 fs-5 fw-light text-start"
                >
                  Course Description <span className="text-danger">*</span>
                </label>
                <textarea
                  className="px-5 py-2-half-5 border-secondary-subtle border rounded-2 w-100"
                  style={{ height: "13rem" }}
                ></textarea>
              </div>
              <div className="mb-3">
                <label
                  htmlFor=""
                  className="d-block mb-1 fs-5 fw-light text-start"
                >
                  URL Type <span className="text-danger">*</span>
                </label>
                <select className="px-5 py-2-half-5 border-secondary-subtle border rounded-2 w-100">
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="Category1">chrome</option>
                  <option value="Category1">chrome</option>
                </select>
              </div>
              <div className="mb-3">
                <label
                  htmlFor=""
                  className="d-block mb-1 fs-5 fw-light text-start"
                >
                  Lesson URL <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter or Paste URL"
                  className="px-5 py-2-half-5 border-secondary-subtle border rounded-2 w-100 input-custom"
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor=""
                  className="d-block mb-1 fs-5 fw-light text-start"
                >
                  Add Thumbnail <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Select or Drag & Drop"
                  className="px-5 py-2-half-5 border-secondary-subtle border rounded-2 w-100 input-custom"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor=""
                  className="d-block mb-1 fs-5 fw-light text-start"
                >
                  Lesson Duration <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Duration"
                  className="px-5 py-2-half-5 border-secondary-subtle border rounded-2 w-100 input-custom"
                />
              </div>
              <div className="d-flex align-items-center justify-content-end gap-5">
                <button className=" signup-now py-2 px-3 fw-light mb-0 h-auto">
                  Cancel
                </button>
                <button className=" signup-now py-2 px-3 fw-light mb-0 h-auto">
                  Add Lesson
                </button>
              </div>
            </form> */}

            <button className="signup-now py-2 px-3 fw-lightBold mb-0 h-auto mt-5">
              Add Chapter
            </button>
          </div>
        </div>
        <main />
      </main>
    </div>
  );
}
