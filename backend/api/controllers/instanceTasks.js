const mongoose = require("mongoose");
const Instance = require("../models/instances");
const Product = require("../models/products");

const validateSerial = async (req, res) => {
    const { serialNumber } = req.body;
    const { productName, instanceId } = req.params;

    // Validate instanceId format
    if (!mongoose.Types.ObjectId.isValid(instanceId)) {
        return res.status(400).json({ msg: "Invalid instance ID format" });
    }

    // Regex check for format
    const pattern = /^PA\d{2}([A-Za-z]{2,3})(1[0-2]|0?[1-9])\d{5}$/;
    const match = serialNumber.match(pattern);
    if (!match) {
        return res.status(400).json({ msg: "Invalid serial number format" });
    }

    // Check if part code is valid from Product Database
    const partCode = match[1];
    let partComponent, partLabel, partQuantity;

    try {
        const product = await Product.findOne({ productName });
        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }

        const components = product.components;
        let partFound = false;
        for (const component of components) {
            for (const part of component.partList) {
                if (part.partCode === partCode) {
                    partFound = true;
                    partComponent = component.componentLabel;
                    partLabel = part.partLabel;
                    partQuantity = part.partQuantity;
                    break;
                }
            }
            if (partFound) break;
        }

        if (!partFound) {
            return res.status(404).json({ msg: "Part not found" });
        }
    } catch (error) {
        console.error("Error validating serial number:", error);
        return res.status(500).json({ msg: error.message || error });
    }

    try {
        const instance = await Instance.findOne({ _id: instanceId });
        if (instance.progress === 'completed') {
            return res.status(400).json({ msg: "Instance is already complete" });
        }
       
        const component = instance.components.find(c => c.componentLabel === partComponent);
        const currentAssembledCount = component.serialNumbers.length;
        if (currentAssembledCount >= partQuantity) {
            return res.status(400).json({ msg: "Unit limit reached for drone" });
        }

        const isSerialNumberExists = await Instance.aggregate([
            { $unwind: "$components" },
            { $unwind: "$components.serialNumbers" },
            { $match: { "components.serialNumbers": serialNumber } },
            { $limit: 1 }
        ]);

        if (isSerialNumberExists.length > 0) {
            return res.status(400).json({ msg: "Serial number already registered" });
        }
    } catch (error) {
        console.error("Error checking serial number:", error);
        return res.status(500).json({ msg: error.message || error });
    }

    // Add serial number to existing instance
    try {
        const updatedInstance = await Instance.findOneAndUpdate(
            { _id: instanceId, "components.componentLabel": partComponent },
            { $push: { "components.$.serialNumbers": serialNumber } },
            { new: true, runValidators: true }
        );

        if (!updatedInstance) {
            return res.status(404).json({ msg: "Instance or component not found" });
        }

        // Calculate the new assembled count after updating
        const updatedComponent = updatedInstance.components.find(c => c.componentLabel === partComponent);
        const newAssembledCount = updatedComponent.serialNumbers.length;

        return res.status(200).json({ 
            msg: "Serial number added to instance", 
            partLabel, 
            assembledCount: newAssembledCount 
        });
    } catch (error) {
        console.error("Error updating instance:", error);
        return res.status(500).json({ msg: error.message || error });
    }
};

const createNewInstance = async (req, res) => {
    const { productName } = req.body;

    if (!productName) {
        return res.status(400).json({ msg: "Product name is required" });
    }

    try {
        const product = await Product.findOne({ productName });
        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }

        const components = product.components.map(component => ({
            componentLabel: component.componentLabel,
            serialNumbers: []
        }));

        const newInstance = new Instance({
            productName,
            progress: 'in-progress',
            components
        });

        await newInstance.save();

        return res.status(201).json({ msg: "Instance created with components", instanceId: newInstance._id });
    } catch (error) {
        console.error("Error creating instance:", error);
        return res.status(500).json({ msg: error.message || error });
    }
};

const deleteInstance = async (req, res) => {
    try{
        const {instanceId} = req.params;
        await Instance.deleteOne({ _id: instanceId });
        res.status(202).json({ msg: "Instance deleted successfully" });

    } catch (error){
        console.error("Error deleting instance:", error);
        res.status(500).json({ msg: error.message || error });
    }
}

const updateProgressCompleted = async (req, res) => {
    try{
        const {instanceId} = req.params;
        const updateProgess = await Instance.findOneAndUpdate( 
            { _id: instanceId }, 
            { progress: 'completed', assembledOn: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) }, //TODO: Add assembledBy, droneID
            { new: true, runValidators: true }
        );
        
        if(updateProgess){
            res.status(200).json({ msg: "Instance completed successfully" });
        }
        else{
            res.status(404).json({ msg: "Instance not found" });
        }
    }
    catch (error){
        console.error("Error updating instance:", error);
        res.status(500).json({ msg: error.message || error });
    }f
}

const updateProgressArchived = async (req, res) => {
    try{
        const {instanceId} = req.params;
        const updateProgess = await Instance.findOneAndUpdate( 
            { _id: instanceId }, 
            { progress: 'archived', assembledOn: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) },
            { new: true, runValidators: true }
        );
        
        if(updateProgess){
            res.status(200).json({ msg: "Instance archived successfully" });
        }
        else{
            res.status(404).json({ msg: "Instance not found" });
        }
    }
    catch (error){
        console.error("Error updating instance:", error);
        res.status(500).json({ msg: error.message || error });
    }

}

const getAssembledCounts = async (req, res) => {
    const { instanceId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(instanceId)) {
        return res.status(400).json({ msg: "Invalid instance ID format" });
    }

    try {
        const instance = await Instance.findById(instanceId);

        if (!instance) {
            return res.status(404).json({ msg: "Instance not found" });
        }

        const assembledCounts = {};

        instance.components.forEach(component => {
            const partLabel = component.componentLabel;
            const assembledCount = component.serialNumbers.length;

            assembledCounts[partLabel] = assembledCount;
        });

        return res.status(200).json({ assembledCounts });
    } catch (error) {
        console.error("Error fetching assembled counts:", error);
        return res.status(500).json({ msg: error.message || "An error occurred while fetching assembled counts" });
    }
};

const getArchivedInstances = async (req, res) => {
    try {
        const archivedInstances = await Instance.find({ progress: 'archived' });
        res.status(200).json({ archivedInstances });
    } catch (error) {
        console.error("Error fetching archived instances:", error);
        res.status(500).json({ msg: error.message || error });
    }
}

const trackInstance = async (req, res) => {
    const { serialNumber } = req.body;
    try{
        const instance = await Instance.findOne({ "components.serialNumbers": serialNumber });
        if(instance){
            return res.status(200).json({ msg: "Instance found", _id: instance._id });
        }
        else{
            res.status(404).json({ msg: "Instance not found" });
        }
    }
    catch (error){
        console.error("Error tracking instance:", error);
        res.status(500).json({ msg: error.message || error });
    }
}

const getInstance = async (req, res) => {
    const { instanceId } = req.params;
    console.log(instanceId);

    if (!mongoose.Types.ObjectId.isValid(instanceId)) {
        return res.status(400).json({ msg: "Invalid instance ID format" });
    }

    try{
        const instance = await Instance.findById(instanceId);
        if(instance){
            return res.status(200).json({ instance });
        }
        else{
            res.status(404).json({ msg: "Instance not found" });
        }
    }
    catch (error){
        console.error("Error fetching instance:", error);
        res.status(500).json({ msg: error.message || error });
    }
}

module.exports = { validateSerial, createNewInstance, deleteInstance, updateProgressCompleted, updateProgressArchived, getAssembledCounts, getArchivedInstances, trackInstance, getInstance };

