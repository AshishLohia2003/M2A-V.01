    import React, { createContext, useEffect, useState, useMemo } from 'react';
    // import supabase from '../supabase';
    import { createClient } from '@supabase/supabase-js';


    const SupabaseContext = createContext();
    const tableNames = ['Machine_1', 'Machine_2', 'Machine_3', 'Machine_4', 'Machine_5', 'Machine_6', 'Machine_7', 'Machine_8', 'Machine_9', 'Machine_10', 'Machine_11', 'Wieght'];

    const useGetReadingsByTitles = (data) => {
        const getReadingsByTitles = (tableName, titles) => {
            const tableData = data[tableName];
            if (tableData) {
                const readings = titles.reduce((acc, title) => {
                    const item = tableData.find((item) => item.Title === title);
                    acc[title] = item ? item.Reading : null;
                    return acc;
                }, {});
                return readings;
            }
            return null;
        };

        return getReadingsByTitles;
    };

    const SupabaseProvider = ({ children, token }) => {
        const [data, setData] = useState({});
        const [isDataLoaded, setIsDataLoaded] = useState(false);
        const [selectedMachine, setSelectedMachine] = useState('Machine_1');
        const supabase = createClient(token.user.user_metadata.database_url, token.user.user_metadata.api_key);


        useEffect(() => {
            const fetchData = async () => {
                try {
                    const requests = tableNames.map((tableName) =>
                        supabase.from(tableName).select()
                    );
                    const results = await Promise.all(requests);

                    const mergedData = {};
                    tableNames.forEach((tableName, index) => {
                        mergedData[tableName] = results[index].data || [];
                    });

                    setData(mergedData);
                    setIsDataLoaded(true);
                } catch (error) {
                    console.error('Error fetching data:', error.message);
                }
            };

            fetchData();
        }, []);

        useEffect(() => {
            if (!isDataLoaded) return;

            const channelA = supabase
                .channel('schema-db-changes')
                .on(
                    'postgres_changes',
                    {
                        event: '*',
                        schema: 'public',
                    },
                    (payload) => {
                        if (tableNames.includes(payload.table)) {
                            if (payload.new && payload.new.Title && payload.new.Reading) {
                                setData((prevData) => {
                                    const updatedData = { ...prevData };
                                    updatedData[payload.table] = updatedData[payload.table].map(
                                        (item) => {
                                            if (item.id === payload.new.id) {
                                                return payload.new;
                                            }
                                            return item;
                                        }
                                    );
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

        const getReadingsByTitles = useGetReadingsByTitles(data);

        const handleMachineSelect = (machineName) => {
            setSelectedMachine(machineName);
        };


        const selectedMachineReadings = useMemo(
            () =>
                getReadingsByTitles(selectedMachine, [
                    'Status',
                    'Voltage',
                    'Temperature',
                    'Moisture',
                    'Current',
                    'Frequency',
                    'OEE',
                    'Performance',
                    'Power',
                    'Rejection',
                ]),
            [getReadingsByTitles, selectedMachine]
        );

        const machine1Readings = getReadingsByTitles("Machine_1", [
            'Status',
            'Voltage',
            'Temperature',
            'Moisture',
            'Current',
            'Frequency',
            'OEE',
            'Performance',
            'Power',
            'Rejection',]);
        const machine2Readings = getReadingsByTitles("Machine_2", [
            'Status',
            'Voltage',
            'Temperature',
            'Moisture',
            'Current',
            'Frequency',
            'OEE',
            'Performance',
            'Power',
            'Rejection',]);
        const machine3Readings = getReadingsByTitles("Machine_3", [
            'Status',
            'Voltage',
            'Temperature',
            'Moisture',
            'Current',
            'Frequency',
            'OEE',
            'Performance',
            'Power',
            'Rejection',
        ]);
        const machine4Readings = getReadingsByTitles("Machine_4", [
            'Status',
            'Voltage',
            'Temperature',
            'Moisture',
            'Current',
            'Frequency',
            'OEE',
            'Performance',
            'Power',
            'Rejection',
        ]);
        const machine5Readings = getReadingsByTitles("Machine_5", [
            'Status',
            'Voltage',
            'Temperature',
            'Moisture',
            'Current',
            'Frequency',
            'OEE',
            'Performance',
            'Power',
            'Rejection',
        ]);
        const machine6Readings = getReadingsByTitles("Machine_6", [
            'Status',
            'Voltage',
            'Temperature',
            'Moisture',
            'Current',
            'Frequency',
            'OEE',
            'Performance',
            'Power',
            'Rejection',
        ]);
        const machine7Readings = getReadingsByTitles("Machine_7", [
            'Status',
            'Voltage',
            'Temperature',
            'Moisture',
            'Current',
            'Frequency',
            'OEE',
            'Performance',
            'Power',
            'Rejection',
        ]);
        const machine8Readings = getReadingsByTitles("Machine_8", [
            'Status',
            'Voltage',
            'Temperature',
            'Moisture',
            'Current',
            'Frequency',
            'OEE',
            'Performance',
            'Power',
            'Rejection',
        ]);
        const machine9Readings = getReadingsByTitles("Machine_9", [
            'Status',
            'Voltage',
            'Temperature',
            'Moisture',
            'Current',
            'Frequency',
            'OEE',
            'Performance',
            'Power',
            'Rejection',
        ]);
        const machine10Readings = getReadingsByTitles("Machine_10", [
            'Status',
            'Voltage',
            'Temperature',
            'Moisture',
            'Current',
            'Frequency',
            'OEE',
            'Performance',
            'Power',
            'Rejection',
        ]);
        const machine11Readings = getReadingsByTitles("Machine_11", [
            'Status',
            'Voltage',
            'Temperature',
            'Moisture',
            'Current',
            'Frequency',
            'OEE',
            'Performance',
            'Power',
            'Rejection',
        ]);
        const weightReadings = getReadingsByTitles("Wieght", [
            '5kg',
            '10kg',
            '15kg',
            '20kg',
            '26kg',
            '30kg',
            '50kg',
            'Production',
            'Downtime',
        ]);

        return (
            <SupabaseContext.Provider
                value={{
                    selectedMachine,
                    selectedMachineReadings,
                    handleMachineSelect,
                    machine1Readings,
                    machine2Readings,
                    machine3Readings,
                    machine4Readings,
                    machine5Readings,
                    machine6Readings,
                    machine7Readings,
                    machine8Readings,
                    machine9Readings,
                    machine10Readings,
                    machine11Readings,
                    tableNames,
                    weightReadings,
                }}
            >
                {children}
            </SupabaseContext.Provider>
        );
    };

    export { SupabaseContext, SupabaseProvider };
