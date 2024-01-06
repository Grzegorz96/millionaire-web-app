// Function responsible for sending a direct request to the backend.
async function sendHttpRequest(method, url, data, accessToken, refreshToken) {
    try {
        // Depending on what the function receives in the parameters, it will dynamically create a specific request.
        const headers = new Headers();
        data ? headers.append("Content-Type", "application/json") : null;
        accessToken ? headers.append("access-token", accessToken) : null;
        refreshToken ? headers.append("refresh-token", refreshToken) : null;
        const response = await fetch(url, {
            method: method,
            body: JSON.stringify(data),
            headers: headers,
        });

        // Returning the response.
        return response;
    } catch (error) {
        // If an error occurs while sending the request, return an error object with the error message.
        return new Error(error);
    }
}

// An indirect function responsible for getting data.
const getData = async (url, accessToken, refreshToken) => {
    return await sendHttpRequest(
        "GET",
        url,
        undefined,
        accessToken,
        refreshToken
    );
};

// An indirect function responsible for posting data.
const postData = async (url, data, accessToken, refreshToken) => {
    return await sendHttpRequest("POST", url, data, accessToken, refreshToken);
};

// An indirect function responsible for updating data.
const updateData = async (url, data, accessToken, refreshToken) => {
    return await sendHttpRequest("PATCH", url, data, accessToken, refreshToken);
};

// An indirect function responsible for deleting data.
const deleteData = async (url, accessToken, refreshToken) => {
    return await sendHttpRequest(
        "DELETE",
        url,
        undefined,
        accessToken,
        refreshToken
    );
};

// export functions.
export { getData, postData, updateData, deleteData };
