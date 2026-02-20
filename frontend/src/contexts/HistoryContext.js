import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useAuth } from "./AuthContext";
import supabase from "../lib/supabaseClient";

const HistoryContext = createContext();

export const useHistory = () => {
  const ctx = useContext(HistoryContext);
  if (!ctx) throw new Error("useHistory must be used within HistoryProvider");
  return ctx;
};

const DOT_COLORS = [
  "#8ab4f8",
  "#81c995",
  "#c58af9",
  "#fdd663",
  "#78d9ec",
  "#f28b82",
];

const makeId = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2);

const toDateStr = (iso) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

// Upsert the Google user into the users table
const upsertUser = async (user) => {
  await supabase
    .from("users")
    .upsert(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        picture: user.picture,
      },
      { onConflict: "id" },
    );
};

export const HistoryProvider = ({ children }) => {
  const { user } = useAuth();

  const [analyses, setAnalyses] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [dbReady, setDbReady] = useState(false);

  // ── Fetch from Supabase whenever user changes ────────────────────────────
  useEffect(() => {
    if (!user) {
      setAnalyses([]);
      setDocuments([]);
      setDbReady(false);
      return;
    }

    const init = async () => {
      await upsertUser(user);

      const { data: aData } = await supabase
        .from("analyses")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      const { data: dData } = await supabase
        .from("documents")
        .select("*")
        .eq("user_id", user.id)
        .order("uploaded_at", { ascending: false });

      setAnalyses(
        (aData || []).map((a) => ({
          id: a.id,
          title: a.title,
          paperName: a.paper_name,
          type: a.type,
          response: a.response,
          sources: a.sources,
          gapsFound: a.gaps_found,
          domain: a.domain,
          dotColor: a.dot_color,
          date: toDateStr(a.created_at),
        })),
      );

      setDocuments(
        (dData || []).map((d) => ({
          id: d.id,
          name: d.name,
          ext: d.ext,
          size: d.size,
          analyses: d.analyses_count,
          uploaded: toDateStr(d.uploaded_at),
        })),
      );

      setDbReady(true);
    };

    init();
  }, [user]);

  // ── addAnalysis ──────────────────────────────────────────────────────────
  const addAnalysis = useCallback(
    async (analysis, docInfo) => {
      if (!user) return;

      const id = makeId();
      const dotColor =
        DOT_COLORS[Math.floor(Math.random() * DOT_COLORS.length)];
      const dateStr = toDateStr(new Date().toISOString());

      // Optimistic UI update
      setAnalyses((prev) => [
        { id, dotColor, date: dateStr, ...analysis },
        ...prev,
      ]);

      // Persist to Supabase
      await supabase.from("analyses").insert({
        id,
        user_id: user.id,
        title: analysis.title,
        paper_name: analysis.paperName,
        type: analysis.type,
        response: analysis.response,
        sources: analysis.sources,
        gaps_found: analysis.gapsFound,
        domain: analysis.domain,
        dot_color: dotColor,
      });

      // Document upsert
      if (docInfo) {
        const { data: existing } = await supabase
          .from("documents")
          .select("id, analyses_count")
          .eq("user_id", user.id)
          .eq("name", docInfo.name)
          .limit(1);

        if (existing && existing.length > 0) {
          const doc = existing[0];
          const newCount = doc.analyses_count + 1;
          await supabase
            .from("documents")
            .update({ analyses_count: newCount })
            .eq("id", doc.id);
          setDocuments((prev) =>
            prev.map((d) =>
              d.id === doc.id ? { ...d, analyses: newCount } : d,
            ),
          );
        } else {
          const docId = makeId();
          await supabase.from("documents").insert({
            id: docId,
            user_id: user.id,
            name: docInfo.name,
            ext: docInfo.ext,
            size: docInfo.size,
            analyses_count: 1,
          });
          setDocuments((prev) => [
            { id: docId, ...docInfo, analyses: 1, uploaded: dateStr },
            ...prev,
          ]);
        }
      }
    },
    [user],
  );

  // ── removeAnalysis ───────────────────────────────────────────────────────
  const removeAnalysis = useCallback(async (id) => {
    setAnalyses((prev) => prev.filter((a) => a.id !== id));
    await supabase.from("analyses").delete().eq("id", id);
  }, []);

  // ── removeDocument ───────────────────────────────────────────────────────
  const removeDocument = useCallback(async (id) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
    await supabase.from("documents").delete().eq("id", id);
  }, []);

  // Last 5 for sidebar Recent
  const recentItems = analyses.slice(0, 5).map((a) => ({
    text: a.paperName,
    color: a.dotColor,
  }));

  return (
    <HistoryContext.Provider
      value={{
        analyses,
        documents,
        addAnalysis,
        removeAnalysis,
        removeDocument,
        recentItems,
        dbReady,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};
