
const linkInput = document.getElementById("link");

const result = document.getElementById("result");

const convertedLink = document.getElementById("converted-link");

const message = document.getElementById("message");


// =========================
// CONVERSOR GOOFISH
// =========================

function convertLink() {

    const original = linkInput.value.trim();

    if (!original) {
        message.textContent = "Cole um link primeiro.";
        result.classList.add("hidden");
        return;
    }

    try {

        let internalLink = original;

        // Extrair o returnUrl

        const url = new URL(original);

        const returnUrl = url.searchParams.get("returnUrl");

        if (returnUrl) {
            internalLink = returnUrl;
        }

        // Decodificar o endereço

        for (let i = 0; i < 3; i++) {

            const decoded = decodeURIComponent(internalLink);

            if (decoded === internalLink) break;

            internalLink = decoded;

        }

        // Encontrar o ID do produto

        const match = internalLink.match(/[?&]id=(\d+)/);

        if (!match) {
            throw new Error("ID não encontrado.");
        }

        const productID = match[1];

        // Gerar o link final

        const finalLink =
            `https://www.goofish.com/item?id=${productID}`;

        convertedLink.textContent = finalLink;

        result.classList.remove("hidden");

        message.textContent = "Link convertido com sucesso!";

    } catch (error) {

        result.classList.add("hidden");

        message.textContent = error.message === "ID não encontrado."
            ? error.message
            : "Link inválido ou não reconhecido.";

    }

}


// =========================
// COPIAR LINK
// =========================

async function copyLink() {

    try {

        await navigator.clipboard.writeText(
            convertedLink.textContent
        );

        message.textContent = "Link copiado com sucesso!";

    } catch {

        message.textContent = "Não foi possível copiar o link.";

    }

}


// =========================
// LIMPAR
// =========================

function clearInput() {

    linkInput.value = "";

    convertedLink.textContent = "";

    result.classList.add("hidden");

    message.textContent = "";

    linkInput.focus();

}


// =========================
// EVENTOS
// =========================

document
    .getElementById("convert")
    .addEventListener("click", convertLink);

document
    .getElementById("copy")
    .addEventListener("click", copyLink);

document
    .getElementById("clear")
    .addEventListener("click", clearInput);


// =========================
// ATALHO CTRL + ENTER
// =========================

linkInput.addEventListener("keydown", function(event) {

    if (event.ctrlKey && event.key === "Enter") {
        convertLink();
    }

});
