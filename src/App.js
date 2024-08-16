import {
  Grid,
  TextField,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import FilterOptions from "./FilterOptions";
import Cart from "./ShoppingCart";
import { useSnackbar } from "notistack";

const App = () => {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    gender: [],
    color: [],
    price: [],
    type: [],
  });
  const [products, setProducts] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    axios
      .get(
        "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
      )
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      });
  }, []);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const showCart = () => {
    setIsCartVisible(true);
  };
  const showProduct = () => {
    setIsCartVisible(false);
  };
  const updateQuantity = (product, change) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + change };
        } else {
          return item;
        }
      });
    });
  };
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      if (existingProduct.quantity + 1 > product.quantity) {
        enqueueSnackbar("Not enough quantity available", {
          variant: "warning",
        });
      } else {
        updateQuantity(existingProduct, 1);
      }
    } else {
      if (product.quantity < 1) {
        enqueueSnackbar("Not enough quantity available", { variant: "error" });
      } else {
        setCart([...cart, { ...product, quantity: 1 }]);
      }
    }
  };
  const removeFromCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      if (existingProduct.quantity > 1) {
        updateQuantity(existingProduct, -1);
      } else {
        setCart(cart.filter((item) => item.id !== product.id));
      }
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  
  const handleFilter = (event) => {
    if (event.target.checked) {
      setFilter({
        ...filter,
        [event.target.name]: [...filter[event.target.name], event.target.value],
      });
    } else {
      setFilter({
        ...filter,
        [event.target.name]: filter[event.target.name].filter(
          (value) => value !== event.target.value
        ),
      });
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      (search
        ? product.name.toLowerCase().includes(search.toLowerCase())
        : true) &&
      (filter.gender.length > 0
        ? filter.gender.includes(product.gender)
        : true) &&
      (filter.color.length > 0 ? filter.color.includes(product.color) : true) &&
      (filter.price.length > 0
        ? filter.price.some((priceRange) => {
            const [min, max] = priceRange.split("-").map(Number);
            return product.price >= min && product.price <= max;
          })
        : true) &&
      (filter.type.length > 0 ? filter.type.includes(product.type) : true)
  );

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TeeRex Store
          </Typography>
          <Button color="inherit" onClick={showProduct}>
            Products
          </Button>
          <IconButton size="large" color="inherit" onClick={showCart}>
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search for items/categories"
            name="search"
            onChange={handleSearch}
            sx={{ maxWidth: "500px" }}
          />
        </Grid>
      </Grid>
      {isCartVisible ? (
        <Cart cart={cart} removeFromCart={removeFromCart} />
      ) : (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} md={2} bg="#E9F5E1">
              <FilterOptions handleFilter={handleFilter} />
            </Grid>
            <Grid item xs={12} md={10}>
              <Grid container spacing={2}>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={3} key={product.id}>
                      <ProductCard
                        product={product}
                        handleAddToCart={addToCart}
                      />
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12} >
                    <Typography variant="h6" textAlign="center">
                      No products found matching your search criteria.
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};

export default App;