// @ts-nocheck
import { useState, useEffect } from 'react';
import Layout from "@/pages/layout";
import { Label } from "@radix-ui/react-label";
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";

import { HiDownload } from "react-icons/hi";

export function TrackInstance() {
    const [data, setData] = useState(null);
    const {instanceId} = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:5000/api/v1/track-instance/${instanceId}`);
                const result = await response.json();
                setData(result.instance);
            } catch (error: any) {
                toast({
                    title: "Error",
                    description: `Error fetching part: ${error.message}`,
                    variant: "destructive",
                  });
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <Layout>
            <Button className='mt-5 mb-5 btn-primary text-xl justify-center p-7 rounded-lg'>
                <HiDownload className="mr-2" />
                Download BOM</Button>
            <div className="home flex flex-col rounded-md">
                <div className="font-bold text-2xl flex justify-center mb-5">
                    Component Details
                </div>
                <div className="flex justify-start text-left">
                    <div className="flex flex-col space-y-4 mx-0">
                        <Label htmlFor="droneId" className="text-lg font-semibold">Drone ID: {data._id}</Label>
                        <Label htmlFor="productName" className="text-lg font-semibold">Product Name: {data.productName}</Label>
                        <Label htmlFor="assembledBy" className="text-lg font-semibold">Assembled By: {/TODO: Add the assembledBy field when available /}</Label>
                        <Label htmlFor="assembledOn" className="text-lg font-semibold">Assembled On: {data.assembledOn}</Label>
                        <Label htmlFor="status" className="text-lg font-semibold capitalize">Status: {data.status}</Label>
                        <div className="text-lg font-bold">Components:</div>
                        {data.components.map((component, index) => (
                            <div key={index} className="flex flex-col mx-2 space-y-2">
                                <Label htmlFor="componentName" className="text-lg font-semibold">{component.componentLabel}</Label>
                                <ul className="list-disc list-inside">
                                    {component.serialNumbers.map((serialNumber, index) => (
                                        <li key={index} className="ml-4">{serialNumber}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
