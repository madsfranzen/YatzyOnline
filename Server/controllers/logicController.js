

export async function getValues(req, res) {
    try {

        console.log(req.user);

        res.status(200).json({ message: "Values retrieved successfully" });
        
    } catch (error) {
        
    }

}