import React, { useContext } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
// import useAxiosSecure from "../hooks/useAxiosSecure";
// import { AuthContext } from "../main";

const useFetchApi = () => {
  const axiosSecure = useAxiosSecure();


  const findTheUser = (email) => {
    return axiosSecure
      .get(`/findTheUser?email=${email}`)
      .then((res) => res.data);
  };
  const postTheUser = (email, data) => {
    return axiosSecure
      .post(`/postTheUser?email=${email}`, data)
      .then((res) => res.data);
  };

  const createSession = (email, sessionData) => {
    return axiosSecure
      .post(`/createSession?email=${email}`, sessionData)
      .then((res) => res.data);
  };

  const mySession = (email) => {
    return axiosSecure
      .get(`/tutorMySessions?email=${email}`)
      .then((res) => res.data);
  };

  const resendApprovalRequest = (id) => {
    return axiosSecure
      .patch(`/updateSessionStatus?id=${id}`)
      .then((res) => res.data);
  };

  const approvedSessions = (email) => {
    return axiosSecure
      .get(`/approvedSessionsList?email=${email}`)
      .then((res) => res.data);
  };

  const uploadMaterials = (data,email) => {
    return axiosSecure.post(`/uploadMaterials?email=${email}`, data).then((res) => res.data);
  };

  const getAllMaterials = (email) => {
    return axiosSecure
      .get(`/getAllMaterials?email=${email}`)
      .then((res) => res.data);
  };

  const getAllUsers = (search = "", page = 1, limit = 10,email) => {
    return axiosSecure
      .get(`/getAllUsers?search=${search}&page=${page}&limit=${limit}&email=${email}`)
      .then((res) => res.data);
  };

  const updateUserRole = (id, role,email) => {
    return axiosSecure
      .patch(`/updateUserRole?id=${id}&role=${role}&email=${email}`)
      .then((res) => res.data);
  };

  const getAllSessions = (email) => {
    return axiosSecure.get(`/getAllSessions?email=${email}`).then((res) => res.data);
  };

  const approveSession = (data,email) => {
    return axiosSecure.patch(`/approveSession?email=${email}`, data).then((res) => res.data);
  };

  const deleteSession = (id,email) => {
    return axiosSecure
      .delete(`/deleteSession?id=${id}&email=${email}`)
      .then((res) => res.data);
  };

  const rejectSession = (id, payload,email) => {
    return axiosSecure
      .patch(`/rejectSession?id=${id}&email=${email}`, payload)
      .then((res) => res.data);
  };

  const getAllMaterialsAdmin = (email) => {
    return axiosSecure.get(`/getAllMaterialsAdmin?email=${email}`).then((res) => res.data);
  };

  const deleteMaterial = (id,email) => {
    return axiosSecure
      .delete(`/deleteMaterial?id=${id}&email=${email}`)
      .then((res) => res.data);
  };

  const createNote = (noteData,email) => {
    return axiosSecure.post(`/createNote?email=${email}`, noteData).then((res) => res.data);
  };

  const getMyNotes = (email) => {
    return axiosSecure
      .get(`/getMyNotes?email=${email}`)
      .then((res) => res.data);
  };

  const deleteNote = (id,email) => {
    return axiosSecure.delete(`/deleteNote?id=${id}&email=${email}`).then((res) => res.data);
  };

  const getNoteById = (id,email) => {
    return axiosSecure.get(`/getNoteById/${id}?email=${email}`).then((res) => res.data);
  };

  const updateNoteById = (id, noteData,email) => {
    return axiosSecure
      .patch(`/updateNote/${id}?email=${email}`, noteData)
      .then((res) => res.data);
  };
  const getSixSessions = () => {
    return axiosSecure.get("/getSixSessions").then((res) => res.data);
  };

  const getAllSessionsGeneral = (page = 1, limit = 6) => {
    return axiosSecure
      .get(`/getAllSessionsGeneral?page=${page}&limit=${limit}`)
      .then((res) => res.data);
  };

  const getSessionById = (id) => {
    return axiosSecure.get(`/getSessionById/${id}`).then((res) => res.data);
  };
  const bookSession = (bookingData) => {
    return axiosSecure
      .post("/bookSession", bookingData)
      .then((res) => res.data);
  };
  const getMyBookedSessions = (email) => {
    return axiosSecure
      .get(`/getMyBookedSessions?email=${email}`)
      .then((res) => res.data);
  };

  const postReview = (data) => {
    return axiosSecure.patch("/postReview", data).then((res) => res.data);
  };

  const getSessionReviews = (id) => {
    return axiosSecure
      .get(`/getSessionReviews?id=${id}`)
      .then((res) => res.data);
  };

  const fetchTutors = () => {
    return axiosSecure.get(`/allTutors`).then((res) => res.data);
  };

  const getStudentMaterials = (email) => {
    return axiosSecure
      .get(`/studentMaterials?email=${email}`)
      .then((res) => res.data);
  };

  const checkBooked = (email, sessionId) => {
    return axiosSecure
      .get(`/checkedBooked?email=${email}&sessionId=${sessionId}`)
      .then((res) => res.data);
  };

  return {
    findTheUser,
    postTheUser,
    createSession,
    mySession,
    resendApprovalRequest,
    approvedSessions,
    uploadMaterials,
    getAllMaterials,
    getAllUsers,
    updateUserRole,
    getAllSessions,
    approveSession,
    deleteSession,
    rejectSession,
    getAllMaterialsAdmin,
    deleteMaterial,
    createNote,
    getMyNotes,
    deleteNote,
    getNoteById,
    updateNoteById,
    getSixSessions,
    getAllSessionsGeneral,
    getSessionById,
    bookSession,
    getMyBookedSessions,
    postReview,
    getSessionReviews,
    fetchTutors,
    getStudentMaterials,
    checkBooked,
  };
};

export default useFetchApi;
