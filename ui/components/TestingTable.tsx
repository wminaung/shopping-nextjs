import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const TEstingTable = () => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Header 1</TableCell>
            <TableCell>Header 2</TableCell>
            <TableCell>Header 3</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Row 1 Data 1</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Additional information for row 1.</Typography>
                </AccordionDetails>
              </Accordion>
            </TableCell>
            <TableCell>Row 1 Data 2</TableCell>
            <TableCell>Row 1 Data 3</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Row 2 Data 1</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Additional information for row 2.</Typography>
                </AccordionDetails>
              </Accordion>
            </TableCell>
            <TableCell>Row 2 Data 2</TableCell>
            <TableCell>Row 2 Data 3</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TEstingTable;
