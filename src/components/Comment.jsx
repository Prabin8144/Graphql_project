
import React from 'react'
import { gql } from '@apollo/client';
import { useState, useEffect } from 'react';
import {client} from "./client"
import './Main.css';
import { FaRegComment } from 'react-icons/fa'
const Comment = () => {
const [com,setCom] = useState([])
const [val,setVal]  = useState("")
const [data,setData]  = useState("")

var Id= JSON.parse(localStorage.getItem("Id"))



useEffect(()=>{
  getCommentsFunction();
},[Id])


const  getCommentsFunction = ()=>{
  client
    .query({
      query:gql`
        query($id: String){
            getComment(post_id: $id) {
          added_by
         comment
          post_id
          id
         } 
      }
      `
      ,variables:{id:`${Id}`}
  
    }).then((r)=>{
        setCom(r.data.getComment)
    })
}


const  handleChange = (e)=>{
  setVal(e.target.value)
  setData(e.target.value)
  console.log(val,data)
}



const handleClick = ()=>{
  client
    .mutate({
      mutation:gql`
        mutation ($id: String, $input: inutComment) {
                AddComment(id: $id, input: $input) {
                  added_by
                  comment
                  id
                  post_id
                }
            }`
            
      ,variables:{id:`${Id}`,input:{comment:`${val}`,user_id:`${Id}`}}
      

    }).then((r)=>{
      setCom([...com,{
        post_id:`${Id}`,
        comment:`${val}`,
        added_by:`${Id}`
      }])
    })
   setVal("")
   setData("")
}



const UpdateCommand = (e)=>{
  client
    .mutate({
      mutation:gql`
        mutation ($id: String, $input: UpdateCom) {
        UpdateComment(id: $id, input: $input) {
          comment
          added_by
          id
          }
        }`
            
      ,variables:{id:`${Id}`,input:{comment:`${data}`}}
      

    }).then((r)=>{
      setCom(...com,[{
        post_id:`${e.id}`,
        comment:`${data}`,
        added_by:`${Id}`
      }])
    })

        
}


const DeleteCommand = (e,index)=>{
  client
    .mutate({
      mutation:gql`
     mutation ($id: String) {
       DeleteComment(id: $id) {
       id
       comment
       added_by
       post_id
      }
    }`
            
      ,variables:{id:`${e.id}`}
      

    }).then((r)=>{
      setCom(com.splice(index,1))
      getCommentsFunction();
    })
    
}
  return (

    <div>
      <h4>hey user your comments........</h4>
       <p>you have Only :{com.length} Comment.....</p>
        {com.map((e,index)=>{
                   return (
                    <>
                  <h2>My Comments <FaRegComment/>  : {e.comment}</h2>
                  <button onClick={()=>UpdateCommand(e)}>Update</button>
                  <button onClick={()=>DeleteCommand(e,index)} style={{background:'red'}}>Delete</button>
                 
                  <h3>You got the comment from having ID = <b style={{color:"Highlight"}}>{e.added_by}</b>   thnx.... </h3>          
                  </>
                )
              })} 
                <input type="text" placeholder='Write Comment' width={"50%"} onChange={handleChange}/>
                   <button onClick={handleClick}>Add Comment</button> 
             
    </div>
  )
}

export default Comment