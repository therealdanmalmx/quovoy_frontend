"use client";
import { API } from "@/api";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  FC,
} from "react";

export interface Lead {
  _id: string;
  name: string;
  email: string;
  status: string;
  createdAt: string;
}

interface LeadProviderProps {
  children: ReactNode;
}

interface LeadContextType {
  leads: Lead[];
  isLoading: boolean;
  error: string | null;
  createLead: (lead: Omit<Lead, "_id" | "createdAt">) => Promise<void>;
  fetchLeads: () => Promise<void>;
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

export const LeadProvider: FC<LeadProviderProps> = ({ children }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Example API base URL - replace with your actual API
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const fetchLeads = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await API.get("/");
      if (!response.data) {
        throw new Error("Failed to fetch leads");
      }

      const mappedLeads = response.data.map((lead: Lead) => ({
        _id: lead._id,
        name: lead.name,
        email: lead.email,
        status: lead.status,
        createdAt: lead.createdAt,
      }));

      setLeads(mappedLeads);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      console.error("Error fetching leads:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const createLead = async (leadData: Omit<Lead, "_id" | "createdAt">) => {
    setIsLoading(true);
    setError(null);
    try {
      // Replace with actual API call
      const response = await API("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: leadData,
      });

      if (!response.data) {
        throw new Error("Failed to create lead");
      }

      const newLead = await response.data;
      setLeads((prevLeads) => [...prevLeads, newLead]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      console.error("Error creating lead:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const value = {
    leads,
    isLoading,
    error,
    createLead,
    fetchLeads,
  };

  return <LeadContext.Provider value={value}>{children}</LeadContext.Provider>;
};

export const useLeads = () => {
  const context = useContext(LeadContext);
  if (context === undefined) {
    throw new Error("useLeads must be used within a LeadProvider");
  }
  return context;
};
