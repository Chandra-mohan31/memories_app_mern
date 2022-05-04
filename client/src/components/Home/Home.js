import React, { useEffect, useState } from 'react'
import {Container,AppBar,Typography,Grow,Grid, Paper,TextField,Button} from "@material-ui/core";
import { useHistory,useLocation } from 'react-router-dom';
import ChipInput from "material-ui-chip-input";
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import {getPosts,getPostsBySearch} from "../../actions/posts";
import {useDispatch} from "react-redux";
import Paginate from '../Pagination';

import memories from "../../images/memories.png";
// import useStyles from "../../styles";
import useStyles from "./styles.js";
function useQuery(){
  return new URLSearchParams(useLocation().search);
}
function Home() {
    const [currentId,setCurrentId] = useState(null);
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    
    const classes = useStyles();
    const dispatch = useDispatch();


    // useEffect(()=>{
    //   dispatch(getPosts());
    // },[currentId,dispatch]);
    
    useEffect(()=>{
      dispatch(getPosts());
    },[currentId,dispatch]);



    const [search,setSearch] = useState('');
    const [tags,setTags] = useState([]);
    const handleKeyPress = (e) =>{
      // e.preventDefault();
      if(e.keyCode === 13){
        searchPost();
      }
    }
    const handleAdd = (tag) => {
      //
      setTags([...tags,tag]);
    }
    const handleRemove = (tagToDelete) => setTags(tags.filter((tag)=> tag != tagToDelete));
    const searchPost = () => {
      // e.preventDefault();
      if(search.trim() || tags){
        //dispatch -> fetch search post
        // console.log({
        //   search,
        //   tags: tags.join(',')
        // })
        dispatch(getPostsBySearch({
          search,
          tags: tags.join(',')
        }));
        history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
      }else{
        history.push("/")
      }
    }
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container className={classes.gridContainer}  justify="space-between" alignItems="stretch" spacing={3} >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
          <AppBar className={classes.appBarSearch} position="static" color="inherit">
            <TextField name="search" variant="outlined" label="Search Memories"
              fullWidth
              value={search}
              onKeyPress={handleKeyPress}
              onChange={(e)=>{
                setSearch(e.target.value)

              }}
               />
               <ChipInput style={{margin: '10px 0'}}
               value={tags}
               onAdd={handleAdd}
               onDelete={handleRemove}
               label="Search Tags"
               variant='outlined'
               />
          <Button onClick={searchPost} variant="outlined" className={classes.searchButton} color="primary">Search</Button>
          </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6}>
              <Paginate />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home