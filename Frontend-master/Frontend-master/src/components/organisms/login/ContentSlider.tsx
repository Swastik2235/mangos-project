import React from "react";
import { Box, Typography, styled } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import Login1 from "../../../assets/login-1.svg";
import Login2 from "../../../assets/login-2.svg";
import Login3 from "../../../assets/login-3.svg";

interface SlideComponentProps {
  img: string;
  title: string;
  description: string;
}

const SlideComponent: React.FC<SlideComponentProps> = ({ img, title, description }) => {
  return (
    <Box sx={{ padding: 4, textAlign: "center" }}>
      <img alt="slide" src={img} style={{ maxWidth: 300 }} />
      <Typography variant="h4" fontWeight={700} mt={3}>
        {title}
      </Typography>
      <Typography>{description}</Typography>
    </Box>
  );
};

const StyledWrapper = styled(Box)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(4),
  backgroundColor: "rgb(177, 201, 220)",
  "& .swiper-pagination-bullet": {
    display: "inline-block",
    width: 10,
    height: 10,
    borderRadius: "50%",
    backgroundColor: theme.palette.grey[600],
    margin: "0 5px",
    opacity: 0.5,
    transition: "all 0.3s",
  },
  "& .swiper-pagination-bullet-active": {
    opacity: 1,
    backgroundColor: theme.palette.primary.main,
  },
}));

const slides = [
  {
    img: Login1,
    title: "Graph and analytics",
    description: "View your big dataset on graph and chart.",
  },
  {
    img: Login2,
    title: "Task management",
    description: "Task management UI.",
  },
  {
    img: Login3,
    title: "Build your project fast",
    description: "All the components you need are here.",
  },
];

const ContentSlider: React.FC = () => {
  return (
    <StyledWrapper>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        spaceBetween={50}
        slidesPerView={1}
        style={{
          width: "100%",
          maxWidth: 550,
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <SlideComponent
              img={slide.img}
              title={slide.title}
              description={slide.description}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </StyledWrapper>
  );
};

export default ContentSlider;
