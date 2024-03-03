const SubSection = require("../models/SubSection")
const Section = require("../models/Section");
const { uploadToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();
exports.createSubSection = async(req,res)=>{
    try{
        const {sectionId,title,description} = req.body;

        const video = req.files.video;

        if(!sectionId || !title || !description || 
            !video){
                return res.status(401).json({
                    success:false,
                    message:"All fields are required",
                })
            }
        const uploadVideo = await uploadToCloudinary(video,process.env.FOLDER_NAME);
        console.log(uploadVideo);

        const subSection = await SubSection.create({
            title,
            timeDuration:`${uploadVideo.duration}`,
            description,
            videoUrl:uploadVideo.secure_url,
        })

        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},
                                     {
                                        $push:{
                                            subSection:subSection._id
                                        }
                                     },{new:true}).
                                     populate("subSection").exec();
        console.log(updatedSection)
        return res.status(200).json({
            success:true,
            message:"SubSection created successfully",
            data:updatedSection,
        })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Could not create section",
        })
    }
}

exports.updateSubSection = async(req,res)=>{
    try{
        const {sectionId,subSectionId,title,description} = req.body;

        const video = req.files.video;

        const subSection = await SubSection.findById(subSectionId);

        if(title!==undefined){
            subSection.title = title;
        }
        if(description!==undefined){
            subSection.description = description;
        }
        if(req.files && video!==undefined){
            const uploadedVideo = await uploadToCloudinary(video,process.env.FOLDER_NAME);

            subSection.timeDuration = `${uploadedVideo.duration}`;
            subSection.videoUrl = uploadedVideo.secure_url;
        }
        await subSection.save();
        const updatedSection = await Section.findById(sectionId).populate("subSection")
        return res.status(200).json({
            success:true,
            message:"Updated subSection succesfully",
            data:updatedSection, 
        })
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            success:false,
            message:"Could not update SubSection",
        })
    }
}

exports.deleteSubSection = async(req,res)=>{
    try{
        const {subSectionId,sectionId} = req.body;

        const deletedSubSection = await SubSection.findByIdAndDelete(subSectionId);
        
        if(!deletedSubSection){
            return res.status(401).json({
                success:false,
                message:"Could not find subSection",
            })
        }
        const updatedSection = await Section.findByIdAndUpdate(sectionId,
                                            {
                                                $pull:{
                                                    subSection:subSectionId,
                                                }
                                            },{new:true})
                                            .populate("subSection")
                                            .exec();
        return res.status(200).json({
            success:true,
            message:"Succesfully deleted SubSection",
            data:updatedSection,
        })
    }
    catch(err){
        console.log(err);
        res.status(400).json({
            success:false,
            message:"Could not delete Subsection",
        })
    }
}