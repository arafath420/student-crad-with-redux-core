import axios from "axios";
import {
  CREATE_STUDENT_FULLFILL,
  CREATE_STUDENT_PENDING,
  CREATE_STUDENT_REJECTED,
  DELETE_STUDENT_FULLFILL,
  DELETE_STUDENT_PENDING,
  DELETE_STUDENT_REJECTED,
  EDIT_STUDENT_DATA,
  EDIT_STUDENT_FULLFILL,
  EDIT_STUDENT_PENDING,
  EDIT_STUDENT_REJECTED,
  GET_STUDENT_FULLFILL,
  GET_STUDENT_PENDING,
  GET_STUDENT_REJECTED,
} from "./actionType";

//Get All Student Action
export const getAllStudent = () => async (dispatch) => {
  try {
    dispatch({ type: GET_STUDENT_PENDING });
    const respons = await axios.get("http://localhost:2000/student");
    dispatch({ type: GET_STUDENT_FULLFILL, payload: respons.data });
  } catch (error) {
    dispatch({ type: GET_STUDENT_REJECTED, payload: error.message });
  }
};

//Create Student Action
export const createStudent = (data) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_STUDENT_PENDING });
    const respons = await axios.post("http://localhost:2000/student", data);
    dispatch({ type: CREATE_STUDENT_FULLFILL, payload: respons.data });
  } catch (error) {
    dispatch({ type: CREATE_STUDENT_REJECTED, payload: error.message });
  }
};

//Delete Student Action
export const deleteStudent = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_STUDENT_PENDING });
    await axios.delete(`http://localhost:2000/student/${id}`);
    dispatch({ type: DELETE_STUDENT_FULLFILL, payload: id });
  } catch (error) {
    dispatch({ type: DELETE_STUDENT_REJECTED, payload: error.message });
  }
};

//Edit Student Data Action
export const editStudentData = (data) => async (dispatch) => {
  try {
    dispatch({ type: EDIT_STUDENT_PENDING });
    await axios.patch(`http://localhost:2000/student/${data.id}`, data);
    dispatch({ type: EDIT_STUDENT_FULLFILL, payload: data });
  } catch (error) {
    dispatch({ type: EDIT_STUDENT_REJECTED, payload: error.message });
  }
};

//Edit Student Action
export const editStudent = (mood, data) => {
  return { type: EDIT_STUDENT_DATA, payload: { data, mood } };
};
