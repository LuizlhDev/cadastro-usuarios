const resultBox = document.querySelector("#resultBox");

function showResult(title, payload) {
    const data = typeof payload === "string" ? payload : JSON.stringify(payload, null, 2);
    resultBox.textContent = `${title}\n\n${data}`;
}

function getValue(selector) {
    return document.querySelector(selector).value.trim();
}

async function requestApi(path, options = {}) {
    const response = await fetch(path, {
        headers: {
            "Content-Type": "application/json",
            ...options.headers
        },
        ...options
    });

    const text = await response.text();
    const hasJson = text && response.headers.get("content-type")?.includes("application/json");
    const body = hasJson ? JSON.parse(text) : text;

    if (!response.ok) {
        throw new Error(body || `Erro HTTP ${response.status}`);
    }

    return body || { status: response.status, message: "Operacao concluida com sucesso." };
}

document.querySelector("#createForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    const usuario = {
        nome: getValue("#createName"),
        email: getValue("#createEmail")
    };

    try {
        const result = await requestApi("/usuario", {
            method: "POST",
            body: JSON.stringify(usuario)
        });
        showResult("Usuario cadastrado", result);
        form.reset();
    } catch (error) {
        showResult("Erro ao cadastrar", error.message);
    }
});

document.querySelector("#searchForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = encodeURIComponent(getValue("#searchEmail"));

    try {
        const usuario = await requestApi(`/usuario?email=${email}`);
        showResult("Usuario encontrado", usuario);
        document.querySelector("#updateId").value = usuario.id ?? "";
        document.querySelector("#updateName").value = usuario.nome ?? "";
        document.querySelector("#updateEmail").value = usuario.email ?? "";
        document.querySelector("#deleteEmail").value = usuario.email ?? "";
    } catch (error) {
        showResult("Erro ao buscar", error.message);
    }
});

document.querySelector("#updateForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const id = getValue("#updateId");
    const nome = getValue("#updateName");
    const email = getValue("#updateEmail");

    const usuario = {};
    if (nome) usuario.nome = nome;
    if (email) usuario.email = email;

    try {
        const result = await requestApi(`/usuario?id=${encodeURIComponent(id)}`, {
            method: "PUT",
            body: JSON.stringify(usuario)
        });
        showResult("Usuario atualizado", result);
    } catch (error) {
        showResult("Erro ao atualizar", error.message);
    }
});

document.querySelector("#deleteForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    const email = encodeURIComponent(getValue("#deleteEmail"));

    try {
        const result = await requestApi(`/usuario?email=${email}`, {
            method: "DELETE"
        });
        showResult("Usuario removido", result);
        form.reset();
    } catch (error) {
        showResult("Erro ao remover", error.message);
    }
});

document.querySelector("#clearResult").addEventListener("click", () => {
    resultBox.textContent = "Nenhuma requisicao feita ainda.";
});
