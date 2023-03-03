
import React from 'react'
import { gql } from '@apollo/client';
import { useState, useEffect } from 'react';
import {client} from "./client"
import {Link, useParams } from 'react-router-dom';
import './Main.css';
import { FcLike } from 'react-icons/fc'
import { AiTwotoneDislike } from 'react-icons/ai'
import { GrLike } from 'react-icons/gr'
import { FaRegComment } from 'react-icons/fa'
const Post = () => {
const [post,setPost] = useState([])
const [like,setLike] = useState()

const {id} = useParams()
localStorage.setItem("Id",JSON.stringify(id))

// for onclick....
function handleClick(){
  addlike()
  alert("thank you.....")
}

const addlike = ()=>{

    client
    .mutate({
      mutation:gql`
        mutation($id: String) {
    AddLike(id: $id) {
      post_likes
    }
  } `
      ,variables:{id:`${id}`}

    }).then((r)=>{
      setLike(r.data.AddLike[0].post_likes)
      console.log(like,"ooop")
    })

}

// for getting all the data from the bqackend...........
useEffect(()=>{
    client
    .query({
      query:gql`
        query($id: String) {
            getPost(id:$id){
          post_name
          post_likes
          post_description
         } 
      }
      `
      ,variables:{id:`${id}`}
  
    }).then((r)=>{
      setPost(r.data.getPost)
      setLike(r.data.getPost[0].post_likes)
    })
},[id])


  return (
    <div>
         {post.map((e)=>{
                return(
                    <>
                  <h1 >My post Name : {e.post_name}</h1>

                  <h2>I got :{like} Likes.... <FcLike/>  </h2>

                  <p>{e.post_description}</p>

                 <h2 >
                 <GrLike className='res' onClick={()=>handleClick()}  />
                  <FaRegComment className='res'/>
                  <AiTwotoneDislike className='res'/>
                 </h2>
                 <Link to={`/comment/${e.id}`} style={{color:"red"}} >Show Comments</Link>
                  </>
                )

              })}
    </div>
  )
}

export default Post