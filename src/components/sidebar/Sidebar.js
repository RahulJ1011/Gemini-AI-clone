import React, { useContext, useState } from 'react';
import './sidebar.css';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AddIcon from '@mui/icons-material/Add';

import WatchLaterIcon from '@mui/icons-material/WatchLater';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import MenuIcon from '@mui/icons-material/Menu';
import { Context } from '../../context/context';

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const {onsent,prevPromt,currentChat,SetRecentPrompt} = useContext(Context)
    const loadPrompt = async(prompt)=>
        {
            SetRecentPrompt(prompt)
            await onsent(prompt)
        }
   
    const toggleExtended = () => {
        setExtended(!extended);
    };

    return (
        <div className='sidebar-container'>
            <div className='sidebar-top'>
                <div onClick = {()=> {
                    toggleExtended();
                }} className='sidebar-menu-icon'>
                    <MenuIcon />
                </div>
                {extended && (
                    <>
                        <div  className='sidebar-chat'>
                            <AddIcon />
                            <p>New Chat</p>
                        </div>
                        <div className='sidebar-recent'>
                            <h4>Recent</h4>
                            {
                                prevPromt.map((data,index)=> {
                                    return (
                                        <div onClick={()=> loadPrompt(data)} className='sidebar-recent-entry'>
                                            <ChatBubbleOutlineIcon />
                                            <p>{data}...</p>
                                            </div>
                                    )

                                })
                            }

                        </div>
                    </>
                )}
            </div>
            {
                extended && 
                <>
                 <div className='sidebar-bottom'>
                <div className='sidebar-bottom-item'>
                    <HelpIcon />
                    <p>Help</p>
                </div>
                <div className='sidebar-bottom-item'>
                    <SettingsIcon />
                    <p>Settings</p>
                </div>
                <div className='sidebar-bottom-item'>
                    <WatchLaterIcon />
                    <p>Activity</p>
                </div>
            </div>
                
                </>
            }
           
        </div>
    );
};

export default Sidebar;
