import Layout from "@/pages/layout";
import { Label } from "@radix-ui/react-label";

export function Info() {
    return (
        <Layout>
            <div className="home flex flex-col space-y-12">
                <div className="font-bold text-3xl flex justify-start">
                    Component Details
                </div>
                    <div className="flex justify-start">
                    <div className="flex flex-col space-y-4 mx-0">
                        <Label htmlFor="text" className="text-lg font-semibold">Drone ID: </Label>
                        <Label htmlFor="text" className="text-lg font-semibold">Product Name: </Label>
                        <Label htmlFor="text" className="text-lg font-semibold">Assembled By: </Label>
                        <Label htmlFor="text" className="text-lg font-semibold">Assembled On: </Label>
                        <Label htmlFor="text" className="text-lg font-semibold">Progress: </Label>
                        <div className="text-lg font-bold">Components: </div>
                            <Label htmlFor="text" className="flex mx-2 text-lg font-semibold">Component Name: </Label>
                            <Label htmlFor="text" className="flex mx-2 text-lg font-semibold">Associated components' S.No. </Label>
                          </div>  
                        </div>
            </div>
        </Layout>
    );
}