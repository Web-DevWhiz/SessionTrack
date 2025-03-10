import React from 'react'
import { useState } from 'react'
import { PageContext } from '../store/PageStore';

export const PageProvider = ({ children }) => {
    const [page, setPage] = useState("dashboard");
  return (
    <PageContext.Provider value={{
        page,
        setPage
    }}>
        {children}
    </PageContext.Provider>
  )
}
