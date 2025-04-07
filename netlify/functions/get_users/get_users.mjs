import clientPromise from '../../../database/db.js';

const handler = async (event) => {
    try {
        const database = (await clientPromise).db(process.env.MONGODB_DATABASE);
        const collection = database.collection("users"); 
        const results = await collection.find({}).limit(10).toArray();
        return {
            statusCode: 200,
            body: JSON.stringify(results),
        }
    } catch (error) {
        return { statusCode: 500, body: error.toString() }
    }
}

export default { handler }