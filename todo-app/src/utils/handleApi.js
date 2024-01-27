import axiosClient from "./axiosClient";

export const todoApi = {
    addTodo:params => axiosClient.post('/',params),
    getTodo:() => axiosClient.get('/'),
    updateTodo:(id,params) => axiosClient.put(`/${id}`,params),
    deleteTodo:(id) => axiosClient.delete(`/${id}`),
    completeTodo:(id) => axiosClient.patch(`/${id}`),
  }