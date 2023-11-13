import Image from 'next/image'
import React from 'react'

const InformationBox = ({title, content, img}) => {
  return (
    <div>
        <div>
            <h2>
                {title}
            </h2>
            <p>
                {content}
            </p>
        </div>
        <div>
            <Image 
                src={img}
                alt= "info img"
                width={300}
                height={200}
            />
        </div>
    </div>
  )
}

export default InformationBox