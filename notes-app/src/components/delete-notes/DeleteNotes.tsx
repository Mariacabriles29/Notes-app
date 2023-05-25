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

interface DeleteNotesProps {
  open: boolean;
  handleClose: any;
  noteId: any;
}

export const DeleteNotes = (props: DeleteNotesProps) => {
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

  const handleDelete = async (event: React.FormEvent<HTMLFormElement>) => {
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
    <div>
      <Modal open={props.open} onClose={props.handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxWidth: 400,
            outline: "none",
            textAlign: "center",
          }}
          //   onSubmit={handleDelete}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Confirmar la eliminación{" "}
          </Typography>
          <Typography variant="body1" gutterBottom>
            ¿Estás seguro de que quieres eliminar la nota?
          </Typography>
          <Button variant="contained" color="primary">
            Si
          </Button>
          <Button variant="contained" color="secondary">
            No
          </Button>
        </Box>
      </Modal>
    </div>
  );
};
