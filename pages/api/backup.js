export default async function handler(req, res) {
    console.log("Request method:", req.method);
    console.log("Request path:", req.query.path);
    const { path } = req.query; // 'path' will be an array of path segments

    // Join the path segments to form the endpoint path
    const apiUrl = `http://localhost:3000/${path.join("/")}`;

    console.log("Endpoint::", apiUrl);

    try {
        const apiOptions = {
            method: req.method,
            headers: {
                "Content-Type": "application/json"
            }
        };

        // Include the body in the request for POST, PUT, and PATCH methods
        if (["POST", "PUT", "PATCH"].includes(req.method)) {
            apiOptions.body = JSON.stringify(req.body);
        }

        const apiResponse = await fetch(apiUrl, apiOptions);

        // Assuming the response is JSON. Adjust if your API returns something else.
        const data = await apiResponse.json();
        res.status(apiResponse.status).json(data);
    } catch (error) {
        // Handle fetch errors or other exceptions
        console.error("Error:", error);
    }
}
