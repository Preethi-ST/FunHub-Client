import React from 'react'
import Pagination from '@material-ui/lab/Pagination';
import { createTheme, ThemeProvider } from '@material-ui/core';
function CustomPagination({setPage,numOfPages=10}) {
    const theme = createTheme({
        palette: {
          type : 'dark'
        },
      });
      
    const handleChange = (event,value) => {
        setPage(value)
        window.scroll(0,0)
    }
    return (
        <div style={{width:'100%', display:'flex',justifyContent:'center',marginTop:10,paddingBottom:'1rem'}}>
            <ThemeProvider theme = {theme}>
                <Pagination count={numOfPages} onChange={handleChange} />
            </ThemeProvider>
        </div>
    )
}

export default CustomPagination
