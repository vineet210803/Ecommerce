import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import { products } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

export default function Trending() {

  const context= React.useContext(ShopContext);
  return (
    <>
    <div className="py-5"></div>
    <Title text1={"Trending"} text2={"Now"}/>
    <Box
      sx={{
        display: "flex",
        gap: 2,
        py: 2,
        px: 1,
        overflowX: "auto",
        width: "90%",
        mx: "auto",
        scrollSnapType: "x mandatory",
        "& > *": {
          scrollSnapAlign: "center",
        },
        "::-webkit-scrollbar": { display: "none" },
      }}
    >
      {products.map((item) => (
        <Card
          key={item._id}
          orientation="vertical"
          variant="outlined"
          sx={{
            minWidth: 220,
            maxWidth: 240,
            borderRadius: "lg",
            boxShadow: "sm",
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "lg",
              transform: "translateY(-6px)",
              borderColor: "primary.solidBg",
            },
          }}
        >
          <AspectRatio ratio="1.2" sx={{ borderRadius: "md" }}>
            <img
              src={item.image[0]}
              alt={item.name}
              loading="lazy"
              style={{ objectFit: "cover" }}
            />
          </AspectRatio>

          <Box sx={{ mt: 1, px: 1, textAlign: "center" }}>
            <Typography level="title-md" sx={{ fontWeight: "bold" }}>
              {item.name}
            </Typography>
            <Typography level="body-sm" sx={{ color: "text.secondary" }}>
              {item.category}
            </Typography>
            <Typography level="body-md" sx={{ mt: 0.5, fontWeight: "500" }}>
              {context.currency}{item.price}
            </Typography>
          </Box>
        </Card>
      ))}
    </Box>
    </>
  );
}
