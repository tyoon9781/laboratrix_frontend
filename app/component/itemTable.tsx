import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

const ItemList = () => {
  const items = useSelector((state: RootState) => state.items.items);

  if (items.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 2 }}>
        <Typography variant="body1" color="text.secondary">
          No items available
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">Name</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Description</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Typography>{item.name}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{item.description}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default function ItemTable() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Items
      </Typography>
      <ItemList />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button variant="contained">Create</Button>
      </Box>
    </Box>
  );
}
