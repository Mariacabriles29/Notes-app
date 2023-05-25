import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { UserContext } from "../../auth/AuthContext";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Modal,
  Box,
  Container,
  CssBaseline,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";

interface UpdateNotesProps {
  open: boolean;
  handleClose: any;
  noteId: any;
}

export const UpdateNotes = (props: UpdateNotesProps) => {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [importance, setImportance] = useState<"High" | "Medium" | "Low">(
    "Low"
  );

  useEffect(() => {
    const fetchNote = async (id: any) => {
      //  event.preventDefault();
      if (id !== 0) {
        try {
          const response = await axios.get(`http://localhost:3001/notes/${id}`);
          const note = response.data;
          setTitle(note.title);
          setDescription(note.description);
          setImportance(note.importance);
          setAuthorId(note.authorId);
        } catch (error) {
          console.error("Failed to fetch note", error);
        }
      }
    };

    fetchNote(props.noteId);
  }, [props]);

  const handleUpdateNote = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (authorId === user?.id) {
        const response = await axios.put(
          `http://localhost:3001/notes/${props.noteId}`,
          {
            title,
            description,
            importance,
            authorId: user?.id,
          }
        );

        if (response) {
          toast.success("Nota actualizada", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error("Nota no actualizada", {
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
      } else {
        toast.error("Tu no tienes permisos para actualizar esta nota", {
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
      console.error("Failed to update note", error);
    }
  };
  console.log("props.open ", props.open);
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{ marginTop: 8, backgroundColor: "white", padding: "16px" }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Edit Note
          </Typography>
          <Box
            component="form"
            onSubmit={handleUpdateNote}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              name="title"
              autoComplete="title"
              label="title"
              value={title}
              onChange={(e: any) => setTitle(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="description"
              label="description"
              type="description"
              id="description"
              value={description}
              onChange={(e: any) => setDescription(e.target.value)}
              autoComplete="current-password"
            />

            <FormControl fullWidth margin="normal" required>
              <InputLabel>Status</InputLabel>
              <Select
                value={importance}
                onChange={(e: any) => setImportance(e.target.value as any)}
              >
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Container>
    </Modal>
  );
};
