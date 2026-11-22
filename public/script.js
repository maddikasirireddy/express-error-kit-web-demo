
async function showResponse(url) {
  const result = document.getElementById("result");

  try {
    const response = await fetch(url);
    const data = await response.json();

    result.textContent =
      `HTTP Status: ${response.status}\n\n` +
      JSON.stringify(data, null, 2);

  } catch (error) {
    result.textContent = "Request failed: " + error.message;
  }
}

function findUser() {
  const id = document.getElementById("userId").value;

  if (!id) {
    document.getElementById("result").textContent =
      "Please enter a User ID.";
    return;
  }

  showResponse(`/users/${encodeURIComponent(id)}`);
}

function triggerError() {
  showResponse("/server-error");
}
