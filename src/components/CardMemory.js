import React from 'react'
import { MDBCard,
MDBCardTitle,MDBCardText,
MDBCardImage,MDBCardGroup, MDBCardBody
} from 'mdb-react-ui-kit'
import {Link} from "react-router-dom"

const CardMemory = ({imageFile,description,title,tags,_id,name}) => {

    const excerpt = (str) => {
         if(str.length > 45){
             str = str.substring(0,45) + "..."
         }
         return str
    }



  return (
    <MDBCardGroup>
        <MDBCard className='h-100 mt-2 d-sm-flex'
        style={{maxWidth:"20rem"}}>
            <MDBCardImage 
            src={imageFile}
            alt={title}
            position="top"
            style={{maxWidth:"100%",height:"175px"}}/>
            <div className='top-left'>{name}</div>
            <span className='text-start tag-card'>{tags.map((item) => `#${item} ` )}</span>
            <MDBCardBody>
                <MDBCardTitle className='text-start'>
                    {title}
                </MDBCardTitle>
                <MDBCardText className='text-start'>
                    {excerpt(description)}
                    <Link to={`/memory/${_id}`}>
                    Read More
                    </Link>
                </MDBCardText>
            </MDBCardBody>
            
        </MDBCard>
    </MDBCardGroup>
  )
}

export default CardMemory