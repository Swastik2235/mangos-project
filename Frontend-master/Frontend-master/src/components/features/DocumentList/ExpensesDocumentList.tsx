import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { Download, FileEdit, Circle } from "lucide-react";
import ClientInvoiceViewer from "./ClientInvoiceViewer";



type DocumentStatus = "done" | "edit" | "not_audited";

interface StatusIconProps {
  status: DocumentStatus;
  value?: string;
}

const StatusIcon: React.FC<StatusIconProps> = ({ status, value }) => {
  const color = status === "done" ? "green" : status === "edit" ? "red" : "gray";
  const Icon = status === "done" ? Circle : status === "edit" ? FileEdit : Download;

  return (
    <Box display="flex" alignItems="center" color={color}>
      <Icon size={12} />
      {value && <Typography variant="caption" ml={1}>{value}</Typography>}
    </Box>
  );
};

interface Document {
  srNo: number;
  clientName: string;
  gstin?: string;
  balance?: string;
  amount?: string;
  dates: {
    [key: number]: {
      status: DocumentStatus;
      value?: string;
    };
  };
  others?: {
    status: DocumentStatus;
    value?: string;
  };
}

const documents: Document[] = [
  {
    srNo: 1,
    clientName: "Client 1",
    dates: {
      1: { status: "not_audited" },
      2: { status: "edit", value: "2/7" },
      3: { status: "edit", value: "2/7" },
      4: { status: "edit", value: "3/8" },
      5: { status: "edit", value: "4/7" },
      6: { status: "edit", value: "5/7" },
      7: { status: "edit", value: "6/7" },
    },
    others: { status: "done", value: "7" },
  },
  {
    srNo: 2,
    clientName: "Client 2",
    dates: {
      1: { status: "not_audited" },
      2: { status: "edit", value: "2/7" },
      3: { status: "edit", value: "2/7" },
      4: { status: "edit", value: "3/8" },
      5: { status: "edit", value: "4/7" },
      6: { status: "edit", value: "5/7" },
      7: { status: "edit", value: "6/7" },
    },
    others: { status: "done", value: "7" },
  },
  {
    srNo: 3,
    clientName: "Client 3",
    dates: {
      1: { status: "not_audited" },
      2: { status: "edit", value: "2/7" },
      3: { status: "edit", value: "2/7" },
      4: { status: "edit", value: "3/8" },
      5: { status: "edit", value: "4/7" },
      6: { status: "edit", value: "5/7" },
      7: { status: "edit", value: "6/7" },
    },
    others: { status: "done", value: "7" },
  },
  {
    srNo: 4,
    clientName: "Client 4",
    dates: {
      1: { status: "not_audited" },
      2: { status: "edit", value: "2/7" },
      3: { status: "edit", value: "2/7" },
      4: { status: "edit", value: "3/8" },
      5: { status: "edit", value: "4/7" },
      6: { status: "edit", value: "5/7" },
      7: { status: "edit", value: "6/7" },
    },
    others: { status: "done", value: "7" },
  },
  {
    srNo: 5,
    clientName: "Client 5",
    dates: {
      1: { status: "not_audited" },
      2: { status: "edit", value: "2/7" },
      3: { status: "edit", value: "2/7" },
      4: { status: "edit", value: "3/8" },
      5: { status: "edit", value: "4/7" },
      6: { status: "edit", value: "5/7" },
      7: { status: "edit", value: "6/7" },
    },
    others: { status: "done", value: "7" },
  },
  {
    srNo: 6,
    clientName: "Client 6",
    dates: {
      1: { status: "not_audited" },
      2: { status: "edit", value: "2/7" },
      3: { status: "edit", value: "2/7" },
      4: { status: "edit", value: "3/8" },
      5: { status: "edit", value: "4/7" },
      6: { status: "edit", value: "5/7" },
      7: { status: "edit", value: "6/7" },
    },
    others: { status: "done", value: "7" },
  },
];
const DocumentList: React.FC = () => {
  const [selectedClient, setSelectedClient] = useState<string | null>(null);

  const handleClientClick = (clientName: string) => {
    setSelectedClient(clientName);
  };

  const handleBack = () => {
    setSelectedClient(null);
  };

  if (selectedClient) {
    return (
     <Box p={2}>
      <Button variant="outlined" onClick={handleBack} sx={{ mb: 2 }}>
        Back to List
      </Button>
      {selectedClient === "Client 1" ? (
        <ClientInvoiceViewer />
      ) : (
        <>
          <Typography variant="h6" gutterBottom>
            Tax Invoice - {selectedClient}
          </Typography>
          <img
            src="/img1.png"
            alt="Invoice"
            style={{ width: "100%", maxWidth: 800, border: "1px solid #ccc" }}
          />
        </>
      )}
    </Box>
  );
};

  return (
    <TableContainer component={Paper} sx={{ bgcolor: '#E7EBF0' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Sr. No</TableCell>
            <TableCell>Client Name</TableCell>
            <TableCell>GSTIN No</TableCell>
            <TableCell>Balance</TableCell>
            <TableCell>Amount</TableCell>
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <TableCell key={day} align="center">{day}</TableCell>
            ))}
            <TableCell align="center">Others</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {documents.map((doc) => (
            <TableRow
              key={doc.srNo}
              hover
              sx={{ cursor: 'pointer' }}
              onClick={() => handleClientClick(doc.clientName)}
            >
              <TableCell>{doc.srNo}</TableCell>
              <TableCell>{doc.clientName}</TableCell>
              <TableCell>{doc.gstin || "-"}</TableCell>
              <TableCell>{doc.balance || "-"}</TableCell>
              <TableCell>{doc.amount || "-"}</TableCell>
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <TableCell key={day} align="center">
                  {doc.dates[day] && (
                    <StatusIcon
                      status={doc.dates[day].status}
                      value={doc.dates[day].value}
                    />
                  )}
                </TableCell>
              ))}
              <TableCell align="center">
                {doc.others && (
                  <StatusIcon
                    status={doc.others.status}
                    value={doc.others.value}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DocumentList;