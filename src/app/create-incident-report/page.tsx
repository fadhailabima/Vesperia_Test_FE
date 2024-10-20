"use client";
import React, { useEffect, useState } from "react";
import {
  Division,
  NewIncident,
  addIncident,
  getDivisions,
} from "@/services/axios";
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

export default function CreateIncident() {
  const [divisions, setDivisions] = useState<Division[] | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [newIncident, setNewIncident] = useState<NewIncident>({
    root_cause: "",
    report_month: "",
    report_quarter: "",
    incident_date: "",
    found_date: "",
    incident_description: "",
    division_id: [],
    file_description: "",
    amount: 0,
    file: null,
  });
  const router = useRouter();

  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const data = await getDivisions();
        setDivisions(data);
      } catch (error) {
        console.error("Error fetching divisions:", error);
      }
    };

    fetchDivisions();
  }, []);

  const handleCheckboxChange = (values: string[]) => {
    setNewIncident((prev) => ({
      ...prev,
      division_id: values,
    }));
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setNewIncident((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
      setNewIncident((prev) => ({
        ...prev,
        file: file,
      }));
    } else {
      setSelectedFileName(null);
      setNewIncident((prev) => ({
        ...prev,
        file: null,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addIncident(newIncident);
      router.push("/");
    } catch (error) {
      console.error("Error adding incident:", error);
    }
  };

  return (
    <>
      <div className="px-8 pt-16">
        <HStack alignItems={"flex-end"} justifyContent="space-between">
          <h1 className="text-sm md:text-4xl font-bold">
            Create Incident Report
          </h1>
          <Link href={"/"}>
            <Button colorScheme="red">Back</Button>
          </Link>
        </HStack>
      </div>
      <div className="px-8 pt-12">
        <Stack spacing={8}>
          <form onSubmit={handleSubmit}>
            <FormControl mb={6}>
              <FormLabel mb={2}>Root Cause</FormLabel>
              <Input
                name="root_cause"
                value={newIncident.root_cause}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl mb={6}>
              <FormLabel mb={2}>Report Month</FormLabel>
              <RadioGroup
                name="report_month"
                value={newIncident.report_month}
                onChange={(value) =>
                  setNewIncident((prev) => ({
                    ...prev,
                    report_month: value,
                  }))
                }
              >
                <Stack direction="row" wrap="wrap" spacing={4}>
                  {[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ].map((month) => (
                    <Radio key={month} value={month}>
                      {month}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </FormControl>

            <FormControl mb={6}>
              <FormLabel mb={2}>Report Quarter</FormLabel>
              <RadioGroup
                name="report_quarter"
                value={newIncident.report_quarter}
                onChange={(value) =>
                  setNewIncident((prev) => ({
                    ...prev,
                    report_quarter: value,
                  }))
                }
              >
                <Stack direction="row" spacing={4}>
                  {["Q1", "Q2", "Q3", "Q4"].map((quarter) => (
                    <Radio key={quarter} value={quarter}>
                      {quarter}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </FormControl>

            <FormControl mb={6}>
              <FormLabel mb={2}>Incident Date</FormLabel>
              <Input
                type="date"
                name="incident_date"
                value={newIncident.incident_date}
                onChange={(e) =>
                  setNewIncident((prev) => ({
                    ...prev,
                    incident_date: e.target.value,
                  }))
                }
              />
            </FormControl>

            <FormControl mb={6}>
              <FormLabel mb={2}>Found Date</FormLabel>
              <Input
                type="date"
                name="found_date"
                value={newIncident.found_date}
                onChange={(e) =>
                  setNewIncident((prev) => ({
                    ...prev,
                    found_date: e.target.value,
                  }))
                }
              />
            </FormControl>

            <FormControl mb={6}>
              <FormLabel mb={2}>Incident Description</FormLabel>
              <Textarea
                name="incident_description"
                value={newIncident.incident_description}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl mb={6}>
              <FormLabel mb={2}>Choose Affected Division</FormLabel>
              <CheckboxGroup
                value={newIncident.division_id}
                onChange={handleCheckboxChange}
              >
                <Stack direction="row" spacing={4} wrap="wrap">
                  {divisions?.map((division) => (
                    <Checkbox key={division.id} value={division.id.toString()}>
                      {division.division_name}
                    </Checkbox>
                  ))}
                </Stack>
              </CheckboxGroup>
            </FormControl>

            <FormControl mb={6}>
              <FormLabel mb={2}>Amount</FormLabel>
              <Input
                type="number"
                name="amount"
                value={newIncident.amount}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl mb={6}>
              <FormLabel mb={2}>
                Upload File{" "}
                <Text as="span" color="gray.500">
                  (Optional)
                </Text>
              </FormLabel>
              <Box
                border="1px"
                borderColor="gray.300"
                borderRadius="md"
                p={4}
                display="flex"
                alignItems="center"
              >
                <Input
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                  display="none"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button as="span" colorScheme="blue" mr={4}>
                    Choose File
                  </Button>
                </label>
                <Text fontSize="sm" color="gray.500">
                  {selectedFileName || "No file chosen"}
                </Text>
              </Box>
            </FormControl>

            <FormControl mb={6}>
              <FormLabel mb={2}>
                File Description{" "}
                <Text as="span" color="gray.500">
                  (Optional)
                </Text>
              </FormLabel>
              <Input
                name="file_description"
                value={newIncident.file_description}
                onChange={handleChange}
              />
            </FormControl>

            <Button type="submit" colorScheme="blue" mt={4}>
              Submit
            </Button>
          </form>
        </Stack>
      </div>
    </>
  );
}
