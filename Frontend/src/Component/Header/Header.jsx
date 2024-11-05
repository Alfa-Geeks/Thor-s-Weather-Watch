import React from 'react'

const Header = ({userData}) => {
    // console.log(userData);
    
  return (
    <>
        <div className='bg-gray-900 px-3 py-5 flex justify-between'>
            <div className='text-white text-xl my-auto flex'>
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="" className='w-14 h-14 rounded-full selection:scale-150 mx-9 scale-125'/>
                <p className='my-auto'>Hi {userData.username}</p>
            </div>
            <div className='text-white text-xl flex gap-6 my-auto mx-16'>
                <p className='hover:cursor-pointer'>Home</p>
                <p className='hover:cursor-pointer'>Profile</p>
                <p className='hover:cursor-pointer'>Contact</p>
                <p className='hover:cursor-pointer'>Settings</p>
            </div>
        </div>
    </>
  )
}

export default Header