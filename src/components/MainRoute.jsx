import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Comment from './Comment'
import Main from './Main'
import Post from './Post'



const MainRoute = () => {


  return (
    <div>
        
         <Routes>
          <Route path="/" element={<Main/>}></Route>
          <Route path="/post/:id" element={<Post />}></Route>
          <Route path="/comment/:id" element={<Comment />}></Route>
      </Routes>
    </div>
  )
}

export default MainRoute