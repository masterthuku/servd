import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <div className="flex justify-center pt-40" suppressHydrationWarning={true}>
      {children}
    </div>
  )
}

export default AuthLayout