import { List, Paper } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import SearchListItem from './SearchListItem'

export default function SearchRes({ searchResults }) {
  console.log('searchResults props', searchResults)
  return (
    <Paper sx={{ width: '480px', maxHeight: "200px", margin: "auto", position: 'absolute', zIndex: '1', left: '25.5%', overflow: "auto", border: "2px solid red" }}>
      <List sx={{ width: "100%", padding: '10px' }}>
        {
          searchResults.searchResults.map((product) => {
            console.log('product', product)

            return (
              <SearchListItem product={product} key={product.productId} />
            )
          })
        }
      </List>

    </Paper>
  )
}

