import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";

const HistoryContext = createContext();

export const useHistory = () => {
  const ctx = useContext(HistoryContext);
  if (!ctx) throw new Error("useHistory must be used within HistoryProvider");
  return ctx;
};

const DOT_COLORS = ["#8ab4f8", "#81c995", "#c58af9", "#fdd663", "#78d9ec", "#f28b82"];

const makeId = () => Date.now().toString(36) + Math.random().toString(36).slice(2);

const formatDate = () =>
  new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export const HistoryProvider = ({ children }) => {
  const { user } = useAuth();
  const storageKey = user ? `rpa_history_${user.id}` : null;

  const [analyses, setAnalyses] = useState([]);
  const [documents, setDocuments] = useState([]);

  // Load from localStorage whenever the logged-in user changes
  useEffect(() => {
    if (!storageKey) {
      setAnalyses([]);
      setDocuments([]);
      return;
    }
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const { analyses: a = [], documents: d = [] } = JSON.parse(saved);
        setAnalyses(a);
        setDocuments(d);
      } else {
        setAnalyses([]);
        setDocuments([]);
      }
    } catch {
      setAnalyses([]);
      setDocuments([]);
    }
  }, [storageKey]);

  // Persist on every change
  useEffect(() => {
    if (!storageKey) return;
    localStorage.setItem(storageKey, JSON.stringify({ analyses, documents }));
  }, [analyses, documents, storageKey]);

  /**
   * addAnalysis({ title, paperName, type, response, sources, sessionId, gapsFound, domain }, docInfo)
   * docInfo: { name, ext, size } — optional
   */
  const addAnalysis = useCallback((analysis, docInfo) => {
    const id = makeId();
    const dotColor = DOT_COLORS[Math.floor(Math.random() * DOT_COLORS.length)];
    const date = formatDate();

    const entry = { id, dotColor, date, ...analysis };
    setAnalyses((prev) => [entry, ...prev]);

    if (docInfo) {
      setDocuments((prev) => {
        const existingIdx = prev.findIndex((d) => d.name === docInfo.name);
        if (existingIdx >= 0) {
          // Increment analyses count for that doc
          const updated = [...prev];
          updated[existingIdx] = {
            ...updated[existingIdx],
            analyses: updated[existingIdx].analyses + 1,
          };
          return updated;
        }
        return [{ id: makeId(), ...docInfo, uploaded: date, analyses: 1 }, ...prev];
      });
    }
  }, []);

  const removeAnalysis = useCallback((id) => {
    setAnalyses((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const removeDocument = useCallback((id) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  }, []);

  // Last 5 analyses shown in sidebar Recent section
  const recentItems = analyses.slice(0, 5).map((a) => ({
    text: a.paperName,
    color: a.dotColor,
  }));

  return (
    <HistoryContext.Provider
      value={{ analyses, documents, addAnalysis, removeAnalysis, removeDocument, recentItems }}
    >
      {children}
    </HistoryContext.Provider>
  );
};
