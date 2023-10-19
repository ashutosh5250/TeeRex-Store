import React from "react";
import { CardMedia, Typography, Button, Box, Grid } from "@mui/material";

const Cart = ({ cart, removeFromCart }) => {
  const total = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  return (
    <Box sx={{ width: "100%", marginTop: "2rem" }}>
      <Box marginTop="2rem" marginBottom="4rem">
        <Typography variant="h4" align="center">
          Shopping Cart
        </Typography>
      </Box>
      {cart.map((product) => (
        <Grid
          container
          spacing={2}
          key={product.id}
          sx={{ marginBottom: "1rem" }}
        >
          <Grid item xs={3}>
            <CardMedia
              component="img"
              alt={product.name}
              height="140"
              image={product.imageURL}
            />
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h5">{product.name}</Typography>
            <Typography variant="body1">Price: {product.price}</Typography>
            <Typography variant="body1">
              Quantity: {product.quantity}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => removeFromCart(product)}
            >
              Remove
            </Button>
          </Grid>
        </Grid>
      ))}
      <Typography variant="h6" align="center">
        Total: {total}
      </Typography>
    </Box>
  );
};

export default Cart;
