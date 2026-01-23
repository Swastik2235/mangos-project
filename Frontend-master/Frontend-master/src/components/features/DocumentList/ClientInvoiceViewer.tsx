import { Box, Button, Typography, Paper, Divider, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const invoices = new Array(6).fill({
  invoiceNo: "554",
    gstin: "27AA4678YBZ",

  date: "15 Dec 22 12:30 PM",
  amount: "₹ 25,21,233",
  tax: "₹ 3,84,595",
  quantity: "30.25 MT",
  status: false,
});

const ClientInvoiceViewer = () => {
  return (
    <Box display="flex" height="100vh" p={2} gap={2} bgcolor="#f5f8fd">
      <Paper sx={{ width: "50%", p: 2, overflowY: "auto", borderRadius: 4, }}>
        <Typography variant="h6" gutterBottom>
          • Client 1: Project Name:
        </Typography>
        {invoices.map((inv, index) => (
          <Paper
            key={index}
            elevation={2}
            sx={{
              mb: 1.5,
              p: 2,
              borderRadius: 2,
              backgroundColor: "#ffffff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
          <Stack direction="row" spacing={1} alignItems="flex-start">
  {/* Left Side - Invoice Details */}
  <Box>
    <Typography variant="subtitle1" fontWeight="bold">
      Invoice No ~ {inv.invoiceNo}
    </Typography>
        <Typography variant="body2">GSTIN – {inv.gstin}</Typography>

   <Typography variant="body2" gutterBottom sx={{ fontSize: '14px' }}>
   {inv.date}
</Typography>

  </Box>

  {/* Vertical Divider */}
  <Divider orientation="vertical" flexItem sx={{  borderRightWidth: 1,        // Thicker line
      borderColor: 'black',       // Bold color
      height: 'auto',             // Let it auto-adjust or set a specific height if needed
      mx: 2 }} />

  {/* Right Side - Amount Summary */}
  <Box>
    <Typography variant="body2" mt={1}>
      <b>Total Amount :</b> {inv.amount}
    </Typography>
    <Typography variant="body2">
      Total Tax : {inv.tax}
    </Typography>
    <Typography variant="body2">
      Total Quantity : {inv.quantity}
    </Typography>
  </Box>


            <Box>
              <img
                src="\img1.png"
                alt="Invoice Preview Thumb"
                width={60}
                height={60}
                style={{ borderRadius: 8, objectFit: "cover" }}
              />
              <Box display="flex" justifyContent="center" mt={1}>
                {inv.status ? (
                  <CheckCircleIcon sx={{ color: "green", fontSize: 20 }} />
                ) : (
                  <CancelIcon sx={{ color: "red", fontSize: 20 }} />
                )}
              </Box>
            </Box>
            </Stack>
          </Paper>
        ))}
      </Paper>

      <Paper sx={{ flexGrow: 1, p: 2, borderRadius: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Tax Invoices</Typography>
          <Button variant="outlined" size="small">
            ✕
          </Button>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="75%"
        >
          <img
            src="\img1.png"
            alt="Invoice Preview"
            style={{ width: "100%", maxWidth: "600px", border: "1px solid #ccc", borderRadius: "8px" }}
          />
        </Box>

        <Box display="flex" gap={1} mt={2}>
          <input
            type="text"
            placeholder="Comment"
            style={{ flexGrow: 1, padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
          />
          <Button variant="contained">Submit</Button>
        </Box>
        <Box mt={1} display="flex" justifyContent="end" gap={2}>
          <Button size="small" variant="text">
            ✅ Done
          </Button>
          <Button size="small" variant="text">
            ✏️ Edit
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ClientInvoiceViewer;
