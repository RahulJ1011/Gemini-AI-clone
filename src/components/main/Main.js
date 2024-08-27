import WatchLater from '@mui/icons-material/WatchLater'
import React, { useContext } from 'react';
import './main.css'
import SendIcon from '@mui/icons-material/Send';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import CodeIcon from '@mui/icons-material/Code';
import DrawIcon from '@mui/icons-material/Draw';
import { Context } from '../../context/context';
const Main = () => {
    const {onsent,recentPrompt,showResult,loading,resultData,SetInput,input} = useContext(Context);

  return (
    <div className='main-container'>
        <div className='nav-container'>
            <p>Gemini</p>
            
            <p></p>
            <div className='nav-right-corner'>
                <WatchLater />
               
            </div>

        </div>
        {
            !resultData ? 
            <>
            <div className='greetings'>
            <p><span>Hello,User</span></p>
            <p>How Can I help You today?</p>

        </div>
        <div className='cards'>
        <div className='card'>
        <p>The walls between art and engineering exist only in our minds.

        </p>
        <DrawIcon />
        </div>
       <div className='card'>
       <p>
        A good scientist is a person with original ideas. 
        </p>
        <EmojiObjectsIcon />
       </div>
       <div className='card'>
       <p>
        Life is an unending stream of extemporaneous problems.
        </p>
        <DrawIcon />
       </div>
        <div className='card'>
        <p>
        What we usually consider as impossible are simply engineering problems...
        <CodeIcon />
        </p>
        </div>
       
        </div>
            </>
            :
           <div className='result'>
            <div className='result-title'>
                <p>{recentPrompt}</p>
                </div>
                <div className='result-data'>
                    {
                        loading?
                        <div className='loader'>
                            <hr />
                            <hr />
                            <hr />
                            </div>
                            :
                            <>
                            </>

                    }
                    <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                </div>
            </div>
            
        }
        
        <div className='main-bottom'>
            <div className='main-search-box'>
                <input
                type='text'
                onChange={(e)=> SetInput(e.target.value)}
                value={input}
                    placeholder='Enter a Prompt here'
                />
                
                    <AddPhotoAlternateIcon />
                    <KeyboardVoiceIcon />
                    <SendIcon
                    onClick={(e)=> onsent()}
                    
                    />
                
                
            </div>
            <div className='main-bottom-info'>
            Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy & Gemini Apps

            </div>
        </div>
      
    </div>
  )
}

export default Main
