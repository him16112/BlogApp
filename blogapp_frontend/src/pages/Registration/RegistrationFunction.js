export const handleChange = (e, data, setData) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
}

export const handleSubmit = async (data, setMssg, navigate) => {
    if (!data.username || !data.email || !data.password) {
        if (!data.username) {
            setMssg("Username is required!");
        }

        else if (!data.email) {
            setMssg("Email is required!");
        }
        else if (!data.password) {
            setMssg("Password is required!");
        }
        else {
            setMssg("All fields are required!");
        }

        return;
    }

    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/registration`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })

        if (response.ok) {
            const result = await response.json();
            console.log(result.message)
            navigate("/");
        }

        else {
            const errorResult = await response.json();
            console.log(errorResult)
            if (errorResult.message === "User already Exists!") {
                alert("User already exists. Please try with a different email.");
                navigate("/")
            } else {
                alert("Something went wrong. Please try again.");
            }
        }

    } catch (error) {
        // console.log(error);
        alert(error.message);
    }
}
