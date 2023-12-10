export default async function handler(req, res) {
    console.log("Request method:", req.method);
    console.log("Request path:", req.query.path);
    const { path } = req.query; // 'path' will be an array of path segments

    // Join the path segments to form the endpoint path
    const apiUrl = `http://localhost:3000/${path.join("/")}`;

    console.log("Endpoint::", apiUrl);

    try {
        // Initialize apiOptions with method and headers
        const apiOptions = {
            method: req.method,
            headers: {}
        };

        // If the Content-Type is multipart/form-data, we should not set the Content-Type header
        // as the fetch API will set it with the correct boundary.
        // Include the body in the request for POST, PUT, and PATCH methods
        if (["POST", "PUT", "PATCH"].includes(req.method)) {
            // Check if the incoming request has files
            if (
                req.headers["content-type"]?.startsWith("multipart/form-data")
            ) {
                const formData = new FormData();
                // Append files and fields to formData
                for (const key in req.files) {
                    formData.append(key, req.files[key]);
                }
                for (const key in req.body) {
                    formData.append(key, req.body[key]);
                }
                apiOptions.body = formData;
            } else {
                // For JSON content type, set headers and stringify body
                apiOptions.headers["Content-Type"] = "application/json";
                apiOptions.body = JSON.stringify(req.body);
            }
        }

        console.log("HERE1");

        const apiResponse = await fetch(apiUrl, apiOptions);

        // Assuming the response is JSON. Adjust if your API returns something else.
        const data = await apiResponse.json();
        res.status(apiResponse.status).json(data);
        console.log("HERE2");
    } catch (error) {
        // Handle fetch errors or other exceptions
        console.error("Error:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}
