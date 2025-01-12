import React from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setItemsCurrentPage } from "@/app/redux/slices/itemPaginatorSlice";
import { setItems } from "@/app/redux/slices/itemsSlice";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Pagination,
} from "@mui/material";
import { RootState } from "@/app/redux/store";
import { convDatetime } from "@/app/utils";
import { itemsAPI } from "@/app/api/items";

const ItemList = () => {
  const items = useSelector((state: RootState) => state.items);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "50px" }}>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell sx={{ width: "100px" }}>User</TableCell>
            <TableCell sx={{ width: "200px" }}>Created</TableCell>
            <TableCell sx={{ width: "100px" }}>Views</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No items available
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>
                  <Link href={`/items/${item.id}`}>
                    {item.title} [{item.comment_count}]
                  </Link>
                </TableCell>
                <TableCell>{item.user_name}</TableCell>
                <TableCell>{convDatetime(item.created_at)}</TableCell>
                <TableCell>{item.view_count}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const ItemsPagination = () => {
  const dispatch = useDispatch();
  const itemsPage = useSelector((state: RootState) => state.itemsPage);

  const fetchItems = async (currPage: number) => {
    try {
      const result = await itemsAPI.fetchItems(currPage);
      if (result.success) {
        dispatch(setItems(result.data.items));
        dispatch(setItemsCurrentPage(currPage));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePageChange = (
    _: React.ChangeEvent<unknown>,
    currPage: number
  ) => {
    fetchItems(currPage);
  };

  return (
    <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
      <Pagination
        count={itemsPage.totalItemPage}
        page={itemsPage.currentItemPage}
        onChange={handlePageChange}
        color="primary"
      />
    </Box>
  );
};

const ItemsTable = () => {
  return (
    <Box>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        Items
      </Typography>
      <ItemList />
    </Box>
  );
};

export default function ItemsTableContainer() {
  return (
    <Box sx={{ margin: 4 }}>
      <ItemsTable />
      <ItemsPagination />
      <Button variant="contained" color="primary">
        Create New Item
      </Button>
    </Box>
  );
}
