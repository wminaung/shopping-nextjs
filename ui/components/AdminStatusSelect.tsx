import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useAdmin } from "@/src/store/slices/adminSlice";
import { OrderWithOrderlines } from "@/pages/api/admin/orders";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Status } from "@prisma/client";
import { useEffect, useState } from "react";

interface Props {
  row: OrderWithOrderlines;
}

const AdminStatusSelect = ({ row }: Props) => {
  const [currentStatus, setCurrentStatus] = useState<Status>(Status.PENDING);

  useEffect(() => {
    setCurrentStatus(row.status);
  }, [row]);
  const handleChange = (event: SelectChangeEvent) => {
    setCurrentStatus(event.target.value as Status);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label"></InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={currentStatus}
        onChange={handleChange}
      >
        <MenuItem value={Status.PENDING}>PENDING</MenuItem>
        <MenuItem value={Status.FAIL}>FAIL</MenuItem>
        <MenuItem value={Status.SUCCESS}>SUCCESS</MenuItem>
      </Select>
    </FormControl>
  );
};

export default AdminStatusSelect;
