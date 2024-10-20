"use client";
import React, { useEffect, useState } from "react";
import { Incident, getIncidents } from "@/services/axios";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Divider,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [incidents, setIncidents] = useState<Incident[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const data = await getIncidents();
        setIncidents(data);
      } catch (error) {
        console.error("Error fetching incidents:", error);
      }
    };

    fetchIncidents();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    };
    return new Intl.DateTimeFormat("en-GB", options).format(
      new Date(dateString)
    );
  };

  return (
    <>
      <div className="px-8 pt-16">
        <HStack alignItems={"flex-end"} justifyContent="space-between">
          <h1 className="text-sm md:text-4xl font-bold">
            List Incident Reports
          </h1>
          <Link href={"/create-incident-report"}>
            <Button colorScheme="red">Create Incident Reports</Button>
          </Link>
        </HStack>
      </div>
      <Divider borderColor="gray.500" className="p-8" />
      <div className="px-8 pt-12">
        <TableContainer>
          <Table variant="striped" colorScheme="red" border="0.5px solid gray">
            <Thead>
              <Tr>
                <Th textAlign="center">No</Th>
                <Th textAlign="center">Root Cause</Th>
                <Th textAlign="center">Report Month</Th>
                <Th textAlign="center">Report Quarter</Th>
                <Th textAlign="center">Incident Date</Th>
                <Th textAlign="center">Found Date</Th>
                <Th textAlign="center">Amount</Th>
                <Th textAlign="center">Detail</Th>
              </Tr>
            </Thead>
            <Tbody>
              {incidents && incidents.length > 0 ? (
                incidents.map((incident, index) => (
                  <Tr key={incident.id}>
                    <Td textAlign="center">{index + 1}</Td>
                    <Td textAlign="center">{incident.root_cause}</Td>
                    <Td textAlign="center">{incident.report_month}</Td>
                    <Td textAlign="center">{incident.report_quarter}</Td>
                    <Td textAlign="center">
                      {formatDate(incident.incident_date)}
                    </Td>
                    <Td textAlign="center">
                      {formatDate(incident.found_date)}
                    </Td>
                    <Td textAlign="center">{incident.amount.toFixed(2)}</Td>
                    <Td textAlign="center">
                      <Link href={`/incident/${incident.id}`}>
                        <Button colorScheme="teal">Detail</Button>
                      </Link>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={8} textAlign="center">
                    No incident data available, please add an incident first.
                  </Td>
                </Tr>
              )}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th colSpan={7} textAlign="center">
                  Vesperia Internship Test - Fadhail Athaillah Bima
                </Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
