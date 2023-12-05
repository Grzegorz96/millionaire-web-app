async function sendHttpRequest(method, url, data) {
    try {
        const response = await fetch(url, {
            method: method,
            body: JSON.stringify(data),
            headers: data ? { "Content-Type": "application/json" } : {},
        });

        return response;
    } catch (error) {
        return new Error(error);
    }
}

const getData = async (url) => {
    const response = await sendHttpRequest("GET", url);
    if (response.ok) {
        return await response.json();
    }
};

const postData = async (url, data) => {
    const response = await sendHttpRequest("POST", url, data);
    console.log(response);
};

const updateData = async (url) => {
    let x = await sendHttpRequest("PATCH", url);
    console.log(x);
};

const deleteData = async (url) => {
    let x = await sendHttpRequest("DELETE", url);
    console.log(x);
};

export { getData, postData, updateData, deleteData };
