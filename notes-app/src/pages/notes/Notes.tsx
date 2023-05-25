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
  InputBase,
  Badge,
} from "@mui/material";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { UpdateNotes } from "../../components/update-notes/UpdateNotes";
import { toast } from "react-toastify";
import { styled, alpha } from "@mui/material/styles";

import SearchIcon from "@mui/icons-material/Search";

type Note = {
  id: number;
  title: string;
  description: string;
  importance: "High" | "Medium" | "Low";
  authorId: number;
};

type User = {
  id: number;
  username: string;
  password: string;
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export const NotesPage: React.FC = () => {
  const { user } = useContext(UserContext);
  const [notes, setNotes] = useState<Note[]>([]);
  const [listUsers, setListUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [noteId, setNoteId] = useState(0);
  const handleOpen = (id: number) => {
    setNoteId(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get<Note[]>("http://localhost:3001/notes");
        setNotes(response.data);
      } catch (error) {
        console.error("Failed to fetch notes", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>("http://localhost:3001/users");
        setListUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch notes", error);
      }
    };

    fetchNotes();
    fetchUsers();
  }, []);

  const handleDeleteNote = async (card: any) => {
    try {
      console.log("card ", card);
      if (card.authorId === user?.id) {
        const response = await axios.delete(
          `http://localhost:3001/notes/${card.id}`
        );
        if (response.status === 200) {
          toast.success("Nota borrada", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setNotes((prevNotes) =>
            prevNotes.filter((note) => note.id !== card.id)
          );
        }
      } else {
        toast.error("Tu no tienes permisos para borrar esta nota", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Failed to delete note", error);
    }
  };

  const getNameUser = (id: number) => {
    const currentUser = listUsers.find((u) => u.id === id);
    if (currentUser) {
      return currentUser.username;
    } else {
      return "desconocido";
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
        <Card
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            padding: "8px",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <Search onChange={(e: any) => console.log("e ", e.target.value)}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Fab color="primary" aria-label="add">
            <AddIcon onClick={handleCreateNotes} />
          </Fab>
        </Card>
        <h2>Notas</h2>

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
                    <Container
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingLeft: 0,
                      }}
                    >
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.title}
                      </Typography>
                      <Badge
                        badgeContent={card.importance}
                        color={
                          card.importance.toLowerCase() === "High".toLowerCase()
                            ? "error"
                            : card.importance.toLowerCase() ===
                              "Medium".toLowerCase()
                            ? "warning"
                            : "primary"
                        }
                      >
                        <Typography fontSize="xl">🔔</Typography>
                      </Badge>
                    </Container>

                    <Typography>{card.description}</Typography>
                    <Typography fontSize={12} fontWeight={600}>
                      autor: {getNameUser(card.authorId)}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Fab
                      size="small"
                      color="secondary"
                      aria-label="edit"
                      onClick={() => {
                        handleOpen(card.id);
                      }}
                    >
                      <EditIcon />
                    </Fab>
                    <Fab
                      size="small"
                      color="secondary"
                      aria-label="edit"
                      onClick={() => handleDeleteNote(card)}
                    >
                      <DeleteIcon />
                    </Fab>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>{" "}
      <UpdateNotes open={open} handleClose={handleClose} noteId={noteId} />
    </Container>
  );
};
