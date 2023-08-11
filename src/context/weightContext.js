import React, { createContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const WeightContext = createContext();
const tableName = "Weight_Record";

const WeightProvider = ({ children, token }) => {
  const [data, setData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const supabase = createClient(
    token.user.user_metadata.database_url,
    token.user.user_metadata.api_key
  );

  useEffect(() => {
    const fetchData = async () => {
      const { data: machineData, error } = await supabase
        .from(tableName)
        .select();

      if (error) {
        console.error("Error fetching data:", error.message);
      } else {
        setData(machineData);
        setIsDataLoaded(true);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!isDataLoaded) return;

    const channelA = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
        },
        (payload) => {
          if (payload.table === tableName) {
            if (payload.new && payload.new.Title && payload.new.Reading) {
              setData((prevData) => {
                const updatedData = prevData.map((item) => {
                  if (item.id === payload.new.id) {
                    return payload.new;
                  }
                  return item;
                });
                return updatedData;
              });
            }
          }
        }
      )
      .subscribe();

    return () => {
      channelA.unsubscribe();
    };
  }, [isDataLoaded]);

  const getReadingsByTitles = (Title) => {
    const reading = data.find((item) => item.title === Title);
    return reading ? (reading.quantity, reading.machine_id, reading.created_at, reading.id) : null;
  };

  const weightRecordReadings = getReadingsByTitles("Wieght", [
    '5kg',
    '10kg',
    '15kg',
    '20kg',
    '26kg',
    '30kg',
    '50kg',
]);

  return (
    <WeightContext.Provider
      value={{
        weightRecordReadings
      }}
    >
      {children}
    </WeightContext.Provider>
  );
};

export { WeightContext, WeightProvider };
