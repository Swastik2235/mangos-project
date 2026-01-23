import { FC } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  // onClick: () => void;
  onClick?: () => void;
}

const FileCard: FC<StatCardProps> = ({ title, value, icon, onClick }) => {
  return (
    <Card
    onClick={onClick}
      sx={{
        boxShadow: `
        4px 4px 20px 0px #6F8CB069,
        -6px -6px 20px 0px #FFFFFF,
        2px 2px 4px 0px #728EAB1A
      `,
        background: "#E7EBF0",
        '&:hover': {
                backgroundColor: '#A7AABB20',
              },
              '&:active': {
                backgroundColor: '#A7AABB30',
              },
      }}
    >
      <CardContent sx={{ textAlign: "center" }}>
        <Box>{icon}</Box>

        <Typography variant="h5" sx={{ textAlign: "center", mb: 1, fontWeight: 500 }}>
          <b>{title}</b>
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ mb: 1, textAlign: "center" }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FileCard;
