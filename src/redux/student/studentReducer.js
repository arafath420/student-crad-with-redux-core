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
import { studentInitialState } from "./studentInitialState";
const studentReducer = (state = studentInitialState, action) => {
  switch (action.type) {
    case GET_STUDENT_PENDING:
      return {
        ...state,
        loader: true,
      };

    //Get All Student Reducer
    case GET_STUDENT_FULLFILL:
      return {
        ...state,
        loader: false,
        student: action.payload,
        message: "Student Loading Succesfull",
      };

    case GET_STUDENT_REJECTED:
      return {
        ...state,
        loader: false,
        error: action.payload,
        message: "Student Loading Feailed",
      };

    //Create Student Reducer
    case CREATE_STUDENT_PENDING:
      return {
        ...state,
        loader: true,
      };

    case CREATE_STUDENT_FULLFILL:
      return {
        ...state,
        loader: false,
        student: [...state.student, action.payload],
        message: "Student Create Succesfull",
      };

    case CREATE_STUDENT_REJECTED:
      return {
        ...state,
        loader: false,
        error: action.payload,
        message: "Student Createing Feailed",
      };

    //Delete Student Reducer
    case DELETE_STUDENT_PENDING:
      return {
        ...state,
        loader: true,
      };

    case DELETE_STUDENT_FULLFILL:
      return {
        ...state,
        loader: false,
        student: state.student.filter((item) => item.id != action.payload),
        message: "Student Deleted Succesfull",
      };

    case DELETE_STUDENT_REJECTED:
      return {
        ...state,
        loader: false,
        error: action.payload,
        message: "Student Createing Feailed",
      };

    //Delete Student Reducer
    case EDIT_STUDENT_PENDING:
      return {
        ...state,
        loader: true,
      };

    case EDIT_STUDENT_FULLFILL:
      return {
        ...state,
        loader: false,
        student: state.student.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          } else {
            return item;
          }
        }),
        message: "Student Updated Succesfull",
      };

    case EDIT_STUDENT_REJECTED:
      return {
        ...state,
        loader: false,
        error: action.payload,
        message: "Student Updating Feailed",
      };

    case EDIT_STUDENT_DATA:
      return {
        ...state,
        loader: false,

        editStu: {
          editMood: action.payload.mood,
          data: action.payload.data,
        },
      };

    default:
      return state;
  }
};

export default studentReducer;
