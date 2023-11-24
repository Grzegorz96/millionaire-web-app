async function sendHttpRequest(method, url, data) {
    try {
        const response = await fetch(url, {
            method: method,
            body: JSON.stringify(data),
            headers: data ? { "Content-Type": "application/json" } : {},
        });

        if (response.status === 404) {
            throw new Error("Page not found");
        } else if (response.status === 500) {
            throw new Error("Server error");
        } else if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        return error;
    }
}

const getData = async (url) => {
    return await sendHttpRequest("GET", url);
};

const postData = async (url) => {
    let x = await sendHttpRequest("POST", url);
    console.log(x);
};

const updateData = async (url) => {
    let x = await sendHttpRequest("PATCH", url);
    console.log(x);
};

const deleteData = async (url) => {
    let x = await sendHttpRequest("DELETE", url);
    console.log(x);
};

export { sendHttpRequest, getData, postData, updateData, deleteData };
