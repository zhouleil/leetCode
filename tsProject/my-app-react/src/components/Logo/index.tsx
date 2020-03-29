import React from 'react'

interface Iprops {
  /**
   * logo的地址
   */
  logo?: string
  className?: string
  alt?: string
}

// React.SFC 是什么
export const Logo: React.FC<Iprops> = props => {
  const { logo, className, alt } = props
  
  return (
    <img src={logo} className={className} alt={alt} />
  )
}