import * as api from "../api";

//Actions Creators

import {FETCH_ALL,FETCH_POST,CREATE,DELETE,UPDATE,FETCH_BY_SEARCH,START_LOADING,END_LOADING} from "../constants/actionTypes"

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const {data} = await api.fetchPosts(page);
        console.log(data)
        const action = {type:FETCH_ALL,payload: data}
        dispatch(action)
        dispatch({type: END_LOADING})
    } catch (error) {
        console.log(error);
    }

    
}
export const getPostsBySearch = (searchQuery) => async(dispatch) => {
    console.log(searchQuery)
    try {
        dispatch({type: START_LOADING});

        const {data:{data}} = await api.fetchPostsBySearch(searchQuery);
        console.log(data);
        const action = {type:FETCH_BY_SEARCH,payload: data}
        dispatch(action)
        dispatch({type: END_LOADING})

    } catch (error) {
        console.log(error);
    }
}
export const createPost = (post) => async(dispatch) => {
    try{
        dispatch({type: START_LOADING});

        const {data} = await api.createPost(post);
        dispatch({type: CREATE,payload: data})
        dispatch({type: END_LOADING})

    }catch(error){
        console.log(error);
    }
}

export const updatePost = (id,post) =>async(dispatch) => {
    try{
      const {data} = await api.updatePost(id,post); 
      dispatch({type:UPDATE,payload: data}) 
    }catch(error){
        console.log(error)
    }
}

export const deletePost = (id) => async(dispatch) => {
    try {
        await api.deletePost(id);
        
        dispatch({type:DELETE,payload: id})
    } catch (error) {
        console.log(error)   
    }

}

export const likePost = (id) => async(dispatch) => {
    try {
        const {data} = await api.likePost(id);
        dispatch({type:'LIKE',payload:data})
    } catch (error) {
        console.log(error)
    }
}

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const {data} = await api.fetchPost(id);
        console.log(data)
        const action = {type:FETCH_POST,payload: data}
        dispatch(action)
        dispatch({type: END_LOADING})
    } catch (error) {
        console.log(error);
    }

    
}