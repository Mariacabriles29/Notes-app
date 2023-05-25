import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../auth/AuthContext";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NavigationIcon from "@mui/icons-material/Navigation";
import DeleteIcon from "@mui/icons-material/Delete";
type Note = {
  id: number;
  title: string;
  description: string;
  importance: "High" | "Medium" | "Low";
  authorId: number;
};

export const NotesPage: React.FC = () => {
  const { user } = useContext(UserContext);
  const [notes, setNotes] = useState<Note[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get<Note[]>("http://localhost:3001/notes");
        setNotes(response.data);
      } catch (error) {
        console.error("Failed to fetch notes", error);
      }
    };

    fetchNotes();
  }, []);

  const handleDeleteNote = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/notes/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Failed to delete note", error);
    }
  };

  const handleCreateNotes = () => {
    navigate("/home/create-notes");
  };

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon onClick={handleCreateNotes} />
        </Fab>
        <h2>Notes</h2>

        <Container sx={{ py: 0 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {notes.map((card, id) => (
              <Grid item key={id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.title}
                    </Typography>
                    <Typography>{card.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <Fab size="small" color="secondary" aria-label="edit">
                      <EditIcon />
                    </Fab>
                    <Fab
                      size="small"
                      color="secondary"
                      aria-label="edit"
                      onClick={() => handleDeleteNote(card.id)}
                    >
                      <DeleteIcon />
                    </Fab>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Container>
  );
};
