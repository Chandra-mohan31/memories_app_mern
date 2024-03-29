import React from 'react'
import useStyles from "./styles";
import {Card,CardActions,CardContent,CardMedia,Button,Typography, ButtonBase} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizonIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import {useDispatch} from "react-redux";
import {deletePost,likePost} from "../../../actions/posts";
import {useHistory} from "react-router-dom"
function Post({post,setCurrentId}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();
  const openPost = () => {
    history.push(`/posts/${post._id}`);
  }
  const Likes = () =>{
    
    if(post.likes.length > 0){
      return post.likes.find((like)=> like === (user?.result?.googleId || user?.result?._id))
      ? (
        <>
          <ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
        </>
      ):(
        <>
          <ThumbUpAltIcon fontSize='small' />&nbsp;{post.likes.length}{post.likes.length === 1 ? 'Like' : 'likes'}
        </>
      )
    }
    return <>
      <ThumbUpAltIcon fontSize='small' />&nbsp;Like
    </>
  }
  return (
    <Card className={classes.card} raised elevation={6}>
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
      {/* <ButtonBase className={classes.cardAction} onClick={openPost}> */}
      <div onClick={openPost} style={{
        cursor:"pointer"
      }}>

      <div className={classes.overlay}>
        <Typography variant='h6'>{post.name}</Typography>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>

      </div>
      {
        (user?.result?._id === post?.creator || user?.result?.googleId === post?.creator) && (
          <div className={classes.overlay2}>
        <Button style={{
          color:"white"
        }} size="small" onClick={()=>{
            setCurrentId(post._id)
        }}>
          <MoreHorizonIcon fontSize='default' />
        </Button>
      </div>
        )
      }
      {/* <div className={classes.overlay2}>
        <Button style={{
          color:"white"
        }} size="small" onClick={()=>{
            setCurrentId(post._id)
        }}>
          <MoreHorizonIcon fontSize='default' />
        </Button>
      </div> */}
      <div className={classes.details}>
      <Typography variant='body2' color='textSecondary'>{post.tags.map((tag)=>(
        `${tag} `
      ))}</Typography>
      </div>
      <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>

      <CardContent>
      <Typography  variant='body2' color="textSecondary" component='p' >{post.message}</Typography>

      </CardContent>
      {/* </ButtonBase> */}
      </div>
      
      <CardActions className={classes.cardAction}>
        <Button size="small" color="primary"  disabled={!user?.result}  onClick={()=>{
          dispatch(likePost(post._id))
        }}>
          <Likes />
        </Button>
        {
          (user?.result?._id === post?.creator || user?.result?.googleId === post?.creator) && (
            <Button size="small" color="primary" onClick={()=>{
            dispatch(deletePost(post._id))
        }}>
          <DeleteIcon fontSize='small' />
          Delete
          
        </Button>
          )
        }
      
      </CardActions>

        
      
    </Card>
    )
}

export default Post