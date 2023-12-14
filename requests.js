async function sendHttpRequest(method, url, data, accessToken, refreshToken) {
    try {
        const headers = new Headers();
        data ? headers.append("Content-Type", "application/json") : null;
        accessToken ? headers.append("access-token", accessToken) : null;
        refreshToken ? headers.append("refresh-token", refreshToken) : null;
        const response = await fetch(url, {
            method: method,
            body: JSON.stringify(data),
            headers: headers,
        });

        return response;
    } catch (error) {
        return new Error(error);
    }
}

const getData = async (url, accessToken, refreshToken) => {
    return await sendHttpRequest(
        "GET",
        url,
        undefined,
        accessToken,
        refreshToken
    );
};

const postData = async (url, data, accessToken, refreshToken) => {
    return await sendHttpRequest("POST", url, data, accessToken, refreshToken);
};

const updateData = async (url, data, accessToken, refreshToken) => {
    return await sendHttpRequest("PATCH", url, data, accessToken, refreshToken);
};

const deleteData = async (url, accessToken, refreshToken) => {
    return await sendHttpRequest(
        "DELETE",
        url,
        undefined,
        accessToken,
        refreshToken
    );
};

export { getData, postData, updateData, deleteData };
