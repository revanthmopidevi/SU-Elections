async function postFormDataAsJson({ url, formData }) {
	const plainFormData = Object.fromEntries(formData.entries());
	const formDataJsonString = JSON.stringify(plainFormData);

	const fetchOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: formDataJsonString,
	};

	const response = await fetch(url, fetchOptions);
	console.log(response)
	window.alert(response.text)
	window.location.reload()
}


async function handleFormSubmit(event) {
	event.preventDefault();

	const form = event.currentTarget;
	const url = form.action;

	try {
		const formData = new FormData(form);
		await postFormDataAsJson({ url, formData });
	} catch (error) {
		console.error(error);
	}
}


window.onload=function(){
	const form = document.getElementById("ballot");
	form.addEventListener("submit", handleFormSubmit);
}