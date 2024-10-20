"use client";
import React, { useEffect, useState } from "react";
import { IncidentDetailResponse, getIncidentDetail } from "@/services/axios";
import {
  Button,
  HStack,
  Input,
  Stack,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Checkbox,
  CheckboxGroup,
  Textarea,
  Box,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function IncidentDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  const [incident, setIncident] = useState<IncidentDetailResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchIncidentDetail = async (id: string) => {
    try {
      setLoading(true);
      const incidentDetail = await getIncidentDetail(Number(id));
      setIncident(incidentDetail);
    } catch (error) {
      console.error("Error fetching incident detail:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidentDetail(id);
  }, [id]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
    return `${day}-${month}-${year}`;
  };

  const fileUrl = incident?.fileIncident?.file || null;
  const fileDescription = incident?.fileIncident?.file_description || null;

  const isImage = (url: string) => {
    return /\.(jpg|jpeg|png|gif)$/i.test(url);
  };

  const isPDF = (url: string) => {
    return /\.pdf$/i.test(url);
  };

  return (
    <>
      <div className="px-8 pt-16">
        <HStack alignItems={"flex-end"} justifyContent="space-between">
          <h1 className="text-sm md:text-4xl font-bold">Incident Detail</h1>
          <Link href={"/"}>
            <Button colorScheme="red">Back</Button>
          </Link>
        </HStack>
      </div>
      <div className="px-8 pt-12">
        <Stack spacing={4}>
          <FormControl mb={4}>
            <FormLabel mb={2}>Root Cause</FormLabel>
            <Input value={incident?.incident.root_cause} readOnly />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel mb={2}>Report Month</FormLabel>
            <Input value={incident?.incident.report_month} readOnly />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel mb={2}>Report Quarter</FormLabel>
            <Input value={incident?.incident.report_quarter} readOnly />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel mb={2}>Incident Date</FormLabel>
            <Input
              value={
                incident ? formatDate(incident.incident.incident_date) : ""
              }
              readOnly
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel mb={2}>Found Date</FormLabel>
            <Input
              value={incident ? formatDate(incident.incident.found_date) : ""}
              readOnly
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel mb={2}>Incident Description</FormLabel>
            <Textarea
              name="incident_description"
              value={incident?.incident.incident_description}
              readOnly
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel mb={2}>Affected Division</FormLabel>
            {incident?.incidentDivision.map((division) => (
              <Box key={division.id} mb={2}>
                <Input value={`${division.division_name}`} readOnly />
              </Box>
            ))}
          </FormControl>

          <FormControl mb={4}>
            <FormLabel mb={2}>Amount</FormLabel>
            <Input
              type="number"
              name="amount"
              value={incident?.incident.amount}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel mb={2}>Proof of File</FormLabel>
            <Input
              name="file_description"
              value={fileDescription || "No proof of file existed"}
              readOnly
            />

            {fileUrl ? (
              <Box mt={4}>
                {isImage(fileUrl) ? (
                  <Box>
                    <img
                      src={fileUrl}
                      alt={fileDescription || "File"}
                      style={{ maxWidth: "300px", maxHeight: "300px" }}
                    />
                    <Box mt={2}>
                      <Button
                        as="a"
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        colorScheme="blue"
                      >
                        Download File
                      </Button>
                    </Box>
                  </Box>
                ) : isPDF(fileUrl) ? (
                  <Box>
                    <iframe
                      src={fileUrl}
                      style={{ width: "300px", height: "400px" }}
                      title="PDF File"
                    ></iframe>
                  </Box>
                ) : null}
              </Box>
            ) : null}
          </FormControl>
        </Stack>
      </div>
    </>
  );
}
