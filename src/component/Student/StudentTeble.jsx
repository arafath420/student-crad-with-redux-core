import Table from "react-bootstrap/Table";
import { FaEye } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteStudent,
  editStudent,
  getAllStudent,
} from "../../redux/student/action";
import { Button, Modal } from "react-bootstrap";
import ViewModal from "./ViewModal";
import Swal from "sweetalert2";

const StudentTeble = () => {
  const { student, loader } = useSelector((state) => state.student);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [singleStude, setSingleStu] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Handle Student Delete
  const handleStudentDelete = (item) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: `Hello ${item.name} Can you delete it?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteStudent(item.id));
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: `Hello ${item.name} Your file has been deleted.`,
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: `Hello ${item.name} Your File Is Not Deleted`,
            icon: "error",
          });
        }
      });
  };

  //Handle Student Edit
  const handleStudentEditM = (item) => {
    dispatch(editStudent(true, item));
  };

  // Handle Show Single Student
  const handleSingleStu = (item) => {
    setShow(true);
    setSingleStu(item);
  };

  //Get All Student
  useEffect(() => {
    dispatch(getAllStudent());
  }, []);

  return (
    <>
      <div>
        <Table striped className="text-center ">
          <thead>
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Roll</th>
              <th>Action</th>
            </tr>
          </thead>

          {loader ? (
            <tbody>
              <tr>
                <td colSpan={6}>
                  <div className="row">
                    <div className="col-md-3  mx-auto">
                      <img
                        style={{
                          textAlign: "center",
                          borderRadius: "50%",
                          width: "300px",
                          height: "300PX",
                        }}
                        src="https://cdn.pixabay.com/animation/2023/11/09/03/05/03-05-45-320_512.gif"
                        alt=""
                      />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {student && student?.length > 0
                ? student.map((item, index) => {
                    return (
                      <tr className="align-middle" key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            style={{
                              width: "60px",
                              height: "60px",
                              borderRadius: "50%",
                            }}
                            src={item.photo}
                            alt=""
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.roll}</td>
                        <td>
                          <Button
                            className="btn btn-sm btn-info"
                            onClick={() => handleSingleStu(item)}
                          >
                            <FaEye onClick={handleShow} />
                          </Button>
                          <button
                            className="btn btn-sm btn-warning mx-1"
                            onClick={() => handleStudentEditM(item)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleStudentDelete(item)}
                          >
                            <FaRegTrashCan />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                : "Student Not Found"}
            </tbody>
          )}
        </Table>
        <ViewModal
          show={show}
          handleClose={handleClose}
          handleShow={handleShow}
          singleStude={singleStude}
        />
      </div>
    </>
  );
};

export default StudentTeble;
