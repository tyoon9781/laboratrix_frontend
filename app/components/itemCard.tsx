import { Typography, Box, Paper, Container, Chip } from "@mui/material";
import { Item } from "@/app/types/items";
export default function ItemCard({ item }: { item: Item }) {
  return (
    <Container>
      <Paper elevation={10} sx={{ padding: 4, my: 4 }}>
        <Typography variant="h4" gutterBottom>
          {item.title}
        </Typography>

        <Typography variant="body1">ID: {item.id}</Typography>
        <Typography variant="body1">Comments: {item.comment_count}</Typography>
        <Typography variant="body1">Contents: {item.contents}</Typography>
        <Typography variant="body1">Views: {item.view_count}</Typography>
        <Typography variant="body1">Updated: {item.updated_at}</Typography>
        <Typography variant="body1">Created: {item.created_at}</Typography>

        {/* <Box mt={2}>
          <Chip
            label={item.is_modified ? "Modified" : "Original"}
            color={item.is_modified ? "secondary" : "primary"}
          />
        </Box> */}
      </Paper>
    </Container>
  );
}
