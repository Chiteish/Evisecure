// 
// Chain Of Custody Timeline

const getEvidenceHistory = async (req,res)=>{

    try{

        const history = await ChainOfCustody.find({

            evidenceId:req.params.id

        })

        .populate("userId","employeeId name role")

        .sort({

            createdAt:1

        });

        res.status(200).json({

            count:history.length,

            history

        });

    }

    catch(error){

        console.error(error);

        res.status(500).json({

            message:error.message

        });

    }

};