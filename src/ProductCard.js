import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

const ProductCard = ({ product, handleAddToCart }) => {
  return (
    <Card className="card">
      <CardMedia component="img" image={product.imageURL} alt={product.name} />
      <CardContent>
        <Typography>{product.name}</Typography>
        <Typography style={{ fontWeight: "bold" }}>${product.price}</Typography>
      </CardContent>
      <CardActions className="card-actions">
        <Button
          className="card-button"
          variant="contained"
          size="large"
          fullWidth
          startIcon={<AddShoppingCartOutlined />}
          onClick={() => handleAddToCart(product)}
        >
          ADD TO CART
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
