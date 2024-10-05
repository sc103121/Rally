import React from 'react'

export default function Profile_photo_link() {
return (
    <div style={{ position: 'absolute', top: 10, right: 10 }}>
        <a href="/profile">
            <img 
                src="path_to_your_image.jpg" 
                alt="Profile Thumbnail" 
                style={{ width: 50, height: 50, borderRadius: '50%' }} 
            />
        </a>
    </div>
)
}
