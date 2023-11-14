import React, { useState,useEffect } from 'react';
import FAQData from './FAQ.json';
import axios from 'axios';
import './FAQ.css'
export const FAQ = () => {

  return (
    <div  className='FAQSection'> 

        {
            FAQData.questions.map( data => {
                return (
                    <>
                        <h1 className='question'> {data.id}. {data.question}</h1>
                        <div className="answer">{data.answer}</div>
                        {data.extra?.map(points => {
                            return (
                                <>
                                    <p style ={{textAlign : "left", marginBottom : '-10px'}}> <strong>{points.header }</strong> <span>{points.value}</span> </p>
                                    
                                </>
                            )
                        })}
                    </>
                );
            })
        }
        
    </div>
  )
}
