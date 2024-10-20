import axios from "axios";

export type Division = {
  id: number;
  division_name: string;
};

export type IncidentDivision = {
  id: number;
  incidentId: number;
  divisionId: number;
  created_at: string;
  updated_at: string;
  division_name: string;
};

export type FileIncident = {
  id: number;
  file_description: string;
  file: string;
  incidentId: number;
  created_at: string;
  updated_at: string;
};

export type Incident = {
  id: number;
  report_month: string;
  report_quarter: string;
  incident_date: string;
  found_date: string;
  incident_description: string;
  root_cause: string;
  amount: number;
};

export const getIncidents = async (): Promise<Incident[]> => {
  try {
    const response = await axios.get("http://localhost:8000/api/incident");

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(`Terjadi kesalahan dalam mendapatkan data incident`);
  }
};

export const getDivisions = async (): Promise<Division[]> => {
  try {
    const response = await axios.get("http://localhost:8000/api/divisi");

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(`Terjadi kesalahan dalam mendapatkan data incident`);
  }
};

export type NewIncident = {
  root_cause: string;
  report_month: string;
  report_quarter: string;
  incident_date: string;
  found_date: string;
  incident_description: string;
  division_id: string[];
  file_description: string;
  amount: number;
  file: File | null;
};

export const addIncident = async (newEvent: NewIncident): Promise<Incident> => {
  try {
    const formData = new FormData();
    formData.append("root_cause", newEvent.root_cause);
    formData.append("report_month", newEvent.report_month);
    formData.append("report_quarter", newEvent.report_quarter);
    formData.append("incident_date", newEvent.incident_date);
    formData.append("found_date", newEvent.found_date);
    formData.append("amount", newEvent.amount.toString());
    formData.append("incident_description", newEvent.incident_description);
    newEvent.division_id.forEach((id) => formData.append("division_ids[]", id));
    formData.append("file_description", newEvent.file_description);
    if (newEvent.file) {
      formData.append("file", newEvent.file);
    }

    const response = await axios.post(
      "http://localhost:8000/api/store",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(`Terjadi kesalahan dalam menambahkan incident`);
  }
};

export type IncidentDetailResponse = {
  incident: Incident;
  incidentDivision: IncidentDivision[];
  fileIncident: FileIncident;
};

export const getIncidentDetail = async (
  id: number
): Promise<IncidentDetailResponse> => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/incident-detail/${id}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(`Terjadi kesalahan dalam mendapatkan detail incident`);
  }
};
