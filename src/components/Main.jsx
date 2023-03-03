import React from 'react'
import { useEffect } from 'react';
import './Main.css';
import { gql } from '@apollo/client';

import { useState } from 'react';
import {client} from "./client"
import { Link, useParams } from 'react-router-dom';


export const Main = () => {

  const [d,setD] = useState([])


  const GetData = ()=>{
    client
      .query({
        query:gql`
        query{
          getUser{
            name
            id
            age
            sex
          }
        }
        `
      }).then((r)=>{
         setD(r.data.getUser)
      })
  }

  return (
    <>  
        <div className="main">
            <div>
            <h1>Lattech Dashboard</h1>
            </div>
            <div>
                <button onClick={GetData} >Show User</button>
                <button>Posts</button>
                <button>All Likes</button>
                <button>All Comand</button>
            </div>

            {d.map((e)=>{
                return (
              <h3  key={e.id}>{e.id}my name is <Link to={`/post/${e.id}`}> <span style={{color:"green"}}>{e.name}</span> </Link> and i am {e.age}</h3>
                )
              })}
        </div>
       
    </>
  )
}

export default Main