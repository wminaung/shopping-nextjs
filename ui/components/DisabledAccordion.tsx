import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { OrderWithOrderlines } from "@/pages/api/admin/orders";
import { useAdmin } from "@/src/store/slices/adminSlice";
import AdminProductCard from "./AdminProductCard";
import { Box, Grid } from "@mui/material";
import { Product } from "@prisma/client";

interface Props {
  row: OrderWithOrderlines;
}

export default function DisabledAccordion({ row }: Props) {
  const {
    state: { products },
  } = useAdmin();
  let q = 0;

  const getrowIds = row.orderlines.map((ol) => ol.productId);

  const showProducts = products.filter((p) => getrowIds.includes(p.id));

  row.orderlines.forEach((o) => {
    q += o.quantity;
  });

  const findQuantity = (p: Product) => {
    return row.orderlines.filter((o) => o.productId === p.id)[0].quantity;
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>
            orderID : {row.id}, total items : {q}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {showProducts.map((p, index) => (
              <Grid item xs={12} sm={12} md={12} lg={12} key={p.id}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <AdminProductCard product={p} />
                  <Typography fontSize={20}>
                    x {findQuantity(p)} = {p.price * findQuantity(p)}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion disabled>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Typography>Disabled Accordion</Typography>
        </AccordionSummary>
      </Accordion> */}
    </div>
  );
}
