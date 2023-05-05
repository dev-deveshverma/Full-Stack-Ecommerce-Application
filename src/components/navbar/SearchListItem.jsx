import * as React from 'react';
import ListItem from '@mui/material/ListItem';

import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function SearchListItem({ product }) {
  console.log('product', product);
  return (
    <>
      <Link to={`/products/${product.productId}`} style={{ textDecoration: "none" }}>
        <ListItem alignItems="flex-start" mb={2}>
          <ListItemAvatar>
            <Avatar sx={{ width: '50px', height: "50px" }} alt="Remy Sharp" src={`${process.env.REACT_APP_BASE_URL}${product.productImages[0]?.filename}`} variant='rounded' />
          </ListItemAvatar>
          <ListItemText
            primary={product.productName}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline', textOverflow: "ellipsis", height: '20px' }}
                  component="span"
                  color="text.primary"

                >

                </Typography>
                <Typography
                  sx={{ display: 'block' }}
                  component="span"
                  variant="body2"
                  color="text.primary">
                  <span ><del>{product.productPrice}</del></span>  <span style={{ marginLeft: '10px', fontWeight: '500' }}>{product.productDiscontPrice}</span>
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </Link>
    </>
  );
}
