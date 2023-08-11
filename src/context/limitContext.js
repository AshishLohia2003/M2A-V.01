import React, { createContext, useEffect, useState } from "react";
// import supabase from '../supabase';
import { createClient } from "@supabase/supabase-js";

const LimitContext = createContext();
const tableName = "Limits";

const LimitProvider = ({ children, token }) => {
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

  const getReadingByTitle = (Title) => {
    const reading = data.find((item) => item.Title === Title);
    return reading ? reading.Reading : null;
  };

  const voltageLimit = parseInt(getReadingByTitle("Voltage"));
  const temperatureLimit = parseInt(getReadingByTitle("Temperature"));
  const moistureLimit = parseInt(getReadingByTitle("Moisture"));
  const currentLimit = parseInt(getReadingByTitle("Current"));
  const frequencyLimit = parseInt(getReadingByTitle("Frequency"));
  const oeeLimit = parseInt(getReadingByTitle("OEE"));
  const performanceLimit = parseInt(getReadingByTitle("Performance"));
  const powerLimit = parseInt(getReadingByTitle("Power"));
  const rejectionLimit = parseInt(getReadingByTitle("Rejection"));

  return (
    <LimitContext.Provider
      value={{
        voltageLimit,
        temperatureLimit,
        moistureLimit,
        currentLimit,
        frequencyLimit,
        oeeLimit,
        performanceLimit,
        powerLimit,
        rejectionLimit,
      }}
    >
      {children}
    </LimitContext.Provider>
  );
};

export { LimitContext, LimitProvider };
