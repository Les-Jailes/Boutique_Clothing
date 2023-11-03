'use client'

import React, { useState } from "react";
import '@/css/Products/ColorClothe.css'

export function ColorClothe({ color }) {

    const [isSelected, setIsSelected] = useState(false)

    const handleSelected = () => {
        setIsSelected(!isSelected)
    }

    const style = {
        "backgroundColor": color
    }

    return <div className="color-clothe" style={ style }></div>;
}
